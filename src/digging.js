import { get_node } from "./node.js";

let start_nodes = [];

export function initialize_start_nodes() {
    start_nodes.push(get_node(0, 4));
}

function get_start_node() {
    if (start_nodes.length === 0) {
        throw new Error("No starting nodes were found!");
    }
    const index = Math.floor(Math.random() * start_nodes.length);
    const node = start_nodes[index];
    start_nodes = start_nodes.splice(index, 1);
    return node;
}

function get_end_node() {
    return get_node(6, 0);
}

function _nodes_equal(node1, node2) {
    return (node1.get_row === node2.get_row) && (node1.get_column === node2.get_column);
}

function get_adjacent_nodes(node) {
    return node.node_connections;
}

// Convert a node {row, column} to a unique string key
function _node_key(node) {
    return `${node.get_row},${node.get_column}`;
}

// Convert string key "column,row" back to {column, row} object
function _parse_key(key) {
    const [row, column] = key.split(",").map(Number);
    return get_node(row, column);
}

function _reconstruct_path(came_from, end_node) {
    let path = [];
    let key = _node_key(end_node);

    while (key !== null) {
        path.push(_parse_key(key));  // Convert "row, column" string back to object
        key = came_from.get(key);  // Get parent key
    }

    return path.reverse();
}

function bfs(start_node, end_node) {
    const explored = new Set();
    const queue = [start_node];
    const came_from = new Map();
    let start_key = _node_key(start_node);

    explored.add(start_key);
    came_from.set(start_key, null);
    queue.push(start_node);

    while (queue.length > 0) {
        const current_node = queue.shift();
        const current_key = _node_key(current_node);
        // If current node is the end node
        if (_nodes_equal(current_node, end_node)) {
            return _reconstruct_path(came_from, end_node);
        }
        // Main search loop
        console.log(get_adjacent_nodes(current_node));
        for (const adjacent_node of get_adjacent_nodes(current_node)) {
            let adjacent_key = _node_key(adjacent_node);

            if (!explored.has(adjacent_key)) {
                explored.add(adjacent_key);
                came_from.set(adjacent_key, current_key);
                queue.push(adjacent_node);
            }
        }
    }
    throw new Error("No path found")
}

export function find_path() {
    const start_node = get_start_node();
    const end_node = get_end_node();
    return bfs(start_node, end_node);
}
