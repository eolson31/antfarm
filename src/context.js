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
}

const context = new Context();
export default context;
