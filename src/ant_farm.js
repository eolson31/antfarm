
const dirt_width = 9;
const dirt_height = 7;

function createDirt() {
    const dirt_div = document.getElementById("dirt_container");

    for (let index_y = 0; index_y < dirt_height; index_y++) {
        // Create row div
        const row_div = document.createElement("div");
        row_div.classList.add("dirt_row");
        dirt_div.appendChild(row_div);
        // Add images to row
        for (let index_x = 0; index_x < dirt_width; index_x++) {
            const image = document.createElement("img");
            image.id = "dirt-" + index_y + "-" + index_x;
            image.src = "../images/dirt.png";
            image.classList.add("dirt_image")
            row_div.appendChild(image);
        }
    }
}