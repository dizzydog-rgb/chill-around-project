import axios from 'axios';

// // 寫這段是為了要讓我在5173的網址輸入對應的id可以撈到對應的資料
// const params = new URLSearchParams(window.location.search);
// // http://localhost:5173/chill-around-project/pages/siteInfo.html?cityName=Taipei
// console.log( '讀取'+ params ); //讀取cityName=Taipei
// const cityName = params.get('cityName'); // 假設 URL 包含 ?cityName=Taipei
// console.log('cityName:'+ cityName); //cityName:Taipei

// 生成隨機的景點卡片
function showRandomAttractions() {
    return axios.get(`http://localhost:8080/site/allsite/all/randomCity`) // 注意確保後端可接受的 URL 和查詢參數
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
// 在DOM加載完成後讀網址
document.addEventListener("DOMContentLoaded",()=>{
    const urlParams = new URLSearchParams(window.location.search);
    
    const selectSiteCity = urlParams.get('site_city');
    const selectTagId = urlParams.get('tag_id');

    const cityCheckboxes = document.querySelectorAll('.cityCheckbox');
    const tagCheckboxes = document.querySelectorAll('.tagCheckbox');
    
    

    // 寫判斷式 如果有參數執行生成相對應的內容 根據 URL 中的參數設置核取方塊的狀態 並生成卡片
    if(selectSiteCity && selectTagId) {
        // 根據 URL 中的參數設置核取方塊的狀態
        cityCheckboxes.forEach(checkbox=>{
            checkbox.checked = (selectSiteCity === checkbox.value); // 設置核取方塊狀態
        })
        tagCheckboxes.forEach(checkbox => {
            checkbox.checked = (selectTagId === checkbox.value);
        });
        updateCards();
        // fetchAttractions(selectSiteCity, selectTagId);
    }else{
        // 如果沒有城市和標籤，顯示隨機的景點
        showRandomAttractions();
    }
});

// 依照使用者選取內容呈現卡片
function updateCards() {
    const selectedRegions = Array.from(document.querySelectorAll('.cityCheckbox:checked')).map(checkbox => checkbox.value).join(',');
    const selectedTags = Array.from(document.querySelectorAll('.tagCheckbox:checked')).map(checkbox => checkbox.value).join(',');
    console.log(`Selected regions: ${selectedRegions}, selected tags: ${selectedTags}`); // 確認選��的地��和標��
    if(!selectedRegions && !selectedTags){
       
        document.addEventListener('DOMContentLoaded', () => {
            showRandomAttractions(); // 顯示隨機的景點
        });
    }else{
        axios.get('http://localhost:8080/site/allsite/select', {
            params: {
                site_city: selectedRegions, // 這裡要對應資料庫的命名
                tag_id: selectedTags
            }
        })
        .then(response => {
            const attractions = response.data;
            const sitecardBox = document.getElementById('sitecardBox');
            sitecardBox.innerHTML = ''; // 清空目前顯示的卡片
            
            if (attractions.length === 0) {
                sitecardBox.innerHTML = '<p>沒有符合條件的景點。</p>';
            }
    
            attractions.forEach(attraction => {
                createCard(attraction);
            });
        })
        .catch(error => {
            console.error('Error fetching attractions:', error);
            alert('無法獲取資料，請稍後再試。');
        });
    }
    
}

 // 創建卡片
function createCard(attraction) {
    console.log(attraction); //確認有叫出點擊的卡片資訊
    
    
    const sitecardBox = document.getElementById('sitecardBox');
    const siteCard = document.createElement("div");
    siteCard.className = "col-md-4 p-0 m-0";
    siteCard.innerHTML = `
                <div id="siteCard" class="allCard card bg-primary m-0">
                    <div class="cardImage">
                        <img src="../assets/images/searchSite/${attraction.photo_one}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title">${attraction.site_name}</h5>
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
}

// 綁定事件
document.querySelectorAll('.cityCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});
document.querySelectorAll('.tagCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});


// 目前點加入行程按鈕沒反應
 // document.addEventListener('DOMContentLoaded', () => {
    //     // 獲取按鈕並綁定事件
    //     const addButton = document.querySelector('.addBtn');
    //     addButton.onclick = (event) => {
    //         event.stopPropagation(); // 阻止事件向上冒泡，這樣不會觸發卡片的點擊事件 
            
    
    // };
    // });



