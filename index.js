const fs = require('fs')

// Create node object
function Node (state, parent, action) {
    return {
        state,
        parent,
        action,
    }
}

function StackFrontier () {
    let frontier = []
    this.frontier = frontier
}

StackFrontier.prototype.add = function(node) {
    this.frontier.push(node)
}

StackFrontier.prototype.contains_state = function(state) {
    for (node of this.frontier) {
        if (node.state[0] === state[0] && node.state[1] === state[1]) return true 
    }
    return false
}

StackFrontier.prototype.empty = function() {
    return frontier.length === 0
}

StackFrontier.prototype.remove = function() {
    if(this.empty()) {
        console.log('empty frontier')
    } else {
        node = frontier[frontier.length - 1]
        this.frontier.pop()
        return node
    }
}

function QueueFrontier() {
    StackFrontier.call(this)
}

// QueueFrontier extends StackFrontier
QueueFrontier.prototype = Object.create(StackFrontier.prototype)
QueueFrontier.prototype.constructor = QueueFrontier

QueueFrontier.prototype.remove = function() {
    if(this.empty()) {
        console.log('empty frontier')
    } else {
        node = frontier[0]
        this.frontier.shift()
        return node
    }
}

// const start = Node([1,1], undefined, undefined)
// const finish = Node([2,2], undefined, undefined)
// // console.log(start)
// let frontier = new StackFrontier()
// frontier.add(finish)
// frontier.add(start)
// console.log(frontier)

// console.log(frontier.contains_state([2,1]))
// frontier.remove()
// console.log(frontier)
// console.log(frontier.contains_state([1,1]))

// let bfsFrontier = new QueueFrontier()
// bfsFrontier.add(start)
// bfsFrontier.add(finish)
// console.log(bfsFrontier)
// console.log(bfsFrontier.contains_state([1,1]))
// console.log(bfsFrontier.contains_state([2,2]))
// bfsFrontier.remove()
// console.log(bfsFrontier.frontier[0].state)
// console.log(bfsFrontier.contains_state([2,2]))

function Maze(filename) {

    // Read file
    const contents = fs.readFileSync(filename, 'utf8')
    console.log(contents)

    // Validate start and goal
    if ((contents.match(/A/g) || []).length !== 1) {
        console.error("maze must have exactly one start point")
        return
    }
    if ((contents.match(/B/g) || []).length !== 1) {
        console.error("maze must have exactly one goal")
        return
    }

    // Determine height and width of maze
    let contentsLines = contents.split(/[\r\n]+/g)
    let height = contentsLines.length
    console.log(height)
    let width = contentsLines[0].split('').length
    console.log(width)

}

let myArgs = process.argv.slice(2)

if (myArgs.length !== 1) {
    console.log('Usage: node index maze.txt')
    return
}

m = new Maze(myArgs[0])