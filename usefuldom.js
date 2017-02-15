(function(root){
  if(!window){ throw 'object window is null'; return}
  root.get=function(d){return (d===Element)? d:document.getElementById(d)};
  root.getq=function(d){return (d===Element)? d:document.querySelector(d)};
  root.getqs=function(d){
   return (d===Element)? d:
    Array.prototype.slice.call(document.querySelectorAll(d));
  }
  root.on =function(obj,type,listener,opt=false){
   return obj.addEventListener(type,listener,opt)
  };
  root.off=function(obj,type,listener,opt=false){
   return obj.removeEventListener(type,listener,opt)
  };
  root.wait=function(wait=0,d=null){
   return new Promise(function(sol){setTimeout(()=>{sol(d)},wait) });
  };
  root.cwait=function(el,cls,wait=0,d=null){
   return new Promise(function(sol){
   el.classList.add(cls);setTimeout(()=>{ el.classList.remove(cls);sol(d); },wait)
    });
  };
  root.chas=function(e,str){
   return (str.split(',').filter((d)=>{ return e.classList.contains(d)}).length===0)? false:true;
  }
  root.ary=function(){
    return Array.prototype.slice.call(arguments);
  }
  root.classOnce=root.classonce;
  
  root.vsrc=function(src,type="text/javascript"){
     var blob = new Blob([src],{type: type});
 return window.URL.createObjectURL(blob);
}
 root.textWorker =function(src){
  var blob = new Blob([src],{type: "text/javascript"});
 return new Worker(window.URL.createObjectURL(blob));
}

  
  
  
})(this);
