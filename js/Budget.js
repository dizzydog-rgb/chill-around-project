// <---------------------- Get userbudget ---------------------->
import axios from 'axios';

const emailid = localStorage.getItem("emailid");
console.log("emailid:", emailid);
// const token = localStorage.getItem('token');
// if (!token) {
//     alert("請先登入");
//     window.location.href = 'index.html';
// }

// localStorage.setItem("scheduleId", "3");
const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);

// 新增功能所需的 localstorage
document.querySelector('.increaseBtn').addEventListener('click', () => {
    localStorage.setItem('Adding', true);
    window.location.href = 'popupBudget.html';
});

// Logo 圖片
const logoMapping = {
    交通: '../assets/images/Budget_Item/Budget/commute.png',
    住宿: '../assets/images/Budget_Item/Budget/rest.png',
    飲食: '../assets/images/Budget_Item/Budget/food.png',
    活動: '../assets/images/Budget_Item/Budget/activity_ticket.png',
    娛樂: '../assets/images/Budget_Item/Budget/entertainment.png',
    購物: '../assets/images/Budget_Item/Budget/shopping.png',
    保險: '../assets/images/Budget_Item/Budget/insurance.png',
    行李: '../assets/images/Budget_Item/Budget/travel_luggage_and_bags.png',
    小費: '../assets/images/Budget_Item/Budget/tips.png',
    健康: '../assets/images/Budget_Item/Budget/medication_liquid.png',
    雜項: '../assets/images/Budget_Item/Budget/unexpectable.png',
    回程: '../assets/images/Budget_Item/Budget/back_home.png',
    其他: '../assets/images/Budget_Item/Budget/others.png',
};

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

        userBudgetItems.sort((a, b) => new Date(a.BudgetDate) - new Date(b.BudgetDate));
        console.log("歷史區要渲染的資料", userBudgetItems)


        userBudgetItems.forEach(item => {
            // const itemDate = item.BudgetDate.substring(0, 10).replace(/-/g, '/');
            const itemDate = new Date(item.BudgetDate);
            const formattedDate = itemDate.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');

            if (formattedDate !== currentDate) {
                // 若日期不相等，就創建新的 dayHistory DIV
                currentDate = formattedDate;
                dayHistoryDiv = document.createElement('div');
                dayHistoryDiv.className = 'dayHistory';
                dayHistoryDiv.innerHTML = `<span class="historyDate">${currentDate}</span>`;
                historyContainer.appendChild(dayHistoryDiv);
            }

            const logoPath = logoMapping[item.BudgetName];
            // console.log('在這!!!!!!!!',logoPath)
            const historyContentDiv = document.createElement('div');
            historyContentDiv.className = 'historyContent';
            historyContentDiv.setAttribute('data-budget-id', item.Budget_id);
            historyContentDiv.innerHTML = `
                <img src="${logoPath}">
                <span class="leftCategory">${item.BudgetName} ${item.BudgetDetails}</span>
                <span class="unpaid">${item.PaidStatus === 0 ? '未付' : ''}</span>
                <span class="rightMoney">${item.Cost}</span>
            `;
            dayHistoryDiv.appendChild(historyContentDiv);

            // ---------------------------------------------------- 點擊事件 - 進入編輯
            historyContentDiv.addEventListener('click', () => {
                const UserChooseDiv = item;
                localStorage.setItem("UserChooseDiv", JSON.stringify(UserChooseDiv));
                window.location.href = '../pages/popupBudget.html';
            });

            document.querySelector('.increaseBtn').addEventListener('click', () => {
                localStorage.removeItem("UserChooseDiv");
                window.location.href = '../pages/popupBudget.html';
            });
        });

        // ---------------------------------------------------- 渲染總額、已付和未付區
        // 獲得行程頁面的 行程名稱


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
                                <span>Total Cost</span>
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
            const logoPath = logoMapping[item.BudgetName];

            if (CompareCategory !== BudgetName) {
                CompareCategory = BudgetName;

                const categoryHistoryDiv = document.createElement('div');
                categoryHistoryDiv.className = 'categoryHistory';
                categoryHistoryDiv.innerHTML = `
                            <img src="${logoPath}">
                            <span>${BudgetName}</span>
                            <span class="Money">NT$ ${item.TotalByBudgetName}</span>
                `
                categoryDiv.appendChild(categoryHistoryDiv);
                // console.log("目前的coding位置 ---", categoryDiv)
            }
        });

        // 取得現在位於哪個行程
        axios.get(`http://localhost:8080/buildPlan/editPlan/${currentScheduleId}`)
            .then(function (editPlanResponse) {
                const sch_name = editPlanResponse.data[0].sch_name;
                const backLink = document.querySelector('a[href="./editPlan.html"]');
                if (backLink) {
                    backLink.textContent = `返回編輯計畫 <${sch_name}>`;
                }
            })
    }).catch(function (error) {
        console.error("獲取資料時發生錯誤:", error);
    });