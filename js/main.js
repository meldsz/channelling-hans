//Data
var data = JSON.parse(localStorage.getItem('Data'));
console.log(data[0].region);
var margin = {top: 30, right: 50, bottom: 40, left:40};
	var width = 1500 - margin.left - margin.right;
	var height = 700 - margin.top - margin.bottom;
	var svg = d3.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	var xScale = d3.scaleLinear()
		.range([0, width]);
	var yScale = d3.scaleLinear()
		.range([height, 0]);
	// square root scale.
	var radius = d3.scaleSqrt()
		.range([2,5]);
	var xAxis = d3.axisBottom()
		.scale(xScale);
	var yAxis = d3.axisLeft()
		.scale(yScale);
	var color = d3.scaleOrdinal(d3.schemeCategory10);
	xScale.domain(d3.extent(data, function(d){
		return (d.gdp/500);
	})).nice();

	yScale.domain(d3.extent(data, function(d){
		return d.CompIndex;
    })).nice();
	radius.domain(d3.extent(data, function(d){
		return (d.population/10);
	})).nice();
	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('class', 'x axis')
		.call(xAxis);
	svg.append('g')
		.attr('transform', 'translate(0,0)')
		.attr('class', 'y axis')
		.call(yAxis);
	var bubble = svg.selectAll('#bubble_chart')
		.data(data)
		.enter().append('circle')
		.attr('id', 'bubble_chart')
		.attr('cx', function(d){return xScale(d.gdp);})
		.attr('cy', function(d){ return yScale(d.CompIndex); })
			.attr('r', function(d){ return radius(d.population); })
			.style('fill', function(d){ return color(d.region); });
		bubble.append('title')
			.attr('x', function(d){ return radius(d.population); })
			.text(function(d){
				return d.Country;
			});
		svg.append('text')
			.attr('x', 10)
			.attr('y', 10)
			.attr('class', 'label')
			.text('Global Competitive Index');
		svg.append('text')
			.attr('x', width)
			.attr('y', height - 10)
			.attr('text-anchor', 'end')
			.attr('class', 'label')
            .text('GDP');
		var legend = svg.selectAll('legend')
			.data(color.domain())
			.enter().append('g')
			.attr('class', 'legend')
            .attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });   
		legend.append('rect')
			.attr('x', width)
			.attr('width', 18)
			.attr('height', 18)
			.style('fill', color);
		legend.append('text')
			.attr('x', width - 6)
			.attr('y', 9)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d){ return d; });