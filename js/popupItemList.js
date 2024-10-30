const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得: ------- ", currentScheduleId);
// const currentAdding = localStorage.getItem("Adding");
// console.log("有取到新增按鈕資料嗎", currentAdding)
import axios from 'axios';

axios.get('http://localhost:8080/item/popupItem')
    // -------------------------------------------------- Popupitem 預算種類渲染及點擊事件
    .then(response => {
        // console.log(response.data.itemdetails)

        // if (Array.isArray(response.data.itemCategories)) {
        //     console.log('qior', response.data.itemCategories);
        //     const categoryDivContainer = document.querySelector('.categoryDiv');
        //     categoryDivContainer.innerHTML = '';

        //     response.data.itemCategories.forEach((item, index) => {
        //         const itemDetails = response.data.itemdetails[index];
        //         console.log('HIIII', itemDetails)

        //         categoryDivContainer.innerHTML += ` <!-- 使用 += 來追加內容 -->
        //         <div class="category" data-value="${item.Icategory_id}" data-details='${JSON.stringify(itemDetails)}'>${item.ItemName}</div>
        //         `;
        //     });
        // }

        if (Array.isArray(response.data.itemCategories) && Array.isArray(response.data.itemdetails)) {
            // 建立 itemdetails 的映射
            const categoryDivContainer = document.querySelector('.categoryDiv');
            categoryDivContainer.innerHTML = '';
            const itemDetailsMap = {};

            response.data.itemdetails.forEach(detail => {
                if (!itemDetailsMap[detail.Icategory_id]) {
                    itemDetailsMap[detail.Icategory_id] = [];
                }
                itemDetailsMap[detail.Icategory_id].push(detail.ItemDetails);
            });
            // console.log(itemDetailsMap)

            // 處理 itemCategories
            response.data.itemCategories.forEach(item => {
                // 根據 Icategory_id 獲取對應的詳細信息
                const itemDetails = itemDetailsMap[item.Icategory_id] || [];
                categoryDivContainer.innerHTML += `
                <div class="category" data-value="${item.Icategory_id}" data-details='${JSON.stringify(itemDetails)}'>${item.ItemName}</div>
                `;
                // console.log('HIIII', itemDetails);
            });
        }

        // ------------------ 種類點擊事件 ------------------
        // 選擇項目數組
        let selectedItemsId = [];
        let selectedItemName = '';
        let selectedDetails = [];

        // 獲取所有類別
        const categories = document.querySelectorAll('.category');
        // 為每個類別添加點擊事件
        categories.forEach(category => {
            category.addEventListener('click', () => {
                const categoryValue = category.getAttribute('data-value');
                const details = JSON.parse(category.getAttribute('data-details')); // 獲取並解析 itemDetails
                // 獲取對應的 itemDetails
                console.log('Category Value:', categoryValue);
                console.log('Item Details:', details);

                // 清空之前的選擇
                selectedItemsId = [];
                selectedDetails = [];
                categories.forEach(cat => cat.classList.remove('selected')); // 移除所有類別的選擇樣式

                // 添加新的選擇
                const itemName = category.textContent;
<<<<<<< HEAD:js/popupItemList.js
                selectedItemsId.push(itemName);
                selectedDetails.push(details);
                category.classList.add('selected'); // 添加選擇樣式
                selectedItemName = itemName;
                alert('選取' + itemName);
=======
                if (selectedItemsId.includes(itemName)) {
                    selectedItemsId.splice(selectedItemsId.indexOf(itemName), 1);
                    selectedDetails.splice(selectedItemsId.indexOf(itemName), 1);
                    category.classList.remove('selected'); // 移除選擇樣式
                } else {
                    selectedItemsId.push(itemName);
                    selectedDetails.push(details);
                    category.classList.add('selected'); // 添加選擇樣式
                    selectedItemName = itemName;
                    alert('選取' + itemName);
                }
>>>>>>> 13bfedf3bca9f0efe5d80235a00ec3736c820712:js/Popup_itemList.js
            });
        });


        const sendData = () => {
            console.log(selectedDetails);
            selectedDetails.forEach((detailArray, index) => { // detailArray 是每個選中的選項詳數組
                console.log(`Detail Array ${index}:`, detailArray);

                detailArray.forEach(detail => {
                    console.log(detail)

                    const updateData = {
                        sch_id: currentScheduleId,
                        ItemName: selectedItemName,
                        ItemDetails: [detail], // 單個 ItemDetail
                        PrepareStatus: '0'
                    };
                    console.log('Update Data:', updateData);

                    axios.post(`http://localhost:8080/item/Useritem/${currentScheduleId}`, updateData)
                        .then(Response => {
                            console.log('新增成功', updateData);
                        }).catch(error => {
                            console.error("更新失敗：", error);
                        })
                });
            });
        };

        // 確認按鈕事件
        document.getElementById('okBtn').addEventListener('click', () => {
            localStorage.setItem('selectedItemsId', JSON.stringify(selectedItemsId)); // 儲存選擇的項目
            localStorage.setItem('selectedItemName', JSON.stringify(selectedItemName)); // 儲存選擇的項目
            localStorage.setItem('selectedDetails', JSON.stringify(selectedDetails)); // 儲存選擇的項目
            sendData();
            window.location.href = './itemList.html'; // 跳轉到另一個頁面
            // console.log(sendData);
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
