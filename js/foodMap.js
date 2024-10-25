let map ,marker,lat,lng;
let service;
let markers = []; // 儲存標記的陣列

window.addEventListener('beforeunload',()=>{
    localStorage.removeItem('selectedPlaceId')
})

async function initMap() {
    const defaultLocation = { lat: 25.0380, lng: 121.5637 }; // 台北市中心
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    // const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    //     "marker",
    // );
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 13
    });

    //這個方法是如果ＵＲＬ有儲存ＩＤ值
    const urlParams = new URLSearchParams(window.location.search);
    let placeId = urlParams.get('place_id'); // 從ＵＲＬ查詢字符串 獲取place_id的值
    if(!placeId){
        placeId = localStorage.getItem('selectedPlaceId');
        console.log('nofound')
    }
    if(placeId){
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({ placeId: placeId }, (placeDetails, status) => {
            console.log(placeDetails);
            
            if(status === google.maps.places.PlacesServiceStatus.OK){
                const marker = new google.maps.Marker({
                    map:map,
                    position: placeDetails.geometry.location,
                });
                
                    setModalContent(placeDetails); 
                    showModal(); // 開啟模態窗口
            
            }else {
                console.error("獲取詳細資訊失敗：", status); // 錯誤處理
            }
        });
    }else {
        console.warn("沒有找到 place ID。請檢查 URL 或 localStorage。");
    }
    // 設置 sessionStorage，用來識別刷新狀態
    sessionStorage.setItem('isRefreshed', 'true');

    
    // infowindow = new google.maps.InfoWindow();
}

// function selectStore(){
//     const urlParams = new URLSearchParams(window.location.search);
//     let placeId = urlParams.get('place_id');
//     if(!placeId){
//         placeId = localStorage.getItem('selectedPlaceId');
//     }

//     if(placeId){
//         const service = new google.maps.places.PlacesService(map);
//         service.getDetails({ placeId: placeId }, (placeDetails, status) => {
//             if(status === google.maps.places.PlacesServiceStatus.Ok){
//                 const marker = new google.maps.Marker({
//                     map:map,
//                     position: placeDetails.geometry.location,
//                 });
//                 google.maps.event.addListener(marker, 'click',function(){
//                     setModalContent(placeDetails);
//                     showModal(); // 開啟模態窗口
//                 })
                       
//             }
//         });
//     }

// };


