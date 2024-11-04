import"./all-B7fgtTnm.js";import{a as g}from"./axios-CCb-kr4I.js";const r=localStorage.getItem("scheduleId"),L=localStorage.getItem("Adding");console.log("有取到新增按鈕資料嗎",L);console.log("皮卡：目前從 localStorage 取得: ------- ",r);g.get("http://localhost:8080/Budget/popupbudget").then(a=>{const c=a.data.Category,h=a.data.Details,i=document.querySelector(".modalContent2");i.innerHTML="";const p=`
            <div class="topDiv2">
                <a class="close2" href="#"><</a>
                <button class="okBtn">確認</button>
                </div>
                `;i.innerHTML+=p,i.querySelector(".close2").addEventListener("click",()=>{m()});const v=h.reduce((e,t)=>(e[t.Bcategory_id]||(e[t.Bcategory_id]=[]),e[t.Bcategory_id].push(t),e),{}),n={BudgetName:"",BudgetDetails:""};c.forEach(e=>{const t=document.createElement("div");if(t.classList.add("category2"),t.innerHTML=`
                <div class="tiTle" data-id="${e.Bcategory_id}">
                    ${e.BudgetName} <a>···</a>
                </div>
                `,t.querySelector(".tiTle").addEventListener("click",()=>{k(`options${e.Bcategory_id}`),n.BudgetName=e.BudgetName,console.log(e.BudgetName)}),v[e.Bcategory_id]){const o=document.createElement("div");o.classList.add("options"),o.id=`options${e.Bcategory_id}`,o.style.display="none",o.innerHTML=v[e.Bcategory_id].map(l=>`
                    <div class="option" data-option="${l.BudgetDetails}">${l.BudgetDetails}</div>
                    `).join(""),t.appendChild(o),o.querySelectorAll(".option").forEach(l=>{l.addEventListener("click",u=>{S(l.dataset.option,u),n.BudgetDetails=l.dataset.option,console.log(l.dataset.option)})})}i.appendChild(t)});const E=localStorage.getItem("UserChooseDiv"),d=JSON.parse(E);if(E){const e=d.Budget_id;localStorage.setItem("Budget_id",e),g.get(`http://localhost:8080/budget/UserBudget/${r}/${e}`).then(function(t){console.log("抓使用者點選的資料方塊",d),console.log("這裡是最近預算資料方塊ID",d.Budget_id);const o=new Date(d.BudgetDate),l=o.toLocaleDateString("sv-SE"),u=document.querySelector(".topDiv");u.innerHTML="",u.innerHTML=`
                                <a class="category" href="#modal2" id="open-modal2">${d.BudgetName}</a>
                                <input class="date" id="userChooseDate" type="date" value="${l}"></input>
                                <a href="./budget.html" class="close" onclick="closeModal()">X</a>
                            `,document.getElementById("open-modal2").addEventListener("click",()=>{document.getElementById("overlay2").classList.add("active"),document.getElementById("modal2").classList.add("active")});const I=document.querySelector(".middleForm");I.innerHTML="",I.innerHTML=`
                            <div>
                                <span>金額</span>
                                <input id="userMoney" type="text" placeholder="輸入金額" required value="${d.Cost}"><br><br>
                            </div>
                            <div>
                                <span>內容</span>
                                <input id="userContent" type="text" placeholder="輸入內容" value="${d.BudgetContent}"><br><br>
                            </div>
                            <div>
                                <span>已付</span>
                                <input id="userCheck" type="checkbox" class="checkBox" ${d.PaidStatus===1?"checked":""}>
                            </div>
                            <div>
                                <span>付款人</span>
                                <input id="userWhoPaid" type="text" placeholder="輸入付款人" required value="${d.WhoPay}"><br><br>
                            </div>
                    `,console.log("原本的值",d.BudgetName);function f(){document.querySelector(".okBtn").addEventListener("click",()=>{document.getElementById("modal2"),n&&(u.innerHTML=`
                                <a class="category" href="#modal2" id="open-modal2">${n.BudgetName}</a>
                                <input class="date" id="userChooseDate" type="date" value="${o}"></input>
                                <a href="./budget.html" class="close" onclick="closeModal()">X</a>
                            `),m()})}document.getElementById("open-modal2").addEventListener("click",()=>{B(),f()}),document.querySelector(".submitBtn").addEventListener("click",()=>{const y={sch_id:r,BudgetName:n.BudgetName||"",BudgetDetails:n.BudgetDetails||"",BudgetDate:document.querySelector(".date").value,Cost:document.getElementById("userMoney").value||0,BudgetContent:document.getElementById("userContent").value||"",PaidStatus:document.getElementById("userCheck").checked?1:0,WhoPay:document.getElementById("userWhoPaid").value||""};g.put(`http://localhost:8080/budget/UserBudget/${r}/${e}`,y).then(s=>{console.log("更新成功 pika",s.data),window.location.href="../pages/budget.html"}).catch(s=>(console.error("更新失敗：",s),console.error("Error during budget update:",err),res.status(500).send({message:err.message,error:err})))}),document.getElementById("deleteBtn").addEventListener("click",()=>{const y=d.Budget_id;console.log(y),g.delete(`http://localhost:8080/budget/UserBudget/${r}/${e}`).then(s=>{console.log("更新成功 pika",s.data),window.location.href="../pages/budget.html"}).catch(s=>{console.error("更新失敗：",s)})})})}if(L){let e=function(){document.querySelector(".okBtn").addEventListener("click",()=>{document.getElementById("modal2");const t=document.querySelector(".topDiv");t.innerHTML="",n&&(t.innerHTML=`
                                <a class="category" href="#modal2" id="open-modal2">${n.BudgetName}</a>
                                <input id="userChooseDate" class="date" type="date"></input>
                                <a href="./budget.html" class="close" onclick="closeModal()">X</a>
                            `),m()})};console.log("目前沒有存到資料區塊的資料 大成功......"),console.log(n),document.getElementById("open-modal2").addEventListener("click",()=>{B(),e()}),document.querySelector(".submitBtn").addEventListener("click",()=>{const t={sch_id:r,BudgetName:n.BudgetName,BudgetDetails:n.BudgetDetails,BudgetDate:document.querySelector(".date").value,Cost:document.getElementById("userMoney").value,BudgetContent:document.getElementById("userContent").value,PaidStatus:document.getElementById("userCheck").checked?1:0,WhoPay:document.getElementById("userWhoPaid").value};console.log(t),g.post(`http://localhost:8080/budget/UserBudget/${r}`,t).then(o=>{console.log("新增成功"),window.location.href="../pages/budget.html"}).catch(o=>{console.error("更新失敗：",o)})})}}).catch(a=>{console.error("無法取得種類:",a)});function C(){document.getElementById("overlay").style.display="block",document.getElementById("modal").style.display="block"}document.addEventListener("DOMContentLoaded",C);document.addEventListener("DOMContentLoaded",()=>{D()});function D(){document.getElementById("open-modal2").addEventListener("click",B),document.querySelector(".close2").addEventListener("click",m),document.querySelector(".okBtn").addEventListener("click",m)}function B(){console.log("HIIIIIIIIIIIII"),document.getElementById("overlay2").classList.add("active"),document.getElementById("modal2").classList.add("active")}function m(){document.getElementById("overlay2").classList.remove("active"),document.getElementById("modal2").classList.remove("active"),D()}function k(a){const c=document.getElementById(a);c?c.style.display=c.style.display==="flex"?"none":"flex":console.error(`ID '${a}' not found`)}function S(a,c){c.stopPropagation(),alert(`已選擇：${a}`),document.querySelectorAll(".option").forEach(p=>{p.classList.remove("active")}),c.currentTarget.classList.add("active")}
