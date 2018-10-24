const util    = require('util'),
      Promise = require("bluebird");    //제공하는것

const Pool = require('../pool'); //내가 만든 것

const sql1 = "update User set lastlogin = now() where uid='js'";
const sql2 = "update User set lastlogin = now() where uid='user2'";

const pool = new Pool();

excute( conn => {
          Promise.all([ //포함된 애들 다 처리해주는 야
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)
  
      ]).then( r => {
        for (let i = 0; i < r.length; i++)
          util.log(`sql${i+1}=`, r[i].affectedRows);  // ES6구문 ` `
        conn.commit();  
        pool.end();
  
      }).catch( e => {
        conn.rollback();  //실패하면 전부 롤백하고
        pool.end(); //종료
    });
});
  
  function excute(fn) {
    Promise.using( pool.connect(), conn => {
        conn.beginTransaction( txerr => {
            fn(conn)
        });    
    });
  }

/*
Promise.using( pool.connect(), conn => {
    Promise.all([
      conn.queryAsync(sql1),
      conn.queryAsync(sql2)
  
    ]).then( r => {
      util.log("End of Then!!!!!!!!!!!!!!!!!!!");
      util.log("sql1=", r[0].affectedRows);
      util.log("sql2=", r[1].affectedRows);
      pool.end();

    }).catch (err => {
        util.log("에럴ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ");
        pool.end();
    });
  });
  */

/////////////////////then 사용//////////////////////////

// Promise.using( pool.connect(), conn => {
//     conn.queryAsync(sql1).then(console.log).then(ret => {
//     }).catch(err => {
//         util.log("err>>>>" , err);
//     });
    
//     pool.end();
//   });
  
  /////////////////then 쓰기 전/////////////////////

    //   Promise.using( pool.connect(), conn => {
    //     conn.queryAsync(sql1, (err, ret) => {
    //       util.log("sql1=", ret.affectedRows);
          
    //       conn.queryAsync(sql2, (err2, ret2) => {
    //         util.log("sql2=", ret2.affectedRows);
    //       });
    //     });
    //   });

      