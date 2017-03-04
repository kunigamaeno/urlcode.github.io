String.prototype.wrap=function(s,e){return s + this + e};
String.prototype.tagwrap=function(s,e){
 var data=this
 ,isv=function(tag){
  var flg=null;
  ["area","base","basefont","br","col","frame"
           ,"hr","img","input","isindex","link","meta","param"]
   .filter(d=>/(^.+?)\b/.test(d) )
   .forEach((d)=>{if(d===tag) flg=d });
  return flg;
   //.filter(d=>(d===tag.match(/(^.+?)\b/g)[0]) );
 };
 if(!e&&s){
  var ts=(s==='')?'<span>':s
  ,tag=ts.replace(/<|\/>|>/g,'').trim().match(/(^.+?)\b/g)[0]
  ,te='</'+tag+'>'
  ,dep=function(str){
   //'div#id[aaa="aa"][bbb="iii"].classA.classB'
 var ret=str.match(/#|\[|\]|\./g)||[]
 ,flg=0,wk=str,wk2='';
 ret=ret.filter((cep)=>{
  if(cep==='[') flg=1;
  if(cep===']') flg=0;
  if(cep==='.'&&flg==1) return;
  else return cep;
 }).map((cep)=>{
  var r= wk.split(cep,1)[0];
  wk=wk.slice(r.length+1);
  r= wk2+r
  wk2=cep;
  return r;
 })
 ret.push(wk2+wk);
 
 var t='',id='',cls='',attr='';
 ret.forEach((d)=>{
  var c=d.charAt(0);
  if(c==='['){attr+=d.slice(1)+' ';return}
  if(c==='#'){id=d.slice(1);return}
  if(c==='.'){cls+=d.slice(1) +' ';return}
  if(c===']'){return}
  t=d+' ';
 });
  //console.log(t,id,cls,attr)
   id= (id.length!==0)? 'id="'+id+'" ':'';
   cls=(cls.length!==0)? 'class="'+cls.trim()+'" ':''
   attr=(attr.length!==0)? attr.trim():'';

  return (t +id+cls+attr).trim().wrap('<','>');
   
  };
  ts=dep(ts);
  return (isv(tag))?data.wrap(ts.replace('>',' />'),''):data.wrap(ts,te); 
 }else{
  //console.log(data,s,e)
  return data.wrap(s||'',e||'');
 }
 //
};

//div[aaa=][bbb=]#id.classA.classB

(function(){
 //seal

var dep=function(str){
 var ret=str.match(/#|\[|\]|\./g)||[]
 ,flg=0,wk=str,wk2='';
 ret=ret.filter((cep)=>{
  if(cep==='[') flg=1;
  if(cep===']') flg=0;
  if(cep==='.'&&flg==1) return;
  else return cep;
 }).map((cep)=>{
  var r= wk.split(cep,1)[0];
  wk=wk.slice(r.length+1);
  r= wk2+r
  wk2=cep;
  return r;
 })
 ret.push(wk2+wk);
 
 var t='',id='',cls='',attr='';
 ret.forEach((d)=>{
  var c=d.charAt(0);
  if(c==='['){attr+=d.slice(1)+' ';return}
  if(c==='#'){id=d.slice(1);return}
  if(c==='.'){cls+=d.slice(1) +' ';return}
  if(c===']'){return}
  t=d+' ';
 });
  //console.log(t,id,cls,attr)
   id= (id.length!==0)? 'id="'+id+'" ':'';
   cls=(cls.length!==0)? 'class="'+cls.trim()+'" ':''
   attr=(attr.length!==0)? attr.trim():'';

 return (t +id+cls+attr).trim().wrap('<','>');
};

 
 });//seal  
