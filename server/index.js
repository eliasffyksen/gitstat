const express = require('express');
const { connect } = require('http2');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});
const repos = [];
let conn;
const r = require('rethinkdb')
r.connect({
    host: 'localhost',
    db: 'gitstat'
}).then((newConn) => {
    conn = newConn;
    console.log('connected to db');
    return r.table('repos').pluck(['id', 'name']).run(conn);
}).then((cursor) => {
    return cursor.next();
}).then((data) => {
    repos.push(data);
});


app.use(express.static(`${__dirname}/../frontend/public`));

let nextId = 0;
io.on('connection', (socket) => {
    const user = { id: nextId++, repo: null};
    console.log('user', user.id, 'connected');
    socket.emit('repos', repos);

    socket.on('commit', async (repo, commit) => {
        console.log('user', user.id, 'requested commit', commit, 'from repo', repo);

        if (commit == null) {
            let [doc] = await r.table('commits')
                .filter(r.row('repo').eq(repo))
                .filter(r.row('parents').count().eq(0))
                .limit(1)
                .run(conn)
                .then(cursor => cursor.toArray());
            if (doc)
                socket.emit('commit', doc);
            else
                console.error('FAILED TO GET INITIAL COMMIT FROM REPO', repo, '!!!!');
            return;
        }

        let [doc] = await r.table('commits')
            .filter(r.row('repo').eq(repo))
            .filter(r.row('parents').contains(commit))
            .limit(1)
            .run(conn)
            .then(cursor => cursor.toArray());
        
        if (doc)
            socket.emit('commit', doc);
        return;

        if (user.repo == null) {
            console.log('user', user.id, 'sent next patch before selecting!!!');
            return;
        }

        if (user.currentPatch < dummydata.length) {
            console.log('user', user.id, 'requested next patch, sending', user.repo, user.currentPatch);
            socket.emit('patch', 'first/patch.file', dummydata[user.currentPatch++]);
        } else {
            console.log('user', user.id, 'requested next patch, but is up to date, setting user state to ready');
            user.ready = true;
        }
    });

    socket.on('disconnect', (socket) => {
        console.log('user', user.id, 'disconnected');
    });
});

http.listen(3000, () => {
    console.log('server running on port 3000');
});