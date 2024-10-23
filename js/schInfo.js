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

//要改成行程資料
    //可以加入的景點卡片
    axios.get('http://localhost:8080/schInfo/siteinfo')
        .then(response => {
            const dataSite = response.data; // 獲取資料
            console.log(response.data);
            // 設定顯示卡片的最大數量
            const maxCards = 8;
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




//獲取景點資料
axios.get('http://localhost:8080/schInfo/siteinfo')
    .then(response => {
        const dataSite = response.data;
        console.log(response.data);

        const maxCards = 4;
        let cardCount = 0;

        dataSite.forEach(function (data) {
            if (cardCount >= maxCards) return;

            let siteCard = `
            <div class="col-md-3 p-0 m-0">
                <div id="siteCard" class="SchCard card bg-primary">
                    <div class="SchcardImage">
                        <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title">${data.site_name}</h5>
                        <p class="card-subtitle">${data.short_site_add}</p>
                    </div>
                    <div class="btnOverlay">
                        
                        <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${data.site_id}" 
                            data-site-name="${data.site_name}" 
                            data-site-add="${data.short_site_add}"
                            data-site-info="${data.site_info}"
                            data-site-img="${data.photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button>
                    </div>
                </div>
            </div>`;
            document.querySelector("#SchcardBox2").insertAdjacentHTML('beforeend', siteCard);
            cardCount++;
        });

        let selectedSchID;
        let selectedSiteData;

        const loadScheduleButtons = document.querySelectorAll('.loadSchedule');
        loadScheduleButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const siteId = button.getAttribute('data-site-id');
                const siteName = button.getAttribute('data-site-name');
                const siteAdd = button.getAttribute('data-site-add');
                const siteInfo = button.getAttribute('data-site-info');
                const siteImg = button.getAttribute('data-site-img');

                selectedSiteData = {
                    site_id: siteId,
                    site_name: siteName,
                    site_add: siteAdd,
                    site_info: siteInfo,
                    site_img: siteImg
                };

                console.log(selectedSiteData);

                try {
                    const { data } = await axios.get('http://localhost:8080/schInfo/getspot');
                    console.log('獲取的行程資料:', data);

                    const selectElement = document.getElementById('itinerarySelect');
                    selectElement.innerHTML = '<option value="" selected>請選擇行程</option>';
                    const optionsHTML = data.schedules.map(schedule => {
                        return `<option value="${schedule.sch_name}" data-schedule-id="${schedule.sch_id}" data-days="${schedule.days}">${schedule.sch_name}</option>`;
                    }).join('');
                    selectElement.innerHTML += optionsHTML;

                    const modal = document.getElementById('exampleModal');
                    modal.classList.add('show');
                    modal.style.display = 'block';
                    document.body.classList.add('modal-open');
                } catch (error) {
                    console.error('獲取行程資料失敗', error);
                }
            });
        });

        document.getElementById('itinerarySelect').addEventListener('change', () => {
            const selectedOption = document.querySelector('#itinerarySelect :checked');
            const days = Number(selectedOption.dataset.days) + 1;
            selectedSchID = selectedOption.dataset.scheduleId;

            const daySelectContainer = document.getElementById('daySelectContainer');
            const daySelectElement = document.getElementById('daySelect');
            daySelectElement.innerHTML = '';

            if (days) {
                daySelectContainer.style.display = 'block';
                console.log('選取的天數:', days);

                const dayOptionsHTML = Array.from({ length: days }, (_, i) =>
                    `<option value="${i + 1}">第 ${i + 1} 天</option>`
                ).join('');
                daySelectElement.innerHTML += dayOptionsHTML;
            } else {
                daySelectContainer.style.display = 'none';
                daySelectElement.innerHTML = '<option value="">請先選擇行程</option>';
            }
        });

        document.querySelector('.Save').addEventListener('click', async () => {
            const dayNumber = Number(document.getElementById('daySelect').value);

            const dataToSave = {
                sch_id: selectedSchID,
                sch_day: dayNumber,
                sch_order: "1",  // 將順序設為 1
                sch_spot: selectedSiteData.site_name,
                sch_info: selectedSiteData.site_info,
                sch_img:selectedSiteData.site_img
            };
              

            try {
                await axios.post('http://localhost:8080/schInfo/getspot/add', dataToSave);
                alert('行程保存成功');
                // 調試用，確認保存的數據
    console.log('Data to Save:', dataToSave);
                $('#exampleModal').modal('hide');
            } catch (error) {
                alert('保存行程失敗');
                console.error('保存行程失敗', error);
            }
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
                slidesPerView: 3,
                spaceBetween: 10,
            },
        },
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
                <a href="${blog.blog_url}" target="_blank" class=" my-3 Blog card p-0 text-decoration-none">
                  
                    <div class="custom-card row">
                      <!-- 左邊的圖片 -->
                      <div class="col-lg-4 col-md-4 col-sm-12 m-0">
                        <img
                          src="${blog.blog_Img}"
                          class="custom-img"
                        />
                      </div>
              
                      <!-- 右邊的文字內容 -->
                      <div class="col-lg-8 col-md-8 col-sm-12 card-body ">
                           <h4 class="card-title fw-bolder text-truncate p-2">${blog.blog_title}</h4>
                        <div class="d-flex justify-content-end align-items-center mt-2 card-text p-2">
                            <h6 class=" m-0">${blog.blog_author}</h6>
                            <p class="date  my-0 ms-3">${blog.blog_year_month}</p>
                        </div>
                          <hr>
                            <p class="card-text p-2">
                             ${blog.blog_paragh}
                            </p>
                         
                     
                        
                      </div>
                    </div>
                  
                </a>
              `;
              ;document.querySelector("#blogbox").insertAdjacentHTML('beforeend', blogCard);
                // videoCount++; // 增加計數
            });


        })
        .catch(error => {
            console.error('無法取得Youtube的資料:', error);
        });




});




document.querySelector('#SchcardBox').addEventListener('click', function (e) {
    if (e.target && e.target.id === 'likeBtn') {
        e.target.classList.toggle('bi-heart');
        e.target.classList.toggle('bi-heart-fill');
    }
});
