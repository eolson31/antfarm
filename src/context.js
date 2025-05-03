import { refresh_info_bar } from "./info_bar.js"

class Context {
    constructor() {
        this.food = 1000;
        this.ants = 5;
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
}

const context = new Context();
export default context;
