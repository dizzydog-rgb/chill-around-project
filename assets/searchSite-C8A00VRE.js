import"./all-DcTbhZgf.js";import"./login-nusU8p98.js";import"./main-BX2b4uAz.js";import{a as m}from"./axios-CCb-kr4I.js";const p=localStorage.getItem("emailid");console.log("emailid:",p);document.addEventListener("DOMContentLoaded",()=>{S(),I()});document.getElementById("searchButton").addEventListener("click",function(){const e=document.getElementById("citySelect").value,a=document.getElementById("tagSelect").value;console.log(e),console.log(a),console.log("---------------"),window.location.href=`/chill-around-project/pages/allSite.html?site_city=${encodeURIComponent(e)}&tag_id=${encodeURIComponent(a)}`});m.get("http://localhost:8080/site/allsite").then(e=>{const d=e.data.filter(n=>n.photo_three!="").slice(10,18);console.log(d);const t=d.map(n=>n.photo_three);console.log(t);const o=document.getElementById("hero-image");o.innerHTML="";const s=document.createElement("div");s.classList.add("row","no-gutters","ms-0","me-0"),s.innerHTML=`
   

    <div id="image1" class="col-md-12 ps-0 pe-0">
        <div class="overlay"></div>
            <img src="../assets/images/searchSite/Keelung/ZhengbinFishingHarbor.jpg" alt="Image 1">
    </div>
    `,o.appendChild(s)});function f(e){console.log("---叫出的景點資訊---"),console.log(e);const a=document.getElementById("sitecardBox"),d=document.createElement("div");d.classList.add("col-md-3","p-0","m-0"),d.innerHTML=`
        <div id="siteCard" class="allCard card bg-primary" data-site-id="${e.site_id}">
            <div class="cardImage">
                <img src="../assets/images/searchSite/${e.photo_two}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${e.site_name}</h5>
                <p class="card-subtitle">${e.short_add}</p>
            </div>
            <div id="addBtn" class="btnOverlay">   
                        <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${e.site_id}" 
                            data-site-name="${e.site_name}" 
                            data-site-add="${e.short_site_add}"
                            data-site-info="${e.site_info}"
                            data-site-img="${e.photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button> 
            </div>
        </div>`,a.appendChild(d)}function v(e){console.log("美食卡片："+e);const a=document.getElementById("foodcardBox"),d=document.createElement("div");d.classList.add("col-md-3","p-0","m-0"),d.innerHTML=`
        <div id="foodCard" class="allCard  card bg-primary" data-store-id="${e.store_id}">
            <div id="foodImage" class="cardImage">
                <img src="${e.photo_two}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${e.store_name}</h5>
                <p class="card-subtitle">${e.short_city}</p>
            </div>
            <div class="btnOverlay">
                <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${e.store_id}" 
                            data-site-name="${e.store_name}" 
                            data-site-add="${e.short_store_add}"
                            data-site-img="${e.photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                </button> 
            </div>
        </div>`,console.log(a);const t=e.store_id;console.log("地點ＩＤ："+t),a.appendChild(d)}async function S(){try{const e=await m.get("http://localhost:8080/site/searchSite/randomSite");console.log("---取得資料---"),console.log(e.data),console.log("---取得資料---"),e.data.forEach(d=>{f(d)}),y(),E()}catch(e){console.error("Error fetching random attractions:",e)}}function I(){return m.get("http://localhost:8080/site/allfood").then(e=>{console.log("取得資料"+e.data),console.log(e.data),e.data.forEach(d=>{v(d)}),y(),b()}).catch(e=>{console.error("Error fetching random attractions:",e)})}function y(){const e=document.querySelectorAll(".allCard");console.log(e),e.forEach(a=>{a.onclick=function(d){if(d.target.tagName==="BUTTON")return;const t=this.getAttribute("data-site-id"),o=this.getAttribute("data-store-id");t&&(console.log(t),window.location.href=`/chill-around-project/pages/siteInfo.html?id=${t}`),o&&(console.log(o),window.location.href=`/chill-around-project/pages/foodMap.html?place_id=${o}`)}})}function E(){let e,a;document.querySelectorAll(".loadSchedule").forEach(t=>{t.addEventListener("click",async o=>{if(!token){o.preventDefault(),o.stopPropagation(),alert("請先登入"),window.location.href="index.html";return}o.stopPropagation();const s=t.getAttribute("data-site-id"),n=t.getAttribute("data-site-name"),r=t.getAttribute("data-site-add"),g=t.getAttribute("data-site-info"),i=t.getAttribute("data-site-img");a={site_id:s,site_name:n,site_add:r,site_info:g,site_img:i},console.log(a);try{const{data:l}=await m.get(`http://localhost:8080/schInfo/getspot/${p}`);console.log("Email ID:",p),console.log("獲取的行程資料:",l);const h=document.getElementById("itinerarySelect");h.innerHTML='<option value="" selected>請選擇行程</option>';const u=l.schedules.map(c=>`<option value="${c.sch_name}" data-schedule-id="${c.sch_id}" data-days="${c.days}">${c.sch_name}</option>`).join("");h.innerHTML+=u,_()}catch(l){console.error("獲取行程資料失敗",l)}})}),document.getElementById("itinerarySelect").addEventListener("change",()=>{const t=document.querySelector("#itinerarySelect :checked"),o=Number(t.dataset.days)+1;e=t.dataset.scheduleId;const s=document.getElementById("daySelectContainer"),n=document.getElementById("daySelect");if(n.innerHTML="",o){s.style.display="block",console.log("選取的天數:",o);const r=Array.from({length:o},(g,i)=>`<option value="${i+1}">第 ${i+1} 天</option>`).join("");n.innerHTML+=r}else s.style.display="none",n.innerHTML='<option value="">請先選擇行程</option>'}),document.querySelector(".Save").addEventListener("click",async()=>{const t=Number(document.getElementById("daySelect").value),o={sch_id:e,sch_day:t,sch_order:"1",sch_spot:a.site_name,sch_info:a.site_info,sch_img:a.site_img};try{await m.post("http://localhost:8080/schInfo/getspot/add",o),alert("行程保存成功"),console.log("Data to Save:",o),$("#exampleModal").modal("hide")}catch(s){alert("保存行程失敗"),console.error("保存行程失敗",s)}})}function b(){let e,a;document.querySelectorAll(".loadSchedule").forEach(t=>{t.addEventListener("click",async o=>{if(!token){o.preventDefault(),o.stopPropagation(),alert("請先登入"),window.location.href="index.html";return}o.stopPropagation();const s=t.getAttribute("data-site-id"),n=t.getAttribute("data-site-name"),r=t.getAttribute("data-site-add"),g=t.getAttribute("data-site-info"),i=t.getAttribute("data-site-img");a={site_id:s,site_name:n,site_add:r,site_info:g,site_img:i},console.log(a);try{const{data:l}=await m.get(`http://localhost:8080/schInfo/getspot/${p}`);console.log("Email ID:",p),console.log("獲取的行程資料:",l);const h=document.getElementById("itinerarySelect");h.innerHTML='<option value="" selected>請選擇行程</option>';const u=l.schedules.map(c=>`<option value="${c.sch_name}" data-schedule-id="${c.sch_id}" data-days="${c.days}">${c.sch_name}</option>`).join("");h.innerHTML+=u,_()}catch(l){console.error("獲取行程資料失敗",l)}})}),document.getElementById("itinerarySelect").addEventListener("change",()=>{const t=document.querySelector("#itinerarySelect :checked"),o=Number(t.dataset.days)+1;e=t.dataset.scheduleId;const s=document.getElementById("daySelectContainer"),n=document.getElementById("daySelect");if(n.innerHTML="",o){s.style.display="block",console.log("選取的天數:",o);const r=Array.from({length:o},(g,i)=>`<option value="${i+1}">第 ${i+1} 天</option>`).join("");n.innerHTML+=r}else s.style.display="none",n.innerHTML='<option value="">請先選擇行程</option>'}),document.querySelector(".Save").addEventListener("click",async()=>{const t=Number(document.getElementById("daySelect").value),o={sch_id:e,sch_day:t,sch_order:"1",sch_spot:a.site_name,sch_info:a.site_info,sch_img:a.site_img};try{await m.post("http://localhost:8080/schInfo/getspot/add",o),alert("行程保存成功"),console.log("Data to Save:",o),$("#exampleModal").modal("hide")}catch(s){alert("保存行程失敗"),console.error("保存行程失敗",s)}})}function _(){const e=document.getElementById("exampleModal");e.classList.add("show"),e.style.display="block",document.body.classList.add("modal-open")}
