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
    console.log(schedules);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log("請求失敗");
  })
  .finally(function () {
    // always executed
  });

// function renderPlanList(schedules) {}
