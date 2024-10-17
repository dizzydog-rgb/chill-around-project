import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-D11julBS.js";/* empty css            */$(document).ready(function(){const i=[{title:"景點名稱1",location:"地點1",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱2",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱3",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱4",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱5",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱6",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱7",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱8",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"},{title:"景點名稱8",location:"地點2",image:"../assets/images/searchSite/chimeiMuseum.jpeg"}];$.each(i,function(t,e){let a=`<div class="col-md-4 p-0 m-0">
                <div id="siteCard" class="allCard card bg-primary m-0">
                    <div class="cardImage">
                        <!-- <img src="../assets/images/searchSite/siteRecommend/fff.png" alt=""> -->
                        <img src="${e.image}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title ">${e.title}</h5>
                        <p class="card-subtitle">${e.location}</p>
                    </div>
                    <div class="btnOverlay">
                       <a id="likeBtn" class="bi bi-heart""></a>
                </a>
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
                    </div>
                </div>
            </div>`;$("#sitecardBox").append(a)})});$(document).on("click","#likeBtn",function(){$(this).toggleClass("bi-heart bi-heart-fill")});$("#itinerarySelect").change(function(){$(this).val()?$("#daySelectContainer").show():$("#daySelectContainer").hide()});$("#exampleModal").on("hide.bs.modal",function(){$("#daySelectContainer").hide(),$("#itinerarySelect").val(""),$("#daySelect").val("")});
