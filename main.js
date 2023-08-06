//initialize a leaflet map
let map = L.map("map", {
  center: [-1.33, 36.85],
  zoom: 12,
});

//add a base tile layers
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy: OpenStreetMap",
}).addTo(map);

let esriImagery = L.tileLayer(
  "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: `Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, 
	IGN, IGP, UPR-EGP, and the GIS User Community`,
  }
);

let baseMaps = {
  OpenStreetMap: osm,
  "ESRI World Imagery": esriImagery,
};

//map events
let popup = L.popup();
map.addEventListener("click", function (e) {
  popup
    .setLatLng(e.latlng)
    .setContent(
      "You clicked the map at <br>" +
        "<b>lon: </b>" +
        e.latlng.lng.toFixed(4) +
        "<br>" +
        "<b>lat: </b>" +
        e.latlng.lat.toFixed(4)
    )
    .openOn(map);
});

//adding markers
let nairobiSafariWalk = L.marker([-1.3357, 36.7795]).bindPopup(
    "Nairobi Safari Walk"
  ),
  ngongHills = L.marker([-1.4056, 36.638]).bindPopup("Ngong Hills"),
  karuraForest = L.marker([-1.2505, 36.8428]).bindPopup("Karura Forest"),
  gardenCity = L.marker([-1.231, 36.8796]).bindPopup("Garden City");

let travelSites = L.layerGroup([
  nairobiSafariWalk,
  ngongHills,
  karuraForest,
  gardenCity,
]);

//adding lines
let travelPath = L.polyline([
  [-1.231, 36.8796],
  [-1.2505, 36.8428],
  [-1.3357, 36.7795],
  [-1.4056, 36.638],
]).bindPopup("This is my travelling path!");

//an overlays object for the foreground layers
let overlays = {
  "Travel Sites": travelSites,
  "Travelling Path": travelPath,
};

//add a layer control button to the map
L.control.layers(baseMaps, overlays).addTo(map);
