import axios from "axios";

// console.log("已從 localStorage 取得:", localStorage.getItem("scheduleId"));
const currentScheduleId = localStorage.getItem("scheduleId");
// console.log(currentScheduleId);

axios
  .get(`http://localhost:8080/buildPlan/editPlan/${currentScheduleId}`)
  .then(function (response) {
    const schedules = response.data;
    // console.log("取得此行程的景點資料:", schedules);
    renderEditPlan(schedules);
  })
  .catch(function (error) {
    console.log(error);
    console.log("請求行程資料失敗");
  });

const cardList = document.querySelector(".cardList");

function renderEditPlan(schedules) {
  const planInfo = document.querySelector(".planInfo");
  const dayList = document.querySelector(".dayList");

  // 清空現有的資料
  planInfo.innerHTML = "";
  dayList.innerHTML = "";
  cardList.innerHTML = "";

  // let startDate = schedules[0].edit_date.slice(0, 10);
  // let endDate = schedules[0].end_date.slice(0, 10);
  let startDate = new Date(schedules[0].edit_date)
    .toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  let endDate = new Date(schedules[0].end_date)
    .toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

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
          <h2>預算: 0</h2>
          <p>NTD</p>
      </div>
  </div>
  <div class="d-flex planedDay">
      <div class="circle">${alreadyEditedDays}/${diffInDays}</div>
      <p class="text-center">已規劃<br>天數</p>
  </div>
  `;

  // 建立天數列表的 HTML 結構
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

  // 獲得本計畫的預算

  axios
    .get(`http://localhost:8080/buildPlan/editPlan/budget/${currentScheduleId}`)
    .then(function (response) {
      const budget = response.data;
      // console.log("取得此行程的預算資料:", budget);
      renderBuget(budget);
    })
    .catch(function (error) {
      console.log(error);
      console.log("請求預算資料失敗");
    });

  function renderBuget(budget) {
    let totalBudget = 0;
    budget.forEach((item) => {
      totalBudget += item.Cost;
    });

    document.querySelector(".budget").innerHTML = `
    <h2>預算: ${totalBudget} </h2>
    <p>NTD</p>
    `;
  }

  // 新增一天的邏輯
  const addDayBtn = document.querySelector(".addDayBtn");
  addDayBtn.addEventListener("click", () => {
    const newDay = alreadyEditedDays + 1;
    if (newDay > diffInDays) {
      alert("這個行程沒有那麼多天");
      return;
    }

    axios
      .post(`http://localhost:8080/buildPlan/editPlan/addDay`, {
        sch_id: currentScheduleId,
        sch_day: newDay,
      })
      .then(function (response) {
        console.log("新的一天已新增:", response.data);
        location.reload(); // 刷新頁面
      })
      .catch(function (error) {
        console.log("新增一天時發生錯誤:", error);
      });
  });

  // 切換不同的天數
  const dayListItems = dayList.getElementsByTagName("li");
  for (let i = 0; i < dayListItems.length - 1; i++) {
    dayListItems[i].addEventListener("click", () =>
      switchCurrentDay(i, schedules)
    );
  }

  // 預設顯示第一天的資料
  let currentDay = localStorage.getItem("currentDay");
  if (!currentDay) {
    currentDay = 1;
    localStorage.setItem("currentDay", currentDay); // 初始化為 Day 1
  }

  // 渲染對應的天數資料
  switchCurrentDay(currentDay - 1, schedules);
}

function switchCurrentDay(i, schedules) {
  const dayListItems = document
    .querySelector(".dayList")
    .getElementsByTagName("li");
  const todayInfo = document.querySelector(".todayInfo");
  // let startDate = schedules[0].edit_date.slice(0, 10);
  let startDate = new Date(schedules[0].edit_date)
    .toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  let currentDate = calculateTodayDate(startDate, i);
  todayInfo.innerHTML = `<h3>${currentDate}</h3>`;

  // 移除所有 class="currentDay"
  for (let i = 0; i < dayListItems.length; i++) {
    dayListItems[i].classList.remove("currentDay");
  }

  // 添加 class="currentDay" 到當前天數
  dayListItems[i].classList.add("currentDay");

  // 將當天天數儲存在 localStorage
  localStorage.setItem("currentDay", i + 1);
  let currentDay = localStorage.getItem("currentDay");

  // 根據選中的 day 值篩選出對應的資料
  const filteredData = schedules.filter(
    (schedule) => schedule.sch_day === i + 1
  );

  renderDayContent(filteredData);
}

