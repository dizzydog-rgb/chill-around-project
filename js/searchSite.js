

$(document).ready(function(){
    // 景點卡片生成
    const sitecardData = [
        { title: "景點名稱1", location: "地點1", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        // 添加更多卡片資料
    ];
     $.each(sitecardData, function(index, data){
        //  console.log(data.image);
        let siteCard = `<div class="col-md-3 p-0 m-0">
        <div id="siteCard" class="allCard  card bg-primary">
            <div class="cardImage">
                <img src="${data.image}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${data.title}</h5>
                <p class="card-subtitle">${data.location}</p>
            </div>
            <div class="btnOverlay dropdown">
                <button type="button" class="addBtn btn btn-primary dropdown-toggle dropdown-toggle-split" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                    加入行程
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#">選項 1</a></li>
                    <li><a class="dropdown-item" href="#">選項 2</a></li>
                    <li><a class="dropdown-item" href="#">選項 3</a></li>
                </ul>
            </div>
        </div>
    </div>`;
        $("#sitecardBox").append(siteCard);
     })
     
     // 美食卡片生成
     const foodcardData = [
        { title: "景點名稱1", location: "地點1", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/tainan.jpeg" },
        // 添加更多卡片資料
    ];
     $.each(foodcardData, function(index, data){
        //  console.log(data.image);
        let siteCard = `<div class="col-md-3 p-0">
        <div id="foodCard" class="allCard no-margin card bg-primary">
            <div class="cardImage">
                <img src="${data.image}" alt="">
            </div>
            <div class="cardOverlay">
                <h5 class="card-title ">${data.title}</h5>
                <p class="card-subtitle">${data.location}</p>
            </div>
            <div class="btnOverlay dropdown">
                <button type="button" class="addBtn btn btn-primary dropdown-toggle dropdown-toggle-split" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false">
                    加入行程
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#">選項 1</a></li>
                    <li><a class="dropdown-item" href="#">選項 2</a></li>
                    <li><a class="dropdown-item" href="#">選項 3</a></li>
                </ul>
            </div>
        </div>
    </div>`;
        $("#foodcardBox").append(siteCard);
     })

     
});