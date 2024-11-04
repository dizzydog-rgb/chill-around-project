import"./all-B7fgtTnm.js";import{a as y}from"./axios-CCb-kr4I.js";import"./login-nusU8p98.js";const _=localStorage.getItem("emailid");console.log("emailid:",_);const p=localStorage.getItem("scheduleId");console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ",p);document.querySelector(".increaseBtn").addEventListener("click",()=>{localStorage.setItem("Adding",!0),window.location.href="popupBudget.html"});const D={交通:"../assets/images/Budget_Item/Budget/commute.png",住宿:"../assets/images/Budget_Item/Budget/rest.png",飲食:"../assets/images/Budget_Item/Budget/food.png",活動:"../assets/images/Budget_Item/Budget/activity_ticket.png",娛樂:"../assets/images/Budget_Item/Budget/entertainment.png",購物:"../assets/images/Budget_Item/Budget/shopping.png",保險:"../assets/images/Budget_Item/Budget/insurance.png",行李:"../assets/images/Budget_Item/Budget/travel_luggage_and_bags.png",小費:"../assets/images/Budget_Item/Budget/tips.png",健康:"../assets/images/Budget_Item/Budget/medication_liquid.png",雜項:"../assets/images/Budget_Item/Budget/unexpectable.png",回程:"../assets/images/Budget_Item/Budget/back_home.png",其他:"../assets/images/Budget_Item/Budget/others.png"};y.get(`http://localhost:8080/budget/UserBudget/${p}`).then(function(s){console.log("總資料:",s.data);const B=document.querySelector(".historyDiv");B.innerHTML="";let g="",n;const c=Array.isArray(s.data)?s.data:[s.data],r=c[0].UserBudget;r.sort((e,t)=>new Date(e.BudgetDate)-new Date(t.BudgetDate)),console.log("歷史區要渲染的資料",r),r.forEach(e=>{const a=new Date(e.BudgetDate).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"/");a!==g&&(g=a,n=document.createElement("div"),n.className="dayHistory",n.innerHTML=`<span class="historyDate">${g}</span>`,B.appendChild(n));const o=D[e.BudgetName],i=document.createElement("div");i.className="historyContent",i.setAttribute("data-budget-id",e.Budget_id),i.innerHTML=`
                <img src="${o}">
                <span class="leftCategory">${e.BudgetName} ${e.BudgetDetails}</span>
                <span class="unpaid">${e.PaidStatus===0?"未付":""}</span>
                <span class="rightMoney">${e.Cost}</span>
            `,n.appendChild(i),i.addEventListener("click",()=>{const C=e;localStorage.setItem("UserChooseDiv",JSON.stringify(C)),window.location.href="../pages/popupBudget.html"}),document.querySelector(".increaseBtn").addEventListener("click",()=>{localStorage.removeItem("UserChooseDiv"),window.location.href="../pages/popupBudget.html"})});const d=c[0].TotalAndifPaid;console.log("總額、已付和未付資料",d);const l=document.querySelector(".rightbarDiv");l.innerHTML="";const u=document.createElement("div");u.className="ringProtect",u.innerHTML=`
                        <div class="ringProtect">
                            <div class="circle-ring">
                                <span>NT $${d[0].TotalCost}</span>
                                <span>Total Cost</span>
                            </div>
                            <div class="paid">
                                <div>
                                    <span>未付金額</span>
                                    <br>
                                    <span>NT$${d[0].TotalUnpaid}</span>
                                </div>
                                <div>
                                    <span>已付金額</span>
                                    <br>
                                    <span>NT$${d[0].TotalPaid}</span>
                                </div>
                            </div>
                        </div>
            `,l.appendChild(u);const h=c[0].CategoryCost;console.log("大種類總額資料",h);const m=document.createElement("div");m.className="categoryDiv",l.appendChild(m);let v="";h.forEach(e=>{const t=e.BudgetName,a=D[e.BudgetName];if(v!==t){v=t;const o=document.createElement("div");o.className="categoryHistory",o.innerHTML=`
                            <img src="${a}">
                            <span>${t}</span>
                            <span class="Money">NT$ ${e.TotalByBudgetName}</span>
                `,m.appendChild(o)}}),y.get(`http://localhost:8080/buildPlan/editPlan/${p}`).then(function(e){const t=e.data[0].sch_name,a=document.querySelector('a[href="./editPlan.html"]');a&&(a.textContent=`返回編輯計畫 <${t}>`)})}).catch(function(s){console.error("獲取資料時發生錯誤:",s)});
