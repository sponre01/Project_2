// Create function to color countries based on total medals won
function getColor(d) {
  return d > 1000 ? '#3e76ec' :
         d > 500 ? '#555555' :
         d > 100 ? '#ff0000' :
         d > 10  ? '#ffce01' :
                   '#179a13';
}

function getHeat(d) {
return d > 1000 ? '#800026' :
       d > 500  ? '#BD0026' :
       d > 200  ? '#E31A1C' :
       d > 100  ? '#FC4E2A' :
       d > 50   ? '#FD8D3C' :
       d > 20   ? '#FEB24C' :
       d > 10   ? '#FED976' :
                  '#FFEDA0';
}

// Adding tile layers
var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
maxZoom: 18,
id: "mapbox.light",
accessToken: API_KEY
});

var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.outdoors",
accessToken: API_KEY
});

// Creating map object
var map = L.map("map", {
center: [30, 0],
zoom: 3,
layers: [graymap, outdoors]
});

graymap.addTo(map);

var olympicColors = new L.LayerGroup();
var heatmap = new L.LayerGroup();

var baseMaps = {
Grayscale: graymap,
Outdoors: outdoors
};

var overlays = {
"Olympic Colors": olympicColors,
"Traditional Heatmap": heatmap
};

L
.control
.layers(baseMaps, overlays)
.addTo(map);

var link = "raw/THISISTHEDATA.json";

var link = "data/geo_json_total.json";

// Grab GEOJSON
d3.json(link, function(error, data) {
  if (error) return console.warn(error);
  
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
  "<a href=\"/country/" +feature.properties.ISO_A3 +"\" class=\"button\">Go to Country page</a>");

}
}).addTo(olympicColors);

olympicColors.addTo(map);

function getColor(d) {
  return d > 1000 ? '#3e76ec' :
         d > 500 ? '#555555' :
         d > 100 ? '#ff0000' :
         d > 10  ? '#ffce01' :
                   '#179a13';
}
// Here we create a legend control object.
var legend = L.control({position: "bottomleft"});

// Then we add all the details for our legend
legend.onAdd = function() {
  var div = L
    .DomUtil
    .create("div", "info legend");

  var grades = [0, 10, 100, 500, 1000];
  var colors = [
    "#179a13",
    "#ffce01",
    "#ff0000",
    "#555555",
    "#3e76ec",
  ];

  // Loop through our intervals and generate a label with a colored square for each interval.
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<li style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
};

// We add our legend to the map.
legend.addTo(map);


// HEATMAP LAYER 
// ************************************************************

// Grab GEOJSON for Heatmap layer
d3.json(link, function(data) {
L.geoJson(data, {
style: function(feature) {
  return {
    color: "white",
    fillColor: getHeat(feature.properties.total),
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
  "<a href=\"/country/" +feature.properties.ISO_A3 +"\" class=\"button\">Go to Country page</a>");

}
}).addTo(heatmap);

})

});