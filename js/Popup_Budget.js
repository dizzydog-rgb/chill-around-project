const currentScheduleId = localStorage.getItem("scheduleId");
console.log("皮卡：目前從 localStorage 取得: ------- ", currentScheduleId);

import axios from 'axios';

axios.get('http://localhost:8080/Budget/popupbudget')
    // -------------------------------------------------- PopupBudget 預算種類渲染及點擊事件
    .then(response => {
        // 處理獲取的資料，例如更新 UI

        // 先取 種類 與 細項 的資料
        const Categorydata = response.data.Category;
        const Detailsdata = response.data.Details;
        // console.log(Categorydata);

        // 若 modalContent2 的 '' 放在迴圈裡會每次都執行清空一次，只剩最後一個結果
        const modalContent2 = document.querySelector('.modalContent2');
        modalContent2.innerHTML = '';

        const fixedtop = `
            <div class="topDiv2">
                <a class="close2" href="#">＜</a>
                <button class="okBtn">確認</button>
            </div>
        `;
        modalContent2.innerHTML += fixedtop;

        modalContent2.querySelector('.close2').addEventListener('click', () => {
            closeModal2();
        });

        // 取項目id相對應的細項
        const groupedDetails = Detailsdata.reduce((acc, item) => {
            if (!acc[item.Bcategory_id]) {
                acc[item.Bcategory_id] = []; // 如果沒有此組別，初始化為空陣列
            }
            acc[item.Bcategory_id].push(item); // 將項目添加到對應的組別
            return acc;
        }, {});

        // 開始渲染 itemCategory
        Categorydata.forEach(item => {
            // console.log(item);

            const newcategoryDiv = document.createElement('div');
            newcategoryDiv.classList.add('category2');

            newcategoryDiv.innerHTML = `
                <div class="tiTle" data-id="${item.Bcategory_id}">
                    ${item.BudgetName} <a>V</a>
                </div>
                `;

            // 大種類展開
            newcategoryDiv.querySelector('.tiTle').addEventListener('click', () => {
                toggleOptions(`options${item.Bcategory_id}`);
                console.log(item.BudgetName);
            });

            if (groupedDetails[item.Bcategory_id]) {
                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('options');
                optionsDiv.id = `options${item.Bcategory_id}`; // 設置唯一的 ID
                optionsDiv.style.display = 'none'; // 初始隱藏

                // 用 innerHTML 來生成子分類的 HTML 結構
                optionsDiv.innerHTML = groupedDetails[item.Bcategory_id].map(subItem => `
                    <div class="option" data-option="${subItem.BudgetDetails}">${subItem.BudgetDetails}</div>
                    `).join(''); // 將陣列轉換為字串並加入到 optionsDiv

                newcategoryDiv.appendChild(optionsDiv); // 將 optionsDiv 添加到 newcategoryDiv

                // 小種類選擇綁定
                optionsDiv.querySelectorAll('.option').forEach(option => {
                    option.addEventListener('click', (event) => {
                        selectOption(option.dataset.option, event);
                        // event.stopPropagation(); // 防止事件冒泡
                        console.log(option.dataset.option);
                    });
                });
            }
            modalContent2.appendChild(newcategoryDiv);
        });


        // ------------------------------ 若點選歷史方塊，有 UserChooseDiv 紀錄的編輯頁面 
        const UserChooseDiv = localStorage.getItem("UserChooseDiv");
        const ParseUserChooseDiv = JSON.parse(UserChooseDiv);

        // console.log("QQQQQQQQQQQ", response.data)
        if (UserChooseDiv) {

            axios.get(`http://localhost:8080/budget/UserBudget/${currentScheduleId}`)
                .then(function (response) {
                    console.log("抓到總數沒", ParseUserChooseDiv);
                    console.log("抓到沒", ParseUserChooseDiv.Budget_id);

                    const itemDate = ParseUserChooseDiv.BudgetDate.substring(0, 10)

                    const topDivContainer = document.querySelector('.topDiv');
                    topDivContainer.innerHTML = '';
                    topDivContainer.innerHTML = `
                                <a class="category" href="#modal2" id="open-modal2">${ParseUserChooseDiv.BudgetName}</a>
                                <input class="date" type="date" value="${itemDate}"></input>
                                <a href="./Budget.html" class="close" onclick="closeModal()">X</a>
                            `;
                    document.getElementById('open-modal2').addEventListener('click', () => {
                        document.getElementById('overlay2').classList.add('active');
                        document.getElementById('modal2').classList.add('active');
                    });

                    const formContainer = document.querySelector('.middleForm');
                    formContainer.innerHTML = '';
                    // --------------> 這個資料庫更新後，內容那行記得替換
                    // <input id="userContent" type="text" placeholder="輸入內容" value="${ParseUserChooseDiv.BudgetContent}"><br><br>
                    formContainer.innerHTML = `
                            <div>
                                <span>金額</span>
                                <input id="userMoney" type="text" placeholder="輸入金額" required value="${ParseUserChooseDiv.Cost}"><br><br>
                            </div>
                            <div>
                                <span>內容</span>
                                <input id="userContent" type="text" placeholder="輸入內容"><br><br>
                            </div>
                            <div>
                                <span>已付</span>
                                <input id="userCheck" type="checkbox" class="checkBox" ${ParseUserChooseDiv.PaidStatus === 1 ? 'checked' : ''}>
                            </div>
                            <div>
                                <span>付款人</span>
                                <input id="userWhoPaid" type="text" placeholder="輸入付款人" required value="${ParseUserChooseDiv.WhoPay}"><br><br>
                            </div>
                    `;

                    // ---------------------------------------------------- 綁定 value 並實現 post
                    document.querySelector('.submitBtn').addEventListener('click', () => {
                        const updateData = {
                            Cost: document.getElementById('userMoney').value,
                            // BudgetContent: document.getElementById('userContent').value,
                            PaidStatus: document.getElementById('userCheck').checked ? 1 : 0,
                            WhoPay: document.getElementById('userWhoPaid').value
                        };
                        // const testData = {
                        //     WhoPay: "Jenny"
                        // };

                        axios.put(`http://localhost:8080/budget/UserBudget/${currentScheduleId}/${ParseUserChooseDiv.Budget_id}`, updateData)
                            .then(postResponse => {
                                console.log('皮卡卡卡卡');
                                console.log("更新成功：", postResponse.data);
                            }).catch(error => {
                                console.error("更新失敗：", error);
                            });
                    });
                });

        }



    }).catch(error => {
        console.error('無法取得種類:', error);
    });



