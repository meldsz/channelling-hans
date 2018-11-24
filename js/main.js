//Data
var data = JSON.parse(localStorage.getItem('Data'));
console.log(data[0].Country);
// Define margins
var margin = {top: 25, right: 60, bottom: 50, left: 50};
var paddingH=50,paddingV=50;
// Define Width and height
var outer_width = 1000;
var outer_height = 1000;
var svg_width = outer_width - margin.left - margin.right;
var svg_height = outer_height - margin.top - margin.bottom;
var xScale, yScale, radiusScale;
//Create SVG element as a group with the margins transform applied to it
var svg = d3.select("#bubble_chart")
    .append("svg")
    .attr("id", "bubble")
    .attr("width", svg_width)
    .style("background-color", "aliceblue")
    .attr("height", svg_height)
    drawGraph();
 function drawGraph(){
    setScales();
    var bubbles = svg.select('#bubble_chart')
                        .data(data)
                        .enter()
                        .append('circle');
    bubbles.attr("cx",function(d){xScale(d.gdp);})
    .attr("cy",function(d){yScale(d.CompIndex);})
    .attr("r",function(d){radiusScale(d.Population);})
    .style("fill","blue");
    drawAxes();
}
function setScales(){
    //xScale=d3.scaleLinear().domain([0, + console.log(d3.max(data, function(d){return (d.gdp)}))]).range([paddingH, svg_width - paddingH]);
    //yScale=d3.scaleLinear().domain([0, + d3.max(data,function(d){return d.CompIndex})]).range([svg_height - (paddingV*2),paddingV]);
    //radiusScale=d3.scaleLinear().domain([0,d3.max(data,function(d){return(d.population)})]).range([5,15]);
    xScale=d3.scaleLinear().domain([0, 1940000]).range([paddingH, svg_width - paddingH]);
    yScale=d3.scaleLinear().domain([0,6]).range([svg_height - (paddingV*2),paddingV]);
    radiusScale=d3.scaleLinear().domain([0,d3.max(data,function(d){return 30})]).range([5,15]);
}
function drawAxes(){
    svg.append("g")
    .attr("transform","translate("+0+","+(svg_height-paddingV*2)+")")
    .call(d3.axisBottom(xScale).ticks(20));
    svg.append("g")
    .attr("transform","translate("+paddingV+","+0+")")
    .call(d3.axisLeft(yScale).ticks(20));
}