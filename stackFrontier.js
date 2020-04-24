/**
 * Create a Stackfrontier to a Depth-First Search
 */
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
    return this.frontier.length === 0
}

StackFrontier.prototype.remove = function() {
    if(this.empty()) {
        console.log('empty frontier')
    } else {
        node = this.frontier[this.frontier.length - 1]
        this.frontier.pop()
        return node
    }
}

/**
 * Create a Queuefrontier to a Breadth-First Search
 */
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
        node = this.frontier[0]
        this.frontier.shift()
        return node
    }
}

module.exports = StackFrontier