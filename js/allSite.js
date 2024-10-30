import axios from 'axios';

// // 寫這段是為了要讓我在5173的網址輸入對應的id可以撈到對應的資料
// const params = new URLSearchParams(window.location.search);
// // http://localhost:5173/chill-around-project/pages/siteInfo.html?cityName=Taipei
// console.log( '讀取'+ params ); //讀取cityName=Taipei
// const cityName = params.get('cityName'); // 假設 URL 包含 ?cityName=Taipei
// console.log('cityName:'+ cityName); //cityName:Taipei

// 生成隨機的景點卡片
async function showRandomAttractions() {
    try {
        const response = await axios.get(`http://localhost:8080/site/allsite/all/randomCity`) // 注意確保後端可接受的 URL 和查詢參數
            ;
        console.log("取得資料" + response.data);
        console.log(response.data);
        const randomCity = response.data;
        randomCity.forEach(attraction => {
            createCard(attraction);
        });
        siteCardClickEvents();
        bindLoadScheduleEvents();
    } catch (error) {
        console.error('Error fetching random attractions:', error);
    }
   
}
// 在DOM加載完成後讀網址
document.addEventListener("DOMContentLoaded",()=>{
    const urlParams = new URLSearchParams(window.location.search);
    
    const selectSiteCity = urlParams.get('site_city');
    const selectTagId = urlParams.get('tag_id');
    // 讀取 localStorage 中存儲的數據
    // const selectSiteCity = localStorage.getItem('selectedCity');
    // const selectTagId = localStorage.getItem('selectedTag');

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
        siteCardClickEvents()
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
            console.log("updateCard裡的attraction",attractions);
            
            if (attractions.length === 0) {
                sitecardBox.innerHTML = '<p>沒有符合條件的景點。</p>';
            }
            
            attractions.forEach(attraction => {
                createCard(attraction);
            });
            siteCardClickEvents()
            bindLoadScheduleEvents()
        })
        .catch(error => {
            console.error('Error fetching attractions:', error);
            alert('無法獲取資料，請稍後再試。');
        });
    }
    
}

 // 創建卡片
function createCard(attraction) {
    console.log("createCard裡面attraction",attraction); //確認有叫出點擊的卡片資訊
    
    
    const sitecardBox = document.getElementById('sitecardBox');
    const siteCard = document.createElement("div");
    siteCard.classList.add("col-md-3", "p-0", "m-0");
    siteCard.innerHTML = `
            <div id="siteCard" class="siteCard allCard card bg-primary" data-site-id="${attraction.site_id}">
            <div class="cardImage">
                <img src="../assets/images/searchSite/${attraction.photo_one}" alt="">
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
        </div>
                `;
    console.log(sitecardBox);

    // 用 onclick 導向到詳細資訊頁面
    // siteCard.onclick = function() {
    //     window.location.href = `/chill-around-project/pages/siteInfo.html?id=${attraction.site_id}`;
    // };
    
    sitecardBox.appendChild(siteCard);
}
// 綁定景點卡片點擊事件
function siteCardClickEvents() {
    const siteCards = document.querySelectorAll('.siteCard'); 
    console.log(siteCards);
       
    siteCards.forEach(card => {
        card.onclick = function (event) {
            // 阻止按鈕點擊時觸發卡片事件
            if (event.target.tagName === 'BUTTON') return;

            const siteId = this.getAttribute('data-site-id');
            console.log(siteId);
            
            window.location.href = `/chill-around-project/pages/siteInfo.html?id=${siteId}`;
        };
    });
}
 // 綁定 "加入行程" 按鈕點擊事件
 function bindLoadScheduleEvents() {
    let selectedSchID;
    let selectedSiteData;
    const loadScheduleButtons = document.querySelectorAll('.loadSchedule');
    loadScheduleButtons.forEach(button => {
      
        button.addEventListener('click', async (event) => {
            const token = localStorage.getItem('token');
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
                    
                    const { data } = await axios.get('http://localhost:8080/schInfo/getspot');
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

// 綁定核取方塊生成相對應卡片事件
document.querySelectorAll('.cityCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});
document.querySelectorAll('.tagCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});