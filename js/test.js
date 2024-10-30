// 請求資料庫資料
// const axios = require('axios');
import axios from 'axios';
import domtoimage from 'dom-to-image';
let urlMap = {
    'ESTJ': "http://localhost:8080/test/1",
    'ESFJ': "http://localhost:8080/test/2",
    'ENFJ': "http://localhost:8080/test/3",
    'ENTJ': "http://localhost:8080/test/4",
    'ISTJ': "http://localhost:8080/test/5",
    'ISFJ': "http://localhost:8080/test/6",
    'INFJ': "http://localhost:8080/test/7",
    'INTJ': "http://localhost:8080/test/8",
    'ESTP': "http://localhost:8080/test/9",
    'ESFP': "http://localhost:8080/test/10",
    'ENFP': "http://localhost:8080/test/11",
    'ENTP': "http://localhost:8080/test/12",
    'ISTP': "http://localhost:8080/test/13",
    'ISFP': "http://localhost:8080/test/14",
    'INFP': "http://localhost:8080/test/15",
    'INTP': "http://localhost:8080/test/16"
};

// 隱藏所有頁面
// $(".content").hide();
$(".testQuestion1").hide();
$(".testQuestion2").hide();
$(".testQuestion3").hide();
$(".testQuestion4").hide();
$(".testQuestion5").hide();
$(".testResult").hide();
// $(".loadingAnimation").hide();
// $(".result").show();

    
$(".enter").on("click",()=>{
    $(".testHomePage").hide();
    $(".testQuestion1").fadeIn();
    })

    // e.target.name
let mbti ="";
let selectedValues = [];

$(".btn1").on("click", () => {
    const selectedInput = $("input[name='radio_1']:checked");
    if (selectedInput) {
        const selectedValue = selectedInput.data('value');
        // console.log("選擇的值:", selectedValue);
        selectedValues[0] = selectedValue; // 儲存選擇
        mbti = selectedValues.join(''); // 合併成字串
        // console.log(mbti);
        $(".testQuestion1").hide();
        $(".testQuestion2").fadeIn();
    } else {
        alert("請選擇一個選項！");
    }
});

$(".btn2").on("click", () => {
    const selectedInput = $("input[name='radio_2']:checked");
    if (selectedInput) {
        const selectedValue = selectedInput.data('value');
        // console.log("選擇的值:", selectedValue);
        selectedValues[3] = selectedValue;
        mbti = selectedValues.join('');
        // console.log(mbti);
        $(".testQuestion2").hide();
        $(".testQuestion3").fadeIn();
    } else {
        alert("請選擇一個選項！");
    }
});

$(".btn3").on("click", () => {
    const selectedInput = $("input[name='radio_3']:checked");
    if (selectedInput) {
        const selectedValue = selectedInput.data('value');
        // console.log("選擇的值:", selectedValue);
        selectedValues[1] = selectedValue;
        mbti = selectedValues.join('');
        // console.log(mbti);
        $(".testQuestion3").hide();
        $(".testQuestion4").fadeIn();
    } else {
        alert("請選擇一個選項！");
    }
});
$(".btn4").on("click", () => {
    const selectedInput = $("input[name='radio_4']:checked");
    if (selectedInput) {
        const selectedValue = selectedInput.data('value');
        // console.log("選擇的值:", selectedValue);
        selectedValues[2] = selectedValue;
        mbti = selectedValues.join('');
        // console.log(mbti);
        $(".testQuestion4").hide();
        $(".testQuestion5").fadeIn();
    } else {
        alert("請選擇一個選項！");
    }
});



