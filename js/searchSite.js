import axios from "axios";

document.getElementById("searchButton").addEventListener("click", function(){
    // this.alert('Search');
    // 取城市和標籤選項
    const selectedCity = document.getElementById('citySelect').value;
    const selectedTag = document.getElementById('tagSelect').value;
    console.log(selectedCity); // 確認有選到
    console.log(selectedTag);
    console.log("---------------");
    window.location.href = `/chill-around-project/pages/allSite.html?site_city=${encodeURIComponent(selectedCity)}&tag_id=${encodeURIComponent(selectedTag)}`;

    // 調用 API 取得結果
//     axios.get(`http://localhost:8080/site/searchsite/search`, {
//         params: {
//             site_city: selectedCity,
//             tag_id: selectedTag
//         }
//     })
//    .then(response => {
//     console.log(response.data);
//     window.location.href = `/chill-around-project/pages/allSite.html?site_city=${encodeURIComponent(selectedCity)}&tag_id=${encodeURIComponent(selectedTag)}`;

    
//    })
//    .catch(error => {
//     console.error('Error:', error);
//    });
});

axios.get('http://localhost:8080/site/allsite')
.then(response =>{
    const data =  response.data;
    const siteData = data.filter(data => data.photo_three != '').slice(15,18)
    console.log(siteData);
    // 使用 map 提取每個點的 photo_three 屬性
    const siteImages = siteData.map(site => site.photo_three);
    // 輸出圖片陣列
    console.log(siteImages);

    const heroImage = document.getElementById('hero-image');
    heroImage.innerHTML='';

    const allImage = document.createElement("div");
    allImage.classList.add("row", "no-gutters" ,"ms-0", "me-0");
    allImage.innerHTML = `
    <div id="image1" class="col-md-4 ps-0 pe-0">
        <a href="/chill-around-project/pages/siteInfo.html?id=${siteData[0].site_id}">
            <img src="../assets/images/searchSite/${siteImages[0]}" alt="Image 1">
        </a>    
    </div>
    <div id="image2" class="col-md-4 ps-0 pe-0">
        <a href="/chill-around-project/pages/siteInfo.html?id=${siteData[1].site_id}">
            <img src="../assets/images/searchSite/${siteImages[1]}" alt="Image 2">
        </a> 
    </div>
    <div id="image3" class="col-md-4 ps-0 pe-0">
        <a href="/chill-around-project/pages/siteInfo.html?id=${siteData[2].site_id}">
            <img src="../assets/images/searchSite/${siteImages[2]}" alt="Image 3">
        </a> 
    </div>
    
    `;
    heroImage.appendChild(allImage);

})

// 引入 Axios
// const selectedCity = '指定的城市'; // 使用者選擇的城市
// const selectedTag = '指定的標籤'; // 使用者選擇的標籤

// axios.get(`/searchsite/search`, {
//   params: {
//     city: selectedCity,
//     tag: selectedTag
//   }
// })
// .then(response => {
//   // 處理返回的資料
//   console.log(response.data);
// })
// .catch(error => {
//   console.error('Error:', error);
// });


// 處理表單提交
// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // 防止默认的表单提交行为

//     // 获取选择的值
//     const selectedRegion = document.getElementById('region').value;
//     const selectedTag = document.getElementById('tag').value;

//     // 跳转到搜索结果页面并传递查询参数
//     window.location.href = `results.html?site_city=${selectedRegion}&tag_id=${selectedTag}`;
// });

 // 創建卡片


 function createCard(attraction) {
    console.log(attraction); //確認有叫出點擊的卡片資訊
    
    const sitecardBox = document.getElementById('sitecardBox');
    const siteCard = document.createElement("div");
    siteCard.classList.add("col-md-3", "p-0", "m-0");

    siteCard.innerHTML = `
                <div id="siteCard" class="allCard  card bg-primary">
            <div class="cardImage">
                <img src="../assets/images/searchSite/${attraction.photo_two}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${attraction.site_name}</h5>
                <p class="card-subtitle">${attraction.short_add}</p>
            </div>
            <div class="btnOverlay">
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
            </div>
        </div>`;
    console.log(sitecardBox);

    // 用 onclick 導向到詳細資訊頁面
    siteCard.onclick = function() {
        window.location.href = `/chill-around-project/pages/siteInfo.html?id=${attraction.site_id}`;
    };
    
    sitecardBox.appendChild(siteCard);
};

// 生成隨機的景點卡片
function showRandomAttractions() {
    return axios.get(`http://localhost:8080/site/searchSite/randomSite`) // 注意確保後端可接受的 URL 和查詢參數
        .then(response => {
            console.log("取得資料"+response.data);
            console.log(response.data);
            const randomCity = response.data;
            randomCity.forEach(attraction => {
                createCard(attraction);
            });
            // siteData[cityName] = response.data; // 將資料儲存到 siteData 中
        })
        .catch(error => {
            console.error('Error fetching random attractions:', error);
        });
   
}


// 在 DOM 內容加載完成時調用隨機函數
document.addEventListener('DOMContentLoaded', () => {
    showRandomAttractions(); // 顯示隨機的景點
});


