// Không áp dụng cho window và shutdown
const excludedPages = [
    "window.html",
    "window_shut_re.html"
];

// Lấy tên file hiện tại
const currentPage = window.location.pathname.split("/").pop();

// Nếu KHÔNG phải window
if (!excludedPages.includes(currentPage)) {

    window.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            // Lưu lại trang hiện tại
            localStorage.setItem("openedGamePage", currentPage);

            // Nếu bạn có icon riêng từng trang
            // Có thể set icon ở đây (optional)
            if (!localStorage.getItem("openedGameIcon")) {
                localStorage.setItem(
                    "openedGameIcon",
                    "../Picture/default_icon.png"
                );
            }

            window.location.href = "window.html";
        }

    });

}