// 搜尋附近店家
function searchNearby() {
    const region = document.getElementById('myRegion').value;
    const category = document.getElementById('foodstoreCategory').value;
    if (!region||!category  ) {
    alert("請選擇一個地區與類別!")
    return;
    }else{
    console.log("成功輸入");
    }                 
    // 依據地區設定中心點
    let center;
    switch (region) {
    case 'Taipei':
        center = { lat: 25.0380, lng: 121.5637 }; // 台北市
        break;
    case 'NewTaipei':
        center = { lat: 25.0160, lng: 121.4620 }; // 新北市
        break;
    case 'Keelung':
        center = { lat: 25.1282, lng: 121.7395 }; // 基隆
        break;
    case 'Yilan':
        center = { lat: 24.7506, lng: 121.7590 }; // 宜蘭
        break;
    case 'Hsinchu':
        center = { lat: 24.8030, lng: 120.9646 }; // 新竹市
        break;
    case 'Taoyuan':
        center = { lat: 24.9932, lng: 121.2956 }; // 桃園市
        break;
    case 'Miaoli':
        center = { lat: 24.5600, lng: 120.8237 }; // 苗栗
        break;
    case 'Taichung':
        center = { lat: 24.1477, lng: 120.6736 }; // 台中市
        break;
    case 'Changhua':
        center = { lat: 24.0801, lng: 120.5410 }; // 彰化
        break;
    case 'Nantou':
        center = { lat: 23.9568, lng: 120.6856 }; // 南投
        break;
    case 'Yunlin':
        center = { lat: 23.7189, lng: 120.5019 }; // 雲林
        break;
    case 'Chiayi':
        center = { lat: 23.4826, lng: 120.4414 }; // 嘉義
        break;
    case 'Tainan':
        center = { lat: 23.0004, lng: 120.2270 }; // 台南市
        break;
    case 'Kaohsiung':
        center = { lat: 22.6273, lng: 120.3014 }; // 高雄
        break;
    case 'Pingtung':
        center = { lat: 22.6672, lng: 120.48895 }; // 屏東
        break;
    case 'Hualien':
        center = { lat: 23.9759, lng: 121.6076 }; // 花蓮
        break;
    case 'Taitung':
        center = { lat: 22.7589, lng: 121.1430 }; // 台東
        break;
    default:
        center = { lat: 25.0380, lng: 121.5637 }; // 台北市
    }

    map.setCenter(center);


    const request = {
        location: center,
        radius: '9000',  // 搜尋半徑 1000 公尺
        keyword: category  // 使用選擇的類別關鍵字搜尋
    };

    service = new google.maps.places.PlacesService(map);
    clearMarkers();
    service.nearbySearch(request, callback);             
    // service = new google.maps.places.PlacesService(map);
    // service.nearbySearch(request, callback);
};
//  ---- end of searchNearby
// 點搜尋按鈕呼叫searchNearby
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#searchBtn'); // 按鈕ID
    if (button) {
        button.addEventListener('click', searchNearby);
    }
});

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearMarkers();
        document.getElementById('foodCardContainer').innerHTML = ''; // 清空舊的卡片
        results.forEach(place => {
            //  console.log(place);
             const marker = new google.maps.Marker({
                                position: place.geometry.location,
                                map: map,
                                title: place.name,
                                gmpClickable: true,
                            });
            markers.push(marker); // 將標記添加到標記陣列
            // 點擊標記顯示資訊窗口
            google.maps.event.addListener(marker, 'click',function(){
                console.log(this);
                
                // console.log(place.place_id);
                // openModalFromCard(place.place_id)
                service.getDetails({placeId: place.place_id},function(placeDetails, status){
                        if (status === google.maps.places.PlacesServiceStatus.OK){
                            setModalContent(placeDetails);
                            showModal(); // 開啟模態窗口
                        }else {
                            alert('無法獲取店家詳細資訊');
                        }
                });
                         
                     
            });
            const foodCardContainer = document.getElementById('foodCardContainer');
            foodCardContainer.classList.remove('d-none');
            // 創建美食卡片
            createFoodCard(place);
            // 增加鼠標懸停時的指標樣式
            google.maps.event.addListener(marker, 'mouseover', function() {
                this.setOptions({ cursor: 'pointer' }); // 鼠標變為手指
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                this.setOptions({ cursor: '' }); // 使其恢復為默認樣式
            });

        });//-- end forEach
     } else {
         alert("找不到符合條件的店家！");
    }
}
 //  ---- end of callbacks ----

 function savePlaceToData(place) {
    // 寫這段是為了讓後端可以正確取得照片
    const photoUrls = [];
    if (place.photos && place.photos.length > 0) {
        place.photos.forEach((photo) => {
            const photoUrl = photo.getUrl({ maxWidth: 800 }); // 獲取圖片的 URL
            photoUrls.push(photoUrl); // 將 URL 添加到陣列中
        });
    }

    // 準備要儲存的資料
    const placeData = {
        id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        formatted_phone_number: place.formatted_phone_number,
        photos: photoUrls, // 使用獲取的照片 URL
        vicinity: place.vicinity,
        types: place.types,
        opening_hours_text: place.opening_hours ? place.opening_hours.weekday_text.join('<br>') : '無資料'
    };

    const xhr = new XMLHttpRequest(); // 創建一個新的 XMLHttpRequest 對象
    xhr.open('POST', 'http://localhost:8080/site/foodmap/add', true); // 設置請求
    xhr.setRequestHeader('Content-Type', 'application/json'); // 設置請求頭

    // 設置請求的回調函數
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log("----看照片-----");
            console.log(photoUrls); // 列印出所有照片的 URL
            console.log("店家資料儲存成功：" + xhr.responseText); // 請求成功，處理回應
        } else {
            console.error("店家資料儲存失敗，狀態碼：" + xhr.status);
        }
    };

    // 錯誤回調
    xhr.onerror = function() {
        console.error("請求出錯");
    };

    // 將資料轉換為 JSON 字串並發送
    xhr.send(JSON.stringify(placeData));
}


//  function savePlaceToData(place) {
    
//     const placeData = {
//         id: place.place_id,
//         name: place.name,
//         formatted_address: place.formatted_address,
//         formatted_phone_number: place.formatted_phone_number,
//         photos: place.photos,
//         vicinity: place.vicinity,
//         types: place.types,
//         opening_hours_text: place.opening_hours ? place.opening_hours.weekday_text.join('<br>') : '無資料'
//     };
    
//     const xhr = new XMLHttpRequest(); // 創建一個新的 XMLHttpRequest 對象
//     xhr.open('POST', 'http://localhost:8080/site/foodmap/add', true); // 設置請求
//     xhr.setRequestHeader('Content-Type', 'application/json'); // 設置請求頭

//     // 設置請求的回調函數
//     xhr.onload = function() {
//         if (xhr.status >= 200 && xhr.status < 300) {
//             console.log("----看照片-----")
//     console.log(photos[0].html_attributions[0])
//             console.log("店家資料儲存成功：" + xhr.responseText); // 請求成功，處理回應
//         } else {
//             console.error("店家資料儲存失敗，狀態碼：" + xhr.status);
//         }
//     };

//     // 錯誤回調
//     xhr.onerror = function() {
//         console.error("請求出錯");
//     };

