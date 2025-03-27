import {find_path} from "./digging.js"

const item1 = {name: "item1"};
const item2 = {name: "item2"};
const item3 = {name: "item3"};

const shop_items = [item1, item2, item3]


function purchase_item(event) {
    const shop_item = event.target.name
    const path = find_path()
    for (const node of path) {
        node.element.classList.add("image_darken");
    }
    path[0].element.src = "images/" + shop_item + ".png";
}

document.addEventListener("DOMContentLoaded", () => {
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
});

