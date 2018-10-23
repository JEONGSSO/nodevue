// 1. 삼항조건 연산자 (The Ternary Operator)
    let x = 20;
    const y = x > 10 ? "yes" : "no"; 

//2. 간략계산법 (Short-circuit Evaluation)
    const variable2 = variable1  || 'new';

//3. 변수 선언
    let x;
    let y = 3;
    let x, y=3; //축약

//4. If Presence
    if (likeJavaScript === true)
    if (likeJavaScript) //축약

//5. For 루프
    for (let i = 0; i < allImgs.length; i++)
    
    for (let index of allImgs)//축약기법

//6. 간략 계산법 (Short-circuit Evaluation)    
    const dbHost = process.env.DB_HOST || 'localhost';

//7. 십진수 지수 (Decimal base exponents)
for (let i = 0; i < 1e1; i++) {}

1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;

//8. 객체 프로퍼티
const obj = { x:x, y:y };
const obj = { x, y };   //축약기법

//9. 애로우(화살표) 함수
setTimeout(function() {
    console.log('Loaded')
  }, 2000);

setTimeout(() => console.log('load'), 2000); //축약기법

list.forEach(function(item) {
    console.log(item);
  });

list.forEach(item => console.log(item)); // 축약

sayhello = name =>{
    console.log
}

////////////////////10. 묵시적 반환(Implicit Return)/////////////////
function calcCircumference(diameter) {
    return Math.PI * diameter
  }

  calcCircumference = diameter => (
    Math.PI * diameter
  )

//////////11. 파라미터 기본 값 지정하기(Default Parameter Values)///
function volume(l, w, h) {
    if (w === undefined)
      w = 3;
    if (h === undefined)
      h = 4;
    return l * w * h;
  }

volume = (l, w = 3, h = 4 ) => (l * w * h); //축약

//////////12. 템플릿 리터럴 (Template Literals)/////////
const welcome = 'You have logged in as ' + first + ' ' + last + '.'
const welcome = `You have logged in as ${first} ${last}`;//축약

////////////13. 비구조화 할당 (Destructuring Assignment)///////
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

import { observable, action, runInAction } from 'mobx'; //축약

/////////////14. 여러줄로 문자열 쓰기 (Multi-line String)////////////////
 // 백틱(backtick ``) 사용해 여러줄로 처리 가능

 //////////////15. 전개 연산자 (Spread Operator)/////////////////////
 const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);

const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];    //축약

//////////////////////////16. 필수(기본) 파라미터 (Mandatory Parameter)////////////////
function foo(bar) {
    if(bar === undefined) {
      throw new Error('Missing parameter!');
    }
    return bar;
  }
  //축약기법:
  mandatory = () => {
    throw new Error('Missing parameter!');
  }
  foo = (bar = mandatory()) => {
    return bar;
  }

////////////////////////17. Array.find///////////////////////
const pets = [
    { type: 'Dog', name: 'Max'},
    { type: 'Cat', name: 'Karl'},
    { type: 'Dog', name: 'Tommy'},
  ]
  
  function findDog(name) {
    for(let i = 0; i<pets.length; ++i) {
      if(pets[i].type === 'Dog' && pets[i].name === name) {
        return pets[i];
      }
    }
  }

//축약
pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
