// script taken from https://plot.ly/javascript/gapminder-example/

Plotly.d3.csv('../year_gender_Medals.csv', function (error, data) {
    if (error) return console.warn(error)
    console.log(data);



//   Create a lookup table to sort and regroup the columns of data,
//   first by year, then by continent:


//Dont use these variables, use the ones below in the data
    var lookup = {};

    function getData(Edition, Sport) {
        var byYear, trace;
        if (!(byYear = lookup[Edition])) {
            byYear = lookup[Edition] = {};
        };
    // foreach


        // If a container for this year + continent doesn't exist yet,
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
    
};


//   // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    
    var datum = data[i];
    //console.log (datum);
    var trace = getData(datum.Edition, datum.Sport); 
    trace.text.push(datum.Sport);
    trace.id.push(datum.Medal_Bronze);
    trace.x.push(datum.Medal_Gold);
    trace.y.push(datum.Edition);
    trace.marker.size.push(datum.Medal_Silver);

  };
//   getData(data);
//   console.log(datum.Edition);
//   console.log(datum.Medal_Bronze)




  // Get the group names:
  var years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[years[0]];
  var sports = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < sports.length; i++) {
    var data = firstYear[sports[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
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

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: sports.map(function (Sport) {
        return getData(years[i], Sport);
      })
    })
  }

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
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

  var layout = {
    xaxis: {
      title: 'year',
      range: [1900, 2010]
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

  // Create the plot:
  Plotly.plot('plot', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});

  
//////////////////////
// from 14-3-6 excersise
var clickSport = d3.select("#btn");
// Use D3 `.on` to attach a click handler sports&year
clickSport.on("click", function() {
    getData()
});
//////////////////////////////

// console.log("lookup", lookup);
// console.log("City", City);
// console.log("Edition",Edition);
//console.log("data", data);


/////////////////////