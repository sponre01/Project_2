// Create function to color countries based on total medals won
function getColor(d) {
  return d > 1000 ? '#3e76ec' :
         d > 500 ? '#555555' :
         d > 100 ? '#ff0000' :
         d > 10  ? '#ffce01' :
                   '#179a13';
}

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

var link = "raw/geo_json_total.json";

// Grab GEOJSON
d3.json(link, function(data) {
  console.log(data.features)
L.geoJson(data, {
  style: function(feature) {
    return {
      color: "white",
      fillColor: getColor(feature.properties.total),
      fillOpacity: 0.8,
      weight: 1.5
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
          fillOpacity: 0.8
        });
      },
    });
    // Popup info
    layer.bindPopup("<h1>" + feature.properties.ADMIN +"<br>"+ feature.properties.total + " total medals" + "</h1> <hr> <h2>" + 
    //feature.properties.ISO_A3 + "</h2>" + 
    "<p><h3> Gold medals: " + feature.properties.gold + "</h3></p>" +
    "<p><h3> Silver medals: " + feature.properties.silver +"</h3></p>" +
    "<p><h3> Bronze medals: " + feature.properties.bronze +"</h3></p>" +
    "<button id='button' type='submit' class='btn btn-default'>See the Breakdown</button>");

  }
}).addTo(map);


// make legend
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 100, 500, 1000],
      labels = [];
      div.innerHTML+='<div><b><h3>Legend</h3></b></div>';
  // loop through our magnitude intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style=\"background:' + getColor(grades[i] + 1) + '\"></li> ' + '<b>' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] +'</b>'+ '<br>' : '+');
  }

  return div;
};

legend.addTo(map);







});