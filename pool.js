const mysql   = require("mysql"),
      util    = require('util'),
      Promise = require("bluebird");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

// pool은 connection들을 미리 만들어서 관리해줘서 낭비되는 자원을 줄인다.  

const DB_INFO = {
  host     : '115.71.233.22',
  user     : 'testuser',
  password : 'testuser!@#',
  database : 'testdb',
  multipleStatements: true,
  connectionLimit:5,        //실서버에선 올려쓰세요
  waitForConnections:false  //연결 기다리지말고 할당
};

module.exports = class {
    constructor(dbinfo) {
      dbinfo = dbinfo || DB_INFO;
      this.pool = mysql.createPool(dbinfo); //pool 따로 선언안해도 pool변수가 생김
    }
  
    connect() { //커넥션 프로세스가 종료됐을때 disposer 실행
      return this.pool.getConnectionAsync().disposer(conn => {
        return conn.release();  //연결 부를때까지 대기하는것
      });
    }
  
    end() {
      this.pool.end( function(err) {
        util.log(">>>>>>>>>>>>>>>>>>>>>>>>>>> End of Pool!!");
        if (err)
          util.log("ERR pool ending!!");
      });
    }
  };
  
