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

$(".btn1").on("click",()=>{
    $(".testQuestion1").hide();
    $(".testQuestion2").fadeIn();
    })
$(".btn2").on("click",()=>{
    $(".testQuestion2").hide();
    $(".testQuestion3").fadeIn();
    })
$(".btn3").on("click",()=>{
    $(".testQuestion3").hide();
    $(".testQuestion4").fadeIn();
    })
$(".btn4").on("click",()=>{
    $(".testQuestion4").hide();
    $(".testQuestion5").fadeIn();
    })


let setloadingout = ()=> {
    $(".loadingAnimation").hide();
    $(".result").fadeIn();
}


$(".btn5").on("click",()=>{
    $(".content").hide();
    $(".testQuestion5").hide();
    $(".testResult").fadeIn(()=>{setTimeout(setloadingout,3000);});
    })
    
// 再測一次
$(".testAgain").on("click",()=>{
    $(".testResult").hide();
    $(".content").show();
    $(".testHomePage").show();
})


data = {
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
            ans:'D.一窺神秘大海的小琉球',
            value:'I'
        }
    ]
}