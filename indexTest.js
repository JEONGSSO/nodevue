const express = require('express'),
      app = express(),
      util = require('util');

const Pool = require('./pool');

const pool = new Pool();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const port = 7000;
const server = app.listen(port, () => {
    console.log('Port Started : ' + port );
})

const io = require('socket.io').listen(server, {
    log : false,
    origins : '*:*',
    pingInterval : 3000,
    pingTimeout  : 5000
});

io.sockets.on('connection', (socket, opt) => {
    socket.emit('message', { msg : socket.id })
    util.log('connecttttttttttt>>', socket.id);

    socket.on('message', (data, opt) => {
        util.log("message >>> ", data.msg, Object.keys(socket.rooms));

    });
});



