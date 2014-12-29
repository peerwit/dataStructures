// Red Black Tree implementation by Pranay 
	// v 0.0.0 (12/28/14)

function Heap () {
	this.it = [null];
	this.length = function() {return this.it.length}

}

Heap.prototype.findParent = function(index) {
	return index >> 1;
}

Heap.prototype.bDown = function(index) {
	var value = this.it[index];
	var c1 = index << 1;
	var child1 = this.it[c1];
	var child2 = this.it[c1 + 1];
	var child = child1<child2?c1:c1+1;
	if (value > this.it[child]){
		this.swap(index,child);
		return child;
	}
	else false;

}

Heap.prototype.get = function(index) {
	return this.it[index];
}

Heap.prototype.revealAll = function() {
	return this.it;
}

Heap.prototype.swap = function(positionOne, positionTwo) {
	var t = this.it[positionOne];
	this.it[positionOne] = this.it[positionTwo];
	this.it[positionTwo] = t;
}

Heap.prototype.insert = function(value) {
	var index = this.length();
	var parentIndex = this.findParent(index);
	var parent = this.get(parentIndex);
	this.it.push(value);
	while (value < parent && parent) {
		this.swap(index,parentIndex);
		index = parentIndex;
		parentIndex = this.findParent(parentIndex);
		parent = this.get(parentIndex);
	}
}

Heap.prototype.extractMin = function() {
	var min = this.it[1];
	var lastInd = this.length() - 1;
	var last = this.it[lastInd];
	this.it.length = lastInd;
	this.it[1] = last;
	var ind = this.bDown(1);
	while (ind) {
		ind = this.bDown(ind);
	}
	return min;
}
var ins = [0, 2, 1978, 6, 1, 6472, 7, 2, 852, 0, 3, 4462, 7, 4, 2205, 8, 5, 2697, 5, 6, 7826, 1, 7, 2955, 5, 8, 4347, 5, 2.5];
var h = new Heap();
for (var i = 0; i < 15; i++) {
	h.insert(ins[i]);
}
var look = h.revealAll();
console.log(look);


var nodesList = h.it.slice();
var n0 = nodesList.map(function(e,i,a) {
		return {name: e, children: []}
	}).map(function(e,i,a) {
		var length = a.length;
		if ((i << 1) < length - 1) {
			e.children.push(a[(i<<1)]);
			if (((i << 1) + 1) < length - 1) {
				e.children.push(a[(i<<1)+1]);
			}
		}
		return e;
	})[1];

//------------------------------------------------------------------------
var tree = new Heap(0);
var ins2 = [];
for (var i = 1; i < 12; i++) {
	tree.insert(ins[i]);
	// tree.insert(i);
	var num = Math.floor(Math.random()*100);
	ins2.push(num);
	tree.insert(num);
}

var i = 0;


var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var t = d3.layout.tree();
var node0 = {name: 1, children:[{name:12, children : []}]}
console.log(n0);
var nodes = t.nodes(node0);
var nodes = t.nodes(n0);
console.log(nodes);
var links = t.links(nodes);
var node = svg.selectAll(".node")
	.data(nodes)
	.enter()
	.append("g")
		.attr("class", "node")
		.attr("transform", function(d) {
			return "translate(" + (d.x*width/2 + 10) + "," + (d.y*height/2 + 50) + ")";
		});
node.append("circle")
	.attr("r", 5)
	.attr("fill", function(d) {return d.color});

node.append("text")
	.text(function(d) {
		var value = "root", rc = ".", lc = ".";
		if (d.parent) {
			value = d.parent.value
		}
		if (d.rightChild) {
			rc = d.rightChild.value
		}
		if (d.leftChild) {
			lc = d.leftChild.value
		}
		return d.name });
		  //+ "   " + value + ", " + lc + ", " + rc});

var diagonal = d3.svg.diagonal()
	.projection(function(d) {return [(d.x*width/2 + 10), (d.y*height/2 + 50)]});

var link = svg.selectAll(".link")
	.data(links)
	.enter()
	.append("path")
		.attr("class", "link")
		.attr("stroke", "black")
		.attr("fill", "none")
		.attr("d", diagonal);

