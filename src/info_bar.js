import context from "./context.js";

export function refresh() {
    const resources = document.getElementById("info_bar_resources")
    resources.textContent = context.foodCount + " food";

    const strength = document.getElementById("info_bar_strength")
    strength.textContent = context.hillStrength + " strength";
}

document.addEventListener("DOMContentLoaded", () => {
    const refreshButton = document.querySelector("button");
    refreshButton.addEventListener("click", refresh);
})