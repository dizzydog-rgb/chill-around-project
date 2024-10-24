// <---------------------- Get userbudget ---------------------->

import axios from 'axios';

// localStorage.setItem("scheduleId", "3");
const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);

// 新增功能所需的 localstorage
document.querySelector('.increaseBtn').addEventListener('click', () => {
    localStorage.setItem('Adding', true);
    window.location.href = 'Popup_Budget.html';
});

axios.get(`http://localhost:8080/budget/UserBudget/${currentScheduleId}`)
    .then(function (response) {
        console.log("總資料:", response.data);

        // ---------------------------------------------------- 渲染歷史紀錄區
        const historyContainer = document.querySelector('.historyDiv');
        historyContainer.innerHTML = ''; // 清空歷史紀錄

        // 追蹤當前的日期，以便在遇到新的日期時生成新的 .dayHistory DIV
        let currentDate = '';
        let dayHistoryDiv;

        // 假設 response.data 可能是陣列，如果只返回單一物件，則應該處理這一情況
        const budgetItems = Array.isArray(response.data) ? response.data : [response.data];
        const userBudgetItems = budgetItems[0].UserBudget;
        console.log("歷史區要渲染的資料", userBudgetItems)

        userBudgetItems.forEach(item => {
            const itemDate = item.BudgetDate.substring(0, 10).replace(/-/g, '/');
            // console.log("Formatted Date: ", itemDate);

            if (itemDate !== currentDate) {
                // 若日期不相等，就創建新的 dayHistory DIV
                currentDate = itemDate;

                dayHistoryDiv = document.createElement('div');
                dayHistoryDiv.className = 'dayHistory';
                dayHistoryDiv.innerHTML = `<span class="historyDate">${currentDate}</span>`;
                historyContainer.appendChild(dayHistoryDiv);
            }

            const historyContentDiv = document.createElement('div');
            historyContentDiv.className = 'historyContent';
            historyContentDiv.setAttribute('data-budget-id', item.Budget_id);
            historyContentDiv.innerHTML = `
                <img src="../assets/images/Budget_Item/Items/clothes.png">
                <span class="leftCategory">${item.BudgetName} ${item.BudgetDetails}</span>
                <span class="unpaid">${item.PaidStatus === 0 ? '未付' : ''}</span>
                <span class="rightMoney">${item.Cost}</span>
            `;
            dayHistoryDiv.appendChild(historyContentDiv);

            // ---------------------------------------------------- 點擊事件 - 進入編輯
            historyContentDiv.addEventListener('click', () => {
                const UserChooseDiv = item;
                localStorage.setItem("UserChooseDiv", JSON.stringify(UserChooseDiv));
                window.location.href = '../pages/Popup_Budget.html';
            });

            document.querySelector('.increaseBtn').addEventListener('click', () => {
                localStorage.removeItem("UserChooseDiv");
                window.location.href = '../pages/Popup_Budget.html';
            });
        });

        // ---------------------------------------------------- 渲染總額、已付和未付區
        const TotalAndifPaid = budgetItems[0].TotalAndifPaid;
        console.log("總額、已付和未付資料", TotalAndifPaid);
        // console.log("這是總額", TotalAndifPaid[0].TotalCost)

        const rightbarDivContainer = document.querySelector('.rightbarDiv');
        rightbarDivContainer.innerHTML = '';

        const ringProtectDiv = document.createElement('div');
        ringProtectDiv.className = 'ringProtect';
        ringProtectDiv.innerHTML = `
                    <div class="ringProtect">
                        <div class="circle-ring">
                            <span>NT $${TotalAndifPaid[0].TotalCost}</span>
                            <span>Total cost</span>
                        </div>
                        <div class="paid">
                            <div>
                                <span>未付金額</span>
                                <br>
                                <span>NT$${TotalAndifPaid[0].TotalUnpaid}</span>
                            </div>
                            <div>
                                <span>已付金額</span>
                                <br>
                                <span>NT$${TotalAndifPaid[0].TotalPaid}</span>
                            </div>
                        </div>
                    </div>
        `
        rightbarDivContainer.appendChild(ringProtectDiv);


        // ---------------------------------------------------- 渲染大種類總額區
        const CategoryCost = budgetItems[0].CategoryCost;
        console.log("大種類總額資料", CategoryCost);

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'categoryDiv';
        rightbarDivContainer.appendChild(categoryDiv);

        let CompareCategory = '';

        CategoryCost.forEach(item => {
            const BudgetName = item.BudgetName;

            if (CompareCategory !== BudgetName) {
                CompareCategory = BudgetName;

                const categoryHistoryDiv = document.createElement('div');
                categoryHistoryDiv.className = 'categoryHistory';
                categoryHistoryDiv.innerHTML = `
                            <img src="../assets/images/Budget_Item/Items/clothes.png">
                            <span>${BudgetName}</span>
                            <span class="Money">NT$ ${item.TotalByBudgetName}</span>
                `
                categoryDiv.appendChild(categoryHistoryDiv);
                // console.log("目前的coding位置 ---", categoryDiv)

            }
        });
    }).catch(function (error) {
        console.error("獲取資料時發生錯誤:", error);
    });