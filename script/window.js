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


window.funcLoading = async () => {

    const container = document.getElementById("openingGame");

    const icon = localStorage.getItem("openedGameIcon");
    const page = localStorage.getItem("openedGamePage");
    const openPC = localStorage.getItem("myPCOpen");

    container.innerHTML = "";
    container.style.display = "none";

    if (icon && page) {

        container.style.display = "flex";

        container.innerHTML += `
        <div class="taskbar-app">
            <div class="taskbar-icon"
                onclick="window.location.href='${page}'"
                style="background-image:url('${icon}')">
            </div>
            <span class="close-app" onclick="closeApp()">✖</span>
        </div>
        `;
    }

    if (openPC) {

        container.style.display = "flex";

        container.innerHTML += `
        <div class="taskbar-app">
            <div class="taskbar-icon"
                onclick="windowComputerInner()"
                style="background-image:url('${openPC}')">
            </div>
            <span class="close-app" onclick="deletePC()">✖</span>
        </div>
        `;
    }

    const savedddBg = localStorage.getItem("desktopBackground");

    if (savedddBg) {
        const desktop = document.querySelector(".window-main");
        desktop.style.background = savedddBg;
        desktop.style.backgroundSize = "cover";
        desktop.style.backgroundPosition = "center";
    }

}

document.addEventListener("DOMContentLoaded",funcLoading);

function closeApp() {

    // Xóa dữ liệu
    localStorage.removeItem("openedGameIcon");
    localStorage.removeItem("openedGamePage");

    // Xóa icon khỏi taskbar
    funcLoading()
}

const box = document.getElementById("comZone");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

box.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
    box.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    box.style.left = (e.clientX - offsetX) + "px";
    box.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    box.style.cursor = "grab";
});


const myPC = document.getElementById("comZone")
let counting = 0
const myPCPic = "../UI/windows-xp-others-pngs-icons-arbeitsplatz-png-icon-thumbnail-removebg-preview__1_-removebg-preview.png"

window.windowComputer = async () => {

    counting++

    if(counting >= 2){

        myPC.classList.remove("minus")

        localStorage.setItem("myPCOpen", myPCPic)

        funcLoading()

    }else{

        setTimeout(() => {

            counting = 0

        },1000)

    }

}

window.windowComputerInner = async () => {

    if(myPC.classList.contains("minus")){

        myPC.classList.remove("minus")

    }else{

        myPC.classList.add("minus")

    }

}

window.closingPC = async () => {

    myPC.classList.add("minus")

}

window.deletePC = () => {

    myPC.classList.add("minus");
    myPC.style.top = "25vh";
    myPC.style.left = "25vw";

    localStorage.removeItem("myPCOpen");

    funcLoading()
}

window.bgChangeGradient = (gradient) => {

    const desktop = document.querySelector(".window-main");

    desktop.style.background = gradient;
    desktop.style.backgroundSize = "cover";
    desktop.style.backgroundPosition = "center";

    // 🔥 LƯU
    localStorage.setItem("desktopBackground", gradient);

}

window.resetBg = async () => {

    const desktop = document.querySelector(".window-main");

    desktop.style.background = "url('../Picture/xp_window_bg.jpg')"
    desktop.style.backgroundSize = "cover";
    desktop.style.backgroundPosition = "center";

    localStorage.removeItem("desktopBackground")
}