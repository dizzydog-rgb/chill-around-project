import axios from "axios";
import { renderAllTags } from "./editPlan.js";

document.addEventListener("DOMContentLoaded", function () {
  // modal 的 PUT 及 POST 邏輯
  let currentModal = document.querySelector(".modal");
  let isEditMode = false;

  // 透過 site 的點擊事件獲得
  let currentSiteId;
  let currentSchId;
  let currentDay;

  document.addEventListener("click", function (e) {
    if (e.target.closest(".siteItem")) {
      let targetElement = e.target.closest("li");
      currentSiteId = targetElement.dataset.siteId;
      currentSchId = targetElement.dataset.schId;
      currentDay = targetElement.dataset.siteDay;

      // 切換到編輯模式
      isEditMode = true;
    }
  });

  document
    .querySelector(".addJourneyBtn")
    .addEventListener("click", function (e) {
      // 切換到新增模式
      isEditMode = false;
      currentSiteId = null;

      // 找到最近的 .siteItem
      const wrapper = this.closest(".editArea");
      const siteItem = wrapper.querySelector(".siteItem");
      currentSchId = siteItem.dataset.schId;
      currentDay = siteItem.dataset.siteDay;

      // 清空 modal
      currentModal.querySelector('input[name="siteName"]').value = "";
      currentModal.querySelector('textarea[name="siteParagh"]').value = "";
      // 不顯示標籤列表
      document.querySelector(".tagBox").style.display = "none";

      // 發送請求獲取標籤數據
      axios
        .get(`http://localhost:8080/buildPlan/editPlan/scheduleDetails/tags`)
        .then(function (response) {
          const alltags = response.data;
          renderAllTags(alltags); // 渲染標籤到 modal
        })
        .catch(function (error) {
          console.log("Error fetching alltags details:", error);
        });
    });

  // 綁定 PUT/POST 事件至 Modal 中的完成按鈕
  document.getElementById("save-site").addEventListener("click", () => {
    const siteName = currentModal.querySelector('input[name="siteName"]').value;
    const siteDescription = currentModal.querySelector(
      'textarea[name="siteParagh"]'
    ).value;
    // 從 localStorage 中取得 selectedTags
    let selectedTags = JSON.parse(localStorage.getItem("selectedTags")) || [];

    if (isEditMode) {
      // PUT 請求 (更新景點)
      axios
        .put(
          `http://localhost:8080/buildPlan/editPlan/sites/${currentSiteId}`,
          {
            sch_spot: siteName,
            sch_paragh: siteDescription,
            tags: selectedTags,
          }
        )
        .then(function (response) {
          console.log("行程點已更新:", response.data);
          selectedTags = [];
          currentModal.style.display = "none"; // 關閉 Modal
          location.reload(); // 刷新頁面
        })
        .catch(function (error) {
          console.log("更新行程點時發生錯誤:", error);
        });
    } else {
      // POST 請求 (新增景點)
      axios
        .post(
          `http://localhost:8080/buildPlan/editPlan/sites/${currentSchId}/${currentDay}`,
          {
            sch_spot: siteName,
            sch_paragh: siteDescription,
          }
        )
        .then(function (response) {
          console.log("行程點已新增:", response.data);
          currentModal.style.display = "none"; // 關閉 Modal
          location.reload(); // 刷新頁面
        })
        .catch(function (error) {
          console.log("新增行程點時發生錯誤:", error);
        });
    }
  });

  // 綁定 DELETE 事件至 Modal 中的完成按鈕
  document.getElementById("delete-site").addEventListener("click", () => {
    axios
      .delete(
        `http://localhost:8080/buildPlan/editPlan/sites/${currentSiteId}`,
        {}
      )
      .then(function (response) {
        console.log("行程點已刪除:", response.data);
        currentModal.style.display = "none"; // 關閉 Modal
        location.reload(); // 刷新頁面
      })
      .catch(function (error) {
        console.log("更新行程點時發生錯誤:", error);
      });
  });
});