/*
		// console.log(tree);
// console.log(tree.breadthFirstRet());
// console.log("PARENT", tree.findRoot());


// // console.log(nodesStore, root);
// root = root.findRoot();
// root.insert(910);
// root.insert(366);
// root.insert(71);
// root.insert(512);
// // debugger;
// root.findRoot().insert(3000);
// root.leftRotation();
// root.insert(3100);
// root.insert(3200);
// root.insert(3300);
// root.insert(3400);
// root.insert(3500);
// console.log(root);
// root = tree.findRoot();
// var flag = true;
// for (var i = 0; i < 50; i++) {
// 	// root.insert(i);
// 	// root = root.findRoot();
// 	// var num = Math.floor(Math.random()*10000)
// 	// root.insert(num);
// 	root = root.findRoot();
// 	root.insert(i);
// 	// flag = root.contains(i);
// 	// // flag = flag && root.contains(num);
// 	// if (flag === false) {
// 	// 	console.log(i);
// 	// 	console.log(root.contains(i), root.findRoot())
// 	// 	break;
// 	// }
// }
// var flag = true;
// for (var i = 0; i < 40; i++) {
// 	// root.insert(i);
// 	var num = Math.floor(Math.random()*10000)
// 	root.insert(num);
// 	root = root.findRoot();
// 	// flag = root.contains(i);
// 	// // flag = flag && root.contains(num);
// 	// if (flag === false) {
// 	// 	console.log(i);
// 	// 	console.log(root.contains(i), root.findRoot())
// 	// 	break;
// 	// }
// }
// console.log(flag, "FLAG", root.findRoot());




// console.log(root.breadthFirstRet(log).length);


// // console.log(nodes);

// // function randomIndex(array) {
// // 	var length = array.length;
// // 	return Math.floor(Math.random()*length);
// // }





// // // var that = this;

// // // // setInterval(function() {
// // // // 	console.log("Hello")
// // // // 	root = a2();
// // // // 	update(root);
// // // // },3000)


// // var r = root.findRoot();

// // function a2 (root) {
// // 	root = root || r;
// // 	var random1 = Math.floor(Math.random()*1000);
// // 	var random2 = Math.floor(Math.random()*1000);
// // 	root.insert(random1);
// // 	root.insert(random2);
// // 	return root.findRoot();
// // }

// // function update(root) {
// // var nodesStore = root.breadthFirstRet(root.d3ify_p1);
// // var t = d3.layout.tree();
// // var nodes = t.nodes(root.findRoot());
// // var links = t.links(nodes);
// // console.log(nodes.length);
// // var node = svg.selectAll(".node")
// // 	.data(nodes)
// // 	// .enter()
// // 	.append("g")
// // 		.attr("class", "node")
// // 		.attr("transform", function(d) {
// // 			return "translate(" + (d.x*width/2 + 10) + "," + (d.y*height/2 + 50) + ")";
// // 		});
// // node.append("circle")
// // 	.attr("r", 5)
// // 	.attr("fill", function(d) {return d.color});

// // node.append("text")
// // 	.text(function(d) {return d.name});

// // var diagonal = d3.svg.diagonal()
// // 	.projection(function(d) {return [(d.x*width/2 + 10), (d.y*height/2 + 50)]});

// // var link = svg.selectAll(".link")
// // 	.data(links)
// // 	// .enter()
// // 	.append("path")
// // 		.attr("class", "link")
// // 		.attr("stroke", "black")
// // 		.attr("fill", "none")
// // 		.attr("d", diagonal);


// // }


// // var s = setInterval(function() {
// // 	root.insert(i);
// // 	console.log(root.contains(i), i);
// // 	update(root);
// // 	i++;
// // 	if (i === 20) {
// // 		clearInterval(s);
// // 	}
// // }, 50);
// // // console.log(nodes, links, link);





// // // // function update(source) {

// // // //   // Compute the new tree layout.
// // // //   var nodes = tree.nodes(root).reverse(),
// // // //       links = tree.links(nodes);

// // // //   // Normalize for fixed-depth.
// // // //   nodes.forEach(function(d) { d.y = d.depth * 180; });

// // // //   // Update the nodes…
// // // //   var node = svg.selectAll("g.node")
// // // //       .data(nodes, function(d) { return d.id || (d.id = ++i); });

// // // //   // Enter any new nodes at the parent's previous position.
// // // //   var nodeEnter = node.enter().append("g")
// // // //       .attr("class", "node")
// // // //       .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
// // // //       .on("click", click);

// // // //   nodeEnter.append("circle")
// // // //       .attr("r", 1e-6)
// // // //       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

// // // //   nodeEnter.append("text")
// // // //       .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
// // // //       .attr("dy", ".35em")
// // // //       .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
// // // //       .text(function(d) { return d.name; })
// // // //       .style("fill-opacity", 1e-6);

// // // //   // Transition nodes to their new position.
// // // //   var nodeUpdate = node.transition()
// // // //       .duration(duration)
// // // //       .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

// // // //   nodeUpdate.select("circle")
// // // //       .attr("r", 4.5)
// // // //       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

// // // //   nodeUpdate.select("text")
// // // //       .style("fill-opacity", 1);

// // // //   // Transition exiting nodes to the parent's new position.
// // // //   var nodeExit = node.exit().transition()
// // //       .duration(duration)
// // //       .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
// // //       .remove();

// // //   nodeExit.select("circle")
// // //       .attr("r", 1e-6);

// // //   nodeExit.select("text")
// // //       .style("fill-opacity", 1e-6);

// // //   // Update the links…
// // //   var link = svg.selectAll("path.link")
// // //       .data(links, function(d) { return d.target.id; });

// // //   // Enter any new links at the parent's previous position.
// // //   link.enter().insert("path", "g")
// // //       .attr("class", "link")
// // //       .attr("d", function(d) {
// // //         var o = {x: source.x0, y: source.y0};
// // //         return diagonal({source: o, target: o});
// // //       });

// // //   // Transition links to their new position.
// // //   link.transition()
// // //       .duration(duration)
// // //       .attr("d", diagonal);

// // //   // Transition exiting nodes to the parent's new position.
// // //   link.exit().transition()
// // //       .duration(duration)
// // //       .attr("d", function(d) {
// // //         var o = {x: source.x, y: source.y};
// // //         return diagonal({source: o, target: o});
// // //       })
// // //       .remove();

// // //   // Stash the old positions for transition.
// // //   nodes.forEach(function(d) {
// // //     d.x0 = d.x;
// // //     d.y0 = d.y;
// // //   });
// // // }
*/
