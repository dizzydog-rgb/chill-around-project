import axios from 'axios';

const emailid = localStorage.getItem("emailid");
console.log("emailid:", emailid);

// 寫這段是為了要讓我在5173的網址輸入對應的id可以撈到對應的資料
const params = new URLSearchParams(window.location.search);
// http://localhost:5173/chill-around-project/pages/siteInfo.html?id=1
console.log( '讀取'+ params ); //讀取id=1

const siteId = params.get('id'); // 假設 URL 包含 ?id=1
console.log('siteId:'+ siteId); //siteId:1

// 這段放在hesder.js中，因為要確保在引入 HTML 中的圖片之前加載
function changeImage(image) {
    document.getElementById("mainImage").src = image;
  }

axios.get(`http://localhost:8080/site/siteinfo/${siteId}`)
  .then(response => {
    console.log('景點資料:', response.data);
    // 這裡可以進一步處理獲取的資料，例如更新 UI
    // 假設 response.data 有 title, startDate 和 endDate 屬性
    const { site_id , site_name,site_phone,site_add , site_opentime, site_web,site_info,photo_one,photo_two,photo_three,photo_four } = response.data;
    console.log(photo_one);
    console.log(site_name);
    
    // 更新 UI，顯示資料
    document.getElementById('topImage').innerHTML = `
    <img
          src="../assets/images/searchSite/${photo_one}"
          class="img-fluid"
          alt="大圖"
        />
    `;
    document.getElementById('siteInfo').innerHTML = `
        <!-- 景點標題-->
        <div class="m-3 container d-flex justify-content-between">
          <h1 class="text-nowrap text-nowrap fs-2">${site_name}</h1>
          <div class="divider1">
          </div>
        </div>
        <!-- 手機版才會出現的輪播圖 -->
        <div
          id="carouselExample"
          class="carousel slide d-md-none col-md-6 order-md-1"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="siteCarouselItem carousel-item active">
              <img
                src="../assets/images/searchSite/${photo_one}"
                class="d-block w-100"
                alt="圖片 1"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/${photo_two}"
                class="d-block w-100"
                alt="圖片 2"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/${photo_three}"
                class="d-block w-100"
                alt="圖片 3"
              />
            </div>
            <div class="siteCarouselItem carousel-item">
              <img
                src="../assets/images/searchSite/${photo_four}"
                class="d-block w-100"
                alt="圖片 4"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <!-- 電腦版呈現的樣子 主圖縮圖 -->
        <div class="leftImage col-md-6 order-md-1 d-none d-md-block">
          <div class="container p-0">
            <div class="row">
              <div class="mainImage col-md-12 text-center d-none d-md-block">
                <img
                  id="mainImage"
                  src="../assets/images/searchSite/${photo_one}"
                  class="img-fluid"
                  alt="主圖"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${photo_one}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖1"
                  onclick="changeImage('../assets/images/searchSite/${photo_one}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${photo_two}"
                  class=" p-0 thumbnail img-thumbnail"
                  alt="縮圖2"
                  onclick="changeImage('../assets/images/searchSite/${photo_two}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${photo_three}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖3"
                  onclick="changeImage('../assets/images/searchSite/${photo_three}')"
                />
              </div>
              <div class="smallImage col-md-3 text-center">
                <img
                  src="../assets/images/searchSite/${photo_four}"
                  class="p-0 thumbnail img-thumbnail"
                  alt="縮圖4"
                  onclick="changeImage('../assets/images/searchSite/${photo_four}')"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 右側資訊 -->
        <div class="rightInfo container col-md-6 order-md-2 p-0">
          <div class="info-text">
            <p>電話：${site_phone}</p>
            <p>地址：${site_add}</p>
            <div class="d-flex">
                <div>
                    <p>開放時間：</p>
                </div>
                <div class="opentime">
                    <p>${site_opentime.replace(/\n/g, '<br>')}</p>
                    
                </div>
            </div>
            <div class="infoWeb">
            <p>官方網址：</p>
            <a href=" ${site_web}" target="_blank"> ${site_web}</a>
            </div>
            
          </div>
          <div class="addBtn text-end" id= >
              <button type="button" class="addBtn btn btn-primary loadSchedule" 
                            data-site-id="${site_id}" 
                            data-site-name="${site_name}" 
                            data-site-add="${site_add}"
                            data-site-info="${site_info}"
                            data-site-img="${photo_one}"
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal">
                            加入行程
                        </button> 
              </div>
        </div>
          <!-- 下方解說 -->
          <div class="container col-md-12 order-md-3">
            <h2 class="detailsTitle">景點介紹</h2>
            <p class="detailsInfo">${site_info}</p>
          </div>
    `;
    bindLoadScheduleEvents()

    function changeImage(image) {
        console.log(image);
        
        document.getElementById("mainImage").src =image;
      }
  })
  .catch(error => {
    console.error('無法取得景點資料:', error);
  });
