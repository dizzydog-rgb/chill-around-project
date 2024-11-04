import"./all-DcTbhZgf.js";import{a as g}from"./axios-CCb-kr4I.js";const r=localStorage.getItem("scheduleId"),D=localStorage.getItem("Adding");console.log("有取到新增按鈕資料嗎",D);console.log("皮卡：目前從 localStorage 取得: ------- ",r);g.get("http://localhost:8080/Budget/popupbudget").then(a=>{const c=a.data.Category,B=a.data.Details,i=document.querySelector(".modalContent2");i.innerHTML="";const p=`
            <div class="topDiv2">
                <a class="close2" href="#"><</a>
                <button class="okBtn">確認</button>
                </div>
                `;i.innerHTML+=p,i.querySelector(".close2").addEventListener("click",()=>{m()});const h=B.reduce((e,t)=>(e[t.Bcategory_id]||(e[t.Bcategory_id]=[]),e[t.Bcategory_id].push(t),e),{}),d={BudgetName:"",BudgetDetails:""};c.forEach(e=>{const t=document.createElement("div");if(t.classList.add("category2"),t.innerHTML=`
                <div class="tiTle" data-id="${e.Bcategory_id}">
                    ${e.BudgetName} <a>···</a>
                </div>
                `,t.querySelector(".tiTle").addEventListener("click",()=>{k(`options${e.Bcategory_id}`),d.BudgetName=e.BudgetName,console.log(e.BudgetName)}),h[e.Bcategory_id]){const o=document.createElement("div");o.classList.add("options"),o.id=`options${e.Bcategory_id}`,o.style.display="none",o.innerHTML=h[e.Bcategory_id].map(l=>`
                    <div class="option" data-option="${l.BudgetDetails}">${l.BudgetDetails}</div>
                    `).join(""),t.appendChild(o),o.querySelectorAll(".option").forEach(l=>{l.addEventListener("click",u=>{I(l.dataset.option,u),d.BudgetDetails=l.dataset.option,console.log(l.dataset.option)})})}i.appendChild(t)});const v=localStorage.getItem("UserChooseDiv"),n=JSON.parse(v);if(v){const e=n.Budget_id;localStorage.setItem("Budget_id",e),g.get(`http://localhost:8080/budget/UserBudget/${r}/${e}`).then(function(t){console.log("抓使用者點選的資料方塊",n),console.log("這裡是最近預算資料方塊ID",n.Budget_id);const o=new Date(n.BudgetDate),l=o.toLocaleDateString("sv-SE"),u=document.querySelector(".topDiv");u.innerHTML="",u.innerHTML=`
                                <a class="category" href="#modal2" id="open-modal2">${n.BudgetName}</a>
                                <input class="date" id="userChooseDate" type="date" value="${l}"></input>
                                <a href="./Budget.html" class="close" onclick="closeModal()">X</a>
                            `,document.getElementById("open-modal2").addEventListener("click",()=>{document.getElementById("overlay2").classList.add("active"),document.getElementById("modal2").classList.add("active")});const E=document.querySelector(".middleForm");E.innerHTML="",E.innerHTML=`
                            <div>
                                <span>金額</span>
                                <input id="userMoney" type="text" placeholder="輸入金額" required value="${n.Cost}"><br><br>
                            </div>
                            <div>
                                <span>內容</span>
                                <input id="userContent" type="text" placeholder="輸入內容" value="${n.BudgetContent}"><br><br>
                            </div>
                            <div>
                                <span>已付</span>
                                <input id="userCheck" type="checkbox" class="checkBox" ${n.PaidStatus===1?"checked":""}>
                            </div>
                            <div>
                                <span>付款人</span>
                                <input id="userWhoPaid" type="text" placeholder="輸入付款人" required value="${n.WhoPay}"><br><br>
                            </div>
                    `,console.log("原本的值",n.BudgetName);function f(){document.querySelector(".okBtn").addEventListener("click",()=>{document.getElementById("modal2"),d&&(u.innerHTML=`
                                <a class="category" href="#modal2" id="open-modal2">${d.BudgetName}</a>
                                <input class="date" id="userChooseDate" type="date" value="${o}"></input>
                                <a href="./Budget.html" class="close" onclick="closeModal()">X</a>
                            `),m()})}document.getElementById("open-modal2").addEventListener("click",()=>{L(),f()}),document.querySelector(".submitBtn").addEventListener("click",()=>{const y={sch_id:r,BudgetName:d.BudgetName||"",BudgetDetails:d.BudgetDetails||"",BudgetDate:document.querySelector(".date").value,Cost:document.getElementById("userMoney").value||0,BudgetContent:document.getElementById("userContent").value||"",PaidStatus:document.getElementById("userCheck").checked?1:0,WhoPay:document.getElementById("userWhoPaid").value||""};g.put(`http://localhost:8080/budget/UserBudget/${r}/${e}`,y).then(s=>{console.log("更新成功 pika",s.data),window.location.href="../pages/Budget.html"}).catch(s=>(console.error("更新失敗：",s),console.error("Error during budget update:",err),res.status(500).send({message:err.message,error:err})))}),document.getElementById("deleteBtn").addEventListener("click",()=>{const y=n.Budget_id;console.log(y),g.delete(`http://localhost:8080/budget/UserBudget/${r}/${e}`).then(s=>{console.log("更新成功 pika",s.data),window.location.href="../pages/Budget.html"}).catch(s=>{console.error("更新失敗：",s)})})})}if(D){let e=function(){document.querySelector(".okBtn").addEventListener("click",()=>{document.getElementById("modal2");const t=document.querySelector(".topDiv");t.innerHTML="",d&&(t.innerHTML=`
                                <a class="category" href="#modal2" id="open-modal2">${d.BudgetName}</a>
                                <input id="userChooseDate" class="date" type="date"></input>
                                <a href="./Budget.html" class="close" onclick="closeModal()">X</a>
                            `),m()})};console.log("目前沒有存到資料區塊的資料 大成功......"),console.log(d),document.getElementById("open-modal2").addEventListener("click",()=>{L(),e()}),document.querySelector(".submitBtn").addEventListener("click",()=>{const t={sch_id:r,BudgetName:d.BudgetName,BudgetDetails:d.BudgetDetails,BudgetDate:document.querySelector(".date").value,Cost:document.getElementById("userMoney").value,BudgetContent:document.getElementById("userContent").value,PaidStatus:document.getElementById("userCheck").checked?1:0,WhoPay:document.getElementById("userWhoPaid").value};console.log(t),g.post(`http://localhost:8080/budget/UserBudget/${r}`,t).then(o=>{console.log("新增成功"),window.location.href="../pages/Budget.html"}).catch(o=>{console.error("更新失敗：",o)})})}}).catch(a=>{console.error("無法取得種類:",a)});function C(){document.getElementById("overlay").style.display="block",document.getElementById("modal").style.display="block"}document.addEventListener("DOMContentLoaded",C);function L(){document.getElementById("open-modal2").addEventListener("click",()=>{document.getElementById("overlay2").classList.add("active"),document.getElementById("modal2").classList.add("active")})}function m(){document.getElementById("overlay2").classList.remove("active"),document.getElementById("modal2").classList.remove("active")}document.querySelector(".close2").addEventListener("click",m);document.querySelector(".okBtn").addEventListener("click",m);function k(a){const c=document.getElementById(a);c?(c.style.display=c.style.display==="flex"?"none":"flex",alert("展開或收回")):console.error(`ID '${a}' not found`)}function I(a,c){c.stopPropagation(),alert(`你選擇了: ${a}`),document.querySelectorAll(".option").forEach(p=>{p.classList.remove("active")}),c.currentTarget.classList.add("active")}
