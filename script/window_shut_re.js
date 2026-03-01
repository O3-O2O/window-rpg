window.funcBtn = (called) => {
    window.location.href = `window_shut_re.html?mode=${called}`;
}

window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    

    const message = document.querySelector(".message");

    if (mode === "Shutdown") {
        message.innerHTML = "Windows is shutting down...";
    } else if (mode === "Restart") {
        message.innerHTML = "Windows is restarting...";
    }

    setTimeout(() => {
        document.getElementById("box").style.opacity = "0";
        document.body.classList.add("black-screen");

        setTimeout(() => {

            localStorage.removeItem("openedGameIcon");
            localStorage.removeItem("openedGamePage");

            if (mode === "Shutdown") {
                window.close();
                document.body.innerHTML = "";
            } else {
                window.location.href = "window.html";
            }

        }, 1500);

    }, 5000);

});