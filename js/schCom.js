import axios from "axios";

// 在 schCom.html 的 JavaScript 代碼中
// const selectedSchId = localStorage.getItem('selectedSchId');
// if (selectedSchId) {
//     console.log("選擇的行程 ID:", selectedSchId);
//     // 根據 selectedSchId 做進一步處理，例如取得詳細資料
//     axios.get(`http://localhost:8080/buildPlan/editPlan/${selectedSchId}`)
//         .then(response => {
//             const scheduleData = response.data[0];
//             console.log("行程資料:", scheduleData);
//             // 在頁面中顯示行程詳細資料
//         })
//         .catch(error => {
//             console.error('無法取得行程資料:', error);
//         });
// } else {
//     console.error('沒有選擇的行程 ID');
// }


// 寫這段是為了要讓我在5173的網址輸入對應的id可以撈到對應的資料
// const params = new URLSearchParams(window.location.search);
// http://localhost:5173/chill-around-project/pages/siteInfo.html?id=1
// console.log( '讀取'+ params ); //讀取id=1


// const schId = params.get('id'); // 假設 URL 包含 ?id=1
// console.log('schId:'+ schId); //schId:1

// axios.get(`http://localhost:8080/buildPlan/editPlan/${schId}`)
//   .then(response => {
//     console.log('行程資料:', response.data);
//     // 這裡可以進一步處理獲取的資料，例如更新 UI
//     // 假設 response.data 有 title, startDate 和 endDate 屬性
//     // const { site_name,site_phone,site_add , site_opentime, site_web,site_info,photo_one,photo_two,photo_three,photo_four } = response.data;
//     console.log(response.data);
//   })


  // 取得 URL 中的 query string
const urlParams = new URLSearchParams(window.location.search);

// 取得 'id' 參數
const schId = urlParams.get('id');
console.log('取得的 sch_id:', schId);

// 接著可以使用 sch_id 向後端發送請求來取得資料
axios.get(`http://localhost:8080/buildPlan/editPlan/${schId}`)
    .then(response => {
        const schData = response.data;
        console.log('取得的行程資料:', schData);

        // 在頁面上顯示行程的相關資訊
        // document.querySelector("#schName").innerText = schData.sch_name;
        // document.querySelector("#schDate").innerText = schData.edit_date;
        // 其他需要顯示的內容
    })
    .catch(error => {
        console.error('無法取得行程資料:', error);
    });


