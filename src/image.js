export const Direction = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
});
export const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
const direction_names = ["UP", "DOWN", "LEFT", "RIGHT"]


export const ImageType = Object.freeze({
    DIRT: 0,
    PATH: 1,
    BUILDING: 2,
    AIR: 3,
    FOOD: 4,
});

function image_path_map(image_type, connection_directions=undefined, type=undefined) {
    switch (image_type) {
        case ImageType.DIRT:
            return "images/dirt.png";
        case ImageType.PATH:
            let stringified = connection_directions.map(direction => direction_names[direction]).join('-');
            return "images/paths/" + stringified + ".png";
        case ImageType.BUILDING:
            return "images/buildings/" + type + ".gif";
        case ImageType.FOOD:
            return "images/food/" + type + ".png";
        case ImageType.AIR:
            return "images/air.png"
    }
}


export class Image {
    constructor(image_type) {
        this.image_type = image_type;
        this.image_path = image_path_map(this.image_type)
        this.health = -1;
    }

    get type() {
        return this.image_type;
    }

    get connection_directions() {
        switch (this.image_type) {
            case ImageType.DIRT:
                return [
                    Direction.LEFT,
                    Direction.RIGHT,
                    Direction.UP,
                    Direction.DOWN,
                ];
            case ImageType.AIR:
                return [];
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

    set_as_food() {
        this.image_type = ImageType.FOOD;
        this.image_path = image_path_map(this.image_type, undefined, "food");
        this.health = 5;
    }
}

export function json_to_image_object(json) {
    const image = new Image()
    image.image_type = json.image_type;
    image.image_path = json.image_path;
    image.health = json.health;
    return image;
}
