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

        // 創建一個新的元素來顯示用戶輸入的文字
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

// ------------------ 物品小視窗彈出選擇後，物品大種類增加在畫面上 ------------------
{/* <div id="selectedItemsDisplay"></div>

<div class="card-body">
    <span>衣物類</span>
    <span>5/10</span>
</div> */}

const categories = [
    "服飾類",
    "藥品類",
    "衛生類",
    "電子產品",
    "護照類",
    "食品類",
    "飲水器具",
    "睡袋類",
    "登山裝備",
    "旅行書籍",
    "相機類",
    "野餐用品",
    "保險文件",
    "清潔用品",
    "個人護理"
];

const cardContainer = document.querySelector('.cardRow');

// 迴圈生成卡片
categories.forEach((category, index) => {

    // 創建 .col-md-4 和 .cardOut 容器
    const cardOut = document.createElement('div');
    cardOut.classList.add('col-md-4', 'col-4', 'mb-3', 'cardOut');
  
    // 創建卡片元素
    const card = document.createElement('div');
    card.classList.add('card');

    // 設置卡片內容
    card.innerHTML = `
            <button class="rightDelete">–</button>
            <img src="../assets/images/Budget_Item/Items/clothes.png" class="cardImg" alt="卡片圖片">
            <div class="card-body">
                <span>${category}</span>
                <span>1/10</span>
            </div>
    `

    // 將卡片添加到容器中
    cardOut.appendChild(card);

    // 將 .cardOut 添加到 cardContainer 中
    cardContainer.appendChild(cardOut);
})
