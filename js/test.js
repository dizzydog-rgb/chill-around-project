import $ from 'https://code.jquery.com/jquery-3.7.1.js';
// 請求資料庫資料
import axios from "axios";
axios
  .get("http://localhost:8080/test/1")
  .then(function (response) {
    // handle success
    const testStyle = response.data;
    console.log(testStyle);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log("請求失敗");
  })
//   .finally(function () {
//     // always executed
//   });


// 切換頁面
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
        // 串接資料庫結果
        // 判斷式

        // 推薦行程卡片
        let schData=[
            {title:'卡片標題',img:'https://via.placeholder.com/400x200',des:'這是一段卡片的內文。你可以在這裡放置一些描述，或是其他相關資訊。'},
            {title:'卡片標題',img:'https://via.placeholder.com/400x200',des:'這是一段卡片的內文。你可以在這裡放置一些描述，或是其他相關資訊。'},
            {title:'卡片標題',img:'https://via.placeholder.com/400x200',des:'這是一段卡片的內文。你可以在這裡放置一些描述，或是其他相關資訊。'},
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
                    <p>${this.des}</p>
                    </div>
                </div>`;
            $("#schCard").append(schCard);
        })
});

    
// 再測一次
$(".testAgain").on("click",()=>{
    $(".testResult").hide();
    $(".content").show();
    $(".testHomePage").show();
})


data = [{
    question:'Q1:突然獲得了休假時間，你會偏好?',
    option:[
        {
            img:'../assets/images/test/taipei.jpg',
            ans:'A.流行文化的西門町',
            value:'E'
        },
        {
            img:'../assets/images/test/temple.jpg',
            ans:'B.歷史文化的鹿港',
            value:'I'
        },
        {
            img:'../assets/images/test/hualain.jpg',
            ans:'C.壯闊的太魯閣',
            value:'E'
        },
        {
            img:'../assets/images/test/sea.jpg',
            ans:'D.寧靜的小琉球',
            value:'I'
        }
    ]
},{
    question:'Q2:你會如何規劃旅行?',
    option:[
        {
            ans:'A.有明確的安排，充分的利用旅行時間',
            value:'J'
        },
        {
            ans:'B.有大概的計畫，中間保有彈性調整',
            value:'P'
        },
        {
            ans:'C.沒有規劃，自在地遊玩，不受時間限制',
            value:'P'
        }
    ]
},{
    question:'Q3:一早醒來準備出門，你會偏好哪種路線抵達目的?',
    option:[
        {
            img:'../assets/images/test/taipei.jpg',
            ans:'A.穿梭在山谷之間',
            value:'N'
        },
        {
            img:'../assets/images/test/temple.jpg',
            ans:'B.徜徉在海景間',
            value:'S'
        },
        {
            img:'../assets/images/test/hualain.jpg',
            ans:'C.沿著溪流與埤塘',
            value:'N'
        },
        {
            img:'../assets/images/test/sea.jpg',
            ans:'D.奔馳稻浪及林木間',
            value:'S'
        }
    ]
},{
    question:'Q4:到達目的地時肚子開始餓了，你會選擇?',
    option:[
        {
            ans:'A.可以眺望風景的景觀餐廳',
            value:'F'
        },
        {
            ans:'B.充滿當地特色的小吃',
            value:'F'
        },
        {
            ans:'C.感受海水鹹鮮的海鮮料理',
            value:'T'
        },
        {
            ans:'D.展現原始風味的部落料理',
            value:'T'
        }
    ]
}]

    