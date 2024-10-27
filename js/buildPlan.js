import axios from "axios";

document.querySelector(".btn-complete").addEventListener("click", function () {
  // 取得旅行計畫名稱
  const planName = document.querySelector("#planName").value;
  // 取得開始日期
  const startDate = document.querySelector("#startDate").value;
  // 取得結束日期
  const endDate = document.querySelector("#endDate").value;
  // 取得會員id
  const emailid = 1;

  // POST 請求 (新增旅行計畫)
  axios
    .post(`http://localhost:8080/buildPlan/buildPlan`, {
      sch_name: planName,
      start_date: startDate,
      end_date: endDate,
      emailid: emailid,
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
