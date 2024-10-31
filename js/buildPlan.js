import axios from "axios";

document.querySelector(".btn-complete").addEventListener("click", function () {
  // 取得旅行計畫名稱
  const planName = document.querySelector("#planName").value;
  // 取得開始日期
  const startDate = document.querySelector("#startDate").value;
  // 取得結束日期
  const endDate = document.querySelector("#endDate").value;

  // POST 請求 (新增旅行計畫)
  axios
    .post(`http://localhost:8080/buildPlan/buildPlan`, {
      sch_name: planName,
      start_date: startDate,
      end_date: endDate,
    })
    .then(function (response) {
      console.log("旅行計畫已新增:", response.data);
      localStorage.setItem("scheduleId", response.data.data);

      window.location.href = "editPlan.html";
    })
    .catch(function (error) {
      console.log("新增旅行計畫時發生錯誤:", error);
    });
});

// 驗證是否已登入
document.addEventListener("DOMContentLoaded", function () {
  // 延遲驗證 token，以確保頁面完全渲染
  setTimeout(() => {
    const token = localStorage.getItem("token");
    // console.log("TOKEN:", token);

    if (!token) {
      alert("請先登入會員");
      window.location.href = "index.html";
    }
  }, 100); // 延遲100毫秒
});
