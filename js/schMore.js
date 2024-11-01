import axios from 'axios';
// 取得 localStorage 中的選項
// const selectedCity = localStorage.getItem('selectedCity');
// const selectedTag = localStorage.getItem('selectedTag');

// console.log("從 localStorage 取得:", selectedCity);
// console.log("從 localStorage 取得:", selectedTag);
const emailid = localStorage.getItem("emailid");
console.log("emailid:", emailid);

// 隨機選取資料
function getRandomData(dataArray, count) {
    if (dataArray.length <= count) return dataArray;
    return dataArray.sort(() => 0.5 - Math.random()).slice(0, count);
}

// 主函式，在 DOM 加載完成後執行
document.addEventListener("DOMContentLoaded", () => {
    // const selectSiteCity = localStorage.getItem('selectedCity');
    // const selectTagId = localStorage.getItem('selectedTag');
    const urlParams = new URLSearchParams(window.location.search);

    const selectSiteCity = urlParams.get('site_city');
    const selectTagId = urlParams.get('tag_id');
    console.log("URL Parameters:", selectSiteCity, selectTagId); // 檢查 URL 參數
    const cityCheckboxes = document.querySelectorAll('.cityCheckbox');
    const tagCheckboxes = document.querySelectorAll('.tagCheckbox');

    // // 設置核取方塊狀態並綁定事件
    // cityCheckboxes.forEach(checkbox => {
    //     checkbox.checked = (selectSiteCity === checkbox.value);
    //     checkbox.addEventListener('change', updateCards);
    // });

    // tagCheckboxes.forEach(checkbox => {
    //     checkbox.checked = (selectTagId === checkbox.value);
    //     checkbox.addEventListener('change', updateCards);
    // });

    // 初始渲染卡片
    if (selectSiteCity && selectTagId) {
        // 根據 URL 中的參數設置核取方塊的狀態
        cityCheckboxes.forEach(checkbox => {
            checkbox.checked = (selectSiteCity === checkbox.value); // 設置核取方塊狀態
        })
        tagCheckboxes.forEach(checkbox => {
            checkbox.checked = (selectTagId === checkbox.value);
        });
        updateCards();
    } else {
        renderRandomCards();
    }
});

// 初始化加載喜好項目
function loadLikedItems() {
    return axios.get(`http://localhost:8080/schInfo/getLikedItems/${emailid}`)
        .then(response => response.data); // 返回已加 Like 的 sch_id 列表
}



