/*Usage
 //normal is click kill
 mes("test")
 //auto time kill and click kill
 mes("test",5000)
*/

(function(root){
 var mbox=null;
 function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrom)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have. (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
};
 function makeul(){ 
  var css=`list-style:none!important;
  padding:0;margin:0;
  position:fixed;
  right:0;top:0;
  float:right;
  min-width:15em;
  max-width:15em;
  height:auto;
 `;  
  var name='data-mes';
  var el=document.createElement('ul');
  el.setAttribute('data-mes','true');
  el.setAttribute('style',css);
  return el;
 };
 function makeli(obj){
  var css=` border-bottom:1px solid #f6f6f6;
 padding:0.2em;
 `;  
  var name='data-mes';
  var el=document.createElement('li');
  el.setAttribute('data-mes','true');
  el.setAttribute('style',css);
  if(typeof obj==="string"){
   el.textContent=obj;
  }else{
   if(isElement(obj)) el.appendChild(obj);
   else el.textContent="error:no add. allow string or HTMLElement.";
  }
  return el;
 };
 
 var o=function(obj,killwait=-1){
  return new Promise(function(sol){
   //
  if(mbox==null){ 
   mbox=makeul();        
   document.body.appendChild(mbox);
  }
  var el=makeli(obj);//.cloneNode(true);
  mbox.appendChild(el);
  //el.parentNode.removeChild(el);   
   //
   var f=function(){ el.parentNode.removeChild(el);sol() };
   el.addEventListener('click',()=>{ f() });
   if(killwait!=-1) setTimeout(()=>{ f() },killwait)
  });
 }
 root.mes=o;
})(this);
