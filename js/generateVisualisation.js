function generateVisualisation() {

    // filter all the data to only include data for display year
    const filteredDataset = dataset.filter(data => data.year == displayYear);

    // call axes
    svg.select("#x-axis").call(xAxis);
    svg.select("#y-axis").call(yAxis);

    color = d3.scaleOrdinal(d3.schemeCategory10);

    const bubble = svg.select(".bubble_group")
        .selectAll("circle")
        .data(filteredDataset, data => data.population)

    bubble.enter()
        .append("circle")
        .attr("id", data => "bubble_" + data.Country)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
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