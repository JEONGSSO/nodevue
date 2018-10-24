const util = require('util');
const utils = require('../utils');

let map = utils.makeMap('name', 'ong');
util.log("map >>>", map);

return;

let str = "NodeJs"; //암호화 할 문자열

let enc = utils.encrypt(str);   //문자열을 암호화
util.log("enc = ", enc);
let dec = utils.decrypt(enc);   //암호화된 enc를 복호화
util.log("dec = ", dec );
let shaEnc = utils.encryptSha2(str) //SHA2 암호화
util.log("shaEnc = ", shaEnc);

return;

let url = "https://naver.com";

utils.ogsinfo(url, (err, ret) => {
    util.log(err, ret);
});
