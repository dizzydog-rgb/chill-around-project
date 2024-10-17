import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-Maamm-dT.js";/* empty css            */$(document).ready(function(){const s=[{title:"景點名稱1",location:"地點1",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"}];$.each(s,function(a,e){let i=`<div class="swiper-slide">
        <div id="siteCard" class="TopCard card bg-primary ">
            <div class="TopcardImage">
                <img src="${e.image}" alt="">
            </div>
            <div class="TopcardOverlay">
                <h5 class="card-title ">${e.title}</h5>
                <p class="card-subtitle">${e.location}</p>
            </div>
           
        </div>
    </div>`;$(".mySwiper_1 .swiper-wrapper").append(i)}),new Swiper(".mySwiper_1",{spaceBetween:0,slidesPerView:4,centeredSlides:!1,pagination:{el:".swiper-pagination_1",clickable:!0},navigation:{nextEl:".swiper-button-next_1",prevEl:".swiper-button-prev_1"},autoplay:{delay:5e3,disableOnInteraction:!1},breakpoints:{320:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:3,spaceBetween:0},1024:{slidesPerView:4,spaceBetween:0}}});const t=[{title:"景點名稱1",location:"地點1",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"}];$.each(t,function(a,e){let i=`<div class="col-md-3 p-0 m-0">
        <div id="siteCard" class="SchCard  card bg-primary">
            <div class="SchcardImage">
                <img src="${e.image}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${e.title}</h5>
                <p class="card-subtitle">${e.location}</p>
            </div>
            
            <div class="btnOverlay">
                <a id="likeBtn" class="bi bi-heart""></a>
                </a>
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
            </div>
        </div>
    </div>`;$("#SchcardBox").append(i)}),$(document).on("click","#likeBtn",function(){$(this).toggleClass("bi-heart bi-heart-fill")}),$("#itinerarySelect").change(function(){$(this).val()?$("#daySelectContainer").show():$("#daySelectContainer").hide()}),$("#exampleModal").on("hide.bs.modal",function(){$("#daySelectContainer").hide(),$("#itinerarySelect").val(""),$("#daySelect").val("")});const c=["VIDEO_ID_1","VIDEO_ID_2","VIDEO_ID_3","VIDEO_ID_4","VIDEO_ID_5","VIDEO_ID_6"];$.each(c,function(a,e){const i=`
            <div class="swiper-slide">
                <div class="Yt_video">
                    <iframe class="youtube-iframe" src="https://www.youtube.com/embed/${e}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>`;$(".mySwiper_2 .swiper-wrapper").append(i)}),new Swiper(".mySwiper_2",{spaceBetween:10,slidesPerView:3,centeredSlides:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:5e3,disableOnInteraction:!1},breakpoints:{320:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:3,spaceBetween:10},1024:{slidesPerView:3,spaceBetween:10}}})});
