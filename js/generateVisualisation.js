function generateVisualisation() {

    // filter all the data to only include data for display year
    const filteredDataset = dataset.filter(data => {
        if (data.year == displayYear) {
            return data.year;
        }
    });

    // call axes
    svg.select("#x-axis").call(xAxis);
    svg.select("#y-axis").call(yAxis);

    color = d3.scaleOrdinal(d3.schemeCategory10);

    const bubble = svg.selectAll('#bubbles')
        .data(filteredDataset)
        .enter().append('circle')
        .attr('cx', data => xScale(data.gdp))
        .attr('cy', data => yScale(data.CompIndex))
        .attr('r', data => radius(data.population))
        .style('fill', data => color(data.region))
        .style("stroke", "black")
        .style("stroke-opacity", .4);

    bubble.append('title')
        .attr('x', data => radius(data.population))
        .text(data => data.Country);

    bubble.exit().remove();

    d3.select("#yearText").text(displayYear);
}