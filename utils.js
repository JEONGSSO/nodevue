const ogs = require('open-graph-scraper'),
      HashMap = require('hashmap'),
      Crypto = require('crypto-js'),
      SHA256 = ("crypto-js/sha256");

const EKey = "nodevue";

module.exports =  {

    //양방향 암호화 AES key가 없으면 EKey
    encrypt(data, key) {
        return Crypto.AES.encrypt(data, key || EKey);    
    },

    ogsinfo(url, fn) {  //12:10
        return ogs({url}, (err, ret) =>{    //url 축약
            fn(err, ret)
        });   
    }
}