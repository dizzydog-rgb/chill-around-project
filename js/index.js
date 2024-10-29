import axios from 'axios';

console.log("首頁載入成功");

// 初始化 Swiper 的函數，確保內容載入後才初始化
function initSwiper() {
    var swiper = new Swiper(".mySwiperIndex", {
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 6000, // 每 10 秒切換一次
            disableOnInteraction: false,
        },
    });
}

// 輪播圖的圖片及文字
axios.get('http://localhost:8080/heroCarousel')
    .then(response => {
        const dataHero = response.data; // 獲取資料
        console.log(response.data);

        const heroContainer = document.getElementById('hero-container');
        let HeroHTML = ''; // 用來存放按鈕 HTML

        // 生成輪播圖的 HTML
        dataHero.forEach(hero => {
            HeroHTML += `
            <div class="swiper-slide">
                <div
                  class="hero-image"
                  style="
                    background-image: linear-gradient(
                        rgba(0, 0, 0, 0.5),
                        rgba(0, 0, 0, 0.5)
                      ),
                      url('../assets/images/index/${hero.carousel_Img}');
                  "
                >
                  <div class="container-fluid p-0">
                    <div class="row">
                      <div class="col-md-6 hero-text">
                        <h1>${hero.carousel_tw}</h1>
                        <p>${hero.carousel_en}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>`;
        });

        // 將內容加入 DOM
        heroContainer.innerHTML = HeroHTML;

        // 當內容載入完成後，初始化 Swiper
        initSwiper();
    })
    .catch(error => {
        console.error('無法獲取輪播圖資料:', error);
    });

// 標籤
axios.get('http://localhost:8080/herotag')
    .then(response => {
        const data = response.data; // 獲取資料
        console.log(response.data);

        const tagContainer = document.getElementById('tag-container');
        let buttonsHTML = ''; // 用來存放按鈕 HTML

        // 生成按鈕 HTML
        data.forEach(tag => {
            buttonsHTML += `
              <button type="button" class="IndexBtn btn btn-outline-primary btn-sm mx-2" 
              data-tag-id="${tag.tag_id}" >
                ${tag.tag_name}
              </button>`;
        });
        
        // 將內容加入 DOM
        tagContainer.innerHTML = buttonsHTML;
    })
    .catch(error => {
        console.error('無法獲取標籤資料:', error);
    });

    document.getElementById('tag-container').addEventListener('click', (event) => {
      if (event.target.classList.contains('IndexBtn')) {
          const tagId = event.target.getAttribute('data-tag-id');
         
          console.log(tagId);

          window.location.href = `/chill-around-project/pages/schMore.html?site_city=${encodeURIComponent}&tag_id=${encodeURIComponent(tagId)}`;

          // /chill-around-project/pages/schMore.html?site_city=Taipei&tag_id=2
          
          // // 構建目標 URL 並導向
          // window.location.href = `/chill-around-project/pages/schMore.html?site_city=${encodeURIComponent(siteCity)}&tag_id=${encodeURIComponent(tagId)}`;
      }
  });
  