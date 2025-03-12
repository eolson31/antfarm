let sidebar_shown = true;

function toggle_sidebar() {
    const sidebar = document.getElementById("sidebar");
    const close_button = document.getElementById("close_sidebar");

    if (sidebar_shown) {
        sidebar.classList.add("hide");
        close_button.textContent = ">";
    } else {
        sidebar.classList.remove("hide");
        close_button.textContent = "<";
    }
    sidebar_shown = !sidebar_shown
}

document.addEventListener("DOMContentLoaded", () => {
    const close_button = document.getElementById("close_sidebar");
    close_button.addEventListener("click", toggle_sidebar);
})