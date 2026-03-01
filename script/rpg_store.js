if (!userSession) {
    window.location.href = "signIn_signUp.html";
}

let allSkins = []   // lưu toàn bộ skins

window.loadCart = async () => {

    const loadingCart = document.getElementById("cart-container")

    db.collection("skins")
        .orderBy("createdAt", "desc")
        .get()
        .then((insideData) => {

            allSkins = []   // reset mảng

            insideData.forEach((doc) => {
                allSkins.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            renderSkins(allSkins)   // render lần đầu
        })
}

// ===== Render Function =====
function renderSkins(list) {

    const loadingCart = document.getElementById("cart-container")
    let loadIn = ""

    list.forEach((data) => {

        loadIn += `
        <div class="cart-product">

            <img class="product-profile" src="${data.profileImg}">

            <span class="product-name">${data.profileName}</span>

            <span class="product-name">1$</span>

            <button onclick="buySkin('${data.id}')" class="buy-product">Purchase</button>

        </div>
        `
    })

    loadingCart.innerHTML = loadIn
}

loadCart()

const searchInput = document.getElementById("search-bar")

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase()

    const filtered = allSkins.filter((skin) =>
        skin.profileName.toLowerCase().includes(keyword)
    )

    renderSkins(filtered)
})