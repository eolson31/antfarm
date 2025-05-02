import { dig } from "./ant_farm.js";

const item1 = {name: "item1"};
const item2 = {name: "item2"};
const item3 = {name: "item3"};

let sidebar_shown = true;
const shop_items = [item1, item2, item3]


function purchase_item(event) {
    const shop_item = event.target.name;
    dig(shop_item);
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
        shop_item.textContent = item.name;
        shop_item.classList.add("sidebar_item");
        shop_item.addEventListener("click", purchase_item);
    
        sidebar_items.appendChild(shop_item);
    });
})
