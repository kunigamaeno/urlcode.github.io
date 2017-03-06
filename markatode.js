(function(root){
 
 var fn={};
 fn.map= {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    "/": '&#x2F;'
  };
 //fn.escape=//_.escape;
 fn.escape= function escapeHtml(string) {
    return String(string).replace(/[&<>"'`\/]/g, function (s) {
      return fn.map[s];
    });
  }
 //#は行頭から始まり\nで終わる。
 //余分な装飾は許可しない。
 //---は3-5の間でhr変換 \sか\nで終わる。
 //```は3-5の間で次の```で終わる。
 // \nを含む場合はpre code
 // １行の場合は code 
 //[]は余分な表示なし <sup><a ...>*</a></sup>のみ
 //\n\nは<br />改行
 //[[@xxxx:]]は拡張マクロ
 
 fn.hilight=function(str){
  var f=function(d,tag,cls){
    return '<'+tag+' class="'+cls+'"'+'>'+d+ '</'+tag+'>'
  }
   return str.replace(/[\W\?]/g,(s)=>{return (! /[\s\r\n]/.test(s) )? f(s,'span','str'):s})
    .replace(/\breturn\b|\bPromise\b/g,(s)=>{return f(s,'span','ret') })
    .replace(/\b\d+(\.\d+)?\b/g,(s)=>{return f(s,'span','num')}) 
  
/*   return str.replace(/[\W\?]/g,(s)=>{return (! /[\s\r\n]/.test(s) )? s.tagwrap('span.str'):s})
    .replace(/\breturn\b|\bPromise\b/g,(s)=>{return s.tagwrap('span.ret') })
    .replace(/\b\d+(\.\d+)?\b/g,(s)=>{return s.tagwrap('span.num')})
*/  
  //use 
  /* //span.ret,span.str,span.num
  pre>code{font-family: 'Quantico', sans-serif; color: $base;}
.str{color:#fff;}
.ret{color:#df3;}
.num{color:#2dd;}
.cmt{color:#333;}
  */
  //
  };
 
 var M=function(){};
 M.orgcss="pre>code{font-family: 'Quantico', sans-serif; color: #2c2;}"
  +".str{color:#fff;}.ret{color:#df3;}.num{color:#2dd;}.cmt{color:#333;}";
 M.cb=[];
 M.cep="\n";
 M.hi=fn.hilight
 M.repspecial=function(data){
  var r='',rf=function(){return};
  //1.[[]]特殊文字をストックする。
   var cep=M.cep
   ,code="(`{3,5}([\\s\\S]+?)`{3,5})" //``` function().... ```
   ,quote ="(>{3,5}([\\s\\S]+?)>{3,5})"  //>>data1 says .... >>
   ,macro ="(\\[{2}([\\s\\S]+?)\\]{2})"    //[[@code:xxxxx]]
   ,r=new RegExp([code,quote,macro].join('|'), 'g')
   ,rf=function (str){
    var rep="<!-- @@"+M.cb.length+"@@ -->"
    ,num= str.match(/`{3,5}|\>{3,5}|\[{2}/)[0].length;
    var s=str.slice(num,str.length-num).trim();
    M.cb.push({mod:str.slice(0,2),org:str,rep:rep,indata:s});
    return cep+rep;
  }
   
  return data.replace(r,rf);
 }
 M.repbar=function(data){
  //2. hr brを変換する
  var cep=M.cep
  ,br="(\r\n|\n|\r){2,10}" // \n\n
  ,hr="-{3,10}" // ---
  ,r=new RegExp([br,hr].join("|"),'g')
  ,rf=function(str){
   var rep= (str.charAt(0)==='-')?"<hr />":"<p></p>"+cep;//brは実際には <p></p>にする
   return cep+rep
  }
  return data.replace(r,rf);
 }
 M.inrep=function(data){
    var f=fn.escape
    ,mark ="(_{2,5}([\\s\\S]+?)_{2,5})" //__aiuewo__
    ,href="(\\[(.+?)\\])"
    ,r=new RegExp([mark,href].join("|"),'g')
    ,rf=function(str){
      var rep= (str.charAt(0)==='[')
      ? '<sup><a href="'+str.slice(1,this.length-1)+'">^</a></sup>'
      : '<mark>'+f(str).replace(/_{2,5}/g,'') +'</mark>';//brは実際には <p></p>にする     
      return rep
     }
    ;
    return data.replace(r,rf)
 }
 M.reppara=function(data){
  //3. inline 要素を変換する
  //htmlタグは ```<br>```で囲むと文字として認識
  //パラグラフのセットは <h..></> <br /> or <!-- @@
  var line=/\r\n|\n|\r/g  
  ,h="^(#{1,6}) (.+?)$"
  ,inrep=M.inrep
  ,cep=M.cep
  ;
  return data.split(line).filter(d=>d).map(d=>d.trim())
   .map((d)=>{ 
    //none
    if(d.charAt(0)==='<') return d;
   
    //#
    var r=d.match(h);
    if(r) return '<h'+r[1].length+'>'+inrep(r[2])+'</h'+r[1].length+'>';
   
    //paragraph
    return '<p>'+inrep(d)+'</p>'; 
  }).join(cep);
};
 M.repcb=function(data){
  var cb=M.cb,ret=data,inrep=M.inrep
  ;
  cb.forEach((d)=>{
   //console.log(d);
   if(d.mod==='``'){
    var f=M.hi;
    ret= ret.replace(d.rep,'<pre><code>'+f(d.indata)+'</code></pre>');
   }
   
   if(d.mod==='>>'){//aside
    ret= ret.replace(d.rep,'<aside>'+inrep(d.indata)+'</aside>');    
   }
   
  })
  return ret;
 };
 M.lex=function(src){
  //console.log(src)
  var data=src
  ;
  M.cb=[];//initialize;
  data =M.repspecial(data);
  //console.log("spe",M.cb)
  data =M.repbar(data);  
  
  data =M.reppara(data);
    
  data=M.repcb(data);
  return data;
 }
 root.markatode=M;
})(this);
