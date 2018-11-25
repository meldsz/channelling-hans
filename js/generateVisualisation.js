function generateVisualisation() {
    // filter all the data for display year
    filteredDataset = dataset.filter(data => {
        if (data.year == displayYear) {
            return data.year;
        }
    });

    xMin = d3.min(dataset.map(data => +data.gdp));
    xMax = d3.max(dataset.map(data => +data.gdp));
    yMin = d3.min(dataset.map(data => +data.CompIndex));
    yMax = d3.max(dataset.map(data => +data.CompIndex));


    // color = d3.scaleOrdinal(d3.schemeCategory10);
    // xScale.domain(d3.extent(filteredDataset, function (d) {
    //     return (d.gdp / 50);
    // })).nice();
    color = d3.scaleOrdinal(d3.schemeCategory10);
    xScale.domain([xMin, xMax / 200]).nice();
    // yScale.domain(d3.extent(filteredDataset, function (d) {
    //     return d.CompIndex;
    // })).nice();
    yScale.domain([yMin, yMax]).nice();

    radius.domain(d3.extent(filteredDataset, function (d) {
        return (d.population);
    })).nice();

    svg.select("#x-axis").call(xAxis);
    svg.select("#y-axis").call(yAxis);

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
}