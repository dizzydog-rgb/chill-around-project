import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css            */function i(){document.getElementById("overlay").style.display="block",document.getElementById("modal").style.display="block"}document.addEventListener("DOMContentLoaded",i);document.getElementById("open-modal2").addEventListener("click",()=>{document.getElementById("overlay2").classList.add("active"),document.getElementById("modal2").classList.add("active")});function l(){document.getElementById("overlay2").classList.remove("active"),document.getElementById("modal2").classList.remove("active")}document.querySelector(".close2").addEventListener("click",l);document.querySelector(".okBtn").addEventListener("click",l);function s(t){const e=document.getElementById(t);e?(e.style.display=e.style.display==="flex"?"none":"flex",alert("ABC")):console.error(`ID '${t}' not found`)}function a(){document.querySelectorAll(".tiTle").forEach((e,n)=>{e.addEventListener("click",()=>{s(`options${n}`)}),e.nextElementSibling.querySelectorAll(".option").forEach(o=>{o.addEventListener("click",d=>{r(o.getAttribute("data-option"),d)})})})}document.addEventListener("DOMContentLoaded",a);function r(t,e){e.stopPropagation(),alert(`你選擇了: ${t}`),document.querySelectorAll(".option").forEach(o=>{o.classList.remove("active")}),e.currentTarget.classList.add("active")}
