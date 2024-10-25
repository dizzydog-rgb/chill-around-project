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

// 上方三張大圖
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
 // 創建景點卡片
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
// 生成美食卡片
function createFoodCard(attraction) {
    console.log("美食卡片："+attraction); //確認有叫出的卡片資訊
    
    const foodCardBox = document.getElementById('foodcardBox');
    const foodCard = document.createElement("div");
    foodCard.classList.add("col-md-3", "p-0", "m-0");

    foodCard.innerHTML = `
                <div id="foodCard" class="allCard  card bg-primary">
            <div id="foodImage" class="cardImage">
                <img src="${attraction.photo_two}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${attraction.store_name}</h5>
                <p class="card-subtitle">${attraction.short_city}</p>
            </div>
            <div class="btnOverlay">
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
            </div>
        </div>`;
    console.log(foodCardBox);
    const placeId = attraction.store_id;
    console.log("地點ＩＤ："+placeId);
    
    //用 onclick 導向到詳細資訊頁面
    foodCard.onclick = function (){
        console.log("地點ＩＤ："+placeId);
        localStorage.setItem('selectedPlaceId', placeId);

        // 跳轉到地圖頁面
         window.location.href = '/chill-around-project/pages/foodMap.html?place_id=' + placeId;
    }
    
    foodCardBox.appendChild(foodCard);
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
// 生成隨機的美食店家卡片
function showFoodStore() {
    return axios.get(`http://localhost:8080/site/allfood`) // 注意確保後端可接受的 URL 和查詢參數
        .then(response => {
            console.log("取得資料"+response.data);
            console.log(response.data);
            const randomFood = response.data;
            randomFood.forEach(attraction => {
                createFoodCard(attraction);
            });
        })
        .catch(error => {
            console.error('Error fetching random attractions:', error);
        });
   
}

//  取至行程推薦頁
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

// 在 DOM 內容加載完成時調用隨機函數
document.addEventListener('DOMContentLoaded', () => {
    showRandomAttractions(); // 顯示隨機的景點
    showFoodStore();
});


