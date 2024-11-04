import"./all-DcTbhZgf.js";/* empty css              */import"./main-BX2b4uAz.js";import{a as p}from"./axios-CCb-kr4I.js";$(document).ready(function(){const r=localStorage.getItem("token");if(!r){alert("請先登入"),window.location.href="index.html";return}const f=new URLSearchParams(window.location.search);let a=parseInt(f.get("page"))||1;a<=0&&(a=1),p.get(`http://localhost:8080/member/myLikeSch/${a}`,{headers:{Authorization:`Bearer ${r}`}}).then(function(e){const b=e.data.data,o=e.data.lastPage;var n=`
                <div class="text-end mb-3">
                    <a href="schInfo.html" class="btn btn-primary editbtn text-white">
                        新增收藏 <b>＋</b>
                    </a>
            `;if(e.data.data[0]==null)n+=`
                    </div>
                    <div class="alert alert-info" role="alert">
                        目前沒有收藏任何的行程。
                    </div>
                `;else{n+=`
                    <button id="deletebtn" type="button" class="btn btn-primary editbtn text-white">
                        刪除收藏 <b>－</b>
                    </button>
                </div>
                <form>
                    <div class="mb-3">
                `,b.forEach(t=>{let u=new Date(t.edit_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-"),g=new Date(t.end_date).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-");n+=`
                        <div class="checkcard mb-5">
                            <label for="checkplan${t.sch_id}" class="checkbox">
                                <input type="checkbox" name="checkplan" id="checkplan${t.sch_id}" value="${t.sch_id}">
                                <span></span>
                            </label>
                            <div class="card" id="scheduleCard" data-scheduleId="${t.sch_id}">
                                <div class="row align-items-center">
                                    <div class="col-md-4">
                                        <img src="../assets/images/searchSite/${t.photo_one}" class="img-fluid">
                                    </div>
                                    <div class="col-md-8 text-center">
                                        <div class="card-body">
                                            <p class="card-text title ms-2">
                                                ${t.sch_name}
                                            </p>
                                            <p class="card-text">
                                                <span class="text-body-secondary">行程期間：${u} - ${g}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `});let i="";for(let t=1;t<=o;t++)t==a?i+=`<li class="active"><span>${t}</span></li> `:i+=`<li><a href="?page=${t}">${t}</a></li> `;let c=a-1,s='<a href="?page=1" title="第一頁"><i class="icon-chevrons-left"></i></a>',l=`<a href="?page=${c}" title="上一頁"><i class="icon-chevron-left"></i></a>`;c<=0&&(s='<span title="第一頁"><i class="icon-chevrons-left"></i></span>',l='<span title="上一頁"><i class="icon-chevron-left"></i></span>');let d=a+1,h=`<a href="?page=${d}" title="下一頁"><i class="icon-chevron-right"></i></a>`,m=`<a href="?page=${o}" title="最後一頁"><i class="icon-chevrons-right"></i></a>`;d>o&&(h='<span title="下一頁"><i class="icon-chevron-right"></i></span>',m='<span title="最後一頁"><i class="icon-chevrons-right"></i></span>'),n+=`
                        <div class="jumpbox mb-3">
                            <ul class="jump_bef">
                                <li>
                                    ${s}
                                </li>
                                <li>
                                    ${l}
                                </li>
                            </ul>
                            <ul class="jump_btn">
                                ${i}
                            </ul>
                            <ul class="jump_aft">
                                <li>
                                    ${h}
                                </li>
                                <li>
                                    ${m}
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
                `}$(".mycollection").html(n),$(".checkbox").hide(),$("#choose").hide(),$(".card").click(function(){const i=this.closest("#scheduleCard").dataset.scheduleid;localStorage.setItem("selectedSchId",i),window.location.href="schCom.html"}),$("#deletebtn").click(function(){$(".checkbox").show(),$("#choose").show(),$(".card").off("click")}),$("#delbtn").click(function(){if(!confirm("確定要刪除?"))return!1;const c=[];if($('input[name="checkplan"]:checked').each(function(){c.push($(this).val())}),c.length===0){alert("請選擇要刪除的行程！");return}const s=c.join(",");p.delete(`http://localhost:8080/member/delmyLikeSch/${s}`).then(l=>{alert("行程刪除成功！"),location.reload()}).catch(l=>{console.error("刪除行程失敗:",l),alert("刪除行程失敗！")})}),$("#cancelbtn").click(function(){$(".checkbox").hide(),$("#choose").hide()})}).catch(function(e){e.response&&e.response.status===401?(alert("登入已過期，請重新登入"),localStorage.removeItem("token"),window.location.href="index.html"):alert("無法讀取會員資料:"+e)}),$("#logoutbtn").click(function(){confirm("您確定要登出嗎？")&&(localStorage.removeItem("token"),window.location.href="index.html")})});