//     // 將資料轉換為 JSON 字串並發送
//     xhr.send(JSON.stringify(placeData));
// }

 
//  function savePlaceToData(place){
//     const placeData ={
//         id: place.place_id,
//         name: place.name,
//         formatted_address: place.formatted_address,
//         formatted_phone_number: place.formatted_phone_number,
//         photos: place.photos,
//         vicinity: place.vicinity,
//         types: place.types,
//         geometry: place.geometry,
//         opening_hours_text: place.opening_hours? place.opening_hours.weekday_text.join('<br>') : '無資料'
//     }
//     console.log("place data 資料");
//     console.log(placeData);
//     axios.post(`http://localhost:8080/site/foodmap/add`,placeData)
//     .then(response =>{
//         console.log("店家資料儲存成功：" + response.data);
//     })
//     .catch(error =>{
//         console.error('店家資料儲存失敗',error);
//     });
    
// }


// 顯示 modal 的函數
function showModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';  // 設置背景顏色
    modal.classList.add('show'); // Bootstrap modal 顯示效果
    modal.setAttribute('aria-hidden', 'false');
}
// 關閉 modal 的函數
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    modal.classList.remove('show'); // Bootstrap modal 隱藏效果
    modal.setAttribute('aria-hidden', 'true'); // 將 aria-hidden 設為 true

}
function clearMarkers() {
// 清除地圖上的標記
markers.forEach(marker => marker.setMap(null));
markers = []; // 清空標記陣列
}

// 建立美食店家卡片
function createFoodCard(place) {
    const foodCardContainer = document.getElementById('foodCardContainer');
    // let cardElement;
    // 創建新的卡片元素
    const cardElement = document.createElement('div');
    cardElement.className = "foodCard card"; // 根據需要調整列的大小和間距
    cardElement.setAttribute('data-bs-toggle', 'modal');
    cardElement.setAttribute('data-bs-target', '#myModal');
    cardElement.innerHTML = `
        
        <div class="d-flex" onclick="openModalFromCard('${place.place_id}')">
            <div class="foodImage">
                <img src="${place.photos ? place.photos[0].getUrl({ maxWidth: 300 }) : '../assets/images/searchSite/tainan.jpeg'}" class="card-img-left" alt="卡片圖片">
            </div>
            <div class="card-body">
                <h6 class="card-title">${place.name}</h6>
                <div class="btnOverlay">
                    <button type="button" class="addBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        加入行程
                    </button >
                </div>                           
             </div>
        </div>
    `;
    // 將卡片添加到容器
    foodCardContainer.appendChild(cardElement);
}

function openModalFromCard(placeId) {
    service.getDetails({ placeId: placeId }, function (placeDetails, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            setModalContent(placeDetails); // 讓點擊卡片跳出相對應的店家資料
            savePlaceToData(placeDetails);
        } else {
            alert('無法獲取店家詳細資訊');
        }
    });
}

function setModalContent(placeDetails){
    console.log(placeDetails);
    
    // 將模態內容設置為對應的店家資料
    document.getElementById('infoTitle').innerText = placeDetails.name;
    document.getElementById('storeAdd').innerText = placeDetails.formatted_address.replace(/台灣/g, "").replace(/\d{5}/g, "").trim();
    document.getElementById('storePhone').innerText = placeDetails.formatted_phone_number || '無資料';
    document.getElementById('storeOpentime').innerHTML = placeDetails.opening_hours? placeDetails.opening_hours.weekday_text.join('<br>') : '無資料';
    // 清空輪播圖
    const carouselImages = document.getElementById('carousel-images');
    carouselImages.innerHTML = ''; // 清除舊的圖片
    if (placeDetails.photos && placeDetails.photos.length > 0) {
        placeDetails.photos.forEach((photo, index) => {
            const photoUrl = photo.getUrl({ maxWidth: 800 });
            console.log(photoUrl);
            
            // 創建新的 carousel-item 元素
            const carouselItem = document.createElement('div');
            carouselItem.className = `foodStoreItem carousel-item ${index === 0 ? 'active' : ''}`; // 第一次迴圈的圖片設為 active
            // 創建圖片元素
            const imgElement = document.createElement('img');
            imgElement.src = photoUrl;
            imgElement.className = 'd-block w-100'; // 加上 Bootstrap 類名
            // 將圖片添加到 carousel-item
            carouselItem.appendChild(imgElement);
            // 將 carousel-item 添加到輪播圖
            carouselImages.appendChild(carouselItem);
        });
    } else {
        carouselImages.innerHTML = '<p>沒有圖片可顯示</p>';
    }
}


//         function closeModal() {
//             document.getElementById('myModal').style.display = "none"; // 隱藏模態
//         }
    
// window.searchNearby() = searchNearby();
window.onload = initMap;
                
