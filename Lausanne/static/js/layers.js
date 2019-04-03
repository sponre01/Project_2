// var city = data.map(x => x.City);
// var edition = data.map(x => x.Edition);
// var sport = data.map( x => x.Sport);
// var discipline = data.map(x => x.Discipline);
// var athlete = data.map(x => x.Athlete);
// var noc = data.map(x => x.NOC);
// var gender = data.map(x => x.Gender);
// var event = data.map(x => x.Event);
// var event_gender = data.map(x => x.Event_gender);
// var medal = data.map(x => x.Medal); 


// in choose year in country , get title city, y=sport, x= noc, bubles =medals
// in  country display athletes
// in  country  in sport choose x= year, y= medals for each gender




// Layer One:
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
  title: `${NOC} Country`,
  xaxis: {
    autorange: true,
  },
  yaxis: {
    autorange: true,
    type: "date"
  }
};

var trace2 = {
    type: "scatter",
    // fix how to add the function
    // mode = 'markers', symbol = ~Species, symbols = c(semoji), marker = list(size = 10),
    mode: 'markers',
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




Plotly.newPlot("plot", data , layout);
 