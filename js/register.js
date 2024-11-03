import axios from 'axios';

$('#form').submit(function (e) {
    e.preventDefault(); // 防止畫面重新整理
    var formData = new FormData(this); // 獲取表單數據
    var JSONData = Object.fromEntries(formData);

    axios.post('http://localhost:8080/member/register', JSONData)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("emailid", response.data.emailid);
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

// 以解碼的方式拿到使用者資料
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// google 註冊會員
window.handleCallback = function (response) {
    const data = parseJwt(response.credential);

    axios.post("http://localhost:8080/member/Googleregister", { data })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("emailid", response.data.emailid);
                alert(response.data.message);
                window.location.href = "member_personaldata.html";
            }
        })
        .catch(error => {
            console.error("註冊失敗:", error);
            alert(error.response.data.message);
        });
}

// Line 登入會員
$('.lineloginbtn').click(function () {
    let client_id = '2006514534';
    let redirect_uri = 'http://localhost:5173/chill-around-project/pages/register.html';
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
            const response = await axios.post("http://localhost:8080/member/Lineregister", { code });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("emailid", response.data.emailid);
                localStorage.setItem("Lineid", response.data.Lineid);
                alert("Line 註冊成功！請更新會員資料。");
                window.location.href = "member_personaldata.html";
            } else {
                alert(response.data.message || "註冊失敗");
            }
        } catch (error) {
            console.error("註冊失敗:", error);
            alert(error.response.data.message);
            window.location.href = "register.html";
        }
    }
});