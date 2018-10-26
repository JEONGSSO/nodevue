const express = require('express'),
      app = express(),
      util = require('util');

const Pool = require('../pool');

const pool = new Pool();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('views engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const port = 7000;
const server = app.listen(port, () => { //listen함수는 http서버를 시작하게 한다.
    console.log('Port Num ' + port);
})

const io = require('socket.io').listen(server, {    
    log : false,
    origins : '*',
    pingInterval : 3000,
    pingTimeout : 5000
})

io.sockets.on('connection', (socket, opt) => {
    socket.emit('message', {msg : socket.id})
    util.log("소켓 아이디는 :" , socket.id);
    
    socket.on('message', (data, opt) => {
        util.log('messageeeeeeeeee', data.msg, Object.keys(socket.rooms));
    })
})







