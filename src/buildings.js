import context from "./context.js";

export const Building = Object.freeze({
    HILL: 'hill',
    QUEEN_DEN: 'queen_den',
    FOOD_STORAGE: 'food_storage',
    ANT_DEN: 'ant_den',
});

export function handle_queen_building() {
    if (context.food > 0 && context.ants < context.max_ants) {
        context.sub_food(1);
        context.add_ant();
        console.log("hit")
    }
}
