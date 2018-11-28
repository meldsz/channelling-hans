function generateVisualisation() {

    // filter all the data to only include data for display year
    const filteredDataset = dataset.filter(data => data.year == displayYear);

    color = d3.scaleOrdinal(d3.schemeCategory10);

    const bubble = svg.select(".bubble_group")
        .selectAll("circle")
        .data(filteredDataset, data => data.population)

    bubble
        .attr("id", data => "bubble_" + data.Country)
        .transition()
        .duration(1000)
        .ease(d3.easeQuad)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
        .attr('r', data => radius(data.population))
        .style('fill', data => color(data.region))
        .style("stroke", "black")
        .style("stroke-opacity", .4)

    bubble.enter()
        .append("circle")
        .style('fill', data => color(data.region))
        .style("stroke", "black")
        .style("stroke-opacity", .4)
        .attr("id", data => "bubble_" + data.Country)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
        .attr('r', data => radius(data.population))
    // .transition()
    // .delay(1000);

    bubble.append('title')
        .transition()
        .duration(1000)
        .attr('x', data => radius(data.population))
        .text(data => data.Country);

    bubble.exit().remove();
    d3.select("#yearText").text(displayYear);
}