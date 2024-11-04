import"./all-DcTbhZgf.js";import"./main-BX2b4uAz.js";import"./editPlan_map-D3qBeJOR.js";import{a as m}from"./axios-CCb-kr4I.js";const f=localStorage.getItem("scheduleId");m.get(`http://localhost:8080/buildPlan/editPlan/${f}`).then(function(e){const t=e.data;E(t)}).catch(function(e){console.log(e),console.log("請求行程資料失敗")});const p=document.querySelector(".cardList");function E(e){const t=document.querySelector(".planInfo"),a=document.querySelector(".dayList");t.innerHTML="",a.innerHTML="",p.innerHTML="";let n=new Date(e[0].edit_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-"),d=new Date(e[0].end_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-"),c=q(e[0].edit_date,e[0].end_date);const s=new Set(e.map(l=>l.sch_day)).size;t.innerHTML=`
  <div class="d-flex justify-content-between">
      <div class="planName">
          <h2>${e[0].sch_name}</h2>
          <p>${n} to <br> ${d}</p>
      </div>
      <a href="Budget.html">
      <div class="budget">
          <h2>預算: 0</h2>
          <p>NTD</p>
      </div>
      </a>
  </div>
  <div class="d-flex planedDay">
      <div class="circle">${s}/${c}</div>
      <p class="text-center">已規劃<br>天數</p>
  </div>
  `,a.innerHTML+='<li class="currentDay align-bottom" data-sch-day="1">DAY1</li>';for(let l=2;l<s+1;l++)a.innerHTML+=`<li data-sch-day="${l}">DAY${l}</li>`;a.innerHTML+=`
    <li>
        <div class="addDayBtn">
            <button type="button" class="btn btn-outline-success"><i class="bi bi-plus"></i></button>
        </div>
    </li>
  `,m.get(`http://localhost:8080/buildPlan/editPlan/budget/${f}`).then(function(l){const u=l.data;o(u)}).catch(function(l){console.log(l),console.log("請求預算資料失敗")});function o(l){let u=0;l.forEach(v=>{u+=v.Cost}),document.querySelector(".budget").innerHTML=`
    <h2>預算: ${u} </h2>
    <p>NTD</p>
    `}document.querySelector(".addDayBtn").addEventListener("click",()=>{const l=s+1;if(l>c){alert("這個行程沒有那麼多天");return}m.post("http://localhost:8080/buildPlan/editPlan/addDay",{sch_id:f,sch_day:l}).then(function(u){console.log("新的一天已新增:",u.data),location.reload()}).catch(function(u){console.log("新增一天時發生錯誤:",u)})});const i=a.getElementsByTagName("li");for(let l=0;l<i.length-1;l++)i[l].addEventListener("click",()=>S(l,e));let h=localStorage.getItem("currentDay");h||(h=1,localStorage.setItem("currentDay",h)),S(h-1,e)}function S(e,t){const a=document.querySelector(".dayList").getElementsByTagName("li"),n=document.querySelector(".todayInfo");let d=new Date(t[0].edit_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-"),c=_(d,e);n.innerHTML=`<h3>${c}</h3>`;for(let s=0;s<a.length;s++)a[s].classList.remove("currentDay");a[e].classList.add("currentDay"),localStorage.setItem("currentDay",e+1),localStorage.getItem("currentDay");const r=t.filter(s=>s.sch_day===e+1);b(r)}function b(e){p.innerHTML="",e.sort((t,a)=>t.sch_order-a.sch_order),e.forEach(t=>{let a;t.photo_one===null?a="https://dummyimage.com/600x400/dcab25/dcab25":a=`../assets/images/searchSite/${t.photo_one}`;const n=document.createElement("li");n.innerHTML=`
    <div id="arrangeItem" >
      <li data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-site-name="${t.sch_spot}" data-site-id="${t.detail_id}" data-sch-id="${t.sch_id}" data-site-day="${t.sch_day}" data-site-order="${t.sch_order}"  class="siteItem">
        <div class="card">
          <div class="row g-0">
            <div class="col-12 col-md-8">
              <div class="card-body">
                <h5 class="card-title">${t.sch_spot}</h5>
                <p class="card-text">${t.sch_paragh}</p>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <img src="${a}">
            </div>
          </div>
        </div>
      </li>
    <div>
    `,p.appendChild(n)}),document.querySelectorAll(".siteItem").forEach(function(t){t.addEventListener("click",function(a){let n=a.target.closest("li"),d="",c=document.querySelector(".modal");if(n){d=n.dataset.siteName;const o=c.querySelector('input[name="siteName"]'),g=c.querySelector('textarea[name="siteParagh"]');o&&(o.value=d,g.value=n.querySelector("p[class='card-text']").innerText)}else console.log("找不到最近的 LI");m.get("http://localhost:8080/buildPlan/editPlan/scheduleDetails/tags").then(function(o){const g=o.data;L(g)}).catch(function(o){console.log("Error fetching alltags details:",o)}),m.get(`http://localhost:8080/buildPlan/editPlan/scheduleDetails/tags/${encodeURIComponent(d)}`).then(function(o){const g=o.data;document.querySelector(".tagBox").style.display="block",s(g)}).catch(function(o){document.querySelector(".tagBox").style.display="none",console.log("Error fetching tags details:",o)});let r=[];function s(o){const g=document.querySelectorAll(".toggle-button");g.forEach(function(i){i.classList.remove("btnSelected")}),r=[],g.forEach(function(i){const h=i.textContent.trim(),l=i.dataset.tagId;for(let u=0;u<o.length;u++)o[u].tag_name===h&&(i.classList.add("btnSelected"),r.push(l))}),g.forEach(i=>{const h=i.textContent.trim(),l=i.dataset.tagId;o.includes(h)&&(i.classList.add("btnSelected"),r.includes(l)||r.push(l)),i.addEventListener("click",function(){i.classList.toggle("btnSelected"),i.classList.contains("btnSelected")?r.includes(l)||r.push(l):r=r.filter(u=>u!==l),localStorage.setItem("selectedTags",JSON.stringify(r))})})}})})}function L(e){const t=document.querySelector(".taglist");t.innerHTML="",e.forEach(a=>{const n=document.createElement("li");n.innerHTML=`
      <li>
        <button
          type="button"
          data-tag-id="${a.tag_id}"
          class="btn btn-outline-primary toggle-button"
        >
          ${a.tag_name}
        </button>
      </li>
    `,t.appendChild(n)})}function q(e,t){const a=new Date(e),c=(new Date(t)-a)/(1e3*60*60*24);return Math.floor(c)+1}function _(e,t){const a=new Date(e);return new Date(a.getTime()+t*(1e3*60*60*24)).toISOString().slice(0,10)}document.addEventListener("DOMContentLoaded",function(){localStorage.getItem("token")||(alert("請先登入會員"),window.location.href="index.html")});document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector(".modal"),t=!1,a,n,d;document.addEventListener("click",function(c){if(c.target.closest(".siteItem")){let r=c.target.closest("li");a=r.dataset.siteId,n=r.dataset.schId,d=r.dataset.siteDay,t=!0}}),document.querySelector(".addJourneyBtn").addEventListener("click",function(c){t=!1,a=null;const s=this.closest(".editArea").querySelector(".siteItem");n=s.dataset.schId,d=s.dataset.siteDay,e.querySelector('input[name="siteName"]').value="",e.querySelector('textarea[name="siteParagh"]').value="",document.querySelector(".tagBox").style.display="none",m.get("http://localhost:8080/buildPlan/editPlan/scheduleDetails/tags").then(function(o){const g=o.data;L(g)}).catch(function(o){console.log("Error fetching alltags details:",o)})}),document.getElementById("save-site").addEventListener("click",()=>{const c=e.querySelector('input[name="siteName"]').value,r=e.querySelector('textarea[name="siteParagh"]').value;let s=JSON.parse(localStorage.getItem("selectedTags"))||[];s.length===0&&(s=Array.from(document.querySelectorAll(".btnSelected")).map(o=>o.dataset.tagId)),console.log("最終的 selectedTags:",s),t?m.put(`http://localhost:8080/buildPlan/editPlan/sites/${a}`,{sch_spot:c,sch_paragh:r,tags:s}).then(function(o){console.log("行程點已更新:",o.data),s=[],e.style.display="none",location.reload()}).catch(function(o){console.log("更新行程點時發生錯誤:",o)}):m.post(`http://localhost:8080/buildPlan/editPlan/sites/${n}/${d}`,{sch_spot:c,sch_paragh:r}).then(function(o){console.log("行程點已新增:",o.data),e.style.display="none",location.reload()}).catch(function(o){console.log("新增行程點時發生錯誤:",o)})}),document.getElementById("delete-site").addEventListener("click",()=>{m.delete(`http://localhost:8080/buildPlan/editPlan/sites/${a}`,{}).then(function(c){console.log("行程點已刪除:",c.data),e.style.display="none",location.reload()}).catch(function(c){console.log("更新行程點時發生錯誤:",c)})})});document.querySelector("#arrangeSite").addEventListener("click",()=>{let e=document.querySelectorAll("#arrangeItem"),t=document.querySelectorAll(".siteItem");e.forEach(n=>{n.addEventListener("dragover",D),n.addEventListener("drop",I)}),t.forEach(n=>{n.setAttribute("draggable","true"),n.addEventListener("dragstart",T),n.addEventListener("dragover",D),n.addEventListener("drop",I),n.classList.add("animate__animated","animate__pulse","animate__infinite","animate__slower")}),document.querySelector(".editBtn").innerHTML=`
    <div>
        <button
            type="button"
            class="btn btn-danger completeArrangeBtn"
        >
            完成
        </button>
    </div>
    `;const a=document.createElement("div");a.classList.add("overlay"),document.querySelector(".editPlan").appendChild(a),document.querySelector(".editBtn").classList.add("goToFront"),document.querySelector(".cardList").classList.add("goToFront"),document.querySelector(".completeArrangeBtn").addEventListener("click",()=>{console.log(y);const n=document.querySelector(".siteItem");let d=n.dataset.schId,c=n.dataset.siteDay;m.put(`http://localhost:8080/buildPlan/editPlan/sites/order/${d}/${c}`,{sch_order_array:y}).then(function(r){console.log("景點順序已更新:",r.data),location.reload()}).catch(function(r){console.log("更新行程點時發生錯誤:",r)})})});function D(e){console.log("拖拉中"),e.preventDefault()}function T(e){console.log("開始拖拉");let t=e.target;for(;t&&t.tagName!=="LI";)t=t.parentElement;e.dataTransfer.setData("currentSiteOrder",t.dataset.siteOrder)}function I(e){console.log("拖拉結束"),e.preventDefault();let t=e.dataTransfer.getData("currentSiteOrder"),a=e.target,n=document.querySelectorAll(".siteItem"),d=Array.from(n).find(c=>c.dataset.siteOrder===t);for(;a&&a.id!=="arrangeItem";)a=a.parentElement;a?(a.appendChild(d),$(),P()):console.log("找不到合適的位置來放置")}function $(){const e=document.querySelectorAll("#arrangeItem"),t=document.querySelectorAll(".siteItem");e.forEach((a,n)=>{a.appendChild(t[n])})}let y=[];function P(){y=[],document.querySelectorAll(".siteItem").forEach(t=>{y.push(t.dataset.siteOrder)}),console.log("當前順序:",y)}
