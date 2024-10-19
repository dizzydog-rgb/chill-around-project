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

import axios from "axios";
import { render } from "ejs";

axios
  .get("http://localhost:8080/buildPlan/editPlan/:id")
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

function renderPlanList(schedules) {
  const cardList = document.querySelector(".cardList");

  // 清空現有的卡片
  cardList.innerHTML = "";

  // 為每個計畫建立卡片
  schedules.forEach((schedule) => {
    const cardItem = document.createElement("li");
    let startDate = schedule.edit_date.slice(0, 10);
    let endDate = schedule.end_date.slice(0, 10);

    // 建立卡片的 HTML 結構
    cardItem.innerHTML = `
            <a  href="http://localhost:5173/chill-around-project/pages/editPlan/${schedule.sch_id}">    
            <li class="d-flex justify-content-center">
                <div class="card" style="width: 90%">
                  <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title"></h5>
                    <div class="editBtn">
                      <button type="button" class="btn btn-outline-danger">
                        <i class="bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                  <img
                    src="${schedule.sch_image}"
                    class="card-img-top"
                  />
                  <div class="card-body d-flex justify-content-between">
                    <div>
                      <h5 class="card-title">${schedule.sch_name}</h5>
                      <p class="card-text">${startDate} - ${endDate}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <button type="button" class="btn btn-outline-primary">
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              </a>
      `;

    // 將卡片加入到 ul 中
    cardList.appendChild(cardItem);
  });
}