function renderDayContent(filteredData) {
  // 清空卡片列表
  cardList.innerHTML = "";
  // 根據 sch_order 排序
  filteredData.sort((a, b) => {
    return a.sch_order - b.sch_order;
  });
  // console.log("當天的資料:", filteredData);

  // 沒有圖片就填入色塊
  filteredData.forEach((site) => {
    let cardImgUrl;
    if (site.photo_one === null) {
      cardImgUrl = "https://dummyimage.com/600x400/dcab25/dcab25";
    } else {
      cardImgUrl = `../assets/images/searchSite/${site.photo_one}`;
    }

    const cardItem = document.createElement("li");

    // 建立景點卡片的 HTML 結構
    cardItem.innerHTML = `
    <div id="arrangeItem" >
      <li data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-site-name="${site.sch_spot}" data-site-id="${site.detail_id}" data-sch-id="${site.sch_id}" data-site-day="${site.sch_day}" data-site-order="${site.sch_order}"  class="siteItem">
        <div class="card">
          <div class="row g-0">
            <div class="col-12 col-md-8">
              <div class="card-body">
                <h5 class="card-title">${site.sch_spot}</h5>
                <p class="card-text">${site.sch_paragh}</p>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <img src="${cardImgUrl}">
            </div>
          </div>
        </div>
      </li>
    <div>
    `;

    // 將卡片加入到 ul 中
    cardList.appendChild(cardItem);
  });

  document.querySelectorAll(".siteItem").forEach(function (site) {
    site.addEventListener("click", function (e) {
      let targetElement = e.target.closest("li");
      let currentSiteName = "";
      let currentModal = document.querySelector(".modal");
      // console.log(isEditMode);

      if (targetElement) {
        currentSiteName = targetElement.dataset.siteName;

        // 使用 querySelector 來找到 Modal 中的 input，並設置其值
        const siteNameInput = currentModal.querySelector(
          'input[name="siteName"]'
        );
        const siteParaghTA = currentModal.querySelector(
          'textarea[name="siteParagh"]'
        );
        if (siteNameInput) {
          siteNameInput.value = currentSiteName;
          siteParaghTA.value = targetElement.querySelector(
            "p[class='card-text']"
          ).innerText;
        }
      } else {
        console.log("找不到最近的 LI");
      }

      // 獲取所有標籤，並填入 Modal 中
      axios
        .get(`http://localhost:8080/buildPlan/editPlan/scheduleDetails/tags`)
        .then(function (response) {
          const alltags = response.data;
          // console.log("alltags: ", alltags);
          renderAllTags(alltags);
        })
        .catch(function (error) {
          console.log("Error fetching alltags details:", error);
        });

      // 根據 currentSiteName 從後端獲取標籤，然後將 Modal 中對應的標籤添加樣式
      axios
        .get(
          `http://localhost:8080/buildPlan/editPlan/scheduleDetails/tags/${encodeURIComponent(
            currentSiteName
          )}`
        )
        .then(function (response) {
          const siteTags = response.data;
          document.querySelector(".tagBox").style.display = "block";

          highlightMatchedTags(siteTags);
        })
        .catch(function (error) {
          document.querySelector(".tagBox").style.display = "none";
          console.log("Error fetching tags details:", error);
        });

      let selectedTags = [];
      function highlightMatchedTags(siteTags) {
        const allButtons = document.querySelectorAll(".toggle-button");

        // 清空樣式
        allButtons.forEach(function (button) {
          button.classList.remove("btnSelected");
        });

        // 清空 selectedTags
        selectedTags = [];

        // 遍歷所有的標籤按鈕
        allButtons.forEach(function (button) {
          // 獲取按鈕的文字內容，並去除多餘的空白
          const tagName = button.textContent.trim();
          const tagId = button.dataset.tagId;

          // 檢查該標籤是否在 siteTags 中
          for (let i = 0; i < siteTags.length; i++) {
            if (siteTags[i].tag_name === tagName) {
              button.classList.add("btnSelected");
              selectedTags.push(tagId);
            }
          }
        });

        // 選取標籤後變更樣式，獲得選取的標籤列表
        allButtons.forEach((button) => {
          // 獲取按鈕的標籤ID
          const tagName = button.textContent.trim();
          const tagId = button.dataset.tagId;

          if (siteTags.includes(tagName)) {
            button.classList.add("btnSelected");
            if (!selectedTags.includes(tagId)) {
              selectedTags.push(tagId);
            }
          }

          button.addEventListener("click", function () {
            button.classList.toggle("btnSelected");
            // 如果按鈕有 btnSelected 樣式，將標籤 ID 添加到 selectedTags 中
            if (button.classList.contains("btnSelected")) {
              if (!selectedTags.includes(tagId)) {
                selectedTags.push(tagId);
              }
            } else {
              // 如果按鈕沒有 btnSelected 樣式，從 selectedTags 中移除該標籤 ID
              selectedTags = selectedTags.filter((id) => id !== tagId);
            }
            // 將 selectedTags 存入 localStorage
            localStorage.setItem("selectedTags", JSON.stringify(selectedTags));

            // console.log("當前選中的標籤:", selectedTags);
          });
        });
      }
    });
  });
}

export function renderAllTags(alltags) {
  const tagList = document.querySelector(".taglist");
  tagList.innerHTML = "";

  alltags.forEach((tag) => {
    const tagItem = document.createElement("li");

    // 建立標籤的 HTML 結構
    tagItem.innerHTML = `
      <li>
        <button
          type="button"
          data-tag-id="${tag.tag_id}"
          class="btn btn-outline-primary toggle-button"
        >
          ${tag.tag_name}
        </button>
      </li>
    `;

    // 將卡片加入到 ul 中
    tagList.appendChild(tagItem);
  });
}

function calculateDayDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMilliseconds = end - start;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays) + 1;
}

function calculateTodayDate(startDate, i) {
  const start = new Date(startDate);

  // 計算當天日期
  const currentDate = new Date(start.getTime() + i * (1000 * 60 * 60 * 24));

  // 格式化為YYYY-MM-DD
  const formattedDate = currentDate.toISOString().slice(0, 10);

  // 輸出指定日期
  return formattedDate;
}

// 驗證是否已登入
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  // console.log("TOKEN:", token);

  if (!token) {
    alert("請先登入會員");
    window.location.href = "login.html";
  }
});
