const express = require('express');
const { connect } = require('http2');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

const dummydata = require('./dummydata');

app.use(express.static(`${__dirname}/../frontend/public`));

let nextId = 0;
io.on('connection', (socket) => {
    const user = { id: nextId++, repo: null };
    console.log('user', user.id, 'connected');

    socket.on('repo', (name) => {
        console.log('user', user.id, 'requested repo', name);
        socket.emit('patch', 'first/patch.file', dummydata);
    });

    socket.on('disconnect', (socket) => {
        console.log('user', user.id, 'disconnected');
    });
});

http.listen(3000, () => {
    console.log('server running on port 3000');
});