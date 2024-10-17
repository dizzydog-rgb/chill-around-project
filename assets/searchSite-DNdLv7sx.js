import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-LmBCpWwE.js";/* empty css            */$(document).ready(function(){const t=[{title:"景點名稱1",location:"地點1",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"}];$.each(t,function(s,a){let e=`<div class="col-md-3 p-0 m-0">
        <div id="siteCard" class="allCard  card bg-primary">
            <div class="cardImage">
                <img src="${a.image}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${a.title}</h5>
                <p class="card-subtitle">${a.location}</p>
            </div>
            <div class="btnOverlay">
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
            </div>
        </div>
    </div>`;$("#sitecardBox").append(e)});const i=[{title:"景點名稱1",location:"地點1",image:"../assets/images/searchSite/tainan.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/tainan.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/tainan.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/tainan.jpeg"}];$.each(i,function(s,a){let e=`<div class="col-md-3 p-0">
        <div id="foodCard" class="allCard no-margin card bg-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="cardImage">
                <img src="${a.image}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${a.title}</h5>
                <p class="card-subtitle">${a.location}</p>
            </div>
            <div class="btnOverlay">
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
            </div>
        </div>
    </div>`;$("#foodcardBox").append(e)}),$("#itinerarySelect").change(function(){$(this).val()?$("#daySelectContainer").show():$("#daySelectContainer").hide()}),$("#exampleModal").on("hide.bs.modal",function(){$("#daySelectContainer").hide(),$("#itinerarySelect").val(""),$("#daySelect").val("")})});
