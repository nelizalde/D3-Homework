// @TODO: YOUR CODE HERE!
// You need to create a scatter plot between two of the data variables: Smokers vs. Age
//Set the dimentions and margins of the graph
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 50,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create an SVG wrapper and append an SVG that will hold our chart
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load Data from csv, using a promise(.then)
d3.csv("assets/data/data.csv").then(function(JournalismData){
    console.log(JournalismData);


// Format the data
JournalismData.forEach(function(data){
    data.age = +data.age;
    data.smokes = +data.smokes;
 });
 console.log(JournalismData[0]);

//Create the scales for the chart
    var xScale = d3.scaleLinear()
    .domain([d3.min(JournalismData, d => d.age)-1,d3.max(JournalismData, d => d.age)+3.2])
    .range([0, width]);
    console.log(d3.min(JournalismData, d => d.age))

    var yScale = d3.scaleLinear()
    .domain([d3.min(JournalismData, d => d.smokes)*0.8,d3.max(JournalismData, d => d.smokes)+3.2])
    .range([height,0]);
    console.log(d3.min(JournalismData, d => d.smokes))
    
// Create the axes 
var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

// Append x-axis
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

// Append y-axis
chartGroup.append("g").call(leftAxis);


// Draw in scatter plot 
    scatter=chartGroup
    .selectAll("circle")
    .data(JournalismData)
    .enter()
    .append("circle")
      .attr("cx", d=> xScale(d.age))
      .attr("cy", d=> yScale(d.smokes))
      .attr("r", 18)
      .style("fill", "#69b3a2")

    // Draw in text
      chartGroup
      .selectAll()
      .data(JournalismData)
      .enter()
      .append("text")
        .attr("x", d=> xScale(d.age))
        .attr("y", d=> yScale(d.smokes))
        .attr("font-size", "9px")
        .text(d=> d.abbr)
        .style("fill", "white")
        .classed("stateText", "true")
  

// Step 6: Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.age}<br>age: ${d.smokes}<br>smokes: ${d.state}<br>`);
      });

// Step 7: Create tooltip in the chart
  
    scatter.call(toolTip);

// Step 8: Create event listeners to display and hide the tooltip

    scatter.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left+20)
.attr("x", 0 - (height/2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Smokes");

chartGroup.append("text")
.attr("transform", `translate(${width / 2.2}, ${height + 40})`)
.attr("class", "axisText")
.text("Age");


}).catch(function(error) {
    console.log(error);
  });

