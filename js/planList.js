import axios from "axios";

axios
  .get("http://localhost:8080/buildPlan/planList")
  .then(function (response) {
    // handle success
    const schedules = response.data;
    console.log(schedules);

    renderPlanList(schedules);
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
            <li class="d-flex justify-content-center" data-scheduleId="${schedule.sch_id}">
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
                    src="../assets/images/searchSite/${schedule.photo_one}"
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
      `;

    // 將卡片加入到 ul 中
    cardList.appendChild(cardItem);
  });
  // 添加點擊事件，將 ${schedule.sch_id} 儲存在localStorage
  let cardItems = document.querySelectorAll(".card");
  cardItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      let targetElement = e.target.closest("li");
      if (targetElement) {
        // targetElement.dataset.scheduleid 是小寫
        const scheduleId = targetElement.dataset.scheduleid;
        localStorage.setItem("scheduleId", scheduleId);

        window.location.href = "editPlan.html";
      } else {
        console.log("找不到最近的 LI");
      }
    });
  });
}
