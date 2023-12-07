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
        // check row and column for valid input
        if (row <= 2 && column <= 2) {
            var choseCell = board[row][column];
            if (choseCell.getMarker() === "") {
            // convert row and column into number so they can be compared later to determine winner
            choseCell.addMarker(player, Number(row), Number(column));
            } else {
                console.log("invalid choise so we skipped your turn");
            }
        } else {
            console.log("invalid choice so we skipped your turn");
        }
    };

    // function to check for winner based on active player marker
    const checkForWinner = (playerMarker) => {
        // winner flag returned at end of function. if true then active player wins
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

        // check if any row has length === 3 indicating winner across row
        const checkRow = () => {
            if (row0.length === 3 || row1.length === 3 || row2.length === 3) {
                winner = true;
            }
            // if no horizontal winners check vertical winners
            checkColumn();
        };

        // check if any column has three in a row
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

        // check if either diagonal right to left or left to right has three in a row 
        const checkDiagonal = () => {

            // inner function to convert each nested array in a row
            // compare board array to array associated with winning diagonal to see if they match
            // return true if the row contains the neccesary cell coordinates
            const compareArray = (arr1, arr2) => {
                for (let i = 0; i < arr1.length; i++) {
                    if (JSON.stringify(arr1[i]) === JSON.stringify(arr2)) {
                        return true;
                    }
                }
            }

            try {
                // js === comparison is not direct but by references so convert array[0] and diagonal cells to string (above)
                // then compare and winner is indicated is all three diagonals present
                // repreat for opposite direction diagonal

                //upper left to lower right cells
                const isEqual0 = compareArray(row0, [0,0]);
                const isEqual1 = compareArray(row1, [1,1]);
                const isEqual2 = compareArray(row2, [2,2]);

                //upper right to lower left cells
                const isEqual3 = compareArray(row0, [0,2]);
                const isEqual4 = compareArray(row1, [1,1]);
                const isEqual5 = compareArray(row2, [2,0]);

                // return winner if either diagonal is winner
                // left to right diagonal
                if (isEqual0 === true && isEqual1 === true && isEqual2 === true) {
                    winner = true;
                // right to left diagonal
                } else if (isEqual3 === true && isEqual4 === true && isEqual5 === true) {
                    winner = true;
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkRow();
        // winner initailly is false and switches to true if there is a winning three in a row 
        return winner;
    };

    // check for tie based on the number of rounds played
    // return true meaning board is a tie because there are no available plays and neither player won
    const checkForTie = (rounds) => {
        if (rounds === 8) {
            return true;
        }
    }

    // print board to console
    // only needed until UI is built
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getMarker()))
        console.log(boardWithCellValues);
      };

    return {placeMarker, checkForWinner, checkForTie, printBoard};
}

// each square on the playing board holds a Cell() obj
function Cell() {
    let value = "";
    let cellRow = "";
    let cellColumn = "";

    // take row and column as input
    // place player market in nested array associated to row and column
    // call setCoordinates to add row and column to Cell()
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

    // start game round
    // call placeMarker and get input for row and column
    const playRound = (row, column, round) => {
        board.placeMarker(row, column, getActivePlayer().marker)

        // check for winner after each marker is placed
        // return true to indicated winner and break out of while loop ending the game
        if (board.checkForWinner(getActivePlayer().marker)) {
            board.printBoard();
            console.log("WINNER");
            return true;
        } else if (board.checkForTie(round)) {
            board.printBoard();
            console.log("TIE");
            return;
        }

        // switch player turn each round and print the new board
        switchPlayerTurn();
        printNewRound();
    };

    // print intial round
    printNewRound();

    return {playRound};
}





flag = false;
// outer loop to keep game going and have the ability to play again
 tic_tac_toe: while (true) {
    // runs after initial loop to check if player wants to play again
    if (flag) {
        // enter Y to play again otherwise break out of loop and end game
        let playAgainQuestion = prompt("Would you like to play again Y/N: ");
        if (playAgainQuestion !== "Y" || playAgainQuestion !== "y") {
            break tic_tac_toe;
        }
    }

    // get players names and markers
    // const player1name = prompt("Enter name for player 1: ");
    // const player1marker = prompt("Enter marker symbol for player 1: ");
    // const player2name = prompt("Enter name for player 2: ");
    // const player2marker = prompt("Enter marker symbol for player 2: ");

    // // start new game with user input above
    // const newGame = GameController(player1name, player2name, player1marker, player2marker);
    const newGame = GameController();

    // inner loop to play individual game and exit when player wins
    let round = 0;
    individualGame: while (round < 9) {
        // user input for row and column
        let playerMoveRow = prompt("Enter a row 0 - 2: ");
        let playerMoveColumn = prompt("Enter a column 0 - 2: ");
        // check if game is won and break out of inner loop
        if (newGame.playRound(playerMoveRow, playerMoveColumn, round)) {
            break individualGame;
        }
        round++;
    }
    flag = true;
}


// to fix
// check user input for name and marker (no repeats, no empty input)