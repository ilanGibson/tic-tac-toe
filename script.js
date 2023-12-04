function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        var choseCell = board[row][column];
        if (choseCell.getMarker() === "") {
            choseCell.addMarker(player);
        } else {
            console.log("invalid chose");
        }
    };

    // filter the board to get only cells that have value matching player marker
    // filter changes the board and cells coordinates
    // making it impossible to compare coordinates
    // compare cell's row and/or column coordinates


    // NEW IDEA:
    // add an X and Y property to Cell()
    // assign X and Y value during placeMarker()
    // filter board for cells with X and Y value and coresponding playerMarker
    // find out which patterns are winning
    // find out how to detect tie
    const checkForWinner = (playerMarker) => {
        const filteredCells = board.filter(row => {
            return row.filter(num => num.getMarker() === playerMarker);
        });
        console.log(filteredCells);
    };

    return {getBoard, placeMarker, checkForWinner};

}

function Cell() {
    let value = "";

    const addMarker = (player) => {
        value = player;
    };

    const getMarker = () => value;

    return {addMarker, getMarker};
}

var temp = Gameboard();
temp.placeMarker(1, 2, "X");
var board = temp.getBoard();
console.log(board[1][2].getMarker());
temp.checkForWinner("X")
// console.log(temp);

