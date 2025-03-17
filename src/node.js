export const ImageType = Object.freeze({
    DEFAULT: 0,
})

export const nodes = [];

class Node {
    constructor(element, row, column) {
        this.html_element = element;
        this.row = row;
        this.column = column;
        this.image = "./images/dirt.png";
        this.image_type = ImageType.DEFAULT;
    }

    get rowNum() {
        return this.row;
    }

    get columnNum() {
        return this.column;
    }
}

export function new_node(element, row, column) {
    nodes.push(new Node(element, row, column));
}