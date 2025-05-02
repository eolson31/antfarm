import { refresh_info_bar } from "./info_bar.js"

class Context {
    constructor() {
        this.food = 10;
        this.strength = 0;
    }

    get foodCount() {
        return this.food;
    }

    get hillStrength() {
        return this.strength;
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
