// Red Black Tree implementation by Pranay 
	// v 0.0.1 (12/28/14)

function RedBlackTree (value, color, parent) {
	this.value = value?value:0;
	this.color = color || "black";
	this.parent = parent?parent:null;
	this.leftChild = null;
	this.rightChild = null;
	return this;
}

RedBlackTree.prototype.gotGrandparent = RedBlackTree.prototype.hasGP = function(){
	if (this.parent.parent){
		return true;
	} 
	else {return false}
}

// returns a pointer to the newly inserted node
RedBlackTree.prototype.insert = function(value) {
	var root = this.findRoot();
	function rbtInsert(node, value) {
		if (value === node.value) {return value}
		else if (value < node.value) {
			if (node.leftChild) {
				return rbtInsert(node.leftChild, value)
			}
			else {
				node["leftChild"] = new RedBlackTree(value, "red", node);
				if (node.color === "red") {node.leftChild.colorClash()}
			}
		}
		else if (value > node.value) {
			if (node.rightChild) {
				return rbtInsert(node.rightChild, value)
			}
			else {
				node["rightChild"] = new RedBlackTree(value, "red", node);
				if (node.color === "red") {node.rightChild.colorClash()}
			}
		}
	}
	rbtInsert(root, value);
	if (root.findRoot().color === "red") {root.findRoot().color = "black"}
};

// get back to it
RedBlackTree.prototype.contains = function(target, flag) {
	// body...
	// console.log(this.value, target);
	if (flag) {
		if (this.value === target) {
			return true;
		}
		else {
			if (target < this.value){
				if (this.leftChild) {
					return this.leftChild.contains(target, true);
				}
				else {return false}
			}
			else if (target > this.value) {
				if (this.rightChild) {
					return this.rightChild.contains(target, true);
				}
				else {return false}
			}
		}
	}
	else {
		return this.findRoot().contains(target, true);
	}
	
};

RedBlackTree.prototype.ref = function(target, flag) {
	// body...
	// console.log(this.value, target);
	if (flag) {
		if (this.value === target) {
			// console.log(this);
			return this;
		}
		else {
			if (target < this.value){
				if (this.leftChild) {
					return this.leftChild.ref(target, true);
				}
				else {return false}
			}
			else if (target > this.value) {
				if (this.rightChild) {
					return this.rightChild.ref(target, true);
				}
				else {return false}
			}
		}
	}
	else {
		return this.findRoot().ref(target, true);
	}
	
};

RedBlackTree.prototype.depthFirstLog = function(fn, array) {
	array = array || [];
	if (this.leftChild) {
		this.leftChild.depthFirstLog(fn, array);
	}
	if (this.value) {
		array.push(this);
		fn(this);
	}
	if (this.rightChild) {
		this.rightChild.depthFirstLog(fn, array);
	}
	return array;
};



RedBlackTree.prototype.breadthFirstRet = function(fn, array) {
	array = array  || [];
	if (this.findRoot() === this){
		array.push(this);
	}
	if (this.leftChild) {
		array.push(this.leftChild);
	}
	if (this.rightChild) {
		array.push(this.rightChild);
	}
	if (this.leftChild) {
		this.leftChild.breadthFirstRet(fn, array);
	}
	if (this.rightChild) {
		this.rightChild.breadthFirstRet(fn, array);
	}
	if (this.findRoot() === this){
		return array.map(fn);
	}
	return array;
};

RedBlackTree.prototype.childType = function() {
	if (!this.parent) {return "root"}
	else {
		if (this.parent["leftChild"] === this) {
			return "leftChild"
		}
		else {return "rightChild"}
	}
	throw new Error("childType Error " + this.parent.leftChild.value + this.parent.rightChild.value + this.value);
};

RedBlackTree.prototype.leftRotation = function() {
	var parent = this.parent;
	var childType = this.parent.childType();
	if (childType !== "root") { this.parent.parent[childType] = this;}
	this.parent = parent.parent;
	parent.rightChild = this.leftChild;
	parent.parent = this;
	this.leftChild = parent;
	
}

RedBlackTree.prototype.rightRotation = function() {
	console.log(this.value, "RIGHT ROTSS");
	var parent = this.parent;
	var childType = this.parent.childType();
	if (childType !== "root") { this.parent.parent[childType] = this;}
	this.parent = parent.parent;
	parent.leftChild = this.rightChild;
	parent.parent = this;
	this.rightChild = parent;

}

