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

// 以解碼的方式拿到使用者資料
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// google 登入會員
window.handleCallback = function (response) {
    const data = parseJwt(response.credential);

    // 將 ID Token 傳送至後端
    axios.post("http://localhost:8080/member/Googlelogin", { data })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("emailid", response.data.emailid);
                alert(response.data.message);
                window.location.href = "index.html";
            }
        })
        .catch(error => {
            console.error("Google 登入失敗:", error);
            alert(error.response.data.message);
        });
}

// Line 登入會員
$('.lineloginbtn').click(function () {
    let client_id = '2006514534';
    let redirect_uri = 'http://localhost:5173/chill-around-project/pages/index.html';
    let link = 'https://access.line.me/oauth2/v2.1/authorize?';
    link += 'response_type=code';
    link += '&client_id=' + client_id;
    link += '&redirect_uri=' + redirect_uri;
    link += '&state=login';
    link += '&scope=profile%20openid%20email';
    window.location.href = link;
});

// 接收 Line 登入資料傳入後台
$(document).ready(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
        try {
            const response = await axios.post("http://localhost:8080/member/Linelogin", { code });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("emailid", response.data.emailid);
                alert(response.data.message);
                window.location.href = "index.html";
            }
        } catch (error) {
            console.error("Line 登入失敗:", error);
            alert(error.response.data.message);
            // window.location.href = "register.html";
        }
    }
});