function generateVisualisation() {

    // filter all the data to only include data for display year
    const filteredDataset = dataset.filter(data => data.year == displayYear);

    let transition = d3.transition().duration(600);

    // join
    bubble = svg.select(".bubble_group")
        .selectAll("circle")
        .data(filteredDataset);

    // exit
    // bubble.exit().remove();

    // update
    bubble.transition(transition)
        .attr("id", data => "bubble_" + data.Country)
        .style("stroke", "black")
        .style("stroke-opacity", .4)
        .style('fill', data => color(data.region))
        .style('fill-opacity', (trace || staticTrace) ? 0.3 : 1)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
        .attr('r', data => radius(data.population));

    // enter
    bubble.enter()
        .append("circle")
        .style('fill', data => color(data.region))
        .style('fill-opacity', (trace || staticTrace) ? 0.3 : 1)
        .style("stroke", "black")
        .style("stroke-opacity", .4)
        .attr("id", data => "bubble_" + data.Country)
        .attr("cx", data => xScale(data.gdp))
        .attr("cy", data => yScale(data.CompIndex))
        .attr('r', data => radius(data.population))
        .on('mouseover', data => {
            // display data in detail for a country on mover hover
            dataLine.style('display', null);
            displayDataOnFocus(data);
        })
        .on('mouseout', () => {
            // hide the focus line and tip on mouse out
            dataLine.style('display', 'none');
            tip.style("opacity", 0);
        })
        // .append('title')
        // .text(data => data.Country)
        .transition(transition);

    // move the slider for each year for play and trace
    d3.select("#yearSlider").property("value", displayYear);
    d3.select("#yearText").text(displayYear);
}