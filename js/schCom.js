import axios from "axios";
// 檢查是否存在已選取的 sch_id
const selectedSchId = localStorage.getItem('selectedSchId');
if (selectedSchId) {
    console.log("選取的 Sch ID:", selectedSchId);
    // 接著可以用這個 sch_id 發送請求以取得對應的行程詳情
    axios.get(`http://localhost:8080/buildPlan/editPlan/${selectedSchId}`)
        .then(response => {
            const schDetails = response.data;
            // 將 schDetails 中的資料填入 schCom.html 的適當區域
            console.log(schDetails);
            
            // 根據需求填入其他細節...
        })
        .catch(error => {
            console.error('無法取得行程詳情:', error);
        });
} else {
    console.error("無法找到選取的 Sch ID");
}
