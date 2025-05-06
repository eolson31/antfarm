import { Building } from "./buildings.js";

export let shop_items = []

export function init_shop_items() {
    shop_items = [
    {
        name: "Queen Den",
        type: Building.QUEEN_DEN,
        description: "Allows new ants to be born.",
        price: 5,
        max_count: 1,
    },
    {
        name: "Food Storage",
        type: Building.FOOD_STORAGE,
        description: "Increases the maximum amount of food that can be stored.",
        price: 10,
        max_count: 100,
    },
    {
        name: "Ant Den",
        type: Building.ANT_DEN,
        description: "Increases the amount of ants allowed in the colony.",
        price: 20,
        max_count: 100,
    },
    {
        name: "Harvestor",
        type: Building.HARVESTER,
        description: "Passively generates food for the colony.",
        price: 40,
        max_count: 100,
    },
    {
        name: "Food Processor",
        type: Building.FOOD_PROCESSOR,
        description: "Increases the amount of food gained from collected food.",
        price: 65,
        max_count: 100,
    },
]
}

export function get_shop_item_by_name(name) {
    for (const item of shop_items) {
        if (item.name === name) {
            return item;
        }
    }
}

document.addEventListener("DOMContentLoaded", init_shop_items);
