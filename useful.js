
var idary =function(num=0,prefix='',mixnum=1){
 if(num===0) return [];
 var merge = Array.prototype.push,f= function(p,m,d){ return m.map((v)=>{ return p+d+v }) },
     h="abcdefghijklmnopqrstuvwxyz",h1= (mixnum===1)? "0123456789"+h : h,p=prefix,
     ret=[];
  h=h.split(''); h1=h1.split('');
 Array.from(Array(num).keys())
  .forEach((i)=>{ 
   var wk=[];
   if(i===0) merge.apply(wk,f(p, (i===0)? h : h1 ,'') ); 
   else ret.forEach(d=> merge.apply(wk,f(p, (i===0)? h : h1 ,d) ) );
   merge.apply(ret,wk); 
  });
 return ret;
}
var efn=function(num,str){
   var e={};idary(num,str).forEach((d)=>{ e[d] = document.getElementById(d) });
   return e;
  }
 var sprintf =function(){
  var body= arguments[0]||'',
      arg = Array.prototype.slice.call(arguments, 1);
  arg.forEach((d)=>{ body= body.replace("%s",d) });
  return body;
  //spf("%s %s %s","aaa","bbb","ccc") //=> aaa bbb ccc
 };

var qtime=(function(){
  return { s:{},
  mod: (performance)? performance: Date,
  time:function(id){ this.s[id]= this.mod.now();},
  end:function(id){ return this.mod.now()-this.s[id]; } 
 }
 })();

 var xpad =function(body,form,cep="."){
  var b =body.toString().split(cep),f =form.split(cep),r =[];
  if(f[0]){ r[0]= ( f[0] + b[0]||'' ).slice( -f[0].length ); }
  if(f[1]){ r[1]= ( b[1]||'' +f[1] ).slice(0,f[1].length ); }
  //wild
  if(f[0]==='*') r[0]=b[0];
  if(f[1]==='*') r[1]=b[1];
  return r.join(".");
  //xpad("44434342443245.7755666","*.00") //=> 44434342443245.77
 }

 var escape_html =function (string) {
  if(typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {'&': '&amp;',"'": '&#x27;','`': '&#x60;','"': '&quot;','<': '&lt;','>': '&gt;',}[match]
  });
}
 
var getJson = function(url){
  return new Promise(function(sol,rej){ 
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function(){ 
    if( this.readyState == 4){ 
     if( this.status == 200|| this.status==0) sol( this.response);
     else rej(this.response);
    }
   }
   xhr.open( 'GET',url, true );xhr.responseType = 'json';xhr.send( null );
   });//
}

function jsjson(s){
     return JSON.stringify(s).
        replace(/\u2028/g, '\\u2028').
        replace(/\u2029/g, '\\u2029');
}

 var lst=(function(){ 
 var o={};
 o.mod = localStorage;
 o.d = '__dat__'
 o.i = '__time__'+o.d;
 o.makeid =function makeid(n){
    var t = "",_n =n||5;
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < _n; i++ )
        t += p.charAt(Math.floor(Math.random() * p.length));
    return t;
}
 o.save =function(id,dat){  
  o.mod.setItem(o.treatid(o.d,id), jsjson(dat) );
  o.mod.setItem(o.treatid(o.i,id),Date.now());
 }
 o.treatid = function(chk,id){ 
    var _id = id||'';
    return (_id.indexOf(chk)==0) ? id: chk+id; 
 }
 o.keys=function(){ 
   var a=[],i=0;
   for(i=0;i < o.mod.length;i++) a.push( o.mod.key(i));
   return a;
 }
 o.time=function(id){
  return o.mod.getItem(o.treatid(o.i,id));
 }
 o.load =function(id){ 
  return JSON.parse( o.mod.getItem(o.treatid(o.d,id)) ); 
 }
 o.list=function(){ 
  return o.keys().filter((d)=>{ if(d.indexOf(o.d)==0) return true; }) || [];
 }
 o.timelist=function(){
   var a=[],l=o.list();
   l.forEach((d)=>{ a.push([ d.replace(o.d,''),o.mod.getItem(d.replace(o.d,o.i)) ]) });
   return a;
 }
 o.remove =function(id){ 
  o.mod.removeItem(o.treatid(o.d,id));
  o.mod.removeItem(o.treatid(o.i,id));
 }
 o.removeall=function(pre=null){
  if(pre){
   o.keys().forEach((d)=>{ 
    if(d.indexOf(pre)==0) o.mod.removeItem(d);
   })   
  }else{
   o.keys().forEach((d)=>{ 
    if(d.indexOf(o.i)!=-1 || d.indexOf(o.d)!=-1) o.mod.removeItem(d);
   })
  }
 }
 return o;
 })();

 var debounce =  function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function() {
      var last = Date.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };
 //
