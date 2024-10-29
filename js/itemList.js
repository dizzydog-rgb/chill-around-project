import axios from "axios";
localStorage.setItem("scheduleId", "2");
const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);

const progresscheckboxes = []; // 全局進度框數組
window.addEventListener('load', () => {
    const savedProgress = localStorage.getItem('progressPercentage');
    if (savedProgress) {
        const progress = document.getElementById('progress-bar');
        progress.style.width = savedProgress + '%';
    }
});


axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
    .then(response => {
        console.log(response.data.UseritemList);
        const ItemName = response.data.CategoryPreparedTotal.map(item => item.ItemName);
        const PreparedTotalQuantity = response.data.CategoryPreparedTotal.map(item => item.PreparedTotalQuantity);
        // console.log(PreparedTotalQuantity);
        const TotalByitemName = response.data.CategoryTotal.map(item => item.TotalByitemName);
        // console.log(TotalByitemName);

        // ------------------ 右方物品大種類增渲染，生出大種類卡片後，點擊卡片會顯示出對應的種類細項在中間 ------------------
        const cardContainer = document.querySelector('.cardRow');
        cardContainer.innerHTML = "";

        // const checkboxes = []; // 要獲取進度條所勾選的總量

        // 迴圈生成卡片
        ItemName.forEach((ItemName, index) => {
            console.log('迴圈跑出sch_id有的大種類', ItemName)

            // 創建 .col-md-4 和 .cardOut 容器
            const cardOut = document.createElement('div');
            cardOut.classList.add('col-md-4', 'col-4', 'mb-3', 'cardOut');
            const card = document.createElement('div');
            card.classList.add('card');

            // console.log(PreparedTotalQuantity)

            // 設置卡片內容
            card.innerHTML = `
            <button class="rightDelete">–</button>
            <img src="../assets/images/Budget_Item/Items/clothes.png" class="cardImg" alt="卡片圖片">
            <div class="card-body" data-item-name="${ItemName}">
                <span>${ItemName}</span>
                <span>${PreparedTotalQuantity[index]} / ${TotalByitemName[index] || 0}</span>
            </div>
    `
            // 將卡片添加到容器中
            cardOut.appendChild(card);
            cardContainer.appendChild(cardOut);


            // ------------------ 物品細項渲染 ------------------
            card.addEventListener('click', () => {
                // 獲取所有對應 itemName 的 ItemDetails
                console.log(response.data.UseritemList)
                const details = response.data.UseritemList
                    .filter(i => i.ItemName === ItemName) // ItemName 是否與當前的 itemName，取得點擊的那個
                    .map(i => i.ItemDetails);

                const selectedQuantity = response.data.UseritemList
                    .filter(i => i.ItemName === ItemName)
                    .map(i => i.Quantity);

                const itemPrepared = response.data.UseritemList
                    .filter(i => i.ItemName === ItemName)
                    .map(i => i.PrepareStatus);

                const Category = response.data.UseritemList
                    .filter(i => i.ItemName === ItemName)
                    .map(i => i.ItemName);
                console.log('hshsr', Category[0])

                // console.log(Quantity);
                // console.log(`ItemDetails for ${ItemName}:`, details);

                // 渲染中間區，使用者所選的大種類
                const CategoryTextElement = document.querySelector('.categoryText');
                if (Category) {
                    CategoryTextElement.textContent = Category[0];
                }

                const categoryContainer = document.querySelector('.categoryContainer');
                categoryContainer.innerHTML = ''; // 清空內容

                userItems.forEach(selectedItem => {

                    const detailElement = document.createElement('div');
                    detailElement.classList.add('categoryContent');

                    const detail = selectedItem.ItemDetails;
                    const Quantity = selectedItem.Quantity || 0;
                    const PrepareStatus = selectedItem.PrepareStatus;
                    const itemListId = selectedItem.ItemList_id;

                    detailElement.innerHTML = `
                        <input type="checkbox" class="checkBOX left" ${PrepareStatus === 1 ? "checked" : ""}>
                        <span class="itemContent left">${detail}</span>
                        <input type="number" class="itemQuantity right" min="1" value="${Quantity}">
                        <button class="leftDelete right">–</button>
                    `;

                    // 刪除功能
                    const deleteButton = detailElement.querySelector('.leftDelete');
                    deleteButton.addEventListener('click', () => {
                        deleteItem(itemListId);
                    });

                    // 加上ItemList_id
                    detailElement.setAttribute('data-item-list-id', selectedItem.ItemList_id);
                    categoryContainer.appendChild(detailElement);

                    const checkbox = detailElement.querySelector('.checkBOX');
                    progresscheckboxes.push(checkbox); // 將每個勾選框添加到數組中

                    // // ------------------ 進度條勾選 ------------------
                    // // 收集 checkbox 元素
                    // const checkbox = detailElement.querySelector('.checkBOX');
                    // checkboxes.push(checkbox);

                    // checkboxes.forEach(checkbox => {
                    //     checkbox.addEventListener('change', updateProgress);
                    // })

                    // updateProgress();
                });
            });
            // function updateProgress() {
            //     const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length;
            //     const progressPercentage = (checkedCount / checkboxes.length) * 100;
            //     const progress = document.getElementById('progress-bar');
            //     progress.style.width = progressPercentage + '%';
            // }

            // 右方大種類新增按鈕 POST
            // axios.post(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
            //     .then(response => {
            //         rightBtn = document.querySelector('.rightBtn');
            //         rightBtn.addEventListener('click', () => {
            //             console.log('HIIIII !!!!!!!')
            //         });
            //     })
        })
    }).catch(error => {
        console.error("Error fetching data:", error);
    })



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
