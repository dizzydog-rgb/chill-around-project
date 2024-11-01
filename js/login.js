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

// Line 登入會員
// $('.lineloginbtn').click(function () {
//     let client_id = '2006514534';
//     let redirect_uri = 'http://localhost:5173/chill-around-project/pages/index.html';
//     let link = 'https://access.line.me/oauth2/v2.1/authorize?';
//     link += 'response_type=code';
//     link += '&client_id=' + client_id;
//     link += '&redirect_uri=' + redirect_uri;
//     link += '&state=login';
//     link += '&scope=profile%20openid%20email';
//     window.location.href = link;
// });

// 接收 Line 登入資料傳入後台
// $(document).ready(async function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//         try {
//             const response = await axios.post("http://localhost:8080/member/Linelogin", { code });
//             if (response.data.token) {
//                 localStorage.setItem("token", response.data.token);
//                 localStorage.setItem("account", response.data.account);
//                 localStorage.setItem("emailid", response.data.emailid);
//                 alert("Line 登入成功！");
//                 window.location.href = "home.html"; // 跳轉到主頁面
//             } else {
//                 alert(response.data.message || "登入失敗");
//             }
//         } catch (error) {
//             console.error("登入失敗:", error);
//             alert("登入過程中發生錯誤");
//         }
//     }
// });