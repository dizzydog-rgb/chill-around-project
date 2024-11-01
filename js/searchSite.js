import axios from "axios";


const emailid = localStorage.getItem("emailid");
console.log("emailid:", emailid);
// 在 DOM 內容加載完成時調用隨機函數
document.addEventListener('DOMContentLoaded', () => {
    showRandomAttractions(); // 顯示隨機的景點
    showFoodStore();
});

document.getElementById("searchButton").addEventListener("click", function(){
    // this.alert('Search');
    // 取城市和標籤選項
    const selectedCity = document.getElementById('citySelect').value;
    const selectedTag = document.getElementById('tagSelect').value;

    // 存儲到 localStorage
    // localStorage.setItem('selectedCity', selectedCity);
    // localStorage.setItem('selectedTag', selectedTag);
    
    console.log(selectedCity); // 確認有選到
    console.log(selectedTag);
    console.log("---------------");
    window.location.href = `/chill-around-project/pages/allSite.html?site_city=${encodeURIComponent(selectedCity)}&tag_id=${encodeURIComponent(selectedTag)}`;
    // window.location.href = `/chill-around-project/pages/allSite.html`;
});

// const container = document.getElementById('sitecardBox');
// container.addEventListener('click', function (event) {
//     if(event.target&& event.target.matches('.cardOverlay')){
//         console.log('OK');
//         console.log(`${event.target.textContent}clicked`);
        
        
//     }
// });
// 上方三張大圖
axios.get('http://localhost:8080/site/allsite')
.then(response =>{
    const data =  response.data;
    const siteData = data.filter(data => data.photo_three != '').slice(10,18)
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
   

    <div id="image1" class="col-md-12 ps-0 pe-0">
        <div class="overlay"></div>
            <img src="../assets/images/searchSite/Keelung/ZhengbinFishingHarbor.jpg" alt="Image 1">
    </div>
    `;
    heroImage.appendChild(allImage);

})
 // 創建景點卡片
 function createCard(attraction) {
    console.log("---叫出的景點資訊---");
    console.log(attraction); //確認有叫出點擊的卡片資訊
    
    const sitecardBox = document.getElementById('sitecardBox');
    const siteCard = document.createElement("div");
    siteCard.classList.add("col-md-3", "p-0", "m-0");

    siteCard.innerHTML = `
        <div id="siteCard" class="allCard card bg-primary" data-site-id="${attraction.site_id}">
            <div class="cardImage">
                <img src="../assets/images/searchSite/${attraction.photo_two}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${attraction.site_name}</h5>
                <p class="card-subtitle">${attraction.short_add}</p>
            </div>
            <div id="addBtn" class="btnOverlay">   
                        <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${attraction.site_id}" 
                            data-site-name="${attraction.site_name}" 
                            data-site-add="${attraction.short_site_add}"
                            data-site-info="${attraction.site_info}"
                            data-site-img="${attraction.photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button> 
            </div>
        </div>`;
    // console.log(sitecardBox);

    // 用 onclick 導向到詳細資訊頁面
    // siteCard.onclick = function() {
    //     window.location.href = `/chill-around-project/pages/siteInfo.html?id=${attraction.site_id}`;
    // };
    sitecardBox.appendChild(siteCard);
    
};
// document.getElementById('addBtn').addEventListener('click', function(event) {
//     event.stopPropagation();
//     console.log('Child button clicked');
// });

// 生成美食卡片
function createFoodCard(attraction) {
    console.log("美食卡片："+attraction); //確認有叫出的卡片資訊
    
    const foodCardBox = document.getElementById('foodcardBox');
    const foodCard = document.createElement("div");
    foodCard.classList.add("col-md-3", "p-0", "m-0");

    foodCard.innerHTML = `
        <div id="foodCard" class="allCard  card bg-primary" data-store-id="${attraction.store_id}">
            <div id="foodImage" class="cardImage">
                <img src="${attraction.photo_two}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${attraction.store_name}</h5>
                <p class="card-subtitle">${attraction.short_city}</p>
            </div>
            <div class="btnOverlay">
                <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${attraction.store_id}" 
                            data-site-name="${attraction.store_name}" 
                            data-site-add="${attraction.short_store_add}"
                            data-site-img="${attraction.photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                </button> 
            </div>
        </div>`;
    console.log(foodCardBox);
    const placeId = attraction.store_id;
    console.log("地點ＩＤ："+placeId);
    
    //用 onclick 導向到詳細資訊頁面
    // foodCard.onclick = function (){
    //     console.log("地點ＩＤ："+placeId);
    //     localStorage.setItem('selectedPlaceId', placeId);

    //     // 跳轉到地圖頁面
    //      window.location.href = '/chill-around-project/pages/foodMap.html?place_id=' + placeId;
    // }
    
    foodCardBox.appendChild(foodCard);
};

// 生成隨機的景點卡片
async function showRandomAttractions() {
    try {
        const response = await axios.get(`http://localhost:8080/site/searchSite/randomSite`);
        console.log("---取得資料---");
        console.log(response.data);
        console.log("---取得資料---");
        const randomCity = response.data;
        randomCity.forEach(attraction => {
            createCard(attraction);
        });
        siteCardClickEvents()
        bindLoadScheduleEvents()
    } catch (error) {
        console.error('Error fetching random attractions:', error);
    }
   
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
            siteCardClickEvents()
            bindLoadScheduleEventsFood()

        })
        .catch(error => {
            console.error('Error fetching random attractions:', error);
        });
   
}
// 綁定卡片點擊事件
function siteCardClickEvents() {
    const siteCards = document.querySelectorAll('.allCard'); 
    console.log(siteCards);
       
    siteCards.forEach(card => {
        card.onclick = function (event) {
            // 阻止按鈕點擊時觸發卡片事件
            if (event.target.tagName === 'BUTTON') return;

            const siteId = this.getAttribute('data-site-id');
            const storeId = this.getAttribute('data-store-id');
            if(siteId){
                console.log(siteId);
                window.location.href = `/chill-around-project/pages/siteInfo.html?id=${siteId}`;
            }
            if(storeId){
                console.log(storeId);
                window.location.href = `/chill-around-project/pages/foodMap.html?place_id=${storeId}`;
            }
            
        };
    });
}

 // 綁定 "加入行程" 按鈕點擊事件 =>景點
 function bindLoadScheduleEvents() {
    let selectedSchID;
    let selectedSiteData;

    const loadScheduleButtons = document.querySelectorAll('.loadSchedule');
    loadScheduleButtons.forEach(button => {
        button.addEventListener('click', async (event) => {

            //登入判斷式
            if (!token) {
                event.preventDefault();
                event.stopPropagation(); // 防止事件冒泡，確保不顯示模態
                alert("請先登入");
                window.location.href = 'index.html';
                return;
            }
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
                const { data } = await axios.get(`http://localhost:8080/schInfo/getspot/${emailid}`);

                console.log('Email ID:', emailid); // 確認 emailid 是否正確


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
 // 綁定 "加入行程" 按鈕點擊事件 =>美食
 function bindLoadScheduleEventsFood() {
    let selectedSchID;
    let selectedSiteData;

    const loadScheduleButtons = document.querySelectorAll('.loadSchedule');
    loadScheduleButtons.forEach(button => {
        button.addEventListener('click', async (event) => {

            //登入判斷式
            if (!token) {
                event.preventDefault();
                event.stopPropagation(); // 防止事件冒泡，確保不顯示模態
                alert("請先登入");
                window.location.href = 'index.html';
                return;
            }
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
                const { data } = await axios.get(`http://localhost:8080/schInfo/getspot/${emailid}`);

                console.log('Email ID:', emailid); // 確認 emailid 是否正確


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





