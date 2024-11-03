import axios from "axios";
$(document).ready(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("請先登入");
        window.location.href = 'index.html';
        return;
    }

    // 獲取當前頁數，默認為 1
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1; // 如果沒有頁數參數，則默認為 1
    // 限制不可為 0 以下
    if (currentPage <= 0) {
        currentPage = 1;
    }

    axios.get(`http://localhost:8080/member/myLikeSch/${currentPage}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(function (response) {
            const schedules = response.data.data; // 獲取行程資料
            const lastPage = response.data.lastPage; // 獲取最後一頁

            var cardList = `
                <div class="text-end mb-3">
                    <a href="schInfo.html" class="btn btn-primary editbtn text-white">
                        新增收藏 <b>＋</b>
                    </a>
            `;
            if (response.data.data[0] == undefined) {
                cardList += `
                    </div>
                    <div class="alert alert-info" role="alert">
                        目前沒有收藏任何的行程。
                    </div>
                `;
            } else {
                cardList += `
                    <button id="deletebtn" type="button" class="btn btn-primary editbtn text-white">
                        刪除收藏 <b>－</b>
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
                            <label for="checkplan${schedule.sch_id}" class="checkbox">
                                <input type="checkbox" name="checkplan" id="checkplan${schedule.sch_id}" value="${schedule.sch_id}">
                                <span></span>
                            </label>
                            <div class="card" id="scheduleCard" data-scheduleId="${schedule.sch_id}">
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
                                                <span class="text-body-secondary">行程期間：${stDate} - ${edDate}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                // 生成分頁按鈕
                let pageButtons = '';
                for (let i = 1; i <= lastPage; i++) {
                    if (i == currentPage) {
                        pageButtons += `<li class="active"><span>${i}</span></li> `;
                    } else {
                        pageButtons += `<li><a href="?page=${i}">${i}</a></li> `;
                    }
                }

                let previousPage = currentPage - 1;
                let innerFirstpage = '<a href="?page=1" title="第一頁"><i class="icon-chevrons-left"></i></a>';
                let innerpreviousPage = `<a href="?page=${previousPage}" title="上一頁"><i class="icon-chevron-left"></i></a>`;
                if (previousPage <= 0) {
                    innerFirstpage = '<span title="第一頁"><i class="icon-chevrons-left"></i></span>';
                    innerpreviousPage = '<span title="上一頁"><i class="icon-chevron-left"></i></span>';
                }

                let nextPage = currentPage + 1;
                let innernextPage = `<a href="?page=${nextPage}" title="下一頁"><i class="icon-chevron-right"></i></a>`;
                let innerlastPage = `<a href="?page=${lastPage}" title="最後一頁"><i class="icon-chevrons-right"></i></a>`;
                if (nextPage > lastPage) {
                    innernextPage = '<span title="下一頁"><i class="icon-chevron-right"></i></span>';
                    innerlastPage = '<span title="最後一頁"><i class="icon-chevrons-right"></i></span>';
                }

                cardList += `
                        <div class="jumpbox mb-3">
                            <ul class="jump_bef">
                                <li>
                                    ${innerFirstpage}
                                </li>
                                <li>
                                    ${innerpreviousPage}
                                </li>
                            </ul>
                            <ul class="jump_btn">
                                ${pageButtons}
                            </ul>
                            <ul class="jump_aft">
                                <li>
                                    ${innernextPage}
                                </li>
                                <li>
                                    ${innerlastPage}
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
            }
            $('.mycollection').html(cardList);

            $('.checkbox').hide();
            $('#choose').hide();

            $('.card').click(function () {
                const schId = this.closest("#scheduleCard").dataset.scheduleid;
                // 傳送行程計畫 id
                localStorage.setItem("selectedSchId", schId);
                window.location.href = "schCom.html";
            });

            $('#deletebtn').click(function () {
                $('.checkbox').show();
                $('#choose').show();
                $('.card').off('click');
            });

            $('#delbtn').click(function () {
                let msg = "確定要刪除?";
                if (!confirm(msg)) return false;

                const selectschIds = [];

                $('input[name="checkplan"]:checked').each(function () {
                    selectschIds.push($(this).val());
                });

                if (selectschIds.length === 0) {
                    alert("請選擇要刪除的行程！");
                    return;
                }

                const ids = selectschIds.join(','); // 用逗號分隔多個 ID

                axios.delete(`http://localhost:8080/member/delmyLikeSch/${ids}`)
                    .then(response => {
                        alert("行程刪除成功！");
                        location.reload();
                    })
                    .catch(error => {
                        console.error("刪除行程失敗:", error);
                        alert("刪除行程失敗！");
                    });
            });

            $('#cancelbtn').click(function () {
                $('.checkbox').hide();
                $('#choose').hide();
            });
        })
        .catch(function (error) {
            if (error.response && error.response.status === 401) {
                alert('登入已過期，請重新登入');
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            } else {
                alert('無法讀取會員資料:' + error);
            }
        });

    $('#logoutbtn').click(function () {
        if (confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    });

    $('#logoutbtn1').click(function () {
        if (confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    });
})