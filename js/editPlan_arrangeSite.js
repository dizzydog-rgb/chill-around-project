import axios from "axios";

document.querySelector("#arrangeSite").addEventListener("click", () => {
    let arrangeItem = document.querySelectorAll("#arrangeItem");
    let arrangeSite = document.querySelectorAll(".siteItem")

    arrangeItem.forEach((item) =>{
        // item.setAttribute("ondragover", "dragOver(event)");
        // item.setAttribute("ondrop", "drop(event)");
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", drop);
    })
    arrangeSite.forEach((item) =>{
        item.setAttribute("draggable", "true");
        // item.setAttribute("ondragstart", "dragStart(event)");
        // item.setAttribute("ondragover", "dragOver(event)");
        // item.setAttribute("ondrop", "drop(event)");
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", drop);
        item.classList.add("animate__animated", "animate__pulse", "animate__infinite")
    })
    document.querySelector(".editBtn").innerHTML = `
    <div>
        <button
            type="button"
            class="btn btn-danger completeArrangeBtn"
        >
            完成
        </button>
    </div>
    `
    // 設置遮罩，只有cardList 和 btn 可以被點擊
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.querySelector(".editPlan").appendChild(overlay)
    document.querySelector(".editBtn").classList.add("goToFront")
    document.querySelector(".cardList").classList.add("goToFront")
    

    document.querySelector(".completeArrangeBtn").addEventListener("click", () => {
        // console.log("調整順序完成");
        // console.log(order);
        const siteItem = document.querySelector(".siteItem");
        let currentSchId = siteItem.dataset.schId;
        let currentSchDay = siteItem.dataset.siteDay;
        // console.log(currentSchId, currentSchDay);
        

        axios
        .put(
          `http://localhost:8080/buildPlan/editPlan/sites/order/${currentSchId}/${currentSchDay}`,
          {
            sch_order_array: order,
          }
        )
        .then(function (response) {
          console.log("景點順序已更新:", response.data);
          location.reload(); // 刷新頁面
        })
        .catch(function (error) {
          console.log("更新行程點時發生錯誤:", error);
        });
        
    })
  });

  
  // 拖拉元素相關的函式
  function dragOver(event) {
    console.log("拖拉中");
    event.preventDefault();
  }

  function dragStart(event) {
    console.log("開始拖拉");
    
    let targetElement = event.target;
    while (targetElement && targetElement.tagName !== "LI") {
    targetElement = targetElement.parentElement;
    }
    event.dataTransfer.setData("currentSiteOrder", targetElement.dataset.siteOrder);
    // console.log("當前目標的order", targetElement.dataset.siteOrder);
  }

  function drop(event) {
    console.log("拖拉結束");
    event.preventDefault();
    let elementOrder = event.dataTransfer.getData("currentSiteOrder");
    let targetElement = event.target;
    let allSites = document.querySelectorAll(".siteItem")
    let dropElement = Array.from(allSites).find((item) => item.dataset.siteOrder === elementOrder);

    // 找到最近的 arrangeItem
    while (targetElement && targetElement.id !== "arrangeItem") {
    targetElement = targetElement.parentElement;
    }

    // 只有目標元素是 arrangeItem 才允許放置
    if (targetElement) {
    //   targetElement.insertBefore(dropElement, targetElement.firstChild);
    targetElement.appendChild(dropElement)
    checkSiteSeperate()
    getOrder()
    }else{
      console.log("找不到合適的位置來放置");
    }
  }

  function checkSiteSeperate() {
    const blocks = document.querySelectorAll("#arrangeItem");
    const allSites = document.querySelectorAll(".siteItem")

    blocks.forEach((block, index) => {
        block.appendChild(allSites[index])
    })
  }
  
  let order = [];
  function getOrder(){
    order = []
    let results = document.querySelectorAll(".siteItem");
    results.forEach((item) => {
      order.push(item.dataset.siteOrder)
    })
    console.log("當前順序:" ,order);
    }
  