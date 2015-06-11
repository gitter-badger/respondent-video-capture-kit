var WebProducer=function(e){function t(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="/lib/",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";var i=function(e){if(!e||!e.id)return alert("You must provide an id for the web producer");this.id=e.id,this.width=e.width||320,this.height=e.height||240,this.el=null,this.trace=e.trace,this.streamName=null,i[this.id]=this;var t=e.path||"",n=e.style||"display:block;text-align:left;";this.createElement(this.id,this.width,this.height,t,n),this.port=e.port||"80",this.methods=["setCredentials","getCredentials","setUrl","getUrl","setStreamWidth","getStreamWidth","setStreamHeight","getStreamHeight","setStreamFPS","getStreamFPS","setStreamQuality","getStreamQuality","setStreamBandwidth","getStreamBandwidth","connect","disconnect","publish","unpublish","countCameras","isCameraMuted","setMirroredPreview","getMirroredPreview","setAudioStreamActive","getAudioStreamActive","setStreamBufferTime","getStreamBufferTime","getStreamTime","getStreamBufferLength","getStreamInfoDroppedFrames","getStreamInfoCurrentBytesPerSecond","getStreamInfoVideoLossRate","getStreamInfoString","getStreamCurrentFPS","getCameraCurrentFPS"],this.flash_methods_prepare(),e.remote_logger_name&&(this.remoteLoggerActivate(e.remote_logger_name),this.remoteLoggerLog("jsMethodCalled","constructor",[e]),window.navigator&&window.navigator.userAgent&&(this.remoteLoggerLog("userAgent","userAgent",navigator.userAgent,""),this.remoteLoggerLog("platform","platform",[],r(2))))};i.log=function(e){if(console&&console.log){var t=i[e];t.trace&&console.log.apply(console,arguments)}},i.js_event=function(e,t,r,n){var o=i[e];o.trace&&i.log(e,t,r,n),o.fire(t,r,n),o.remoteLoggerLog("flashEventTriggered",t,[r,n])},i.extend=function(e){for(var t in e)i.prototype[t]=e[t]},i.prototype={flash_methods_prepare:function(){var e=this;this.methods.forEach(function(t){e[t]||(e[t]=function(){var r=Array.prototype.slice.call(arguments);return e.flash_method_call(t,r)})})},flash_method_call:function(e,t){var r,i=this;try{r=i.el[e].apply(i.el,t),this.remoteLoggerLog("flashMethodCalled",e,t,r)}catch(n){console.log("ERROR ",n," on method ",e," with ",this),this.remoteLoggerLog("flashMethodError",e,t,n.message||n)}return r},createElement:function(e,t,r,i,n){var o=this,a="11.4.0",s="playerProductInstall.swf",l={id:e},u={};u.quality="high",u.bgcolor="#ffffff",u.allowscriptaccess="sameDomain",u.allowfullscreen="true";var c={};c.align="left";var h=function(){o.check_already_ready()};this.on("ready",function(){o.on_ready.apply(o,arguments)}),swfobject.embedSWF(i+"producer.swf",e,t,r,a,s,l,u,c,h),swfobject.createCSS("#"+e,n)},check_already_ready:function(){var e=this;try{var t=document.getElementById(e.id);t&&t.isReady()&&e.fire("ready")}catch(r){}},get_http_base_url:function(){var e=this.port,t="http://",r=0===window.location.href.indexOf("https");r&&(e=443,t="https://");var i=this.getUrl().split("/")[2].split(":")[0],n=[t,i,":",e,"/"].join("");return n},getStats:function(){var e={bytesPerSecond:this.getStreamInfoCurrentBytesPerSecond(),droppedFrames:this.getStreamInfoDroppedFrames(),bufferLength:this.getStreamBufferLength(),videoLossRate:this.getStreamInfoVideoLossRate(),currentFPS:this.getStreamCurrentFPS(),cameraCurrentFPS:this.getCameraCurrentFPS()};return e},_CORS_support:function(){return window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?!0:"undefined"!=typeof window.XDomainRequest?!0:!1},on_ready:function(){this.el=document.getElementById(this.id),this.flash=this.el;var e=this;this.on("publish",function(t){t=t.split("?")[0],e.on_publish(t)}),e.on_unpublish_check_content&&this.on("unpublish",function(t){t=t.split("?")[0],e.on_unpublish_check_content(t)})},on_publish:function(e){this.publishStartTime=(new Date).getTime(),this.streamName=e}};var n=r(4);i.extend(n);var o=r(6);i.extend(o);var a=r(7);i.extend(a);var s={url_rtmp_original:null,url_http_api:null,url_get_host:function(e){var t=e.split("://")[1];return t=t.split("/")[0],t.split(":")[0]},setUrl:function(e){this.url_rtmp_original=e},hub_info_get:function(e){var t=this.current_protocol(),r=this.url_get_host(this.url_rtmp_original),i=t+"://"+r+"/api/info/jsonp",n=jQuery.ajax({url:i,dataType:"jsonp"});return n.done(function(t){e(t)}),n.fail(function(){e({})}),n},current_protocol:function(){var e=0===window.location.href.indexOf("https");return e?"https":"http"},connect:function(){var e=this;this.hub_info_get(function(){e.connect_on_hub_info.apply(e,arguments)})},connect_on_hub_info:function(e){var t=e.ipPrivate;this.url_http_api=this.current_protocol()+"://"+this.url_get_host(this.url_rtmp_original)+"/bounce/"+t+"/",this.fire("url-changed"),this.remoteLoggerLog("hubInfo","currentHubChanged",{},e);var r=e.ip,i=this.url_get_host(this.url_rtmp_original),n=this.url_rtmp_original.replace(i,r);this.flash_method_call("setUrl",[n]),this.flash_method_call("connect",[])},get_http_base_url:function(){return this.url_http_api}};i.extend(s);var l=r(8);i.extend(l);var u=r(9);i.extend(u);var c=r(11);i.extend(c),i.mixins={ContentsMixin:n,TimedMetadataMixin:o,JobsMixin:a,LoadBalancingMixin:s,CamerafixMixin:l,LoggingMixin:u,EventEmitterMixin:c},Array.prototype.forEach||(Array.prototype.forEach=function(e,t){var r,i;if(null==this)throw new TypeError(" this is null or not defined");var n=Object(this),o=n.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(arguments.length>1&&(r=t),i=0;o>i;){var a;i in n&&(a=n[i],e.call(r,a,i,n)),i++}}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var r;if(null==this)throw new TypeError('"this" is null or not defined');var i=Object(this),n=i.length>>>0;if(0===n)return-1;var o=+t||0;if(Math.abs(o)===1/0&&(o=0),o>=n)return-1;for(r=Math.max(o>=0?o:n-Math.abs(o),0);n>r;){if(r in i&&i[r]===e)return r;r++}return-1}),e.exports=i},function(e,t,r){var i;(function(e,n){(function(){"use strict";function o(e){return e=String(e),e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t,r){var i={6.4:"10",6.3:"8.1",6.2:"8",6.1:"Server 2008 R2 / 7","6.0":"Server 2008 / Vista",5.2:"Server 2003 / XP 64-bit",5.1:"XP",5.01:"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"};return t&&r&&/^Win/i.test(e)&&(i=i[/[\d.]+$/.exec(e)])&&(e="Windows "+i),e=String(e),t&&r&&(e=e.replace(RegExp(t,"i"),r)),e=l(e.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").split(" on ")[0])}function s(e,t){var r=-1,i=e?e.length:0;if("number"==typeof i&&i>-1&&y>=i)for(;++r<i;)t(e[r],r,e);else u(e,t)}function l(e){return e=g(e),/^(?:webOS|i(?:OS|P))/.test(e)?e:o(e)}function u(e,t){for(var r in e)L.call(e,r)&&t(e[r],r,e)}function c(e){return null==e?o(e):M.call(e).slice(8,-1)}function h(e,t){var r=null!=e?typeof e[t]:"number";return!/^(?:boolean|number|string|undefined)$/.test(r)&&("object"==r?!!e[t]:!0)}function f(e){return String(e).replace(/([ -])(?!$)/g,"$1?")}function p(e,t){var r=null;return s(e,function(i,n){r=t(r,i,n,e)}),r}function g(e){return String(e).replace(/^ +| +$/g,"")}function d(e){function t(t){return p(t,function(t,r){return t||RegExp("\\b"+(r.pattern||f(r))+"\\b","i").exec(e)&&(r.label||r)})}function r(t){return p(t,function(t,r,i){return t||(r[q]||r[/^[a-z]+(?: +[a-z]+\b)*/i.exec(q)]||RegExp("\\b"+f(i)+"(?:\\b|\\w*\\d)","i").exec(e))&&i})}function i(t){return p(t,function(t,r){return t||RegExp("\\b"+(r.pattern||f(r))+"\\b","i").exec(e)&&(r.label||r)})}function n(t){return p(t,function(t,r){var i=r.pattern||f(r);return!t&&(t=RegExp("\\b"+i+"(?:/[\\d.]+|[ \\w.]*)","i").exec(e))&&(t=a(t,i,r.label||r)),t})}function o(t){return p(t,function(t,r){var i=r.pattern||f(r);return!t&&(t=RegExp("\\b"+i+" *\\d+[.\\w_]*","i").exec(e)||RegExp("\\b"+i+"(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)","i").exec(e))&&((t=String(r.label&&!RegExp(i,"i").test(r.label)?r.label:t).split("/"))[1]&&!/[\d.]+/.test(t[0])&&(t[0]+=" "+t[1]),r=r.label||r,t=l(t[0].replace(RegExp(i,"i"),r).replace(RegExp("; *(?:"+r+"[_-])?","i")," ").replace(RegExp("("+r+")[-_.]?(\\w)","i"),"$1 $2"))),t})}function s(t){return p(t,function(t,r){return t||(RegExp(r+"(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)","i").exec(e)||0)[1]||null})}function m(){return this.description||""}var S=b,x=e&&"object"==typeof e&&"String"!=c(e);x&&(S=e,e=null);var v=S.navigator||{},y=v.userAgent||"";e||(e=y);var k,L,P=x||O==_,T=x?!!v.likeChrome:/\bChrome\b/.test(e)&&!/internal|\n/i.test(M.toString()),C="Object",j=x?C:"ScriptBridgingProxyObject",E=x?C:"Environment",R=x&&S.java?"JavaPackage":c(S.java),I=x?C:"RuntimeObject",B=/\bJava/.test(R)&&S.java,A=B&&c(S.environment)==E,F=B?"a":"α",W=B?"b":"β",N=S.document||{},$=S.operamini||S.opera,X=w.test(X=x&&$?$["[[Class]]"]:c($))?X:$=null,G=e,D=[],K=null,U=e==y,H=U&&$&&"function"==typeof $.version&&$.version(),J=t(["Trident",{label:"WebKit",pattern:"AppleWebKit"},"iCab","Presto","NetFront","Tasman","KHTML","Gecko"]),V=i(["Adobe AIR","Arora","Avant Browser","Breach","Camino","Epiphany","Fennec","Flock","Galeon","GreenBrowser","iCab","Iceweasel",{label:"SRWare Iron",pattern:"Iron"},"K-Meleon","Konqueror","Lunascape","Maxthon","Midori","Nook Browser","PhantomJS","Raven","Rekonq","RockMelt","SeaMonkey",{label:"Silk",pattern:"(?:Cloud9|Silk-Accelerated)"},"Sleipnir","SlimBrowser","Sunrise","Swiftfox","WebPositive","Opera Mini",{label:"Opera Mini",pattern:"OPiOS"},"Opera",{label:"Opera",pattern:"OPR"},"Chrome",{label:"Chrome Mobile",pattern:"(?:CriOS|CrMo)"},{label:"Firefox",pattern:"(?:Firefox|Minefield)"},{label:"IE",pattern:"IEMobile"},{label:"IE",pattern:"MSIE"},"Safari"]),q=o([{label:"BlackBerry",pattern:"BB10"},"BlackBerry",{label:"Galaxy S",pattern:"GT-I9000"},{label:"Galaxy S2",pattern:"GT-I9100"},{label:"Galaxy S3",pattern:"GT-I9300"},{label:"Galaxy S4",pattern:"GT-I9500"},"Google TV","Lumia","iPad","iPod","iPhone","Kindle",{label:"Kindle Fire",pattern:"(?:Cloud9|Silk-Accelerated)"},"Nook","PlayBook","PlayStation 4","PlayStation 3","PlayStation Vita","TouchPad","Transformer",{label:"Wii U",pattern:"WiiU"},"Wii","Xbox One",{label:"Xbox 360",pattern:"Xbox"},"Xoom"]),Q=r({Apple:{iPad:1,iPhone:1,iPod:1},Amazon:{Kindle:1,"Kindle Fire":1},Asus:{Transformer:1},"Barnes & Noble":{Nook:1},BlackBerry:{PlayBook:1},Google:{"Google TV":1},HP:{TouchPad:1},HTC:{},LG:{},Microsoft:{Xbox:1,"Xbox One":1},Motorola:{Xoom:1},Nintendo:{"Wii U":1,Wii:1},Nokia:{Lumia:1},Samsung:{"Galaxy S":1,"Galaxy S2":1,"Galaxy S3":1,"Galaxy S4":1},Sony:{"PlayStation 4":1,"PlayStation 3":1,"PlayStation Vita":1}}),z=n(["Windows Phone ","Android","CentOS","Debian","Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "]);if(J&&(J=[J]),Q&&!q&&(q=o([Q])),(k=/\bGoogle TV\b/.exec(q))&&(q=k[0]),/\bSimulator\b/i.test(e)&&(q=(q?q+" ":"")+"Simulator"),"Opera Mini"==V&&/\bOPiOS\b/.test(e)&&D.push("running in Turbo/Uncompressed mode"),/^iP/.test(q)?(V||(V="Safari"),z="iOS"+((k=/ OS ([\d_]+)/i.exec(e))?" "+k[1].replace(/_/g,"."):"")):"Konqueror"!=V||/buntu/i.test(z)?Q&&"Google"!=Q&&(/Chrome/.test(V)&&!/\bMobile Safari\b/i.test(e)||/\bVita\b/.test(q))?(V="Android Browser",z=/\bAndroid\b/.test(z)?z:"Android"):(!V||(k=!/\bMinefield\b|\(Android;/i.test(e)&&/\b(?:Firefox|Safari)\b/.exec(V)))&&(V&&!q&&/[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(k+"/")+8))&&(V=null),(k=q||Q||z)&&(q||Q||/\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(z))&&(V=/[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(z)?z:k)+" Browser")):z="Kubuntu",(k=/\((Mobile|Tablet).*?Firefox\b/i.exec(e))&&k[1]&&(z="Firefox OS",q||(q=k[1])),H||(H=s(["(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))","Version",f(V),"(?:Firefox|Minefield|NetFront)"])),"iCab"==J&&parseFloat(H)>3?J=["WebKit"]:"Trident"!=J&&(k=/\bOpera\b/.test(V)&&(/\bOPR\b/.test(e)?"Blink":"Presto")||/\b(?:Midori|Nook|Safari)\b/i.test(e)&&"WebKit"||!J&&/\bMSIE\b/i.test(e)&&("Mac OS"==z?"Tasman":"Trident"))?J=[k]:/\bPlayStation\b(?! Vita\b)/i.test(V)&&"WebKit"==J&&(J=["NetFront"]),"IE"==V&&(k=(/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e)||0)[1])?(V+=" Mobile",z="Windows Phone "+(/\+$/.test(k)?k:k+".x"),D.unshift("desktop mode")):/\bWPDesktop\b/i.test(e)?(V="IE Mobile",z="Windows Phone 8+",D.unshift("desktop mode"),H||(H=(/\brv:([\d.]+)/.exec(e)||0)[1])):"IE"!=V&&"Trident"==J&&(k=/\brv:([\d.]+)/.exec(e))?(/\bWPDesktop\b/i.test(e)||(V&&D.push("identifying as "+V+(H?" "+H:"")),V="IE"),H=k[1]):"Chrome"!=V&&"IE"==V||!(k=/\bEdge\/([\d.]+)/.exec(e))||(V="IE",H=k[1],J=["Trident"],D.unshift("platform preview")),U){if(h(S,"global"))if(B&&(k=B.lang.System,G=k.getProperty("os.arch"),z=z||k.getProperty("os.name")+" "+k.getProperty("os.version")),P&&h(S,"system")&&(k=[S.system])[0]){z||(z=k[0].os||null);try{k[1]=S.require("ringo/engine").version,H=k[1].join("."),V="RingoJS"}catch(Z){k[0].global.system==S.system&&(V="Narwhal")}}else"object"==typeof S.process&&(k=S.process)?(V="Node.js",G=k.arch,z=k.platform,H=/[\d.]+/.exec(k.version)[0]):A&&(V="Rhino");else c(k=S.runtime)==j?(V="Adobe AIR",z=k.flash.system.Capabilities.os):c(k=S.phantom)==I?(V="PhantomJS",H=(k=k.version||null)&&k.major+"."+k.minor+"."+k.patch):"number"==typeof N.documentMode&&(k=/\bTrident\/(\d+)/i.exec(e))&&(H=[H,N.documentMode],(k=+k[1]+4)!=H[1]&&(D.push("IE "+H[1]+" mode"),J&&(J[1]=""),H[1]=k),H="IE"==V?String(H[1].toFixed(1)):H[0]);z=z&&l(z)}H&&(k=/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(H)||/(?:alpha|beta)(?: ?\d)?/i.exec(e+";"+(U&&v.appMinorVersion))||/\bMinefield\b/i.test(e)&&"a")&&(K=/b/i.test(k)?"beta":"alpha",H=H.replace(RegExp(k+"\\+?$"),"")+("beta"==K?W:F)+(/\d+\+?/.exec(k)||"")),"Fennec"==V||"Firefox"==V&&/\b(?:Android|Firefox OS)\b/.test(z)?V="Firefox Mobile":"Maxthon"==V&&H?H=H.replace(/\.[\d.]+/,".x"):"Silk"==V?(/\bMobi/i.test(e)||(z="Android",D.unshift("desktop mode")),/Accelerated *= *true/i.test(e)&&D.unshift("accelerated")):/\bXbox\b/i.test(q)?(z=null,"Xbox 360"==q&&/\bIEMobile\b/.test(e)&&D.unshift("mobile mode")):!/^(?:Chrome|IE|Opera)$/.test(V)&&(!V||q||/Browser|Mobi/.test(V))||"Windows CE"!=z&&!/Mobi/i.test(e)?"IE"==V&&U&&null===S.external?D.unshift("platform preview"):(/\bBlackBerry\b/.test(q)||/\bBB10\b/.test(e))&&(k=(RegExp(q.replace(/ +/g," *")+"/([.\\d]+)","i").exec(e)||0)[1]||H)?(k=[k,/BB10/.test(e)],z=(k[1]?(q=null,Q="BlackBerry"):"Device Software")+" "+k[0],H=null):this!=u&&"Wii"!=q&&(U&&$||/Opera/.test(V)&&/\b(?:MSIE|Firefox)\b/i.test(e)||"Firefox"==V&&/\bOS X (?:\d+\.){2,}/.test(z)||"IE"==V&&(z&&!/^Win/.test(z)&&H>5.5||/\bWindows XP\b/.test(z)&&H>8||8==H&&!/\bTrident\b/.test(e)))&&!w.test(k=d.call(u,e.replace(w,"")+";"))&&k.name&&(k="ing as "+k.name+((k=k.version)?" "+k:""),w.test(V)?(/\bIE\b/.test(k)&&"Mac OS"==z&&(z=null),k="identify"+k):(k="mask"+k,V=X?l(X.replace(/([a-z])([A-Z])/g,"$1 $2")):"Opera",/\bIE\b/.test(k)&&(z=null),U||(H=null)),J=["Presto"],D.push(k)):V+=" Mobile",(k=(/\bAppleWebKit\/([\d.]+\+?)/i.exec(e)||0)[1])&&(k=[parseFloat(k.replace(/\.(\d)$/,".0$1")),k],"Safari"==V&&"+"==k[1].slice(-1)?(V="WebKit Nightly",K="alpha",H=k[1].slice(0,-1)):(H==k[1]||H==(k[2]=(/\bSafari\/([\d.]+\+?)/i.exec(e)||0)[1]))&&(H=null),k[1]=(/\bChrome\/([\d.]+)/i.exec(e)||0)[1],537.36==k[0]&&537.36==k[2]&&parseFloat(k[1])>=28&&"IE"!=V&&(J=["Blink"]),U&&(T||k[1])?(J&&(J[1]="like Chrome"),k=k[1]||(k=k[0],530>k?1:532>k?2:532.05>k?3:533>k?4:534.03>k?5:534.07>k?6:534.1>k?7:534.13>k?8:534.16>k?9:534.24>k?10:534.3>k?11:535.01>k?12:535.02>k?"13+":535.07>k?15:535.11>k?16:535.19>k?17:536.05>k?18:536.1>k?19:537.01>k?20:537.11>k?"21+":537.13>k?23:537.18>k?24:537.24>k?25:537.36>k?26:"Blink"!=J?"27":"28")):(J&&(J[1]="like Safari"),k=k[0],k=400>k?1:500>k?2:526>k?3:533>k?4:534>k?"4+":535>k?5:537>k?6:538>k?7:601>k?8:"8"),J&&(J[1]+=" "+(k+="number"==typeof k?".x":/[.+]/.test(k)?"":"+")),"Safari"==V&&(!H||parseInt(H)>45)&&(H=k)),"Opera"==V&&(k=/\bzbov|zvav$/.exec(z))?(V+=" ",D.unshift("desktop mode"),"zvav"==k?(V+="Mini",H=null):V+="Mobile",z=z.replace(RegExp(" *"+k+"$"),"")):"Safari"==V&&/\bChrome\b/.exec(J&&J[1])&&(D.unshift("desktop mode"),V="Chrome Mobile",H=null,/\bOS X\b/.test(z)?(Q="Apple",z="iOS 4.3+"):z=null),H&&0==H.indexOf(k=/[\d.]+$/.exec(z))&&e.indexOf("/"+k+"-")>-1&&(z=g(z.replace(k,""))),J&&!/\b(?:Avant|Nook)\b/.test(V)&&(/Browser|Lunascape|Maxthon/.test(V)||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(V)&&J[1])&&(k=J[J.length-1])&&D.push(k),D.length&&(D=["("+D.join("; ")+")"]),Q&&q&&q.indexOf(Q)<0&&D.push("on "+Q),q&&D.push((/^on /.test(D[D.length-1])?"":"on ")+q),z&&(k=/ ([\d.+]+)$/.exec(z),L=k&&"/"==z.charAt(z.length-k[0].length-1),z={architecture:32,family:k&&!L?z.replace(k[0],""):z,version:k?k[1]:null,toString:function(){var e=this.version;return this.family+(e&&!L?" "+e:"")+(64==this.architecture?" 64-bit":"")}}),(k=/\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(G))&&!/\bi686\b/i.test(G)&&(z&&(z.architecture=64,z.family=z.family.replace(RegExp(" *"+k),"")),V&&(/\bWOW64\b/i.test(e)||U&&/\w(?:86|32)$/.test(v.cpuClass||v.platform)&&!/\bWin64; x64\b/i.test(e))&&D.unshift("32-bit")),e||(e=null);var Y={};return Y.description=e,Y.layout=J&&J[0],Y.manufacturer=Q,Y.name=V,Y.prerelease=K,Y.product=q,Y.ua=e,Y.version=V&&H,Y.os=z||{architecture:null,family:null,version:null,toString:function(){return"null"}},Y.parse=d,Y.toString=m,Y.version&&D.unshift(H),Y.name&&D.unshift(V),z&&V&&(z!=String(z).split(" ")[0]||z!=V.split(" ")[0]&&!q)&&D.push(q?"("+z+")":"on "+z),D.length&&(Y.description=D.join(" ")),Y}var m={"function":!0,object:!0},b=m[typeof window]&&window||this,_=b,S=m[typeof t]&&t,x=m[typeof e]&&e&&!e.nodeType&&e,v=S&&x&&"object"==typeof n&&n;!v||v.global!==v&&v.window!==v&&v.self!==v||(b=v);var y=Math.pow(2,53)-1,w=/\bOpera/,O=this,k=Object.prototype,L=k.hasOwnProperty,M=k.toString;i=function(){return d()}.call(t,r,t,e),!(void 0!==i&&(e.exports=i))}).call(this)}).call(t,r(3)(e),function(){return this}())},function(e,t,r){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t,r){var i,n;n=r(5),i={on_unpublish_check_content:function(e){var t,r,i,n,o;o=this,r=e+".mp4",t=[o.get_http_base_url(),"contents/",r].join(""),n=e+".json",i=[o.get_http_base_url(),"contents/",n].join(""),this._ensure_jQuery(),o._content_ready(e,function(){o.fire("save",t,e),o.fire("save-metadata",i,e)})},_ensure_jQuery:function(){window.jQuery||alert("please, include jQuery first!")},get_http_api_base_url:function(){var e;return e=[this.get_http_base_url(),"api/"].join("")},_content_ready:function(e,t){var r,i;i=[this.get_http_api_base_url(),"contents/",e,"/ready"].join(""),(r=function(){n.ajax({url:i,dataType:"jsonp"}).done(function(e){return e.error?setTimeout(r,1e3):void t(e)}).fail(function(){setTimeout(r,1e3)})})()},deleteContent:function(e,t){var r;r=[this.get_http_api_base_url(),"contents/",e,"/delete"].join(""),n.ajax({url:r,dataType:"jsonp"}).then(t)}},e.exports=i},function(e,t,r){var i,n;try{n=window.jQuery||window.$}catch(o){i=o,console.error(i)}e.exports=n},function(e,t,r){var i,n;n=r(5),i={addTimedMetadataCORS:function(e,t,r){var i,o,a;return a=[this.get_http_api_base_url(),"timedmetadata/",this.streamName,"/append"].join(""),i=e,i.ts=i.ts||(new Date).getTime()-this.publishStartTime,o=n.ajax({url:a,dataType:"json",contentType:"application/json",data:JSON.stringify(i),type:"post"}).fail(r).done(t)},addTimedMetadataJSONP:function(e,t,r){var i,o,a,s,l;return l=[this.get_http_api_base_url(),"timedmetadata/",this.streamName,"/append/jsonp"].join(""),i=e,i.ts=i.ts||(new Date).getTime()-this.publishStartTime,i="data="+encodeURIComponent(JSON.stringify(i)),o=new n.Deferred,s=function(e){o.reject(e)},a=function(e,t,r){return e.error?s(e.error,t,r):void o.resolve(e,t,r)},n.ajax({url:l,dataType:"jsonp",contentType:"application/json",data:i,type:"get"}).fail(s).fail(r).done(a).done(t),o},addTimedMetadata:function(e,t,r){return this._CORS_support()?void this.addTimedMetadataCORS(e,t,r):void this.addTimedMetadataJSONP(e,t,r)}},e.exports=i},function(e,t,r){var i,n;n=r(5),i={enableRealtimeAnalysis:function(e,t,r){var i,o,a,s,l;return l=[this.get_http_api_base_url(),"jobs/submit/jsonp"].join(""),i={streamName:this.streamName,engine:e||"kanako_live"},o=new n.Deferred,s=function(e){o.reject(e)},a=function(e,t,r){return e.error?s(e.error,t,r):void o.resolve(e,t,r)},n.ajax({url:l,dataType:"jsonp",contentType:"application/json",data:i,type:"get"}).fail(s).fail(r).done(a).done(t),o}},e.exports=i},function(e,t,r){var i;i={camerafix_works:!1,camerafix_works_attempt:0,camerafix_works_timeout:null,isCameraWorking:function(){return this.camerafix_start()},camerafix_start:function(){return this.camerafix_stop(),this.remoteLoggerLog("camerafix","start",[this.camerafix_works]),this.camerafix_works_attempt=0,this.camerafix_works=!1,this.camerafix_works_timeout=setTimeout(function(e){return function(){return e.camerafix_poll()}}(this),1e3)},camerafix_stop:function(){return this.remoteLoggerLog("camerafix","stop",[this.camerafix_works]),null!==this.camerafix_works_timeout&&clearTimeout(this.camerafix_works_timeout),this.camerafix_works_timeout=null},camerafix_poll:function(){var e,t;return e=this.getCameraCurrentFPS(),t=this,e>0?(this.camerafix_works=!0,this.remoteLoggerLog("camerafix","camera-works",[this.camerafix_works]),this.camerafix_works_timeout=null,void this.fire("camera-works")):(this.remoteLoggerLog("camerafix","attempt",[this.camerafix_works_attempt]),this.camerafix_works_attempt+=1,this.camerafix_works_timeout=setTimeout(function(e){return function(){return e.camerafix_poll()}}(this),1e3))},reloadFlashElement:function(e){var t,r,i,n,o,a,s,l,u,c,h;return this.remoteLoggerLog("camerafix","reloadFlashElement",[]),i=jQuery(this.el).parent(),h=this.getUrl(),c=this.getStreamWidth(),l=this.getStreamHeight(),s=this.getStreamFPS(),u=this.getStreamQuality(),a=this.getStreamBandwidth(),t=this.getMirroredPreview(),this.camerafix_stop(),this.el.remove(),o=this,r=function(r){return function(){return r.flash_method_call("setUrl",[h]),r.remoteLoggerLog("camerafix","ready again",[h]),r.setStreamWidth(c),r.setStreamHeight(l),r.setStreamFPS(s),r.setStreamQuality(u),r.setStreamBandwidth(a),r.setMirroredPreview(t),r.camerafix_start(),e()}}(this),n=function(e){return function(){return i.prepend(e.el),e.once("ready",r)}}(this),setTimeout(n,10)}},e.exports=i},function(e,t,r){var i,n;n=r(10),i={remoteLogger:null,remoteLoggerStatsTask:null,remoteLoggerStatsTaskInterval:5e3,remoteLoggerActivate:function(e){var t,r,i;t={base_url:null,name:e},i=new n(t),r=this,this.on("publish",function(){r.remoteLoggerStatsTaskRun()}),this.on("unpublish",function(){r.remoteLoggerStatsTaskStop()}),this.on("disconnect",function(){r.remoteLoggerStatsTaskStop()}),this.on("url-changed",function(){var e;e=r.get_http_api_base_url(),i.setBaseUrl(e)}),this.on("error",function(){i.flush()}),this.on("unpublish",function(){i.flush()}),this.on("disconnect",function(){i.flush(),setTimeout(function(){i.flush()},1e3)}),this.remoteLogger=i},remoteLoggerSetName:function(e){return this.remoteLoggerLog("RemoteLogger","nameChanged",this.remoteLogger.name,e),this.remoteLogger.name=e},remoteLoggerLog:function(e,t,r,i){var n,o,a;this.remoteLogger&&(o=["getUrl","getStreamBufferLength","getStreamInfoDroppedFrames","getStreamInfoCurrentBytesPerSecond","getStreamInfoVideoLossRate","getStreamCurrentFPS","getCameraCurrentFPS"],-1===o.indexOf(t)&&(r=JSON.stringify(r),i=JSON.stringify(i),n=Array.prototype.slice.call(arguments),n[2]=r,n[3]=i,a=n.join("|"),this.remoteLogger.log(a)))},remoteLoggerLogStats:function(){this.remoteLoggerLog("streamingStats","5s",null,this.getStats()),this.remoteLogger&&this.remoteLogger.flush()},remoteLoggerStatsTaskRun:function(){var e,t,r;this.remoteLoggerStatsTaskRunning=!0,t=this,e=function(){t.remoteLoggerLogStats()},r=this.remoteLoggerStatsTaskInterval,this.remoteLoggerStatsTask=setInterval(e,r)},remoteLoggerStatsTaskStop:function(){null!==this.remoteLoggerStatsTask&&(clearInterval(this.remoteLoggerStatsTask),this.remoteLoggerStatsTask=null)}},e.exports=i},function(e,t,r){var i,n;n=r(5),i=function(e){this.base_url=e.base_url,this.name=e.name,this.interval=e.interval||5e3},i.prototype={logs:[],logs_flushing:[],name:"default_logger",timer:null,running:!1,setBaseUrl:function(e){this.base_url=e},flush:function(){var e,t,r;return t=new n.Deferred,0===this.logs.length?(t.resolve(),this.flush_schedule(),t):this._CORS_support()&&this.base_url?(this.logs_flushing=this.logs,this.logs=[],e=this.flushCORS(this.logs_flushing),r=this,e.done(function(){r.flush_success.apply(r,arguments)}),e.fail(function(){r.flush_error.apply(r,arguments)}),e):(t.reject(),this.flush_schedule(),t)},flushCORS:function(e){var t,r;return r=this.base_url+"remotelogging/"+this.name,t=n.ajax({url:r,dataType:"json",contentType:"application/json",data:JSON.stringify(e),type:"post"})},flush_success:function(){this.logs_flushing=[],this.running&&this.flush_schedule()},flush_error:function(){this.logs=this.logs.concat(this.logs_flushing),this.logs_flushing=[],this.running&&this.flush_schedule()},flush_schedule:function(){var e;e=this,this.timer=setTimeout(function(){e.flush.apply(e,arguments)},this.interval)},start:function(){this.flush_schedule(),this.running=!0},stop:function(){clearTimeout(this.timer),this.timer=!1,this.running=!1,this.flush()},log:function(e){var t;t={timestamp:(new Date).toISOString(),data:e},this.logs.push(t)},_CORS_support:function(){return window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?!0:"undefined"!=typeof window.XDomainRequest?!0:!1}},e.exports=i},function(e,t,r){var i;i={on:function(e,t){this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(t)},off:function(e,t){this._events=this._events||{},e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(t),1)},fire:function(e){var t,r,i;if(this._events=this._events||{},e in this._events!=!1){for(r=this._events[e].concat([]),i=0;i<r.length;)r[i].apply(this,Array.prototype.slice.call(arguments,1)),i++;"*"!==e&&(t=Array.prototype.slice.call(arguments,0),t.unshift("*"),this.fire.apply(this,t))}},once:function(e,t){var r,i;r=this,i=function(){r.off(e,i),t.apply(this,arguments)},this.on(e,i)}},e.exports=i}]);
//# sourceMappingURL=var.js.map