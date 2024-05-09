mapboxgl.accessToken = mapToken;
console.log(center);

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: center, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(center)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML("<h5>Exact location will be provide after booking!</h5>")
  )
  .addTo(map);
