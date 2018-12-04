function displayYearlyData() {
    if (d3.select("#play").property("value") === "Play") {
        d3.select("#play").property("value", "Stop");
        intervalId = setInterval(() => {
            displayYear++;
            if (displayYear > maxYear) {
                bubble.exit().remove();
                d3.select('#trace').remove();
                displayYear = minYear;
            }
            if (trace) {
                generateVisualisation();
                traceDataVisualisation();
            } else {
                bubble.exit().remove();
                d3.select('#trace').remove();
                generateVisualisation();
            }

        }, 500)
        bubble.exit().remove()
    } else {
        d3.select("#play").property("value", "Play");
        trace = false;
        bubble.style("fill-opacity", 1);
        bubble.exit().remove();
        d3.select('#trace').remove();
        clearInterval(intervalId);
    }

}

function traceDataVisualisation() {
    // control to trace journey of selected country
    const filteredTraceDataset = dataset.filter(data => selectedCountry == data.Country)
        .filter(data => data.year == displayYear)[0];

    d3.select(".bubble_group")
        .append("circle")
        .attr("id", "trace")
        .style('fill', color(filteredTraceDataset.region))
        .style("stroke", "black")
        .style("stroke-opacity", .4)
        .attr("cx", xScale(filteredTraceDataset.gdp / 5))
        .attr("cy", yScale(filteredTraceDataset.CompIndex))
        .attr('r', radius(filteredTraceDataset.population));
}

function traceData() {
    if (selectedCountry) {

        trace = true;
        bubble.style("fill-opacity", 0.3);
        clearInterval(intervalId)
        displayYearlyData();
        traceDataVisualisation();
        d3.select('#trace').remove()
    } else {
        alert("select country")
        trace = false;
    }

}