const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得: ------- ", currentScheduleId);
// const currentAdding = localStorage.getItem("Adding");
// console.log("有取到新增按鈕資料嗎", currentAdding)
import axios from 'axios';

axios.get('http://localhost:8080/item/popupItem')
    // -------------------------------------------------- Popupitem 預算種類渲染及點擊事件
    .then(response => {
        console.log(response.data)

        if (Array.isArray(response.data)) {
            const categoryDivContainer = document.querySelectorAll('.categoryDiv');
            categoryDivContainer.innerHTML = '';

            response.data.forEach(item => {
                // console.log(item.ItemName);
                categoryDivContainer.innerHTML = `
                    <div class="category">${item.ItemName}</div>
                `;
            });
        }
        // ------------------ 種類點擊事件 ------------------
        // 選擇項目數組
        const selectedItems = [];
        // 獲取所有類別
        const categories = document.querySelectorAll('.category');
        // 為每個類別添加點擊事件
        categories.forEach(category => {
            category.addEventListener('click', () => {
                // 添加或移除選擇
                const itemName = category.textContent;
                if (selectedItems.includes(itemName)) {
                    selectedItems.splice(selectedItems.indexOf(itemName), 1);
                    category.classList.remove('selected'); // 移除選擇樣式
                } else {
                    selectedItems.push(itemName);
                    category.classList.add('selected'); // 添加選擇樣式
                    // alert('選取' + itemName);
                }
            });
        });

        // 確認按鈕事件
        document.getElementById('okBtn').addEventListener('click', () => {
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems)); // 儲存選擇的項目
            window.location.href = './itemList.html'; // 跳轉到另一個頁面
        });
    });


//              讓modal保持開啟
function openModal() {
    document.getElementById('overlay').classList.add('active');
    document.getElementById('modal').classList.add('active');
}
document.addEventListener('DOMContentLoaded', openModal);

//              點擊遮罩也可以關閉視窗
// document.getElementById('overlay').addEventListener('click', closeModal);