// 計時器
let setloadingout = ()=> {
    $(".loadingAnimation").hide();
    $(".result").fadeIn();
}
$(".btn5").on("click", () => {
        $(".content").hide();
        $(".testQuestion5").hide();
        $(".testResult").fadeIn(()=>{setTimeout(setloadingout,3000);});

        // 結果
        console.log(mbti);

        // 引入資料庫結果
        const fetchTestStyle = (mbtiType) => {
            axios.get(urlMap[mbtiType])
            .then(function (response) {
            // handle success
            const testStyle = response.data;
            // console.log(testStyle);
            // console.log(testStyle.result_style);
            // console.log(testStyle.style_des);
            // 更改資料
            const imageSrc = testStyle.style_img.replace(/['"]/g, ''); // 去除引號(資料表圖片存字串)
            const bestImage = testStyle.best_style_img.replace(/['"]/g, ''); // 去除引號(資料表圖片存字串)
            const countryImage = testStyle.country_img.replace(/['"]/g, ''); // 去除引號(資料表圖片存字串)
            let resultHtml = `
                <h2 class="text-primary">你的旅行風格是...</h2>
                <!-- 角色 -->
                <div class="col-10 d-flex m-auto" id="resultStyle">
                <div class="characterDes me-3">
                <h2 class="text-secondary">${testStyle.result_style}</h2>
                <hr>
                <p>${testStyle.style_des}</p>
                    </div>
                        <img src="../assets/images/test/mbti/${imageSrc}" style="width: 200px; height: 200px;">
                </div>
                <!-- 旅遊地 -->
                <div class="resultCountry card flex-row flex-wrap col-10 my-3 mx-auto">
                    <!-- 左邊的圖片 -->
                    <div class="col-4">
                        <img src="../assets/images/test/country/${countryImage}" class="countryImg">
                    </div>
                            
                    <!-- 右邊的文字內容 -->
                    <div class="col-8 p-3">
                        <h4>最佳旅遊地:${testStyle.country_name}</h4>
                        <hr>
                        <p>${testStyle.country_des}</p>  
                    </div>
                </div>
                <!-- 標籤/旅伴 -->
                <div class="d-flex justify-content-between col-lg-8 col-sm-10 relativeInfo">
                    <!-- 適合標籤 -->
                    <div>
                        <h5>推薦旅遊標籤</h5>
                        <button class="btn btn-success m-1">#${testStyle.style_tag_1}</button>
                        <br/>
                        <button class="btn btn-success m-1">#${testStyle.style_tag_2}</button>
                    </div>
                    <!-- 最佳旅伴 -->
                    <div>
                        <h5>最佳旅伴</h5>
                        <img src="../assets/images/test/mbti/${bestImage}" style="width: 150px; height: 150px;object-fit: cover;">
                    </div>
                </div>`;
            $("#mbtiType").html(resultHtml);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            console.log("請求失敗");
            })
        };

        // 判斷式
        if (urlMap[mbti]) {
            fetchTestStyle(mbti);
        };
        

        // 推薦行程卡片
        let schData=[
            {title:'卡片標題',img:'https://via.placeholder.com/400x200',tag:'#相關標籤'},
            {title:'卡片標題',img:'https://via.placeholder.com/400x200',tag:'#相關標籤'},
            {title:'卡片標題',img:'https://via.placeholder.com/400x200',tag:'#相關標籤'},
        ]
        $.each(schData,function(){
            let schCard = `
            <div class="card custom-card flex-row flex-wrap h-75 m-3">
                <!-- 左邊的圖片 -->
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <img src="${this.img}" class="custom-img" alt="Card image">
                </div>
                    
                <!-- 右邊的文字內容 -->
                <div class="col-lg-8 col-md-8 col-sm-12 custom-body">
                    <h4>${this.title}</h4>
                    <hr>
                    <p>${this.tag}</p>
                    </div>
                </div>`;
            $("#schCard").append(schCard);
        })
});

    
// 分享測驗結果
document.getElementById("share").addEventListener('click',downloadImg)
function downloadImg(){
    console.log("download success");
    console.log(document.getElementById('mbtiType').innerHTML)

    domtoimage.toSvg(document.getElementById('mbtiType'), { quality: 0.95,bgcolor:'white' })
    .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'mytrip.svg';
    link.href = dataUrl;
    link.click();
});
}

// 再測一次
$(".testAgain").on("click",()=>{
    console.clear();
    $(".testResult").hide();
    $(".content").show();
    $(".testHomePage").show();
})
