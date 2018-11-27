function initialSvgSetup() {
    // Define Margins, height and width for the svg canvas
    let margin = {top: 30, right: 50, bottom: 100, left: 100};
    width = 1000 - margin.left - margin.right;
    height = 700 - margin.top - margin.bottom;

    minYear = d3.min(dataset.map(data => +data.year));
    maxYear = d3.max(dataset.map(data => +data.year));
    displayYear = minYear;

    // calculate minimum and maximum values for GDP and CompIndex for the axes
    xMin = d3.min(dataset.map(data => +data.gdp));
    xMax = d3.max(dataset.map(data => +data.gdp));
    yMin = d3.min(dataset.map(data => +data.CompIndex));
    yMax = d3.max(dataset.map(data => +data.CompIndex));

    svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // define scales and axes
    xScale = d3.scaleLinear()
        .domain([xMin, xMax / 100]).nice()
        // .domain([0].concat([1000, 5000, 10000, 20000, 50000]).concat([xMax])).nice()
        .range([0, width]);
    yScale = d3.scaleLinear()
        .domain([yMin, yMax]).nice()
        .range([height, 0]);
    xAxis = d3.axisBottom()
        .scale(xScale).ticks(5);
    yAxis = d3.axisLeft()
        .scale(yScale);
    // square root scale.
    radius = d3.scaleSqrt()
        .domain([0, 1e7]).nice()
        // .domain(d3.extent(filteredDataset, data => data.population)).nice();
        .range([2, 5]);

    // Add Axes Titles
    svg.append("text")
        .attr("x", -40)
        .attr("y", 450)
        .style("font-family", "Helvetica")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90 -40,450)")
        .text("Global Competitive Index");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 630)
        .style("font-family", "Helvetica")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .text("GDP");

    svg.append("text")
        .attr("x", 40)
        .attr("y", 100)
        .style("font-family", "Helvetica")
        .style("font-size", "100px")
        .style("font-weight", "bold")
        .style("fill", "lightgrey")
        .attr("id", "yearText")
        .attr("transform", "scale(3)")
        .text(displayYear);

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('id', 'x-axis');

    svg.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('id', 'y-axis');
}
