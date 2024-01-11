console.log("Connected!");

// Global variables

//Possible win combinations
let combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
//The grid items X has claimed
let xCombinations = [];
//The grid items O has claimed
let oCombinations = [];

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
                document.getElementsByClassName("game-grid-item")[parseInt(clickedItem - 1)].children[0].innerText = "X";
                addXToCombo(clickedItem);
                checkWin();
                AITurn();
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
    console.log(xCombinations);
};

/**
 * Checks if one of the combinations has been reached
 */
function checkWin() {
    for (let combo of combinations) {
        if (xCombinations.includes(combo[0]) && xCombinations.includes(combo[1]) && xCombinations.includes(combo[2])) {
            document.getElementById("wins").innerText = parseInt(document.getElementById("wins").innerText) + 1;
            lockBoard = true;
        };
        if (oCombinations.includes(combo[0]) && xCombinations.includes(combo[1]) && xCombinations.includes(combo[2])) {
            document.getElementById("losses").innerText = parseInt(document.getElementById("losses").innerText) + 1;
            lockBoard = true;
        };
    };
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

function AITurn() {
    let possibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //Code used from here: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    for (userMove of xCombinations) {
        let index = possibleMoves.indexOf(userMove)
        if (index != -1) {
            possibleMoves.splice(index, 1);
        }
    };
    for (aiMove of oCombinations) {
        let index = possibleMoves.indexOf(aiMove)
        if (index != -1) {
            possibleMoves.splice(index, 1);
        }
    };
    //Code from here: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
    let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "o";
    oCombinations.push(move);

    console.log(`Possible moves: ${possibleMoves}`)
    console.log(`AI move: ${move}`)
    console.log(`AI total moves: ${oCombinations}`)
}