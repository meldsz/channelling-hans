function initialSvgSetup() {
    // Define Margins, height and width for the svg canvas
    let margin = {top: 30, right: 50, bottom: 100, left: 100};
    width = 1000 - margin.left - margin.right;
    height = 700 - margin.top - margin.bottom;

    // calculate minimum and maximum values for GDP for the axes
    xMin = d3.min(dataset.map(data => +data.gdp));
    xMax = d3.max(dataset.map(data => +data.gdp));

    const roundedXMax = Math.round((xMax / 5) / 1000) * 1000;

    // add custom values to x scale
    xDomainValues = [xMin, 500, 1000, 2000, 5000, 10000, roundedXMax];
    xTickValues = [0, 500, 1000, 2000, 5000, 10000, roundedXMax];

    // define scales and axes
    xScale = d3.scaleLinear()
        .domain(xDomainValues).nice()
        .range([0, 150, 250, 450, 650, 750, width]);
    yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, data => data.CompIndex)).nice()
        .range([height, 0]);
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickValues(xTickValues);
    const yAxis = d3.axisLeft()
        .scale(yScale);
    const rightAxis = d3.axisRight(d3.scaleLinear().range([height, 0])).ticks(0);
    const topAxis = d3.axisTop(d3.scaleLinear().range([0, width])).ticks(0);

    color = d3.scaleOrdinal(d3.schemeCategory10);

    // square root scale.
    radius = d3.scaleSqrt()
        .domain([0, 1e7]).nice()
        .range([2, 5]);

    svg = d3.select('body')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('class', 'svg_chart')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // add axes titles
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

    // display year in the chart background
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

    // create axes
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('id', 'x-axis');

    svg.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('id', 'y-axis');

    svg.append("g")
        .attr("class", "axis")
        .call(topAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width) + ",0)")
        .call(rightAxis);

    // create the horizontal grid lines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)
            .tickValues(xTickValues)
            .tickSize(-height)
            .tickFormat(""));

    // create the vertical grid lines
    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(""));


    // create a group to include all the bubbles
    d3.select('.svg_chart').append('g').attr('class', 'bubble_group');

    // call axes
    svg.select("#x-axis").call(xAxis);
    svg.select("#y-axis").call(yAxis);
}

function createSlider() {
    // create a slider and display the data according to the picked year
    slider = d3.select("body")
        .append("div")
        .append("input")
        .attr("min", minYear)
        .attr("max", maxYear)
        .property("value", minYear)
        .attr("type", "range")
        .attr("id", "yearSlider")
        .on("input", () => {
            displayYear = d3.select("#yearSlider").property("value");
            generateVisualisation();
        })
}