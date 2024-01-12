console.log("Connected!");

// Global variables

//Possible win combinations
const combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
//The grid items X has claimed X = Player
let xCombinations = [];
//The grid items O has claimed. O = AI
let oCombinations = [];
//Locks the board on win/loss/draw, requiring the board to be cleared
let lockBoard = false;

document.addEventListener("DOMContentLoaded", function () {
    console.log("Loaded");

    let gridItem = document.getElementsByClassName("game-grid-item");

    for (let item of gridItem) {
        item.addEventListener("click", function () {
            //board needs to be cleared before you can click
            if (!lockBoard) {
                let clickedItem = item.getAttribute("grid-number");
                console.log(clickedItem)
                //Adds an X to the clicked grid item if the grid item isn't already claimed to prevent overrides
                if (!oCombinations.includes(parseInt(clickedItem)) && !xCombinations.includes(parseInt(clickedItem))) {
                    document.getElementsByClassName("game-grid-item")[parseInt(clickedItem - 1)].children[0].innerText = "X";
                    xCombinations.push(parseInt(clickedItem));

                    //Checks who, if anyone, has won by passing the combinations into the function. Otherwise the game continues
                    let checkedWin = checkWin(xCombinations, oCombinations);
                    if (checkedWin == 0) {
                        document.getElementById("losses").innerText = parseInt(document.getElementById("losses").innerText) + 1;
                        lockBoard = true;
                    } else if (checkedWin == 1) {
                        document.getElementById("wins").innerText = parseInt(document.getElementById("wins").innerText) + 1;
                        lockBoard = true;
                    }

                    bestMoveCalc();
                }
            }
        })
    }

    //When the clear button is pressed the board will be cleared
    document.getElementById("clear").addEventListener("click", function () {
        clearBoard();
        lockBoard = false
    });

})

/**
 * Checks if one of the combinations has been reached
 * Human = 1
 * AI = 0
 */
function checkWin(playerMoves, aiMoves) {
    for (let combo of combinations) {
        if (playerMoves.includes(combo[0]) && playerMoves.includes(combo[1]) && playerMoves.includes(combo[2])) {
            return 1;
        } else if (aiMoves.includes(combo[0]) && aiMoves.includes(combo[1]) && aiMoves.includes(combo[2])) {
            return 0;
        }
    };

};

/**
 * Called when the game is a draw
 */

function draw() {
    document.getElementById("draws").innerText = parseInt(document.getElementById("draws").innerText) + 1;
    lockBoard = true;
};

/**
 * Clears the board
 */

function clearBoard() {
    //Temporary code used for testing
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("game-grid-item")[i].children[0].innerText = "";
    }

    xCombinations = [2, 6, 9];
    oCombinations = [4, 7, 8];

    document.getElementsByClassName("game-grid-item")[1].children[0].innerText = "X";
    document.getElementsByClassName("game-grid-item")[5].children[0].innerText = "X";
    document.getElementsByClassName("game-grid-item")[8].children[0].innerText = "X";

    document.getElementsByClassName("game-grid-item")[3].children[0].innerText = "O";
    document.getElementsByClassName("game-grid-item")[6].children[0].innerText = "O";
    document.getElementsByClassName("game-grid-item")[7].children[0].innerText = "O";

    bestMoveCalc();

    //Real code that will be used later
    /*
    xCombinations.length = 0;
    oCombinations.length = 0;
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("game-grid-item")[i].children[0].innerText = "";
    }*/
}


// AI stuff

function bestMoveCalc() {
    let possibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //Ai = 0 
    //Human = 1
    let playerTurn = 0

    for (let userMove of xCombinations) {
        let index = possibleMoves.indexOf(userMove)
        if (index != -1) {
            possibleMoves.splice(index, 1);
        }
    };
    for (let aiMove of oCombinations) {
        let index = possibleMoves.indexOf(aiMove)
        if (index != -1) {
            possibleMoves.splice(index, 1);
        }
    };
    miniMax(possibleMoves, playerTurn)
    AITurn()
}


function miniMax(possibleMoves, playerTurn) {
    for (let possibleMove of possibleMoves) {

    }
}

/**
 * The ai move. Currently completely random.
 */

function AITurn() {
    if (!lockBoard) {
        let possibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //Code used from here: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
        for (let userMove of xCombinations) {
            let index = possibleMoves.indexOf(userMove)
            if (index != -1) {
                possibleMoves.splice(index, 1);
            }
        };
        for (let aiMove of oCombinations) {
            let index = possibleMoves.indexOf(aiMove)
            if (index != -1) {
                possibleMoves.splice(index, 1);
            }
        };


        //Code from here: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
        //
        let move

        let checkAIWIn = checkPossibleAIWin(possibleMoves)
        let checkPlayerWin = checkPossiblePlayerWin(possibleMoves)
        if (checkAIWIn != false) {
            move = checkAIWIn;
        } else if (checkPlayerWin != false) {
            move = checkPlayerWin;
        } else {
            move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }

        console.log(`AI move: ${move}`)
        if (move == undefined) {
            draw();
        } else {
            document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "o";
            oCombinations.push(move);
            checkWin(xCombinations, oCombinations);
        }

        //Debug stuff
        console.log(`Possible moves: ${possibleMoves}`)

        console.log(`AI total moves: ${oCombinations}`)
    }
}


/**
 * Checks if a move on the board can guarantee an AI win
 */


function checkPossibleAIWin(possibleMoves) {
    for (let possibleMove of possibleMoves) {
        let tempOCombinations = [...oCombinations]
        tempOCombinations.push(possibleMove)
        console.log(`tempOCombinations: ${tempOCombinations}`)
        console.log(`Tested move: ${possibleMove}`)
        for (let combo of combinations) {
            console.log(`Testing if ${possibleMove} added to ${tempOCombinations} is in: ${combo}`)
            if (tempOCombinations.includes(combo[0]) && tempOCombinations.includes(combo[1]) && tempOCombinations.includes(combo[2])) {
                console.log(`Move found: ${possibleMove}`)
                return possibleMove
            }
        };
    }
    return false
}

/**
 * Check if the player can win with a move on the board 
 */

function checkPossiblePlayerWin(possibleMoves) {
    for (let possibleMove of possibleMoves) {
        let tempXCombinations = [...xCombinations]
        tempXCombinations.push(possibleMove)
        console.log(`tempXCombinations: ${tempXCombinations}`)
        console.log(`Tested player move: ${possibleMove}`)
        for (let combo of combinations) {
            console.log(`Testing if ${possibleMove} added to ${tempXCombinations} is in: ${combo}`)
            if (tempXCombinations.includes(combo[0]) && tempXCombinations.includes(combo[1]) && tempXCombinations.includes(combo[2])) {
                console.log(`Player winning move found: ${possibleMove}`)
                return possibleMove
            }
        };
    }
    return false
}
