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
      console.log("行程點已新增:", response.data);
      currentModal.style.display = "none"; // 關閉 Modal
      location.reload(); // 刷新頁面
    })
    .catch(function (error) {
      console.log("新增行程點時發生錯誤:", error);
    });
});
