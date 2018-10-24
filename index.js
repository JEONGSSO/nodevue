const express = require('express'), //만들어져있던거
      app = express();

const testJson = require('./test/test.json'),   // 얘네들은 가져오기만 했다. 
      Pool = require('./pool'),                 // 선언은 별개 ./ 전역은 안쓴다.
      Mydb = require('./mydb');                 // 사용자가 만든 것 대문자로 시작

      //require를 import로 사용해도 된다.
    //   import{ testJson } from 'test';

const pool = new Pool();    // 다시 새롭게 정의
      
app.set('views', __dirname + '/views'); //폴더는 views
app.set('view engine', 'ejs');  //ejs를 사용한다고 선언
app.engine('html', require('ejs').renderFile);  //html 형식이 아니라 
app.use(express.static('public'));  //public 폴더 쓴다고 선언


app.get('/', (req, res) => {
    // res.send("Hello NodeJS!!"); //Response 보내기
    // res.json(testJson);
    //index.ejs, 모델 addAtrribute처럼 name을 올려(?)준다
    res.render('index', {name : '홍'}); //render 기본 콘텍스트를 포함하는 객체
});

app.get('/dbtest/:user', (req, res) => {
    let user = req.params.user; //url user를 파라메타로 받는다.
    let mydb = new Mydb(pool);  //mydb 선언 
    mydb.excute( conn => {  //query는 연결이 선행되어야지만 된다.
        conn.query("select * from User where uid=?", [user], (err, ret) => {
          res.json(ret);    //결과를 제이슨으로 
        });
    });
});

//http://localhost:7000/test/email=222@ddd.com 이 형식으로 사용
app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email;  // testJson에 email을 추가하고 받은 파라미터를 추가!
    res.json(testJson);
});

 const server = app.listen(7000, function(){    //7000 포트로 생성
    console.log("Express's started on port 7000");
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