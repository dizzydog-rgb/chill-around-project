
$(document).ready(function () {

    const topPageData = [
        { title: "景點名稱1", location: "地點1", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },

    ];

    $.each(topPageData, function (index, data) {
        //  console.log(data.image);
        let topPage =
            `<div class="swiper-slide">
        <div id="siteCard" class="TopCard card bg-primary ">
            <div class="TopcardImage">
                <img src="${data.image}" alt="">
            </div>
            <div class="TopcardOverlay">
                <h5 class="card-title ">${data.title}</h5>
                <p class="card-subtitle">${data.location}</p>
            </div>
           
        </div>
    </div>`;
        $(".mySwiper_1 .swiper-wrapper").append(topPage);
    })

    // 初始化 Swiper 在內容加載後


    var swiper = new Swiper(".mySwiper_1", {
        spaceBetween: 0, // 卡片之間的間距
        slidesPerView: 4, // 同時顯示3張卡片
        centeredSlides: false, // 卡片不居中顯示
        pagination: {
            el: ".swiper-pagination_1",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next_1",
            prevEl: ".swiper-button-prev_1",
        },
        autoplay: {
            delay: 5000, // 自動播放延遲
            disableOnInteraction: false, // 使用者互動後繼續播放

        },
        breakpoints: {
            // 當視窗寬度為 320px 或更大
            320: {
                slidesPerView: 1, // 在手機顯示1張卡片
                spaceBetween: 0, // 卡片之間的間距變小
            },
            // 當視窗寬度為 768px 或更大
            768: {
                slidesPerView: 3, // 在平板顯示2張卡片
                spaceBetween: 0, // 卡片之間的間距
            },
            // 當視窗寬度為 1024px 或更大
            1024: {
                slidesPerView: 4, // 在桌機顯示3張卡片
                spaceBetween: 0, // 卡片之間的間距
            },
        },

    });





    // 景點卡片生成
    const sitecardData = [
        { title: "景點名稱1", location: "地點1", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        // 添加更多卡片資料
    ];
    $.each(sitecardData, function (index, data) {
        //  console.log(data.image);
        let siteCard = `<div class="col-md-3 p-0 m-0">
        <div id="siteCard" class="SchCard  card bg-primary">
            <div class="SchcardImage">
                <img src="${data.image}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${data.title}</h5>
                <p class="card-subtitle">${data.location}</p>
            </div>
            
            <div class="btnOverlay">
                <a id="likeBtn" class="bi bi-heart""></a>
                </a>
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
            </div>
        </div>
    </div>`;
        $("#SchcardBox").append(siteCard);
    })


    //like click
    $(document).on('click', '#likeBtn', function () {
        $(this).toggleClass('bi-heart bi-heart-fill');
    });

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

    const videoData = [
        "VIDEO_ID_1",
        "VIDEO_ID_2",
        "VIDEO_ID_3",
        "VIDEO_ID_4",
        "VIDEO_ID_5",
        "VIDEO_ID_6"
    ];

    $.each(videoData, function (index, videoId) {
        const slide = `
            <div class="swiper-slide">
                <div class="Yt_video">
                    <iframe class="youtube-iframe" src="https://www.youtube.com/embed/${videoId}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>`;
        $(".mySwiper_2 .swiper-wrapper").append(slide);
    });

    var swiper_2 = new Swiper(".mySwiper_2", {
        spaceBetween: 10, // 卡片之間的間距
        slidesPerView: 3, // 同時顯示3張卡片
        centeredSlides: false, // 卡片不居中顯示
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 5000, // 自動播放延遲
            disableOnInteraction: false, // 使用者互動後繼續播放
        },
        breakpoints: {
            // 當視窗寬度為 320px 或更大
            320: {
                slidesPerView: 1, // 在手機顯示1張卡片
                spaceBetween: 0, // 卡片之間的間距變小
            },
            // 當視窗寬度為 768px 或更大
            768: {
                slidesPerView: 3, // 在平板顯示2張卡片
                spaceBetween: 10, // 卡片之間的間距
            },
            // 當視窗寬度為 1024px 或更大
            1024: {
                slidesPerView: 3, // 在桌機顯示3張卡片
                spaceBetween: 10, // 卡片之間的間距
            },
        },
    });
})
