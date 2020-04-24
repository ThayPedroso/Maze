const fs = require('fs')

const Node = require('./node')
const StackFrontier = require('./stackFrontier')
const QueueFrontier = require('./queueFrontier')

/**
 * Create maze from .txt read file. 
 * @param {Filename} filename maze txt file.
 */
function Maze(filename) {

    // Read file
    const contents = fs.readFileSync(filename, 'utf8')

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
    this.height = height
    let width = contentsLines[0].split('').length
    this.width = width

    // Keep track of walls
    let walls = []
    for(let i = 0; i < height; i++) {
        let row = []
        for(let j = 0; j < width; j++) {
            try {
                if (contentsLines[i][j] === 'A') {
                    this.start = [i, j]
                    row.push(false)
                }
                else if (contentsLines[i][j] === 'B') {
                    this.goal = [i, j]
                    row.push(false)
                }
                else if (contentsLines[i][j] === ' ') {
                    row.push(false)
                }
                else {
                    row.push(true)
                }
            } catch {
                row.push(false)
            }
        }
        walls.push(row)
    }
    this.walls = walls
}

/**
 * Check if given array contains state
 * @param {Array} array array to be iterated.
 * @param {State} state searched state.
 */
Maze.prototype.contains_state = function(array, state) {
    for (node of array) {
        if (node[0] === state[0] && node[1] === state[1]) return true 
    }
    return false
}

/**
 * Prints maze
 */
Maze.prototype.print = function() {
    solution = this.solution === undefined ? undefined : this.solution.cells
    if (this.solution) console.log(solution)
    process.stdout.write("\n")
    for(let i = 0; i < this.walls.length; i++) {
        for (let j = 0; j < this.walls[0].length; j++) {
            if (this.walls[i][j]) process.stdout.write("█")
            else if (i === this.start[0] && j === this.start[1]) {
                process.stdout.write("A")
            }
            else if (i === this.goal[0] && j === this.goal[1]) {
                process.stdout.write("B")
            }
            else if (solution !== undefined && this.contains_state(solution, [i,j])) { // complete
                process.stdout.write("*")
            }
            else {
                process.stdout.write(" ")
            }
        }
        process.stdout.write("\n")
    }
    process.stdout.write("\n")
}

/**
 * Returns the set of actions that can be executed in state.
 * @param {currentState} state current state.
 */
Maze.prototype.neighbors = function(state) {
    [row, col] = state
    let candidates = {
        up: [row - 1, col],
        down: [row + 1, col],
        left: [row, col - 1],
        right: [row, col + 1],
    }

    let result = []
    Object.entries(candidates).forEach(([action, [r,c]]) => {
        
        if (r >= 0 && r < this.height && c >= 0 && c < this.width && !this.walls[r][c]){
            const availableActions = {}
            Object.defineProperty(availableActions, action, { 
                enumerable: true, 
                writable: false, 
                value: [r,c]
            })
            result.push(availableActions)
        }
    })
    this.result = result
    return this.result
}

/**
 * Finds a solution to maze, if one exists.
 */
Maze.prototype.solve = function() {

    // Keep track of number of states explored
    this.num_explored = 0

    // Initialize frontier to just the starting position
    const start = Node(this.start, undefined, undefined)
    let frontier = new StackFrontier()
    frontier.add(start)

    // Initialize an empty explored set
    this.explored = []

    // Keep looping until solution found
    while (true) {

        // If nothing left in frontier, then no path
        if (frontier.empty()) {
            console.log('No solution')
            return
        }

        // Choose a node from the frontier
        let node = frontier.remove()
        this.num_explored += 1

        // If node is the goal, then we have a solution
        if (node.state[0] == this.goal[0] && node.state[1] == this.goal[1]) {
            let actions = []
            let cells = []
            while (node.parent) {
                actions.push(node.action)
                cells.push(node.state)
                node = node.parent
            }
            this.solution = { actions: actions.reverse(), cells: cells.reverse() }
            return
        }

        // Mark node as explored
        this.explored.push(node.state)

        // Add neighbors to frontier
        let neighbors = this.neighbors(node.state)
        for (action of neighbors) {
            Object.entries(action).forEach(([action, state]) => {
                if (!frontier.contains_state(state) && !this.contains_state(this.explored, state)){
                    const child = Node(state, node, action)
                    frontier.add(child)
                }
            })
        }
    }
}

module.exports = Maze