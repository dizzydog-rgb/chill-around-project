// <---------------------- Modal 1 ---------------------->
function openModal() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}
// 加上這行讓modal保持開啟
document.addEventListener('DOMContentLoaded', openModal);

function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';

    // title.addEventListener('click', () => {
    //     toggleOptions(`options${index}`); // 使用 index 來獲取對應的 options
    // });
}


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
        alert("ABC");
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


// 放置區
// function toggleOptions(id) {
//     const options = document.getElementById(id);
//     options.classList.toggle('active'); // 切換 active 類
// }

// function confirmSelection2() {
//     alert('確認選擇');
// }

// 點擊遮罩也可以關閉視窗
// document.getElementById('overlay2').addEventListener('click', closeModal2);

// <---------------------- 使用者選取資料帶入畫面 ---------------------->



