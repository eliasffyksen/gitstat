const r = require('rethinkdb');

class Database {
    constructor(options) {
        this.options = options;
    }

    async connect() {
        this.conn = await r.connect(this.options);
    }
}

module.exports = (options) => {
    return new Database(options);
};
