(function(root){

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
  if(typeof html !=='string') return f(html);
  //
  var el=doc.createElement('span');
  el.innerHTML=html;
  var me=el.childNodes[0];
  return f(me);
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

root.thenload=T;
})(this);
