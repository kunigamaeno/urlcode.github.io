# autosave.js
## demo
https://urlcode.github.io/autosave.test.html

## mod
https://urlcode.github.io/autosave.js

## Usage
ready:
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
