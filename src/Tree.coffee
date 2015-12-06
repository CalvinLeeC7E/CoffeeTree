class Tree
    constructor: (@left,@data,@right)->
        @domQueue = []
        @tree = this
        return @tree
    setLeft: (tree)->
        @left = tree
    setRight: (tree)->
        @right = tree
    setData: (data)->
        @data = data
    showData: ()->
        @data
    iterator:(type)->
        switch type
            when "first"
                @iteratorFirst(@tree)
            when "middle"
                @iteratorMiddle(@tree)
            when "end"
                @iteratorEnd(@tree)

    iteratorFirst: (nowObj)->
        @showData nowObj
        if nowObj.left?
            @iteratorFirst(nowObj.left)
        if nowObj.right?
            @iteratorFirst(nowObj.right)
        "finish"
    iteratorMiddle: (nowObj)->
        if nowObj.left?
            @iteratorMiddle(nowObj.left)
        @showData nowObj
        if nowObj.right?
            @iteratorMiddle(nowObj.right)
        "finish"
    iteratorEnd: (nowObj)->
        if nowObj.left?
            @iteratorEnd(nowObj.left)
        if nowObj.right?
            @iteratorEnd(nowObj.right)
        @showData nowObj
        "finish"
    showData:(element)->
        if element? and element.data!="#"
            @pushDOM element
            console.log element.data

    pushDOM:(element)->
        @domQueue.push element
    createBTree:()->
        @tree = @createTree(@tree)

    createTree: (treeElement)->
        data = @getTreeNodeSequence()
        if data? and data!="#"
            treeElement = new Tree
            treeElement.data = data
            treeElement.left = @createTree(treeElement.left)
            treeElement.right = @createTree(treeElement.right)
        treeElement

    setTreeNodeSequence:(nodeSequence)->
        @nodeSequence = nodeSequence

    getTreeNodeSequence:()->
        @nodeSequence.shift()

    query:(queryParams)->
        queryQueue = []
        for element in @domQueue
            if element? and queryParams.test(element.data)
                queryQueue.push element
        return queryQueue

# right2 = new Tree null,"E",null
# left1 = new Tree null,"D",right2
# left = new Tree left1,"A",null
# right = new Tree null,"B",null
# root = new Tree left,"C",right

root = new Tree
root.setTreeNodeSequence(["a","b","e","#","#","f","#","#","c"])
root.createBTree()
root.iterator("first")
console.log root.query(/[a,b]/).length
