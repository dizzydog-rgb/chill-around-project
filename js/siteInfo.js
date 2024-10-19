import axios from 'axios';

// 寫這段是為了要讓我在5173的網址輸入對應的id可以撈到對應的資料
const params = new URLSearchParams(window.location.search);
// http://localhost:5173/chill-around-project/pages/siteInfo.html?id=1
console.log( '讀取'+ params ); //讀取id=1

const siteId = params.get('id'); // 假設 URL 包含 ?id=1
console.log('siteId:'+ siteId); //siteId:1

// 這段放在hesder.js中，因為要確保在引入 HTML 中的圖片之前加載
// function changeImage(image) {
//     document.getElementById("mainImage").src = image;
//   }

axios.get(`http://localhost:8080/site/siteinfo/${siteId}`)
  .then(response => {
    console.log('景點資料:', response.data);
    // 這裡可以進一步處理獲取的資料，例如更新 UI
    // 假設 response.data 有 title, startDate 和 endDate 屬性
    const { site_name,site_phone,site_add , site_opentime, site_web,site_info,photo_one,photo_two,photo_three,photo_four } = response.data;
    console.log(photo_one);
    
    // 更新 UI，顯示資料
    document.getElementById('topImage').innerHTML = `
    <img
          src="${photo_four}"
          class="img-fluid"
          alt="大圖"
        />
    `;
    document.getElementById('siteInfo').innerHTML = `
        <!-- 景點標題-->
        <div class="m-3 container d-flex justify-content-between">
          <h1 class="text-nowrap text-nowrap fs-2">${site_name}</h1>
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
                  src="${photo_one}"
                  class="img-fluid"
                  alt="主圖"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="smallImage col-md-3 text-center">
                <img
                  src="${photo_one}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖1"
                  onclick="changeImage('${photo_one}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="${photo_two}"
                  class=" p-0 thumbnail img-thumbnail"
                  alt="縮圖2"
                  onclick="changeImage('${photo_two}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="${photo_three}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖3"
                  onclick="changeImage('${photo_three}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="${photo_four}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖4"
                  onclick="changeImage('${photo_four}')"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 右側資訊 -->
        <div class="rightInfo container col-md-6 order-md-2 p-0">
          <div class="info-text">
            <p>電話：${site_phone}</p>
            <p>地址：${site_add}</p>
            <div class="d-flex">
                <div>
                    <p>開放時間：</p>
                </div>
                <div class="opentime">
                    <p>${site_opentime.replace(/\n/g, '<br>')}</p>
                    
                </div>
            </div>
            <p>官方網址：
            <a href=" ${site_web}" target="_blank"> ${site_web}</a>
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
            <p class="detailsInfo">${site_info}</p>
          </div>
    `;
  })
  .catch(error => {
    console.error('無法取得景點資料:', error);
  });


  $(document).ready(function() {
    //modal
        // 當選擇行程時，顯示天數選擇
        $('#itinerarySelect').change(function () {
            if ($(this).val()) {
                $('#daySelectContainer').show(); // 顯示天數選擇
            } else {
                $('#daySelectContainer').hide(); // 隱藏天數選擇
            }
        });

        // 確保關閉模態框時，隱藏天數選擇
        $('#exampleModal').on('hide.bs.modal', function () {
            $('#daySelectContainer').hide(); // 隱藏天數選擇
            $('#itinerarySelect').val(''); // 重置行程選擇
            $('#daySelect').val(''); // 重置天數選擇
        });

  



  });