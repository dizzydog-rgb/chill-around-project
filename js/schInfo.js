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
// 使用 Axios 獲取景點資料
axios.get('http://localhost:8080/schInfo/siteinfo')
    .then(response => {
        const dataSite = response.data;
        console.log(response.data);

        const maxCards = 12;
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
                        <a id="likeBtn" class="bi bi-heart"></a>
                        <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${data.site_id}" 
                            data-site-name="${data.site_name}" 
                            data-site-add="${data.short_site_add}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button>
                    </div>
                </div>
            </div>`;
            document.querySelector("#SchcardBox").insertAdjacentHTML('beforeend', siteCard);
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

                selectedSiteData = {
                    site_id: siteId,
                    site_name: siteName,
                    site_add: siteAdd
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
                sch_spot: selectedSiteData.site_name
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

document.querySelector('#SchcardBox').addEventListener('click', function (e) {
    if (e.target && e.target.id === 'likeBtn') {
        e.target.classList.toggle('bi-heart');
        e.target.classList.toggle('bi-heart-fill');
    }
});

// const itinerarySelect = document.querySelector('#itinerarySelect');
// const daySelectContainer = document.querySelector('#daySelectContainer');

// itinerarySelect.addEventListener('change', function () {
//     if (itinerarySelect.value) {
//         daySelectContainer.style.display = 'block';
//     } else {
//         daySelectContainer.style.display = 'none';
//     }
// });

// const exampleModal = document.querySelector('#exampleModal');
// exampleModal.addEventListener('hide.bs.modal', function () {
//     daySelectContainer.style.display = 'none';
//     itinerarySelect.value = '';
//     document.querySelector('#daySelect').value = '';
// });



//Modal
// document.addEventListener('DOMContentLoaded', () => {
//     let selectedSchID;
//     let selectedSpotNames = [];S

//     // 點擊所有 "加入行程" 按鈕後發送請求獲取行程資料
//     document.querySelectorAll('.loadSchedule').forEach(button => {
//         console.log('123123');
//         button.addEventListener('click', async () => {
//             console.log('123123');
            
//             selectedSpotNames = []; // 清空之前選擇的景點名稱
//             try {
//                 const { data } = await axios.get('http://localhost:8080/schInfo/getspot');
//                 console.log(data);

//                 const selectElement = document.getElementById('itinerarySelect');
//                 selectElement.innerHTML = '<option value="" selected>請選擇行程</option>'; // 清空現有選項並設置預設選項

//                 // 將行程名稱動態添加到選項中
//                 const optionsHTML = data.schedules.map(schedule =>
//                     `<option value="${schedule.sch_name}" data-schedule-id="${schedule.sch_id}" data-days="${schedule.days}">${schedule.sch_name}</option>`
//                 ).join(''); // 將所有選項合併成一個字符串

//                 selectElement.innerHTML += optionsHTML; // 更新選項

//                 // 獲取景點資料
//                 selectedSpotNames = data.sites.map(site => site.site_name);
//                 console.log(selectedSpotNames);
//                 $('#exampleModal').modal('show'); // 顯示 modal

//             } catch (error) {
//                 console.error('獲取行程資料失敗', error);
//             }
//         });
//     });

//     // 當選擇行程後生成對應的天數選項
//     document.getElementById('itinerarySelect').addEventListener('change', () => {
//         const selectedOption = document.querySelector('#itinerarySelect :checked');
//         const days = Number(selectedOption.dataset.days) + 1; // 取得行程的天數
//         selectedSchID = selectedOption.dataset.scheduleId; // 獲取當前選擇的行程 ID

//         const daySelectContainer = document.getElementById('daySelectContainer');
//         const daySelectElement = document.getElementById('daySelect');

//         daySelectElement.innerHTML = ''; // 清空天數選項

//         if (days) {
//             daySelectContainer.style.display = 'block';
//             console.log('選取的天數:', days);

//             // 根據天數生成選項
//             const dayOptionsHTML = Array.from({ length: days }, (_, i) =>
//                 `<option value="${i + 1}">第 ${i + 1} 天</option>`
//             ).join(''); // 將所有天數選項合併成一個字符串

//             daySelectElement.innerHTML += dayOptionsHTML; // 更新選項
//         } else {
//             daySelectContainer.style.display = 'none';
//             daySelectElement.innerHTML = '<option value="">請先選擇行程</option>';
//         }
//     });

//     // 當點擊 "保存選擇" 時，將選取的行程和天數與景點資料一起新增到資料庫
//     document.querySelector('.Save').addEventListener('click', async () => {
//         const dayNumber = Number(document.getElementById('daySelect').value); // 取得選擇的天數

//         // 構建要發送到後端的資料
//         const dataToSave = {
//             sch_id: selectedSchID,
//             sch_day: dayNumber,
//             sch_order: "3", // 假設固定插入到第三順位
//             sch_spot: selectedSpotNames // 將景點名稱陣列發送
//         };

//         try {
//             await axios.post('/schedule/add', dataToSave);
//             alert('行程保存成功');
//             $('#exampleModal').modal('hide'); // 隱藏 modal
//         } catch (error) {
//             alert('保存行程失敗');
//             console.error('保存行程失敗', error);
//         }
//     });
// });
