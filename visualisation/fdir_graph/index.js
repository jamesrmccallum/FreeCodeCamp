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
function JSONPromise(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            d3.json(url, (error, data) => error ? rej(error) : res(data));
        });
    });
}
let graphRoot = d3.select('#fdirgraph');
let svg = graphRoot.append("svg")
    .attr("width", 1100)
    .attr("height", 700);
let width = +svg.attr("width");
let height = +svg.attr("height");
let flagWidth = 16;
let flagHeight = 10;
let radius = 5;
// Set up a d3 force simulation

const forceX = d3.forceX(width / 2).strength(0.05)
const forceY = d3.forceY(height / 2).strength(0.05)

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.index.toString()).strength(.6))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', forceX)
    .force('y', forceY);
    
function dragstarted(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function dragended(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        let graph = yield JSONPromise('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json');
        graph.nodes[0].fixed = true;
        graph.nodes[0].x = width / 2;
        graph.nodes[0].y = height / 2;
        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", d => Math.sqrt(4));
        const node = graphRoot.select('.flagbox').selectAll('.node')
            .data(graph.nodes)
            .enter()
            .append('img')
            .attr('title', d => d.country)
            .attr('class', d => `flag flag-${d.code}`)
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked)
            .force("link")
            .links(graph.links);
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .style("left", d => d.x + 'px')
                .style("top", d => d.y + 'px');
        }
    }
    catch (e) {
        console.error(e);
    }
}))();
