const API_KEY =
  "ID43EM%2FixQiOJbYb9kyZ3coo6DpQnKI7F8BT7LuhMdxB6s%2FNyzBVFAOlvyODT%2Fxf4aFJzFb1hYcGfEP8JrDi9A%3D%3D";

async function getData() {
  const url = `http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=${API_KEY}&searchYearCd=2020&siDo=11&gugun=680&type=json&numOfRows=10&pageNo=1`;
  const reponse = await fetch(url);
  const data = await reponse.json(); //여기까지가 api를 부르는 가장 중요한 기본 명령어
  console.log("data", data);
  const locations = data.items.item.map((spot) => [spot.spot_nm, 위도, 경도]);

  drawMap(locations);
}

function drawMap(locations) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: new google.maps.LatLng(locations[0][1], locations[0][2]),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  const infowindow = new google.maps.InfoWindow();

  let marker, i;

  for (i = 0; i < locations, length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}

getData();
