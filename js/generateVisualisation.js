function generateVisualisation() {
    // filter all the data for display year
    const filteredDataset = dataset.filter(data => {
        if (data.year == displayYear) {
            return data.year;
        }
    });
    console.log(filteredDataset)
    color = d3.scaleOrdinal(d3.schemeCategory10);

    xScale.domain([xMin, xMax / 200]).nice();
    yScale.domain([yMin, yMax]).nice();

    radius.domain(d3.extent(filteredDataset, data => data.population)).nice();

    svg.select("#x-axis").call(xAxis);
    svg.select("#y-axis").call(yAxis);

    var bubble = svg.selectAll('#bubbles')
        .data(filteredDataset)
        .enter().append('circle')
        .attr('id', 'bubble')
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
        })
        .style("stroke", "black")
        .style("stroke-opacity", .4);

    bubble.append('title')
        .attr('x', function (d) {
            return radius(d.population);
        })
        .text(function (d) {
            return d.Country;
        });

    bubble.exit().remove();
    console.log(bubble.exit().remove())

    d3.select("#yearText").text(displayYear)
}