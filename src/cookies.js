export function set_cookie(name, value) {
    const expiration_date = new Date()
    expiration_date.setMonth(expiration_date.getMonth() + 6);
    document.cookie = `${name}=${value};expires=${expiration_date.toUTCString()};path=/`;
}

export function get_cookie(name) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
