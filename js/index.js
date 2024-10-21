import axios from 'axios';

console.log("載入成功");


//輪播圖的圖片及文字
axios.get('http://localhost:8080/heroCarousel')
.then(response => {
    const dataHero = response.data; // 獲取資料
    console.log(response.data);

    const heroContainer = document.getElementById('hero-container');
    let HeroHTML = ''; // 用來存放按鈕 HTML

    // 生成按鈕 HTML
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

    heroContainer.innerHTML = HeroHTML;
})
.catch(error => {
    console.error('無法獲取標籤資料:', error);
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
          <button type="button" class="IndexBtn btn btn-outline-primary btn-sm mx-2">
            ${tag.tag_name}
          </button>`;
        });

        tagContainer.innerHTML = buttonsHTML;
    })
    .catch(error => {
        console.error('無法獲取標籤資料:', error);
    });