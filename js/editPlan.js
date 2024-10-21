import axios from "axios";

// 選取標籤變更樣式
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".addJourneyBtn")
    .addEventListener("click", function () {
      // 清除當前按鈕的狀態
      document.querySelectorAll(".toggle-button").forEach((button) => {
        button.classList.remove("btnSelected");
      });
    });

  document.querySelectorAll(".toggle-button").forEach((button) => {
    button.addEventListener("click", function () {
      // 切換當前按鈕的狀態
      button.classList.toggle("btnSelected");
    });
  });
});

console.log("已從 localStorage 取得:", localStorage.getItem("scheduleId"));
const currentScheduleId = localStorage.getItem("scheduleId");

axios
  .get(`http://localhost:8080/buildPlan/editPlan/${currentScheduleId}`)
  .then(function (response) {
    const schedules = response.data;
    console.log("取得資料:", schedules);
    renderEditPlan(schedules);
  })
  .catch(function (error) {
    console.log(error);
    console.log("請求失敗");
  });

const cardList = document.querySelector(".cardList");

function renderEditPlan(schedules) {
  const planInfo = document.querySelector(".planInfo");
  const dayList = document.querySelector(".dayList");
  
  // 清空現有的資料
  planInfo.innerHTML = "";
  dayList.innerHTML = "";
  cardList.innerHTML = "";

  let startDate = schedules[0].edit_date.slice(0, 10);
  let endDate = schedules[0].end_date.slice(0, 10);
  let diffInDays = calculateDayDifference(
    schedules[0].edit_date,
    schedules[0].end_date
  );
  const uniqueDays = new Set(schedules.map((schedule) => schedule.sch_day));
  const alreadyEditedDays = uniqueDays.size;

  // 建立行程基本資訊的 HTML 結構
  planInfo.innerHTML = `
  <div class="d-flex justify-content-between">
      <div class="planName">
          <h2>${schedules[0].sch_name}</h2>
          <p>${startDate} to <br> ${endDate}</p>
      </div>
      <div class="budget">
          <h2>預算: 8,983</h2>
          <p>NTD</p>
      </div>
  </div>
  <div class="d-flex planedDay">
      <div class="circle">${alreadyEditedDays}/${diffInDays}</div>
      <p class="text-center">已規劃<br>天數</p>
  </div>
  `;

  // 天數列表
  dayList.innerHTML += `<li class="currentDay align-bottom" data-sch-day="1">DAY1</li>`;
  for (let i = 2; i < alreadyEditedDays + 1; i++) {
    dayList.innerHTML += `<li data-sch-day="${i}">DAY${i}</li>`;
  }
  dayList.innerHTML += `
    <li>
        <div class="addDayBtn">
            <button type="button" class="btn btn-outline-success"><i class="bi bi-plus"></i></button>
        </div>
    </li>
  `;

  // 切換不同的天數
  const dayListItems = dayList.getElementsByTagName('li');
  for (let i = 0; i < dayListItems.length - 1; i++) {
    dayListItems[i].addEventListener('click', () => switchCurrentDay(i, schedules));
  }

  // 預設顯示第一天的資料
  switchCurrentDay(0 , schedules);
}

function switchCurrentDay(i, schedules) {
  const dayListItems = document.querySelector(".dayList").getElementsByTagName("li");
  
  // 移除所有 class="currentDay"
  for (let i = 0; i < dayListItems.length; i++) {
    dayListItems[i].classList.remove("currentDay");
  }

  // 添加 class="currentDay" 到當前天數
  dayListItems[i].classList.add("currentDay");

  // 根據選中的 day 值篩選出對應的資料
  const filteredData = schedules.filter(schedule => schedule.sch_day === i + 1);
  renderDayContent(filteredData);
}

function renderDayContent(filteredData) {
  // 清空卡片列表
  cardList.innerHTML = "";

  console.log("當天的資料:", filteredData);
  filteredData.forEach((site) => {
    const cardItem = document.createElement("li");

    // 建立卡片的 HTML 結構
    cardItem.innerHTML = `
      <li data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <div class="card">
          <div class="row g-0">
            <div class="col-12 col-md-8">
              <div class="card-body">
                <h5 class="card-title">${site.sch_spot}</h5>
                <p class="card-text">${site.sch_paragh}</p>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <img src="https://plus.unsplash.com/premium_photo-1661951189203-12decb9d7f8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            </div>
          </div>
        </div>
      </li>
    `;

    // 將卡片加入到 ul 中
    cardList.appendChild(cardItem);
  });
}

function calculateDayDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMilliseconds = end - start;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays) + 1;
}
