import axios from "axios";
// localStorage.setItem("scheduleId", "2");
const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);

axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
    .then(response => {
        const userItemList = response.data.UseritemList;
        // console.log(userItemList);
        const ItemName = response.data.CategoryPreparedTotal.map(item => item.ItemName);
        const PreparedTotalQuantity = response.data.CategoryPreparedTotal.map(item => item.PreparedTotalQuantity);
        // console.log('agfagf',PreparedTotalQuantity);
        const TotalByitemName = response.data.CategoryTotal.map(item => item.TotalByitemName);
        // console.log(TotalByitemName);

        // ------------------ 右方物品大種類增渲染，生出大種類卡片後，點擊卡片會顯示出對應的種類細項在中間 ------------------
        const cardContainer = document.querySelector('.cardRow');
        cardContainer.innerHTML = "";

        const checkboxes = []; // 要獲取進度條所勾選的總量

        // 迴圈生成卡片 // 分組 ItemName 並計算總量
        const groupedItems = userItemList.reduce((acc, item) => {
            if (acc[item.ItemName]) {
                // 如果 ItemName 已存在，累加 Total 和 Quantity
                acc[item.ItemName].Total += item.Quantity; // 累加所有的 Quantity
                if (item.PrepareStatus === 1) {
                    acc[item.ItemName].Quantity += item.Quantity; // 只累加 PrepareStatus = 1 的 Quantity
                }
            } else {
                // 否則，初始化一個新項目
                acc[item.ItemName] = {
                    ItemName: item.ItemName,
                    Total: item.Quantity, // 初始設置為當前項目的 Quantity
                    Quantity: item.PrepareStatus === 1 ? item.Quantity : 0 // 只有在 PrepareStatus = 1 時設置 Quantity
                };
            }
            return acc;
        }, {});

        // 將分組的物品轉換為陣列
        const uniqueItems = Object.values(groupedItems);

        uniqueItems.forEach(item => {
            // 創建 .col-md-4 和 .cardOut 容器
            const cardOut = document.createElement('div');
            cardOut.classList.add('col-md-4', 'col-4', 'mb-3', 'cardOut');
            const card = document.createElement('div');
            card.classList.add('card');

            // console.log(PreparedTotalQuantity)

            // 設置卡片內容
            //         card.innerHTML = `
            //         <button class="rightDelete">–</button>
            //         <img src="../assets/images/Budget_Item/Items/clothes.png" class="cardImg" alt="卡片圖片">
            //         <div class="card-body" data-item-name="${ItemName}">
            //             <span>${ItemName}</span>
            //             <span>${PreparedTotalQuantity[index]} / ${TotalByitemName[index] || 0}</span>
            //         </div>
            // `

            card.innerHTML = `
                <button class="rightDelete">–</button>
                <img src="../assets/images/Budget_Item/Items/clothes.png" class="cardImg" alt="卡片圖片">
                <div class="card-body" data-item-name="${item.ItemName}">
                    <span>${item.ItemName}</span>
                    <span>${item.Quantity} / ${item.Total}</span>
                </div>
                `;
            // 將卡片添加到容器中
            cardOut.appendChild(card);
            cardContainer.appendChild(cardOut);

            // ------------------ 物品細項渲染 ------------------
            card.addEventListener('click', () => {
                // 獲取所有對應 itemName 的 ItemDetails
                const clickedItemName = item.ItemName; // 確保從當前的 item 獲取 ItemName

                // 獲取所有對應 itemName 的 ItemDetails
                const details = response.data.UseritemList
                    .filter(i => i.ItemName === clickedItemName) // 使用 clickedItemName
                    .map(i => i.ItemDetails);

                const selectedQuantity = response.data.UseritemList
                    .filter(i => i.ItemName === clickedItemName)
                    .map(i => i.Quantity);

                const itemPrepared = response.data.UseritemList
                    .filter(i => i.ItemName === clickedItemName)
                    .map(i => i.PrepareStatus);
                console.log('hshsr', itemPrepared)

                // 渲染中間區，使用者所選的大種類

                const CategoryTextElement = document.querySelector('.categoryText');
                CategoryTextElement.textContent = clickedItemName; // 更新類別名稱

                // 渲染中間區，使用者所選的大種類，下方的種類細項
                const categoryContainer = document.querySelector('.categoryContainer'); // 確保這裡選擇正確的容器
                categoryContainer.innerHTML = ''; // 清空內容

                details.forEach((detail, index) => {
                    // console.log('HIIII',detail)
                    const detailElement = document.createElement('div');
                    detailElement.classList.add('categoryContent'); // 確保每個細節都有類別

                    const Quantity = selectedQuantity[index] || 0;
                    const PrepareStatus = itemPrepared[index];

                    detailElement.innerHTML = `
                        <input type="checkbox" class="checkBOX left" ${PrepareStatus === 1 ? "checked" : ""}>
                        <span class="itemContent left">${detail}</span>
                        <input type="number" class="itemQuantity right" min="1" value="${Quantity}">
                        <button class="leftDelete right">–</button>
    `;
                    categoryContainer.appendChild(detailElement); // 將新的細節元素添加到容器中

                    // 在這裡設置 button 的點擊事件
                    detailElement.querySelector('.categoryContent').addEventListener('click', () => {
                        console.log('checkbox!!!')
                        const checkbox = detailElement.querySelector('.checkBOX');
                        const quantityInput = detailElement.querySelector('.itemQuantity');

                        const dataToSend = {
                            PrepareStatus: checkbox.checked ? 1 : 0,
                            Quantity: parseInt(quantityInput.value, 10) // 確保轉換為整數
                        };

                        axios.put(`http://localhost:8080/item/Useritem/${currentScheduleId}`, dataToSend)
                            .then(response => {
                                console.log('更新成功', response.data);
                            })
                            .catch(error => {
                                console.error('更新失敗', error);
                            });
                    });
                    // // ------------------ 進度條勾選 ------------------
                    // 收集 checkbox 元素
                    const checkbox = detailElement.querySelector('.checkBOX');
                    checkboxes.push(checkbox);

                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', updateProgress);
                    })

                    updateProgress();
                });
            });
            function updateProgress() {
                const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length;
                const progressPercentage = (checkedCount / checkboxes.length) * 100;
                const progress = document.getElementById('progress-bar');
                progress.style.width = progressPercentage + '%';
            }

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
