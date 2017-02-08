(function(root){
 /*
## demo 
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
 */
 var def={u:location.href||'',p:'ucode'};
 function jsjson(s) {
    return JSON.stringify(s).
        replace(/\u2028/g, '\\u2028').
        replace(/\u2029/g, '\\u2029');
}

 var encode=function(data,_opt){
   var f=encodeURIComponent,cep =(_opt.u.indexOf('?')===-1)?'?&':'&';
   return _opt.u+cep+_opt.p +'='+ f( jsjson(data) );
 }
 var decode=function(data,_opt){
   var f=decodeURIComponent,
       _data =data.split('?')[1].split('&'+_opt.p+'=')[1].split('&')[0];
  return JSON.parse( f(_data) )
 }
 var ucode =function(data,flg=1,opt=null){
  var _opt=Object.assign({},def,opt);
   return  (flg===1)?encode(data,_opt):decode(data,_opt);
  };
 root.ucode=ucode;
 root.jsjson=jsjson;
})(this);
