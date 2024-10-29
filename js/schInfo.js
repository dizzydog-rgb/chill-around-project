import axios from 'axios';


document.addEventListener('DOMContentLoaded', function () {

    //這是頁首的輪播卡片
    // axios.get('http://localhost:8080/schInfo/getsch')
    //     .then(response => {
    //         const dataSite = response.data[0]; // 獲取資料
    //         console.log("獲取到的資料:", dataSite[0]);

    //         // 設定顯示卡片的最大數量
    //         const maxCards = 10;
    //         let cardCount = 0;

    //         // 過濾出符合條件的景點
    //         const filteredSites = dataSite.filter(data => data.sch_day === 1 && data.sch_order === 1);
    //         console.log("過濾後的景點:", filteredSites);


    //         // 隨機排列 filteredSites 陣列
    //         const shuffledSites = filteredSites.sort(() => 0.5 - Math.random());

    //         // 使用物件來儲存已添加的項目，以避免重複
    //         const addedItems = {};

    //         shuffledSites.forEach(function (data) {
    //             if (cardCount >= maxCards) return; // 當顯示的卡片數達到 maxCards 時停止

    //             // 使用 site_name 作為唯一標識
    //             const uniqueKey = `${data.sch_id}-${data.sch_name}`; // 使用 sch_id 和 site_name 組合成唯一鍵

    //             // 格式化 edit_date
    //             const editDate = new Date(data.edit_date);
    //             const formattedEditDate = `${editDate.getFullYear()}-${String(editDate.getMonth() + 1).padStart(2, '0')}-${String(editDate.getDate()).padStart(2, '0')}`;


    //             // 檢查是否已經添加過該項目
    //             if (!addedItems[uniqueKey]) {
    //                 // 創建卡片 HTML
    //                 let topPage = `

    //                     <div class="swiper-slide">
    //                <div id="siteCard" class="TopCard card bg-primary ">
    //                    <div class="TopcardImage">
    //                        <img src="../assets/images/searchSite/${data.photo_one}" alt="">
    //                    </div>
    //                    <div class="TopcardOverlay">
    //                        <h5 class="card-title ">${data.sch_name}</h5>
    //                        <p class="card-subtitle">${formattedEditDate}</p>
    //                    </div>
    //                </div>
    //            </div>`;

    //                 // 將卡片插入到 DOM
    //                 document.querySelector(".mySwiper_1 .swiper-wrapper").insertAdjacentHTML('beforeend', topPage);

    //                 // 將該項目添加到 addedItems 物件中，以避免重複
    //                 addedItems[uniqueKey] = true;
    //                 console.log(`添加名稱: ${data.site_name}, ID: ${data.sch_id}`);
    //                 cardCount++; // 增加計數
    //             } else {
    //                 console.log(`重複名稱或 ID: ${data.site_name} (${data.sch_id})`);
    //             }
    //         });

    //         console.log("最終添加的項目:", Object.keys(addedItems));
    //     })
    //     .catch(error => {
    //         console.error('無法取得卡片的資料:', error);
    //     });


    //獲取行程資料 without like
    axios.get('http://localhost:8080/buildPlan/planList')
        .then(response => {
            const dataSite = response.data; // 獲取資料
            console.log("獲取到的資料:", dataSite);

            // 設定顯示卡片的最大數量
            const maxCards = 10;
            let cardCount = 0;

            // 隨機排列 filteredSites 陣列
            const shuffledSites = dataSite.sort(() => 0.5 - Math.random());

            shuffledSites.forEach(function (data) {
                if (cardCount >= maxCards) return; // 當顯示的卡片數達到 maxCards 時停止
                let startDate = data.edit_date.slice(0, 10);
                // let endDate = data.end_date.slice(5, 10);

                // // 格式化 edit_date
                // const editDate = new Date(data.edit_date);
                // const formattedEditDate = `${editDate.getFullYear()}-${String(editDate.getMonth() + 1).padStart(2, '0')}-${String(editDate.getDate()).padStart(2, '0')}`;

                // 創建卡片 HTML
                let topPage = `
                    <div class="swiper-slide">
                        <div id="siteCard" class="TopCard card bg-primary" data-sch-id="${data.sch_id}">
                            <div class="TopcardImage">
                                <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                            </div>
                            <div class="TopcardOverlay">
                                <h5 class="card-title ">${data.sch_name}</h5>
                                <p class="card-subtitle">${startDate} </p>
                            </div>
                        </div>
                    </div>`;

                // 將卡片插入到 DOM
                document.querySelector(".mySwiper_1 .swiper-wrapper").insertAdjacentHTML('beforeend', topPage);
                cardCount++; // 增加計數

            });

            // 為每個卡片添加點擊事件
            let cardItems = document.querySelectorAll(".TopCard");
            cardItems.forEach((card) => {
                card.addEventListener("click", (event) => {
                    const schId = event.currentTarget.getAttribute('data-sch-id');

                    // 存儲 sch_id 到 localStorage
                    localStorage.setItem('selectedSchId', schId);
                    console.log(schId);



                    // 跳轉到新頁面
                    window.location.href = "schCom.html";
                });
            });

        })
        .catch(error => {
            console.error('無法取得卡片的資料:', error);
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

    document.getElementById("searchButton").addEventListener("click", function(){
        // 取城市和標籤選項
        const selectedCity = document.getElementById('citySelect').value;
        const selectedTag = document.getElementById('tagSelect').value;
        
        console.log(selectedCity); // 確認有選到
        console.log(selectedTag);
        console.log("---------------");
    
        // // 將選項儲存到 localStorage
        // localStorage.setItem('selectedCity', selectedCity);
        // localStorage.setItem('selectedTag', selectedTag);
    
        // // 跳轉到 schMore.html
        // window.location.href = "/chill-around-project/pages/schMore.html";
        window.location.href = `/chill-around-project/pages/schMore.html?site_city=${encodeURIComponent(selectedCity)}&tag_id=${encodeURIComponent(selectedTag)}`;
    });
    

    //獲取行程資料 with like
    axios.get('http://localhost:8080/buildPlan/planList')
        .then(response => {
            const dataSite = response.data; // 獲取資料
            console.log("獲取到的資料:", dataSite);

            const maxCards = 8;
            let cardCount = 0;

            const shuffledSites = dataSite.sort(() => 0.5 - Math.random());

            shuffledSites.forEach(function (data) {
                if (cardCount >= maxCards) return;

                let startDate = data.edit_date.slice(0, 10);
                let endDate = data.end_date.slice(5, 10);

                let SchCard = `
                <div class="col-md-3 p-0 m-0">
                    <div id="SchCard" class="SchCard card bg-primary" data-sch-id="${data.sch_id}">
                        <div class="SchcardImage">
                            <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                        </div>
                        <div class="cardOverlay">
                            <h5 class="card-title">${data.sch_name}</h5>
                            <p class="card-subtitle">${startDate}</p>
                        </div>
                        <div class="btnOverlay">
                            <a id="likeBtn" class="bi bi-heart" data-sch-id="${data.sch_id}"></a>
                        </div>
                    </div>
                </div>`;

                document.querySelector("#SchcardBox").insertAdjacentHTML('beforeend', SchCard);
                cardCount++;
            });

            // 點擊卡片時，將 sch_id 儲存在 localStorage
            let cardItems = document.querySelectorAll(".SchCard");
            cardItems.forEach((sch) => {
                sch.addEventListener("click", (event) => {
                    const schId = event.currentTarget.getAttribute('data-sch-id');
                    localStorage.setItem('selectedSchId', schId); // 儲存 sch_id 到 localStorage
                    console.log(schId);


                    // 跳轉到 schCom.html
                    window.location.href = "schCom.html";
                });
            });

            // 點擊 "likeBtn" 時，切換樣式並發送資料到後端
            document.querySelectorAll('.bi-heart').forEach((likeBtn) => {
                likeBtn.addEventListener('click', function (e) {
                    e.stopPropagation(); // 防止冒泡影響到其他點擊事件

                    e.target.classList.toggle('bi-heart');
                    e.target.classList.toggle('bi-heart-fill');

                    // 取得卡片的 sch_id
                    const schId = e.target.getAttribute('data-sch-id');

                    // 模擬要 post 的資料，包含 sch_id 和其他相關資料
                    const postData = {
                        // email_id: userId, // 會員編號 (可替換為實際資料)
                        sch_id: schId     // 景點 ID
                    };

                    // 使用 axios 進行 POST 請求，將資料發送到後端
                    axios.post('http://localhost:8080/schInfo/getToLike', postData)
                        .then(response => {
                            console.log('資料已成功發送:', response.data);
                            alert("加入成功")
                        })
                        .catch(error => {
                            alert("加入失敗")
                            console.error('無法發送資料:', error);
                        });
                });
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

            // 渲染卡片
            renderSiteCards(dataSite, 4); // 限制顯示4張卡片

            // 綁定點擊事件
            bindCardClickEvents();
            bindLoadScheduleEvents();
        })
        .catch(error => {
            console.error('無法取得卡片的資料:', error);
        });

    // 渲染卡片
    function renderSiteCards(dataSite, maxCards) {
        let cardCount = 0;
        dataSite.forEach(function (data) {
            if (cardCount >= maxCards) return;
            let siteCard = `
            <div class="col-md-3 p-0 m-0">
                <div class="SiteCard card bg-primary" data-site-id="${data.site_id}">
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
    }

    // 綁定卡片點擊事件
    function bindCardClickEvents() {
        const siteCards = document.querySelectorAll('.SiteCard');
        siteCards.forEach(card => {
            card.onclick = function (event) {
                // 阻止按鈕點擊時觸發卡片事件
                if (event.target.tagName === 'BUTTON') return;

                const siteId = this.getAttribute('data-site-id');
                window.location.href = `/chill-around-project/pages/siteInfo.html?id=${siteId}`;
            };
        });
    }

    // 綁定 "加入行程" 按鈕點擊事件
    function bindLoadScheduleEvents() {
        let selectedSchID;
        let selectedSiteData;

        const loadScheduleButtons = document.querySelectorAll('.loadSchedule');
        loadScheduleButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                event.stopPropagation(); // 阻止事件冒泡，避免卡片點擊事件觸發

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

                    showModal();
                } catch (error) {
                    console.error('獲取行程資料失敗', error);
                }
            });
        });

        // 行程選擇變更事件
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

        // 保存行程事件
        document.querySelector('.Save').addEventListener('click', async () => {
            const dayNumber = Number(document.getElementById('daySelect').value);

            const dataToSave = {
                sch_id: selectedSchID,
                sch_day: dayNumber,
                sch_order: "1",  // 將順序設為 1
                sch_spot: selectedSiteData.site_name,
                sch_info: selectedSiteData.site_info,
                sch_img: selectedSiteData.site_img
            };

            try {
                await axios.post('http://localhost:8080/schInfo/getspot/add', dataToSave);
                alert('行程保存成功');
                console.log('Data to Save:', dataToSave);
                // 使用 jQuery 來隱藏模態框
                $('#exampleModal').modal('hide');
            } catch (error) {
                alert('保存行程失敗');
                console.error('保存行程失敗', error);
            }
        });
    }

    // 顯示 modal
    function showModal() {
        const modal = document.getElementById('exampleModal');
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }



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
                ; document.querySelector("#blogbox").insertAdjacentHTML('beforeend', blogCard);
                // videoCount++; // 增加計數
            });


        })
        .catch(error => {
            console.error('無法取得Youtube的資料:', error);
        });




});
