var nodes = [];
var width = window.innerWidth;
var height = window.innerHeight;

function createNode() {
	return {x:Math.random()*(width-50), 
			y:Math.random()*(height-25), 
			r: Math.random()*25+25
			}
}

for (var i = 0; i < 15; i++) {
	nodes.push(createNode());
}

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.05)
    .charge(-300)
    .friction(.05)
    //.chargeDistance();
// var force = d3.layout.force()
//     .nodes(nodes)
//     .links(links)
//     .size([w, h])
//     .linkStrength(0.1)
//     .friction(0.9)
//     .distance(20)
//     .charge(-30)
//     .gravity(0.1)
//     .theta(0.8)
//     .alpha(0.1)
//     .start();
var color = d3.scale;



var node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 20)
    .style("fill", function(){
    	return d3.rgb(Math.random()*255,Math.random()*255,Math.random()*155)
    });

var flag = true; var c = 0;

function update() {
	node.attr("cx", function(d) { return d.x; })
      	.attr("cy", function(d) { return d.y; });
    // force.gravity(0);
    // force.charge(((Math.random()) * 1000)  - 300);
    force.start();
}

setTimeout(function() {
	force.charge(- 30000);
	force.gravity(1);
}, 5000);

// setTimeout(function() {
// 	force.gravity(0.1);
// 	console.log(force.gravity());
// }, 1000);

force.start();
var count = 0;
// while(1) {console.log("Hello")}
force.on("tick", update);
/*
// var width = 960,
//     height = 500;

// var fill = d3.scale.category10();

// var nodes = d3.range(100).map(function(i) {
//   return {index: i};
// });

// var force = d3.layout.force()
//     .nodes(nodes)
//     .size([width, height])
//     .on("tick", tick)
//     .start();

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// var node = svg.selectAll(".node")
//     .data(nodes)
//   .enter().append("circle")
//     .attr("class", "node")
//     .attr("cx", function(d) { return d.x; })
//     .attr("cy", function(d) { return2ties are present, they tell
// D3 where to place the nodes before the force layout starts its
// magic. More typically, they're left out of the nodes and D3 picks
// random locations for each node. We're defining them here so we can
// get a consistent application of the layout which lets us see the
// effects of different properties.

var nodes = [
    { x:   width/3, y: height/2 },
    { x: 2*width/3, y: height/2 }
];

// The `links` array contains objects with a `source` and a `target`
// property. The values of those properties are the indices in
// the `nodes` array of the two endpoints of the link.

var links = [
    { source: 0, target: 1 }
];

// Here's were the code begins. We start off by creating an SVG
// container to hold the visualization. We only need to specify
// the dimensions for this container.

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

// Now we create a force layout object and define its properties.
// Those include the dimensions of the visualization and the arrays
// of nodes and links.

var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links);

// There's one more property of the layout we need to define,
// its `linkDistance`. That's generally a configurable value and,
// for a first example, we'd normally leave it at its default.
// Unfortunately, the default value results in a visualization
// that's not especially clear. This parameter defines the
// distance (normally in pixels) that we'd like to have between
// nodes that are connected. (It is, thus, the length we'd
// like our links to have.)

force.linkDistance(width/2);

// Next we'll add the nodes and links to the visualization.
// Note that we're just sticking them into the SVG container
// at this point. We start with the links. The order here is
// important because we want the nodes to appear "on top of"
// the links. SVG doesn't really have a convenient equivalent
// to HTML's `z-index`; instead it relies on the order of the
// elements in the markup. By adding the nodes _after_ the
// links we ensure that nodes appear on top of links.

// Links are pretty simple. They're just SVG lines, and
// we're not even going to specify their coordinates. (We'll
// let the force layout take care of that.) Without any
// coordinates, the lines won't even be visible, but the
// markup will be sitting inside the SVG container ready
// and waiting for the force layout.

var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

// Now it's the nodes turn. Each node is drawn as a circle.

var node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node');

// We're about to tell the force layout to start its
// calculations. We do, however, want to know when those
// calculations are complete, so before we kick things off
// we'll define a function that we want the layout to call
// once the calculations are done.

force.on('end', function() {

    // When this function executes, the force layout
    // calculations have concluded. The layout will
    // have set various properties in our nodes and
    // links objects that we can use to position them
    // within the SVG container.

    // First let's reposition the nodes. As the force
    // layout runs it updates the `x` and `y` properties
    // that define where the node should be centered.
    // To move the node, we set the appropriate SVG
    // attributes to their new values. We also have to
    // give the node a non-zero radius so that it's visible
    // in the container.

    node.attr('r', width/25)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

    // We also need to update positions of the links.
    // For those elements, the force layout sets the
    // `source` and `target` properties, specifying
    // `x` and `y` values in each case.

    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

});

// Okay, everything is set up now so it's time to turn
// things over to the force layout. Here we go.
console.log("Hello")
force.start();



*/