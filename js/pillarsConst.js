function createPillar(year) {
    // Define Margins, height and width for the svg canvas
    let margin = { top: 30, right: 20, bottom: 200, left: 100 };
    pillarWidth = 1000 - margin.left - margin.right;
    pillarHeight = 570 - margin.top - margin.bottom;

    // calculate minimum and maximum values for pillars for the axes
    const yMin = d3.min(dataset.map(data => d3.min(data.pillars)));
    const yMax = d3.max(dataset.map(data => +d3.max(data.pillars)));

    // add custom values to x scale
    const xDomainValues = ["1st_pillar_Institutions", "2nd_pillar_Infrastructure", "3rd_pillar_Macroeconomic_environment", "4th_pillar_Health_and_primary_education", "5th_pillar_Higher_education_and_training", "6th_pillar_Goods_market_efficiency", "7th_pillar_Labor_market_efficiency", "8th_pillar_Financial_market_development", "9th_pillar_Technological_readiness", "10th_pillar_Market_size", "11th_pillar_Business_sophistication_", "12th_pillar_Innovation"];
    const xTickValues = ["", "Institutions", "Infrastructure", "Macroeconomic Environment", "Health and Primary education", "Higher education and training", "Goods market efficiency", "Labor market efficiency", "Financial market development", "Technological readiness", "Market size", "Business sophistication", "Innovation"];
    const xRange = [0, 70, 140, 210, 280, 350, 420, 490, 560, 630, 700, 770, 840, pillarWidth];
    // define scales and axes
    pillarXScale = d3.scaleOrdinal()
        .range(xRange);
    pillarYScale = d3.scaleLinear()
        .domain([yMin, yMax]).nice()
        .rangeRound([pillarHeight, 0]);
    const pillarXAxis = d3.axisBottom()
        .scale(pillarXScale)
        .tickValues(xTickValues);
    const pillarYAxis = d3.axisLeft()
        .scale(pillarYScale);
    const rightAxis = d3.axisRight(d3.scaleLinear().range([pillarHeight, 0])).ticks(0);
    const topAxis = d3.axisTop(d3.scaleLinear().range([0, pillarWidth])).ticks(0);

    pillarSvg = d3.select('body')
        .append('svg')
        .attr("class", "pillar-svg")
        .attr('width', pillarWidth + margin.left + margin.right)
        .attr('height', pillarHeight + margin.top + margin.bottom)
        .append('g')
        .attr('class', 'pillar-chart')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // add axes titles
    pillarSvg.append("text")
        .attr("x", "25vw")
        .attr("y", -5)
        .style("font-family", "Helvetica")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text(pillarCountries[0] + " , " + pillarCountries[1] + " " + year);

    pillarSvg.append("text")
        .attr("x", 160)
        .attr("y", 450)
        .style("font-family", "Helvetica")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90 -40,450)")
        .text("Pillars Value");

    pillarSvg.append("text")
        .attr("x", pillarWidth / 3.5)
        .attr("y", 520)
        .style("font-family", "Helvetica")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .text("Pillars of Global Competitiveness Index");

    // create axes
    pillarSvg.append('g')
        .attr('transform', 'translate(0,' + pillarHeight + ')')
        .attr('id', 'x-axis');

    pillarSvg.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('id', 'y-axis');

    pillarSvg.append("g")
        .attr("class", "axis")
        .call(topAxis);

    pillarSvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (pillarWidth) + ",0)")
        .call(rightAxis);

    // create the horizontal grid lines
    pillarSvg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(pillarYScale)
            .tickSize(-pillarWidth)
            .tickFormat(""));

    // call axes
    pillarSvg.select("#x-axis").call(pillarXAxis).selectAll("text").attr("transform", "rotate(90)").attr("text-anchor", "start").attr("y", "0").attr("x", "1vw");
    pillarSvg.select("#y-axis").call(pillarYAxis);

    //generate bars
    var pillarDataset = [];
    for (i = 0; i < pillarCountries.length; i++) {
        pillarDataset.push(dataset.filter(data => pillarCountries[i] == data.Country).filter(data => data.year == year)[0]);
    }
    if (pillarDataset.length > 2) {
        alert("Cannot Select more than 2 countries");
    }
    for (var j = 0; j < 2; j++) {
        for (i = 0; i < xDomainValues.length; i++) {
            d3.select(".pillar-chart").append("rect")
                .attr("x", (+xRange[i + 1] - (j + 1) * 20))
                .attr("y", function () { return pillarYScale(pillarDataset[j].pillars[i]) })
                .attr("width", 20)
                .attr("height", function () { return +(pillarHeight - pillarYScale(+pillarDataset[j].pillars[i])) })
                .style("fill", color(pillarDataset[j].region))
                .style("stroke", "black");
        }
    }

}

