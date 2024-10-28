import axios from "axios";

axios
  .get("http://localhost:8080/buildPlan/planList")
  .then(function (response) {
    const schedules = response.data;
    // console.log(schedules);
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
            <li class="d-flex justify-content-center" id="scheduleItem" data-scheduleId="${schedule.sch_id}">
                <div class="card" style="width: 90%">
                  <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title"></h5>
                    <div class="editBtn dropdown">
                      <button type="button" class="btn btn-outline-danger dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a href="" class="dropdown-item" id="deletePlan">刪除此計畫</a></li>
                      </ul>
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

  // 為所有卡片添加點擊事件處理器
  document.querySelectorAll(".card").forEach((item) => {
    item.addEventListener(
      "click",
      function (e) {
        // 檢查是否點擊到 bi-three-dots 或 deletePlan，避免觸發跳轉
        if (
          e.target.classList.contains("bi-three-dots") ||
          e.target.id === "deletePlan"
        ) {
          e.stopPropagation();
          return;
        }

        // 如果不是點擊 bi-three-dots，執行跳轉邏輯
        const scheduleId = this.closest("#scheduleItem").dataset.scheduleid;
        // console.log("準備跳轉到計畫", scheduleId);
        localStorage.setItem("scheduleId", scheduleId);
        window.location.href = "editPlan.html";
      },
      { once: true } // 確保每個事件只會觸發一次
    );
  });

  // 添加全局點擊事件處理器，判斷要刪除還是進入計畫
  document.addEventListener("click", (e) => {
    const targetElement = e.target.closest("#scheduleItem");
    const scheduleId = targetElement.dataset.scheduleid;

    // 檢查是否點擊了 bi-three-dots 或 deletePlan
    if (e.target.classList.contains("bi-three-dots")) {
      // 開始刪除邏輯
      e.stopPropagation(); // 防止點擊事件冒泡
    } else if (e.target.id === "deletePlan") {
      const confirmation = confirm("確定要刪除此計畫嗎？");

      if (confirmation) {
        axios
          .delete(`http://localhost:8080/buildPlan/planList/${scheduleId}`)
          .then((response) => {
            console.log("計畫刪除成功", response.data);
            location.reload(); // 刪除後刷新頁面
          })
          .catch((error) => {
            console.error("刪除計畫失敗:", error);
          });
      }
    }
  });
}
