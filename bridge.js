(function(root){
 
 var B=function(){};
 B.o={on:{},off:{},hint:{}}
 B.on=function(name,fn){ 
  if(fn) B.o.on[name]=fn;
  else B.o.on[name]=B.o.off[name];
 }
 B.off=function(name){
  B.o.off[name]=B.o.on[name];
  B.o.on[name]=null;
 }
 B.emit=function(name){
  var arg=[].slice.call(arguments,1);
  if(B.o.on[name]) return B.o.on[name].apply(this,arg);///??
  else console.warn(name,'emit not called. on not defined. null or off')
 }
 B.hint=function(name,hint){
  if(name && hint){ B.o.hint[name]=hint;return}
  else if(name && !hint){ console.log(name,B.o.hint[name]);return}
  else if(!name && !hint){ Object.keys(B.o.hint).forEach((d)=>{ console.log(d,B.o.hint[d])  });return}
 }
 B.check=function(name){
  var f=(s)=>{ if(!B.o.hint[name]) console.warn(name,'hint not defined! plz write.') }
  if(name) f(name)
  else if(!name){ Object.keys(B.o.on).forEach((d)=>{ f(d) }) }
 }
 
 root.bridge=B;
})(this);
