export const Direction = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
});
export const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
const direction_names = ["UP", "DOWN", "LEFT", "RIGHT"]


export const ImageType = Object.freeze({
    DEFAULT: 0,
    PATH: 1,
    BUILDING: 2,
});

function image_path_map(image_type, connection_directions=undefined, building=undefined) {
    switch (image_type) {
        case ImageType.DEFAULT:
            return "images/dirt.png";
        case ImageType.PATH:
            let stringified = connection_directions.map(direction => direction_names[direction]).join('-');
            return "images/paths/" + stringified + ".png";
        case ImageType.BUILDING:
            return "images/buildings/" + building + ".png";
    }
}


export class DirtImage {
    constructor() {
        this.image_type = ImageType.DEFAULT;
        this.image_path = image_path_map(this.image_type)
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

    set_type(type, update_path = true) {
        this.image_type = type;
        if (update_path) {
            this.image_path = image_path_map(this.image_type)
        }
    }

    update_path_type(connection_directions) {
        this.image_path = image_path_map(this.image_type, connection_directions);
    }

    update_building_type(building) {
        this.image_path = image_path_map(this.image_type, undefined, building);
    }
}
