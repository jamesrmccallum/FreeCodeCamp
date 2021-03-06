///<reference path="./node_modules/@types/d3/index.d.ts"/> 

async function JSONPromise<T>(url: string): Promise<T> {
    return new Promise<T>((res, rej) => {
        d3.json(url, (error, data: T) => error ? rej(error) : res(data));
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

const forceX = d3.forceX(width / 2).strength(0.05)
const forceY = d3.forceY(height / 2).strength(0.05)

// Set up a d3 force simulation
var simulation = d3.forceSimulation<Types.Node,Types.Link>()
    .force("link", d3.forceLink<Types.Node, Types.Link>().id(d =>d.index!.toString()).strength(.6))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', forceX)
    .force('y', forceY);

function dragstarted(d: Types.Node) {
    if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d: Types.Node) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d: Types.Node) {
    if (!d3.event.active) { simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
}

(async () => {
    try {

        let graph = await JSONPromise<Types.RootObject>('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json');

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
            .call(d3.drag<HTMLImageElement, Types.Node>()
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
                // .style("left", d => d.x = Math.max(radius, Math.min(width - radius, d.x)))
                .style("left", d => d.x + 'px')
                .style("top", d => d.y + 'px');
        }
    } catch (e) {
        console.error(e);
    }
})();