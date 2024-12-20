$(document).ready(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("請先登入");
        window.location.href = 'index.html';
        return;
    }

    var taiwanmap = `
    <div class="Taiwanmap">
        <div id="contextMenu" class="contextMenu">
            <div class="row menuItem menuTitle">
                <p id="menuTitle"></p>
            </div>
            <div id="lv4" class="row menuItem menuButton red-border">
                <p>久居（超過三年）</p>
            </div>
            <div id="lv3" class="row menuItem menuButton yellow-border">
                <p>居住（一年以上）</p>
            </div>
            <div id="lv2" class="row menuItem menuButton green-border">
                <p>短居（一個月以上）</p>
            </div>
            <div id="lv1" class="row menuItem menuButton blue-border">
                <p>旅遊</p>
            </div>
            <div id="lv0" class="row menuItem menuButton">
                <p>以上皆非</p>
            </div>
        </div>
        <div class="default">
            <div class="map">
                <!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg id="map" version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 1124"
                    style="enable-background:new 0 0 750 1124;" xml:space="preserve">
                    <style type="text/css">
                        .st0 {
                            fill: #B4DEF7;
                        }
    
                        .st1 {
                            fill: #FFFFFF;
                        }
    
                        .st2 {
                            fill: #333333;
                        }
    
                        .st3 {
                            font-family: 'FZLTZHB--B51-0';
                        }
    
                        .st4 {
                            font-size: 52.1035px;
                        }
    
                        .st5 {
                            font-size: 48px;
                        }
    
                        .st6 {
                            font-size: 20px;
                        }
    
                        .st7 {
                            fill: #FF7A7A;
                        }
    
                        .st8 {
                            fill: #F5A623;
                        }
    
                        .st9 {
                            fill: #88B14B;
                        }
    
                        .st10 {
                            fill: #27BBEE;
                        }
    
                        .st11 {
                            fill: #FFFFFF;
                            stroke: #555555;
                            stroke-miterlimit: 10;
                        }
    
                        .st12 {
                            fill: #555555;
                        }
    
                        .st13 {
                            fill: #FFFFFF;
                            stroke: #333333;
                            stroke-width: 4;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                        }
    
                        .st14 {
                            fill: #FFFFFF;
                            stroke: #333333;
                            stroke-width: 4;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                        }
    
                        .st15 {
                            fill: #FFFFFF;
                            stroke: #333333;
                            stroke-width: 4;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                        }
    
                        .st16 {
                            font-size: 23.0006px;
                        }
    
                        .st17 {
                            fill: #FFFFFF;
                            stroke: #333333;
                            stroke-width: 3;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                        }
    
                        .st18 {
                            fill: #FFFFFF;
                            stroke: #333333;
                            stroke-width: 4;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-miterlimit: 10;
                        }
                    </style>
                    <rect x="-0.2" y="0" class="st0" width="750.2" height="1124" />
                    <path class="st1" d="M719,1102H28c-2.8,0-5-2.2-5-5v-55.3c0-2.8,2.2-5,5-5h691c2.8,0,5,2.2,5,5v55.3C724,1099.8,721.8,1102,719,1102
                  z" />
                    <text transform="matrix(1 0 0 1 46.5859 91.9209)">
                        <tspan x="0" y="0" class="st2 st3 st4">制縣等級 </tspan>
                        <tspan id="total" x="222.9" y="0" class="st2 st3 st5">0</tspan>
                    </text>
                    <text transform="matrix(1 0 0 1 104.6665 1075.2633)" class="st2 st3 st6">久居</text>
                    <circle class="st7" cx="69.3" cy="1069.3" r="19" />
                    <g>
                        <path class="st1" d="M70.6,1076.2v-2.1h-5.8c-0.7,0-1.3-0.2-1.6-0.5c-0.4-0.3-0.5-0.8-0.5-1.3c0-0.1,0-0.3,0.1-0.4
                    c0.1-0.1,0.1-0.3,0.2-0.5c0.1-0.2,0.2-0.3,0.3-0.5s0.3-0.3,0.4-0.6l6.1-8.1c0.4-0.5,0.7-0.9,1-1.2c0.3-0.2,0.6-0.4,0.9-0.4
                    c1.2,0,1.7,0.7,1.7,2v8.9H74c0.6,0,1.1,0.1,1.4,0.2c0.4,0.2,0.5,0.5,0.5,1.1c0,0.4-0.1,0.8-0.4,1c-0.3,0.2-0.7,0.3-1.3,0.3h-0.7
                    v2.1c0,0.6-0.1,1-0.4,1.3c-0.3,0.3-0.6,0.4-1,0.4c-0.4,0-0.8-0.1-1-0.4C70.8,1077.2,70.6,1076.8,70.6,1076.2z M65.7,1071.5h4.9
                    v-6.7L65.7,1071.5z" />
                    </g>
                    <text transform="matrix(1 0 0 1 233.336 1075.2623)" class="st2 st3 st6">居住</text>
                    <circle class="st8" cx="199" cy="1069.3" r="19" />
                    <g>
                        <path class="st1" d="M198.4,1067.4c0.7,0,1.3-0.2,1.8-0.6s0.8-1,0.8-1.8c0-0.6-0.2-1.1-0.6-1.5c-0.4-0.4-1-0.6-1.6-0.6
                    c-0.5,0-0.9,0.1-1.2,0.2s-0.5,0.3-0.7,0.5s-0.3,0.5-0.5,0.8c-0.2,0.3-0.3,0.7-0.4,1c-0.1,0.2-0.2,0.3-0.4,0.4s-0.4,0.1-0.7,0.1
                    c-0.3,0-0.6-0.1-0.8-0.4c-0.3-0.2-0.4-0.6-0.4-1c0-0.4,0.1-0.8,0.4-1.3c0.2-0.4,0.6-0.9,1.1-1.3c0.5-0.4,1-0.7,1.7-1
                    c0.7-0.2,1.5-0.4,2.3-0.4c0.7,0,1.4,0.1,2,0.3c0.6,0.2,1.1,0.5,1.6,0.9c0.5,0.4,0.8,0.8,1,1.3s0.3,1,0.3,1.6c0,0.8-0.2,1.4-0.5,2
                    s-0.8,1.1-1.4,1.6c0.6,0.3,1.1,0.7,1.5,1.1c0.4,0.4,0.7,0.9,0.9,1.4c0.2,0.5,0.3,1,0.3,1.6c0,0.7-0.1,1.4-0.4,2
                    c-0.3,0.6-0.7,1.2-1.2,1.7c-0.5,0.5-1.2,0.9-1.9,1.2c-0.7,0.3-1.6,0.4-2.5,0.4c-0.9,0-1.7-0.2-2.5-0.5c-0.7-0.3-1.3-0.7-1.8-1.2
                    c-0.5-0.5-0.8-1-1.1-1.5c-0.2-0.5-0.4-1-0.4-1.3c0-0.4,0.1-0.8,0.4-1.1c0.3-0.3,0.6-0.4,1.1-0.4c0.2,0,0.4,0.1,0.6,0.2
                    c0.2,0.1,0.3,0.3,0.4,0.5c0.4,1.1,0.8,1.9,1.3,2.4c0.5,0.5,1.1,0.8,1.9,0.8c0.5,0,0.9-0.1,1.4-0.3c0.4-0.2,0.8-0.6,1.1-1
                    c0.3-0.5,0.4-1,0.4-1.6c0-0.9-0.2-1.6-0.7-2.1c-0.5-0.5-1.2-0.8-2-0.8c-0.2,0-0.4,0-0.7,0c-0.3,0-0.5,0-0.6,0c-0.4,0-0.7-0.1-1-0.3
                    c-0.2-0.2-0.3-0.5-0.3-0.9c0-0.4,0.1-0.7,0.4-0.9c0.3-0.2,0.7-0.3,1.2-0.3H198.4z" />
                    </g>
                    <text transform="matrix(1 0 0 1 362.0052 1075.2633)" class="st2 st3 st6">短居</text>
                    <circle class="st9" cx="328.7" cy="1069.3" r="19" />
                    <g>
                        <path class="st1" d="M326.7,1075h6c0.6,0,1.1,0.1,1.4,0.4s0.5,0.6,0.5,1c0,0.4-0.1,0.7-0.4,1s-0.6,0.4-1.1,0.4h-8.4
                    c-0.6,0-1-0.2-1.3-0.5c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.3,0.1-0.6,0.3-1.1c0.2-0.5,0.4-0.8,0.7-1.1c1-1.1,1.9-2,2.8-2.7
                    c0.8-0.8,1.4-1.2,1.8-1.5c0.6-0.4,1.1-0.9,1.6-1.3c0.4-0.4,0.7-0.9,1-1.4c0.2-0.5,0.3-0.9,0.3-1.4c0-0.5-0.1-0.9-0.3-1.3
                    c-0.2-0.4-0.6-0.7-1-0.9c-0.4-0.2-0.8-0.3-1.3-0.3c-1,0-1.8,0.4-2.4,1.3c-0.1,0.1-0.2,0.4-0.4,0.9c-0.2,0.5-0.4,0.9-0.6,1.2
                    c-0.2,0.3-0.6,0.4-1,0.4c-0.4,0-0.7-0.1-1-0.4c-0.3-0.3-0.4-0.6-0.4-1c0-0.5,0.1-1.1,0.4-1.7c0.2-0.6,0.6-1.1,1.1-1.6
                    c0.5-0.5,1.1-0.8,1.8-1.1c0.7-0.3,1.6-0.4,2.5-0.4c1.2,0,2.2,0.2,3,0.6c0.5,0.2,1,0.6,1.4,1c0.4,0.4,0.7,0.9,0.9,1.5
                    c0.2,0.6,0.3,1.1,0.3,1.7c0,0.9-0.2,1.8-0.7,2.6c-0.5,0.8-0.9,1.4-1.4,1.8c-0.5,0.4-1.3,1.1-2.5,2.1c-1.1,0.9-1.9,1.7-2.4,2.2
                    C327.1,1074.5,326.9,1074.7,326.7,1075z" />
                    </g>
                    <text transform="matrix(1 0 0 1 490.6747 1075.2633)" class="st2 st3 st6">旅遊</text>
                    <circle class="st10" cx="458.3" cy="1069.3" r="19" />
                    <g>
                        <path class="st1" d="M457.3,1076v-10.4c-1.9,1.5-3.2,2.2-3.9,2.2c-0.3,0-0.6-0.1-0.9-0.4c-0.2-0.3-0.4-0.6-0.4-0.9
                    c0-0.4,0.1-0.7,0.4-0.9c0.2-0.2,0.7-0.4,1.3-0.7c0.9-0.4,1.7-0.9,2.2-1.4c0.6-0.5,1-1,1.5-1.6c0.4-0.6,0.7-1,0.8-1.1
                    c0.1-0.1,0.4-0.2,0.7-0.2c0.4,0,0.7,0.2,1,0.5s0.4,0.7,0.4,1.3v13.1c0,1.5-0.5,2.3-1.6,2.3c-0.5,0-0.8-0.2-1.1-0.5
                    C457.5,1077.1,457.3,1076.6,457.3,1076z" />
                    </g>
                    <text transform="matrix(1 0 0 1 619.3439 1075.2633)" class="st2 st3 st6">以上皆非</text>
                    <circle class="st11" cx="588" cy="1069.3" r="19" />
                    <g>
                        <path class="st12"
                            d="M593.9,1069.4c0,1.3-0.1,2.3-0.2,3.2s-0.4,1.7-0.8,2.5c-0.5,0.9-1.2,1.6-2,2.1s-1.7,0.7-2.8,0.7
                    c-1.2,0-2.2-0.3-3.1-1c-0.9-0.7-1.6-1.6-2.1-2.7c-0.2-0.6-0.4-1.3-0.5-2.1c-0.1-0.8-0.2-1.6-0.2-2.5c0-1.2,0.1-2.2,0.2-3.1
                    c0.1-0.9,0.3-1.7,0.6-2.4c0.5-1.1,1.1-1.9,2-2.5c0.9-0.6,1.9-0.9,3.1-0.9c0.8,0,1.5,0.1,2.1,0.4c0.6,0.3,1.2,0.6,1.7,1.1
                    c0.5,0.5,0.9,1.1,1.2,1.8C593.6,1065.3,593.9,1067.1,593.9,1069.4z M590.7,1069.2c0-1.4-0.1-2.5-0.3-3.4s-0.5-1.6-0.8-2
                    c-0.4-0.5-0.9-0.7-1.7-0.7c-1,0-1.7,0.5-2.1,1.5c-0.4,1-0.6,2.6-0.6,4.7c0,1.4,0.1,2.6,0.3,3.5c0.2,0.9,0.5,1.6,0.8,2.1
                    c0.4,0.5,0.9,0.7,1.6,0.7c0.7,0,1.3-0.2,1.7-0.7c0.4-0.5,0.7-1.2,0.8-2.1C590.6,1071.8,590.7,1070.6,590.7,1069.2z" />
                    </g>
                    <g>
                        <polygon id="屏東1" class="st13" points="366,979 349.3,894 288.1,834.2 302.4,749.9 384.7,712.7 411.5,760.7 367.7,828.1 405.8,897.9 
                    401.7,988.4 384.7,959.7 	" />
                        <polygon id="台東1" class="st13" points="405.8,897.9 367.7,828.1 411.5,760.7 384.7,712.7 438.1,628.7 498.1,677.8 533.7,595.7 552.2,595.8 
                    509.3,725.4 437.8,795.8 	" />
                        <polygon id="花蓮" class="st13" points="619.8,374.7 552.2,595.8 533.7,595.7 498.1,677.8 424.9,618.1 488,542.1 533.7,366.6 576.4,372.8 
                    583.6,357.7 	" />
                        <polygon id="宜蘭1" class="st13" points="619.8,374.7 583.6,357.7 576.4,372.8 533.7,366.6 514.5,315.8 554.8,282.3 626.7,217.8 675,199.4 
                    630.4,256.9 642.3,318.1 	" />
                        <polygon id="高雄" class="st13" points="288.1,834.2 240.6,783.7 229.3,725.6 278.9,724.2 348.9,632.9 415.5,583.2 442.5,596.8 424.9,618.1 
                    438.1,628.7 384.7,712.7 302.4,749.9 	" />
                        <polygon id="台南" class="st13" points="229.3,725.6 225.9,705.6 201.7,691.7 217.8,626.1 284.1,601.9 309.7,606.9 337.6,647.7 278.9,724.2 	
                    " />
                        <polygon id="嘉義" class="st13" points="217.8,626.1 217.8,571.7 302.6,546.1 374.4,552.2 415.5,583.2 348.9,632.9 337.6,647.7 309.7,606.9 
                    284.1,601.9 	" />
                        <polygon id="南投" class="st13"
                            points="527.2,391.6 488,542.1 442.5,596.8 415.5,583.2 374.4,552.2 340.9,549.4 343.6,451 	" />
                        <polygon id="雲林" class="st13"
                            points="217.8,571.7 247.4,494.2 342.2,503.9 340.9,549.4 302.6,546.1 	" />
                        <polygon id="彰化" class="st13"
                            points="302.4,398.1 247.4,494.2 342.2,503.9 343.6,451 	" />
                        <polygon id="台中" class="st13" points="341.3,342.5 302.4,398.1 343.6,451 527.2,391.6 533.7,366.6 514.5,315.8 421.7,374.7 380.6,374.7 	
                    " />
                        <polygon id="苗栗" class="st13"
                            points="393.6,270.5 341.3,342.5 380.6,374.7 421.7,374.7 483,334.9 437.8,326 444,298.1 	" />
                        <polygon id="新竹" class="st13"
                            points="428.2,224 393.6,270.5 444,298.1 437.8,326 484.1,335.1 514.5,315.8 526.4,305.9 504.5,262.4 	" />
                        <polygon id="桃園" class="st13"
                            points="496,165.8 527.2,193.5 516.7,234.2 554.8,282.3 526.4,305.9 504.5,262.4 428.2,224 	" />
                        <polygon id="新北" class="st13" points="527.2,156.5 496,165.8 527.2,193.5 516.7,234.2 554.8,282.3 626.7,217.8 675,199.4 652.7,185.9 
                    651.1,165.8 626.7,165.8 602.5,158.9 605.1,142.8 552.2,125.1 	" />
                        <polygon id="台北" class="st13"
                            points="542.3,165.8 548,204.2 583.6,216.3 595.9,199.4 566.2,150.3 	" />
                        <path id="金門" class="st14" d="M112.2,335.9c0,0,2.2,26.9,3.3,26.1c1.1-0.8,20.4-13.1,20.4-13.1l25.7,10.5l-2.8-34.8l-22.9,12.7L112.2,335.9
                    z" />
                        <polygon id="澎湖1" class="st14"
                            points="115.1,522.2 126.5,537.9 140,554.5 109,570 103,557 117.6,543.7 106.8,526.2 	" />
                        <polygon id="澎湖2" class="st14"
                            points="103,533.1 94.5,529.6 84.3,554.5 94.5,554.5 	" />
                        <polygon id="澎湖3" class="st14" points="93.7,591.2 105.7,598.7 93.7,608.8 	" />
                        <polygon id="馬祖1" class="st15" points="108.7,170.3 112.2,185.1 92.4,185.1 	" />
                        <path id="馬祖2" class="st15"
                            d="M82.6,193.9c0.6,0,19.5,4.7,19.5,4.7l-16.6,10.6L82.6,193.9z" />
                        <text transform="matrix(1 0 0 1 318.8428 799.5312)"
                            class="st2 st3 st16 city">屏東</text>
                        <text transform="matrix(1 0 0 1 325.2979 695.7734)"
                            class="st2 st3 st16 city">高雄</text>
                        <text transform="matrix(1 0 0 1 234.8994 672.2617)"
                            class="st2 st3 st16 city">台南</text>
                        <text transform="matrix(1 0 0 1 85.5078 507.6504)"
                            class="st2 st3 st16 city">澎湖</text>
                        <text transform="matrix(1 0 0 1 92.9629 320.0596)"
                            class="st2 st3 st16 city">金門</text>
                        <text transform="matrix(1 0 0 1 122.9629 202.666)"
                            class="st2 st3 st16 city">馬祖</text>
                        <text transform="matrix(1 0 0 1 279.8779 585.8145)"
                            class="st2 st3 st16 city">嘉義</text>
                        <text transform="matrix(1 0 0 1 264.5449 531.9668)"
                            class="st2 st3 st16 city">雲林</text>
                        <text transform="matrix(1 0 0 1 279.8779 474.7217)"
                            class="st2 st3 st16 city">彰化</text>
                        <text transform="matrix(1 0 0 1 337.9268 406.8701)"
                            class="st2 st3 st16 city">台中</text>
                        <text transform="matrix(1 0 0 1 367.0664 342.2969)"
                            class="st2 st3 st16 city">苗栗</text>
                        <text transform="matrix(1 0 0 1 435.5566 276.6172)"
                            class="st2 st3 st16 city">新竹</text>
                        <text transform="matrix(1 0 0 1 462.1357 226.0161)"
                            class="st2 st3 st16 city">桃園</text>
                        <text transform="matrix(1 0 0 1 538.5488 242.1167)"
                            class="st2 st3 st16 city">新北</text>
                        <text transform="matrix(1 0 0 1 561.3633 323.5898)"
                            class="st2 st3 st16 city">宜蘭</text>
                        <text transform="matrix(1 0 0 1 517.918 511.1729)"
                            class="st2 st3 st16 city">花蓮</text>
                        <text transform="matrix(1 0 0 1 431.3779 720.7334)"
                            class="st2 st3 st16 city">台東</text>
                        <text transform="matrix(1 0 0 1 545.2627 192.9224)"
                            class="st2 st3 st16 city">台北</text>
                        <text transform="matrix(1 0 0 1 400.5039 507.9443)"
                            class="st2 st3 st16 city">南投</text>
                    </g>
                    <polygon id="台東2" class="st17" points="603,739 619,739 615,757 " />
                    <polygon id="台東3" class="st17"
                        points="607.5,941.5 625.5,941.5 622.5,952.5 635.5,964.5 630.5,970.5 607.5,953.5 " />
                    <polygon id="屏東2" class="st17" points="270.5,874.5 276.5,882.5 263.5,889.5 " />
                    <polygon id="基隆" class="st18"
                        points="603,159 589,166 611,193 623,185 617,176 630.7,167 " />
                    <text transform="matrix(1 0 0 1 620.2627 149.9224)" class="st2 st3 st16 city">基隆</text>
                    <polygon id="宜蘭2" class="st15" points="662,249 657,253 662,258 667,253 " />
                </svg>
            </div>
        </div>
    </div>
    <div class="sharedownld text-end">
        <a href="#">分享</a>
        <span></span>
        <button id="saveAs" class="ms-1">下載</button>
    </div>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4F6BQZ" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    `;
    $('.TaiwanEx').html(taiwanmap);

    $('#logoutbtn').click(function () {
        if (confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    });

    $('#logoutbtn1').click(function () {
        if (confirm('您確定要登出嗎？')) {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    });

    (function () {
        // object assign polyfill
        polyfill();

        var colorMap = [
            "#fff",
            "#27BBEE",
            "#88B14B",
            "#F5A623",
            "#FF7A7A"
        ];

        var cities = [{ id: "新北", lv: 0, }, { id: "台北", lv: 0, }, { id: "基隆", lv: 0, }, { id: "桃園", lv: 0, }, { id: "新竹", lv: 0, }, { id: "苗栗", lv: 0, }, { id: "台中", lv: 0, }, { id: "彰化", lv: 0, }, { id: "雲林", lv: 0, }, { id: "嘉義", lv: 0, }, { id: "南投", lv: 0, }, { id: "台南", lv: 0, }, { id: "高雄", lv: 0, }, { id: "屏東", lv: 0, }, { id: "台東", lv: 0, }, { id: "花蓮", lv: 0, }, { id: "宜蘭", lv: 0, }, { id: "馬祖", lv: 0, }, { id: "金門", lv: 0, }, { id: "澎湖", lv: 0, }];

        var contextMenu = document.querySelector("#contextMenu");
        var menuTitle = document.querySelector('#menuTitle');
        var currentId = '';
        var total = 0;

        // city name text
        var cityTexts = [].map.call(document.querySelectorAll('text.city'), function (ele) { return ele; });
        cityTexts.map(function (cityText) {
            cityText.style.cursor = 'pointer';
            cityText.addEventListener('click', bindContextMenu);
        });

        // city area
        cities.map(function (city) {
            var doms = [].map.call(document.querySelectorAll('[id^=' + city.id + ']'), function (ele) { return ele; });
            doms.map(function (dom) {
                dom.style.fill = '#fff';
                dom.style.cursor = 'pointer';
                dom.addEventListener('click', bindContextMenu);
            });
        });

        // hide context menu
        document.addEventListener('mouseup', closeWhenClickOutside);
        document.addEventListener('touchend', closeWhenClickOutside);

        function closeWhenClickOutside(e) {
            if (!contextMenu === e.target || !contextMenu.contains(e.target)) {
                contextMenu.style.display = 'none';
            }
        }

        // set level
        var levels = [].map.call(document.querySelectorAll("div[id^='lv']"), function (ele) { return ele; });
        levels.map(function (level) {
            level.addEventListener('click', function (e) {
                var lv = parseInt(e.currentTarget.id.replace('lv', ''), 10);
                cities = cities.map(function (city) {
                    if (city.id === currentId) {
                        return Object.assign({}, city, { lv: lv });
                    }
                    return city;
                });
                contextMenu.style.display = 'none';
                changeCityColor(lv);
                calcTotal();
            });
        });

        // save as png
        document.querySelector('#saveAs').addEventListener('click', function () {
            var svgString = new XMLSerializer().serializeToString(document.querySelector('#map'));
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            canvas.width = 750;
            canvas.height = 1124;
            canvg(canvas, svgString);
            canvas.toBlob(function (blob) { saveAs(blob, 'taiwan.png'); });
        });

        function bindContextMenu(e) {
            // 180: context menu width, 20: buffer
            // 165: context menu height, 30: buffer
            const widthOffset = window.innerWidth - e.pageX - 180 - 20;
            const heightOffset = window.innerHeight - e.pageY - 165 - 30;
            const x = widthOffset > 0 ? e.pageX : e.pageX + widthOffset;
            const y = heightOffset > 0 ? e.pageY : e.pageY + heightOffset;
            contextMenu.style.top = y + 'px';
            contextMenu.style.left = x + 'px';
            contextMenu.style.display = 'block';
            currentId = (e.target.id || e.target.textContent).replace(/\d*/g, '');
            menuTitle.textContent = currentId;
        }

        function calcTotal() {
            total = 0;
            cities.map(function (city) {
                total += city.lv;
            });
            document.querySelector('#total').textContent = total;
        }

        function changeCityColor(lv) {
            var doms = [].map.call(document.querySelectorAll('[id^=' + currentId + ']'), function (ele) { return ele; });
            doms.map(function (dom) {
                dom.style.fill = colorMap[lv];
            });
        }

        /**
         ** Object assign polyfill
         ** https://github.com/rubennorte/es6-object-assign
         **/

        function assign(target, firstSource) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }

        function polyfill() {
            if (!Object.assign) {
                Object.defineProperty(Object, 'assign', {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: assign
                });
            }
        }
    })();
})