var jscolor={dir:"",bindClass:"color",binding:!0,preloading:!0,install:function(){jscolor.addEvent(window,"load",jscolor.init)},init:function(){jscolor.binding&&jscolor.bind(),jscolor.preloading&&jscolor.preload()},getDir:function(){if(!jscolor.dir){var e=jscolor.detectDir();jscolor.dir=!1!==e?e:"jscolor/"}return jscolor.dir},detectDir:function(){for(var e=location.href,t=document.getElementsByTagName("base"),o=0;o<t.length;o+=1)t[o].href&&(e=t[o].href);for(t=document.getElementsByTagName("script"),o=0;o<t.length;o+=1)if(t[o].src&&/(^|\/)jscolor(.*).js([?#].*)?$/i.test(t[o].src)){var r=new jscolor.URI(t[o].src).toAbsolute(e);return r.path=r.path.replace(/[^\/]+$/,""),r.query=null,r.fragment=null,r.toString()}return!1},bind:function(){for(var matchClass=new RegExp("(^|\\s)("+jscolor.bindClass+")\\s*(\\{[^}]*\\})?","i"),e=document.getElementsByTagName("input"),i=0;i<e.length;i+=1){var m;if(!e[i].color&&e[i].className&&(m=e[i].className.match(matchClass))){var prop={};if(m[3])try{eval("prop="+m[3])}catch(e){}e[i].color=new jscolor.color(e[i],prop)}}},preload:function(){for(var e in jscolor.imgRequire)jscolor.imgRequire.hasOwnProperty(e)&&jscolor.loadImage(e)},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(e){jscolor.imgRequire[e]=!0},loadImage:function(e){jscolor.imgLoaded[e]||(jscolor.imgLoaded[e]=new Image,jscolor.imgLoaded[e].src=jscolor.getDir()+e)},fetchElement:function(e){return"string"==typeof e?document.getElementById(e):e},addEvent:function(e,t,o){e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent&&e.attachEvent("on"+t,o)},fireEvent:function(e,t){if(e)if(document.createEvent)(o=document.createEvent("HTMLEvents")).initEvent(t,!0,!0),e.dispatchEvent(o);else if(document.createEventObject){var o=document.createEventObject();e.fireEvent("on"+t,o)}else e["on"+t]&&e["on"+t]()},getElementPos:function(e){var t=e,o=e,r=0,s=0;if(t.offsetParent)do{r+=t.offsetLeft,s+=t.offsetTop}while(t=t.offsetParent);for(;(o=o.parentNode)&&"BODY"!==o.nodeName.toUpperCase();)r-=o.scrollLeft,s-=o.scrollTop;return[r,s]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getRelMousePos:function(e){var t=0,o=0;return e||(e=window.event),"number"==typeof e.offsetX?(t=e.offsetX,o=e.offsetY):"number"==typeof e.layerX&&(t=e.layerX,o=e.layerY),{x:t,y:o}},getViewPos:function(){return"number"==typeof window.pageYOffset?[window.pageXOffset,window.pageYOffset]:document.body&&(document.body.scrollLeft||document.body.scrollTop)?[document.body.scrollLeft,document.body.scrollTop]:document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)?[document.documentElement.scrollLeft,document.documentElement.scrollTop]:[0,0]},getViewSize:function(){return"number"==typeof window.innerWidth?[window.innerWidth,window.innerHeight]:document.body&&(document.body.clientWidth||document.body.clientHeight)?[document.body.clientWidth,document.body.clientHeight]:document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?[document.documentElement.clientWidth,document.documentElement.clientHeight]:[0,0]},URI:function(e){function t(e){for(var t="";e;)if("../"===e.substr(0,3)||"./"===e.substr(0,2))e=e.replace(/^\.+/,"").substr(1);else if("/./"===e.substr(0,3)||"/."===e)e="/"+e.substr(3);else if("/../"===e.substr(0,4)||"/.."===e)e="/"+e.substr(4),t=t.replace(/\/?[^\/]*$/,"");else if("."===e||".."===e)e="";else{var o=e.match(/^\/?[^\/]*/)[0];e=e.substr(o.length),t+=o}return t}this.scheme=null,this.authority=null,this.path="",this.query=null,this.fragment=null,this.parse=function(e){var t=e.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);return this.scheme=t[3]?t[2]:null,this.authority=t[5]?t[6]:null,this.path=t[7],this.query=t[9]?t[10]:null,this.fragment=t[12]?t[13]:null,this},this.toString=function(){var e="";return null!==this.scheme&&(e=e+this.scheme+":"),null!==this.authority&&(e=e+"//"+this.authority),null!==this.path&&(e+=this.path),null!==this.query&&(e=e+"?"+this.query),null!==this.fragment&&(e=e+"#"+this.fragment),e},this.toAbsolute=function(e){e=new jscolor.URI(e);var o=this,r=new jscolor.URI;return null!==e.scheme&&(null!==o.scheme&&o.scheme.toLowerCase()===e.scheme.toLowerCase()&&(o.scheme=null),null!==o.scheme?(r.scheme=o.scheme,r.authority=o.authority,r.path=t(o.path),r.query=o.query):(null!==o.authority?(r.authority=o.authority,r.path=t(o.path),r.query=o.query):(""===o.path?(r.path=e.path,null!==o.query?r.query=o.query:r.query=e.query):("/"===o.path.substr(0,1)?r.path=t(o.path):(null!==e.authority&&""===e.path?r.path="/"+o.path:r.path=e.path.replace(/[^\/]+$/,"")+o.path,r.path=t(r.path)),r.query=o.query),r.authority=e.authority),r.scheme=e.scheme),r.fragment=o.fragment,r)},e&&this.parse(e)},color:function(target,prop){for(var p in this.required=!0,this.adjust=!0,this.hash=!1,this.caps=!0,this.slider=!0,this.valueElement=target,this.styleElement=target,this.onImmediateChange=null,this.hsv=[0,0,1],this.rgb=[1,1,1],this.pickerOnfocus=!0,this.pickerMode="HSV",this.pickerPosition="bottom",this.pickerSmartPosition=!0,this.pickerButtonHeight=20,this.pickerClosable=!1,this.pickerCloseText="Close",this.pickerButtonColor="ButtonText",this.pickerFace=10,this.pickerFaceColor="ThreeDFace",this.pickerBorder=1,this.pickerBorderColor="ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight",this.pickerInset=1,this.pickerInsetColor="ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow",this.pickerZIndex=1e4,prop)prop.hasOwnProperty(p)&&(this[p]=prop[p]);function RGB_HSV(e,t,o){var r=Math.min(Math.min(e,t),o),s=Math.max(Math.max(e,t),o),l=s-r;if(0===l)return[null,0,s];var n=e===r?3+(o-t)/l:t===r?5+(e-o)/l:1+(t-e)/l;return[6===n?0:n,l/s,s]}function HSV_RGB(e,t,o){if(null===e)return[o,o,o];var r=Math.floor(e),s=o*(1-t),l=o*(1-t*(r%2?e-r:1-(e-r)));switch(r){case 6:case 0:return[o,l,s];case 1:return[l,o,s];case 2:return[s,o,l];case 3:return[s,l,o];case 4:return[l,s,o];case 5:return[o,s,l]}}function removePicker(){var e=jscolor.picker.owner.valueElement.ownerDocument;delete jscolor.picker.owner,e.getElementsByTagName("body")[0].removeChild(jscolor.picker.boxB)}function drawPicker(e,t){if(!jscolor.picker){jscolor.picker={box:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),btn:document.createElement("div"),btnS:document.createElement("span"),btnT:document.createTextNode(THIS.pickerCloseText)};for(var o=0;o<jscolor.images.sld[1];o+=4){var r=document.createElement("div");r.style.height="4px",r.style.fontSize="1px",r.style.lineHeight="0",jscolor.picker.sld.appendChild(r)}jscolor.picker.sldB.appendChild(jscolor.picker.sld),jscolor.picker.box.appendChild(jscolor.picker.sldB),jscolor.picker.box.appendChild(jscolor.picker.sldM),jscolor.picker.padB.appendChild(jscolor.picker.pad),jscolor.picker.box.appendChild(jscolor.picker.padB),jscolor.picker.box.appendChild(jscolor.picker.padM),jscolor.picker.btnS.appendChild(jscolor.picker.btnT),jscolor.picker.btn.appendChild(jscolor.picker.btnS),jscolor.picker.box.appendChild(jscolor.picker.btn),jscolor.picker.boxB.appendChild(jscolor.picker.box)}var s=jscolor.picker;s.box.onmouseup=s.box.onmouseout=function(){target.focus()},s.box.onmousedown=function(e){return abortBlur=!0,e.preventDefault(),!1},s.box.onmousemove=function(e){(holdPad||holdSld)&&(holdPad&&setPad(e),holdSld&&setSld(e),document.selection?document.selection.empty():window.getSelection&&window.getSelection().removeAllRanges(),dispatchImmediateChange())},s.padM.onmouseup=s.padM.onmouseout=function(){holdPad&&(holdPad=!1,jscolor.fireEvent(valueElement,"change"))},s.padM.onmousedown=function(e){holdPad=!0,setPad(e),dispatchImmediateChange()},s.sldM.onmouseup=s.sldM.onmouseout=function(){holdSld&&(holdSld=!1,jscolor.fireEvent(valueElement,"change"))},s.sldM.onmousedown=function(e){holdSld=!0,setSld(e),dispatchImmediateChange()};var l,n,i=getPickerDims(THIS);s.box.style.width=i[0]+"px",s.box.style.height=i[1]+"px",s.boxB.style.position="absolute",s.boxB.style.clear="both",s.boxB.style.left=e+"px",s.boxB.style.top=t+"px",s.boxB.style.zIndex=THIS.pickerZIndex,s.boxB.style.border=THIS.pickerBorder+"px solid",s.boxB.style.borderColor=THIS.pickerBorderColor,s.boxB.style.background=THIS.pickerFaceColor,s.pad.style.width=jscolor.images.pad[0]+"px",s.pad.style.height=jscolor.images.pad[1]+"px",s.padB.style.position="absolute",s.padB.style.left=THIS.pickerFace+"px",s.padB.style.top=THIS.pickerFace+"px",s.padB.style.border=THIS.pickerInset+"px solid",s.padB.style.borderColor=THIS.pickerInsetColor,s.padM.style.position="absolute",s.padM.style.left="0",s.padM.style.top="0",s.padM.style.width=THIS.pickerFace+2*THIS.pickerInset+jscolor.images.pad[0]+jscolor.images.arrow[0]+"px",s.padM.style.height=s.box.style.height,s.padM.style.cursor="crosshair",s.sld.style.overflow="hidden",s.sld.style.width=jscolor.images.sld[0]+"px",s.sld.style.height=jscolor.images.sld[1]+"px",s.sldB.style.display=THIS.slider?"block":"none",s.sldB.style.position="absolute",s.sldB.style.right=THIS.pickerFace+"px",s.sldB.style.top=THIS.pickerFace+"px",s.sldB.style.border=THIS.pickerInset+"px solid",s.sldB.style.borderColor=THIS.pickerInsetColor,s.sldM.style.display=THIS.slider?"block":"none",s.sldM.style.position="absolute",s.sldM.style.right="0",s.sldM.style.top="0",s.sldM.style.width=jscolor.images.sld[0]+jscolor.images.arrow[0]+THIS.pickerFace+2*THIS.pickerInset+"px",s.sldM.style.height=s.box.style.height;try{s.sldM.style.cursor="pointer"}catch(e){s.sldM.style.cursor="hand"}s.btn.style.display=THIS.pickerClosable?"block":"none",s.btn.style.position="absolute",s.btn.style.left=THIS.pickerFace+"px",s.btn.style.bottom=THIS.pickerFace+"px",s.btn.style.padding="0 15px",s.btn.style.height="18px",s.btn.style.border=THIS.pickerInset+"px solid",l=THIS.pickerInsetColor.split(/\s+/),n=l.length<2?l[0]:l[1]+" "+l[0]+" "+l[0]+" "+l[1],s.btn.style.borderColor=n,s.btn.style.color=THIS.pickerButtonColor,s.btn.style.font="12px sans-serif",s.btn.style.textAlign="center";try{s.btn.style.cursor="pointer"}catch(e){s.btn.style.cursor="hand"}switch(s.btn.onmousedown=function(){THIS.hidePicker()},s.btnS.style.lineHeight=s.btn.style.height,modeID){case 0:var a="hs.png";break;case 1:a="hv.png"}s.padM.style.backgroundImage="url('"+jscolor.getDir()+"cross.gif')",s.padM.style.backgroundRepeat="no-repeat",s.sldM.style.backgroundImage="url('"+jscolor.getDir()+"arrow.gif')",s.sldM.style.backgroundRepeat="no-repeat",s.pad.style.backgroundImage="url('"+jscolor.getDir()+a+"')",s.pad.style.backgroundRepeat="no-repeat",s.pad.style.backgroundPosition="0 0",redrawPad(),redrawSld(),jscolor.picker.owner=THIS,jscolor.picker.owner.valueElement.ownerDocument.getElementsByTagName("body")[0].appendChild(s.boxB)}function getPickerDims(e){return[2*e.pickerInset+2*e.pickerFace+jscolor.images.pad[0]+(e.slider?2*e.pickerInset+2*jscolor.images.arrow[0]+jscolor.images.sld[0]:0),e.pickerClosable?4*e.pickerInset+3*e.pickerFace+jscolor.images.pad[1]+e.pickerButtonHeight:2*e.pickerInset+2*e.pickerFace+jscolor.images.pad[1]]}function redrawPad(){switch(modeID){case 0:var e=1;break;case 1:e=2}var t=Math.round(THIS.hsv[0]/6*(jscolor.images.pad[0]-1)),o=Math.round((1-THIS.hsv[e])*(jscolor.images.pad[1]-1));jscolor.picker.padM.style.backgroundPosition=THIS.pickerFace+THIS.pickerInset+t-Math.floor(jscolor.images.cross[0]/2)+"px "+(THIS.pickerFace+THIS.pickerInset+o-Math.floor(jscolor.images.cross[1]/2))+"px";var r=jscolor.picker.sld.childNodes;switch(modeID){case 0:for(var s=HSV_RGB(THIS.hsv[0],THIS.hsv[1],1),l=0;l<r.length;l+=1)r[l].style.backgroundColor="rgb("+s[0]*(1-l/r.length)*100+"%,"+s[1]*(1-l/r.length)*100+"%,"+s[2]*(1-l/r.length)*100+"%)";break;case 1:var n,i=[THIS.hsv[2],0,0],a=(l=Math.floor(THIS.hsv[0]))%2?THIS.hsv[0]-l:1-(THIS.hsv[0]-l);switch(l){case 6:case 0:s=[0,1,2];break;case 1:s=[1,0,2];break;case 2:s=[2,0,1];break;case 3:s=[2,1,0];break;case 4:s=[1,2,0];break;case 5:s=[0,2,1]}for(l=0;l<r.length;l+=1)n=1-1/(r.length-1)*l,i[1]=i[0]*(1-n*a),i[2]=i[0]*(1-n),r[l].style.backgroundColor="rgb("+100*i[s[0]]+"%,"+100*i[s[1]]+"%,"+100*i[s[2]]+"%)"}}function redrawSld(){switch(modeID){case 0:var e=2;break;case 1:e=1}var t=Math.round((1-THIS.hsv[e])*(jscolor.images.sld[1]-1));jscolor.picker.sldM.style.backgroundPosition="0 "+(THIS.pickerFace+THIS.pickerInset+t-Math.floor(jscolor.images.arrow[1]/2))+"px"}function isPickerOwner(){return jscolor.picker&&jscolor.picker.owner===THIS}function blurTarget(){valueElement===target&&THIS.importColor(),THIS.pickerOnfocus&&THIS.hidePicker()}function blurValue(){valueElement!==target&&THIS.importColor()}function setPad(e){var t=jscolor.getRelMousePos(e),o=t.x-THIS.pickerFace-THIS.pickerInset,r=t.y-THIS.pickerFace-THIS.pickerInset;switch(modeID){case 0:THIS.fromHSV(o*(6/(jscolor.images.pad[0]-1)),1-r/(jscolor.images.pad[1]-1),null,leaveSld);break;case 1:THIS.fromHSV(o*(6/(jscolor.images.pad[0]-1)),null,1-r/(jscolor.images.pad[1]-1),leaveSld)}}function setSld(e){var t=jscolor.getRelMousePos(e).y-THIS.pickerFace-THIS.pickerInset;switch(modeID){case 0:THIS.fromHSV(null,null,1-t/(jscolor.images.sld[1]-1),leavePad);break;case 1:THIS.fromHSV(null,1-t/(jscolor.images.sld[1]-1),null,leavePad)}}function dispatchImmediateChange(){THIS.onImmediateChange&&("string"==typeof THIS.onImmediateChange?eval(THIS.onImmediateChange):THIS.onImmediateChange(THIS))}this.hidePicker=function(){isPickerOwner()&&removePicker()},this.showPicker=function(){if(!isPickerOwner()){var e,t,o,r=jscolor.getElementPos(target),s=jscolor.getElementSize(target),l=jscolor.getViewPos(),n=jscolor.getViewSize(),i=getPickerDims(this);switch(this.pickerPosition.toLowerCase()){case"left":e=1,t=0,o=-1;break;case"right":e=1,t=0,o=1;break;case"top":e=0,t=1,o=-1;break;default:e=0,t=1,o=1}var a=(s[t]+i[t])/2;if(this.pickerSmartPosition)c=[-l[e]+r[e]+i[e]>n[e]&&-l[e]+r[e]+s[e]/2>n[e]/2&&r[e]+s[e]-i[e]>=0?r[e]+s[e]-i[e]:r[e],-l[t]+r[t]+s[t]+i[t]-a+a*o>n[t]?-l[t]+r[t]+s[t]/2>n[t]/2&&r[t]+s[t]-a-a*o>=0?r[t]+s[t]-a-a*o:r[t]+s[t]-a+a*o:r[t]+s[t]-a+a*o>=0?r[t]+s[t]-a+a*o:r[t]+s[t]-a-a*o];else var c=[r[e],r[t]+s[t]-a+a*o];drawPicker(c[e],c[t])}},this.importColor=function(){valueElement?this.adjust?!this.required&&/^\s*$/.test(valueElement.value)?(valueElement.value="",styleElement.style.backgroundImage=styleElement.jscStyle.backgroundImage,styleElement.style.backgroundColor=styleElement.jscStyle.backgroundColor,styleElement.style.color=styleElement.jscStyle.color,this.exportColor(leaveValue|leaveStyle)):this.fromString(valueElement.value)||this.exportColor():this.fromString(valueElement.value,leaveValue)||(styleElement.style.backgroundImage=styleElement.jscStyle.backgroundImage,styleElement.style.backgroundColor=styleElement.jscStyle.backgroundColor,styleElement.style.color=styleElement.jscStyle.color,this.exportColor(leaveValue|leaveStyle)):this.exportColor()},this.exportColor=function(e){if(!(e&leaveValue)&&valueElement){var t=this.toString();this.caps&&(t=t.toUpperCase()),this.hash&&(t="#"+t),valueElement.value=t}e&leaveStyle||!styleElement||(styleElement.style.backgroundImage="none",styleElement.style.backgroundColor="#"+this.toString(),styleElement.style.color=.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]<.5?"#FFF":"#000"),e&leavePad||!isPickerOwner()||redrawPad(),e&leaveSld||!isPickerOwner()||redrawSld()},this.fromHSV=function(e,t,o,r){e<0&&(e=0)||e>6&&(e=6),t<0&&(t=0)||t>1&&(t=1),o<0&&(o=0)||o>1&&(o=1),this.rgb=HSV_RGB(null===e?this.hsv[0]:this.hsv[0]=e,null===t?this.hsv[1]:this.hsv[1]=t,null===o?this.hsv[2]:this.hsv[2]=o),this.exportColor(r)},this.fromRGB=function(e,t,o,r){e<0&&(e=0)||e>1&&(e=1),t<0&&(t=0)||t>1&&(t=1),o<0&&(o=0)||o>1&&(o=1);var s=RGB_HSV(null===e?this.rgb[0]:this.rgb[0]=e,null===t?this.rgb[1]:this.rgb[1]=t,null===o?this.rgb[2]:this.rgb[2]=o);null!==s[0]&&(this.hsv[0]=s[0]),0!==s[2]&&(this.hsv[1]=s[1]),this.hsv[2]=s[2],this.exportColor(r)},this.fromString=function(e,t){var o=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);return!!o&&(6===o[1].length?this.fromRGB(parseInt(o[1].substr(0,2),16)/255,parseInt(o[1].substr(2,2),16)/255,parseInt(o[1].substr(4,2),16)/255,t):this.fromRGB(parseInt(o[1].charAt(0)+o[1].charAt(0),16)/255,parseInt(o[1].charAt(1)+o[1].charAt(1),16)/255,parseInt(o[1].charAt(2)+o[1].charAt(2),16)/255,t),!0)},this.toString=function(){return(256|Math.round(255*this.rgb[0])).toString(16).substr(1)+(256|Math.round(255*this.rgb[1])).toString(16).substr(1)+(256|Math.round(255*this.rgb[2])).toString(16).substr(1)};var THIS=this,modeID="hvs"===this.pickerMode.toLowerCase()?1:0,abortBlur=!1,valueElement=jscolor.fetchElement(this.valueElement),styleElement=jscolor.fetchElement(this.styleElement),holdPad=!1,holdSld=!1,leaveValue=1,leaveStyle=2,leavePad=4,leaveSld=8;if(jscolor.addEvent(target,"focus",(function(){THIS.pickerOnfocus&&THIS.showPicker()})),jscolor.addEvent(target,"blur",(function(){blurTarget(),abortBlur=!1})),valueElement){var updateField=function(){THIS.fromString(valueElement.value,leaveValue),dispatchImmediateChange()};jscolor.addEvent(valueElement,"keyup",updateField),jscolor.addEvent(valueElement,"input",updateField),jscolor.addEvent(valueElement,"blur",blurValue),valueElement.setAttribute("autocomplete","off")}switch(styleElement&&(styleElement.jscStyle={backgroundImage:styleElement.style.backgroundImage,backgroundColor:styleElement.style.backgroundColor,color:styleElement.style.color}),modeID){case 0:jscolor.requireImage("hs.png");break;case 1:jscolor.requireImage("hv.png")}jscolor.requireImage("cross.gif"),jscolor.requireImage("arrow.gif"),this.importColor()}};jscolor.install();