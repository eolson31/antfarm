// Floats
export function random_float(min, max) {
    return Math.random() * (max - min) + min;
}

// Ints
export function random_int(max) {
    return Math.floor(Math.random() * max);
}