// 更新並渲染符合條件的卡片
function updateCards() {
    const selectedRegions = Array.from(document.querySelectorAll('.cityCheckbox:checked')).map(checkbox => checkbox.value).join(',');
    const selectedTags = Array.from(document.querySelectorAll('.tagCheckbox:checked')).map(checkbox => checkbox.value).join(',');

    // 檢查篩選條件並更新顯示
    if (!selectedRegions && !selectedTags) {
        renderRandomCards(); // 如果沒有篩選條件，顯示隨機卡片
    } else {

        axios.get('http://localhost:8080/schInfo/getsch', {
            params: {
                site_city: selectedRegions,
                tag_id: selectedTags
            }
        })
            .then(response => {
                const attractions = response.data;
                const sitecardBox = document.getElementById('sitecardBox');
                sitecardBox.innerHTML = ''; // 清空目前顯示的卡片
                console.log("更新的卡片資料", attractions);


                if (attractions.length === 0) {
                    sitecardBox.innerHTML = '<h4 class ="mt-5">沒有符合條件的行程</h4>';
                } else {
                    // 獲取喜好項目並在渲染卡片
                    loadLikedItems().then(likedSchIds => {
                        renderCards(attractions, likedSchIds); // 將喜好項目傳入 renderCards
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching attractions:', error);
            });
    }
}

// 渲染卡片
function renderCards(attractions, likedSchIds) {

    console.log("取得的渲染資料", attractions);

    const sitecardBox = document.getElementById("sitecardBox");
    sitecardBox.innerHTML = ''; // 清空卡片區域

    attractions.forEach(data => {
        const siteCard = document.createElement("div");
        let startDate = data.edit_date.slice(0, 10);
        siteCard.className = "col-md-4 p-0 m-0";

        // 判斷是否為喜好項目，更新按鈕樣式
        const isLiked = likedSchIds.includes(data.sch_id) ? 'bi-heart-fill' : 'bi-heart';

        siteCard.innerHTML = `
            <div id="siteCard" class="allCard card bg-primary m-0" data-sch-id="${data.sch_id}">
                <div class="cardImage">
                    <img src="../assets/images/searchSite/${data.photo_one}" alt="">
                </div>
                <div class="cardOverlay">
                    <h5 class="card-title">${data.sch_name}</h5>
                    <p class="card-subtitle">${startDate}</p>
                </div>
                <div class="btnOverlay">
                    <a id="likeBtn" class="bi ${isLiked}" 
                       data-email-id="${data.emailid}"
                       data-sch-id="${data.sch_id}">
                    </a>
                </div>
            </div>
        `;

        sitecardBox.appendChild(siteCard);
    });
    // 確保在渲染完所有卡片後再綁定事件
    bindEventHandlers();
}

//移出卡片內的點擊事件
function bindEventHandlers() {
    attachLikeButtonHandler();
    attachCardClickHandler();

}

// 渲染隨機卡片
function renderRandomCards() {
    axios.get('http://localhost:8080/schInfo/getsch')
        .then(response => {
            const attraction = response.data;
            console.log("API 隨機的景點資料:", attraction); // 檢查 API 是否正確返回資料

            if (Array.isArray(attraction) && attraction.length > 0) {
                const randomSchData = getRandomData(attraction, 12);

                // 確認 loadLikedItems 取得 likedSchIds 後再渲染卡片
                loadLikedItems().then(likedSchIds => {
                    renderCards(randomSchData, likedSchIds); // 將 likedSchIds 傳入 renderCards
                });
            } else {
                console.error("資料格式不正確或沒有資料。", attraction);
            }
        })
        .catch(error => {
            console.error('Error fetching random attractions:', error);
        });
}

// 設置卡片點擊事件
function attachCardClickHandler() {
    document.querySelectorAll(".allCard").forEach(sch => {
        sch.addEventListener("click", (event) => {
            event.stopPropagation();
            const schId = event.currentTarget.getAttribute('data-sch-id');
            localStorage.setItem('selectedSchId', schId);
            console.log("點擊的卡片id", schId);
            window.location.href = "schCom.html";
        });
    });
}

// 設置喜好按鈕點擊事件
function attachLikeButtonHandler() {
    document.querySelectorAll('.bi-heart, .bi-heart-fill').forEach(likeBtn => { // 確保兩種狀態都包含
        likeBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // 阻止冒泡，避免觸發卡片點擊事件

            //登入判斷式
            if (!token) {
                e.preventDefault();
                e.stopPropagation(); // 防止事件冒泡，確保不顯示模態
                alert("請先登入");
                window.location.href = 'index.html';
                return;
            }

            // 獲取目前的按鈕樣式狀態
            const isLiked = e.target.classList.contains('bi-heart-fill');

            // 取得卡片的 sch_id 和 user_id
            const schId = e.target.getAttribute('data-sch-id');
            const userId = e.target.getAttribute('data-email-id');
            const postData = {
                emailid: emailid,
                sch_id: schId
            };

            // 判斷目前是加 like 還是取消 like
            if (!isLiked) {
                // 如果是 bi-heart（尚未加 like），則進行加入請求
                axios.post('http://localhost:8080/schInfo/getToLike', postData)
                    .then(response => {
                        console.log('資料已成功發送:', postData);
                        alert("加入成功");
                        // 切換樣式為已加 like
                        e.target.classList.add('bi-heart-fill');
                        e.target.classList.remove('bi-heart');
                    })
                    .catch(error => {
                        alert("加入失敗");
                        console.error('無法發送資料:', error);
                    });
            } else {
                // 如果是 bi-heart-fill（已加 like），則進行刪除請求
                axios.delete('http://localhost:8080/schInfo/removeLike', { data: postData })
                    .then(response => {
                        console.log('資料已成功刪除:', postData);
                        alert("已取消");
                        // 切換樣式為取消 like
                        e.target.classList.add('bi-heart');
                        e.target.classList.remove('bi-heart-fill');
                    })
                    .catch(error => {
                        alert("取消失敗");
                        console.error('無法刪除資料:', error);
                    });
            }
        });
    });
}


// 呼叫主函式以載入頁面
// renderRandomCards();


// 綁定事件
document.querySelectorAll('.cityCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});
document.querySelectorAll('.tagCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCards);
});



