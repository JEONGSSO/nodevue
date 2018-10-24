const ogs = require('open-graph-scraper'),
      HashMap = require('hashmap'),
      Crypto = require('crypto-js'),
      SHA256 = ("crypto-js/sha256");

const EKey = "nodevue";     

module.exports =  { //모듈화 ,해줘야한다.

    makeMap(key, value) {
        const map = new HashMap();  
        map.set(key, value);    // 자바 map.put이랑 같음
        console.log("makeMap >>>>>", map.get(key))  //key를 get해서 value를 가져옴
        return map; //맵을 리턴
    },

    // 단방향 암호화
    encryptSha2(data, key) {   
        if (!data) return null;
            key = key || EKey;
        try {
            return Crypto.SHA256(data + key).toString();
        } catch (err) {
            console.error("Error encryptSha2 ", err);
        }
    },

    //양방향 암호화 AES key가 없으면 EKey
    encrypt(data, key) {        //digiest("hex") 16진수로 하지않고 
        return Crypto.AES.encrypt(data, key || EKey).toString();    //암호화 된 키를 리턴
    },
    
    decrypt(data, key) {    //복호화  //digiest("hex") 16진수로 하지않고 utf-8로 선언
        return Crypto.AES.decrypt(data, key || EKey).toString(Crypto.enc.Utf8);    
    },

    ogsinfo(url, fn) {  //12:10
        return ogs({url}, (err, ret) =>{    //url 축약
            fn(err, ret)
        });   
    }
};