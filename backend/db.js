const r = require('rethinkdb');

class Repo {
    constructor(id, url, name) {
        this.id = id;
        this.url = url;
        this.name = name;
    }
}

class Database {
    constructor(options) {
        this.options = options;
    }

    async connect() {
        this.conn = await r.connect(this.options);
    }

    async addRepo(url, name) {
        const result = await r.table('repos').insert({
            name: name,
            url: url,
        }).run(this.conn);
        
        if (result.inserted == 1) {
            return new Repo(result.generated_keys[0], url, name);
        }
    }

    async getRepos() {
        return await r.table('repos').run(this.conn);
    }

    async latestCommit(repo) {
        const row = await r.table('repos').get(repo.id).values().run(this.conn);
        return row.commit;
    }

    async setLastCommit(repo, commit) {
        const result = await r.table('repos').get(repo.id).update({commit: commit}).run(this.conn);
        return result.replaced == 1;
    }
}

module.exports = (options) => {
    return new Database(options);
};
