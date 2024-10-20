import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-JssQaTV8.js";import{a as r}from"./axios-CCb-kr4I.js";/* empty css            */function l(){return r.get("http://localhost:8080/site/allsite/all/randomCity").then(t=>{console.log("取得資料"+t.data),console.log(t.data),t.data.forEach(e=>{d(e)})}).catch(t=>{console.error("Error fetching random attractions:",t)})}document.addEventListener("DOMContentLoaded",()=>{l()});function n(){const t=Array.from(document.querySelectorAll(".cityCheckbox:checked")).map(e=>e.value).join(","),a=Array.from(document.querySelectorAll(".tagCheckbox:checked")).map(e=>e.value).join(",");r.get("http://localhost:8080/site/allsite/select",{params:{site_city:t,tag_id:a}}).then(e=>{const o=e.data,c=document.getElementById("sitecardBox");c.innerHTML="",o.length===0&&(c.innerHTML="<p>沒有符合條件的景點。</p>"),o.forEach(s=>{d(s)})}).catch(e=>{console.error("Error fetching attractions:",e),alert("無法獲取資料，請稍後再試。")})}document.querySelectorAll(".cityCheckbox").forEach(t=>{t.addEventListener("change",n)});document.querySelectorAll(".tagCheckbox").forEach(t=>{t.addEventListener("change",n)});function d(t){console.log(t);const a=document.getElementById("sitecardBox"),e=document.createElement("div");e.className="col-md-4 p-0 m-0",e.innerHTML=`
                <div id="siteCard" class="allCard card bg-primary m-0">
                    <div class="cardImage">
                        <img src="../assets/images/searchSite/${t.photo_one}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title">${t.site_name}</h5>
                        <p class="card-subtitle">${t.site_city}</p>
                    </div>
                    <div class="btnOverlay">
                        <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            加入行程
                        </button>
                    </div>
                </div>`,a.appendChild(e)}
