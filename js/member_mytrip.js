import axios from "axios";
$(document).ready(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("請先登入");
        window.location.href = 'login.html';
        return;
    }

    // 獲取當前頁數，默認為 1
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1; // 如果沒有頁數參數，則默認為 1

    axios.get(`http://localhost:8080/member/planList/${currentPage}`)
        .then(function (response) {
            const schedules = response.data;
            console.log(schedules);
            var cardList = `
            <div class="text-end mb-3">
                <a href="buildPlan.html" class="btn btn-primary editbtn text-white">
                    新增 <b>＋</b>
                </a>
                <button id="deletebtn" type="button" class="btn btn-primary editbtn text-white">
                    刪除 <b>－</b>
                </button>
            </div>
            <form>
                <div class="mb-3">
            `;

            schedules.forEach((schedule) => {
                let startDate = new Date(schedule.edit_date);
                let stDate = startDate.toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\//g, '-');

                let endDate = new Date(schedule.end_date);
                let edDate = endDate.toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\//g, '-');

                cardList += `
                    <div class="checkcard mb-5">
                        <label class="checkbox">
                            <input type="checkbox" name="checkplan" id="checkplan">
                            <span></span>
                        </label>
                        <a href="editPlan.html">
                            <div class="card">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <img src="../assets/images/searchSite/${schedule.photo_one}" class="img-fluid">
                                    </div>
                                    <div class="col-md-8 text-center">
                                        <div class="card-body">
                                            <p class="card-text title ms-2">
                                                ${schedule.sch_name}
                                            </p>
                                            <p class="card-text">
                                                <small class="text-body-secondary">行程期間：${stDate} - ${edDate}</small>
                                            </p>
                                            <p class="card-text text-end">
                                                <small class="text-body-secondary">參與編輯者:${schedule.uname}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
            `;
            });

            cardList += `
                    <div class="jumpbox mb-3">
                        <ul class="jump_bef">
                            <li>
                                <a href="?page=${currentPage - 1}" title="最前一頁"><i class="icon-chevrons-left"></i></a>
                            </li>
                            <li>
                                <a href="?page=${currentPage - 1}" title="上一頁"><i class="icon-chevron-left"></i></a>
                            </li>
                        </ul>
                        <ul class="jump_btn">
                            <li class="active"><a href="?page=${currentPage}">${currentPage}</a></li>
                            <li><a href="?page=${currentPage + 1}">${currentPage + 1}</a></li>
                            <li><a href="?page=${currentPage + 2}">${currentPage + 2}</a></li>
                            <li><a href="?page=${currentPage + 3}">${currentPage + 3}</a></li>
                            <li><a href="?page=${currentPage + 4}">${currentPage + 4}</a></li>
                        </ul>
                        <ul class="jump_aft">
                            <li>
                                <a href="?page=${currentPage + 1}" title="下一頁"><i class="icon-chevron-right"></i></a>
                            </li>
                            <li>
                                <a href="?page=${currentPage + 1}" title="最後一頁"><i class="icon-chevrons-right"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div id="choose" class="text-end">
                        <button id="delbtn" type="button" class="btn footerbtn text-white">
                            確定刪除
                        </button>
                        <button id="cancelbtn" type="button" class="btn footerbtn text-white">
                            取消
                        </button>
                    </div>
                </form>
            </div>
            `;
            $('.mytrip').html(cardList);

            $('.checkbox').hide();
            $('#choose').hide();
            $('#deletebtn').click(function () {
                $('.checkbox').show();
                $('#choose').show();
            });

            $('#cancelbtn').click(function () {
                $('.checkbox').hide();
                $('#choose').hide();
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert("資料接收失敗");
        });

    $('#logoutbtn').click(function () {
        if (confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    });
})
