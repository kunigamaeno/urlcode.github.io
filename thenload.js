(function(root){
 /*bridge*/
var B={};
B.fn={};
B.f=function(d){return 'B.emit("%s",args...)'.replace('%s',d) }
B.on=function(cmd,fn){ 
 if(B.fn[cmd]) console.warn(cmd,':overwrited');
 B.fn[cmd]=fn;
}
B.emit=function(){
 if(arguments.length===0){console.warn(':cmd not');return}
 var cmd=arguments[0],arg=[].slice.call(arguments,1)
 ;
 if(!B.fn[cmd]){console.warn(B.f(cmd),':cmd not');return}
 return  B.fn[cmd].apply(this,arg);
}
B.list=function(opt){
 if(!opt) Object.keys(B.fn).forEach((d)=>{console.log(B.f(d),''+B.fn[d] )})
 else Object.keys(B.fn).forEach((d)=>{console.log(B.f(d))})
}
B.hint= B.list;
 
 /**/
 var css=function(d,doc=document){
  return new Promise((sol)=>{
  var el=doc.createElement('link');
  el.onload=function(ev){sol(ev)}
  doc.head.appendChild(el);
  el.rel='stylesheet'
  el.media='all'
  el.href=d});
 }
 ,js=function(d,doc=document){
  return new Promise((sol)=>{
  var el=doc.createElement('script');
  el.onload=function(ev){sol(ev)}
  el.type='text/javascript';
  doc.body.appendChild(el);
  el.src=d});
 }
 ,textcss=function(d,doc=document){
  return new Promise((sol)=>{
  var el=doc.createElement('style');
  doc.head.appendChild(el);
  el.type="text/css";
  el.innerHTML=d;
  sol('textcss');
  });
 }
 ,initer=function(html,f,doc=document){
  var _f =(f)?f:(el)=>{return el};
  if(typeof html !=='string') return _f(html);
  //
  var el=doc.createElement('span');
  el.innerHTML=html;
  var me=el.childNodes[0];
  return _f(me);
}
;

var T=function(ary,doc=document){
 var key=doc.baseURI.split('?')[0];
 if(!T.list[key]) T.list[key]=[];
 var a=ary.map((d)=>{
  if(T.list[key].includes(d)) return;  
  T.list[key].push(d);//
  var istcss=/\r\n|\n|\r/.test(d)
  ,isjs=/(.+?)\.js$/.test(d.split('?')[0])
  ;
  if(istcss) return textcss.bind(this,d,doc )();  
  if(isjs) return js.bind(this,d,doc )();
  return css.bind(this,d,doc )(); 
 }).filter(d=>d);
 return new Promise((sol)=>{
   Promise.all(a).then((d)=>{ sol(d) })  
 })
};
T.list={};
T.initer=initer;
T.bridge=B;

root.thenload=T;
})(this);
