import { get_node } from "./node.js";
import { random_int } from "./random_number.js";
import { dirt_height, farm_width } from "./ant_farm.js";

let target_nodes = new Set();

export function initialize_start_nodes() {
    target_nodes.add(get_node(0, 4));
}


function get_source_node(location) {
    return get_node(location[0], location[1]);
}

function _node_distance_is_acceptable(source_node, distance) {
    for (const target_node of target_nodes) {
        if ((Math.abs(source_node.get_row - target_node.get_row) + Math.abs(source_node.get_column - target_node.get_column)) <= distance) {
            return true
        }
    }
    return false
}

function get_random_source_node() {
    do {
        var row = random_int(dirt_height);
        var column = random_int(farm_width);
        var source_node = get_node(row, column)
    } while (!_node_distance_is_acceptable(source_node, 5) || at_target(source_node));
    return source_node;
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

function at_target(source_node) {
    for (const target_node of target_nodes) {
        if ((source_node.get_row === target_node.get_row) && (source_node.get_column === target_node.get_column)) {
            return true;
        }
    }
    return false;
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

function bfs(source_node) {
    const explored = new Set();
    const queue = [source_node];
    const came_from = new Map();
    let start_key = _node_key(source_node);

    explored.add(start_key);
    came_from.set(start_key, null);
    queue.push(source_node);

    while (queue.length > 0) {
        const current_node = queue.shift();
        const current_key = _node_key(current_node);
        // If current node is the end node
        if (at_target(current_node)) {
            return _reconstruct_path(came_from, current_node);
        }
        // Main search loop
        for (const adjacent_node of get_adjacent_nodes(current_node)) {
            if (adjacent_node !== undefined) {
                let adjacent_key = _node_key(adjacent_node);

                if (!explored.has(adjacent_key)) {
                    explored.add(adjacent_key);
                    came_from.set(adjacent_key, current_key);
                    queue.push(adjacent_node);
                }
            }
        }
    }
    throw new Error("No path found")
}

function update_source_nodes(path) {
    for (const node of path) {
        target_nodes.add(node);
    }
}

export function find_path(location=undefined) {
    const source_node = location === undefined ? get_random_source_node() : get_source_node(location);
    const path = bfs(source_node);
    update_source_nodes(path);
    return path;
}
