"use strict";
///<reference path="./node_modules/@types/d3/index.d.ts"/> 
var svg = d3.select("svg"), margin = { top: 20, right: 20, bottom: 30, left: 40 }, width = +svg.attr("width") - margin.left - margin.right, height = +svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g")
    .attr("class", "chart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', render);
function render(error, data) {
    if (error)
        throw error;
    var fastest = d3.min(data, function (d) { return d.Seconds; });
    data.forEach(function (e) {
        e['lag'] = e.Seconds - fastest;
    });
    var maxLag = d3.max(data, function (d) { return d.lag; });
    var x = d3.scaleLinear().rangeRound([width, 0]);
    var y = d3.scaleLinear().rangeRound([0, height]);
    var xExtent = d3.extent(data, function (d) { return d.lag; });
    var yExtent = d3.extent(data, function (d) { return d.Place; });
    function getColour(d) {
        return d.Doping == "" ? '#72a0e5' : '#ff3333';
    }
    x.domain(xExtent);
    y.domain(yExtent);
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);
    // X label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width - 50)
        .attr("y", height)
        .text("Seconds behind fastest time");
    // Y Label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", margin.left + 10)
        .attr("x", -margin.top)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Rank");
    // x-axis
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Calories");
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
    // draw dots
    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5.5)
        .attr("cx", function (d) { return x(d.lag); })
        .attr("cy", function (d) { return y(d.Place); })
        .style("fill", function (d) { return getColour(d); })
        .on("mouseover", function (d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html("<p> " + d.Name + ", " + d.Year + " </p>\n                          <p> Time: " + d.Time + "</P>\n                          <p> " + d.Doping + " </p>")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
    svg.append("text")
        .attr("x", (width / 2))
        .attr("class", "label title")
        .attr("y", 0 + margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("35 Fastest times up Alpe d'Huez");
}
