// Test loading a character for later to be used as markers:
console.log("🏃‍♀️");
var Archery = "🏃‍♀️";
// console.log(Vollyball);


function sport_emoji(semoji) {
  if (semoji = Sports_emoji) 
  console.log(semoji)
  return semoji;
}
;

// load csv ===  didnt use but good for error check
var Olympics_csv = d3.csv("../../data/Book1.csv", function(error, data) {
  if (error) return console.warn(error);
  console.log(data[0].City);
  // when stuck try something like:   console.log(data[0].City);


  // var breakDown = data.map(data => data.port);
  // console.log("OlympicsInfo", breakDown);  /// Should I use this instead? NO


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
  
    d3.csv("../../data/book1.csv", function(data) {
      var city = data.map(x => x.City);
      var edition = data.map(x => x.Edition);
      var sport = data.map( x => x.Sport);
      var discipline = data.map(x => x.Discipline);
      var athlete = data.map(x => x.Athlete);
      var noc = data.map(x => x.NOC);
      var gender = data.map(x => x.Gender);
      var event = data.map(x => x.Event);
      var event_gender = data.map(x => x.Event_gender);
      var medal = data.map(x => x.Medal); 
    
      // console.log("city", city);
      // console.log("edition",edition);
      // console.log("data", data);


      var trace1 = {
        type: "scatter",
        // fix how to add the function
        // mode = 'markers', symbol = ~Species, symbols = c(semoji), marker = list(size = 10),
        mode: 'markers',
        name: NOC,
        x: NOC,
        y: edition,
        line: {
          color: "#17BECF" } };
     
  
      var data = [trace1]; 

      var layout = {
      title: `${NOC} NOC`,
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


    });

// //   // Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);



