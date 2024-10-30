import axios from 'axios';

$('#form').submit(function (e) {
    e.preventDefault(); // 防止畫面重新整理
    var formData = new FormData(this);
    var JSONData = Object.fromEntries(formData);

    axios.post("http://localhost:8080/member/login", JSONData)
    .then(response => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('emailid', response.data.emailid);
            alert("登入成功!");
            location.reload();
        }
    })
    .catch(error => {
        console.error("登入失敗:", error);
        if (error.response && error.response.data) {
            alert(error.response.data.message); // 顯示後端返回的錯誤消息
        } else {
            alert("系統錯誤!");
        }
    });
});