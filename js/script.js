
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = $(".chart").width() - margin.left - margin.right,
    height = $(".chart").height() - margin.top - margin.bottom;

  //The lines of code above are defining the parameters of our baseball chart. 

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

// Now, we are defining what the x and the y axes represent. The x axis is ordinal because the numbers are not quantitative. The y axis is linear because the numbers are quantitaive (years). I'm guessing here, but the rangeRoundBands means that the width of the bars will change according to the size of the chart? 

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)
    .ticksFormat(function(d)  {
      return d;
    });

    //We had to change the previous code from showing percentages to showing numbers. We do this by giving the ticks a format and function - meaning this is how the axes will be drawn. We are saying that the x axis will be oriented at the bottom and the y will be oriented at the left. 


var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/andre_ethier_card.json", function(error, data) {
  

  // I believe here we are calling our json file so that we can chart the right data. I also understand that we are grouping something, but I'm not exactly sure what the attributes "transform" and "translate" are.

  x.domain(data.stats.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.stats, function(d) { return d.HR; })]);


// Here we are assigning functions to the x and y on the chart. meaning that for the x domain we are showing the year from our json file and for our y domain we are showing the amount of homeruns. 

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Homeruns");

//Although I am not sure as to why we are not assigning the x axis any text, we are identifying the y axis as Homeruns and tilting/transforming it so it reads at a -90 degree angle. 

  svg.selectAll(".bar")
      .data(data.stats)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.HR); })
      .attr("height", function(d) { return height - y(d.HR); });

      // The difference between this method and the $.each() method is that we are grouping all of the functions and attributes under the svg.selectAll. This simplifies/shortens our code.

});


