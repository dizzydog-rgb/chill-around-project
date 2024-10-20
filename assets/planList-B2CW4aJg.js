import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-JssQaTV8.js";import"./planMap-DOHjZShS.js";import{a as s}from"./axios-CCb-kr4I.js";import"./ejs-D9u4eSHU.js";/* empty css            */s.get("http://localhost:8080/buildPlan/planList").then(function(t){const i=t.data;l(i)}).catch(function(t){console.log(t),console.log("請求失敗")}).finally(function(){});function l(t){const i=document.querySelector(".cardList");i.innerHTML="",t.forEach(e=>{const n=document.createElement("li");let a=e.edit_date.slice(0,10),c=e.end_date.slice(0,10);n.innerHTML=`
            <a  href="http://localhost:5173/chill-around-project/pages/editPlan/${e.sch_id}">    
            <li class="d-flex justify-content-center">
                <div class="card" style="width: 90%">
                  <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title"></h5>
                    <div class="editBtn">
                      <button type="button" class="btn btn-outline-danger">
                        <i class="bi bi-three-dots"></i>
                      </button>
                    </div>
                  </div>
                  <img
                    src="${e.sch_image}"
                    class="card-img-top"
                  />
                  <div class="card-body d-flex justify-content-between">
                    <div>
                      <h5 class="card-title">${e.sch_name}</h5>
                      <p class="card-text">${a} - ${c}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <button type="button" class="btn btn-outline-primary">
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              </a>
      `,i.appendChild(n)})}
