///<reference path="./node_modules/@types/d3/index.d.ts"/> 

async function JSONPromise<T>(url: string): Promise<T> {
    return new Promise<T>((res, rej) => {
        d3.json(url, (error, data: T) => error ? rej(error) : res(data));
    });
}

let svg = d3.select("svg");
let margin = { top: 20, right: 20, bottom: 80, left: 70 };
let width = +svg.attr("width") - margin.left - margin.right;
let height = +svg.attr("height") - margin.top - margin.bottom;