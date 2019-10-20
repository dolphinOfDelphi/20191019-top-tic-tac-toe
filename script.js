const board = (() => {
    let player1Field = document.querySelector("#player-1-box > input");
    let player2Field = document.querySelector("#player-2-box > input");
    let messageDiv = document.querySelector("#message-display");
    let player1Turn;
    let move;
    let boxes;

    function activate(div) {
        div.classList.add("active");
        div.classList.remove("inactive");
    }

    function check() {
        return (check3(boxes[0], boxes[1], boxes[2])
            || check3(boxes[3], boxes[4], boxes[5])
            || check3(boxes[6], boxes[7], boxes[8])
            || check3(boxes[0], boxes[3], boxes[6])
            || check3(boxes[1], boxes[4], boxes[7])
            || check3(boxes[2], boxes[5], boxes[8])
            || check3(boxes[0], boxes[4], boxes[8])
            || check3(boxes[2], boxes[4], boxes[6]));
    }

    function check3(...plays) {
        return plays[0] !== 0
            && plays[0] === plays[1]
            && plays[1] === plays[2];
    }

    function conclude() {
        messageDiv.textContent = `${player1Turn
            ? player1Field.value : player2Field.value} wins!`;
    }

    function deactivate(div) {
        div.classList.add("inactive");
        div.classList.remove("active");
    }

    function reset() {
        let boardDiv = document.querySelector("#board");

        player1Turn = true;
        move = 0;
        boxes = [];
        while (boardDiv.lastChild) boardDiv.removeChild(boardDiv.lastChild);
        for (let i = 0; i < 9; i++) {
            boxes.push(0);
            let boxDiv = document.createElement("div");
            boxDiv.classList.add("game-box");
            boxDiv.addEventListener("click", () => {
                if (boxes[i] === 0) {
                    boxes[i] = player1Turn ? 1 : -1;
                    boxDiv.textContent = player1Turn ? "❌" : "⭕";
                    move++;

                    if (check()) conclude();
                    else if (move === 9) tie();
                    else {
                        player1Turn = !player1Turn;
                        update();
                    }
                }
            });
            boardDiv.appendChild(boxDiv);
        }
        update();
    }

    function tie() {
        messageDiv.textContent = "Tie!";
    }

    function update() {
        let player1Box = document.querySelector("#player-1-box");
        let player2Box = document.querySelector("#player-2-box");
        if (player1Turn) {
            messageDiv.textContent = `${player1Field.value}'s turn.`;
            activate(player1Box);
            deactivate(player2Box);
        } else {
            messageDiv.textContent = `${player2Field.value}'s turn.`;
            deactivate(player1Box);
            activate(player2Box);
        }
    }

    return {reset};
})();

document.querySelector("#new-game-button").addEventListener("click", () => {
    board.reset();
});

board.reset();