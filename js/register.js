import axios from 'axios';

$('#form').submit(function (e) {
    e.preventDefault(); // 防止畫面重新整理
    var uname = $('#uname').val();
    var email = $('#email').val();
    var pw1 = $('#pw1').val();
    var pw2 = $('#pw2').val();

    if (uname == "" || email == "" || pw1 == "" || pw2 == "") {
        alert('欄位不得為空!');
    } else if (pw2 != pw1) {
        alert('密碼確認與第一次輸入不同!');
    } else {
        axios.post('http://localhost:8080/member/register', {
            uname: uname,
            email: email,
            pw1: pw1,
            pw2: pw2
        })
            .then(response => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    alert("註冊成功!");
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
    }
});