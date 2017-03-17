(function(root){
 var fn={};
 fn.initer=function(html,css){
  //
  var el=document.createElement('span');
  el.innerHTML=html;
  var me=el.childNodes[0];
  if(css){
   var c=document.createElement('style');
   c.setAttribute('type','text/css');
   c.innerHTML=css;
   me.appendChild(c);
  }
  return me;
};
 fn.r4=function(){ return (~~( (Math.random()+1)*0x10000)).toString(16).slice(1) };
 fn.xpad=function(body,form,cep="."){
  var b =body.toString().split(cep),f =form.split(cep),r =[];
  if(f[0]){ r[0]= ( f[0] + b[0]||'' ).slice( -f[0].length ); }
  if(f[1]){ r[1]= ( b[1]||'' +f[1] ).slice(0,f[1].length ); }
  //wild
  if(f[0]==='*') r[0]=b[0];
  if(f[1]==='*') r[1]=b[1];
  return r.join(".");
  //xpad("44434342443245.7755666","*.00") //=> 44434342443245.77
 };
 
 var P=function(name,tag,css,fn){
  var el =P.initer(tag,css)
  ,_name = (name)?name:P.autoid();
  P.set(_name,el);
  P.data.org[_name]={name:_name,tag:tag,css:css,fn:fn}
  fn(el,_name);
 }
 //
 P.data={rap:{},obj:{},off:{},on:{},org:{}};
 //
 P.list=function(name){
  if(name==='rap') return P.data.rap;
  if(name==='emit' || name==='on') return P.data.on;
  if(name==='set' || name==='get') return P.data.obj;
  return P.data.org;
 }
 //
 P.set=function(name,d){
  P.rap('(system:set) '+name);
  P.data.obj[name]=d;
 }
 P.get=function(name){
  P.rap('(system:get) '+name);
   if(name) return P.data.obj[name];
   return P.data.obj;
 }
 P.on=function(name,fn){
  P.rap('(system:on) '+name);
  P.data.on[name]=fn||P.data.off[name];
 }
 P.off=function(name){ 
  P.rap('(system:off) '+name);  
  P.data.off[name]=P.data.on[name];P.data.on[name]=null;
 }
 P.emit=P.emitt=P.fire=P.trigger=function(name){ 
  var arg=[].slice.call(arguments,1);
  if(P.data.on[name]){
   P.rap('(system:emit) '+name );
   return P.data.on[name].apply(this,arg);
  }else{ 
   P.rap('(system:emit:not found. off or null) '+name )
  }
 }
 P.r4=P.autoid=fn.r4;
 P.initer =fn.initer;
 P.xpad=fn.xpad;
 //util
 P.autoid=function(){
  var i=P.r4();
  while(P.data.obj[i]){ i=P.r4() }
  return i;
 }
 P.time= Date.now();
 P.rapcount=0;
 P.rap=function(str){
  if(P.rapflg){
    var n=Date.now(),r=n-P.time
    ,_str =(typeof str==='string')? str: JSON.stringify(str);
    P.data.rap[P.rapcount]={str:_str,rap:r} 
    console.log(P.xpad(P.rapcount,'000'),P.xpad(r,'    ') +'ms',str);
    P.rapcount++;   
    n=r;
  }
 }
 P.rapflg=null;
 
 root.parts=P;
})(this);
