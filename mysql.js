const mysql = require('mysql'); //mysql 사용하겠다 선언

const connection = mysql.createConnection({ //연결 정보들 추가
  host     : '115.71.233.22',
  user     : 'testuser',
  password : 'testuser!@#',
  database : 'testdb'
});
 
//connection 이친구는 각각따로 실행되는데 
connection.connect();   
 
//얘는 위에 connect가 선행되어야지만 실행된다.
connection.query('select * from User where uid=?',['js'], function (error, results, fields) {
  if (error) throw error;
  console.log('The First User is: ', results[0]);

});

// connection.query('update User set lastlogin = now() ', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The First User is: ', results[0]);
//   });
 
connection.end();   //mysql.createConnection 이친구가 쿼리가 끝나야 실행되게해준다.

