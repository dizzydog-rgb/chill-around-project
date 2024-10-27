import axios from 'axios';


// 取得 localStorage 中的選項
const selectedCity = localStorage.getItem('selectedCity');
const selectedTag = localStorage.getItem('selectedTag');

console.log("從 localStorage 取得:", selectedCity);
console.log("從 localStorage 取得:", selectedTag);

// 隨機選取資料
function getRandomData(dataArray, count) {
    const shuffledArray = [...dataArray].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
}

// 主函式，在 DOM 加載完成後執行
document.addEventListener("DOMContentLoaded", () => {
    const selectSiteCity = localStorage.getItem('selectedCity');
    const selectTagId = localStorage.getItem('selectedTag');

    const cityCheckboxes = document.querySelectorAll('.cityCheckbox');
    const tagCheckboxes = document.querySelectorAll('.tagCheckbox');

    // 設置核取方塊狀態並綁定事件
    cityCheckboxes.forEach(checkbox => {
        checkbox.checked = (selectSiteCity === checkbox.value);
        checkbox.addEventListener('change', updateCards);
    });

    tagCheckboxes.forEach(checkbox => {
        checkbox.checked = (selectTagId === checkbox.value);
        checkbox.addEventListener('change', updateCards);
    });

    // 初始渲染卡片
    if(selectSiteCity && selectTagId) {
        // 根據 URL 中的參數設置核取方塊的狀態
        cityCheckboxes.forEach(checkbox=>{
            checkbox.checked = (selectSiteCity === checkbox.value); // 設置核取方塊狀態
        })
        tagCheckboxes.forEach(checkbox => {
            checkbox.checked = (selectTagId === checkbox.value);
        });
        updateCards();
    } else {
        renderRandomCards();
    }
});

// 更新並渲染符合條件的卡片
function updateCards() {
    const selectedRegions = Array.from(document.querySelectorAll('.cityCheckbox:checked')).map(checkbox => checkbox.value).join(',');
    const selectedTags = Array.from(document.querySelectorAll('.tagCheckbox:checked')).map(checkbox => checkbox.value).join(',');

    // 儲存選擇的篩選條件到 Local Storage
    // localStorage.setItem('selectedCity', selectedRegions.join(','));
    // localStorage.setItem('selectedTag', selectedTags.join(','));

    console.log("選擇的地區:", selectedRegions);
    console.log("選擇的標籤:", selectedTags);


        axios.get('http://localhost:8080/schInfo/getsch', {
            
            params: {
                regions:selectedRegions, // 轉換為用逗號分隔的字串
                tags:selectedTags
            }
            
            
        })
      
        .then(response => {
            const attractions = response.data;
            // console.log("API 返回的景點:", attractions);

            const sitecardBox = document.getElementById('sitecardBox');
            sitecardBox.innerHTML = ''; // 清空目前顯示的卡片
            
            if (attractions.length === 0) {
                sitecardBox.innerHTML = '<p>沒有符合條件的景點。</p>';
            }
            attractions.forEach(attraction => {
                renderCards(attraction);
            });
        })
        .catch(error => {
            console.error('Error fetching attractions:', error);
            console.log('無法獲取資料，請稍後再試。');
        });
   
}


// 主函式，從後端隨機獲取資料
function renderRandomCards() {
    axios.get('http://localhost:8080/schInfo/getsch')
        .then(response => {
            console.log("取得資料", response.data);
            const attraction = response.data;
            const randomSchData = getRandomData(attraction, 12);
            renderCards(randomSchData);
           
        })
        .catch(error => {
            console.error('Error fetching random attractions:', error);
        });
}

// 渲染卡片
function renderCards(attraction) {
    console.log(attraction); //確認有叫出點擊的卡片資訊


    const sitecardBox = document.getElementById("sitecardBox");
    sitecardBox.innerHTML = '';

    attraction.forEach(data => {
        const siteCard = document.createElement("div");
        let startDate = data.edit_date.slice(0, 10);
        siteCard.className = "col-md-4 p-0 m-0";

        siteCard.innerHTML = `
            <div id="siteCard" class="allCard card bg-primary m-0" data-sch-id="${data.sch_id}">
                <div class="cardImage">
                    <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                </div>
                <div class="cardOverlay">
                    <h5 class="card-title">${data.sch_name}</h5>
                    <p class="card-subtitle">${startDate}</p>
                </div>
                <div class="btnOverlay">
                    <a id="likeBtn" class="bi bi-heart" data-sch-id="${data.sch_id}"></a>
                </div>
            </div>
        `;
      
        sitecardBox.appendChild(siteCard);
    });

    attachCardClickHandler();
    attachLikeButtonHandler();
}

// 設置卡片點擊事件
function attachCardClickHandler() {
    document.querySelectorAll(".allCard").forEach(sch => {
        sch.addEventListener("click", (event) => {
            const schId = event.currentTarget.getAttribute('data-sch-id');
            localStorage.setItem('selectedSchId', schId);
            console.log(schId);
            window.location.href = "schCom.html";
        });
    });
}

// 設置喜好按鈕點擊事件
function attachLikeButtonHandler() {
    document.querySelectorAll('.bi-heart').forEach(likeBtn => {
        likeBtn.addEventListener('click', function (e) {
            e.stopPropagation();

            e.target.classList.toggle('bi-heart');
            e.target.classList.toggle('bi-heart-fill');

            const schId = e.target.getAttribute('data-sch-id');
            const postData = { sch_id: schId };

            axios.post('http://localhost:8080/schInfo/getToLike', postData)
                .then(response => {
                    console.log('資料已成功發送:', postData);
                    alert("加入成功");
                })
                .catch(error => {
                    alert("加入失敗");
                    console.error('無法發送資料:', error);
                });
        });
    });
}

// 呼叫主函式以載入頁面
renderRandomCards();


// 綁定事件
document.querySelectorAll('.cityCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});
document.querySelectorAll('.tagCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});