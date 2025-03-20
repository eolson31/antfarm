import { new_node } from "./node.js";
import { initialize_start_nodes } from "./digging.js";

const dirt_width = 9;
const dirt_height = 7;

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
            image.id = "dirt-" + row + "-" + column;
            image.src = "../images/dirt.png";
            image.classList.add("dirt_image")
            row_div.appendChild(image);

            new_node(image, row, column);
            
        }
    }
    initialize_start_nodes()
});
