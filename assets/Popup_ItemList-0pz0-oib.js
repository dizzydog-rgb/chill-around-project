import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css            */function d(){document.getElementById("overlay").classList.add("active"),document.getElementById("modal").classList.add("active")}document.addEventListener("DOMContentLoaded",d);const t=[],n=document.querySelectorAll(".category");n.forEach(s=>{s.addEventListener("click",()=>{const e=s.textContent;t.includes(e)?(t.splice(t.indexOf(e),1),s.classList.remove("selected"),alert("取消"+e)):(t.push(e),s.classList.add("selected"),alert("選取"+e))})});document.getElementById("okBtn").addEventListener("click",()=>{localStorage.setItem("selectedItems",JSON.stringify(t)),window.location.href="./itemList.html"});