console.log("Connected!");

// Global variables

//Possible win combinations
const combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
//The grid items X has claimed X = Player
let xCombinations = [];
//The grid items O has claimed. O = AI
let oCombinations = [];
//Locks the board on win/loss/draw
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
                //Adds an X to the clicked grid item
                if (!oCombinations.includes(parseInt(clickedItem)) && !xCombinations.includes(parseInt(clickedItem))) {
                    document.getElementsByClassName("game-grid-item")[parseInt(clickedItem - 1)].children[0].innerText = "X";
                    addXToCombo(clickedItem);
                    checkWin();
                    AITurn();
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
 * Adds the id of the grid clicked to the array that keeps
 * track of the player's inputs
 */
function addXToCombo(clickedItem) {
    xCombinations.push(parseInt(clickedItem));
    console.log(`Player move: ${xCombinations}`);
};

/**
 * Checks if one of the combinations has been reached
 */
function checkWin() {
    for (let combo of combinations) {
        if (xCombinations.includes(combo[0]) && xCombinations.includes(combo[1]) && xCombinations.includes(combo[2])) {
            document.getElementById("wins").innerText = parseInt(document.getElementById("wins").innerText) + 1;
            lockBoard = true;
        } else if (oCombinations.includes(combo[0]) && oCombinations.includes(combo[1]) && oCombinations.includes(combo[2])) {
            document.getElementById("losses").innerText = parseInt(document.getElementById("losses").innerText) + 1;
            lockBoard = true;
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
    xCombinations.length = 0;
    oCombinations.length = 0;
    for (let i = 0; i < 9; i++) {
        document.getElementsByClassName("game-grid-item")[i].children[0].innerText = "";
    }
}

// AI stuff

/**
 * The ai move. Currently completely random.
 */
function AITurn() {
    if (!lockBoard) {
        let possibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //Code used from here: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
        for (userMove of xCombinations) {
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

        let checkMove = checkPossibleAIWin(possibleMoves)
        if (checkMove != false) {
            move = checkMove;
        } else {
            move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }

        console.log(`AI move: ${move}`)
        if (move == undefined) {
            draw();
        } else {
            document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "o";
            oCombinations.push(move);
            checkWin();
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

}