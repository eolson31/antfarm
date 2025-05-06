import { Building, handle_food_storage_built, handle_queen_den_built, handle_ant_den_built } from "./buildings.js";
import { new_node, create_hill, update_path_image, get_node, save_nodes_as_cookie } from "./node.js";
import { find_path } from "./path_finding.js";
import { ImageType } from "./image.js";
import { random_int } from "./random_number.js";
import context from "./context.js";

export const farm_width = 15;
export const air_height = 2;
export const dirt_height = 8;
export const farm_height = air_height + dirt_height;
let build_delay = 1000;

export let currently_building = false;
export let building_queue = []

export function recalculate_build_delay() {
    build_delay = Math.max(100, 5000 - (context.ants * 5));
}

function parse_dirt_name(name) {
    const split_name = name.split("-");
    return [split_name[1], split_name[2]];
}

function node_clicked(event) {
    const location = parse_dirt_name(event.target.id)
    const node = get_node(location[0], location[1]);
    // Food clicked
    if (node.image.image_type === ImageType.FOOD && context.food < context.max_food) {
        // Shake image
        event.target.classList.remove("shake_image");
        event.target.offsetWidth;
        event.target.classList.add("shake_image");
        
        node.image.health--;
        context.add_food()
        if (node.image.health <= 0) {
            node.image.set_type(ImageType.AIR);
            node.refresh_image();
        }
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

            image.addEventListener("click", node_clicked);
            row_div.appendChild(image); 
        }
    }
    create_hill(air_height - 1, Math.floor(farm_width / 2));
    setInterval(place_food, (random_int(30) + 30) * 100);
    save_nodes_as_cookie();
    recalculate_build_delay();
});

export function handle_completed_building(building) {
    switch (building.type) {
        case Building.QUEEN_DEN:
            setInterval(handle_queen_den_built, 30000);
            break;
        case Building.FOOD_STORAGE:
            handle_food_storage_built();
            break;
        case Building.ANT_DEN:
            handle_ant_den_built();
            break;
        default:
            console.error(`Building ${building.type} has no completed handler`)
            break;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function dig() {
    currently_building = true;
    let building = building_queue.pop();
    const path = find_path();
    // Set nodes as a path
    for (let index = 0; index < path.length - 1; index++) {
        const node = path[index];
        if (node.image.image_type !== ImageType.BUILDING) {
            node.set_as_path();
        }
    }
    // Put building image
    let building_node = path[path.length - 1];
    building_node.set_as_building(building.name);
    // Update path images
    for (let index = 0; index < path.length - 1; index++) {
        const node = path[index];
        if (node.image.image_type === ImageType.PATH) {
            node.reset_rotation();
            node.shake();
            await delay(build_delay);
            update_path_image(node);
            node.stop_shake();
        }
    }
    building_node.reset_rotation();
    building_node.shake();
    await delay(build_delay);
    building_node.refresh_image();
    building_node.stop_shake();
    handle_completed_building(building);
    save_nodes_as_cookie();
    // Check if need to build next building
    if (building_queue.length !== 0) {
        dig();
    }
    currently_building = false;
}

function place_food() {
    let row = air_height - 1;
    let column = random_int(farm_width);
    let node = get_node(row, column);
    if (node.image.image_type === ImageType.AIR) {
        node.image.set_as_food()
        node.refresh_image()
    }
}
