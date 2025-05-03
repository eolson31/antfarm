import { refresh_info_bar } from "./info_bar.js"

class Context {
    constructor() {
        this.food = 1000;
        this.max_food = 10;
        this.ants = 3;
        this.max_ants = 5;
        this.strength = 0;
    }

    add_food() {
        this.food++;
        refresh_info_bar();
    }

    sub_food(count) {
        this.food -= count;
        refresh_info_bar();
    }

    add_max_food(count) {
        this.max_food += count;
        refresh_info_bar();
    }

    add_ant() {
        this.ants++;
        refresh_info_bar();
    }

    add_max_ant(count) {
        this.max_ants += count;
    }
}

const context = new Context();
export default context;
