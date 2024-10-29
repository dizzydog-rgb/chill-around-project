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

  placePicker.addEventListener("gmpx-placechange", handlePlaceChange);

  // 添加 dayList 的 click 事件監聽器
  dayList.forEach((day) => {
    day.addEventListener("click", handleSiteChangeByDay);
  });

  // 儲存多個標記的陣列
  let markers = [];
  let places = [];

  function handlePlaceChange() {
    const place = placePicker.value;
    places.push(place);

    if (!place.location) {
      window.alert("No details available for input: '" + place.name + "'");
      infowindow.close();
      markers.position = null;
      return;
    }

    // 先清空標記
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    updateMap([place]);
  }

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
    markers = []; // 清空標記陣列
    places = []; // 清空地點陣列

    const service = new google.maps.places.PlacesService(map.innerMap);
    const bounds = new google.maps.LatLngBounds();

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

        updateMap(places);

        // 調整地圖範圍以顯示所有標記
        map.innerMap.fitBounds(bounds);
      });
    });
  }

  function updateMap(places) {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

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

        infoWindow.close();
        infoWindow.setContent(
          `<strong style="font-size: 26px; color: #4A859F">${newMarker.title}</strong>`
        );
        infoWindow.open(newMarker.map, newMarker);
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
  }

  // 初始化後先顯示當天的標記
  handleSiteChangeByDay();
}

document.addEventListener("DOMContentLoaded", init);

// for (let i = 0; i < markers.length - 1; i++) {
//   // 創建線條
//   const line = new google.maps.Polyline({
//     path: [markers[i].position, markers[i + 1].position],
//     strokeColor: "#FF0000",
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//   });
//   // 將線條添加至地圖上
//   line.setMap(map);
// }
