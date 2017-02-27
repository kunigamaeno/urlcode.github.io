# autosave.js
## demo
https://urlcode.github.io/autosave.test.html

## mod
https://urlcode.github.io/autosave.js

## Usage
ready:
```js
var A=autosave;
```
save: A(callback,intervaltime,saveid);
```js
//simple
A((info)=>{
 var savedata={a:"aiuewo",ka:"kakikukeko"};
 return savedata;
},20*1000,'testid');
```
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
},20*1000,'testid');

```
what? info:
```js
A((info)=>{
 console.log(info);
 //info.md5 //old md5data
 //info.name //saveid
 //info._name //localstrage item id 
 //info.time //old data lastupdate time //format: Date.now() 
 //
 var savedata={a:"aiuewo",ka:"kakikukeko"};
 return savedata;
},20*1000,'testid');

```
