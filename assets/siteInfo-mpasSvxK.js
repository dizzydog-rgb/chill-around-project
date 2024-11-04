import"./all-B7fgtTnm.js";import"./login-nusU8p98.js";import"./main-8UblBU7c.js";import{a as p}from"./axios-CCb-kr4I.js";const h=localStorage.getItem("emailid");console.log("emailid:",h);const u=new URLSearchParams(window.location.search);console.log("讀取"+u);const v=u.get("id");console.log("siteId:"+v);p.get(`http://localhost:8080/site/siteinfo/${v}`).then(s=>{console.log("景點資料:",s.data);const{site_id:d,site_name:m,site_phone:e,site_add:t,site_opentime:i,site_web:o,site_info:n,photo_one:a,photo_two:l,photo_three:c,photo_four:r}=s.data;console.log(a),console.log(m),document.getElementById("topImage").innerHTML=`
    <img
          src="../assets/images/searchSite/${a}"
          class="img-fluid"
          alt="大圖"
        />
    `,document.getElementById("siteInfo").innerHTML=`
        <!-- 景點標題-->
        <div class="m-3 container d-flex justify-content-between">
          <h1 class="text-nowrap text-nowrap fs-2">${m}</h1>
          <div class="divider1">
          </div>
        </div>
        <!-- 手機版才會出現的輪播圖 -->
        <div
          id="carouselExample"
          class="carousel slide d-md-none col-md-6 order-md-1"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="siteCarouselItem carousel-item active">
              <img
                src="../assets/images/searchSite/${a}"
                class="d-block w-100"
                alt="圖片 1"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/${l}"
                class="d-block w-100"
                alt="圖片 2"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/${c}"
                class="d-block w-100"
                alt="圖片 3"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/${r}"
                class="d-block w-100"
                alt="圖片 4"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <!-- 電腦版呈現的樣子 主圖縮圖 -->
        <div class="leftImage col-md-6 order-md-1 d-none d-md-block">
          <div class="container p-0">
            <div class="row">
              <div class="mainImage col-md-12 text-center d-none d-md-block">
                <img
                  id="mainImage"
                  src="../assets/images/searchSite/${a}"
                  class="img-fluid"
                  alt="主圖"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${a}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖1"
                  onclick="changeImage('../assets/images/searchSite/${a}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${l}"
                  class=" p-0 thumbnail img-thumbnail"
                  alt="縮圖2"
                  onclick="changeImage('../assets/images/searchSite/${l}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${c}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖3"
                  onclick="changeImage('../assets/images/searchSite/${c}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${r}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖4"
                  onclick="changeImage('../assets/images/searchSite/${r}')"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 右側資訊 -->
        <div class="rightInfo container col-md-6 order-md-2 p-0">
          <div class="info-text">
            <p>電話：${e}</p>
            <p>地址：${t}</p>
            <div class="d-flex">
                <div>
                    <p>開放時間：</p>
                </div>
                <div class="opentime">
                    <p>${i.replace(/\n/g,"<br>")}</p>
                    
                </div>
            </div>
            <div class="infoWeb">
            <p>官方網址：</p>
            <a href=" ${o}" target="_blank"> ${o}</a>
            </div>
            
          </div>
          <div class="addBtn text-end" id= >
              <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${d}" 
                            data-site-name="${m}" 
                            data-site-add="${t}"
                            data-site-info="${n}"
                            data-site-img="${a}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button> 
              </div>
        </div>
          <!-- 下方解說 -->
          <div class="container col-md-12 order-md-3">
            <h2 class="detailsTitle">景點介紹</h2>
            <p class="detailsInfo">${n}</p>
          </div>
    `,b()}).catch(s=>{console.error("無法取得景點資料:",s)});function b(){let s,d;document.querySelectorAll(".loadSchedule").forEach(e=>{e.addEventListener("click",async t=>{if(!token){t.preventDefault(),t.stopPropagation(),alert("請先登入"),window.location.href="index.html";return}t.stopPropagation();const i=e.getAttribute("data-site-id"),o=e.getAttribute("data-site-name"),n=e.getAttribute("data-site-add"),a=e.getAttribute("data-site-info"),l=e.getAttribute("data-site-img");d={site_id:i,site_name:o,site_add:n,site_info:a,site_img:l},console.log(d);try{const{data:c}=await p.get(`http://localhost:8080/schInfo/getspot/${h}`);console.log("Email ID:",h),console.log("獲取的行程資料:",c);const r=document.getElementById("itinerarySelect");r.innerHTML='<option value="" selected>請選擇行程</option>';const y=c.schedules.map(g=>`<option value="${g.sch_name}" data-schedule-id="${g.sch_id}" data-days="${g.days}">${g.sch_name}</option>`).join("");r.innerHTML+=y,I()}catch(c){console.error("獲取行程資料失敗",c)}})}),document.getElementById("itinerarySelect").addEventListener("change",()=>{const e=document.querySelector("#itinerarySelect :checked"),t=Number(e.dataset.days)+1;s=e.dataset.scheduleId;const i=document.getElementById("daySelectContainer"),o=document.getElementById("daySelect");if(o.innerHTML="",t){i.style.display="block",console.log("選取的天數:",t);const n=Array.from({length:t},(a,l)=>`<option value="${l+1}">第 ${l+1} 天</option>`).join("");o.innerHTML+=n}else i.style.display="none",o.innerHTML='<option value="">請先選擇行程</option>'}),document.querySelector(".Save").addEventListener("click",async()=>{const e=Number(document.getElementById("daySelect").value),t={sch_id:s,sch_day:e,sch_order:"1",sch_spot:d.site_name,sch_info:d.site_info,sch_img:d.site_img};try{await p.post("http://localhost:8080/schInfo/getspot/add",t),alert("行程保存成功"),console.log("Data to Save:",t),$("#exampleModal").modal("hide")}catch(i){alert("保存行程失敗"),console.error("保存行程失敗",i)}})}function I(){const s=document.getElementById("exampleModal");s.classList.add("show"),s.style.display="block",document.body.classList.add("modal-open")}
