const StackFrontier = require('./stackFrontier')

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

module.exports = QueueFrontier