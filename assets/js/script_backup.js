//This is a backup in case I mess up the code in the other script so badly it won't function anymore

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
//Scores
let wins = 0
let losses = 0
let draws = 0

document.addEventListener("DOMContentLoaded", function () {
    //Output when everything has been loaded
    console.log("Loaded");

    //Selects all the grid squared
    let gridItem = document.getElementsByClassName("game-grid-item");
    for (let item of gridItem) {

        item.addEventListener("click", function () {
            //The number of the square that was just clicked
            let clickedItem = parseInt(item.getAttribute("grid-number"));
            console.log(clickedItem)
            let availableMoves = calcAvailableMoves(originalBoard, playerMoves, aiMoves);
            console.log(`available moves; ${availableMoves}, playermoves: ${playerMoves}`)
            if (checkWin(playerMoves, aiMoves, availableMoves) === undefined) {
                if (playerMove(availableMoves, clickedItem)) {
                    console.log(checkWin(playerMoves, aiMoves, availableMoves))
                    updateBoard();

                    if (checkWin(playerMoves, aiMoves, availableMoves) === undefined) {
                        availableMoves = calcAvailableMoves(originalBoard, playerMoves, aiMoves);
                        aiMove(availableMoves);
                        updateBoard();
                    }
                }
                if(checkWin(playerMoves, aiMoves, availableMoves) === "win"){
                    ++wins
                } else if (checkWin(playerMoves, aiMoves, availableMoves) === "loss"){
                    ++losses
                } else if (checkWin(playerMoves, aiMoves, availableMoves) === "draw"){
                    ++draws
                }
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
    console.log(availableMoves)
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
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("game-grid-item")[i].children[0].innerText = "";
    }
    for (let move of playerMoves) {
        document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "X";
    }
    for (let move of aiMoves) {
        if(move == undefined){
            break
        }
        document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "O";
    }

    //Updates the tally
    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    document.getElementById("draws").innerText = draws;

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

/**
 * Called when the AI should make a move
 */
function aiMove(availableMoves) {
    let possibleMoves = availableMoves;
    //Placeholder move
    let move = possibleMoves[0];
    aiMoves.push(move);
    return move
}

/**
 * Checks in anyone has won. returns 0 if the human has won, 1 if the ai won, undefined if no one has won
 */
function checkWin(player, ai, availableMoves) {

    for (let combo of combinations) {
        if (availableMoves.length === 0) {
            return "draw";
        } else if (player.includes(combo[0]) && player.includes(combo[1]) && player.includes(combo[2])) {
            return "win"
        } else if (ai.includes(combo[0]) && ai.includes(combo[1]) && ai.includes(combo[2])) {
            return "loss"
        }
    }
}