# urlcode.github.io

------
# history:v0.0.2
## rule make
- {source}.js 
- {source}.md
- {source}.test.html
 
## ucode io fix

ucode(data,flg,{u:baseurl,p:paramname}); //flg=1 > encode  //flg=-1> decode

------
# history:v0.0.1
## this site mean.
url param and short url => no storaged data save.

## twitter use
i usefull-and-usefull twitter short url, i think.
so,exsam...
```
urlcode.github.io/index.html?ucode={jsondata}
```
if jsondata change to JSON.
so,exsam...ucode parse is:
```
var u= new ucode(),data;
data =u.parse(window.location.href);
//data.source,data.title,data.md,data.scripts,data.mydata...
```
# Problem. ucode is too long!
ex) old-ie is max url length 4096.

## world-seem look around short url.
so,exsam... ucode too long, but Not short url change is short.

# Ya! twitter!
if twitter tweet-short url, url save the Data.  
