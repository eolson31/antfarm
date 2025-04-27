import { new_node, create_hill } from "./node.js";
import { initialize_start_nodes, find_path } from "./path_finding.js";
import { ImageType } from "./image.js";

export const farm_width = 9;
export const air_height = 2;
export const dirt_height = 5;
export const farm_height = air_height + dirt_height;

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

    for (let row = 0; row < farm_height; row++) {
        // Create row div
        const row_div = document.createElement("div");
        row_div.classList.add("dirt_row");
        dirt_div.appendChild(row_div);
        // Add images to row
        for (let column = 0; column < farm_width; column++) {
            const image = document.createElement("img");
            if (row < air_height) {
                var image_type = ImageType.AIR
            } else {
                var image_type = ImageType.DIRT
            }
            let node = new_node(image, row, column, image_type);
            image.id = "dirt-" + row + "-" + column;
            image.classList.add("dirt_image");
            image.addEventListener("click", dirt_clicked);
            row_div.appendChild(image); 
        }
    }
    create_hill(air_height - 1, Math.floor(farm_width / 2));
    initialize_start_nodes();
});
