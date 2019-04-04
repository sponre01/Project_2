
Plotly.d3.csv('year_gender_Medals.csv', function (data) {
    //     // Create a lookup table to sort and regroup the columns of data,
    //     // first by year, then by continent:
    var lookup = {};
    console.log(data);

    var sport = data.map( x => x.Sport);
    var edition = data.map(x => x.Edition);
    // var width = 932;
    // var height = width;

    // var roots = d3.layout.hierarchy(data)
    
    pack = data => d3.layout.pack()
    .size([width - 2, height - 2])
    .padding(3); //.roots
   

 
    const root = pack(data);

    const svg = d3.select("svg");
    var width = +svg.attr("width");
    var height = +svg.attr("height");

    // const svg = d3.select(width, height)
    //     .style("width", "100%")
    //     .style("height", "auto")
    //     .attr("font-size", 10)
    //     .attr("font-family", "sans-serif")
    //     .attr("text-anchor", "middle");
  
    const leaf = svg.selectAll("g")
      .data()
      .join("g")
    //   .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
  
    leaf.append("circle")
        // .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
        .attr("r", d => d.r)
        .attr("fill-opacity", 0.7)
        // .attr("fill", d => color(d.data.group));
  
//     leaf.append("clipPath")
//         .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
//       .append("use")
//         .attr("xlink:href", d => d.leafUid.href);
  
//     leaf.append("text")
//         .attr("clip-path", d => d.clipUid)
//       .selectAll("tspan")
//       .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
//       .join("tspan")
//         .attr("x", 0)
//         .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
//         .text(d => d);
  
//     leaf.append("title")
//         .text(d => `${d.data.title}\n${format(d.value)}`);
      
//     return svg.node();
  

//   data =  d3.csv("year_gender_Medals", function (data){console.log(data)});


//   format = d3.format(",d");

//   color = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10);
//   d3 = require("d3@5")


// // Plotly.d3.csv('year_gender_Medals.csv', function (data) {
// //     // Create a lookup table to sort and regroup the columns of data,
// //     // first by year, then by continent:
// //     var lookup = {};
// //     console.log(data);
// //     // var city = data.map(x => x.City);
// //     var edition = data.map(x => x.Edition);
// //     var sport = data.map( x => x.Sport);
// //     // var discipline = data.map(x => x.Discipline);
// //     // var athlete = data.map(x => x.Athlete);
// //     // var noc = data.map(x => x.NOC);
// //     var gender = data.map(x => x.Gender);
// //     // var event = data.map(x => x.Event);
// //     // var event_gender = data.map(x => x.Event_gender);
// //     var GoldMedal = data.map(x => x.Medal_Gold); 
// //     var SilverMedal = data.map(x => x.Medal_Silver); 
// //     var BronxMedal = data.map(x => x.Medal_Bronze); 


});