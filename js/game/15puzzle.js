
// 数値代入用
var gameBoard = [[], [], [], []];
//初期関数
function init() {
    console.log("Welcome To 15 Puzzle!");
    var board = document.getElementById("gameboard");
    for (let i = 0; i < 4; i++) {
        var tr = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            var card = makeTableData(i * 4 + j + 1);
            tr.appendChild(card);
            if (i * 4 + j + 1 != 16) {
                gameBoard[i].push(i * 4 + j + 1);
            } else {
                gameBoard[i].push(0);
            }

        }
        board.appendChild(tr);
    }
    Shuffle(1000);
}

function makeTableData(num) {
    var card = document.createElement("td");
    // (0,0)     (0,3)
    //
    // (3,0)     (3,3)
    // 座標決定
    card.posX = Math.floor((num - 1) / 4);
    card.posY = Math.floor((num - 1) % 4);
    card.onclick = click;
    // posの値は変更しない

    // textContent と id を変更していく
    if (num != 16) {
        card.textContent = num;
        card.id = num;
    } else {
        card.id = 0;
    }
    return card;
}

function click(e) {
    var x = e.target.posX;
    var y = e.target.posY;
    Tap(x, y);
    ClearCheck();
}


// x,y をtapした時に可能であれば変更して不可能なら何もしない
function Tap(x, y) {
    var clickNumber = gameBoard[x][y];
    // 上が空白
    if (x > 0 && gameBoard[x - 1][y] == 0) {
        gameBoard[x - 1][y] = clickNumber;
        gameBoard[x][y] = 0;
        var move = document.getElementById(0);
        var aa = document.getElementById(clickNumber);
        move.textContent = clickNumber;
        move.id = clickNumber;
        aa.textContent = "";
        aa.id = 0;
    }
    // 左が空白
    if (y > 0 && gameBoard[x][y - 1] == 0) {
        gameBoard[x][y - 1] = clickNumber;
        gameBoard[x][y] = 0;
        var move = document.getElementById(0);
        var aa = document.getElementById(clickNumber);
        move.textContent = clickNumber;
        move.id = clickNumber;
        aa.textContent = "";
        aa.id = 0;
    }
    // 下が空白
    if (x < 3 && gameBoard[x + 1][y] == 0) {
        gameBoard[x + 1][y] = clickNumber;
        gameBoard[x][y] = 0;
        var move = document.getElementById(0);
        var aa = document.getElementById(clickNumber);
        move.textContent = clickNumber;
        move.id = clickNumber;
        aa.textContent = "";
        aa.id = 0;
    }
    // 上が空白
    if (y < 3 && gameBoard[x][y + 1] == 0) {
        gameBoard[x][y + 1] = clickNumber;
        gameBoard[x][y] = 0;
        var move = document.getElementById(0);
        var aa = document.getElementById(clickNumber);
        move.textContent = clickNumber;
        move.id = clickNumber;
        aa.textContent = "";
        aa.id = 0;
    }
}
// times 回shuffleする
function Shuffle(times) {
    for (let i = 0; i < times; i++) {
        var x = Math.floor(Math.random() * 4);
        var y = Math.floor(Math.random() * 4);
        Tap(x, y);
    }
}

function ClearCheck() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var num = i * 4 + j + 1;
            var num2 = gameBoard[i][j];
            if (num == 16) {
                var mes = document.getElementById("title");
                mes.textContent = "clear";
            }
            if (gameBoard[i][j] == num) {
                continue;
            } else {
                return;
            }
        }
    }
}