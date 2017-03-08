(function(root){

 var css=function(d){
  return new Promise((sol)=>{
  var el=document.createElement('link');
  el.onload=function(ev){sol(ev)}
  document.head.appendChild(el);
  el.rel='stylesheet'
  el.media='all'
  el.href=d});
 }
 ,js=function(d){
  return new Promise((sol)=>{
  var el=document.createElement('script');
  el.onload=function(ev){sol(ev)}
  el.type='text/javascript';
  document.body.appendChild(el);
  el.src=d});
 }
 ,textcss=function(d){
  return new Promise((sol)=>{
  var el=document.createElement('style');
  document.head.appendChild(el);
  el.type="text/css";
  el.innerHTML=d;
  sol('textcss');
  });
 }
 ;

var T=function(ary){
 var a=ary.map((d)=>{
  var istcss=/\r\n|\n|\r/.test(d)
  ,isjs=/(.+?)\.js$/.test(d.split('?')[0])
  ;
  if(istcss) return textcss.bind(this,d)();
  if(isjs) return js.bind(this,d)();
  return css.bind(this,d)(); 
 });
 return new Promise((sol)=>{
   Promise.all(a).then((d)=>{ sol(d) })  
 })
}

root.thenload=T;
})(this);
