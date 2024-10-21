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

// 在 DOM 內容加載完成時調用隨機函數
document.addEventListener('DOMContentLoaded', () => {
    showRandomAttractions(); // 顯示隨機的景點
});


// 獲取地區的景點資料
// const siteData = {}; // 用於儲存獲取的景點資料
// function fetchAttractionData(cityName) {
//     return axios.get(`http://localhost:8080/site/allsite/${cityName}`) // 注意確保後端可接受的 URL 和查詢參數
//         .then(response => {
//             console.log("取得資料"+response.data);
//             console.log(response.data);
//             // for(index in response.data ){
                
//             // }
//             siteData[cityName] = response.data; // 將資料儲存到 siteData 中
//         })
//         .catch(error => {
//             console.error(`Error fetching data for ${cityName}:`, error);
//         });
// }
// 綁定點擊事件
// document.addEventListener('DOMContentLoaded', () => {
//     const checkboxes = document.querySelectorAll('.form-check-input');
//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('click', updateCards);
//         // console.log(checkbox); // 確認所有核取方塊都被選到
//     });
    
// });
// 更新卡片根據選擇的地區和標籤
// 依照使用者選取內容呈現卡片
function updateCards() {
    const selectedRegions = Array.from(document.querySelectorAll('.cityCheckbox:checked')).map(checkbox => checkbox.value).join(',');
    const selectedTags = Array.from(document.querySelectorAll('.tagCheckbox:checked')).map(checkbox => checkbox.value).join(',');
    // const sitecardBox = document.getElementById('sitecardBox');
    // sitecardBox.innerHTML = ''; // 清空已有的卡片
    if(!selectedRegions && !selectedTags){
        // const sitecardBox = document.getElementById('sitecardBox');
        // sitecardBox.innerHTML = ''; // 清空目前顯示的卡片
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

// 綁定事件
document.querySelectorAll('.cityCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});
document.querySelectorAll('.tagCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});

// 更新卡片根據選中的地區
// function updateCards() {
//     const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
//     const cardContainer = document.getElementById('sitecardBox');
//     cardContainer.innerHTML = ''; // 清空已有的卡片
    
//     const selectedCities = Array.from(checkboxes).map(checkbox => checkbox.value);
//     console.log("選到的城市"+selectedCities);

//     const promises = selectedCities.map(cityName => fetchAttractionData(cityName)); // 獲取每個選中的城市的景點資料
//     console.log(promises);
    
//     Promise.all(promises).then(() => {
//         // 獲取完資料後，根據選擇的城市產生卡片
//         selectedCities.forEach(city => {
//             console.log("看資料"+city);
            
//             const attractions = siteData[city];
//             attractions.forEach(attraction => {
//                 createCard(attraction);
//             });
//         });
//     });
// }
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
                        <p class="card-subtitle">${attraction.site_city}</p>
                    </div>
                    <div class="btnOverlay">
                        <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            加入行程
                        </button>
                    </div>
                </div>`;
    sitecardBox.appendChild(siteCard);
}



// // 獲取台北的景點資料
// axios.get(`http://localhost:8080/site/allsite/${cityName}`)
//     .then(response => {
//         console.log(response.data);
        
        // const attractionsContainer = document.getElementById('attractions');
        // attractionsContainer.innerHTML = ''; // 清空已有的結果
        
        // response.data.forEach(attraction => {
        //     const attractionElement = document.createElement('div');
        //     attractionElement.innerText = attraction.name; // 假設每個景點都有 'name' 屬性
        //     attractionElement.className = 'attraction-item';
        //     attractionElement.onclick = () => createCard(attraction); // 點擊時創建卡片
        //     attractionsContainer.appendChild(attractionElement);
        // });
    // })
    // .catch(error => {
    //     console.error('Error fetching attractions:', error);
    // });