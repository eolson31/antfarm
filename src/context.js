import { refresh } from "./info_bar.js"

class Context {
    constructor() {
        this.food = 0;
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
        refresh();
    }
}

const context = new Context();
export default context;
