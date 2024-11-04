import"./all-B7fgtTnm.js";import"./main-8UblBU7c.js";import{a as v}from"./axios-CCb-kr4I.js";import"./editPlan_map-D3qBeJOR.js";const r=localStorage.getItem("selectedSchId");r&&(console.log("選取的 Sch ID:",r),v.get(`http://localhost:8080/buildPlan/editPlan/${r}`).then(function(e){const o=e.data;console.log(o),D(o),S()}).catch(function(e){console.log(e),console.log("請求行程資料失敗")}));function D(e){const o=document.querySelector(".SchComImage"),s=document.querySelector(".cardList"),u=new Set(e.map(t=>t.sch_day)).size;o.innerHTML=`
        <div class="planName">
            <h2>${e[0].sch_name}</h2>
            <p>${e[0].edit_date.slice(0,10)} to <br class="d-block d-md-none"> ${e[0].end_date.slice(5,10)}</p>
        </div>
        <div class="d-flex justify-content-between DateBox border-top border-primary pt-3 align-items-end">
            <div class="editBtn">               
                <ul class="d-flex dayList m-0 p-0"></ul>
            </div>
            <div class="todayInfo">
                <h3>台中市</h3>
                <h3>Fri 09/13</h3>
            </div>
        </div>
    `;const i=document.querySelector(".dayList");i.innerHTML+='<li class="currentDay " data-sch-day="1">DAY1</li>';for(let t=2;t<=u;t++)i.innerHTML+=`<li data-sch-day="${t}">DAY${t}</li>`;const n=i.getElementsByTagName("li");for(let t=0;t<n.length;t++)n[t].addEventListener("click",()=>m(t,e));m(0,e);function m(t,a){const c=document.querySelector(".todayInfo");let f=a[0].edit_date.slice(0,10),g=y(f,t);c.innerHTML=`<h3>${g}</h3>`;for(let l of n)l.classList.remove("currentDay");n[t].classList.add("currentDay"),localStorage.setItem("currentDay",t+1);const p=a.filter(l=>l.sch_day===t+1);h(p)}function h(t){s.innerHTML="",t.forEach(a=>{let c=a.photo_one?`../assets/images/searchSite/${a.photo_one}`:"https://dummyimage.com/600x400/dcab25/dcab25";s.innerHTML+=`
                <a href="#" class="SiteCard" data-site-id="${a.site_id}">
                    <li class="siteItem" data-site-name="${a.sch_spot}">
                        <div class="card">
                            <div class="row g-0">
                                <div class="col-12 col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${a.sch_spot}</h5>
                                        <p class="card-text">${a.sch_paragh}</p>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <img src="${c}" alt="Card Image">
                                </div>
                            </div>
                        </div>
                    </li>
                </a>
            `})}function y(t,a){const c=new Date(t);return c.setDate(c.getDate()+a),c.toLocaleDateString()}}function S(){document.querySelectorAll(".SiteCard").forEach(o=>{o.onclick=function(s){if(s.target.tagName==="BUTTON")return;const d=this.getAttribute("data-site-id");window.location.href=`/chill-around-project/pages/siteInfo.html?id=${d}`,console.log(d)}})}
