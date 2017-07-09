///<reference path="./node_modules/@types/d3/index.d.ts"/> 

var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var g = svg.append("g")
    .attr("class", "chart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', render)

function getToolTipDate(d: Date) {
    let month = months[d.getUTCMonth()]
    let year = d.getUTCFullYear();

    return `${year}: ${month}`
}

function render(error: any, response: Types.RootObject) {

    if (error) throw error;

    let data = response.data.map(d => {
        return { date: new Date(d[0]), value: +d[1] }
    })

    let desc = response.description;

    let barWidth = Math.ceil(width / data.length);

    var x = d3.scaleTime<Number, Number>().range([0, width])
    var y = d3.scaleLinear().rangeRound([height, 0]);

    // Set up domains
    var xExtent = d3.extent(data.map(d => d.date));
    x.domain(xExtent);

    y.domain([0, d3.max(data, d => d.value)]);

    let xAxis = d3.axisBottom(x)
        .ticks(d3.timeYear, 5)
        .tickFormat(d3.timeFormat("%Y"));

    let yAxis = d3.axisLeft(y)
        .ticks(10);

    var descDiv = d3.select('body').append("div")
        .attr('class','description textwrap')
        .attr("width",'960px')
        .text(desc)
    
    // X label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height +margin.top + 20)
        .text("Year");
    
    // Y Label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", margin.left + 10)
        .attr("x",-margin.top)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("GDP (USD");

    // Axes
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("y", 0)
        .attr("text-anchor", 'middle')
        .attr("transform", "translate(0,15) rotate(-90)");

    g.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    // Bars
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.value))
        .attr("width", barWidth)
        .attr("height", d => height - y(d.value))
        .on("mouseover", d => {
            let rect = d3.select(d3.event.currentTarget)
            let tooltip = `${getToolTipDate(d.date)}<br/> $${d.value}`

            rect.attr("class", "mouseover");
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(tooltip)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", d => {
            var rect = d3.select(d3.event.currentTarget);
            rect.classed("mouseover", false)

            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
}