function displayYearlyData() {
    if (d3.select("#play").property("value") === "Play") {
        staticTrace = staticTrace ? !staticTrace : false;
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

function staticTraceData() {
    if (selectedCountry) {
        displayYear = staticTrace ? displayYear : maxYear;
        staticTrace = true;
        generateVisualisation();
        d3.selectAll('#trace').remove();
        // control to display static trace journey of selected country
        const filteredTraceDataset = dataset.filter(data => selectedCountry == data.Country).filter(data => data.year <= displayYear);
        d3.select(".bubble_group")
            .selectAll('rect')
            .data(filteredTraceDataset)
            .enter()
            .append("circle")
            .attr("id", "trace")
            .style('fill', data => color(data.region))
            .style("stroke", "black")
            .style("fill-opacity", 1)
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
            });
    } else {
        staticTrace = false;
        alert('select country')
    }


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
        .style("opacity", 1);

    // display country and year as the title in a tip
    tipTitle.html(countryData.Country.bold() + " " + countryData.year.bold());

    // display data in detail
    tipContent.html(`GDP: ${countryData.gdp} <br> GCI: 
    ${countryData.CompIndex} <br> Population: ${countryData.population} <br>`);
}