const fs = require('fs');
const util = require('util');   //util 사용하려면 선언 node가 제공하는 전역변수

//__dirname  자기폴더 기준이라는 것     여기서 비동기 동기가 어떻게 실행되는지 볼것

fs.readFile(__dirname +  '/test.json', 'utf-8', (err, data) => {   //다른 스레드로 넘김
        if (err) return console.error(err);

        console.log("data>>", data);
});

util.log("------------------------");

const msgfile = __dirname + '/message.txt';

//Sync 다른 스레드에게 보내지 않고 처리
fs.writeFileSync(msgfile , 'Hello Node.js 한글스', (err) => {
        if (err) throw err;
        console.log('저장 완려');
      });
//Sync다른 스레드에게 보내지 않겠다.
let data2 = fs.readFileSync(msgfile, 'utf-8');
util.log("data2>>", data2);

util.log("===================================");
