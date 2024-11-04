import"./all-DcTbhZgf.js";import"./main-BX2b4uAz.js";import{a as d}from"./axios-CCb-kr4I.js";$(document).ready(function(){const s=localStorage.getItem("token"),b=localStorage.getItem("emailid");if(!s){alert("請先登入"),window.location.href="index.html";return}console.log("用戶 ID:",b),d.get("http://localhost:8080/member/members",{headers:{Authorization:`Bearer ${s}`}}).then(r=>{const e=r.data;let u=new Date(e.birthday).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-");var f=`
            <div id="edit" class="text-end mb-3">
                <button type="button" class="btn btn-primary editbtn text-white">
                    <i class="fa-solid fa-pencil me-1"></i>編輯
                </button>
            </div>
            <div id="write" class="text-end mb-3">
                <button type="submit" class="btn btn-secondary storebtn text-white">
                    儲存
                </button>
                <button type="button" class="btn btn-secondary cancelbtn text-white">
                    取消
                </button>
            </div>
            <form id="form">
                <div class="mb-5">
                    <div class="card" style="max-width: 600px;">
                        <div class="row align-items-center g-0">
                            <div class="col-md-4 col-sm-12 d-flex justify-content-center">
                                <div id="photo" class="d-flex justify-content-center align-items-center">
                                    <p>請上傳圖片</p>
                                    <label class="btn btn-info upload">
                                        <input type="file" name="uphoto" id="uphoto" value="${e.uphoto}">
                                        <i class="fa-regular fa-image"></i> 檔案上傳
                                    </label>
                                    <img id="img" src="../assets/images/memberimg/${e.uphoto}">
                                </div>
                            </div>
                            <div class="col-md-8 col-sm-12">
                                <div class="card-body">
                                    <p class="card-text ms-2">
                                        歡迎! <span id="uname">${e.uname}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="formList">
                    <div class="item">
                        <label class="col-form-label">姓名：</label>
                        <input type="text" name="uname" id="uname1" class="inpwrite" value="${e.uname}" placeholder="請輸入姓名" readonly>
                    </div>
                    <div class="item row">
                        <div class="col-md-6 col-sm-12">
                            <label class="col-form-label">電子信箱：</label>
                            <input type="email" name="email" id="email" class="inpwrite" value="${e.email}" placeholder="請輸入電子信箱"
                                readonly>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <label class="col-form-label">密碼：</label>
                            <input type="password" name="pwd" id="pwd" class="inpwrite" value="${e.password}" minlength="6" placeholder="請輸入密碼" readonly><i class="fa-solid fa-eye"></i><i class="fa-solid fa-eye-slash"></i>
                        </div>
                    </div>
                    <div class="item row">
                        <div class="col-md-6 col-sm-12">
                            <label class="col-form-label">出生日期：</label>
                            <input type="text" name="birthday" id="birthday" class="inpwrite" value="${u}" placeholder="請輸入出生日期"
                                readonly>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <label class="col-form-label">性別：</label>
                            <input type="text" name="sex" id="sex" class="inpwrite" value="${e.sex}" readonly>
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
                        <input type="text" name="address" id="address" class="inpwrite" value="${e.address}" placeholder="請輸入住址"
                            readonly>
                    </div>
                    <div class="item">
                        <label class="col-form-label">手機號碼：</label>
                        <input type="text" name="cellphonenum" id="cellphonenum" class="inpwrite" value="${e.cellphone}"
                            placeholder="請輸入手機號碼" pattern="09[0-9]{8}" readonly>
                    </div>
                    <div class="item">
                        <label class="col-form-label">市內電話：</label>
                        <input type="text" name="telephonenum" id="telephonenum" class="inpwrite" value="${e.telephone}"
                            placeholder="請輸入市內電話" pattern="0[2-8]{1}[0-9]{8}" readonly>
                    </div>
                    <div class="bindaccount">
                        <div class="title">綁定帳戶：</div>
                        <div class="googleline">
                            <div class="item">
                                <img src="../assets/images/memberimg/logo_google_g_icon.png" class="googleimg">
                                <button type="button" id="google" class="btn google" data-bs-toggle="modal" data-bs-target=""></button>
                            </div>
                            <div class="item">
                                <img src="../assets/images/memberimg/btn_base.png" class="lineimg">
                                <button type="button" id="line" class="btn" data-bs-toggle="modal" data-bs-target=""></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="googleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">解除綁定</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                確定要解除綁定?
                            </div>
                            <div class="modal-footer">
                                <button id="delGoogle" type="button" class="btn btn-primary text-white">確定</button>
                                <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="lineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">解除綁定</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                確定要解除綁定?
                            </div>
                            <div class="modal-footer">
                                <button id="delLine" type="button" class="btn btn-primary text-white">確定</button>
                                <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            `;$(".personaldata").html(f),$("#photo p").hide(),$(".upload").hide(),$("#uphoto").hide(),e.uphoto==null&&($("#img").hide(),$("#photo p").show()),e.password==null&&($("#pwd").val("未填寫"),$(".fa-eye-slash").hide(),$("#pwd").prop("type","text")),e.birthday==null&&$("#birthday").val("未填寫"),e.sex==null&&$("#sex").val("未填寫"),e.address==null&&$("#address").val("未填寫"),e.cellphone==null&&$("#cellphonenum").val("未填寫"),e.telephone==null&&$("#telephonenum").val("未填寫"),$(".fa-eye").hide(),$(".fa-eye-slash").click(function(){$("#pwd").prop("type","text"),$(".fa-eye").show(),$(".fa-eye-slash").hide()}),$(".fa-eye").click(function(){$("#pwd").prop("type","password"),$(".fa-eye").hide(),$(".fa-eye-slash").show()});let g=e.googleid,v=e.lineid;google.accounts.id.initialize({client_id:"745588392722-ldt3hokig9ll3mk6nekm1qmj9apnipo5.apps.googleusercontent.com",callback:y}),g==null?($("#google").removeClass("google"),google.accounts.id.renderButton(document.getElementById("google"),{type:"icon"}),google.accounts.id.prompt()):($("#google").text("已綁定"),$("#google").attr("data-bs-target","#googleModal"),$("#google").click(function(t){t.preventDefault()}),$("#delGoogle").click(function(){d.post("http://localhost:8080/member/delGoogleid",{},{headers:{Authorization:`Bearer ${s}`}}).then(t=>{t.data&&(alert(t.data.message),window.location.href="member_personaldata.html")}).catch(t=>{console.error("解除失敗:",t),alert(t.response.data.message)})}));function y(t){const a=w(t.credential);d.post("http://localhost:8080/member/GoogleBind",{data:a},{headers:{Authorization:`Bearer ${s}`}}).then(l=>{alert(l.data.message),location.reload()}).catch(l=>{console.error("綁定失敗:",l),alert(l.response.data.message)})}function w(t){var a=t.split(".")[1],l=a.replace(/-/g,"+").replace(/_/g,"/"),o=decodeURIComponent(atob(l).split("").map(function(i){return"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(o)}if(v==null){$("#line").text("未綁定"),$("#line").click(function(){let l="2006514534",o="http://localhost:5173/chill-around-project/pages/member_personaldata.html",i="https://access.line.me/oauth2/v2.1/authorize?";i+="response_type=code",i+="&client_id="+l,i+="&redirect_uri="+o,i+="&state=login",i+="&scope=profile%20openid%20email",window.location.href=i});const a=new URLSearchParams(window.location.search).get("code");a&&d.post("http://localhost:8080/member/LineBind",{code:a},{headers:{Authorization:`Bearer ${s}`}}).then(l=>{l.data&&(alert(l.data.message),location.reload())}).catch(l=>{console.error("綁定失敗:",l),alert(l.response.data.message)})}else $("#line").text("已綁定"),$("#line").attr("data-bs-target","#lineModal"),$("#line").click(function(t){t.preventDefault()}),$("#delLine").click(function(){d.post("http://localhost:8080/member/delLineid",{},{headers:{Authorization:`Bearer ${s}`}}).then(t=>{t.data&&(alert(t.data.message),window.location.href="member_personaldata.html")}).catch(t=>{console.error("解除失敗:",t),alert(t.response.data.message)})});function h(t){const a=t.val();let l=0;for(let o=0;o<a.length;o++){const i=a.charCodeAt(o);i>=19968&&i<=40959?l+=2:l+=1}t.attr("size",l)}$(".inpwrite").each(function(){h($(this))}),$(".inpwrite").on("input",function(){h($(this))}),$("#selectsex").hide(),$("#write").hide();let p;$(".editbtn").click(function(){$("#edit").hide(),$("#write").show(),$("#uname1").focus(),e.password==null&&$("#pwd").val(""),e.birthday==null&&$("#birthday").val(""),e.sex==null&&$("#sex").val(""),e.address==null&&$("#address").val(""),e.cellphone==null&&$("#cellphonenum").val(""),e.telephone==null&&$("#telephonenum").val(""),$("#photo p").hide(),$(".upload").show(),$("#uphoto").on("change",function(){$("#img").show();var a=new FileReader;a.readAsDataURL(this.files[0]),$("#img").val(`${this.files[0].name}`),a.onload=function(){$("#img").attr("src",a.result)}}),$("#sex").hide(),$("#selectsex").show(),e.sex==="男"?$("#boy").prop("checked",!0):e.sex==="女"&&$("#girl").prop("checked",!0);let t=$(".inpwrite");t.css({border:"1px solid #d2d2d2"},{outline:"solid thin"}),t.prop("readonly",!1),p=flatpickr("#birthday",{dateFormat:"Y-m-d",allowInput:!0})}),$(".storebtn").click(function(){if(!confirm("確定儲存?"))return!1;$("#email")[0].setCustomValidity(""),$("#pwd")[0].setCustomValidity("");const a=document.getElementById("email");if(!a.checkValidity())return a.setCustomValidity("請輸入有效的電子信箱"),a.reportValidity(),a.focus(),!1;const l=document.getElementById("pwd");if(l.value.length<6)return l.setCustomValidity("密碼長度至少為 6 個字元"),l.reportValidity(),l.focus(),!1;const o=$("#cellphonenum").attr("pattern"),i=new RegExp(o).test($("#cellphonenum").val()),c=document.getElementById("cellphonenum"),x=$("#telephonenum").attr("pattern"),k=new RegExp(x).test($("#telephonenum").val()),m=document.getElementById("telephonenum");if(!i)c.setCustomValidity("手機號碼格式錯誤"),c.reportValidity();else if(!k)m.setCustomValidity("市內電話格式錯誤"),m.reportValidity();else{c.setCustomValidity(""),c.reportValidity(),m.setCustomValidity(""),m.reportValidity();var V=new FormData($("#form")[0]);d.post("http://localhost:8080/member/update",V,{headers:{Authorization:`Bearer ${s}`,"Content-Type":"multipart/form-data"}}).then(n=>{n.data&&(alert(n.data.message),location.reload())}).catch(n=>{n.response&&n.response.data?alert(n.response.data.message):alert("更新失敗，請稍後再試。")})}}),$(".cancelbtn").click(function(){if(!confirm("確定取消編輯?"))return!1;$("#edit").show(),$("#write").hide(),e.uphoto==null&&($("#img").hide(),$("#uphoto").val(""),$("#photo p").show()),$(".upload").hide(),e.birthday==null?$("#birthday").val("未填寫"):$("#birthday").val(u),$("#sex").show(),$("#selectsex").hide();let a=$(".inpwrite");a.css({border:"none"},{outline:"none"}),a.prop("readonly",!0),p&&p.destroy(),window.location.href="member_personaldata.html"})}).catch(r=>{r.response&&r.response.status===401?(alert("登入已過期，請重新登入"),localStorage.removeItem("token"),window.location.href="index.html"):alert("無法讀取會員資料:"+r)}),$("#logoutbtn").click(function(){confirm("您確定要登出嗎？")&&(localStorage.removeItem("token"),window.location.href="index.html")})});
