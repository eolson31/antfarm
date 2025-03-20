import { DirtImage, Direction } from "./dirt_image.js";

const nodes = []; // 2d array to store node grid

class Node {
    constructor(element, row, column) {
        this.html_element = element;
        this.row = row;
        this.column = column;
        this.image = new DirtImage();
        this.connections = new Set();
    }

    get get_row() {
        return this.row;
    }

    get get_column() {
        return this.column;
    }

    get node_connections() {
        return this.connections;
    }

    add_connection(node) {
        this.connections.add(node);
    }

}

export function new_node(element, row, column) {
    if (!nodes[row]) {
        nodes[row] =[];
    }
    const new_node = new Node(element, row, column);
    nodes[row][column] = new_node;
    set_connections(new_node);
}

export function get_node(row, column) {
    return nodes[row][column];
}

function set_connections(node) {
    const row = node.get_row;
    const column = node.get_column;
    for (const direction of node.image.connection_directions) {
        switch (direction) {
            case Direction.UP:
                if (nodes[row - 1]) {
                    const connecting_node = nodes[row - 1][column];
                    node.add_connection(connecting_node);
                    connecting_node.add_connection(node);
                }
                break;
            case Direction.DOWN:
                if (nodes[row + 1]) {
                    const connecting_node = nodes[row + 1][column];
                    node.add_connection(connecting_node);
                    connecting_node.add_connection(node);
                }
                break;
            case Direction.LEFT:
                if (nodes[row][column - 1]) {
                    const connecting_node = nodes[row][column - 1];
                    node.add_connection(connecting_node);
                    connecting_node.add_connection(node);
                }
                break;
            case Direction.RIGHT:
                if (nodes[row][column + 1]) {
                    const connecting_node = nodes[row][column + 1];
                    node.add_connection(connecting_node);
                    connecting_node.add_connection(node);
                }
                break;
            case Default:
                throw new Error("Unknown direction found: " + direction)
        }
    }
}