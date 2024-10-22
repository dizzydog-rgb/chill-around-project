import axios from 'axios';


document.addEventListener('DOMContentLoaded', function () {
    //這是頁首的輪播卡片
    axios.get('http://localhost:8080/schInfo/siteinfo')

        .then(response => {
            const dataSite = response.data; // 獲取資料
            console.log(response.data);

            dataSite.forEach(function (data) {

                let topPage = `
        <div class="swiper-slide">
            <div id="siteCard" class="TopCard card bg-primary ">
                <div class="TopcardImage">
                    <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                </div>
                <div class="TopcardOverlay">
                    <h5 class="card-title ">${data.site_name}</h5>
                    <p class="card-subtitle">${data.short_site_add}</p>
                </div>
            </div>
        </div>`;
                document.querySelector(".mySwiper_1 .swiper-wrapper").insertAdjacentHTML('beforeend', topPage);
            });
        })
        .catch(error => {
            console.error('無法取得的資料:', error);
        });


    var swiper = new Swiper(".mySwiper_1", {
        spaceBetween: 0,
        slidesPerView: 4,
        centeredSlides: false,
        pagination: {
            el: ".swiper-pagination_1",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next_1",
            prevEl: ".swiper-button-prev_1",
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
        },
    });

    //可以加入的景點卡片
    axios.get('http://localhost:8080/schInfo/siteinfo')

        .then(response => {
            const dataSite = response.data; // 獲取資料
            console.log(response.data);

            // 設定顯示卡片的最大數量
            const maxCards = 12;
            let cardCount = 0;

            dataSite.forEach(function (data) {
                if (cardCount >= maxCards) return; // 當顯示的卡片數達到 maxCards 時停止

                let siteCard = `
            <div class="col-md-3 p-0 m-0">
                <div id="siteCard" class="SchCard card bg-primary">
                    <div class="SchcardImage">
                        <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title ">${data.site_name}</h5>
                        <p class="card-subtitle">${data.short_site_add}</p>
                    </div>
                    <div class="btnOverlay">
                        <a id="likeBtn" class="bi bi-heart"></a>
                        <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        id="loadSchedule">
                        加入行程
                        </button>
                    </div>
                </div>
            </div>`;
                document.querySelector("#SchcardBox").insertAdjacentHTML('beforeend', siteCard);
                cardCount++; // 增加計數
            });
        })
        .catch(error => {
            console.error('無法取得卡片的資料:', error);
        });



    //這是影片的資料
    axios.get("http://localhost:8080/schInfo/YtAndBlog")

        .then(response => {
            const infoData = response.data; // 獲取資料
            console.log(response.data);

            const maxVideos = 6;
            let videoCount = 0;

            infoData.forEach(function (videoId) {

                if (videoCount >= maxVideos) return;
                let slide = `
        <div class="swiper-slide">
            <div class="Yt_video">
            
      <iframe width="560" height="315" src="${videoId.yt_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            </div>
        </div>`;
                document.querySelector(".mySwiper_2 .swiper-wrapper").insertAdjacentHTML('beforeend', slide);
                videoCount++; // 增加計數
            });


        })
        .catch(error => {
            console.error('無法取得Youtube的資料:', error);
        });

    var swiper_2 = new Swiper(".mySwiper_2", {
        spaceBetween: 10,
        slidesPerView: 3,
        centeredSlides: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        },
    });
});


axios.get("http://localhost:8080/schInfo/YtAndBlog")

        .then(response => {
            const infoData = response.data; // 獲取資料
            console.log(response.data);

            // const maxVideos = 6;
            // let videoCount = 0;

            infoData.forEach(function (blog) {

                // if (videoCount >= maxVideos) return;
                let blogCard = `
                <div class="col-lg-12 col-md-12 col-sm-12 my-3">
                  <a href="${blog.blog_url}" target="_blank" class="text-decoration-none">
                    <div class="card custom-card flex-row flex-wrap">
                      <!-- 左邊的圖片 -->
                      <div class="col-lg-4 col-md-4 col-sm-12">
                        <img
                          src="${blog.blog_Img}"
                          class="custom-img"
                          alt="Card image"
                        />
                      </div>
              
                      <!-- 右邊的文字內容 -->
                      <div class="col-lg-8 col-md-8 col-sm-12 custom-body">
                           
                        <div class="d-flex justify-content-end align-items-center mb-2">
                       
                            <h6 class="p-0 m-0">${blog.blog_author}</h6>
                            <p class="date p-0 my-0 ms-3">${blog.blog_year_month}</p>
                          
                        </div>
                         <h4 class="card-title fw-bolder">${blog.blog_title}</h4>
                     
                        <hr />
                        <p class="card-text">
                          ${blog.blog_paragh}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              `;
              ;document.querySelector("#blogbox").insertAdjacentHTML('beforeend', blogCard);
                // videoCount++; // 增加計數
            });


        })
        .catch(error => {
            console.error('無法取得Youtube的資料:', error);
        });

document.querySelector('#SchcardBox').addEventListener('click', function (e) {
    if (e.target && e.target.id === 'likeBtn') {
        e.target.classList.toggle('bi-heart');
        e.target.classList.toggle('bi-heart-fill');
    }
});

const itinerarySelect = document.querySelector('#itinerarySelect');
const daySelectContainer = document.querySelector('#daySelectContainer');

itinerarySelect.addEventListener('change', function () {
    if (itinerarySelect.value) {
        daySelectContainer.style.display = 'block';
    } else {
        daySelectContainer.style.display = 'none';
    }
});

const exampleModal = document.querySelector('#exampleModal');
exampleModal.addEventListener('hide.bs.modal', function () {
    daySelectContainer.style.display = 'none';
    itinerarySelect.value = '';
    document.querySelector('#daySelect').value = '';
});