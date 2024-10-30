// 10/29 有返回版本

import axios from "axios";
localStorage.setItem("scheduleId", "2");
const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);

const progresscheckboxes = []; // 全局進度框數組
const progressStates = {}; // 儲存每個物品的勾選狀態

window.addEventListener('load', () => {
    const savedProgress = localStorage.getItem('progressPercentage');
    if (savedProgress) {
        const progress = document.getElementById('progress-bar');
        progress.style.width = savedProgress + '%';
    }
});

axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
    .then(response => {

        const userItemList = response.data.UseritemList;

        const cardContainer = document.querySelector('.cardRow');
        cardContainer.innerHTML = "";

        // 迴圈生成種類卡片 // 分組 ItemName 並計算總量
        const groupedItems = userItemList.reduce((acc, item) => {
            if (acc[item.ItemName]) {
                acc[item.ItemName].Total += item.Quantity;
                if (item.PrepareStatus === 1) {
                    acc[item.ItemName].Quantity += item.Quantity;
                }
            } else {
                acc[item.ItemName] = {
                    ItemName: item.ItemName,
                    Total: item.Quantity,
                    Quantity: item.PrepareStatus === 1 ? item.Quantity : 0,
                    Icategory_id: item.Icategory_id
                };
            }
            return acc;
        }, {});

        const logoMapping = {
            服飾類: '../assets/images/Budget_Item/Items/apparel.png',
            個人護理類: '../assets/images/Budget_Item/Items/self_care.png',
            電子產品類: '../assets/images/Budget_Item/Items/electronic_cable.png',
            文件類: '../assets/images/Budget_Item/Items/files.png',
            金錢類: '../assets/images/Budget_Item/Items/payments.png',
            健康類: '../assets/images/Budget_Item/Items/health.png',
            旅行配件類: '../assets/images/Budget_Item/Items/travel_equipment.png',
            飲食類: '../assets/images/Budget_Item/Items/food.png',
            娛樂類: '../assets/images/Budget_Item/Items/playing.png',
            安全類: '../assets/images/Budget_Item/Items/safe.png',
            戶外活動類: '../assets/images/Budget_Item/Items/outdoor.png',
            小型工具類: '../assets/images/Budget_Item/Items/tools.png',
            清潔用品類: '../assets/images/Budget_Item/Items/clean.png',
            育兒類: '../assets/images/Budget_Item/Items/child_care.png',
            攝影設備類: '../assets/images/Budget_Item/Items/camera_equipment.png',
            旅行資料類: '../assets/images/Budget_Item/Items/files.png',
            家具類: '../assets/images/Budget_Item/Items/capable_furniture.png',
            其他類: '../assets/images/Budget_Item/Items/others.png',
        };

        const uniqueItems = Object.values(groupedItems);

        // ------------------ 渲染右方種類卡片D ------------------
        uniqueItems.forEach((item, index) => {
            const cardOut = document.createElement('div');
            cardOut.classList.add('col-md-4', 'col-4', 'mb-3', 'cardOut');
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = `card-${item.Icategory_id}`;

            const logoPath = logoMapping[item.ItemName];
            card.innerHTML = `
                <button class="rightDelete">–</button>
                <img src="${logoPath}" class="cardImg" alt="卡片圖片">
                <div class="card-body" data-item-name="${item.ItemName}">
                    <span>${item.ItemName}</span>
                    <span>${item.Quantity} / ${item.Total}</span>
                </div>
            `;

            cardOut.appendChild(card);
            cardContainer.appendChild(cardOut);


            // ------------------------------------------------------------- 10/30下午還在做這裡
            // card.addEventListener('click', () => {
            //     sessionStorage.setItem('selectedCardIndex', item.Icategory_id);
            //     location.reload(); 
            //     console.log(item.Icategory_id)
            // });
            // window.addEventListener('load', () => {
            //     const selectedIndex = sessionStorage.getItem('selectedCardIndex');
            //     if (selectedIndex !== null) {
            //         const cardToHighlight = document.getElementById(`card-${selectedIndex}`); // 根据索引找到卡片
            //         if (cardToHighlight) {
            //             cardToHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            //             cardToHighlight.classList.add('highlight'); // 添加高亮样式
            //         }
            //         sessionStorage.removeItem('selectedCardIndex'); // 清除索引
            //     }
            // });

            // ------------------ 刪除：整個大種類 ------------------
            function deleteAllcategory(itemName, Icategory_id) {
                if (confirm(`刪除${itemName}及其所有細項嗎？`)) {
                    axios.delete(`http://localhost:8080/item/Useritem/${currentScheduleId}/category/${Icategory_id}`)
                        .then(response => {
                            console.log('刪除成功', response.data);
                            // 從 DOM 中移除該種類卡片
                            const cardToRemove = document.querySelector(`.card-body[data-item-name="${itemName}"]`).closest('.cardOut');
                            if (cardToRemove) {
                                cardToRemove.remove();
                            }
                        })
                        .catch(error => {
                            console.error('刪除失敗', error);
                        });
                }
            }

            // 大種類刪除功能
            const deleteButton = card.querySelector('.rightDelete');
            deleteButton.addEventListener('click', () => {
                console.log('hiiiiiiiiiii')
                deleteAllcategory(item.ItemName, item.Icategory_id);
            });

            // ------------------ 物品細項渲染 ------------------
            card.addEventListener('click', () => {

                const clickedItemName = item.ItemName;
                const Icategory_id = item.Icategory_id;
                console.log(clickedItemName)

                const userItems = response.data.UseritemList.filter(i => i.ItemName === clickedItemName);

                // 渲染中間區，使用者所選的大種類
                const CategoryTextElement = document.querySelector('.categoryText');
                console.log(clickedItemName)
                if (clickedItemName) {
                    CategoryTextElement.textContent = clickedItemName;
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

                    // 進度條更新狀態
                    const isChecked = progressStates[itemListId] !== undefined ? progressStates[itemListId] : (PrepareStatus === 1);

                    detailElement.innerHTML = `
                        <input type="checkbox" class="checkBOX left" ${PrepareStatus === 1 ? "checked" : ""}></input>
                        <span class="itemContent left">${detail}</span>
                        <input type="number" class="itemQuantity right" min="1" value="${Quantity}">
                        <button class="leftDelete right">–</button>
                    `;

                    // ------------------ 刪除：物品細項 ------------------
                    const deleteButton = detailElement.querySelector('.leftDelete');
                    deleteButton.addEventListener('click', () => {
                        deleteItem(itemListId);
                    });

                    // 加上ItemList_id
                    detailElement.setAttribute('data-item-list-id', selectedItem.ItemList_id);
                    categoryContainer.appendChild(detailElement);

                    const checkbox = detailElement.querySelector('.checkBOX');
                    progresscheckboxes.push(checkbox); // 將每個勾選框添加到數組中

                    checkbox.addEventListener('change', () => {
                        updateProgress();
                        updateData(detailElement);
                        updateCardQuantity(item);
                    });
                    detailElement.querySelector('.itemQuantity').addEventListener('input', () => {
                        updateProgress();
                        updateData(detailElement);
                        updateCardQuantity(item);
                    });
                });

                // 勾選後進度條更新
                function updateProgress() {
                    // 確保計算的是所有勾選框的狀態
                    const totalCheckboxes = progresscheckboxes.length;
                    const checkedCount = progresscheckboxes.filter(checkbox => checkbox.checked).length;

                    const progressPercentage = totalCheckboxes > 0 ? (checkedCount / totalCheckboxes) * 100 : 0;
                    const progress = document.getElementById('progress-bar');
                    progress.style.width = progressPercentage + '%';

                    // 保存進度到 localStorage
                    localStorage.setItem('progressPercentage', progressPercentage);
                }

                // 勾選後畫面更新數字跳動
                function updateCardQuantity(item) {
                    const cardBody = card.querySelector('.card-body');
                    const totalQuantityElement = cardBody.querySelector('span:nth-child(2)'); // 找到顯示數量的 span
                    // 計算新的數量
                    // const checkedCount = progresscheckboxes.filter(checkbox => checkbox.checked).length;

                    // 根據勾選狀態計算新的顯示數量
                    const newQuantity = userItems.reduce((acc, curr) => {
                        // 如果勾選，則加上該項目的 Quantity，否則不加
                        if (progresscheckboxes[userItems.indexOf(curr)].checked) {
                            return acc + curr.Quantity;
                        }
                        return acc;
                    }, 0);

                    // 更新顯示
                    const totalCount = userItems.reduce((acc, curr) => acc + curr.Quantity, 0);
                    totalQuantityElement.textContent = `${newQuantity} / ${totalCount}`;
                }

                // ------------------ 編輯：物品細項 ------------------
                function updateData(detailElement) {
                    const itemListId = detailElement.getAttribute('data-item-list-id');
                    const checkbox = detailElement.querySelector('.checkBOX');
                    const quantityInput = detailElement.querySelector('.itemQuantity');

                    const dataToSend = {
                        PrepareStatus: checkbox.checked ? 1 : 0,
                        Quantity: parseInt(quantityInput.value, 10) || 0,

                        // 下面是使用者無法更新的資料
                        sch_id: currentScheduleId,
                        ItemList_id: itemListId,
                        ItemName: clickedItemName,
                        ItemDetails: detailElement.querySelector('.itemContent').textContent,
                        Total: ''
                    };
                    axios.put(`http://localhost:8080/item/Useritem/${currentScheduleId}`, dataToSend)
                        .then(response => {
                            console.log('更新成功', response.data);
                        })
                        .catch(error => {
                            console.error('更新失敗', error);
                        });
                };


                // ------------------ 增加 +：輸入框彈出並增加物品細項 ------------------
                const leftBtn = document.getElementById('leftBtn');
                leftBtn.removeEventListener('click', addItem);
                leftBtn.addEventListener('click', (() => {
                    const currentIcategory_id = Icategory_id; // 捕獲當前 Icategory_id
                    return () => addItem(currentIcategory_id, clickedItemName); // 使用捕獲的值
                })());

                function addItem(Icategory_id, clickedItemName) {
                    console.log('取到的', Icategory_id)
                    const userInput = prompt("請輸入物品內容:");
                    if (userInput) {

                        const dataToSend = {
                            PrepareStatus: 0,
                            Quantity: 1,
                            sch_id: currentScheduleId,
                            // ItemList_id: null,
                            ItemName: clickedItemName,
                            ItemDetails: userInput,
                            Total: '',
                            Icategory_id: Icategory_id
                        }
                        console.log('要發的數據:', dataToSend);
                        axios.post(`http://localhost:8080/item/Useritem/${currentScheduleId}/details`, dataToSend)
                            .then(response => {
                                console.log('新增成功', response.data);
                                window.location.href = './itemList.html';
                            })
                            .catch(error => {
                                console.error('新增失敗', error);
                            });
                    } else { alert("您沒有輸入任何文字。"); }
                }

                // ------------------ 刪除 func：物品細項 ------------------
                function deleteItem(itemListId) {
                    if (confirm("您確定要刪除這個項目嗎？")) {
                        console.log('有抓到嗎?????', itemListId)
                        axios.delete(`http://localhost:8080/item/Useritem/${currentScheduleId}/${itemListId}`)
                            .then(response => {
                                console.log('刪除成功', response.data);

                                const detailElement = document.querySelector(`[data-item-list-id="${itemListId}"]`);
                                if (detailElement) {
                                    detailElement.remove();
                                }
                            })
                            .catch(error => {
                                console.error('刪除失敗', error);
                            });
                    }
                }
            })
        })

        // let updateInterval;
        // function startAutoUpdate(detailElement) {
        //     // 如果已有定時器，先清除
        //     if (updateInterval) {
        //         clearInterval(updateInterval);
        //     }

        //     // 每5秒自動更新一次
        //     updateInterval = setInterval(() => {
        //         updateData(cardContainer);
        //     }, 5000);
        // }
    })
    .catch(error => {
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
