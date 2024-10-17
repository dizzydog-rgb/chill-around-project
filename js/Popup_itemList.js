//              測試時讓modal保持開啟
function openModal() {
    document.getElementById('overlay').classList.add('active');
    document.getElementById('modal').classList.add('active');
}
document.addEventListener('DOMContentLoaded', openModal);


//              使用者點擊後下拉出選項並可以選取
export function toggleSelection(element) {
    element.classList.toggle('selected');
    // alert(element.textContent);
}
// document.querySelectorAll('.category').forEach(category => {
//     category.addEventListener('click', () => toggleSelection(category));
// });

// function confirmSelection() {
//     const selectedCategories = Array.from(document.querySelectorAll('.category.selected'))
//         .map(cat => cat.textContent)
//         .join(', ');

//     alert('已選擇類別: ' + selectedCategories);
// }


//              點擊遮罩也可以關閉視窗
// document.getElementById('overlay').addEventListener('click', closeModal);

// ------------------ 儲存使用者所選的種類並帶到itemList頁面上 ------------------
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
             alert('取消'+itemName);
        } else {
            selectedItems.push(itemName);
            category.classList.add('selected'); // 添加選擇樣式
            alert('選取'+itemName);
        }
    });
});

// 確認按鈕事件
document.getElementById('okBtn').addEventListener('click', () => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems)); // 儲存選擇的項目
    window.location.href = './itemList.html'; // 跳轉到另一個頁面
});

