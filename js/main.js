// Define margins
var margin = {top: 25, right: 600, bottom: 50, left: 50};

// Define Width and height
var outer_width = 1500;
var outer_height = 700;
var svg_width = outer_width - margin.left - margin.right;
var svg_height = outer_height - margin.top - margin.bottom;

//Create SVG element as a group with the margins transform applied to it
var svg = d3.select("#bubble_chart")
    .append("svg")
    .attr("id", "bubble")
    .attr("width", svg_width)
    .style("background-color", "aliceblue")
    .attr("height", svg_height)
    // .attr("width", svg_width + margin.left*1.3)
    // .attr("height", svg_height + margin.top + margin.bottom)
    // .attr("transform", "scale(0.7)")
    .append("g")
    .attr("class", "chart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
