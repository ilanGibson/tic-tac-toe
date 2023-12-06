// gameboard is normal tic-tac-toe board
// nested array with each square holding a Cell() see below
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // nesting the array and pushing Cell() into nested array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // return nested array board
    const getBoard = () => board;

    // if cell is empty active marker is placed in cell
    // cell coordinates are set based on which row and column are input
    const placeMarker = (row, column, player) => {
        var choseCell = board[row][column];
        if (choseCell.getMarker() === "") {
            choseCell.addMarker(player, row, column);
        } else {
            console.log("invalid chose");
        }
    };

    // function to check for winner based on active player marker
    const checkForWinner = (playerMarker) => {
        winner = false;
        // filter the cells to find coordinates only where active player marker exists
        const filteredCells = board.map(row => {
            return row.filter(num => num.getMarker() === playerMarker).map(filteredNum => {
                return filteredNum.getCoordinates();
            }) 
        });

        // extract filtered cells for each row
        const row0 = filteredCells[0];
        const row1 = filteredCells[1];
        const row2 = filteredCells[2];

        console.log(row0);

        // check if any row has length === 3 indicating winner across row
        const checkRow = () => {
            if (row0.length === 3 || row1.length === 3 || row2.length === 3) {
                winner = true;
            }
            // if no horizontal winners check vertical winners
            checkColumn();
        };

        const checkColumn = () => {
            try {
                //check column i in each of the 3 rows indicating a winner across a column
                for (let i = 0; i < 3; i++) {
                    if (row0[i][1] === row1[i][1] && row1[i][1] === row2[i][1]) {
                        winner = true;
                    }
                }
            } catch (error) {
            }
            // if no vertical winners check diagonal winners
            checkDiagonal();
        };

        const checkDiagonal = () => {
            try {
                // js === comparison is not direct but by references so convert array[0] and diagonal cells to string
                // then compare and winner is indicated is all three diagonals present
                // repreat for opposite directional diagonal

                //upper left to lower right cells
                const isEqual0 = row0.some(cell => JSON.stringify(cell) === JSON.stringify([0,0]));
                console.log(isEqual0);
                const isEqual1 = row1.some(cell => JSON.stringify(cell) === JSON.stringify([1,1]));
                const isEqual2 = row2.some(cell => JSON.stringify(cell) === JSON.stringify([2,2]));

                //upper right to lower left cells
                const isEqual3 = row0.some(cell => JSON.stringify(cell) === JSON.stringify([0,2]));
                const isEqual4 = row1.some(cell => JSON.stringify(cell) === JSON.stringify([1,1]));
                const isEqual5 = row2.some(cell => JSON.stringify(cell) === JSON.stringify([2,0]));

                // return winner if either diagonal is winner
                if (isEqual0 === true && isEqual1 === true && isEqual2 === true) {
                    console.log("winner");
                } else if (isEqual3 === true && isEqual4 === true && isEqual5 === true) {
                    console.log("winner");
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkRow();
        return winner;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMarker()))
        console.log(boardWithCellValues);
      };


    return {getBoard, placeMarker, checkForWinner, printBoard};

}

function Cell() {
    let value = "";
    let cellRow = "";
    let cellColumn = "";

    const addMarker = (player, row, column) => {
        value = player;
        setCoordinates(row, column);
    };

    const getMarker = () => value;

    const setCoordinates = (row, column) => {
        cellRow = row;
        cellColumn = column
    }

    const getCoordinates = () => [cellRow, cellColumn];

    return {addMarker, getMarker, getCoordinates};
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two", 
playerOneMarker = "X", playerTwoMarker = "O") {
    const board = Gameboard();

    const players = [
    {
        name: playerOneName,
        marker: playerOneMarker
    },
    {
        name: playerTwoName,
        marker: playerTwoMarker
    }];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    };

    const playRound = (row, column) => {
        board.placeMarker(row, column, getActivePlayer().marker)

        if (board.checkForWinner(getActivePlayer().marker)) {
            console.log("WINNER");
            return true;
        }
        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound};
}
flag = 0;
while (flag < 1) {
    const player1name = prompt("Enter name for player 1: ");
    const player1marker = prompt("Enter marker symbol for player 1: ");
    const player2name = prompt("Enter name for player 2: ");
    const player2marker = prompt("Enter marker symbol for player 2: ");
    const newGame = GameController(player1name, player2name, player1marker, player2marker);

    let playAgain = 0;
    while (playAgain < 6) {
        let playerMoveRow = prompt("Enter a row 0 - 2: ");
        let playerMoveColumn = prompt("Enter a column 0 - 2: ");
        if (newGame.playRound(playerMoveRow, playerMoveColumn)) {
            break;
        }
        playAgain ++;
        flag++;
    }

}

