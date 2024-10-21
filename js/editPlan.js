import axios from "axios";

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

console.log("已取得:", localStorage.getItem("scheduleId"));
const currentScheduleId = localStorage.getItem("scheduleId");

axios
  .get(`http://localhost:8080/buildPlan/editPlan/${currentScheduleId}`)
  .then(function (response) {
    // handle success
    const schedules = response.data;
    console.log("取得資料:", schedules);
    renderEditPlan(schedules);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log("請求失敗");
  })
  .finally(function () {
    // always executed
  });

function renderEditPlan(schedules) {
  const planInfo = document.querySelector(".planInfo");

  // 清空現有的資料
  planInfo.innerHTML = "";

  // 為每個計畫建立資訊
  const planInfoItem = document.createElement("div");
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

  // 將卡片加入到 div 中
  // planInfo.appendChild(planInfoItem);

  // 添加點擊事件，將 ${schedule.sch_id} 儲存在localStorage
  // let cardItems = document.querySelectorAll(".card");
  // cardItems.forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     let targetElement = e.target.closest("li");
  //     if (targetElement) {
  //       // targetElement.dataset.scheduleid 是小寫
  //       const scheduleId = targetElement.dataset.scheduleid;
  //       localStorage.setItem("scheduleId", scheduleId);

  //       window.location.href = "editPlan.html";
  //     } else {
  //       console.log("找不到最近的 LI");
  //     }
  //   });
  // });
}

function calculateDayDifference(startDate, endDate) {
  // 將字串轉換為 Date 物件
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 計算毫秒差，再轉換為天數
  const diffInMilliseconds = end - start;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.floor(diffInDays) + 1; // 取整數部分，得到完整的天數差
}
