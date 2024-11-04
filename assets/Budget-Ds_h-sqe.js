import"./all-DcTbhZgf.js";import{a as C}from"./axios-CCb-kr4I.js";const y=localStorage.getItem("scheduleId");console.log("皮卡：目前從 localStorage 取得 sch_id: ------- ",y);document.querySelector(".increaseBtn").addEventListener("click",()=>{localStorage.setItem("Adding",!0),window.location.href="popupBudget.html"});const v={交通:"../assets/images/Budget_Item/Budget/commute.png",住宿:"../assets/images/Budget_Item/Budget/rest.png",飲食:"../assets/images/Budget_Item/Budget/food.png",活動:"../assets/images/Budget_Item/Budget/activity_ticket.png",娛樂:"../assets/images/Budget_Item/Budget/entertainment.png",購物:"../assets/images/Budget_Item/Budget/shopping.png",保險:"../assets/images/Budget_Item/Budget/insurance.png",行李:"../assets/images/Budget_Item/Budget/travel_luggage_and_bags.png",小費:"../assets/images/Budget_Item/Budget/tips.png",健康:"../assets/images/Budget_Item/Budget/medication_liquid.png",雜項:"../assets/images/Budget_Item/Budget/unexpectable.png",回程:"../assets/images/Budget_Item/Budget/back_home.png",其他:"../assets/images/Budget_Item/Budget/others.png"};C.get(`http://localhost:8080/budget/UserBudget/${y}`).then(function(t){console.log("總資料:",t.data);const m=document.querySelector(".historyDiv");m.innerHTML="";let g="",n;const c=Array.isArray(t.data)?t.data:[t.data],r=c[0].UserBudget;r.sort((e,a)=>new Date(e.BudgetDate)-new Date(a.BudgetDate)),console.log("歷史區要渲染的資料",r),r.forEach(e=>{const i=new Date(e.BudgetDate).toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"/");i!==g&&(g=i,n=document.createElement("div"),n.className="dayHistory",n.innerHTML=`<span class="historyDate">${g}</span>`,m.appendChild(n));const s=v[e.BudgetName];console.log("在這!!!!!!!!",s);const o=document.createElement("div");o.className="historyContent",o.setAttribute("data-budget-id",e.Budget_id),o.innerHTML=`
                <img src="${s}">
                <span class="leftCategory">${e.BudgetName} ${e.BudgetDetails}</span>
                <span class="unpaid">${e.PaidStatus===0?"未付":""}</span>
                <span class="rightMoney">${e.Cost}</span>
            `,n.appendChild(o),o.addEventListener("click",()=>{const D=e;localStorage.setItem("UserChooseDiv",JSON.stringify(D)),window.location.href="../pages/popupBudget.html"}),document.querySelector(".increaseBtn").addEventListener("click",()=>{localStorage.removeItem("UserChooseDiv"),window.location.href="../pages/popupBudget.html"})});const d=c[0].TotalAndifPaid;console.log("總額、已付和未付資料",d);const l=document.querySelector(".rightbarDiv");l.innerHTML="";const u=document.createElement("div");u.className="ringProtect",u.innerHTML=`
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
            `,l.appendChild(u);const B=c[0].CategoryCost;console.log("大種類總額資料",B);const p=document.createElement("div");p.className="categoryDiv",l.appendChild(p);let h="";B.forEach(e=>{const a=e.BudgetName,i=v[e.BudgetName];if(h!==a){h=a;const s=document.createElement("div");s.className="categoryHistory",s.innerHTML=`
                            <img src="${i}">
                            <span>${a}</span>
                            <span class="Money">NT$ ${e.TotalByBudgetName}</span>
                `,p.appendChild(s)}})}).catch(function(t){console.error("獲取資料時發生錯誤:",t)});
