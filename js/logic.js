// Test loading a character:
console.log("🏃‍♀️");
var Archery = "🏃‍♀️";
console.log (Archery);



// load csv ===  didnt use but good for error check
var Olympics_csv = d3.csv("../book1.csv", function(error, data) {
  if (error) return console.warn(error);
  console.log(data[0].City);
  // when stuck try something like:   console.log(data[0].City);


  // var breakDown = data.map(data => data.port);
  // console.log("OlympicsInfo", breakDown);  /// Should I use this instead? NO
});

function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var breakDown = d3.select("#OlympicsInfo").node().value;
  console.log(breakDown);

  // clear the input value
  d3.select("#OlympicsInfo").node().value = "";

  // Build the plot with the new stock
  buildPlot(breakDown);
};


function unpack(rows, index) {      
  return rows.map(function(row) {
    return row[index];
    });
};
// add unpack to edition

  function buildPlot(breakDown) {  
  
    d3.csv("../book1.csv", function(data) {
      var city = data.map(x => x.City);
      var edition = data.map(x => x.Edition);
      var sport = data.Sport;
      var discipline = data.discipline;
      var athlete = data.athlete;
      var noc = data.NOC;
      var gender = data.gender;
      var event = data.event;
      var event_gender = data.event_gender;
      var medal = data.medal; 
    
      console.log("city", city);
      console.log("edition",edition);
      console.log("data", data);

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: city,
        x: city,
        y: edition,
        line: {
          color: "#17BECF" } };
     
  
      var data = [trace1]; 

      var layout = {
      title: `${city} city`,
      xaxis: {
        autorange: true,
      },
      yaxis: {
        autorange: true,
        type: "date"
      }
    };
    Plotly.newPlot("plot", data , layout);
      })};




// //   // Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);



