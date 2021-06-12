
const Player = (sign) => {
    this.sign = sign;
    const getSign = () => { return sign; }
    return { getSign };
}

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setCell = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getCell = (index) => {
        if (index > board.length) return;
        return board[index]
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setCell, getCell, reset };
})();

const display = (() => {
    const cells = document.querySelectorAll(".cell");
    const info = document.querySelector(".info");
    const restart = document.querySelector(".button");

    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            if (game.getIsOver() || e.target.textContent !== "") { return; }
            game.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        })
    });

    restart.addEventListener("click", (e) => {
        gameBoard.reset();
        game.reset();
        updateGameBoard();
        setInfo("Player X's turn");
    });

    const updateGameBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getCell(i);
        }
    };

    const setResultInfo = (winner) => {
        if (winner === "Draw") {
            setInfo("It's a draw!");
        }
        else {
            setInfo(`Player ${winner} has won!`);
        }
    }

    const setInfo = (information) => {
        info.textContent = information;
    }

    return { setResultInfo, setInfo };
})();

const game = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;
    const playRound = (cellIndex) => {
        gameBoard.setCell(cellIndex, getPlayerSign());
        if (checkWinner(cellIndex)) {
            display.setResultInfo(getPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            display.setResultInfo("Draw");
            isOver = true;
            return;
        }
        round++;
        display.setInfo(
            `Player ${getPlayerSign()}'s turn`
        );
    }

    const getPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getCell(index) === getPlayerSign()
                )
            );
    };

    const getIsOver = () => {
        return isOver;
    };
    const reset = () => {
        round = 1;
        isOver = false;
    };

    return { playRound, getIsOver, reset };

}
)();



// getIsOver, , reset, setInfo

