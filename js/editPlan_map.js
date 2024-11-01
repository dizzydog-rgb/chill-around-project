async function init() {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  await customElements.whenDefined("gmp-map");

  const map = document.querySelector("gmp-map");
  const placePicker = document.querySelector("gmpx-place-picker");

  // 綁定 dayList
  const dayList = document.querySelectorAll(".dayList");

  map.innerMap.setOptions({
    mapTypeControl: false,
  });

  // 添加 dayList 的 click 事件監聽器
  dayList.forEach((day) => {
    day.addEventListener("click", handleSiteChangeByDay);
  });

  // 儲存多個標記的陣列
  let markers = [];
  let places = [];
  // let lines = [];

  function handleSiteChangeByDay() {
    // 取得當天的景點名稱
    let currentSites = document.querySelectorAll(".siteItem");
    let currentSitesNameArr = [];

    currentSites.forEach((site) => {
      currentSitesNameArr.push(site.dataset.siteName);
    });
    // console.log(currentSitesNameArr);

    // 清除舊的標記
    markers.forEach((marker) => marker.setMap(null));
    // lines.forEach((arc) => arc.setMap(null));
    markers = []; // 清空標記陣列
    places = []; // 清空地點陣列

    const service = new google.maps.places.PlacesService(map.innerMap);
    const bounds = new google.maps.LatLngBounds();
    let pendingSearches = currentSitesNameArr.length;

    // 使用 Places Service 進行搜索
    currentSitesNameArr.forEach((siteName) => {
      service.textSearch({ query: siteName }, (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results.length > 0
        ) {
          const place = results[0];
          places.push(place);

          bounds.extend(place.geometry.location);

          if (placePicker.setInputValue) {
            placePicker.setInputValue(place.name);
          }
        }

        // 減少計數器，當所有搜索完成後調用 updateMap
        pendingSearches--;
        if (pendingSearches === 0) {
          updateMap(places); //　產生標記
          map.innerMap.fitBounds(bounds); // 調整地圖範圍以顯示所有標記
        }
      });
    });
  }

  function updateMap(places) {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
    // 儲存當前開啟的 infoWindow
    let currentInfoWindow = null;

    // 為每個地方創建標記
    places.forEach((place) => {
      const newMarker = new google.maps.marker.AdvancedMarkerElement({
        map: map.innerMap,
        position: place.geometry.location,
        title: place.name,
        gmpClickable: true,
      });
      // 添加點擊事件到各標記，跳出 infoWindow
      newMarker.addListener("gmp-click", () => {
        const infoWindow = new google.maps.InfoWindow();

        if (currentInfoWindow) {
          currentInfoWindow.close();
        }

        infoWindow.setContent(
          `<strong style="font-size: 26px; color: #4A859F">${newMarker.title}</strong>`
        );
        infoWindow.open(newMarker.map, newMarker);

        // 更新當前的 infoWindow
        currentInfoWindow = infoWindow;
      });

      // 儲存每個標記
      markers.push(newMarker);
    });

    for (let i = 0; i < markers.length; i++) {
      const pin = new PinElement({
        scale: 1.5,
        background: "#DCAB25",
        borderColor: "#A35840",
        glyphColor: "white",
        glyph: `${i + 1}`,
      });
      markers[i].appendChild(pin.element);
    }

    // 清除之前的線條，重新繪製連接兩兩標記之間的線
    // lines.forEach((arc) => arc.setMap(null));
    // lines = [];

    // for (let i = 0; i < markers.length - 1; i++) {
    //   const start = markers[i].position;
    //   const end = markers[i + 1].position;
    //   // const controlPoint = calculateControlPoint(start, end);
    //   // const path = generateArcPath(start, end, controlPoint);

    //   // 創建新的 Polyline 以連接相鄰的標記
    //   const arc = new google.maps.Polyline({
    //     path: [start, end],
    //     geodesic: true,
    //     strokeColor: "#A35840",
    //     strokeOpacity: 0.8,
    //     strokeWeight: 5,
    //     map: map.innerMap,
    //   });

    //   // 將線條添加到陣列，以便之後可以控制
    //   lines.push(arc);
    //   arc.setMap(map.innerMap); // 將線條添加到地圖上
    // }
  }

  // 初始化後先顯示當天的標記
  handleSiteChangeByDay();
}

document.addEventListener("DOMContentLoaded", init);

// function calculateControlPoint(start, end) {
//   const latOffset = 0.005; // 調整此偏移量以改變弧度
//   const lngOffset = 0.005;

//   // 計算中點，並在緯度或經度上添加偏移來形成弧線
//   const midLat = (start.lat + end.lat) / 2 + latOffset;
//   const midLng = (start.lng + end.lng) / 2 + lngOffset;

//   return new google.maps.LatLng(midLat, midLng);
// }

// function generateArcPath(start, end, control, numPoints = 50) {
//   const path = [];
//   // 確保 start、end 和 control 是 LatLng 對象
//   start =
//     start instanceof google.maps.LatLng ? start : new google.maps.LatLng(start);
//   end = end instanceof google.maps.LatLng ? end : new google.maps.LatLng(end);
//   control =
//     control instanceof google.maps.LatLng
//       ? control
//       : new google.maps.LatLng(control);

//   // 使用貝塞爾曲線生成多個中間點
//   for (let i = 0; i <= numPoints; i++) {
//     const t = i / numPoints;
//     const lat =
//       (1 - t) * (1 - t) * start.lat() +
//       2 * (1 - t) * t * control.lat() +
//       t * t * end.lat();
//     const lng =
//       (1 - t) * (1 - t) * start.lng() +
//       2 * (1 - t) * t * control.lng() +
//       t * t * end.lng();
//     path.push(new google.maps.LatLng(lat, lng));
//   }

//   return path;
// }
