export const ImageType = Object.freeze({
    DEFAULT: "./images/dirt.png",
});

export const Direction = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
});
export class DirtImage {
    constructor() {
        this.image_type = ImageType.DEFAULT;
    }

    get type() {
        return this.image_type;
    }

    get connection_directions() {
        switch (this.image_type) {
            case ImageType.DEFAULT:
                return [
                    Direction.UP,
                    Direction.DOWN,
                    Direction.LEFT,
                    Direction.RIGHT,
                ];
            default:
                throw new Error("Unknown image type when finding node connections for node: " + this);
        }
    }
}
