import { dig } from "./ant_farm.js";
import { shop_items, get_shop_item_by_name } from "./shop_items.js";
import { currently_building, building_queue } from "./ant_farm.js";
import context from "./context.js";

let sidebar_shown = true;
let building_counts = {}

function get_building_count(building_name) {
    return building_name in building_counts ? building_counts[building_name] : 0;
}

function purchase_item(event) {
    const shop_item = get_shop_item_by_name(event.target.name);
    const building_count = get_building_count(shop_item.name);

    if (context.food < shop_item.price || shop_item.max_count <= building_count) {
        return;
    }
    // Purchase
    context.sub_food(shop_item.price);
    building_counts[shop_item.name] = get_building_count(shop_item.name) + 1;
    update_shop_text(shop_item.name);
    building_queue.push(shop_item);
    if (!currently_building) {
        dig();
    }
}

export function update_shop_text(shop_item_name) {
    const item = get_shop_item_by_name(shop_item_name);
    const index = shop_items.indexOf(item);
    const shop_item = document.getElementById(index);
    // Create inner content with tooltip
    const max_text = item.max_count === 100 ? get_building_count(item.name) : `${get_building_count(item.name)}/${item.max_count}`
    shop_item.innerHTML = `
        ${item.name}<br>
        <span class="item_price">${item.price}🫘</span>
        <span class="tooltip">${item.description}</br>You have: ${max_text}</span>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const toggle_sidebar_button = document.getElementById("toggle_sidebar_button");
    const sidebar = document.getElementById("sidebar_container");
    
    toggle_sidebar_button.addEventListener("click", () => {
        if (sidebar_shown) {
            sidebar.classList.add("hide");
            toggle_sidebar_button.textContent = ">";
        } else {
            sidebar.classList.remove("hide");
            toggle_sidebar_button.textContent = "<";
        }
        sidebar_shown = !sidebar_shown
    });

    const sidebar_items = document.getElementById("sidebar_items");
    shop_items.map((item, index) => {
        const shop_item = document.createElement("button");

        shop_item.id = index;
        shop_item.name = item.name
        sidebar_items.appendChild(shop_item);
        update_shop_text(item.name);
        shop_item.classList.add("sidebar_item");
        shop_item.addEventListener("click", purchase_item);
    });
})
