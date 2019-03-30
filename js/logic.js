// Test loading a character:
//console.log("🏃‍♀️");
var Archery = "🏃‍♀️";
console.log (Archery);
// load csv

var csv = d3.csv("book1.csv", function(error, data) {
  if (error) return console.warn(error);
  console.log(data);

  var breakDown = data.map(data => data.port);
  console.log("OlympicsInfo", breakDown);  /// Should I use this instead?
});

function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var breakDown = d3.select("#OlympicsInfo").node().value;
  console.log(breakDown);

  // clear the input value
  // d3.select("#OlympicsInfo").node().value = "";

  // Build the plot with the new stock
  buildPlot(breakDownx);
};


function unpack(rows, index) {      // Is this right?
  return rows.map(function(row) {
    return row[index];
    });
};


  function buildPlot(stock) {  
  
    csv.then(function(data) {
      var city = data.dataset.City;
      var edition = data.dataset.Edition;
      var sport = data.dataset.Sport;
      var discipline = data.dataset.discipline;
      var athlete = data.dataset.athlete;
      var noc = data.dataset.NOC;
      var gender = data.dataset.gender;
      var event = data.dataset.event;
      var event_gender = data.dataset.event_gender;
      var medal = data.dataset.medal;


      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: city,
        y: edition,
        line: {
          color: "#17BECF"
      }
    };
    })};
  

var layout = {
  title: `${city} city`,
  xaxis: {
    autorange: true,
  },
  yaxis: {
    autorange: true,
    type: "linear"
  }
};

Plotly.newPlot("plot", trace1, layout);


  // Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);



