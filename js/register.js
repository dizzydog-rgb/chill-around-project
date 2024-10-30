import axios from 'axios';

$('#form').submit(function (e) {
    e.preventDefault(); // 防止畫面重新整理
    var formData = new FormData(this); // 獲取表單數據
    var JSONData = Object.fromEntries(formData);

    axios.post('http://localhost:8080/member/register', JSONData)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert("註冊成功!請更新會員資料。");
                window.location.href = 'member_personaldata.html';
            }
        })
        .catch(error => {
            console.error("註冊錯誤:", error);
            if (error.response && error.response.data) {
                alert(error.response.data.message); // 顯示後端返回的錯誤消息
            } else {
                alert('註冊失敗，請稍後再試。');
            }
        });
});