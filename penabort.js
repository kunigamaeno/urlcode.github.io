(function(root){
;['abort'].forEach((d)=>{
 var f=function(flg=0){
   if(flg==0) console.log('click abort');
   else console.log('timeout abort');
   [].slice.call(document.querySelectorAll('script'))
    .forEach((d)=>{ if(d.textContent.indexOf('pen.js')!==-1) d.innerHTML='' })
 }
 
 //trigger 1 button
 var el=document.createElement('button');
 el.textContent='abort';
 el.style='position:fixed;top:0;right:0;margin:1rem;opacity:0.3;'
 + 'border:3px solid;background:#111;color:#aaa;cursor:pointer';
 el.onclick=function(){ f() };
 document.body.appendChild(el);
 //
 //trigger 2 timeout
 var abort =null;
 var time=1000*120;
 if(!abort)
  setTimeout(()=>{ f(1); },time);
 //
})
  root.abort=abort;
 })(this);

