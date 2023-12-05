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
            choseCell.addMarker(player, row, column);
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
        const filteredCells = board.map(row => {
            return row.filter(num => num.getMarker() === playerMarker);
        });

        console.log(filteredCells);
        var row = [];
        var column = [];
        for (i of filteredCells) {
            for (j of i) {
                row.push(j.getCoordinates()[0]);
                column.push(j.getCoordinates()[1]);
            }
        }

        console.log(row);


        // loop through row and column
        // compare first value to the remaining values and return winning if 3 match
        // diagonals will be seperate case
        // if length < 3 return false
        // maybe have check for ties as different function?
    };

    return {getBoard, placeMarker, checkForWinner};

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

var temp = Gameboard();
temp.placeMarker(1, 2, "X");
temp.placeMarker(0, 0, "X");
temp.placeMarker(0, 1, "X");
var board = temp.getBoard();
console.log(board[1][2].getMarker());
temp.checkForWinner("X")
// console.log(temp);

