import context from "./context.js";

export function refresh_info_bar() {
    const resources = document.getElementById("info_bar_resources")
    resources.textContent = context.food + " food";

    const strength = document.getElementById("info_bar_strength")
    strength.textContent = context.strength + " strength";
}

document.addEventListener("DOMContentLoaded", () => {
    const refreshButton = document.querySelector("button");
    refreshButton.addEventListener("click", refresh_info_bar);
})
