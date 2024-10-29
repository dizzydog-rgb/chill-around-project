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
                        新增 <b>＋</b>
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
                                                <small class="text-body-secondary">行程期間：${stDate} - ${edDate}</small>
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
                        pageButtons += `<li class="active"><a href="?page=${i}">${i}</a></li> `;
                    } else {
                        pageButtons += `<li><a href="?page=${i}">${i}</a></li> `;
                    }
                }

                let previousPage = currentPage - 1;
                let innerpreviousPage = `<a href="?page=${previousPage}" title="上一頁"><i class="icon-chevron-left"></i></a>`;
                if (previousPage <= 0) {
                    innerpreviousPage = '<a href="#" title="上一頁"><i class="icon-chevron-left"></i></a>';
                }

                let nextPage = currentPage + 1;
                let innernextPage = `<a href="?page=${nextPage}" title="下一頁"><i class="icon-chevron-right"></i></a>`;
                if (nextPage > lastPage) {
                    innernextPage = '<a href="#" title="下一頁"><i class="icon-chevron-right"></i></a>';
                }

                cardList += `
                        <div class="jumpbox mb-3">
                            <ul class="jump_bef">
                                <li>
                                    <a href="?page=1" title="最前一頁"><i class="icon-chevrons-left"></i></a>
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
                                    <a href="?page=${lastPage}" title="最後一頁"><i class="icon-chevrons-right"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div id="choose" class="text-end">
                            <button id="delbtn" type="submit" class="btn footerbtn text-white">
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
            window.location.href = 'index.html';
        }
    });
})