RedBlackTree.prototype.colorClash = function() {
	var parent = this.parent;
	if (!parent.parent) {
		// if (parent.leftChild) {parent.leftChild.color = "black"};
		// if (parent.rightChild) {parent.rightChild.color = "black"};
		parent.color = "black";
		return;
	}
	else {
		var g = this.parent.parent;
		var uncle;
		if (g.leftChild && (g.leftChild.value === this.parent.value)) {
			uncle = g.rightChild||null;
		}
		else if (g.rightChild && (g.rightChild.value === this.parent.value)) {
			uncle = g.leftChild||null;
		}
		if (uncle && uncle.color === "red"){
			parent.color = "black"; 
			uncle.color = "black";
			g.color = "red";
			var g = this.parent.parent;
			if (g.value === 83) {console.log(g.parent.value, this.value, this.parent.value, g.value, parent.parent, parent.parent.parent.value, parent.parent.parent.leftChild, parent.parent.parent.rightChild)}
			if (g.parent && (g.parent.color === "red")) {
				g.color = "red";
				g.colorClash();
			}

		}
		else {
			if (this.color === "red" && this.parent.color === "red"){
				var pct = parent.childType();
				var ct = this.childType();
				if (ct === pct) {
					if (ct === "leftChild") {
						this.parent.parent.color = "red";
						this.parent.color = "black";
						this.parent.parent.rightRotation();
						return;
					}
					else if (ct === "rightChild") {
						this.parent.parent.color = "red";
						this.parent.color = "black";
						this.parent.parent.leftRotation();
						return;
					}
				}
				else {
					if (ct === "leftChild") {
						this.color = "black";
						this.parent.parent.color = "red";
						this.parent.rightRotation();
						this.parent.leftRotation();
						return;
					}
					else if (ct === "rightChild") {
						this.color = "black";
						this.parent.parent.color = "red";
						this.parent.leftRotation();
						this.parent.rightRotation();
						return;
					}
				}
			}
		}
	}
}

RedBlackTree.prototype.getGP = function(){
	if (this.hasGP()) {
		return this.parent.parent;
	}
	else {return null}
}



RedBlackTree.prototype.getUncleColor = function(){
	if (!this.hasGP()) {
		throw new Error("NO UNCLE because Parent is ROOT");
	}
	var parentType = this.parent.childType();
	var uncle;
	if (parentType === "leftChild") {
		uncle = this.parent.parent["rightChild"];
		if (uncle) {
			return uncle.color;
		}
		return "black";
	}
	else if (parentType === "rightChild") {
		uncle = this.parent.parent["leftChild"];
		if (uncle) {
			return uncle.color;
		}
		return "black";
	}
}

RedBlackTree.prototype.getUncle = function(){
	if (!this.hasGP()) {
		throw new Error("NO UNCLE because Parent is ROOT");
	}
	var parentType = this.parent.childType();
	var uncle;
	if (parentType === "leftChild") {
		uncle = this.parent.parent["rightChild"];
		if (uncle) {
			return uncle;
		}
		throw Error("NO UNCLE for l");
	}
	else if (parentType === "rightChild") {
		uncle = this.parent.parent["leftChild"];
		if (uncle) {
			return uncle;
		}
		throw Error("NO UNCLE for r");
	}
}

RedBlackTree.prototype.getUncleType = function(){
	if (!this.hasGP()) {
		throw new Error("NO UNCLE because Parent is ROOT");
	}
	var parentType = this.parent.childType();
	var uncle;
	if (parentType === "leftChild") {
		return "rightChild";
	}
	else if (parentType === "rightChild") {
		return "leftChild";
	}
}

RedBlackTree.prototype.upcolor = function(){
	this.getGP().color = "red";
	this.getUncle().color = "black"
	this.parent.color = "black";
	if (this.getGP().parent && this.getGP().parent.color === "red") {
		this.getGP().colorClash();
	} 
	return;
}

RedBlackTree.prototype.rotate = function(){
	this.getUncleType() !== this.childType() ? this.oneRotation() : this.twoRotations();
}

RedBlackTree.prototype.oneRotation = function(){
	this.parent.color = "black"; this.parent.parent.color = "red"; 
	return (this.value > this.parent.parent.value) ? this.parent.leftRotation() : this.parent.rightRotation();
	// this.parent.rootify();
}

RedBlackTree.prototype.twoRotations = function(){
	this.color = "black"; this.parent.parent.color = "red";
	(this.value < this.parent.value) ? this.rotateLesser() : this.rotateGreater();
	// this.rootify();
}

