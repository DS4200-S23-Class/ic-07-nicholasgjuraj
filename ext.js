const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME3 = //store svg element as a variable
    d3.select("#vis1") //analogous to document.selectElementByXX()
        .append("svg") //adds a child svg to selected element
        .attr("height", FRAME_HEIGHT) //set attributes of the added
        .attr("width", FRAME_WIDTH)
        .attr("class", "frame") // Note how we still end with a ';'
        .attr('transform',  'translate(0,'+150+') rotate('+270+')');
const data = [55000, 48000, 27000, 66000, 90000]
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// find max X
const MAX_X = d3.max(data, (d) => { return d; });
console.log("Max x: " +MAX_X);

// Now, define scale functions that maps our data values
// (domain) to pixel values (range)
const X_SCALE = d3.scaleLinear() // linear scale because we have
    // linear data
    .domain([0, (MAX_X + 10000)]) // add some padding
    .range([0, VIS_WIDTH]);

console.log("Input: 40000, X_SCALE output: " + X_SCALE(40000));

// Now, we can use X_SCALE to plot our points
FRAME3.selectAll("points")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => { return (X_SCALE(d) + MARGINS.left); })
    .attr("cy", MARGINS.top)
    .attr("r", 20)
    .attr("class", "point");

// We can also use X_SCALE to add an axis to the vis
FRAME3.append("g") // g is a "placeholder" svg
    .attr("transform", "translate(" + MARGINS.left +
        "," + (VIS_HEIGHT + MARGINS.top) + ")") //moves axis
    // within margins
    .call(d3.axisBottom(X_SCALE).ticks(4)) // function for generating axis
    .attr("font-size", '20px'); // set font size