 (function(root){
  var M=function(){
  };
  M.o={};
  M.time=Date.now();
  M.lex=function(str){
   M.time=Date.now();
   var re_m=/(^＃（(.+?)）＠(.+?)$)|(^＃(.+?)＠(.+?)$)|(^＃（(.+?)）$)|(^＃(.+?)$)/
   ,re_c= /(^；＃(.+?)：(.+?)$)|(^；＠(.+?)：(.+?)$)|(^；＊(.+?)：(.+?)$)|(^；？(.+?)：(.+?)$)|(^；$|^；(.+?)$)/;

   return new Promise((sol)=>{
     var data={main:[],other:[] },f=function(name){ return {section:name,body:[]} }
     var o,html
     var _str=str.split('\n').forEach(function(d,i){
      //var ck=d.charAt(0);
      if(re_m.test(d)){// ＃
      if(o) data.main.push(o);
      var r= d.match(re_m);
       //
       if(r){
        var t,a,type,flg=(data.main.length===0);
        if(r[1]){type=4;t=r[2];a=r[3];o=f(t);} //#()@
        if(r[4]){type=3;t=r[5];a=r[6];o=f(t);} //#@
        if(r[7]){type=2;t=r[8];       o=f(t);} //#()
        if(r[9]){type=1;t=r[10];      o=f(t);} //#
         
       o.body.push({ 
        title:(flg)?true:false
        ,midasi:true
        ,basyo:(a)?true:false
        ,t:t
        ,a:a||false
        ,view:type
        ,html:'<div data-view="'+type+'" '+ ((flg)?'data-title="true" ':'')+ ((a)?('data-id="'+a+'" data-type="＠"'):'') +'>'+'<h3 data-id="'+t+'" data-type="＃">'+t+'</h3>'+'</div>'
        ,line:i
        ,str:d
       });
        
       }else{
         console.error('# is unknown err!!!!')
       }
       
       //
      return}
      
      
      if(!o) return; //first # write start
      
      
      if(re_c.test(d)){ //；
       //
       var r=d.match(re_c);
       if(r){
        var type,d1,d2
        if(r[13]){/*type=false*/} //console.log(i,';') //14 //但し ；のみの場合14はnull
        if(r[10]){type='？';d1=r[11],d2=r[12]} //console.log(i,';?:') //11,12
        if(r[1]){type='＃';d1=r[2],d2=r[3]} //console.log(i,';#:') //2,3
        if(r[4]){type='＠';d1=r[5],d2=r[6]} //console.log(i,';@:') //5,6
        if(r[7]){type='＊';d1=r[8],d2=r[9]} //console.log(i,';*:') //8,9  
       
       if(type)
        data.other.push({
          basyo:(type==='＠')?true:false
         ,yougo:(type==='＊')?true:false
         ,midasi:(type==='＃')?true:false
         ,mark:(type==='？')?true:false
         ,comment:true
         ,type:type
         ,d1:d1
         ,d2:d2
         ,html:( (type==='＠')?'[data-id="'+d1+'"][data-type="'+type+'"]{background-image:url('+d2+');}':'[data-id="'+d1+'"][data-type="'+type+'"]::after{ content:"'+d2+'";}')
         ,section:o.section
         ,line:i
         ,str:d 
        })
       //
       o.body.push({ 
        comment:true
        ,html:'<p data-comment="true">'+d+'</p>'
        ,line:i
        ,str:d
        ,type:type||false
       })
        
       }else{
         console.error('； is unknown err!!!!')
       }
                
      return}

      
      {//other
       console.log(d)
       o.body.push({ 
        para:true
        ,html:'<p data-para="true">'+d+'</p>'
        ,line:i
        ,str:d
       })
      return}
      //xyz:true;
     });//forEach     
     data.main.push(o);//lastdata comporse
     M.o=data;
     sol(data);
   });
  };
  M.render=function(type,data){
    if(type==='body'){
    return data.main.map((se)=>{
      return '<div data-id="'+se.section+'" data-type="section">'
       +se.body.map((d)=>{return d.html}).join('\n')
       +'</div>'
     }).join('\n');
     
    }
   
    if(type==='other'){ //else
    return data.other.map((d)=>{
      return d.html
     }).join('\n');
     
    }
    /*
    if(type==='basyo') return data;
    if(type==='yougo') return data;
    if(type==='midasi') return data;
    */
   }
  
  
  root.markra=M;
 })(this);
