const Promise =require('bluebird');

//이 자체가 위에 excute를 포함하는 모듈이 된다.


module.exports = class {  
    constructor(pool) {
        this.pool = pool;
    }

    excute(fn) {
        Promise.using( this.pool.connect(), conn => {
            fn(conn);
        });
    }

  excuteTx(fn) {
    Promise.using( this.pool.connect(), conn => {
        conn.beginTransaction( txerr => {
            fn(conn);
        });    
    });
  }   
};
