function initialSvgSetup() {
    // Define Margins, height and width for the svg canvas
    margin = {top: 30, right: 20, bottom: 100, left: 100};
    width = 1000 - margin.left - margin.right;
    height = 570 - margin.top - margin.bottom;

    // calculate minimum and maximum values for GDP for the axes
    const xMin = d3.min(dataset.map(data => +data.gdp));
    const xMax = d3.max(dataset.map(data => +data.gdp));

    const roundedXMax = Math.round((xMax) / 10000) * 10000 + 20000;
    // const roundedXMax = Math.round((xMax / 5) / 1000) * 1000;

    // add custom values to x scale
    const xDomainValues = [xMin, 2000, 5000, 10000, 20000, 40000, 80000, roundedXMax];
    const xTickValues = [0, 2000, 5000, 10000, 20000, 40000, 80000, roundedXMax];

    // define scales and axes
    xScale = d3.scaleLinear()
        .domain(xDomainValues).nice()
        .range([0, 120, 250, 375, 500, 675, 750, width]);
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

    //svg for legend
    legend_svg = d3.select('body')
        .append('svg')
        .attr('width', "20vw")
        .attr('height', height + margin.top + margin.bottom)

    // add axes titles
    svg.append("text")
        .attr("x", 40)
        .attr("y", 450)
        .style("font-family", "Helvetica")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90 -40,450)")
        .text("Global Competitive Index");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 490)
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

function createControls() {
// create a slider and display the data according to the picked year
    slider = d3.select("body")
        .append("div")
        .attr("class", "slider-container")
        .attr("style", "padding-left:50px");

    // play button for the animation and for the slider
    slider.append("input")
        .attr('type', 'button')
        .attr('class', 'btn btn-primary btn-md')
        .property("value", 'Play')
        .attr("id", 'play')
        .on("click", () => {
            displayYearlyData();
        });

    // display minimum year for the slider
    d3.select(".slider-container")
        .append("span")
        .attr("style", "padding-left:20px")
        .html(minYear);

    // add a slider
    slider.append("input")
        .attr("min", minYear)
        .attr("max", maxYear)
        .property("value", minYear)
        .attr("type", "range")
        .attr("id", "yearSlider")
        .on("input", () => {
            displayYear = d3.select("#yearSlider").property("value");
            staticTrace ? staticTraceData() : generateVisualisation();
            if (selectedCountry != "") {
                d3.select(".pillar-svg").remove();
                createPillar(displayYear);
            }
        });

    // display maximum year for the slider
    d3.select(".slider-container")
        .append("span")
        .html(maxYear);

    // create a dropdown to select countries for the trace

    const countryList = dataset.filter(data => displayYear == data.year).filter(data => data.Country);
    // countryList.unshift({Country: '---select country---'});

    const dropdown = d3.select("body")
        .append("div")
        .attr('class', 'select-container')
        .append("select")
        .attr("id", "countries")
        .attr("multiple", "multiple")
        .on('change', () => {
            selectedCountry = d3.select('select').property('value');
            pillarCountries.push(d3.select('select').property('value'));
            d3.select(".pillar-svg").remove();
            createPillar(displayYear);
        })
        .selectAll("option")
        .data(countryList)

    dropdown.enter()
        .append("option", data => data.Country)
        .attr("value", data => data.Country)
        .attr("label", data => data.Country);

    const traceContainer = d3.select('body').append('div')
        .attr('class', 'trace-container');

    traceContainer.append("input")
        .attr('type', 'button')
        .attr('class', 'btn btn-primary btn-md')
        .property("value", 'Trace')
        .attr("id", 'static-trace-button')
        .attr('title', 'click to view static trace of the selected country')
        .on("click", () => {
            staticTraceData();
        });

    traceContainer.append("input")
        .attr('type', 'button')
        .attr('class', 'btn btn-primary btn-md')
        .property("value", 'Trace Play')
        .attr("id", 'trace-button')
        .attr('title', 'click to view animated trace of the selected country')
        .on("click", () => {
            traceData();
        })
    // .attr("label", data => data.Country);
}

function displayLegend() {
    //legend to distinguish regions by color
    const legend = legend_svg.selectAll('legend')
        .data(color.domain())
        .enter().append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            return 'translate(0,' + i * 20 + ')';
        });

    legend.append('rect')
        .attr('x', 10)
        .attr('y', 20)
        .attr('width', 18)
        .attr('height', 18)
        .style('fill', color);

    legend.append('text')
        .attr('x', 30)
        .attr('y', 30)
        .attr('dy', '.35em')
        // .style('text-anchor', 'end')
        .text(function (d) {
            return d;
        });
}

function initializeDataOnFocus() {
    dataLine = d3.select('.svg_chart')
        .append('g')
        .attr('id', 'display-data')
        .style("display", "none");

    verticalLine = dataLine.append('line').attr('class', 'focus-line');
    horizontalLine = dataLine.append('line').attr('class', 'focus-line');

    // create a tip to display data in detail for country
    tip = d3.select('body')
        .append("div")
        .attr("class", "tip");

    tipTitle = tip.append("div")
        .attr("class", "tip-title");

    tipContent = tip.append("div").append("div")
        .attr("class", "tip-content");
}