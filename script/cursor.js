

localStorage.removeItem("selectedCursor")

const cursorDiv = document.getElementById("custom-cursor")

// Di chuyển theo chuột
document.addEventListener("mousemove", (e) => {
    cursorDiv.style.left = e.clientX + "px"
    cursorDiv.style.top = e.clientY + "px"
})

const body = document.querySelector("body")

// Khi mua skin
function buySkin(id) {

    const selectedSkin = allSkins.find(skin => skin.id === id)
    if (!selectedSkin) return

    const cursorUrl = selectedSkin.profileImg

    localStorage.setItem("selectedCursor", cursorUrl)

    applyCursor(cursorUrl)

    alert("Skin applied!")

    alert("Because this is a beta version so cursor skin just apply only in the shop to ensure no error appear! Thanks for your pleasure")

    body.style.cursor = "none"
}

function applyCursor(url) {
    cursorDiv.style.backgroundImage = `url(${url})`
}

// Khi load trang
const savedCursor = localStorage.getItem("selectedCursor")
if (savedCursor) {
    applyCursor(savedCursor)
}