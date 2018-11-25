function generateVisualisation() {
    // filter all the data for display year
    filteredDataset = dataset.filter(data => {
        if (data.year == displayYear) {
            return data.year;
        }
    });

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    xScale.domain(d3.extent(filteredDataset, function (d) {
        return (d.gdp / 50);
    })).nice();

    yScale.domain(d3.extent(filteredDataset, function (d) {
        return d.CompIndex;
    })).nice();

    radius.domain(d3.extent(filteredDataset, function (d) {
        return (d.population / 10);
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
        });
    bubble.append('title')
        .attr('x', function (d) {
            return radius(d.population);
        })
        .text(function (d) {
            return d.Country;
        });
}