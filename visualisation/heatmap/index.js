"use strict";
///<reference path="./node_modules/@types/d3/index.d.ts"/> 
var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var colors = ['#1e90ff', '#71a4fa', '#9dbaf4', '#c1d1ee', '#e1e7e7', '#ffffe0', '#efd0af', '#daa180', '#c37353', '#a8442a', '#8b0000'];
var svg = d3.select("svg"), margin = { top: 20, right: 20, bottom: 80, left: 70 }, width = +svg.attr("width") - margin.left - margin.right, height = +svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g")
    .attr("class", "chart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', render);
function render(error, data) {
    var chartdata = data.monthlyVariance.map(function (a) {
        return {
            year: a.year,
            month: a.month,
            monthName: months[a.month - 1],
            actual: parseFloat((data.baseTemperature + a.variance).toFixed(3)),
            variance: parseFloat(a.variance.toFixed(3))
        };
    });
    var bands = [];
    for (var i = 0; i < colors.length; i++) {
        bands.push(i * 1.157);
    }
    var xVals = d3.map(chartdata, function (d) { return d.year.toString(); }).keys();
    var yVals = d3.map(chartdata, function (d) { return d.monthName; }).keys();
    var cellHeight = (height) / yVals.length;
    var cellWidth = (width - margin.left - margin.right) / xVals.length;
    var xScale = d3.scaleBand()
        .domain(xVals)
        .range([0, width]);
    var yScale = d3.scaleBand()
        .domain(yVals)
        .range([height, 0]);
    var colorScale = d3.scaleThreshold()
        .domain(bands)
        .range(colors);
    var xAxis = d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter(function (d, i) { return !(d % 10); }));
    var yAxis = d3.axisLeft(yScale)
        .ticks(12);
    // x-axis
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(90)")
        .attr("y", -6)
        .attr("x", margin.top + 10)
        .style("text-anchor", "end");
    // y-axis
    g.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Protein (g)");
    var cells = g.selectAll('rect')
        .data(chartdata)
        .enter().append('rect')
        .attr('class', 'cell')
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr('y', function (d) { return yScale(d.monthName); })
        .attr('x', function (d) { return xScale(d.year); })
        .attr('fill', function (d) { return colorScale(d.actual); });
    cells.on("mouseover", function (d) {
        var strTooltip = d.year + ", " + (d.monthName) + "<br/>\n                              Actual: " + d.actual + "&#x2103 <br/>\n                              Variance: " + d.variance + "&#x2103";
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(strTooltip)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
    // Add a legend for the color values.
    var legend = svg.selectAll(".legend")
        .data(bands.reverse())
        .enter()
        .append("g")
        .attr('class', 'legend')
        .attr('transform', function (d, i) { return "translate(" + (width - (i * 40)) + "," + (height + margin.top + 40) + ")"; });
    legend.append("rect")
        .attr('width', 40)
        .attr('height', 20)
        .attr('fill', function (d) { return colorScale(d); });
    legend.append("text")
        .attr('class', 'label')
        .attr('font-size', 10)
        .attr('x', 0)
        .attr('y', 30)
        .text(function (d) { return d.toFixed(1); });
}
