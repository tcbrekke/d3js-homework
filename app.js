var svgWidth = 768;
var svgHeight = 540;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#svg-area").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  // .attr("viewBox", 0, 0, 50, 75);

// shift everything over by the margins

d3.csv("stateHealthFactors.csv").then(function(rawData) {
	console.log(rawData);

	// xValues.push(+rawData.belowPovertyLevel);
	// yValues.push(+rawData.diabetesYes);
	// labels.push(rawData.state);

	rawData.forEach(function(entry) {
		entry.belowPovertyLevel = +entry.belowPovertyLevel;
		entry.diabetesYes = +entry.diabetesYes;

	var yLinearScale = d3.scaleLinear()
		.domain([d3.min(rawData, function(entry) {return +entry.diabetesYes}) - 1, d3.max(rawData, function(entry) {return +entry.diabetesYes}) + 1])
		.range([chartHeight, 0]);

	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(rawData, function(entry) {return +entry.belowPovertyLevel}) - 1, d3.max(rawData, function(entry) {return +entry.belowPovertyLevel}) + 1])
		.range([0, chartWidth]);

	var yAxis = d3.axisLeft(yLinearScale);
	var xAxis = d3.axisBottom(xLinearScale);

	var chartGroup = svg.append("g")
  		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	chartGroup.append("g")
  		.attr("transform", `translate(0, ${chartHeight})`)
  		.call(xAxis);

  	chartGroup.append("g")
  		.call(yAxis);

  	var addCircles = chartGroup.selectAll("circle")
  		.data(rawData)
  		.enter()
  		.append("circle")
  		.attr("cx", entry => xLinearScale(entry.belowPovertyLevel))
  		.attr("cy", entry => yLinearScale(entry.diabetesYes))
  		.attr("r", 4)
  		.attr("fill", "purple")
  		.attr("opacity", ".5");

  	chartGroup.append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 0 - margin.left + 0)
	    .attr("x", 0 - (svgHeight / 1.35))
	    .attr("dy", "1em")
	    .attr("class", "axisText")
	    .text("Percentage of Population Diagnosed with Diabetes");

	chartGroup.append("text")
    	.attr("transform", `translate(${svgWidth / 2}, ${svgHeight + margin.top + 30})`)
    	.attr("class", "axisText")
    	.text("Population Living Below Poverty Line");

	});
});


// dataset = d3.csv("stateHealthFactors.csv");

// xValues = dataset.map(function(data) {
// 	return +data.belowPovertyLevel;
// });

// console.log(xValues);