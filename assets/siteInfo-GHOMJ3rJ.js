import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-JssQaTV8.js";import{a as h}from"./axios-CCb-kr4I.js";/* empty css            */const c=new URLSearchParams(window.location.search);console.log("讀取"+c);const d=c.get("id");console.log("siteId:"+d);h.get(`http://localhost:8080/site/siteinfo/${d}`).then(e=>{console.log("景點資料:",e.data);const{site_name:n,site_phone:o,site_add:m,site_opentime:r,site_web:s,site_info:g,photo_one:a,photo_two:i,photo_three:l,photo_four:t}=e.data;console.log(a),document.getElementById("topImage").innerHTML=`
    <img
          src="../assets/images/searchSite/${t}"
          class="img-fluid"
          alt="大圖"
        />
    `,document.getElementById("siteInfo").innerHTML=`
        <!-- 景點標題-->
        <div class="m-3 container d-flex justify-content-between">
          <h1 class="text-nowrap text-nowrap fs-2">${n}</h1>
          <div class="divider1">
          </div>
        </div>
        <!-- 主圖縮圖 -->
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
                  src="../assets/images/searchSite/${i}"
                  class=" p-0 thumbnail img-thumbnail"
                  alt="縮圖2"
                  onclick="changeImage('../assets/images/searchSite/${i}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${l}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖3"
                  onclick="changeImage('../assets/images/searchSite/${l}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${t}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖4"
                  onclick="changeImage('../assets/images/searchSite/${t}')"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 右側資訊 -->
        <div class="rightInfo container col-md-6 order-md-2 p-0">
          <div class="info-text">
            <p>電話：${o}</p>
            <p>地址：${m}</p>
            <div class="d-flex">
                <div>
                    <p>開放時間：</p>
                </div>
                <div class="opentime">
                    <p>${r.replace(/\n/g,"<br>")}</p>
                    
                </div>
            </div>
            <p>官方網址：
            <a href=" ${s}" target="_blank"> ${s}</a>
            </p>
          </div>
          <div class="addBtn text-end" >
              <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  加入行程
              </button>
              </div>
        </div>
          <!-- 下方解說 -->
          <div class="container col-md-12 order-md-3">
            <h2 class="detailsTitle">景點介紹</h2>
            <p class="detailsInfo">${g}</p>
          </div>
    `}).catch(e=>{console.error("無法取得景點資料:",e)});$(document).ready(function(){$("#itinerarySelect").change(function(){$(this).val()?$("#daySelectContainer").show():$("#daySelectContainer").hide()}),$("#exampleModal").on("hide.bs.modal",function(){$("#daySelectContainer").hide(),$("#itinerarySelect").val(""),$("#daySelect").val("")})});
