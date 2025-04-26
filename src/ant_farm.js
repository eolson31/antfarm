import { new_node } from "./node.js";
import { initialize_start_nodes, find_path } from "./path_finding.js";

export const dirt_width = 9;
export const dirt_height = 7;

function parse_dirt_name(name) {
    const split_name = name.split("-");
    return [split_name[1], split_name[2]];
}

function dirt_clicked(event) {
    const location = parse_dirt_name(event.target.id)
    const path = find_path(location);
    for (const node of path) {
        node.element.classList.add("image_darken");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const dirt_div = document.getElementById("dirt_grid");

    for (let row = 0; row < dirt_height; row++) {
        // Create row div
        const row_div = document.createElement("div");
        row_div.classList.add("dirt_row");
        dirt_div.appendChild(row_div);
        // Add images to row
        for (let column = 0; column < dirt_width; column++) {
            const image = document.createElement("img");
            let node = new_node(image, row, column);
            image.id = "dirt-" + row + "-" + column;
            image.src = node.get_image;
            image.classList.add("dirt_image")
            image.addEventListener("click", dirt_clicked)
            row_div.appendChild(image);

            
        }
    }
    initialize_start_nodes()
});
