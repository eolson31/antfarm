let start_nodes = [{x: 4, y: 0}];

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
    return {x:0, y: 6};
}

function _nodes_equal(node1, node2) {
    return (node1.x === node2.x) && (node1.y === node2.y);
}

function get_adjacent_nodes(node) {
    return [
        {x: node.x, y: node.y + 1}, 
        {x: node.x, y: node.y - 1},
        {x: node.x + 1, y: node.y}, 
        {x: node.x - 1, y: node.y},
    ]
}

// Convert a node {x, y} to a unique string key
function _node_key(node) {
    return `${node.x},${node.y}`;
}

// Convert string key "x,y" back to {x, y} object
function _parse_key(key) {
    const [x, y] = key.split(",").map(Number);
    return { x, y };
}

function _reconstruct_path(came_from, end_node) {
    let path = [];
    let key = _node_key(end_node);

    while (key !== null) {
        path.push(_parse_key(key));  // Convert "x,y" string back to object
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
