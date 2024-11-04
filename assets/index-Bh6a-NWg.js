import"./all-DcTbhZgf.js";import"./login-nusU8p98.js";import"./main-BX2b4uAz.js";import{a as i}from"./axios-CCb-kr4I.js";console.log("首頁載入成功");function c(){new Swiper(".mySwiperIndex",{spaceBetween:0,pagination:{el:".swiper-pagination",clickable:!0},autoplay:{delay:6e3,disableOnInteraction:!1}})}i.get("http://localhost:8080/heroCarousel").then(t=>{const e=t.data;console.log(t.data);const n=document.getElementById("hero-container");let o="";e.forEach(a=>{o+=`
            <div class="swiper-slide">
                <div
                  class="hero-image"
                  style="
                    background-image: linear-gradient(
                        rgba(0, 0, 0, 0.5),
                        rgba(0, 0, 0, 0.5)
                      ),
                      url('../assets/images/index/${a.carousel_Img}');
                  "
                >
                  <div class="container-fluid p-0">
                    <div class="row">
                      <div class="col-md-6 hero-text">
                        <h1>${a.carousel_tw}</h1>
                        <p>${a.carousel_en}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>`}),n.innerHTML=o,c()}).catch(t=>{console.error("無法獲取輪播圖資料:",t)});i.get("http://localhost:8080/herotag").then(t=>{const e=t.data;console.log(t.data);const n=document.getElementById("tag-container");let o="";e.forEach(a=>{o+=`
              <button type="button" class="IndexBtn btn btn-outline-primary btn-sm mx-2 mb-2" 
              data-tag-id="${a.tag_id}" >
                ${a.tag_name}
              </button>`}),n.innerHTML=o}).catch(t=>{console.error("無法獲取標籤資料:",t)});document.getElementById("tag-container").addEventListener("click",t=>{if(t.target.classList.contains("IndexBtn")){const e=t.target.getAttribute("data-tag-id");console.log(e),window.location.href=`/chill-around-project/pages/schMore.html?site_city=${encodeURIComponent}&tag_id=${encodeURIComponent(e)}`}});
