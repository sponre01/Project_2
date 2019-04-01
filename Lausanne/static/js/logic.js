// silver: #C0C0C0 or #A7A7AD
// bronze: #cd7f32 or #A77044
// gold: #ffd700 or #D6AF36
// grayish violet: #c5c1cf


// Creating map object
var map = L.map("map", {
  center: [30, 0],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
}).addTo(map);

var link = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

// Grab GEOJSON
d3.json(link, function(data) {
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "silver",
        fillOpacity: 0.5,
        weight: 1.0
      };
    },

  // Mouseover/mouseout events
    onEachFeature: function(feature, layer) {
      layer.on({
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.1
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
      });
      // Popup info
      layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h2>" + feature.properties.ISO_A3 + "</h2>" + "<button id='button' type='submit' class='btn btn-default'>See the Breakdown</button>");
    }
  }).addTo(map);


// Button
var button = d3.select("#button");
  button.on("click", function() {
    tbody.selectAll('*').remove();
    var inputDate = d3.select("#datetime");
    var inputText = inputDate.property("value")
    var filteredData = tableData.filter(x => x.datetime === inputText);
      })
    })

//   // Create a baseMaps object
// var baseMaps = {
//   "Street Map": streetmap,
//   "Dark Map": darkmap
// };

// // Create an overlay object
// var overlayMaps = {
//   "State Population": states,
//   "City Population": cities
// };

// // Define a map object
// var myMap = L.map("map", {
//   center: [37.09, -95.71],
//   zoom: 5,
//   layers: [streetmap, states, cities]
// });

// // Pass our map layers into our layer control
// // Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);



//});
