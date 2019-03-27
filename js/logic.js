d3.csv("dummY_data.csv", function(error, data) {
  if (error) return console.warn(error);
  console.log(data);})

// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 3
});

console.log(myMap)
// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);



// Create a new marker
// Pass in some initial options, and then add it to the map using the addTo method
var marker = L.marker([41.8964, -87.6198], {
  draggable: true,
  title: "Ilya My love"
}).addTo(myMap);

// Binding a pop-up to our marker
marker.bindPopup("Coding bootcamp!");
