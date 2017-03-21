(function(root){ 
var halft=function(obj){
 var o={},c=(s,o)=>{
  var el = document.createElement(s);
  return Object.assign(el,o);
 };
 o.el=c('div',{className:'h-el'})
 if(obj.id) o.el.id=obj.id;
 o.r=c('div',{className:'h-r'});
 o.l=c('div',{className:'h-l'});
 var f=function(){
  var v=this.value; 
   o.l.style.width= v+'%';
   o.r.style.left= v+'%';
   o.r.style.width= (100-v)+'%';
 }
 var pos=obj.pos||'top'
 o.gu=c('input',{className:'h-gu '+pos,type:'range',step:5,value:obj.value||50});
 o.gu.oninput=f;
 f.bind(o.gu)();
// o.gu.onblur=function(){this.style.visibility='initial'}
 [o.gu,o.l,o.r].forEach((el)=>{o.el.appendChild(el)}) 
 
 return o;
};

 root.halft=halft;
})(this); 
