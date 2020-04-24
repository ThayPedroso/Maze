const Maze = require('./maze')

let myArgs = process.argv.slice(2)

if (myArgs.length !== 1) {
    console.error('Usage: node index maze.txt')
    return
}

const m = new Maze(myArgs[0])
process.stdout.write("Maze:")
process.stdout.write("\n")
m.print()
process.stdout.write("Solving...")
process.stdout.write("\n")
m.solve()
console.log(`States explored: ${m.num_explored}`)
process.stdout.write("Solution:")
process.stdout.write("\n")
m.print()
