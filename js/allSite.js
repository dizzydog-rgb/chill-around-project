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
    // 寫判斷式 如果有參數執行生成相對應的內容
    if(selectSiteCity && selectTagId) {
        fetchAttractions(selectSiteCity, selectTagId);
    }else{
    // 如果沒有城市和標籤，顯示隨機的景點
    showRandomAttractions();
    }
});

function fetchAttractionData(city,tag){
    axios.get(`http://localhost:8080/site/searchsite/search`,{
        params: {
            site_city: city,
            tag_id: tag
        }
    })
    .then(response =>{
        const attractions = response.data;
        const sitecardBox = document.getElementById('sitecardBox');
        sitecardBox.innerHTML = ''; // 清空現有的卡片
        
        if(attractions.length === 0){
            sitecardBox.innerHTML = '<p>沒有符合條件的景點。</p>';
        }else{
            attractions.forEach(attraction => {
                createCard(attraction);
            });
        }
    })
}

// 在 DOM 內容加載完成時調用隨機函數
// document.addEventListener('DOMContentLoaded', () => {
//     showRandomAttractions(); // 顯示隨機的景點
// });

// 根據網址選擇核取方塊
document.addEventListener('DOMContentLoaded', function() {
    const cityCheckboxes = document.querySelectorAll('.cityCheckbox');
    const tagCheckboxes = document.querySelectorAll('.tagCheckbox');

    // 獲取 URL 中的查詢參數
    const urlParams = new URLSearchParams(window.location.search);
    const siteCity = urlParams.get('site_city');
    const tagId = urlParams.get('tag_id');
    // const filters = urlParams.getAll('filter[]'); // 獲取所有篩選參數

    // 根據 URL 中的參數設置核取方塊的狀態
    cityCheckboxes.forEach(checkbox=>{
        checkbox.checked = (siteCity === checkbox.value); // 設置核取方塊狀態
    })
    tagCheckboxes.forEach(checkbox => {
        checkbox.checked = (tagId === checkbox.value);
    });
   
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
    console.log(sitecardBox);

    // 用 onclick 導向到詳細資訊頁面
    siteCard.onclick = function() {
        window.location.href = `/chill-around-project/pages/siteInfo.html?id=${attraction.site_id}`;
    };
    
    sitecardBox.appendChild(siteCard);
}
// 導到相對應的景點詳細資訊頁
function gotoSiteInfo(){
    const id = new URLSearchParams(window.location.search).get('id');
    console.log(id);
    window.location.href = `/chill-around-project/pages/siteInfo.html?id=${id}`;
}
// 目前點加入行程按鈕沒反應
 // document.addEventListener('DOMContentLoaded', () => {
    //     // 獲取按鈕並綁定事件
    //     const addButton = document.querySelector('.addBtn');
    //     addButton.onclick = (event) => {
    //         event.stopPropagation(); // 阻止事件向上冒泡，這樣不會觸發卡片的點擊事件 
            
    
    // };
    // });



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