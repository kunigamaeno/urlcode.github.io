(function(root){
  var def={
  "$non":document.createElement("span")
   ,"$":document.createElement("span")
   ,"$1":document.createElement("span")
   ,"$2":document.createElement("span")
   ,"$3":document.createElement("span")
   ,"$4":document.createElement("span")
   ,"$5":document.createElement("span")
   ,"$6":document.createElement("span")
   ,"$7":document.createElement("span")
   ,"$8":document.createElement("span")
   ,"$9":document.createElement("span")
   ,"_time":"0.1s"
 };
 var o=function(obj){o.def=Object.assign({},def,obj);return o};
 o.go=function(str){
   return new Promise((sol)=>{
   var a=o.deploy(str),walk=0
   ,fl=function(elcls,type){
      elcls.forEach((d)=>{d.cls.forEach((c)=>{ d.el.classList[type](c)})});
   }
   ,f=function(obj){
     if(!a.ary[walk]){sol(a);return}
     fl(obj.elcls,'add');
     setTimeout(()=>{
      fl(obj.elcls,'remove'); walk++;f(a.ary[walk])
     }, obj.time*1000 );
   }
   ;
   f(a.ary[walk])
   });
 };
 o.deploy=function(str){
  var f=o.macrodep,cmd=f(str,o.def),fa=o.cmddep
   return { org:str,cmd:cmd,ary:fa(cmd) }
 };
 o.cmddep=function(str){
  var f=function(onecmd){
   var a=onecmd.split(',')
   ,elcls=a[0].split(' ').filter(d=>d).map((d)=>{
   var s=d.split('.');
   return (d.charAt(0)==='$')
    ?{el:o.def[s[0]||"$"],cls:s.slice(1)}
    :{el:o.def["$"],cls:s }
  })
  ,time= parseFloat(a[1]),dtime=parseFloat(o.def["_time"]);
  time=(Number.isNaN(time))?dtime:time;  
    return {elcls:elcls,time:time}
  }
  
  return str.split('>').filter(d=>d).map(d=>f(d));
  };
 o.macrodep=function(str,mydef){
   return str.split(">").map((d)=>{
    if(d.split(/[$.,]/g).length===1) return mydef[d];
    return d;
   }).join(">");
  }  
 //entry point
 var E=function(){
  var opt={},non=def["$non"];
  Array.from(arguments).forEach((d,i)=>{
   var n=i+1;opt['$'+n] = d||non;
   if(i===0) opt['$'] =d||non;
  });
  return new o(opt);
 };
 //update def
 E.def=function(obj){Object.assign(def,obj);E.updatedef()}
 E.macrodep=o.macrodep;
 E.updatedef=function(){
  //macro deploy;
  var f=E.macrodep
  ,dep=Object.assign({},def)
  ;
  Object.keys(def).filter((d)=>{ return (d.charAt(0)==='@') })
   .forEach((d)=>{ 
    var str=def[d],max=100;
    for(var i=0;i<max && str.indexOf('@')!==-1;i++){str=f(str,def)}
    dep[d]=str;
   });

  Object.assign(def,dep);
 };
 root.efftt=E;
})(this);
