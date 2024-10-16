$(document).ready(function () {
    const sitecardData = [
        { title: "景點名稱1", location: "地點1", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱2", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱3", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱4", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱5", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱6", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱7", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱8", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" },
        { title: "景點名稱8", location: "地點2", image: "../assets/images/searchSite/chimeiMuseum.jpeg" }
        // 添加更多卡片資料
    ];
    $.each(sitecardData, function (index, data) {
        //  console.log(data.image);
        let siteCard = `<div class="col-md-4 p-0 m-0">
                <div id="siteCard" class="allCard card bg-primary m-0">
                    <div class="cardImage">
                        <!-- <img src="../assets/images/searchSite/siteRecommend/fff.png" alt=""> -->
                        <img src="${data.image}" alt="">
                    </div>
                    <div class="cardOverlay">
                        <h5 class="card-title ">${data.title}</h5>
                        <p class="card-subtitle">${data.location}</p>
                    </div>
                    <div class="btnOverlay">
                       <a id="likeBtn" class="bi bi-heart""></a>
                </a>
                <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    加入行程
                </button>
                    </div>
                </div>
            </div>`;
        $("#sitecardBox").append(siteCard);
    })
})

//like click
$(document).on('click', '#likeBtn', function () {
    $(this).toggleClass('bi-heart bi-heart-fill');
});

//modal
// 當選擇行程時，顯示天數選擇
$('#itinerarySelect').change(function () {
    if ($(this).val()) {
        $('#daySelectContainer').show(); // 顯示天數選擇
    } else {
        $('#daySelectContainer').hide(); // 隱藏天數選擇
    }
});

// 確保關閉模態框時，隱藏天數選擇
$('#exampleModal').on('hide.bs.modal', function () {
    $('#daySelectContainer').hide(); // 隱藏天數選擇
    $('#itinerarySelect').val(''); // 重置行程選擇
    $('#daySelect').val(''); // 重置天數選擇
});