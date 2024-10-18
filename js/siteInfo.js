import axios from 'axios';

// 寫這段是為了要讓我在5173的網址輸入對應的id可以撈到對應的資料
const params = new URLSearchParams(window.location.search);
// http://localhost:5173/chill-around-project/pages/siteInfo.html?id=1
console.log( '讀取'+ params ); //讀取id=1

const siteId = params.get('id'); // 假設 URL 包含 ?id=1
console.log('siteId:'+ siteId); //siteId:1



axios.get(`http://localhost:8080/site/siteinfo/${siteId}`)
  .then(response => {
    console.log('景點資料:', response.data);
    // 這裡可以進一步處理獲取的資料，例如更新 UI
    // 假設 response.data 有 title, startDate 和 endDate 屬性
    const { site_name,site_phone,site_add , site_opentime, site_web,site_info,photo_one,photo_two,photo_three,photo_four } = response.data;

    // 更新 UI，顯示資料
    document.getElementById('siteInfo').innerHTML = `
        <!-- 景點標題-->
        <div class="m-3 container d-flex justify-content-between">
          <h1 class="text-nowrap text-nowrap fs-2">${site_name}</h1>
          <div class="divider1">
          </div>
        </div>
        <!-- 輪播圖 -->
        <div
          id="carouselExample"
          class="carousel slide d-md-none col-md-6 order-md-1"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="siteCarouselItem carousel-item active">
              <img
                src="../assets/images/searchSite/文創園區.jpg"
                class="d-block w-100"
                alt="圖片 1"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/文創園區02.jpg"
                class="d-block w-100"
                alt="圖片 2"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/文創園區03.jpeg"
                class="d-block w-100"
                alt="圖片 3"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/文創園區04.jpeg"
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
        <!-- 主圖縮圖 -->
        <div class="leftImage col-md-6 order-md-1 d-none d-md-block">
          <div class="container p-0">
            <div class="row">
              <div class="mainImage col-md-12 text-center d-none d-md-block">
                <img
                  id="mainImage"
                  src="../assets/images/searchSite/文創園區.jpg"
                  class="img-fluid"
                  alt="主圖"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/文創園區01.jpeg"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖1"
                  onclick="changeImage('../assets/images/searchSite/文創園區01.jpeg')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/文創園區02.jpg"
                  class=" p-0 thumbnail img-thumbnail"
                  alt="縮圖2"
                  onclick="changeImage('../assets/images/searchSite/文創園區02.jpg')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/文創園區03.jpeg"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖3"
                  onclick="changeImage('../assets/images/searchSite/文創園區03.jpeg')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/文創園區04.jpeg"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖4"
                  onclick="changeImage('../assets/images/searchSite/文創園區04.jpeg')"
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
            <p>${site_info}</p>
          </div>
       

    `;
  })
  .catch(error => {
    console.error('無法取得景點資料:', error);
  });


// 當頁面加載完成時，自動獲取資料
window.onload = function() {
    getFile(); // 這裡會在頁面加載時自動呼叫獲取資料的函數
};

// 宣告 function getFile()
function getFile() {
    let xhr = new XMLHttpRequest(); // 創建一個新的 XMLHttpRequest 對象
    xhr.open('GET', 'http://localhost:8080/site/siteinfo/1', true); // 設定請求方式和URL
    xhr.addEventListener('load', function () {
        if (this.status >= 200 && this.status < 300) { // 檢查請求是否成功
            let data = JSON.parse(this.responseText); // 將回應的文本解析為 JSON 物件
            console.log(data); // 在控制台檢查獲取的資料

            // // 確保 data 是物件，並將相關資訊顯示在畫面上
            // document.getElementById('divResult').innerHTML = `
            //     活動期間: ${data.startDate} - ${data.endDate} <br>
            //     活動名稱: ${data.title}
            //     <hr>
            // `;
        } else {
            console.error('無法取得資料:', this.statusText); // 請求沒有成功，處理錯誤
            document.getElementById('divResult').innerHTML = `<p>Error: ${this.statusText}</p>`;
        }
    });

    xhr.addEventListener('error', function () {
        console.error('網絡錯誤'); // 如果發生網絡錯誤，處理錯誤
        document.getElementById('divResult').innerHTML = `<p>Network Error</p>`;
    });

    xhr.send(); // 發送請求
}




function changeImage(image) {
    document.getElementById("mainImage").src = image;
  }

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