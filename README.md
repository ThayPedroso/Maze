# Maze
 Solve maze using AI search algorithm. This project's agent finds the way through an maze from point A to point B, if one exists. The maze walls are represented by __#__ in the __maze.txt__ files. Two types of search are available: Depth-First Search and Breadth-First Search.

 ## node.js
A data structure that keeps track of:
- a state: configuration of the agent and its environment. Here is a position (x,y) in the Maze.
- a parent: the state from where current state came from.
- an action: choices that can be made in a state.

## stackFrontier.js
A frontier that implements a stack, last-in first-out data type, to a Depth-First Search.

## queueFrontier.js
A frontier that implements a queue, first-in first-out data type, to a Breadth-First Search.

## maze.js
Creates the maze and implements all functions associated.

## usage
> node index.js maze.txt

To use queue frontier, replace line 142 from maze.js for:

> let frontier = new QueueFrontier()

