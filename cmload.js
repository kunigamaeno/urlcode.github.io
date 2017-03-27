B.on('cmload',function(el){
   return new Promise(function(sol){
    T([
 "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/codemirror.min.css"
,"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/theme/twilight.min.css"
,`.CodeMirror{ height:100%;}
.cm-s-twilight .CodeMirror-gutters {background: #222;border-right: 1px solid #333;}
.CodeMirror.cm-s-twilight {color: #aaa;}`
,"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/codemirror.min.js" 
]).then((d)=>{
 
    var myCodeMirror = CodeMirror(el, {
      value: '',
      mode:  "markdown",
     lineNumbers :true,
     lineWrapping: true,
     theme:"twilight"
    });
//    var fdata=()=>{return myCodeMirror.getValue()} 
//     myCodeMirror.on('change',function(){ myCodeMirror.getValue() })
//     myCodeMirror.on('gutterClick',function(){console.log(arguments)}); 
      sol( myCodeMirror );
    }); 
  });
 });
