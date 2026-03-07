// ========================
// GAME SETTINGS
// ========================

let size = 10        // kích thước board 10x10
let mines = 15       // số bomb
let board = []       // mảng lưu board
let gameOver = false

// lấy element board
let mineBoard = document.getElementById("mineBoard")




// ======================================================
// TẠO BOARD MỚI
// ======================================================
function createBoard(){

    gameOver = false          // reset trạng thái game
    board = []                // mảng lưu toàn bộ cell
    mineBoard.innerHTML = ""  // xóa board cũ trên HTML

    // tạo từng hàng
    for(let y=0;y<size;y++){

        board[y] = []

        // tạo từng ô trong hàng
        for(let x=0;x<size;x++){

            // object lưu trạng thái ô
            let cell = {
                mine:false,      // có bomb hay không
                revealed:false,  // ô đã được mở chưa
                flag:false,      // có cắm cờ không
                element:null     // thẻ div HTML
            }

            // tạo ô HTML
            const div = document.createElement("div")
            div.className = "mineCell"

            // click trái -> mở ô
            div.onclick = () => reveal(x,y)

            // click phải -> đặt cờ
            div.oncontextmenu = (e) => {

                e.preventDefault() // tắt menu chuột phải browser

                toggleFlag(x,y)

            }

            // thêm ô vào board HTML
            mineBoard.appendChild(div)

            // lưu element vào object
            cell.element = div

            // lưu cell vào mảng board
            board[y][x] = cell

        }

    }

    // đặt bomb random
    placeMines()
}

//////////////////////////////////////////////////////////
// ĐẶT / GỠ CỜ 🚩
//////////////////////////////////////////////////////////

function toggleFlag(x,y){

    const cell = board[y][x]

    // không cho đặt cờ ô đã mở
    if(cell.revealed) return

    // đảo trạng thái cờ
    cell.flag = !cell.flag

    // hiển thị cờ
    if(cell.flag){

        cell.element.innerText = "🚩"

    }else{

        cell.element.innerText = ""

    }

}

//////////////////////////////////////////////////////////
// ĐẶT BOMB RANDOM 💣
//////////////////////////////////////////////////////////

function placeMines(){

    let placed = 0

    // lặp cho tới khi đặt đủ bomb
    while(placed < mines){

        // random vị trí
        let x = Math.floor(Math.random()*size)
        let y = Math.floor(Math.random()*size)

        // nếu ô chưa có bomb
        if(!board[y][x].mine){

            board[y][x].mine = true
            placed++

        }

    }

    // hiển thị số bomb
    document.getElementById("mineCount").innerText = mines

}

//////////////////////////////////////////////////////////
// CLICK MỞ Ô
//////////////////////////////////////////////////////////

function reveal(x,y){

    // nếu game đã kết thúc thì không làm gì
    if(gameOver) return

    const cell = board[y][x]

    // không mở ô đã mở
    if(cell.revealed) return

    // không mở ô có cờ
    if(cell.flag) return

    //////////////////////////////////////////////////////
    // NẾU CLICK TRÚNG BOMB
    //////////////////////////////////////////////////////

    if(cell.mine){

        gameOver = true

        // hiện tất cả bomb
        showAllBombs()

        // 3 giây sau reset game
        setTimeout(() => {

            gameOver = false
            createBoard()

        },3000)

        return
    }

    //////////////////////////////////////////////////////
    // NẾU KHÔNG PHẢI BOMB
    //////////////////////////////////////////////////////

    floodFill(x,y)

}

//////////////////////////////////////////////////////////
// FLOOD FILL - MỞ NHIỀU Ô
//////////////////////////////////////////////////////////

function floodFill(x,y){

    // stack dùng để lưu ô cần mở
    const stack = [[x,y]]

    while(stack.length){

        const [cx,cy] = stack.pop()

        const cell = board[cy][cx]

        // nếu đã mở thì bỏ qua
        if(cell.revealed) continue

        // mở ô
        cell.revealed = true
        cell.element.classList.add("revealed")

        checkWin()

        // đếm bomb xung quanh
        const count = countMines(cx,cy)

        // nếu có bomb gần đó
        if(count > 0){

            cell.element.innerText = count
            continue

        }

        // nếu không có bomb -> mở tiếp các ô xung quanh
        for(let dy=-1;dy<=1;dy++){

            for(let dx=-1;dx<=1;dx++){

                const nx = cx + dx
                const ny = cy + dy

                // kiểm tra trong board
                if(nx>=0 && ny>=0 && nx<size && ny<size){

                    const neighbor = board[ny][nx]

                    if(!neighbor.revealed && !neighbor.mine && !neighbor.flag){

                        stack.push([nx,ny])

                    }

                }

            }

        }

    }

}

//////////////////////////////////////////////////////////
// ĐẾM SỐ BOMB XUNG QUANH
//////////////////////////////////////////////////////////

function countMines(x,y){

    let total = 0

    for(let dy=-1;dy<=1;dy++){
        for(let dx=-1;dx<=1;dx++){

            // bỏ ô trung tâm
            if(dx === 0 && dy === 0) continue

            const nx = x+dx
            const ny = y+dy

            if(nx>=0 && ny>=0 && nx<size && ny<size){

                if(board[ny][nx].mine) total++

            }

        }
    }

    return total
}

//////////////////////////////////////////////////////////
// LOAD GAME KHI MỞ TRANG
//////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

    mineBoard = document.getElementById("mineBoard")
    createBoard()

})

//////////////////////////////////////////////////////////
// HIỆN TẤT CẢ BOMB KHI THUA
//////////////////////////////////////////////////////////

function showAllBombs(){

    for(let y=0;y<size;y++){

        for(let x=0;x<size;x++){

            const cell = board[y][x]

            if(cell.mine){

                cell.element.classList.add("mine")
                cell.element.innerText = "💣"

            }

        }

    }

}

//////////////////////////////////////////////////////////
// KIỂM TRA THẮNG
//////////////////////////////////////////////////////////

function checkWin(){

    let revealedCount = 0

    for(let y=0;y<size;y++){

        for(let x=0;x<size;x++){

            const cell = board[y][x]

            if(cell.revealed) revealedCount++

        }

    }

    // nếu mở hết ô không phải bomb
    if(revealedCount === size*size - mines){

        gameOver = true

        showWinScreen()

    }

}

function showWinScreen(){

    const win = document.getElementById("winScreen")

    win.classList.add("show")

    setTimeout(() => {

        win.classList.remove("show")
        createBoard()

    },3000)

}