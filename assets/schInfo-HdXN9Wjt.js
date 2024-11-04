import"./all-DcTbhZgf.js";import"./login-nusU8p98.js";import"./main-BX2b4uAz.js";import{a as r}from"./axios-CCb-kr4I.js";const p=localStorage.getItem("emailid");console.log("emailid:",p);document.addEventListener("DOMContentLoaded",function(){r.get("http://localhost:8080/schInfo/getsch").then(e=>{const o=e.data;console.log("獲取到的資料:",o);const i=10;let t=0;o.sort(()=>.5-Math.random()).forEach(function(s){if(t>=i)return;let n=s.edit_date.slice(0,10),l=`
                    <div class="swiper-slide">
                        <div id="siteCard" class="TopCard card bg-primary" data-sch-id="${s.sch_id}
                        ">
                            <div class="TopcardImage">
                                <img src="../assets/images/searchSite/${s.photo_one}" alt="">
                            </div>
                            <div class="TopcardOverlay">
                                <h5 class="card-title ">${s.sch_name}</h5>
                                <p class="card-subtitle">${n} </p>
                            </div>
                        </div>
                    </div>`;document.querySelector(".mySwiper_1 .swiper-wrapper").insertAdjacentHTML("beforeend",l),t++}),document.querySelectorAll(".TopCard").forEach(s=>{s.addEventListener("click",n=>{const l=n.currentTarget.getAttribute("data-sch-id");localStorage.setItem("selectedSchId",l),console.log(l),window.location.href="schCom.html"})})}).catch(e=>{console.error("無法取得卡片的資料:",e)}),new Swiper(".mySwiper_1",{spaceBetween:0,slidesPerView:4,centeredSlides:!1,pagination:{el:".swiper-pagination_1",clickable:!0},navigation:{nextEl:".swiper-button-next_1",prevEl:".swiper-button-prev_1"},autoplay:{delay:5e3,disableOnInteraction:!1},breakpoints:{320:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:3,spaceBetween:0},1024:{slidesPerView:4,spaceBetween:0}}}),document.getElementById("searchButton").addEventListener("click",function(){const e=document.getElementById("citySelect").value,o=document.getElementById("tagSelect").value;console.log(e),console.log(o),console.log("---------------"),window.location.href=`/chill-around-project/pages/schMore.html?site_city=${encodeURIComponent(e)}&tag_id=${encodeURIComponent(o)}`});async function g(){if(!localStorage.getItem("token"))return[];const o=localStorage.getItem("emailid");return(await r.get(`http://localhost:8080/schInfo/getLikedItems/${o}`)).data}function f(e){if(e.stopPropagation(),!token){e.preventDefault(),e.stopPropagation(),alert("請先登入"),window.location.href="index.html";return}const o=e.target,i=o.getAttribute("data-sch-id"),t=o.getAttribute("data-email-id");console.log("User ID:",t,"Sch ID:",i);const a={emailid:p,sch_id:i};o.classList.contains("bi-heart")?r.post("http://localhost:8080/schInfo/getToLike",a).then(c=>{console.log("資料已成功發送:",a),alert("加入成功"),o.classList.toggle("bi-heart"),o.classList.toggle("bi-heart-fill")}).catch(c=>{alert("加入失敗"),console.error("無法發送資料:",c)}):r.delete("http://localhost:8080/schInfo/removeLike",{data:a}).then(c=>{console.log("資料已成功刪除:",a),alert("已取消"),o.classList.toggle("bi-heart"),o.classList.toggle("bi-heart-fill")}).catch(c=>{alert("取消失敗"),console.error("無法刪除資料:",c)})}async function y(){try{const e=await g();console.log("已加入最愛:",e);const i=(await r.get("http://localhost:8080/schInfo/getsch")).data,t=8;let a=0;i.sort(()=>.5-Math.random()).forEach(function(s){if(a>=t)return;let n=s.edit_date.slice(0,10);const d=e.includes(s.sch_id)?"bi-heart-fill":"bi-heart";let h=`
                <div class="col-md-3 p-0 m-0">
                    <div id="SchCard" class="SchCard card bg-primary" 
                    data-sch-id="${s.sch_id}">
                        <div class="SchcardImage">
                            <img src="../assets/images/searchSite/${s.photo_one}" alt="">
                        </div>
                        <div class="cardOverlay">
                            <h5 class="card-title">${s.sch_name}</h5>
                            <p class="card-subtitle">${n}</p>
                        </div>
                        <div class="btnOverlay">
                             <a id="likeBtn" class="bi ${d}" 
                                data-sch-id="${s.sch_id}"
                                >
                             </a>
                        </div>
                    </div>
                </div>`;document.querySelector("#SchcardBox").insertAdjacentHTML("beforeend",h),a++}),document.querySelectorAll(".SchCard").forEach(s=>{s.addEventListener("click",n=>{const l=n.currentTarget.getAttribute("data-sch-id");localStorage.setItem("selectedSchId",l),window.location.href="schCom.html"})}),document.querySelectorAll(".bi-heart, .bi-heart-fill").forEach(s=>{s.addEventListener("click",f)})}catch(e){console.error("無法取得卡片的資料:",e)}}y(),r.get("http://localhost:8080/schInfo/siteinfo").then(e=>{const o=e.data;console.log(e.data),v(o,4),S(),b()}).catch(e=>{console.error("無法取得卡片的資料:",e)});function v(e,o){let i=0;e.forEach(function(t){if(i>=o)return;let a=`
            <div class="col-md-3 p-0 m-0">
                <div class="SiteCard card bg-primary" data-site-id="${t.site_id}">
                    <div class="SchcardImage">
                        <img src="../assets/images/searchSite/${t.photo_one}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title">${t.site_name}</h5>
                        <p class="card-subtitle">${t.short_site_add}</p>
                    </div>
                    <div class="btnOverlay">
                        <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${t.site_id}" 
                            data-site-name="${t.site_name}" 
                            data-site-add="${t.short_site_add}"
                            data-site-info="${t.site_info}"
                            data-site-img="${t.photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button>
                    </div>
                </div>
            </div>`;document.querySelector("#SchcardBox2").insertAdjacentHTML("beforeend",a),i++})}function S(){document.querySelectorAll(".SiteCard").forEach(o=>{o.onclick=function(i){if(i.target.tagName==="BUTTON")return;const t=this.getAttribute("data-site-id");window.location.href=`/chill-around-project/pages/siteInfo.html?id=${t}`}})}function b(){let e,o;document.querySelectorAll(".loadSchedule").forEach(t=>{t.addEventListener("click",async a=>{if(!token){a.preventDefault(),a.stopPropagation(),alert("請先登入"),window.location.href="index.html";return}a.stopPropagation();const c=t.getAttribute("data-site-id"),s=t.getAttribute("data-site-name"),n=t.getAttribute("data-site-add"),l=t.getAttribute("data-site-info"),d=t.getAttribute("data-site-img");o={site_id:c,site_name:s,site_add:n,site_info:l,site_img:d},console.log(o);try{const{data:h}=await r.get(`http://localhost:8080/schInfo/getspot/${p}`);console.log("Email ID:",p),console.log("獲取的行程資料:",h);const u=document.getElementById("itinerarySelect");u.innerHTML='<option value="" selected>請選擇行程</option>';const _=h.schedules.map(m=>`<option value="${m.sch_name}" data-schedule-id="${m.sch_id}" data-days="${m.days}">${m.sch_name}</option>`).join("");u.innerHTML+=_,w()}catch(h){console.error("獲取行程資料失敗",h)}})}),document.getElementById("itinerarySelect").addEventListener("change",()=>{const t=document.querySelector("#itinerarySelect :checked"),a=Number(t.dataset.days)+1;e=t.dataset.scheduleId;const c=document.getElementById("daySelectContainer"),s=document.getElementById("daySelect");if(s.innerHTML="",a){c.style.display="block",console.log("選取的天數:",a);const n=Array.from({length:a},(l,d)=>`<option value="${d+1}">第 ${d+1} 天</option>`).join("");s.innerHTML+=n}else c.style.display="none",s.innerHTML='<option value="">請先選擇行程</option>'}),document.querySelector(".Save").addEventListener("click",async()=>{const t=Number(document.getElementById("daySelect").value),a={sch_id:e,sch_day:t,sch_order:"1",sch_spot:o.site_name,sch_info:o.site_info,sch_img:o.site_img};try{await r.post("http://localhost:8080/schInfo/getspot/add",a),alert("行程保存成功"),console.log("Data to Save:",a),$("#exampleModal").modal("hide")}catch(c){alert("保存行程失敗"),console.error("保存行程失敗",c)}})}function w(){const e=document.getElementById("exampleModal");e.classList.add("show"),e.style.display="block",document.body.classList.add("modal-open")}r.get("http://localhost:8080/schInfo/YtAndBlog").then(e=>{const o=e.data;console.log(e.data);const i=6;let t=0;o.forEach(function(a){if(t>=i)return;let c=`
        <div class="swiper-slide">
            <div class="Yt_video">
            
      <iframe width="560" height="315" src="${a.yt_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            </div>
        </div>`;document.querySelector(".mySwiper_2 .swiper-wrapper").insertAdjacentHTML("beforeend",c),t++})}).catch(e=>{console.error("無法取得Youtube的資料:",e)}),new Swiper(".mySwiper_2",{spaceBetween:10,slidesPerView:3,centeredSlides:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:5e3,disableOnInteraction:!1},breakpoints:{320:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:10},1024:{slidesPerView:3,spaceBetween:10}}}),r.get("http://localhost:8080/schInfo/YtAndBlog").then(e=>{const o=e.data;console.log(e.data),o.forEach(function(i){let t=`
                <a href="${i.blog_url}" target="_blank" class=" my-3 Blog card p-0 text-decoration-none">
                  
                    <div class="custom-card row">
                      <!-- 左邊的圖片 -->
                      <div class="col-lg-4 col-md-4 col-sm-12 m-0">
                        <img
                          src="${i.blog_Img}"
                          class="custom-img"
                        />
                      </div>
              
                      <!-- 右邊的文字內容 -->
                      <div class="col-lg-8 col-md-8 col-sm-12 card-body ">
                           <h4 class="card-title fw-bolder text-truncate p-2">${i.blog_title}</h4>
                        <div class="d-flex justify-content-end align-items-center mt-2 card-text p-2">
                            <h6 class=" m-0">${i.blog_author}</h6>
                            <p class="date  my-0 ms-3">${i.blog_year_month}</p>
                        </div>
                          <hr>
                            <p class="card-text p-2">
                             ${i.blog_paragh}
                            </p>
                         
                     
                        
                      </div>
                    </div>
                  
                </a>
              `;document.querySelector("#blogbox").insertAdjacentHTML("beforeend",t)})}).catch(e=>{console.error("無法取得Youtube的資料:",e)})});