// <---------------------- Modal 1 ---------------------->
function openModal() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}
// 讓modal保持開啟
document.addEventListener('DOMContentLoaded', openModal);

function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

// 點擊遮罩也可以關閉視窗
document.getElementById('overlay2').addEventListener('click', closeModal2);


// <---------------------- Modal 2 ---------------------->
// 綁定 modal 和 連結按鈕
document.getElementById('open-modal2').addEventListener('click', () => {
    document.getElementById('overlay2').classList.add('active');
    document.getElementById('modal2').classList.add('active');
});

export function closeModal2() {
    document.getElementById('overlay2').classList.remove('active');
    document.getElementById('modal2').classList.remove('active');
}

document.querySelector('.close2').addEventListener('click', closeModal2);
document.querySelector('.okBtn').addEventListener('click', closeModal2);


// 展開種類選項
function toggleOptions(id) {
    const options = document.getElementById(id);
    if (options) {
        options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
        alert("展開或收回");
    } else {
        console.error(`ID '${id}' not found`)
    }
}

//  點擊單個選項綁定
function selectOption(option, event) {
    event.stopPropagation();
    alert(`你選擇了: ${option}`);

    // ------ 製作單選限制 ------ //
    const options = document.querySelectorAll('.option');

    // 移除所有選項的 active
    options.forEach(opt => {
        opt.classList.remove('active');
    });

    // 為選擇的選項添加 active
    const selectedOption = event.currentTarget; // 獲取被點擊的選項
    selectedOption.classList.add('active');
};
