var board = []
var score = 0;
var i2048 = false
var highscore;
var moves = 0;
function noToExp(no,a){
    if (no == 1 || no == 0){return a}
    return noToExp(no/2,a+1)
}
function noToCss(no){
    if (no == 2 || no == 4){return "x_1"}
    else {return "x_" + noToExp(no,0)}
    
}
function howto(){
    window.location = "#msg_popup"
    document.getElementById("msg_popup_txt").innerText = "How To Play?"
    document.getElementById("msg_popup_content").innerText = "Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!"

}
function win(){
    window.location = "#msg_popup"
    document.getElementById("msg_popup_txt").innerText = "You Win!"
    document.getElementById("msg_popup_content").innerText = "You Can Continue Playing to get the highest highscore!"
}
function lose(){
    window.location = "#msg_popup"
    document.getElementById("msg_popup_txt").innerText = "You Lost!"
    document.getElementById("msg_popup_content").innerText = "Press The New Game Button To Restart"
}
function boardToTile(){
    document.getElementById("player").innerHTML = ""
    for (var i = 0;i<4;i++){
        for (var j = 0;j<4;j++){
            r = board[i][j]
            if (r == 0){r = ""}
            if (r== 2048){i2048 = true}
            document.getElementById("player").insertAdjacentHTML("beforeend",'<span class = "tile '+noToCss(r)+'" id = "t'+i+'-'+j+'">'+r+'</span>')
        }
    }
    document.getElementById("score").innerText = score
    if (i2048){alert("You Win! You Can Now Go On To Get The Highest Score!");i2048=false}
    if (highscore<score){highscore = score;localStorage.setItem("highscore",score);document.getElementById("highscore").innerText = highscore}
}
function newGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    moves = 0;
    score = 0;
    document.getElementById("moves").innerText = moves
    boardToTile()
    randomNum()
}
function removeZero(row){
    return row.filter(num => num !=0)
}
function move(row){
    row = removeZero(row)
    for (let i =0;i<row.length;i++){
        if (row[i]==row[i+1]){
            row[i] = row[i]*2
            score+=row[i]
            row[i+1]=  0
        }
    }
    row = removeZero(row)
    while (row.length < 4){
        row.push(0)
    }
    return row
}
function left(){
    for (let i =0;i<4;i++){
        board[i] = move(board[i])
    }
    boardToTile()
}
function right(){
    for (let i =0;i<4;i++){
        board[i] = move(board[i].reverse()).reverse()
    }
    boardToTile()
}
function up(){
    for (let i =0;i<4;i++){
        j = [board[0][i],board[1][i],board[2][i],board[3][i]]
        k = move(j)
        for (let n = 0;n<4;n++){
            board[n][i] = k[n]
        }
    }
    boardToTile()
}
function down(){
    for (let i =0;i<4;i++){
        j = [board[3][i],board[2][i],board[1][i],board[0][i]]
        k = move(j).reverse()
        for (let n = 3;n>-1;n--){
            board[n][i] = k[n]
        }
    }
    boardToTile()
    boardToTile()
}
function randomNum(){
    try{
        allowed = 2;
        free = []
        for (var i = 0;i<4;i++){
            for (var j = 0;j<4;j++){
                if (board[i][j]==0){free.push({x:i,y:j})}
        }}
        coords = free[parseInt(Math.random()*(free.length))]
        board[coords.x][coords.y] = 2;
        document.getElementById("t"+coords.x+"-"+coords.y).innerText = 2;
        document.getElementById("t"+coords.x+"-"+coords.y).classList.add("x_1")
    }catch {
        alert("Possible Lose")
    }

}
window.onload = function(){
    highscore = window.localStorage.getItem("highscore")
    document.getElementById("highscore").innerText = highscore
    newGame()
}
function m(){
    moves++;
    document.getElementById("moves").innerText = moves
}
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        left();
        m()
        randomNum()
    }
    else if (e.code == "ArrowRight") {
        right();
        m()
        randomNum()
    }
    else if (e.code == "ArrowUp") {
        up();
        m()
        randomNum()

    }
    else if (e.code == "ArrowDown") {
        down();
        m()
        randomNum()
    }
    document.getElementById("score").innerText = score;
})