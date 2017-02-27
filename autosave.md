# autosave.js
## whats? this.
 localStorage use. autosave.
## demo
https://urlcode.github.io/autosave.test.html

## mod
https://urlcode.github.io/autosave.js

## Usage
basic:
```js
var A=autosave;
A((info)=>{ return {a:"aiuewo",ka:"kakikukeko"} },20*1000,'testname');//save
A('testname'); //load
A.index; //alldata info
```
save: A(callback,intervaltime,savename);
```js
//simple
A((info)=>{
 var savedata={a:"aiuewo",ka:"kakikukeko"};
 return savedata;
},20*1000,'testname');
```
same data check useful function: A.objectmd5(obj)
```js
//md check use A.objectmd5(obj);
A((info)=>{
 var savedata={a:"aiuewo",ka:"kakikukeko"};
 var newmd5 = A.objectmd5(savedata);
 if(newmd5===info.md5){ //olddata md5
  console.log('same');
  return; //return null is not save
 }else{
  console.log('diff is save');
  return savedata;
 }
},20*1000,'testname');

```
what? info:
```js
A((info)=>{
 console.log(info);
 //info.md5 //old md5data
 //info.name //savename
 //info._name //localstrage item name: __autosave__.{savename} 
 //info.time //old data lastupdate time //format: Date.now() 
 //
 var savedata={a:"aiuewo",ka:"kakikukeko"};
 return savedata;
},20*1000,'testname');

```

## code map
```js
//inner code
fn.md5 = ...
fn.en=function(obj){return JSON.stringify(obj).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')};
fn.de=function(obj){return JSON.parse(obj)};
fn.isObjectEmpty=function(obj){return ( (Object.keys(obj).length)===0 )?true:false};
fn.isString=function(obj){return (typeof obj == 'string') || false};
 
fn._save=function(s,d){localStorage.setItem(s,d)};
fn._load=function(s){return localStorage.getItem(s)};
fn._remove=function(s){localStorage.removeItem(s)};

//third mod join
Object.assign(A,fn);

A=function(){... } //entry point

A.set =...
A.autosave =...
A.save =...
A.remove =...
A.load =...
A.empty=function(old){return old}; 
A.objectmd5=function(obj){return A.md5( A.en(obj) ) };
A.timestamp=function(){return Date.now()};
A.indexupdate=function(){ A.save(A.indexname,A.index)};
A.indexload=function(){ A.index= A.load(A.indexname)||{} };
```

## Note:
 - intervaltime minlimit is 15*1000
 - ```console.log(localStorage);console.log(info);console.log(A.index);``` is useful debug
 
default values:
```js
//inner code
 var v={
  index:{}
  ,prefix:'__autosave__.'
  ,_name:'data'
  ,_timer:15*1000
  ,indexname :'__index__'
  ,old:''
 }
 Object.assign(A,v);
```
origin access:
localStorage.setItem(); localStorage.getItem();
but... setItem use is data manage mismatch.
```js
//exsample
localStorage.getItem('__autosave__.testname');
localStorage.getItem('__autosave__.__index__');
```
savedata is JSON.stringify+:
```js
//inner code
fn.en=function(obj){return JSON.stringify(obj).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')};
fn.de=function(obj){return JSON.parse(obj)};
```

md5 third party: blueimp thx.
https://github.com/blueimp/JavaScript-MD5
