import axios from "axios";

// 檢查是否存在已選取的 sch_id
const selectedSchId = localStorage.getItem('selectedSchId');
if (selectedSchId) {
    console.log("選取的 Sch ID:", selectedSchId);

    // 發送請求以取得對應的行程詳情
    axios.get(`http://localhost:8080/buildPlan/editPlan/${selectedSchId}`)
        .then(function (response) {
            const schDetails = response.data;
            console.log(schDetails);
            renderTopPlan(schDetails);
            bindCardClickEvents();
        })
        .catch(function (error) {
            console.log(error);
            console.log("請求行程資料失敗");
        });
}

function renderTopPlan(schDetails) {
    const SchComImage = document.querySelector(".SchComImage");
    const cardList = document.querySelector(".cardList");
    const uniqueDays = new Set(schDetails.map((schedule) => schedule.sch_day));
    const alreadyEditedDays = uniqueDays.size; //天數

    
    SchComImage.innerHTML = `
        <div class="planName">
            <h2>${schDetails[0].sch_name}</h2>
            <p>${schDetails[0].edit_date.slice(0, 10)} to <br class="d-block d-md-none"> ${schDetails[0].end_date.slice(5, 10)}</p>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between DateBox border-top border-primary pt-3 align-items-end">
            <div class="editBtn w-100 w-md-auto mb-2 mb-md-0">               
                <ul class="d-flex dayList m-0 p-0"></ul>
            </div>
            <div class="todayInfo w-100 w-md-auto">
                <h3>台中市</h3>
                <h3>Fri 09/13</h3>
            </div>     
        </div>

    `;
    const dayList = document.querySelector(".dayList");

    // 天數列表
    dayList.innerHTML += `<li class="currentDay " data-sch-day="1">DAY1</li>`;
    for (let i = 2; i <= alreadyEditedDays; i++) {
        dayList.innerHTML += `<li data-sch-day="${i}">DAY${i}</li>`;
    }

    // 添加點擊事件以切換天數
    const dayListItems = dayList.getElementsByTagName("li");
    for (let i = 0; i < dayListItems.length; i++) {
        dayListItems[i].addEventListener("click", () => switchCurrentDay(i, schDetails));
    }

    // 預設顯示第一天的資料
    switchCurrentDay(0, schDetails); // 預設顯示第一天

    function switchCurrentDay(i, schedules) {
        const todayInfo = document.querySelector(".todayInfo");
        let startDate = schedules[0].edit_date.slice(0, 10);
        let currentDate = calculateTodayDate(startDate, i);
        todayInfo.innerHTML = `<h3>${currentDate}</h3>`;

        // 移除所有 class="currentDay"
        for (let item of dayListItems) {
            item.classList.remove("currentDay");
        }
        dayListItems[i].classList.add("currentDay");

        // 將當天天數儲存在 localStorage
        localStorage.setItem("currentDay", i + 1);

        // 根據選中的 day 值篩選出對應的資料
        const filteredData = schedules.filter((schedule) => schedule.sch_day === i + 1);
        renderDayContent(filteredData);
    }

    function renderDayContent(filteredData) {
        // 清空卡片列表
        cardList.innerHTML = "";
    
        // 建立卡片的 HTML 結構
        filteredData.forEach((item) => {
            let cardImgUrl = item.photo_one ? `../assets/images/searchSite/${item.photo_one}` : "https://dummyimage.com/600x400/dcab25/dcab25";
            cardList.innerHTML += `
                <a href="#" class="SiteCard" data-site-id="${item.site_id}">
                    <li class="siteItem" data-site-name="${item.sch_spot}">
                        <div class="card">
                            <div class="row g-0">
                                <div class="col-12 col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.sch_spot}</h5>
                                        <p class="card-text">${item.sch_paragh}</p>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <img src="${cardImgUrl}" alt="Card Image">
                                </div>
                            </div>
                        </div>
                    </li>
                </a>
            `;
        });
    
  
    }
    

    function calculateTodayDate(startDate, dayOffset) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + dayOffset);
        return date.toLocaleDateString(); // 返回格式化的日期
    }
}

function bindCardClickEvents() {
    
    
    const siteCards = document.querySelectorAll('.SiteCard');
    siteCards.forEach(card => {
        card.onclick = function (event) {
            // 阻止按鈕點擊時觸發卡片事件
            
            if (event.target.tagName === 'BUTTON') return;

            const siteId = this.getAttribute('data-site-id');
            window.location.href = `/chill-around-project/pages/siteInfo.html?id=${siteId}`;
            console.log(siteId);
        };
    });
}