//var this_js_script = $('script[src*=somefile]'); // or better regexp to get the file name..
//console.log(this_js_script);
//var countryId = this_js_script.attr('countryId');  
console.log(countryId);
var link = '/countryData/' +countryId;
Plotly.d3.json(link, function (err, data) {
  if(err) return (err);
  //Edition	Gender	Sport	Medal_Bronze	Medal_Gold	Medal_Silver	Total_Medals
  // 1896	Men	Arti1stic_G	7	28	10	45
  console.log(data);
 
  // Create a lookup table to sort and regroup the columns of data,
    // first by year, then by Gender:
    var lookup = {};
    function getData(Edition, Gender) {
      var byYear, trace;
      if (!(byYear = lookup[Edition])) {;
        byYear = lookup[Edition] = {};
      }
     // If a container for this year + Gender doesn't exist yet,
     // then create one:
      if (!(trace = byYear[Gender])) {
        trace = byYear[Gender] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: {size: [],color:[]}
        };
      }
      return trace;
    }
    function genderColor(g) {
      
      if (g=='Men') {
        
        return 'rgb(0,0,255)';
      }
      else return 'rgb(255,0,0)';
    }
    // Go through each row, get the right trace, and append the data:
    for (var i = 0; i < data.length; i++) {
      var datum = data[i];
      var trace = getData(datum.Edition, datum.Gender);
      trace.text.push(datum.Sport);
      trace.id.push(datum.Sport);
      trace.x.push(datum.Total_Medals);
      trace.y.push(datum.Medal_Gold);
      trace.marker.size.push(datum.Total_Medals);
      trace.marker.color.push(genderColor(datum.Gender)) ;
        
      
    }
  
    // Get the group names:
    var years = Object.keys(lookup);
    // In this case, every year includes every Gender, so we
    // can just infer the Genders from the *first* year:
    var lastYear = lookup[years[years.length -1]];
    var genders = Object.keys(lastYear);
    var firstYear = lookup[years[0]];
    // Create the main traces, one for each gender:
    var traces = [];
    for (i = 0; i < genders.length; i++) {
      //console.log(i)
      var data = firstYear[genders[i]];
      if(!data) 
        continue;
     // One small note. We're creating a single trace here, to which
     // the frames will pass data for the different years. It's
     // subtle, but to avoid data reference problems, we'll slice
     // the arrays to ensure we never write any new data into our
     // lookup table:
      console.log(data)
      traces.push({
        name: genders[i],
        x: data.x.slice(),
        y: data.y.slice(),
        id: data.id.slice(),
        text: data.text.slice(),
        mode: 'markers',
        marker: {
          color: genderColor('Men'), //first olympics were only men
          size: data.marker.size.slice(),
          sizemode: 'area',
         sizeref: .1
        }
      });
    }
  // console.log("hello")
    // Create a frame for each year. Frames are effectively just
    // traces, except they don't need to contain the *full* trace
    // definition (for example, appearance). The frames just need
    // the parts the traces that change (here, the data).
    var frames = [];
    for (i = 0; i < years.length; i++) {
      frames.push({
        name: years[i],
        data: genders.map(function (Gender) {
        //  console.log(Gender)
       //   console.log(getData(years[i], Gender))
          return getData(years[i], Gender);
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
        title: 'Total Medals Achieved',
      //   range: [30, 85]
      },
      yaxis: {
        title: 'Gold Medals Achieved',
      //   type: 'log'
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
    Plotly.plot('myDiv', {
      data: traces,
      layout: layout,
       config: {showSendToCloud:true},
      frames: frames,
    });
  });
