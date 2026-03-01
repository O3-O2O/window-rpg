let goInsdePage = 0


function changeGame(page, icon) {

    goInsdePage++

    // Lấy dữ liệu trong localStorage
    const savedPage = localStorage.getItem("openedGamePage");
    const savedIcon = localStorage.getItem("openedGameIcon");

    let finalPage;
    let finalIcon;

    // Nếu localStorage có game → ưu tiên dùng nó
    if (savedPage) {
        finalPage = savedPage;
        finalIcon = savedIcon || icon;
    } else {
        // Nếu chưa có thì dùng dữ liệu từ button
        finalPage = page + ".html";
        finalIcon = icon;

        // Lưu lại vào localStorage
        localStorage.setItem("openedGamePage", finalPage);
        localStorage.setItem("openedGameIcon", finalIcon);
    }

    setInterval(() => {

        goInsdePage = 0

    },1000)

    // Chuyển trang
    if(goInsdePage >= 2){

        window.location.href = finalPage;

    }
}
document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("openingGame");
    const icon = localStorage.getItem("openedGameIcon");
    const page = localStorage.getItem("openedGamePage");

    if (icon && page) {

        container.style.display = "flex"; // hoặc block

        container.innerHTML = `
    <div class="taskbar-app">
        <div class="taskbar-icon"
            onclick="window.location.href='${page}'"
            style="background-image:url('${icon}')">
        </div>
        <span class="close-app" onclick="closeApp()">✖</span>
    </div>
`;

    } else {
        container.style.display = "none";
    }

});

function closeApp() {

    // Xóa dữ liệu
    localStorage.removeItem("openedGameIcon");
    localStorage.removeItem("openedGamePage");

    // Xóa icon khỏi taskbar
    const container = document.getElementById("openingGame");
    container.innerHTML = "";
    container.style.display = "none";
}