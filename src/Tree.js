var Tree, root;

Tree = (function() {
  function Tree(left, data1, right) {
    this.left = left;
    this.data = data1;
    this.right = right;
    this.domQueue = [];
    this.tree = this;
    return this.tree;
  }

  Tree.prototype.setLeft = function(tree) {
    return this.left = tree;
  };

  Tree.prototype.setRight = function(tree) {
    return this.right = tree;
  };

  Tree.prototype.setData = function(data) {
    return this.data = data;
  };

  Tree.prototype.showData = function() {
    return this.data;
  };

  Tree.prototype.iterator = function(type) {
    switch (type) {
      case "first":
        return this.iteratorFirst(this.tree);
      case "middle":
        return this.iteratorMiddle(this.tree);
      case "end":
        return this.iteratorEnd(this.tree);
    }
  };

  Tree.prototype.iteratorFirst = function(nowObj) {
    this.showData(nowObj);
    if (nowObj.left != null) {
      this.iteratorFirst(nowObj.left);
    }
    if (nowObj.right != null) {
      this.iteratorFirst(nowObj.right);
    }
    return "finish";
  };

  Tree.prototype.iteratorMiddle = function(nowObj) {
    if (nowObj.left != null) {
      this.iteratorMiddle(nowObj.left);
    }
    this.showData(nowObj);
    if (nowObj.right != null) {
      this.iteratorMiddle(nowObj.right);
    }
    return "finish";
  };

  Tree.prototype.iteratorEnd = function(nowObj) {
    if (nowObj.left != null) {
      this.iteratorEnd(nowObj.left);
    }
    if (nowObj.right != null) {
      this.iteratorEnd(nowObj.right);
    }
    this.showData(nowObj);
    return "finish";
  };

  Tree.prototype.showData = function(element) {
    if ((element != null) && element.data !== "#") {
      this.pushDOM(element);
      return console.log(element.data);
    }
  };

  Tree.prototype.pushDOM = function(element) {
    return this.domQueue.push(element);
  };

  Tree.prototype.createBTree = function() {
    return this.tree = this.createTree(this.tree);
  };

  Tree.prototype.createTree = function(treeElement) {
    var data;
    data = this.getTreeNodeSequence();
    if ((data != null) && data !== "#") {
      treeElement = new Tree;
      treeElement.data = data;
      treeElement.left = this.createTree(treeElement.left);
      treeElement.right = this.createTree(treeElement.right);
    }
    return treeElement;
  };

  Tree.prototype.setTreeNodeSequence = function(nodeSequence) {
    return this.nodeSequence = nodeSequence;
  };

  Tree.prototype.getTreeNodeSequence = function() {
    return this.nodeSequence.shift();
  };

  Tree.prototype.query = function(queryParams) {
    var element, i, len, queryQueue, ref;
    queryQueue = [];
    ref = this.domQueue;
    for (i = 0, len = ref.length; i < len; i++) {
      element = ref[i];
      if ((element != null) && queryParams.test(element.data)) {
        queryQueue.push(element);
      }
    }
    return queryQueue;
  };

  return Tree;

})();

root = new Tree;

root.setTreeNodeSequence(["a", "b", "e", "#", "#", "f", "#", "#", "c"]);

root.createBTree();

root.iterator("first");

console.log(root.query(/[a,b]/).length);
