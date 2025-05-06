import { recalculate_build_delay } from "./ant_farm.js";
import { get_cookie, set_cookie } from "./cookies.js";
import { refresh_info_bar } from "./info_bar.js"

class Context {
    constructor() {
        let cookie = get_cookie("food");
        this.food = cookie !== null ? Number(cookie) : 300;
        cookie = get_cookie("max_food");
        this.max_food = cookie !== null ? Number(cookie) : 10;
        cookie = get_cookie("ants");
        this.ants = cookie !== null ? Number(cookie) : 3;
        cookie = get_cookie("max_ants");
        this.max_ants = cookie !== null ? Number(cookie) : 5;
    }

    add_food() {
        this.food++;
        set_cookie("food", this.food);
        refresh_info_bar();
    }

    sub_food(count) {
        this.food -= count;
        set_cookie("food", this.food);
        refresh_info_bar();
    }

    add_max_food(count) {
        this.max_food += count;
        refresh_info_bar();
    }

    add_ant() {
        this.ants++;
        set_cookie("ants", this.ants);
        refresh_info_bar();
        recalculate_build_delay();
    }

    add_max_ant(count) {
        this.max_ants += count;
    }
}

const context = new Context();
export default context;
