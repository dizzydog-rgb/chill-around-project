import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-Maamm-dT.js";/* empty css            */(function(){E();var m=["#fff","#27BBEE","#88B14B","#F5A623","#FF7A7A"],o=[{id:"新北",lv:0},{id:"台北",lv:0},{id:"基隆",lv:0},{id:"桃園",lv:0},{id:"新竹",lv:0},{id:"苗栗",lv:0},{id:"台中",lv:0},{id:"彰化",lv:0},{id:"雲林",lv:0},{id:"嘉義",lv:0},{id:"南投",lv:0},{id:"台南",lv:0},{id:"高雄",lv:0},{id:"屏東",lv:0},{id:"台東",lv:0},{id:"花蓮",lv:0},{id:"宜蘭",lv:0},{id:"馬祖",lv:0},{id:"金門",lv:0},{id:"澎湖",lv:0}],r=document.querySelector("#contextMenu"),g=document.querySelector("#menuTitle"),a="",c=0,y=[].map.call(document.querySelectorAll("text.city"),function(e){return e});y.map(function(e){e.style.cursor="pointer",e.addEventListener("click",s)}),o.map(function(e){var n=[].map.call(document.querySelectorAll("[id^="+e.id+"]"),function(t){return t});n.map(function(t){t.style.fill="#fff",t.style.cursor="pointer",t.addEventListener("click",s)})}),document.addEventListener("mouseup",v),document.addEventListener("touchend",v);function v(e){(!r===e.target||!r.contains(e.target))&&(r.style.display="none")}var b=[].map.call(document.querySelectorAll("div[id^='lv']"),function(e){return e});b.map(function(e){e.addEventListener("click",function(n){var t=parseInt(n.currentTarget.id.replace("lv",""),10);o=o.map(function(i){return i.id===a?Object.assign({},i,{lv:t}):i}),r.style.display="none",w(t),h()})}),document.querySelector("#saveAs").addEventListener("click",function(){var e=new XMLSerializer().serializeToString(document.querySelector("#map")),n=document.createElement("canvas");n.getContext("2d"),n.width=750,n.height=1124,canvg(n,e),n.toBlob(function(t){saveAs(t,"taiwan.png")})});function s(e){const n=window.innerWidth-e.pageX-180-20,t=window.innerHeight-e.pageY-165-30,i=n>0?e.pageX:e.pageX+n,l=t>0?e.pageY:e.pageY+t;r.style.top=l+"px",r.style.left=i+"px",r.style.display="block",a=(e.target.id||e.target.textContent).replace(/\d*/g,""),g.textContent=a}function h(){c=0,o.map(function(e){c+=e.lv}),document.querySelector("#total").textContent=c}function w(e){var n=[].map.call(document.querySelectorAll("[id^="+a+"]"),function(t){return t});n.map(function(t){t.style.fill=m[e]})}function O(e,n){if(e==null)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),i=1;i<arguments.length;i++){var l=arguments[i];if(l!=null)for(var f=Object.keys(Object(l)),u=0,j=f.length;u<j;u++){var d=f[u],p=Object.getOwnPropertyDescriptor(l,d);p!==void 0&&p.enumerable&&(t[d]=l[d])}}return t}function E(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:O})}})();