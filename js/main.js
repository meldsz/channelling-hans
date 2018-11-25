//Data
var dataset = JSON.parse(localStorage.getItem('Data'));

// Define Margins
var margin = {top: 30, right: 50, bottom: 100, left: 100};
var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

minYear = d3.min(dataset.map(data => +data.year));
maxYear = d3.max(dataset.map(data => +data.year));
displayYear = minYear;

// filter all the data for display year
filteredDataset = dataset.filter(data => {
    if (data.year == displayYear) {
        return data.year;
    }
});

var svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var xScale = d3.scaleLinear()
    .range([0, width]);
var yScale = d3.scaleLinear()
    .range([height, 0]);
// square root scale.
var radius = d3.scaleSqrt()
    .range([2, 5]);
var xAxis = d3.axisBottom()
    .scale(xScale);
var yAxis = d3.axisLeft()
    .scale(yScale);
var color = d3.scaleOrdinal(d3.schemeCategory10);
xScale.domain(d3.extent(filteredDataset, function (d) {
    return (d.gdp / 500);
})).nice();

yScale.domain(d3.extent(filteredDataset, function (d) {
    return d.CompIndex;
})).nice();
radius.domain(d3.extent(filteredDataset, function (d) {
    return (d.population / 10);
})).nice();

// Add Axes Titles
svg.append("text")
    .attr("x", -40)
    .attr("y", 450)
    .style("font-family", "Helvetica")
    .style("font-size", "25px")
    .style("font-weight", "bold")
    .attr("transform", "rotate(-90 -40,450)")
    .text("Global Competitive Index");

svg.append("text")
    .attr("x", width / 2)
    .attr("y", 630)
    .style("font-family", "Helvetica")
    .style("font-size", "25px")
    .style("font-weight", "bold")
    .text("GDP");

svg.append("text")
    .attr("x", 40)
    .attr("y", 100)
    .style("font-family", "Helvetica")
    .style("font-size", "100px")
    .style("font-weight", "bold")
    .attr("id", "yearText")
    .style("fill", "lightgrey")
    .attr("transform", "scale(3)")
    .text(displayYear);

svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'x axis')
    .call(xAxis);
svg.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'y axis')
    .call(yAxis);
var bubble = svg.selectAll('#bubble_chart')
    .data(filteredDataset)
    .enter().append('circle')
    .attr('id', 'bubble_chart')
    .attr('cx', function (d) {
        return xScale(d.gdp);
    })
    .attr('cy', function (d) {
        return yScale(d.CompIndex);
    })
    .attr('r', function (d) {
        return radius(d.population);
    })
    .style('fill', function (d) {
        return color(d.region);
    });
bubble.append('title')
    .attr('x', function (d) {
        return radius(d.population);
    })
    .text(function (d) {
        return d.Country;
    });


var legend = svg.selectAll('legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
        return 'translate(0,' + i * 20 + ')';
    });
legend.append('rect')
    .attr('x', width)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);
legend.append('text')
    .attr('x', width - 6)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text(function (d) {
        return d;
    });