function RedBlackTree (value, color, parent, leftChild, rightChild) {
	this.value = value?value:0;
	this.color = color || "black";
	if (parent) {
		if (parent.value === 6 && value === 8) {
			console.log(parent);
		}
	}
	this.parent = parent?parent:null;
	this.leftChild = leftChild?leftChild:null;
	this.rightChild = rightChild?rightChild:null;
	return this;
}


// returns a pointer to the newly inserted node
RedBlackTree.prototype.insert = function(value, flag) {
	if (!flag) {
		var root = this.findRoot();
		root.insert(value, true);
	}
	else {
		if (value === this.value) {return this}
		else if (value < this.value) {
			if (this.leftChild) {
				return this.leftChild.insert(value, true)
			}
			else {
				this.leftChild = new RedBlackTree(value, "red", this);
				var leaf = this.leftChild;
				if (this.color === "red") {
					this.leftChild.colorClash();
					return leaf;
				}
				else {
					return leaf;
				}
			}
		}
		else if (value > this.value) {
			if (this.rightChild) {
				return this.rightChild.insert(value, true)
			}
			else {
				this.rightChild = new RedBlackTree(value, "red", this);
				var leaf = this.rightChild;
				if (this.color === "red") {
					this.rightChild.colorClash();
					return leaf;
				}
				else {
					return leaf;
				}
			};
		}
	}
};

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

RedBlackTree.prototype.leftRotation = function() {
	var child = this.rightChild;
	if (!this.parent) {
		child.parent = null;
	}
	if (this.parent) {
		if (this.parent.rightChild === this) {
			this.parent.rightChild = child;
		}
		else {
			this.parent.leftChild = child;
		}
		child.parent = this.parent;
		this.parent = null;
	}
	this.rightChild = child.leftChild;
	child.leftChild = this;
	this.parent = child;
	this.parent.leftChild = this;
}

RedBlackTree.prototype.rightRotation = function() {
	var child = this.leftChild;
	if (!this.parent) {
		child.parent = null;
	}
	if (this.parent) {
		if (this.parent.rightChild === this) {
			this.parent.rightChild = child;
		}
		else {
			this.parent.leftChild = child;
		}
		child.parent = this.parent;
		this.parent = null;
	}
	this.leftChild = child.rightChild;
	child.rightChild = this;
	this.parent = child;
	this.parent.rightChild = this;
}

RedBlackTree.prototype.colorClash = function() {
	var node = this;
	if (node.parent) {
		if (node.parent.parent) {
			var parent = node.parent;
			var grandParent = parent.parent;
			if (node.parent.color === "red") {
				//red parent && red uncle --- CASE 1
				if (grandParent.leftChild && grandParent.rightChild &&
					(grandParent.leftChild.color === grandParent.rightChild.color)) {
					grandParent.leftChild.color = "black";
					grandParent.rightChild.color = "black";
					grandParent.color = "red";
					if (grandParent === grandParent.findRoot()){
						grandParent.color = "black";
					}
					grandParent.colorClash();
				}
				// red parent && black uncle (null or exists)
				else {
					if (node.parent.leftChild === node) {
						if (grandParent.leftChild === node.parent) {
							//One Rotation
							var parent = node.parent;
							grandParent.rightRotation();
							parent.color = "black";
							grandParent.color = "red"

						}
						else {
							//Two Rotations
							parent.rightRotation();
							grandParent.leftRotation();
							node.color = "black";
							grandParent.color = "red";
						}
					}
					else {

						if (grandParent.rightChild === node.parent) {
							//One Rotation
							grandParent.leftRotation();
							parent.color = "black";
							grandParent.color = "red"
						}
						else {
							//Two Rotations
							parent.leftRotation();
							grandParent.rightRotation();
							node.color = "black";
							grandParent.color = "red";
						}
					}
				}
			}
		}
		else {
			
		}
	}
	else {
		node.color = "black";
	}
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
var tree = new RedBlackTree(100);
var root = tree.findRoot();
var ins = [100, 1978, 6, 1, 6472, 7, 2, 852, 0, 3, 4462, 7, 4, 2205, 8, 5, 2697, 5, 6, 7826, 1, 7, 2955, 5, 8, 4347, 5];
for (var i = 0; i < ins.length; i++) {
	tree.insert(ins[i]);
	if (!tree.contains(ins[i])) {
		console.log(i, ins[i]);
	}
}
tree.insert(9);

var i = 0;
var root = tree.findRoot();


var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var root = root.findRoot();
var t = d3.layout.tree();
var nodesStore = root.breadthFirstRet(root.d3ify_p1);
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
	.text(function(d) {return d.name});

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
