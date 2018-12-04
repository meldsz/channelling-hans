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
                traceDataVisualisation();
                generateVisualisation();
            } else {
                bubble.exit().remove();
                d3.select('#trace').remove();
                generateVisualisation();
            }

        }, 500);
        bubble.exit().remove();
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
        if (d3.select("#play").property("value") === "Play") {
            bubble.style("fill-opacity", 0.3);
            clearInterval(intervalId);
            displayYearlyData();
            d3.select('#trace').remove();
        }
    } else {
        alert("select country");
        trace = false;
    }

}

function displayDataOnFocus(countryData) {
    const cx = xScale(+countryData.gdp / 5);
    const cy = yScale(+countryData.CompIndex);

    // set the start and end for vertical line
    verticalLine.attr("x1", cx)
        .attr("y1", cy)
        .attr("x2", cx)
        .attr("y2", height);

    // set the start and end for horizontal line
    horizontalLine.attr("x1", 0)
        .attr("y1", cy)
        .attr("x2", cx)
        .attr("y2", cy);

    tip.style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + 20 + "px")
        .style("opacity", 1.0)

    tipTitle.html(countryData.Country.bold() + " " + countryData.year.bold())

    tipContent.html(
        "GDP: " + countryData.gdp + "<br>" +
        "GCI: " + countryData.CompIndex + "<br>" +
        "Population: " + countryData.population + "<br>"
    )
}