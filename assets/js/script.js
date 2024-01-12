// Global variables

//Possible win combinations
const combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
// What the current board looks like
let currentBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// Original board
let originalBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
//List of player moves
let playerMoves = []
//List of ai moves
let aiMoves = []
//Locks the board on win/loss/draw, requiring the board to be cleared
let lockBoard = false;

document.addEventListener("DOMContentLoaded", function () {
    //Output when everything has been loaded
    console.log("Loaded");

    //Selects all the grid squared
    let gridItem = document.getElementsByClassName("game-grid-item");
    //continuosly checks for input
    for (let item of gridItem) {
        item.addEventListener("click", function () {
            //The number of the square that was just clicked
            let clickedItem = parseInt(item.getAttribute("grid-number"));
            console.log(clickedItem)
            let availableMoves = calcAvailableMoves(originalBoard, playerMoves, aiMoves);
            console.log(`available moves; ${availableMoves}, playermoves: ${playerMoves}`)

            if (playerMove(availableMoves, clickedItem)) {
                updateBoard()
            }


        })
    }

    //When the clear button is pressed the board will be cleared
    document.getElementById("clear").addEventListener("click", function () {
        reset();
        updateBoard();
    });
})

/**
 * Checks if the spot is available, pushes the move into a list of the player's moves
 * and returns true. Otherwise undefined.
 */
function playerMove(availableMoves, move) {
    if (availableMoves.includes(move)) {
        playerMoves.push(move)
        console.log(playerMoves)
        return true
    }
}

/**
 * Outputs an array of available moves from the 
 */
function calcAvailableMoves(board, playerMoves, aiMoves) {
    availableBoard = [...board]
    for (let userMove of playerMoves) {
        let index = availableBoard.indexOf(userMove)
        if (index != -1) {
            availableBoard.splice(index, 1);
        }
    };
    for (let aiMove of aiMoves) {
        let index = availableBoard.indexOf(aiMove)
        if (index != -1) {
            availableBoard.splice(index, 1);
        }
    };
    return availableBoard;
}

/**
 * Used to update the board on screen
 */
function updateBoard() {
    for (let i = 0; i < 9; i++){
        document.getElementsByClassName("game-grid-item")[i].children[0].innerText = "";
    }
    for (let move of playerMoves) {
        document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "X";
    }
    for (let move of aiMoves) {
        document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "O";
    }
    console.log("The updateboard function has been run")
}

/**
 * resets the game
 */
function reset() {
    playerMoves.length = 0;
    aiMoves.length = 0;
    currentBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    lockBoard = false
    console.log(`Playermoves: ${playerMoves}, aiMoves: ${aiMoves}`)
}