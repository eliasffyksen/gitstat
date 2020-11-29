const express = require('express');
const { connect } = require('http2');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});
const repos = require('../backend/repos.json');
let conn;
const r = require('rethinkdb');
const { watch } = require('fs');
const users = [];

r.connect({
    host: 'localhost',
    db: 'gitstat'
}).then((newConn) => {
    conn = newConn;
    r.table('commits').changes().run(conn)
        .then(cursor => cursor.each((err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            if (data.old_val == null) {
                const doc = data.new_val;
                for (let user of users) {
                    for (let watch of user.watchList) {
                        if (watch.repo != doc.repo) continue;
                        if (doc.parents.length == 0 && watch.commit == null) {
                            addToPendingCommits(user, doc.repo, doc.id);
                            break;
                        }
                        if (doc.parents.includes(watch.commit)) {
                            addToPendingCommits(user, doc.repo, doc.id);
                            break;
                        }
                    }
                }
            }
        }))
    console.log('connected to db');
});


app.use(express.static(`${__dirname}/../frontend/public`));

let nextId = 0;

io.on('connection', (socket) => {
    const user = { id: nextId++, repo: null, socket };
    users.push(user);
    console.log('user', user.id, 'connected');
    socket.emit('repos', repos.map(e => e.name));
    socket.on('block', _ => user.ready = false);
    socket.on('ready', _ => {
        user.ready = true;
        pushNextCommit(user);
    });
    socket.on('clear', _ => {
        user.watchList = [];
        user.pendingCommits = [];
    });

    socket.on('branches', async (repo) => {
        let docs = await r.table('branches')
            .filter(r.row('id').match(`^${repo}-`))
            .run(conn)
            .then(cursor => cursor.toArray());
        socket.emit('branches', docs.map(doc => {
            return {
                head: doc.head,
                name: doc.id.substr(repo.length + 1)
            };
        }));
    });

    socket.on('watch_commit', async (repo, commit) => {
        addToWatchList(user, repo, commit);
    });

    socket.on('disconnect', () => {
        console.log('user', user.id, 'disconnected');
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == user.id) {
                users.splice(i, 1);
                break;
            }
        }
    });
});

http.listen(3000, () => {
    console.log('server running on port 3000');
});

async function pushNextCommit(user) {
    if (!user.ready)
        return;
    user.ready = false;
    if (user.pendingCommits && user.pendingCommits.length > 0) {
        const [next] = user.pendingCommits.splice(0, 1);
        console.log('pushing commit', next.commit, 'from repo', next.repo, 'to user', user.id);
        const doc = await r.table('commits')
            .get(next.commit)
            .run(conn);
        if (doc) {
            user.socket.emit('commit', doc);
            user.ready = false;
        } else {
            console.error('unable to find commit', next.commit);
        }
    } else {
        user.ready = true;
    }
}

async function addToPendingCommits(user, repo, commit) {
    console.log('commit', commit, 'from repo', repo, 'is pending for user', user.id);
    user.pendingCommits.push({
        repo,
        commit
    });
    pushNextCommit(user);
}

async function addToWatchList(user, repo, commit) {

    for (let watch of user.watchList) {
        if (watch.repo == repo && watch.commit == commit) {
            console.log('user', user.id, 'is already watching commit', commit, 'in repo', repo);
            return;
        }
    }

    console.log('user', user.id, 'is watching commit', commit, 'from repo', repo);
    user.watchList.push({
        repo,
        commit
    });

    if (commit == null) {
        let docs = await r.table('commits')
            .filter(r.row('repo').eq(repo))
            .filter(r.row('parents').count().eq(0))
            .pluck(['id'])
            .run(conn)
            .then(cursor => cursor.toArray());
        for (let doc of docs) {
            await addToPendingCommits(user, repo, doc.id);
        }
        return;
    }

    let docs = await r.table('commits')
        .filter(r.row('repo').eq(repo))
        .filter(r.row('parents').contains(commit))
        .run(conn)
        .then(cursor => cursor.toArray());
    for (let doc of docs) {
        await addToPendingCommits(user, repo, doc.id);
    }
}