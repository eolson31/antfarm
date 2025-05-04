import { Image, directions, ImageType } from "./image.js";
import { Building } from "./buildings.js";


const nodes = []; // 2d array to store node grid

class Node {
    constructor(element, row, column, image_type) {
        this.html_element = element;
        this.row = row;
        this.column = column;
        this.image = new Image(image_type);
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

    add_connection(node, index) {
        this.connections[index] = node;
    }

    reset_rotation() {
        this.html_element.style.transform = `rotate(0deg)`
    }

    set_as_path() {
        this.image.set_type(ImageType.PATH, false);
    }

    set_as_building(building) {
        this.image.set_type(ImageType.BUILDING);
        this.image.update_building_type(building);
    }

    refresh_image() {
        this.html_element.src = this.get_image;
    }
}

export function new_node(element, row, column, image_type) {
    if (!nodes[row]) {
        nodes[row] =[];
    }
    const new_node = new Node(element, row, column, image_type);
    nodes[row][column] = new_node;
    new_node.refresh_image();
    return new_node;
}

export function get_node(row, column) {
    return nodes[row][column];
}

export function create_hill(row, column) {
    let hill_node = get_node(row, column)
    hill_node.set_as_building(Building.HILL);
    hill_node.refresh_image();
}

export function get_adjacent_nodes(node) {
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

export function update_path_image(node) {
    let adjacent_nodes = get_adjacent_nodes(node);
    let connection_directions = [];
    // Find which nodes need to connect with
    for (let index in adjacent_nodes) {
        const connection_nodes = [ImageType.PATH, ImageType.BUILDING];
        if (adjacent_nodes[index] !== undefined && connection_nodes.includes(adjacent_nodes[index].image.image_type)) {
            connection_directions.push(directions[index]);
        }
    }
    // Update image
    node.image.update_path_type(connection_directions);
    node.refresh_image()
}
