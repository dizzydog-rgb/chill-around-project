import axios from "axios";

const emailid = localStorage.getItem("emailid");
// console.log("emailid:", emailid);
// const token = localStorage.getItem('token');
//     if (!token) {
//         alert("請先登入");
//         window.location.href = 'index.html';
//         // return;
//     }

// localStorage.setItem("scheduleId", "2");
const currentScheduleId = localStorage.getItem("scheduleId");
// console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ", currentScheduleId);


axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
    .then(response => {
        const userItemList = response.data.UseritemList;
        const cardContainer = document.querySelector('.cardRow');
        cardContainer.innerHTML = "";

        // 迴圈生成種類卡片 // 分組 ItemName 並計算總量
        const groupedItems = userItemList.reduce((acc, item) => {
            if (acc[item.ItemName]) {
                // 累加數量和總量
                acc[item.ItemName].Total += item.Quantity;
                if (item.PrepareStatus === 1) {
                    acc[item.ItemName].Quantity += item.Quantity;
                }
                // 把新的 ItemList_id 加入數組中
                if (!acc[item.ItemName].ItemList_ids.includes(item.ItemList_id)) {
                    acc[item.ItemName].ItemList_ids.push(item.ItemList_id);
                }
            } else {
                // 初始化該 ItemName 並把第一個 ItemList_id 放進數組
                acc[item.ItemName] = {
                    ItemName: item.ItemName,
                    Total: item.Quantity,
                    Quantity: item.PrepareStatus === 1 ? item.Quantity : 0,
                    Icategory_id: item.Icategory_id, // 代表種類的 Icategory_id
                    ItemList_ids: [item.ItemList_id] // 每個細項的 ItemList_id
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
        console.log('原本抓的 uniqueItems', uniqueItems)

        // ------------------ 渲染右方種類卡片 ------------------
        uniqueItems.forEach(item => renderCard(item));
        console.log('更改後的uniqueItems', uniqueItems)

        function renderCard(item, itemName) {
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

            // ------------------ 刪除：整個種類 ------------------
            const deleteButton = card.querySelector('.rightDelete');
            deleteButton.addEventListener('click', () => deleteAllCategory(item.ItemName, item.Icategory_id));

            // ------------------ 增加：物品細項 ------------------
            card.addEventListener('click', () => handleCardClick(item));

            updateCardQuantity(itemName);
        }

        // Function：刪除種類的axios
        function deleteAllCategory(itemName, Icategory_id) {
            if (confirm(`刪除${itemName}及其所有細項嗎？`)) {
                axios.delete(`http://localhost:8080/item/Useritem/${currentScheduleId}/category/${Icategory_id}`)
                    .then(response => {
                        // 刪除所有細項
                        const categoryContainer = document.querySelector('.categoryContainer');
                        const detailElements = categoryContainer.querySelectorAll('.categoryContent'); // 獲取所有細項

                        detailElements.forEach(detail => {
                            const itemListId = detail.getAttribute('data-item-list-id');

                            // 如果細項與 Icategory_id 一致，則細項元素刪除
                            if (Icategory_id === Icategory_id) { // 用等於來比對
                                detail.remove();
                                console.log('Removed detail with itemListId:', itemListId);
                            }
                        });

                        // 刪除類別卡片
                        const cardToRemove = document.querySelector(`.card-body[data-item-name="${itemName}"]`).closest('.cardOut');
                        if (cardToRemove) {
                            cardToRemove.remove();
                        }

                        // 等待 DOM 更新
                        setTimeout(() => {
                            updateProgress(); // 更新進度條
                        }, 100); // 略微延遲確保 DOM 已經更新
                    })
                    .catch(error => {
                        console.error('刪除失敗', error);
                    });
            }
        }

        // ------------------ 點擊右方種類卡後，細項部分的操作 ------------------
        // Function：物品細項相關功能，包括編輯更新、新增、刪除
        function handleCardClick(item, itemName) {
            const clickedItemName = item.ItemName;
            const Icategory_id = item.Icategory_id;

            sessionStorage.setItem('selectedCardId', Icategory_id);

            const categoryContainer = document.querySelector('.categoryContainer');
            categoryContainer.innerHTML = ''; // 清空内容

            const CategoryTextElement = document.querySelector('.categoryText');
            CategoryTextElement.textContent = clickedItemName;

            const userItems = response.data.UseritemList.filter(i => i.ItemName === clickedItemName);
            userItems.forEach(selectedItem => renderDetailItem(selectedItem, categoryContainer, clickedItemName));

            // 更新進度條
            updateProgress();

            // 其他功能，例如增加物品细項
            setupAddItemListener(Icategory_id, clickedItemName);

            // 加載編輯後的內容
            loadDetailsData(clickedItemName);
        }

        // Function：放在 handleCardClick() 裡的物品細項渲染，包含編輯和刪除的功能
        function renderDetailItem(selectedItem, categoryContainer, clickedItemName) {
            // console.log('Selected items in Category:', selectedItem);

            const detailElement = document.createElement('div');
            detailElement.classList.add('categoryContent');

            // 檢查使用哪個 ID
            const itemListId = selectedItem.ItemList_id || selectedItem.id; // 剛新增的和以前新增的id名不一樣，舊的會變成資料庫的ItemList_id
            detailElement.setAttribute('data-item-list-id', itemListId);
            // console.log('itemListId:', itemListId);

            const detail = selectedItem.ItemDetails;
            const Quantity = selectedItem.Quantity || 0;
            const PrepareStatus = selectedItem.PrepareStatus;
            // const itemListId = selectedItem.ItemList_id;
            // const itemListId = detailElement.getAttribute('data-item-list-id');

            detailElement.innerHTML = `
                <input type="checkbox" class="checkBOX left" ${PrepareStatus === 1 ? "checked" : ""}>
                <span class="itemContent left">${detail}</span>
                <input type="number" class="itemQuantity right" min="1" value="${Quantity}">
                <button class="leftDelete right">–</button>
            `;

            detailElement.setAttribute('data-item-list-id', itemListId);
            categoryContainer.appendChild(detailElement);

            // 刪除細項的click事件
            const deleteButton = detailElement.querySelector('.leftDelete');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // 防止事件冒泡
                console.log('嘗試刪除項 ID:', itemListId);
                deleteItem(itemListId);
                updateCardQuantity(clickedItemName);
            });

            // 編輯細項勾選的click事件
            const checkbox = detailElement.querySelector('.checkBOX');
            checkbox.addEventListener('change', () => {
                // console.log('嘗試更新項:', clickedItemName);
                updateData(detailElement, clickedItemName); // 調用更新的數據
                updateProgress();
                updateCardQuantity(clickedItemName);
            });

            // 編輯細項數量的click事件
            const quantityInput = detailElement.querySelector('.itemQuantity');
            quantityInput.addEventListener('input', () => {
                console.log('嘗試變更數量項:', quantityInput.value);
                updateData(detailElement, clickedItemName); // 調用更新的數據
                updateProgress();
                updateCardQuantity(clickedItemName); // 同步更新卡片數量顯示
            });

            return detailElement;
        }

        // Function：更新物品細項的axios
        function updateData(detailElement, clickedItemName) {
            const itemListId = detailElement.getAttribute('data-item-list-id');

            if (!itemListId) {
                console.error('無效的項目 ID，無法更新');
                return;
            }

            const checkbox = detailElement.querySelector('.checkBOX');
            const quantityInput = detailElement.querySelector('.itemQuantity');
            const newQuantity = parseInt(quantityInput.value, 10) || 0;

            const dataToSend = {
                PrepareStatus: checkbox.checked ? 1 : 0,
                // Quantity: parseInt(quantityInput.value, 10) || 0,
                Quantity: newQuantity,

                // 下面是使用者無法更新的資料
                sch_id: currentScheduleId,
                ItemList_id: itemListId,
                ItemName: clickedItemName,
                ItemDetails: detailElement.querySelector('.itemContent').textContent,
                Total: ''
            };

            // console.log('Updating item with ID:', itemListId);
            // console.log('Data to send for update:', dataToSend);

            axios.put(`http://localhost:8080/item/Useritem/${currentScheduleId}`, dataToSend)
                .then(response => {
                    // 確保從後端獲取的更新結果
                    const updatedItem = response.data; // 假設返回的數據就是更新後的 item
                    console.log('put 更新後的 成功訊息:', updatedItem);

                })
                .catch(error => {
                    console.error('更新失敗', error);
                });
        }

        // Function：用來獲取並渲染指定類別的所有細項
        function loadDetailsData(itemName) {
            axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
                .then(response => {
                    // console.log(response.data.UseritemList)
                    // console.log(itemName)

                    const categoryContainer = document.querySelector('.categoryContainer');
                    categoryContainer.innerHTML = ''; // 清空現有內容

                    // 根據 itemName 過濾用戶項目
                    const userItems = response.data.UseritemList.filter(item => item.ItemName === itemName);
                    userItems.forEach(selectedItem => renderDetailItem(selectedItem, categoryContainer, itemName));
                    // console.log(userItems)

                    // 更新進度條
                    updateProgress();
                })
                .catch(error => {
                    console.error('載入類別資料失敗', error);
                });
        }

        // Function：新增物品細項的click事件
        function setupAddItemListener(Icategory_id, clickedItemName) {
            const leftBtn = document.getElementById('leftBtn');
            leftBtn.onclick = () => addItemToServer(Icategory_id, clickedItemName);
        }

        // Function：新增物品細項的axios
        function addItemToServer(Icategory_id, clickedItemName) {
            const userInput = prompt("請輸入物品內容:");
            if (userInput) {
                const dataToSend = {
                    PrepareStatus: 0,
                    Quantity: 1,
                    sch_id: currentScheduleId,
                    ItemName: clickedItemName,
                    ItemDetails: [userInput],
                    Total: '',
                    Icategory_id: Icategory_id
                };

                axios.post(`http://localhost:8080/item/Useritem/${currentScheduleId}/details`, dataToSend)
                    .then(response => {
                        console.log('新增成功', response.data);

                        // 處理新增細項的響應
                        const newItem = response.data.data; // 確保這裡是從響應中正確獲取新項目
                        console.log('新增細項的響應', newItem)
                        const categoryContainer = document.querySelector('.categoryContainer');
                        console.log('newItem 的完整內容:', JSON.stringify(newItem, null, 2)); // 顯示完整結構

                        const detailElement = renderDetailItem(newItem, categoryContainer, clickedItemName);

                        updateDataImmediately(detailElement, newItem, clickedItemName);
                        updateProgress();
                    })
                    .catch(error => {
                        console.error('新增失敗', error);
                    });
            } else {
                alert("您沒有輸入任何文字。");
            }
        }

        // Function：新增物品細項後，立即更新資料的函數
        function updateDataImmediately(detailElement, newItem, clickedItemName) {
            // 確保正確綁定事件
            console.log('detailElement:', detailElement);
            console.log('Updating item with ID:', newItem.id);

            if (!detailElement) {
                console.error('無法獲取細項元素，無法更新');
                return;
            }

            const checkbox = detailElement.querySelector('.checkBOX');
            const quantityInput = detailElement.querySelector('.itemQuantity');

            if (!checkbox || !quantityInput) {
                console.error('無法獲取勾選框或數量輸入框，無法更新');
                return;
            }

            // 更新 uniqueItems 中的對應項目
            const itemToUpdate = uniqueItems.find(i => i.ItemList_id === newItem.id);

            // if (itemToUpdate) {
            //     itemToUpdate.Quantity = parseInt(quantityInput.value, 10) || 0;
            // }

            if (itemToUpdate) {
                // 更新數量
                itemToUpdate.Quantity = parseInt(quantityInput.value, 10) || 0;

                // 計算新的 PrepareStatus 和 Total
                const newTotal = itemToUpdate.Quantity;
                itemToUpdate.Total = newTotal;

                // 更新 groupedItems 中該 ItemName 的數據
                const groupedItem = groupedItems[itemToUpdate.ItemName];
                if (groupedItem) {
                    groupedItem.Total = groupedItem.Total - groupedItem.Quantity + itemToUpdate.Quantity;  // 更新總數
                    groupedItem.Quantity = itemToUpdate.PrepareStatus === 1 ? itemToUpdate.Quantity : 0;  // 更新準備狀態下的數量
                }
            }
            console.log('itemToUpdate', itemToUpdate)

            const dataToSend = {
                PrepareStatus: checkbox.checked ? 1 : 0,
                Quantity: parseInt(quantityInput.value, 10) || 0,
                sch_id: currentScheduleId,
                ItemList_id: newItem.id,
                ItemName: clickedItemName,
                ItemDetails: detailElement.querySelector('.itemContent').textContent,
                Total: ''
            };

            console.log('Data to send for update:', dataToSend);

            // 接下來是 axios 的調用
            axios.put(`http://localhost:8080/item/Useritem/${currentScheduleId}`, dataToSend)
                .then(response => {
                    console.log('更新成功', response.data);

                    updateProgress(); // 更新進度條
                    updateCardQuantity(newItem.ItemName); // 同步更新種類卡片內的數量
                    loadDetailsData(clickedItemName); // 如果需要，重新加載類別的細項數據
                })
                .catch(error => {
                    console.error('更新失敗', error);
                });
        }

        // 在細項裡面調整數量、勾選及刪除，種類卡片的數量立即更新
        function updateCardQuantity(itemName) {
            setTimeout(() => { // 延遲取得更新後的資料，以免取到舊資料
                axios.get(`http://localhost:8080/item/Useritem/${currentScheduleId}`)
                    .then(response => {
                        const userItemList = response.data.UseritemList;

                        // 處理數據
                        const groupedItems = userItemList.reduce((acc, item) => {
                            if (acc[item.ItemName]) {
                                acc[item.ItemName].Total += item.Quantity;
                                if (item.PrepareStatus === 1) {
                                    acc[item.ItemName].Quantity += item.Quantity;
                                }
                                if (!acc[item.ItemName].ItemList_ids.includes(item.ItemList_id)) {
                                    acc[item.ItemName].ItemList_ids.push(item.ItemList_id);
                                }
                            } else {
                                acc[item.ItemName] = {
                                    ItemName: item.ItemName,
                                    Total: item.Quantity,
                                    Quantity: item.PrepareStatus === 1 ? item.Quantity : 0,
                                    Icategory_id: item.Icategory_id,
                                    ItemList_ids: [item.ItemList_id]
                                };
                            }
                            return acc;
                        }, {});

                        const uniqueItems = Object.values(groupedItems);

                        const cardBody = document.querySelector(`.card-body[data-item-name="${itemName}"]`);
                        if (cardBody) {
                            const quantitySpan = cardBody.querySelector('span:nth-child(2)');
                            if (quantitySpan) {
                                const item = uniqueItems.find(i => i.ItemName === itemName);
                                if (item) {
                                    quantitySpan.textContent = `${item.Quantity} / ${item.Total}`;
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.error('更新數量失敗:', error);
                    });
            }, 100); // 延遲 100 毫秒後執行 axios 請求
        }

        // Function：刪除物品細項的axios
        function deleteItem(itemListId, itemName, item) {
            if (confirm("您確定要刪除這個項目嗎？")) {
                axios.delete(`http://localhost:8080/item/Useritem/${currentScheduleId}/${itemListId}`)
                    .then(response => {
                        console.log('刪除成功', response.data);
                        const detailElement = document.querySelector(`[data-item-list-id="${itemListId}"]`);
                        if (detailElement) {
                            detailElement.remove();
                        }

                        updateProgress();
                    })
                    .catch(error => {
                        console.error('刪除失敗', error);
                    });
            }
        }

        // Function：進度條更新
        function updateProgress() {
            // 取得所有 .checkBOX 和 .itemQuantity
            const checkboxes = Array.from(document.querySelectorAll('.checkBOX'));
            const quantities = Array.from(document.querySelectorAll('.itemQuantity'));

            // 總數量，初始值設為 0
            let totalQuantity = 0;
            // 已勾選的數量，初始值設為 0
            let checkedQuantity = 0;

            // 遍歷所有 checkbox，累加已勾選的項目數量
            checkboxes.forEach((checkbox, index ) => {
                const quantity = parseInt(quantities[index].value) || 0; // 確保數量是數字，若沒有則為 0
                totalQuantity += quantity; // 累加總數量
                if (checkbox.checked) {
                    checkedQuantity += quantity; // 累加已勾選項目的數量
                }
            });

            // 計算進度百分比
            const progressPercentage = totalQuantity > 0 ? (checkedQuantity / totalQuantity) * 100 : 0;
            const progress = document.getElementById('progress-bar');
            progress.style.width = progressPercentage + '%';

            // 保存進度到 localStorage
            localStorage.setItem('progressPercentage', progressPercentage);
        }

        // 取得現在位於哪個行程
        axios.get(`http://localhost:8080/buildPlan/editPlan/${currentScheduleId}`)
            .then(function (editPlanResponse) {
                const sch_name = editPlanResponse.data[0].sch_name;
                const backLink = document.querySelector('a[href="./editPlan.html"]');
                if (backLink) {
                    backLink.textContent = `返回編輯計畫 <${sch_name}>`;
                }
            })
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    })