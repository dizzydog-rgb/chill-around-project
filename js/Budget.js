// <---------------------- Get userbudget ---------------------->

import axios from 'axios';

console.log("皮卡：目前從 localStorage 取得: ------- ", localStorage.getItem("scheduleId"));
const currentScheduleId = localStorage.getItem("scheduleId");

axios.get(`http://localhost:8080/budget/UserBudget/${currentScheduleId}`)
    .then(function (response) {
        // console.log(response.data);

        const historyDiv = document.querySelector('.historyDiv');
        historyDiv.innerHTML = ''; // 清空歷史紀錄

        // 追蹤當前的日期，以便在遇到新的日期時生成新的 .dayHistory DIV
        let currentDate = '';
        let dayHistoryDiv;

        // 假設 response.data 可能是陣列，如果只返回單一物件，則應該處理這一情況
        const budgetItems = Array.isArray(response.data) ? response.data : [response.data];

        budgetItems.forEach(item => {
            const itemDate = item.BudgetDate.substring(0, 10).replace(/-/g, '/');

            if (itemDate !== currentDate) {
                // 新的日期，創建新的 dayHistory DIV
                currentDate = itemDate;

                dayHistoryDiv = document.createElement('div');
                dayHistoryDiv.className = 'dayHistory';
                dayHistoryDiv.innerHTML = `<span class="historyDate">${currentDate}</span>`;
                historyDiv.appendChild(dayHistoryDiv);
            }

            const historyContentDiv = document.createElement('div');
            historyContentDiv.className = 'historyContent';
            historyContentDiv.innerHTML = `
                <img src="../assets/images/Budget_Item/Items/clothes.png">
                <span class="leftCategory">${item.BudgetName} ${item.BudgetDetails}</span>
                <span class="unpaid">${item.PaidStatus === 0 ? '未付' : ''}</span>
                <span class="rightMoney">${item.Cost}</span>
            `;
            dayHistoryDiv.appendChild(historyContentDiv);
        });
    })
    .catch(function (error) {
        console.error("獲取資料時發生錯誤:", error);
    });