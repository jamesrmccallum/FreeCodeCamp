"use strict";
///<reference path="./node_modules/@types/d3/index.d.ts"/> 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let svg = d3.select("svg");
let margin = { top: 20, right: 20, bottom: 80, left: 70 };
let width = +svg.attr("width") - margin.left - margin.right;
let height = +svg.attr("height") - margin.top - margin.bottom;
let colors = ['#008080', '#449e87', '#6fbd92', '#9edba4', '#d8f6c4', '#ffe1d2', '#fea0ac', '#e9647f', '#c32b48', '#8b0000'];
let projection = d3.geoMercator()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale(200);
var radius = d3.scaleSqrt()
    .domain([0, 23000000])
    .range([0, 40]);
let path = d3.geoPath()
    .projection(projection);
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
function zoomed() {
    svg.attr("transform", d3.event.transform);
}
var zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);
svg.call(zoom);
render();
function render() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let geo = yield JSONPromise("https://raw.githubusercontent.com/jamesrmccallum/resources/master/custom.geo.json");
            let rites = yield JSONPromise("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json");
            for (let i = 0; i < rites.features.length; i++) {
                let a = rites.features[i];
                let y = new Date(a.properties.year);
                a.properties['fullYear'] = y.getFullYear();
                a.properties['month'] = y.getMonth();
            }
            ;
            rites.features.sort((a, b) => a.properties.mass - b.properties.mass);
            let bands = [0, 1811, 1836, 1861, 1886, 1911, 1936, 1961, 1986, 2011];
            var colorScale = d3.scaleThreshold()
                .domain(bands)
                .range(colors);
            svg.selectAll(".country")
                .data(geo.features)
                .enter().append("path")
                .attr("class", "country")
                .attr("d", path);
            var meteors = svg.selectAll(".meteor")
                .data(rites.features)
                .enter().append('circle')
                .attr('class', 'meteor')
                .attr('fill', d => colorScale(d.properties.fullYear))
                .attr('r', d => radius(d.properties.mass))
                .attr("transform", d => "translate(" + path.centroid(d) + ")");
            meteors.on("mouseover", (d) => {
                let strTooltip = `Name: ${d.properties.name}<br/>
                              Mass: ${d.properties.mass}<br/>
                              Fell: ${new Date(d.properties.year).toLocaleDateString()}`;
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(strTooltip)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
                .on("mouseout", d => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
function JSONPromise(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            d3.json(url, (error, data) => error ? rej(error) : res(data));
        });
    });
}
