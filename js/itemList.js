import axios from "axios";
localStorage.setItem("scheduleId", "2");
const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);

axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
    .then(response => {
        console.log(response.data.UseritemList);
        const ItemName = response.data.CategoryPreparedTotal.map(item => item.ItemName);
        // console.log(ItemName);
        const PreparedTotalQuantity = response.data.CategoryPreparedTotal.map(item => item.PreparedTotalQuantity);
        // console.log(PreparedTotalQuantity);
        const TotalByitemName = response.data.CategoryTotal.map(item => item.TotalByitemName);
        // console.log(TotalByitemName);

        // ------------------ 物品大種類增渲染 ------------------
        const cardContainer = document.querySelector('.cardRow');
        cardContainer.innerHTML = "";
        // 迴圈生成卡片
        ItemName.forEach((ItemName, index) => {
            console.log(ItemName)

            // 創建 .col-md-4 和 .cardOut 容器
            const cardOut = document.createElement('div');
            cardOut.classList.add('col-md-4', 'col-4', 'mb-3', 'cardOut');
            const card = document.createElement('div');
            card.classList.add('card');

            // 設置卡片內容
            card.innerHTML = `
            <button class="rightDelete">–</button>
            <img src="../assets/images/Budget_Item/Items/clothes.png" class="cardImg" alt="卡片圖片">
            <div class="card-body" data-item-name="${ItemName}">
                <span>${ItemName}</span>
                <span>${PreparedTotalQuantity[index] || 0} / ${TotalByitemName[index] || 0}</span>
            </div>
    `
            // 將卡片添加到容器中
            cardOut.appendChild(card);
            cardContainer.appendChild(cardOut);

            // ------------------ 物品細項渲染 ------------------
            card.addEventListener('click', () => {
                // 獲取所有對應 itemName 的 ItemDetails
                const details = response.data.UseritemList
                    .filter(i => i.ItemName === ItemName) // ItemName 是否與當前的 itemName，取得點擊的那個
                    .map(i => i.ItemDetails);

                const Quantity = response.data.UseritemList
                    .filter(i => i.Quantity === Quantity) // ItemName 是否與當前的 itemName，取得點擊的那個
                    .map(i => i.Quantity);

                // console.log(Quantity);
                // console.log(`ItemDetails for ${ItemName}:`, details);

                const categoryContainer = document.querySelector('.categoryContainer'); // 確保這裡選擇正確的容器
                categoryContainer.innerHTML = ''; // 清空內容

                details.forEach(detail => {
                    const detailElement = document.createElement('div');
                    detailElement.classList.add('categoryContent'); // 確保每個細節都有類別
                    detailElement.innerHTML = `
                        <input type="checkbox" class="checkBOX left">
                        <span class="itemContent left">${detail}</span>
                        <input type="number" class="itemQuantity right" min="1" value="1">
                        <button class="leftDelete right">–</button>
    `;
                    categoryContainer.appendChild(detailElement); // 將新的細節元素添加到容器中
                });
            });
        })
    }).catch(error => {
        console.error("Error fetching data:", error);
    })

// ------------------ 進度條勾選 ------------------
const checkboxes = document.querySelectorAll('.checkBOX');
const progress = document.getElementById('progress-bar');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});
export function updateProgress() {
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progressPercentage = (checkedCount / checkboxes.length) * 100;
    progress.style.width = progressPercentage + '%';
}

// ------------------ 輸入框彈出並增加物品細項 ------------------
export function addItem() {
    // 彈出輸入框
    const userInput = prompt("請輸入物品內容:");

    // 確保用戶有輸入內容
    if (userInput) {
        const categoryContainer = document.querySelector('.categoryContainer');

        // 創建一個新元素顯示用戶輸入選擇的種類
        const newItemDiv = document.createElement('div');
        newItemDiv.classList.add('categoryContent');

        // 組合新的內容
        newItemDiv.innerHTML = `
            <input type="checkbox" class="checkBOX left">
            <span class="itemContent left">${userInput}</span>
            <input type="number" class="itemQuantity right" min="1" value="1">
            <button class="leftDelete right">–</button>
        `;

        // 將新項目添加到畫面上
        categoryContainer.appendChild(newItemDiv);
    } else {
        alert("您沒有輸入任何文字。");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('leftBtn').addEventListener('click', addItem);
});
