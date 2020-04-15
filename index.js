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
    
    return {
        frontier,
        add(node) {
            frontier.push(node)
        },
        contains_state(state) {
            for (node of frontier) {
                node.state === state ? true : false
            }
        },
        empty() {
            return frontier.length() === 0
        },
        remove() {
            if(empty()) {
                console.log('empty frontier')
            } else {
                node = frontier[frontier.length - 1]
                frontier = frontier.pop()
                return node
            }
        }
    }
}

const start = Node([1,1], undefined, undefined)
console.log(start)
let frontier = StackFrontier()
frontier.add(start)

console.log(frontier.contains_state([1,1]))
console.log(frontier)