RedBlackTree.prototype.rotateLesser = function(){
	var ggp = this.parent.parent.parent;
	var childType = this.parent.parent.childType();
	if (childType !== "root") { ggp[childType] = this;}
	var c1 = this.leftChild;
	var c2 = this.rightChild;
	this.leftChild = this.parent.parent;
	this.rightChild = this.parent;
	this.leftChild.parent = this;
	this.rightChild.parent = this;
	this.leftChild.rightChild = c1;
	this.rightChild.leftChild = c2;
	this.parent = ggp;
}

RedBlackTree.prototype.rotateGreater = function(){
	var ggp = this.parent.parent.parent;
	var childType = this.parent.parent.childType();
	if (childType !== "root") { ggp[childType] = this;}
	var c1 = this.leftChild;
	var c2 = this.rightChild;
	this.leftChild = this.parent;
	this.rightChild = this.parent.parent;
	this.leftChild.parent = this;
	this.rightChild.parent = this;
	this.leftChild.rightChild = c1;
	this.rightChild.leftChild = c2;
	this.parent = ggp;
}

RedBlackTree.prototype.colorClash = function(){
	if (this.parent.color !== "red" || this.color !== "red"){
		throw new Error ("Bad Color Class Call")
	};
	(this.getUncleColor() === "black") ? this.rotate() : this.upcolor();
}

RedBlackTree.prototype.findRoot = function(){
	if (this.parent) {
		return this.parent.findRoot();
	}
	else {return this;}
}

RedBlackTree.prototype.d3ify_0 = function(e){
	var children = [];
	if (e.leftChild){children.push(e.leftChild)}
	if (e.rightChild) {children.push(e.rightChild)}
	return {name: e.value, 
		children:children}
}

RedBlackTree.prototype.d3ify_p1 = function(e){
	if (!e.name) {
		var children = [];
		if (e.leftChild){children.push(e.leftChild)}
		if (e.rightChild) {children.push(e.rightChild)}
		e.name = e.value;
		e.children = children;
	}
	return;
}

RedBlackTree.prototype.d3ify_p2 = function(e){
	var children = [];
	if (e.leftChild){children.push(e.leftChild)}
	if (e.rightChild) {children.push(e.rightChild)}
	e.name = e.value;
	e.children = children;
	return;
}

function log(e) {
	return e;
}
//------------------------------------------------------------------------
var ins = [0, 2, 1978, 6, 1, 6472, 7, 2, 852, 0, 3, 4462, 7, 4, 2205, 8, 5, 2697, 5, 6, 7826, 1, 7, 2955, 5, 8, 4347, 5, 2.5];
var tree = new RedBlackTree(94);
var root = tree.findRoot();
var ins2 = [];
//  [50, 28, 90, 8, 41, 4, 20, 33, 48, 83, 96, 72, 87, 53, 73, 85, 89, 94, 97] 19 [94, 90, 4, 50, 72, 96, 83, 97, 33, 85, 28, 41, 87, 48, 20, 89, 73, 53, 8]
 var l1 = [90, 4, 50, 72, 96, 83, 97, 33, 85, 28, 41, 87]//, 48, 20, 89, 73, 53, 8];
 var l2 = [tree.findRoot().value].concat(l1);

for (var i = 0; i < 13; i++) {
	// tree.insert(ins[i]);
	// tree.insert(i);
	if (i === l2.length - 1) {
		// debugger;
	}
	var elem = l2[i];
	// if (elem === 87) {debugger}
	tree.insert(elem);
}

// for (var i = 0; i < ; i++) {
// 	var num = Math.floor(Math.random()*100);
// 	if (l2.indexOf(num) === -1) {
// 		l2.push(num);
// 	}
// 	tree.insert(num);
// 	l2 = l2.filter(function(e) {return l2.indexOf(e) === l2.lastIndexOf(e)});
// }

// tree.insert(1);
// tree.insert(2);
// tree.insert(3);
// // debugger;
// tree.insert(4);
// tree.insert(3);

var i = 0;
var root = tree.findRoot();
// var arr = [];
// var all = tree.findRoot().breadthFirstRet(function(e) {
// 	arr.push(e.value);
// });

// console.log(arr, arr.length, l2, l2.length, l2.filter(function(e) {
// 	return arr.indexOf(e) === -1;
// }));
var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var root = root.findRoot();
var t = d3.layout.tree();
var nodesStore = root.breadthFirstRet(root.d3ify_p1);
console.log(root.findRoot());
var nodes = t.nodes(root.findRoot());
console.log(nodes.length);
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
