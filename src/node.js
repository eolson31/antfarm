import { Image, Direction, directions, ImageType } from "./dirt_image.js";
import {find_path} from "./path_finding.js"


const nodes = []; // 2d array to store node grid

class Node {
    constructor(element, row, column, image_type) {
        this.html_element = element;
        this.row = row;
        this.column = column;
        this.image = new Image(image_type);
        this.connections = [undefined, undefined, undefined, undefined];
    }

    get element() {
        return this.html_element;
    }

    get get_row() {
        return this.row;
    }

    get get_column() {
        return this.column;
    }

    get get_image() {
        return this.image.image_path;
    }

    get node_connections() {
        return this.connections;
    }

    add_connection(node, index) {
        this.connections[index] = node;
    }

    set_as_path() {
        this.image.set_type(ImageType.PATH, false);
    }

    set_as_building() {
        this.image.set_type(ImageType.BUILDING);
    }

    refresh_image() {
        this.element.src = this.get_image;
    }
}

export function new_node(element, row, column, image_type) {
    if (!nodes[row]) {
        nodes[row] =[];
    }
    const new_node = new Node(element, row, column, image_type);
    nodes[row][column] = new_node;
    set_connections(new_node);
    new_node.refresh_image();
    return new_node;
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
                    node.add_connection(connecting_node, Direction.UP);
                    connecting_node.add_connection(node, Direction.DOWN);
                }
                break;
            case Direction.DOWN:
                if (nodes[row + 1]) {
                    const connecting_node = nodes[row + 1][column];
                    node.add_connection(connecting_node, Direction.DOWN);
                    connecting_node.add_connection(node, Direction.UP);
                }
                break;
            case Direction.LEFT:
                if (nodes[row][column - 1]) {
                    const connecting_node = nodes[row][column - 1];
                    node.add_connection(connecting_node, Direction.LEFT);
                    connecting_node.add_connection(node, Direction.RIGHT);
                }
                break;
            case Direction.RIGHT:
                if (nodes[row][column + 1]) {
                    const connecting_node = nodes[row][column + 1];
                    node.add_connection(connecting_node, Direction.RIGHT);
                    connecting_node.add_connection(node, Direction.LEFT);
                }
                break;
            default:
                throw new Error("Unknown direction found: " + direction)
        }
    }
}

function get_adjacent_nodes(node) {
    let adjacent_nodes = [undefined, undefined, undefined, undefined];
    let row = node.get_row;
    let column = node.get_column;
    if (nodes[row - 1]) {
        adjacent_nodes[0] = (nodes[row - 1][column]);
    }
    if (nodes[row + 1]) {
        adjacent_nodes[1] = (nodes[row + 1][column]);
    }
    if (nodes[row][column - 1]) {
        adjacent_nodes[2] = (nodes[row][column - 1]);
    }
    if (nodes[row][column + 1]) {
        adjacent_nodes[3] = (nodes[row][column + 1]);
    }
    return adjacent_nodes;
}

function update_path_image(node) {
    let adjacent_nodes = get_adjacent_nodes(node);
    let connection_directions = [];
    // Find which nodes need to connect with
    for (let index in adjacent_nodes) {
        if (adjacent_nodes[index] !== undefined && adjacent_nodes[index].image.image_type !== ImageType.DIRT) {
            connection_directions.push(directions[index]);
        }
    }
    // Update image
    node.image.update_path_type(connection_directions);
    node.refresh_image()
}

function update_building_image(node, building) {
    node.image.update_building_type(building);
    node.refresh_image();
}

export function dig(building) {
    const path = find_path();
    // Set nodes as a path
    for (const node of path) {
        if (node.image.image_type !== ImageType.BUILDING) {
            node.set_as_path();
        }
    }
    // Put building image
    let building_node = path[0];
    building_node.set_as_building();
    update_building_image(building_node, building);
    // Update path images
    for (const row of nodes) {
        for (const node of row) {
            if (node.image.image_type === ImageType.PATH) {
                update_path_image(node);
            }
        }
    }
}
