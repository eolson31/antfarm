import { get_node, get_adjacent_nodes } from "./node.js";
import { random_int } from "./random_number.js";
import { air_height, dirt_height, farm_width } from "./ant_farm.js";
import { ImageType } from "./image.js";

function get_source_node(location) {
    return get_node(location[0], location[1]);
}

function get_random_source_node() {
    do {
        var row = random_int(dirt_height) + air_height;
        var column = random_int(farm_width);
        var source_node = get_node(row, column)
    } while (at_target(source_node) || bfs(source_node).length > 4);
    return source_node;
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

function at_target(current_node) {
    const target_types = [ImageType.PATH, ImageType.BUILDING];
    return target_types.includes(current_node.image.image_type);
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
            if (adjacent_node !== undefined &&
                adjacent_node.image.image_type !== ImageType.AIR && adjacent_node.image.image_type !== ImageType.FOOD  && adjacent_node.image.image_type !== ImageType.GRASS) {
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


export function find_path(location=undefined) {
    const source_node = location === undefined ? get_random_source_node() : get_source_node(location);
    const path = bfs(source_node);
    return path.reverse();
}
