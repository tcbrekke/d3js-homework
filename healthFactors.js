var xValues;
var yValues;

d3.csv("stateHealthFactors.csv", function(rawData) {
	console.log(rawData);

	xValues = rawData[0].map(function(data) {
		return +data.belowPovertyLevel;
	});

	console.log(xValues);
});

