
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = $(".chart").width() - margin.left - margin.right,
    height = $(".chart").height() - margin.top - margin.bottom;

  //This is one variable. Margin is an object because of the curly braces. The comma eradicates the need to put a varibale for the objects width and height. Comma means that whatever variable we put next, we can put it under this one variable. The margin sets the parameters around the chart, not necesarrily the size of the chart.

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
    .tickFormat(function(d) {
      return d
    });

    //We had to change the previous code from showing percentages to showing numbers. We do this by giving the ticks a format and function - meaning this is how the axes will be drawn. We are saying that the x axis will be oriented at the bottom and the y will be oriented at the left. 


var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/andre_ethier_card.json", function(error, data) {
  
//Here we are applying attributes because we are in SVG. Translate is a lot like x and y but it is different. It is the way that you assign x and y position to groups. Margin x and margin y the left and the bottom, is the size of that diagonal line in the marginal convention.THe translate is the offset. 

//The Json is our ajax call. 

  x.domain(data.stats.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.stats, function(d) { return d.HR; })]);

// Mapping is the method we are using for the categories within the domain. In the y domain we are returning the lowest and the highest numbers within the domain. (linear) Domain is part of the variable x.
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
      .attr("x", function(d) { 

        console.log(x(d.year));

        return x(d.year); })
      
      .attr("width", x.rangeBand())
      .attr("y", function(d) { 

        console.log(y(d.HR));

        return y(d.HR); 
      })
      .attr("height", function(d) { return height - y(d.HR); });

 // THis is where our bars are made. We are essentially selecting something that doesn't exist, but that we are filling with using our data.stats. Enter is to append a rectangle to this empty svg. When we console log that, we get the pixels x of all the bars.

});


