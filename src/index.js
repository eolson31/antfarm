let sidebar_shown = true;

document.addEventListener("DOMContentLoaded", () => {
    const toggle_sidebar_button = document.getElementById("toggle_sidebar_button");
    const sidebar = document.getElementById("sidebar_container");
    
    toggle_sidebar_button.addEventListener("click", () => {
        if (sidebar_shown) {
            sidebar.classList.add("hide");
            toggle_sidebar_button.textContent = ">";
        } else {
            sidebar.classList.remove("hide");
            toggle_sidebar_button.textContent = "<";
        }
        sidebar_shown = !sidebar_shown
    });
})