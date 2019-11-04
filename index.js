const express = require("express"), //만들어져있던거
      app = express(),
      util = require("util");

const Pool = require("./pool"), // 선언은 별개 ./ 전역은 안쓴다.
      Mydb = require("./mydb"); // 사용자가 만든 것 대문자로 시작

const testJson = require("./test/test.json"); // 얘네들은 가져오기만 했다.
//require를 import로 사용해도 된다.
//   import{ testJson } from 'test';

const pool = new Pool(); // 다시 새롭게 정의

app.use(express.static("public")); //public 폴더 쓴다고 선언
app.set("views", __dirname + "/views"); //폴더는 views
app.set("view engine", "ejs"); //ejs를 사용한다고 선언
app.engine("html", require("ejs").renderFile); //html 형식이 아니라

app.get("/", (req, res) => {
  // res.send("Hello NodeJS!!"); //Response 보내기
  // res.json(testJson);
  //index.ejs, 모델 addAtrribute처럼 name을 올려(?)준다
   //   res.render("index", { name: "홍" }); //render 기본 콘텍스트를 포함하는 객체
   res.sendFile('./public/chat_client.html', {root : __dirname})
});

app.get("/dbtest/:user", (req, res) => {
  let user = req.params.user; //url user를 파라메타로 받는다.
  let mydb = new Mydb(pool); //mydb 선언
   mydb.excute(conn => {
      //query는 연결이 선행되어야지만 된다.
      conn.query("select * from User where uid=?", [user], (err, ret) => {
      res.json(ret); //결과를 제이슨으로
      });
   });
});

//http://localhost:7000/test/email=222@ddd.com 이 형식으로 사용
app.get("/test/:email", (req, res) => {
  testJson.email = req.params.email; // testJson에 email을 추가하고 받은 파라미터를 추가!
  res.json(testJson);
});

///////////////////1024 채팅///////////////////////
const server = app.listen(7000, function() {
  //7000 포트로 생성
  console.log("Express's started on port 7000");
});

const io = require("socket.io").listen(server, {
   //서버가 달라붙음s
   log: false,
   origins: "*:*", //이걸해야 url이 달라도 들어올수있다
   pingInterval: 3000, // 클라이언트와 서버가 살아있나 죽어있나 확인 default 25초
   pingTimeout: 5000 //핑이 끊어질때 대기시간    default 60초
});

//////////emit은 보낼때, on은 받을때
io.sockets.on("connection", (socket, opt) => {
  socket.emit("message", { msg: "Welcome " + socket.id });
  //message라는 이름으로 보낸다. msg안에 welcome이랑 socket.id 같이 넣어서 보냄
  util.log("connection>>", socket.id, socket.handshake.query);

  //최초 접속시 기본(square) 채널로
   socket.on("join", (roomId, fn) => {
      socket.join(roomId, () => {
         //조인 되었을때 !
         util.log("Join>>>", roomId, Object.keys(socket.rooms)); // 방 id값들이 array로 오는것
         if (fn) fn(); //뭐길래??? //이 소켓은 roomId채널에 join하게 된다.
      });
   });

  //방 나가기
   socket.on("leave", (roomId, fn) => {
      //클라이언트에서 leave를 부를때 Data만 주는게아니고
      socket.leave(roomId, () => {
         //함수도 줄 수있다.
         util.log("leave>>", roomId, socket.id);
         // if (fn)  클라이언트에서 안받았기때문에 주던말던
         //     fn();
      });
   });

  socket.on("rooms", fn => {
    //클라이언트 displayRooms에서 부름
      if (fn) fn(Object.keys(socket.rooms)); // displayRooms에다가 json 키밸류 리턴

   });

  // data: {room: 'roomid', msg: 'msg 내용..'}
   socket.on("message", (data, fn) => {
      // json key값 빼올때 object.key 사용
      util.log("on:::::message>>", data); //json array

      socket.broadcast
         .to(data.room)
         .emit("message", { room: data.room, msg: data.msg });

      if (fn) fn(data.msg); //넘어온 function(fn)이 있으면 data.msg를 담아 리턴.
   });

   socket.on("message-for-one", (socketid, msg, fn) => {
      socket.to(socketid).emit("message", { msg: msg });
   });

   socket.on("disconnecting", data => {
      //연결 끊기는 중 ssss
      util.log("disconnectig>>>", socket.id, Object.keys(socket.rooms));
   });
});

/*
//////////////////////////////Request/////////////////////////////
    // req.params : 이름 라우트 파라미터를 담는다.
    // req.query : GET 방식으로 넘어오는 쿼리 스트링 파라미터를 담고 있다.
    // req.body  : POST 방식으로 넘어오는 파라미터를 담는다.
    // req.headers : HTTP의 Header 정보를 가지고 있다.

//////////////////////////////Response////////////////////////////
    // res.json()   //Json을 보내는것
    // res.status(code) : HTTP 응답 코드를 설정한다.
    // res.send(body)  :기본 콘텐츠 타입은 html plain, json으로 변경 가능
    // res.json(json) :  클라이언트로 JSON 값을 보냄.  
    // res.render   : 뷰를 렌더링하는 기본 콘텍스트를 포함하는 객체다. 




*/
