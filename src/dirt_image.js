export const ImageType = Object.freeze({
    DEFAULT: "images/dirt.png",
});

export const Direction = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
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
                    Direction.LEFT,
                    Direction.RIGHT,
                    Direction.UP,
                    Direction.DOWN,
                ];
            default:
                throw new Error("Unknown image type when finding node connections for node: " + this);
        }
    }
}
