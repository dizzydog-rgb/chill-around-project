import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css            */const s=document.querySelectorAll(".checkBOX"),o=document.getElementById("progress-bar");s.forEach(t=>{t.addEventListener("change",a)});function a(){const n=Array.from(s).filter(e=>e.checked).length/s.length*100;o.style.width=n+"%"}function d(){const t=prompt("請輸入物品內容:");if(t){const n=document.querySelector(".categoryContainer"),e=document.createElement("div");e.classList.add("categoryContent"),e.innerHTML=`
            <input type="checkbox" class="checkBOX left">
            <span class="itemContent left">${t}</span>
            <input type="number" class="itemQuantity right" min="1" value="1">
            <button class="leftDelete right">–</button>
        `,n.appendChild(e)}else alert("您沒有輸入任何文字。")}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("leftBtn").addEventListener("click",d)});const r=["服飾類","藥品類","衛生類","電子產品","護照類","食品類","飲水器具","睡袋類","登山裝備","旅行書籍","相機類","野餐用品","保險文件","清潔用品","個人護理"],i=document.querySelector(".cardRow");r.forEach((t,n)=>{const e=document.createElement("div");e.classList.add("col-md-4","col-4","mb-3","cardOut");const c=document.createElement("div");c.classList.add("card"),c.innerHTML=`
            <button class="rightDelete">–</button>
            <img src="../assets/images/Budget_Item/Items/clothes.png" class="cardImg" alt="卡片圖片">
            <div class="card-body">
                <span>${t}</span>
                <span>1/10</span>
            </div>
    `,e.appendChild(c),i.appendChild(e)});
