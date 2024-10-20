// <---------------------- 嘗試連接後端抓資料QQ ---------------------->

import axios from 'axios';
axios.get('http://localhost:8080/Budget/popupbudgets')
    .then(response => {
        // // 處理獲取的資料，例如更新 UI
        // // 先取 種類 與 細項 的資料
        // const Categorydata = response.data.Category;
        // const Detailsdata = response.data.Details;
        // // console.log(Categorydata);

        // // 若 modalContent2 的 '' 放在迴圈裡會每次都執行清空一次，只剩最後一個結果
        // const modalContent2 = document.querySelector('.modalContent2');
        // modalContent2.innerHTML = '';

        // // 開始渲染 itemCategory
        // Categorydata.forEach(item => {
        //     // console.log(item);

        //     const newcategoryDiv = document.createElement('div');
        //     newcategoryDiv.classList.add('category2');

        //     newcategoryDiv.innerHTML = `
        //     <div class="tiTle">${item.BudgetName}
        //         <a>V</a>
        //     </div>
        //     `;

        //     modalContent2.appendChild(newcategoryDiv);


        //////////////  TRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY  //////////////

        const Categorydata = response.data.Category;
        const Detailsdata = response.data.Details;

        const modalContent2 = document.querySelector('.modalContent2');
        modalContent2.innerHTML = '';

        // 创建一个 Map 来存储每个类别的子类别
        const categoriesMap = new Map();

        // 将每个类别添加到 Map 中
        Categorydata.forEach(category => {
            categoriesMap.set(category.Bcategory_id, {
                name: category.BudgetName,
                subcategories: []
            });
        });

        // 将每个子类别添加到相应的类别中
        Detailsdata.forEach(detail => {
            const category = categoriesMap.get(detail.Bcategory_id);
            if (category) {
                category.subcategories.push({
                    id: detail.Subcategory_id,
                    name: detail.BudgetDetails
                });
            }
        });

        // 开始渲染类别和子类别
        categoriesMap.forEach((value) => {
            const newcategoryDiv = document.createElement('div');
            newcategoryDiv.classList.add('category2');
            newcategoryDiv.id = 'categoryDiv';

            // 渲染类别
            newcategoryDiv.innerHTML = `
                <div class="tiTle">${value.name}
                    <a>V</a>
                </div>
                <div class="options">
                    ${value.subcategories.map(sub => `
                        <div class="option" data-option="${sub.name}">${sub.name}</div>
                    `).join('')}
                </div>
            `;

            modalContent2.appendChild(newcategoryDiv);
        });
    })

    .catch(error => {
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

    // title.addEventListener('click', () => {
    //     toggleOptions(`options${index}`); // 使用 index 來獲取對應的 options
    // });
}

// 點擊遮罩也可以關閉視窗
// document.getElementById('overlay2').addEventListener('click', closeModal2);



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

// document.addEventListener('DOMContentLoaded', openModal2);

// 展開種類選項
function toggleOptions(id) {
    const options = document.getElementById(id);
    if (options) {
        options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
        alert("展開成功");
    } else {
        console.error(`ID '${id}' not found`)
    }
}

function init() {
    const titles = document.querySelectorAll('.tiTle');

    titles.forEach((title, index) => {
        // 為每個 .tiTle 綁定 click 事件
        title.addEventListener('click', () => {
            toggleOptions(`options${index}`); // 使用 index 來獲取對應的 options
        });

        // 獲取對應的 options 和 option 元素
        const optionElements = title.nextElementSibling.querySelectorAll('.option');
        optionElements.forEach(option => {
            option.addEventListener('click', (event) => {
                selectOption(option.getAttribute('data-option'), event);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', init);


// 點擊單個選項綁定
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
}