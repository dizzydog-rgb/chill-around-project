import"./all-DcTbhZgf.js";import"./main-BX2b4uAz.js";import{a as s}from"./axios-CCb-kr4I.js";async function m(){await customElements.whenDefined("gmp-map");const t=document.querySelector("gmp-map"),i=document.querySelector("gmp-advanced-marker"),e=document.querySelector("gmpx-place-picker");t.innerMap.setOptions({mapTypeControl:!1}),e.addEventListener("gmpx-placechange",n);function n(){const a=e.value.formattedAddress;new google.maps.places.PlacesService(t.innerMap).textSearch({query:a},(d,r)=>{if(r===google.maps.places.PlacesServiceStatus.OK&&d.length>0){const l=d[0];e.setInputValue&&e.setInputValue(l.name),o(l)}})}function o(a){a.geometry.viewport?t.innerMap.fitBounds(a.geometry.viewport):(t.center=a.geometry.location,t.zoom=17),i.position=a.geometry.location}}document.addEventListener("DOMContentLoaded",m);const u=localStorage.getItem("emailid");s.get(`http://localhost:8080/buildPlan/planList/${u}`).then(function(t){const i=t.data;p(i)}).catch(function(t){console.log(t),console.log("請求失敗")}).finally(function(){});function p(t){const i=document.querySelector(".cardList");i.innerHTML="",t.forEach(e=>{const n=document.createElement("li");let o=new Date(e.edit_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-"),a=new Date(e.end_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-");n.innerHTML=`
            <li class="d-flex justify-content-center" id="scheduleItem" data-scheduleId="${e.sch_id}">
                <div class="card" style="width: 90%">
                  <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title"></h5>
                    <div class="editBtn dropdown">
                      <button type="button" class="btn btn-outline-danger dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a href="" class="dropdown-item" id="deletePlan">刪除此計畫</a></li>
                      </ul>
                    </div>
                  </div>
                  <img
                    src="../assets/images/searchSite/${e.photo_one}"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <div>
                      <h5 class="card-title">${e.sch_name}</h5>
                      <p class="card-text">${o} - ${a}</p>
                    </div>
                    <div class="d-flex align-items-center shareBtn">
                      <button type="button" class="btn btn-outline-primary">
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              </li>
      `,i.appendChild(n)}),document.querySelectorAll(".card").forEach(e=>{e.addEventListener("click",function(n){if(n.target.classList.contains("bi-three-dots")||n.target.id==="deletePlan"){n.stopPropagation();return}const o=this.closest("#scheduleItem").dataset.scheduleid;localStorage.setItem("scheduleId",o),window.location.href="editPlan.html"},{once:!0})}),document.addEventListener("click",e=>{const o=e.target.closest("#scheduleItem").dataset.scheduleid;e.target.classList.contains("bi-three-dots")?e.stopPropagation():e.target.id==="deletePlan"&&confirm("確定要刪除此計畫嗎？")&&s.delete(`http://localhost:8080/buildPlan/planList/${o}`).then(c=>{console.log("計畫刪除成功",c.data),location.reload()}).catch(c=>{console.error("刪除計畫失敗:",c)})})}document.addEventListener("DOMContentLoaded",function(){localStorage.getItem("token")||(alert("請先登入會員"),window.location.href="index.html")});
