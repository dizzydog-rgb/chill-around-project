import axios from 'axios';

$(document).ready(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("請先登入");
        window.location.href = 'login.html';
        return;
    }

    axios.get('http://localhost:8080/member/members/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            const member = response.data;
            let birthday = new Date(member.birthday);
            let myBirthday = birthday.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\//g, '-');

            var personaldataHTML = '';
            personaldataHTML += `
            <div id="edit" class="text-end mb-3">
                <button type="button" class="btn btn-primary editbtn text-white">
                    <i class="fa-solid fa-pencil me-1"></i>編輯
                </button>
            </div>
            <div id="write" class="text-end mb-3">
                <button type="button" class="btn btn-secondary storebtn text-white">
                    儲存
                </button>
                <button type="button" class="btn btn-secondary cancelbtn text-white">
                    取消
                </button>
            </div>
            <div class="mb-5">
                <div class="card" style="max-width: 600px;">
                    <div class="row align-items-center g-0">
                        <div class="col-md-4">
                            <img id="img" src="../assets/images/memberimg/${member.uphoto}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <p class="card-text ms-2">
                                    歡迎! <span id="uname">${member.uname}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="formList">
                <form>
                    <div class="item">
                        <label class="col-form-label">姓名：</label>
                        <input type="text" name="uname" id="uname1" class="inpwrite" value="${member.uname}" placeholder="請輸入姓名" readonly>
                    </div>
                    <div class="item">
                        <div>
                            <label class="col-form-label">電子信箱：</label>
                            <input type="text" name="email" id="email" class="inpwrite" value="${member.email}" placeholder="請輸入電子信箱"
                                readonly>
                        </div>
                        <div>
                            <label class="col-form-label">密碼：</label>
                            <input type="text" name="pwd" id="pwd" class="inpwrite" value="${member.password}" placeholder="請輸入密碼" readonly>
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            <label class="col-form-label">出生日期：</label>
                            <input type="text" name="birthday" id="birthday" class="inpwrite" value="${myBirthday}" placeholder="請輸入出生日期"
                                readonly>
                        </div>
                        <div>
                            <label class="col-form-label">性別：</label>
                            <input type="text" name="sex" id="sex" class="inpwrite" value="${member.sex}" readonly>
                            <div id="selectsex">
                                <input class="col-form-label" type="radio" name="sex" id="boy" value="男">
                                <label class="col-form-label ms-1 me-2" for="boy">
                                    男
                                </label>
                                <input type="radio" name="sex" id="girl" value="女">
                                <label class="col-form-label ms-1" for="girl">
                                    女
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <label class="col-form-label">住址：</label>
                        <input type="text" name="address" id="address" class="inpwrite" value="${member.address}" placeholder="請輸入住址"
                            readonly>
                    </div>
                    <div class="item">
                        <label class="col-form-label">手機號碼：</label>
                        <input type="text" name="cellphonenum" id="cellphonenum" class="inpwrite" value="${member.cellphone}"
                            placeholder="請輸入手機號碼" readonly>
                    </div>
                    <div class="item">
                        <label class="col-form-label">市內電話：</label>
                        <input type="text" name="telephonenum" id="telephonenum" class="inpwrite" value="${member.telephone}"
                            placeholder="請輸入市內電話" readonly>
                    </div>
                </form>
                <div class="bindaccount">
                    <div class="title">綁定帳戶：</div>
                    <div class="googleline">
                        <div class="item">
                            <img src="../assets/images/memberimg/logo_google_g_icon.png" id="googleimg">
                            <div id="google"></div>
                        </div>
                        <div class="item">
                            <img src="../assets/images/memberimg/btn_base.png" id="lineimg">
                            <div id="line"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            $('.personaldata').html(personaldataHTML);

            let googleid = member.googleid;
            let lineid = member.lineid;
            if (googleid == undefined) {
                $('#google').text('未綁定');
            } else {
                $('#google').text('已綁定');
            }

            if (lineid == undefined) {
                $('#line').text('未綁定');
            } else {
                $('#line').text('已綁定');
            }

            function inputSize(input) {
                var minSize = 10;
                input.attr('size', input.val().length)
            }

            $('.inpwrite').each(function () {
                inputSize($(this)); // 調整初始大小
            });

            $('.inpwrite').on('input', function () {
                inputSize($(this));
            });

            $('#selectsex').hide();
            $('#write').hide();
            let datePicker;
            $('.editbtn').click(function () {
                $('#edit').hide();
                $('#write').show();
                $('#sex').hide();
                $('#selectsex').show();
                if (member.sex === '男') {
                    $('#boy').prop('checked', true);
                } else if (member.sex === '女') {
                    $('#girl').prop('checked', true);
                }
                let input = $('.inpwrite');
                input.css({ 'border': '1px solid #d2d2d2' }, { 'outline': 'solid thin' });
                input.prop('readonly', false); // 切換 readonly 屬性
                datePicker = flatpickr("#birthday", {
                    dateFormat: "Y-m-d",
                    allowInput: true
                });
            });

            $('.cancelbtn').click(function () {
                let msg = "確定取消編輯?";
                if (!confirm(msg)) return false;
                $('#edit').show();
                $('#write').hide();
                $('#sex').show();
                $('#selectsex').hide();
                let input = $('.inpwrite');
                input.css({ 'border': 'none' }, { 'outline': 'none' });
                input.prop('readonly', true); // 切換 readonly 屬性
                if (datePicker) {
                    datePicker.destroy();
                }
                $('#birthday').val(myBirthday);
            });
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                alert('登入已過期，請重新登入');
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            } else {
                alert('無法讀取會員資料:' + error);
            }
        });

    $('#logoutbtn').click(function () {
        if (confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    });
});