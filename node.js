/**
 * Create node object
 * @param {State} state 
 * @param {ParentNode} parent 
 * @param {Action} action 
 */
function Node (state, parent, action) {
    return {
        state,
        parent,
        action,
    }
}

module.exports = Node