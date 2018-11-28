//Data
var dataset = JSON.parse(localStorage.getItem('Data'));

initialSvgSetup();

generateVisualisation();

createSlider();

var legend = svg.selectAll('legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
        return 'translate(0,' + i * 20 + ')';
    });

legend.append('rect')
    .attr('x', width + 20)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);

legend.append('text')
    .attr('x', width + 20 - 6)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text(function (d) {
        return d;
    });

