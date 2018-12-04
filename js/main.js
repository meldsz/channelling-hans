//Data
var dataset = JSON.parse(localStorage.getItem('Data'));
minYear = d3.min(dataset.map(data => +data.year));
maxYear = d3.max(dataset.map(data => +data.year));
displayYear = minYear;
var intervalId;
selectedCountry = "";
var trace = false;

initialSvgSetup();

// slider to view data for a particular year
createSlider();

// dropdown to select country
createCountryDropdown();

generateVisualisation();

//legend to distinguish regions by color
var legend = legend_svg.selectAll('legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
        return 'translate(0,' + i * 20 + ')';
    });

legend.append('rect')
    .attr('x', 10)
    .attr('y', 20)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);

legend.append('text')
    .attr('x', 30)
    .attr('y', 30)
    .attr('dy', '.35em')
    // .style('text-anchor', 'end')
    .text(function (d) {
        return d;
    });