// 綁定 "加入行程" 按鈕點擊事件
function bindLoadScheduleEvents() {
    let selectedSchID;
    let selectedSiteData;

    const loadScheduleButtons = document.querySelectorAll('.loadSchedule');
    loadScheduleButtons.forEach(button => {
        button.addEventListener('click', async (event) => {

            //登入判斷式
            if (!token) {
                event.preventDefault();
                event.stopPropagation(); // 防止事件冒泡，確保不顯示模態
                alert("請先登入");
                window.location.href = 'index.html';
                return;
            }
            event.stopPropagation(); // 阻止事件冒泡，避免卡片點擊事件觸發

            const siteId = button.getAttribute('data-site-id');
            const siteName = button.getAttribute('data-site-name');
            const siteAdd = button.getAttribute('data-site-add');
            const siteInfo = button.getAttribute('data-site-info');
            const siteImg = button.getAttribute('data-site-img');

            selectedSiteData = {
                site_id: siteId,
                site_name: siteName,
                site_add: siteAdd,
                site_info: siteInfo,
                site_img: siteImg
            };

            console.log(selectedSiteData);

            try {
                const { data } = await axios.get(`http://localhost:8080/schInfo/getspot/${emailid}`);

                console.log('Email ID:', emailid); // 確認 emailid 是否正確


                console.log('獲取的行程資料:', data);

                const selectElement = document.getElementById('itinerarySelect');
                selectElement.innerHTML = '<option value="" selected>請選擇行程</option>';
                const optionsHTML = data.schedules.map(schedule => {
                    return `<option value="${schedule.sch_name}" data-schedule-id="${schedule.sch_id}" data-days="${schedule.days}">${schedule.sch_name}</option>`;
                }).join('');
                selectElement.innerHTML += optionsHTML;

                showModal();
            } catch (error) {
                console.error('獲取行程資料失敗', error);
            }
        });
    });

    // 行程選擇變更事件
    document.getElementById('itinerarySelect').addEventListener('change', () => {
        const selectedOption = document.querySelector('#itinerarySelect :checked');
        const days = Number(selectedOption.dataset.days) + 1;
        selectedSchID = selectedOption.dataset.scheduleId;

        const daySelectContainer = document.getElementById('daySelectContainer');
        const daySelectElement = document.getElementById('daySelect');
        daySelectElement.innerHTML = '';

        if (days) {
            daySelectContainer.style.display = 'block';
            console.log('選取的天數:', days);

            const dayOptionsHTML = Array.from({ length: days }, (_, i) =>
                `<option value="${i + 1}">第 ${i + 1} 天</option>`
            ).join('');
            daySelectElement.innerHTML += dayOptionsHTML;
        } else {
            daySelectContainer.style.display = 'none';
            daySelectElement.innerHTML = '<option value="">請先選擇行程</option>';
        }
    });

    // 保存行程事件
    document.querySelector('.Save').addEventListener('click', async () => {
        const dayNumber = Number(document.getElementById('daySelect').value);

        const dataToSave = {
            sch_id: selectedSchID,
            sch_day: dayNumber,
            sch_order: "1",  // 將順序設為 1
            sch_spot: selectedSiteData.site_name,
            sch_info: selectedSiteData.site_info,
            sch_img: selectedSiteData.site_img
        };

        try {
            await axios.post('http://localhost:8080/schInfo/getspot/add', dataToSave);
            alert('行程保存成功');
            console.log('Data to Save:', dataToSave);
            // 使用 jQuery 來隱藏模態框
            $('#exampleModal').modal('hide');
        } catch (error) {
            alert('保存行程失敗');
            console.error('保存行程失敗', error);
        }
    });
}

// 顯示 modal
function showModal() {
    const modal = document.getElementById('exampleModal');
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}
document.getElementById
