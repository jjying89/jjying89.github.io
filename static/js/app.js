// read in samples.json
d3.json("../../samples.json").then((data) => {
    
  // console.log(data);

  // create test subject id dropdown menu
  var names = data.names;

  for (var i = 0; i < names.length; i++) {
    selectId = d3.select("#selDataset");
    selectId.append("option").text(names[i]);
  };

  // bar plot, bubble chart, demo info
  function idInfo(id) {
           
    // set variables for the data
    var otu_ids = data.samples[id].otu_ids;
    var otu_labels = data.samples[id].otu_labels;
    var sample_values = data.samples[id].sample_values;
        
    // get top 10 OTU and arrange from most to least frequent
    // add "OTU" for it to render properly
    var top10_otu_ids = otu_ids.slice(0, 10).reverse().map((otu => "OTU" + otu)); 
    var top10_otu_labels = otu_labels.slice(0, 10).reverse();
    var top10_sample_values = sample_values.slice(0, 10).reverse();

    // set up trace for bar plot
    var trace1 = {
    x: top10_sample_values,
    y: top10_otu_ids,
    text: top10_otu_labels,
    type: "bar",
    orientation: "h"
    };
    
    // bar plot data
    var barData = [trace1];

    // show bar plot
    Plotly.newPlot("bar", barData);

    // set up trace for bubble chart
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      marker: {
        color: otu_ids, 
        size: sample_values
      },
      mode: "markers"
    };
      
    // bubble chart data
    var bubbleData = [trace2];

    // show bubble chart    
    Plotly.newPlot("bubble", bubbleData);

    // set up demographic info
    var demoinfo = d3.select("#sample-metadata");
    var keys = Object.keys(data.metadata[id]);
    var values = Object.values(data.metadata[id]);
    
    // clear previous info
    demoinfo.html("");

    // display demographic info
    for (var i = 0; i < keys.length; i++) {
      demoinfo.append("p").text(`${keys[i]}: ${values[i]}`);
    };
  };
    
  // show default plots (id 940)
  idInfo(0);
  
  // refresh data when selecting new ID
  d3.selectAll("#selDataset").on("change", updatePage);

  function updatePage() {
    
    // set variables for dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    var dropdownMenuID = dropdownMenu.property("value");
      
    // console.log(dropdownMenuID);
    
    // display selected id
    for (var i = 0; i < names.length; i++) {
      if (dropdownMenuID === names[i]) {
        idInfo(i);
        return
      };
    };
  };
});





