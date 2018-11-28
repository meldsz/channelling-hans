function generateVisualisation() {

    // filter all the data to only include data for display year
    const filteredDataset = dataset.filter(data => data.year == displayYear);

    let transition = d3.transition().duration(600);

    // join
    const bubble = svg.select(".bubble_group")
        .selectAll("circle")
        .data(filteredDataset);

    // exit
    bubble.exit().remove();

    // update
    bubble.transition(transition)
        .attr("id", data => "bubble_" + data.Country)
        .style("stroke", "black")
        .style("stroke-opacity", .4)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
        .attr('r', data => radius(data.population))
        .style('fill', data => color(data.region));

    // enter
    bubble.enter()
        .append("circle")
        .style('fill', data => color(data.region))
        .style("stroke", "black")
        .style("stroke-opacity", .4)
        .attr("id", data => "bubble_" + data.Country)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
        .transition(transition)
        .attr('r', data => radius(data.population));

    bubble.append('title')
        .attr('x', data => radius(data.population))
        .transition()
        .text(data => data.Country);


    d3.select("#yearText").text(displayYear);
}