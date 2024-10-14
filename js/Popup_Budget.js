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
}


// <---------------------- Modal 2 ---------------------->
// 綁定 modal 和 連結按鈕
document.getElementById('open-modal2').addEventListener('click', () => {
    document.getElementById('overlay2').classList.add('active');
    document.getElementById('modal2').classList.add('active');
});

function closeModal2() {
    document.getElementById('overlay2').classList.remove('active');
    document.getElementById('modal2').classList.remove('active');
}

// document.addEventListener('DOMContentLoaded', openModal2);

function toggleOptions(id) {
    const options = document.getElementById(id);
    options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
    alert("ABC");
}

function init() {
    document.querySelector('.tiTle').addEventListener('click', () => {
        toggleOptions('option1');
    });

    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(option => {
        option.addEventListener('click', (event) => {
            selectOption(option.getAttribute('data-option'), event);
        })
    })
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

