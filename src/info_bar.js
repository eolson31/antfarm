import context from "./context.js";

let info_bar_contents = {};

function refresh_info_bar_contents() {
    info_bar_contents = {
        "left": {
            "ant_count": `
            <span class="info_item ${context.ants >= context.max_ants ? 'text_red' : ''}">
                🐜${context.ants} Ants
                <span class="tooltip">
                    ${context.ants}/${context.max_ants} Worker Ants</br>
                    +${(context.ants * 5) / 1000}s build speed
                </span>
            </span>
            `,
        },
        "right": {
            "food":  `
            <span class="info_item ${context.food >= context.max_food ? 'text_red' : ''}">
                🫘${context.food} Food
                <span class="tooltip">${context.food}/${context.max_food} Food</span>
            </span>
            `,
        },
    }
}

export function refresh_info_bar() {
    refresh_info_bar_contents();

    for (const location in info_bar_contents) {
        for (const item in info_bar_contents[location]) {
            const text_element = document.getElementById(`info_bar_${item}`);
            text_element.innerHTML = info_bar_contents[location][item];
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    refresh_info_bar_contents();
    // Add all elements to the info bar
    for (const location in info_bar_contents) {
        const div = document.getElementById(`info_${location}`);
        for (const item in info_bar_contents[location]) {
            const text_element = document.createElement("p");
            text_element.id = `info_bar_${item}`;
            div.appendChild(text_element);
        }
    }
    refresh_info_bar();
})
