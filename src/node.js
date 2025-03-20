export const ImageType = Object.freeze({
    DEFAULT: "../images/dirt.png",
})

const nodes = []; // 2d array to store node grid

class Node {
    constructor(element, row, column) {
        this.html_element = element;
        this.row = row;
        this.column = column;
        this.image_type = ImageType.DEFAULT;
    }

    get getRow() {
        return this.row;
    }

    get getColumn() {
        return this.column;
    }

    node_connections() {
        switch (this.image_type) {
            case Default:
                return [
                    {row: this.row + 1, column: this.column}, 
                    {row: this.row - 1, column: this.column},
                    {row: this.row, column: this.column + 1}, 
                    {row: this.row, column: this.column - 1},
                ];
            default:
                throw new Error("Unknown image type when finding node connections for node: " + this)
        }
    }
}

export function new_node(element, row, column) {
    if (!nodes[row]) {
        nodes[row] =[];
    }
    nodes[row][column] = new Node(element, row, column);
}

export function get_node(row, column) {
    return nodes[row][column];
}
