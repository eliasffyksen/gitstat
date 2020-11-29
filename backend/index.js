const nodegit = require("nodegit");
const r = require('rethinkdb');
const db = require('./db')({
    host: 'localhost',
    db: 'gitstat',
});

(async () => {
    await db.connect();
    setInterval(() => checkRepos(), 1000);
})();

async function addRepo(dbRepo) {
    const repo = await nodegit.Clone(dbRepo.url, "data/" + dbRepo.id);
    updateRepo(dbRepo, repo);
}

async function checkRepos() {
    const cursor = await db.getRepos();
    cursor.each(async (e, repo) => {
        if (e != null) {
            console.error(e);
            return;
        }

        const gitRepo = await nodegit.Repository.init("data/" + repo.id, is_bare = 1);
        updateRepo(repo, gitRepo);
    });
}

async function updateRepo(dbRepo, repo) {
    const head = await repo.getHeadCommit();

    const revwalk = repo.createRevWalk();
    revwalk.push(head);

    const commits = await revwalk.getCommitsUntil(async commit => {
        const row = await r.table('commits').get(commit.id().tostrS()).run(db.conn);
        return row == null;
    });

    for (const commit of commits) {
        const author = commit.author();
        const parents = commit.parents().map(oid => oid.tostrS());
        const result = await r.table('commits').insert({
            id: commit.id().tostrS(),
            author: {
                name: author.name(),
                email: author.email(),
            },
            files: await getCommitDiff(commit),
            repo: dbRepo.id,
            parents: parents,
        }).run(db.conn);

        if (result.inserted) {
            console.log("Added commit " + commit.id().tostrS());
        }
    }
}

async function getCommitDiff(commit) {
    const files = [];

    const diffs = await commit.getDiffWithOptions({
        contextLines: 2000,
    });

    for (const diff of diffs) {
        const patches = await diff.patches();
        for (const patch of patches) {
            const content = await getFileDiff(patch);
            files.push({
                name: patch.newFile().path(),
                content: content,
            });
        }
    }

    return files;
}

async function getFileDiff(patch) {
    const ret = [];

    const hunks = await patch.hunks();
    for (const hunk of hunks) {
        const lines = await hunk.lines();

        for (const line of lines) {
            const content = line.content().replace("\n", "");
            ret.push({
                old: line.oldLineno() == -1 ? null : content,
                new: line.newLineno() == -1 ? null : content,
            });
        }
    }

    return ret;
}