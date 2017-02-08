## demo
https://urlcode.github.io/ucode.test.html

http://codepen.io/kunigamaeno/pen/QdVvWe
## Usage ucode(data,flg,opt);
```js
ucode(data,1,{u:'http://exsample.com/',p:'ucode'}); //encode js => {u}?&{p}={data}
ucode(_data,-1,{u:'http://exsample.com/',p:'ucode'}); //decode url=> js data
```
## Util
```js
jsjson(s); //inner JSON.stringfy  //javascript escape
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
```
## more exsample
```js
 var ob=get('ob');//<textarea id="ob"></textarea>
 var d0={a:"aaaaaa",b:[0,1,2,3,4,5],c:{pan:"panpan",mon:"monmon",url:'http://exsample.com'}},_d0;
  ob.value=ucode(d0,1,uo);
 _d0=ucode(ob.value,-1,uo);
 console.log(d0,_d0)
 console.log(jsjson(d0)===jsjson(_d0));
});
```
