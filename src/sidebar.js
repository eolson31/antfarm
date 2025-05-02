import { dig } from "./ant_farm.js";
import { shop_items } from "./shop_items.js";
import { currently_building, building_queue } from "./ant_farm.js";

let sidebar_shown = true;

function purchase_item(event) {
    const shop_item = event.target.name;
    building_queue.push(shop_item);
    if (!currently_building) {
        dig();
    }
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
        shop_item.innerHTML = `${item.name}<br><span class="item_price">${item.price}🫘</span>`
        shop_item.classList.add("sidebar_item");
        shop_item.addEventListener("click", purchase_item);
    
        sidebar_items.appendChild(shop_item);
    });
})
