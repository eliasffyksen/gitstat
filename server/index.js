const express = require('express');
const { connect } = require('http2');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

const dummydata = [
    [
        {
            "old": "#include <stdio.h>",
            "new": "#include <stdio.h>"
          },
          {
            "old": "#include <stdint.h>",
            "new": "#include <stdint.h>"
          },
          {
            "old": "#include <limits.h>",
            "new": "#include <limits.h>"
          },
          {
            "old": "#include <stdbool.h>",
            "new": "#include <stdbool.h>"
          },
          {
            "old": "#include <stdio.h>",
            "new": "#include <stdio.h>"
          },
          {
            "old": "#include <string.h>",
            "new": "#include <string.h>"
          },
        //   {
        //     "old": null,
        //     "new": "#include <ctype.h>"
        //   },
          {
            "old": "",
            "new": ""
          },
          {
            "old": "enum format_type {",
            "new": null
          },
          {
            "old": "\tFORMAT_TYPE_NONE, // Just a string part",
            "new": null
          },
          {
            "old": "    FORMAT_TYPE_WIDTH,",
            "new": null
          },
          {
            "old": "\tFORMAT_TYPE_CHAR,",
            "new": null
          },
          {
            "old": "\tFORMAT_TYPE_STR,",
            "new": null
          },
          {
            "old": "\tFORMAT_TYPE_PERCENT_CHAR,",
            "new": null
          },
          {
            "old": "\tFORMAT_TYPE_INVALID,",
            "new": null
          },
          {
            "old": "\tFORMAT_TYPE_INT",
            "new": null
          },
          {
            "old": "};",
            "new": null
          },
          {old: 'abc', new: 'abc'},
          {old: 'abc', new: 'abc'},
          {old: 'abc', new: 'abc'},
          {old: 'abc', new: 'abc'},
          {old: 'abc', new: 'abc'},
          {old: 'abc', new: 'abc'},
          {old: 'abc', new: 'abc'}
    ],
    require('./dummydata')
];

app.use(express.static(`${__dirname}/../frontend/public`));

let nextId = 0;
io.on('connection', (socket) => {
    const user = { id: nextId++, repo: null};
    console.log('user', user.id, 'connected');

    socket.on('repo', (name) => {
        console.log('user', user.id, 'requested repo', name);
        user.repo = name;
        user.currentPatch = 1;
        user.ready = false;
    });

    socket.on('next_patch', () => {
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