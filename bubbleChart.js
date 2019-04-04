
d3.csv('year_gender_Medals.csv').then( function (data) {
    var sport = data.map( x => x.Sport);
    var edition = data.map(x => x.Edition);
    var goldMedal = data.map(x => x.Medal_Gold); 

////// emoji function///////
function emoji(image){

    for (var i = 0; i < sport.length; i++) { 
        var sportE = sport[i];
        for (var key in Sports_emoji){
            var value = Sports_emoji[key]
            if ( sportE= value){
                console.log(sportE);
                return sportE;
                sportE.enter()
                
                
            }

        }
            
    }
    // else pass
          

};
var image = emoji(data);// 
console.log(Sports_emoji);  

/////////////// create bubble function//////////
function bubble(bubbles){
    var sport = data.map( x => x.Sport);
    var edition = data.map(x => x.Edition);
    var goldMedal = data.map(x => x.Medal_Gold); 

    var width = 932;
    var height = width;

    var dataForpack =  data.map(function (x){
            return {
                name:x.Sport,
                title: x.Sport,
                group:x.Medal_Gold,
                value: 1
            }
        });
console.log(dataForpack);


        pack = dt => d3.pack()
        .size([width - 2, height - 2])
        .padding(3)
        (d3.hierarchy({children: dt})
        .sum(d => d.value))


   //////////////////COME BACK LATER.///////////////////////////
// const svg = d3.select(DOM.svg(width, height))
// .style("width", "100%")
// .style("height", "auto")
// .attr("font-size", 10)
// .attr("font-family", "sans-serif")
// .attr("text-anchor", "middle")
;
 //////////////////////////////////////////////////////////////



    root = pack(dataForpack);
    // console.log("root",root)
    const svg = d3.select("svg"); ////these three lines work
    // var width = +svg.attr("width");
    // var height = +svg.attr("height");

  
    const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
    // .attr("dummy",function (d){
    //     console.log("d",d)
    // })
    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`); ////******** */
  
    color = d3.scaleOrdinal(data.map(d => d.Sport), d3.schemeCategory10)

    leaf.append("circle")
        // .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
        .attr("r", d => d.r*goldMedal) ///////************ */ r is for radius
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(d.data.name)); //

    //     leaf.append("clipPath")
    //     // .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    //   .append("use")
    //     .attr("xlink:href", d => d.leafUid.href); //// xlink:href NO LONGER USED
  
    // leaf.append("text")  ///// works bring back later
    //     .attr("clip-path", d => d.clipUid)
    //   .selectAll("tspan")
    //   .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    //   .join("tspan")
    //     .attr("x", 0)
    //     .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
    //     .text(d => d);
  
    leaf.append("title")
        .text(d => `${d.data.title}\n${d3.format(d.value)}`);

       

/////append the sport emojis to the sport////////////////////////////
/////////////////come back to later///////////////////

    // leaf.append(sportE).enter()
    //             var image = svg.selectAll("image").data([0]);
    //                 image.enter()
    //                 .append("svg:image")
    //                 .src(d => emoji(d))
//  d3.event.preventDefault();

//////////////////////////////////////////Append emojis/////////////////////////////////////////////

 

//////match the emojie to the sports on file//////////////


// image = leaf.append("svg:image")
//         .attr("xlink:href",  function(d) { return d.img;})
//         .attr("x", function(d) { return -25;})
//         .attr("y", function(d) { return -25;})
//         .attr("height", 50)
//         .attr("width", 50);
// console.log(image)

//////////////////////////////
    return svg.node();
};

    //////////////////////////////////////////////////
    //////////////Add slider below/////////////////////
    //////////////////////////////////////////////////
    var lookup = {};

// script taken from https://plot.ly/javascript/gapminder-example/

Plotly.d3.csv('../year_gender_Medals.csv', function (err, data) {
    // Create a lookup table to sort and regroup the columns of data,
    // first by year, then by continent:
    var lookup = {};
  console.log(data);
  var useBubbles =bubble(data);
  console.log(useBubbles)
  
    
  // //////////////////////
  // // from 14-3-6 excersise
  // // Select the upvote and downvote buttons
  // var clickSport = d3.select(".btn");
  // // Use D3 `.on` to attach a click handler sports&year
  // clickSport.on("click", function() {
  //     d3.event.preventDefault();
  //     getData();
  
  // });
  //////////////////////////////
  
  
  //Dont use these variables, use the ones below in the data
  
    function getData(Edition, Sport) {
      var byYear, trace;
      if (!(byYear = lookup[Edition])) {;
        byYear = lookup[Edition] = {};
      }
       // If a container for this year + sport doesn't exist yet,
       // then create one:
      if (!(trace = byYear[Sport])) {
        trace = byYear[Sport] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: {size: []} /// this is where i will add the emoji later
        };
      }
      return trace;
    }
  
    // Go through each row, get the right trace, and append the data:
    for (var i = 0; i < data.length; i++) {
      
      var datum = data[i];
    //   console.log (datum);
  
      var trace = getData(datum.Edition, datum.Sport); 
      trace.text.push(datum.Medal_Silver);
      trace.id.push(datum.Medal_Silver);
      trace.x.push(datum.Medal_Gold+datum.Medal_Silver+datum.Medal_Bronze);
      trace.y.push(datum.Medal_Gold+datum.Medal_Silver+datum.Medal_Bronze);
      trace.marker.size.push(datum.pop);
  
    }
//   //can i show the first year????????g
//   // console.log("lookup", lookup);
//   // console.log("city", city);
  console.log("edition",edition);
//     //console.log("data", data);
  
    // Get the group names:
    var years = Object.keys(lookup);
    // In this case, every year includes every sport, so we
    // can just infer the sport from the *first* year:
    var firstYear = lookup[years[0]];
    var sports = Object.keys(firstYear);
  
//     // Create the main traces, one for each sport:
    var traces = [];
    for (i = 0; i < sports.length; i++) {
      var data = firstYear[sports[i]]
//        // One small note. We're creating a single trace here, to which
//        // the frames will pass data for the different years. It's
//        // subtle, but to avoid data reference problems, we'll slice
//        // the arrays to ensure we never write any new data into our
//        // lookup table:
      traces.push({
        name: sports[i],
        x: data.x.slice(),
        y: data.y.slice(),
        id: data.id.slice(),
        text: data.text.slice(),
        mode: 'markers',
        marker: {
          size: data.marker.size.slice(),
          sizemode: 'area',
          sizeref: 200000
        }
      });
    }
    console.log(traces);
  
//     // Create a frame for each year. Frames are effectively just
//     // traces, except they don't need to contain the *full* trace
//     // definition (for example, appearance). The frames just need
//     // the parts the traces that change (here, the data).
    var frames = [];
    for (i = 0; i < years.length; i++) {
      frames.push({
        name: years[i],
        data: sports.map(function (Sport) {
          return getData(years[i], Sport);
        })
      })
    }
    console.log(frames);
  
//     // Now create slider steps, one for each frame. The slider
//     // executes a plotly.js API command (here, Plotly.animate).
//     // In this example, we'll animate to one of the named frames
//     // created in the above loop.
    var sliderSteps = [];
    for (i = 0; i < years.length; i++) {
      sliderSteps.push({
        method: 'animate',
        label: years[i],
        args: [[years[i]], {
          mode: 'immediate',
          transition: {duration: 300},
          frame: {duration: 300, redraw: false},
        }]
      });
    }
    console.log(sliderSteps);
  
    var layout =  {
      xaxis: {
        title: 'Gold Medal',
        range: [0,100]
      },
      yaxis: {
        title: 'Number of medals',
        
      },
      hovermode: 'closest',
       // We'll use updatemenus (whose functionality includes menus as
       // well as buttons) to create a play button and a pause button.
       // The play button works by passing `null`, which indicates that
       // Plotly should animate all frames. The pause button works by
       // passing `[null]`, which indicates we'd like to interrupt any
       // currently running animations with a new list of frames. Here
       // The new list of frames is empty, so it halts the animation.
      updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
          method: 'animate',
          args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 500, redraw: false}
          }],
          label: 'Play'
        }, {
          method: 'animate',
          args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          }],
          label: 'Pause'
        }]
      }],
       // Finally, add the slider and use `pad` to position it
       // nicely next to the buttons.
      sliders: [{
        pad: {l: 130, t: 55},
        currentvalue: {
          visible: true,
          prefix: 'Year:',
          xanchor: 'right',
          font: {size: 20, color: '#666'}
        },
        steps: sliderSteps
      }]
      
    };
  console.log(layout);
    // Create the plot:
    // Plotly.toImage('plot', {
    //       data: traces,
    //       layout: layout,
    //       frames: frames}).then(useBubbles) 

    Plotly.plot('plot', {
      data: bubble(traces),
      layout: layout,
      frames: frames,
      
    });
  });









// //     // var city = data.map(x => x.City);
// // //     var edition = data.map(x => x.Edition);
// // //     var sport = data.map( x => x.Sport);
// // //     // var discipline = data.map(x => x.Discipline);
// // //     // var athlete = data.map(x => x.Athlete);
// // //     // var noc = data.map(x => x.NOC);
// // //     var gender = data.map(x => x.Gender);
// // //     // var event = data.map(x => x.Event);
// // //     // var event_gender = data.map(x => x.Event_gender);
// // //     var GoldMedal = data.map(x => x.Medal_Gold); 
// // //     var SilverMedal = data.map(x => x.Medal_Silver); 
// // //     var BronxMedal = data.map(x => x.Medal_Bronze); 


});