import context from "./context.js";
import { get_shop_item_by_name } from "./shop_items.js";

export const Building = Object.freeze({
    HILL: 'hill',
    QUEEN_DEN: 'queen_den',
    FOOD_STORAGE: 'food_storage',
    ANT_DEN: 'ant_den',
});

export function get_building_from_path(image_path) {
    const split = image_path.split("/");
    const basename = split[split.length - 1].split(".")[0];
    return get_shop_item_by_name(basename);
}

export function handle_queen_den_built() {
    if (context.food > 0 && context.ants < context.max_ants) {
        context.sub_food(1);
        context.add_ant();
    }
}

export function handle_food_storage_built() {
    context.add_max_food(50);
}

export function handle_ant_den_built() {
    context.add_max_ant(5);
}
