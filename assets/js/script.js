// Global variables
//What page the script is running on
let currentPage;
//Possible win combinations
const combinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
// Original board
let originalBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//List of player moves
let playerMoves = [];
//List of ai moves
let aiMoves = [];
//Scores
let wins = 0;
let losses = 0;
let draws = 0;
//References for the detectRatTactics function
let corners = [1, 3, 7, 9];
let sides = [2, 4, 6, 8];
//Color theme list
let themes = ["light-monochrome", "dark-monochrome"];
let currentTheme = 0;
//Difficulty list
let difficulty = ["Impossible", "Hard", "Medium", "Easy", "Extremely easy"];
let currentDifficulty = 0;
let currentDifficultyString = "Impossible";

document.addEventListener("DOMContentLoaded", function () {
    //Output when everything has been loaded
    console.log("Loaded");
    currentPage = document.getElementById("current-page").innerText;
    //Selects all the grid squared
    let gridItem = document.getElementsByClassName("game-grid-item");
    for (let item of gridItem) {

        item.addEventListener("click", function () {
            //The number of the square that was just clicked
            let clickedItem = parseInt(item.getAttribute("data-grid-number"));

            //Checks for available squares to prevent player from trying to claim a spot that is already taken
            let availableMoves = calcAvailableMoves(originalBoard, playerMoves, aiMoves);

            //The scripts checks if there's a win before letting the player put an X anywhere
            if (checkWin(playerMoves, aiMoves, availableMoves) === undefined) {
                if (playerMove(availableMoves, clickedItem)) {
                    console.log(checkWin(playerMoves, aiMoves, availableMoves));

                    //Update the board
                    updateBoard();

                    //The script checks after a win once again before the AI can make a move
                    if (checkWin(playerMoves, aiMoves, availableMoves) === undefined) {
                        availableMoves = calcAvailableMoves(originalBoard, playerMoves, aiMoves);

                        //Passes the available moves and clickedItem to the aiMove function to help it determine it's next more
                        //Gets a value from the function and pushes it to the aiMoves list 
                        aiMoves.push(aiMove(availableMoves, clickedItem, currentDifficultyString));

                        //Update the board
                        updateBoard();
                    }
                }
                //Adds to the scores if a win, loss or draw is achieved. Put here so the checkWin function can be reused
                if (checkWin(playerMoves, aiMoves, availableMoves) === "win") {
                    ++wins;
                } else if (checkWin(playerMoves, aiMoves, availableMoves) === "loss") {
                    ++losses;
                } else if (checkWin(playerMoves, aiMoves, availableMoves) === "draw") {
                    ++draws;
                }
                //Update the board
                updateBoard();
            }
        });

    }

    
        //When the clear button is pressed the board will be cleared
        document.getElementById("clear").addEventListener("click", function () {
            reset();
            updateBoard();
        });
        //Only runs on the customizeable tic tac toe page
        if (currentPage == "Custom") {
        //Change theme button
        document.getElementById("color").addEventListener("click", function () {
            changeTheme();
        });

        //Change difficulty
        document.getElementById("difficulty").addEventListener("click", function () {
            currentDifficultyString = changeDifficulty();
        });
    }
});

/**
 * Checks if the spot is available, pushes the move into a list of the player's moves
 * and returns true. Otherwise undefined.
 */
function playerMove(availableMoves, move) {
    console.log(availableMoves);
    if (availableMoves.includes(move)) {
        playerMoves.push(move);
        console.log(playerMoves);
        return true;
    }
}



/**
 * Outputs an array of available moves from the 
 */
function calcAvailableMoves(board, playerMoves, aiMoves) {
    let availableBoard = [...board];
    for (let userMove of playerMoves) {
        let index = availableBoard.indexOf(userMove);
        if (index != -1) {
            availableBoard.splice(index, 1);
        }
    }
    for (let aiMove of aiMoves) {
        let index = availableBoard.indexOf(aiMove);
        if (index != -1) {
            availableBoard.splice(index, 1);
        }
    }
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
        if (move == undefined) {
            break;
        }
        document.getElementsByClassName("game-grid-item")[move - 1].children[0].innerText = "O";
    }

    //Updates the tally
    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    document.getElementById("draws").innerText = draws;

    console.log("The updateboard function has been run");
}

/**
 * resets the game
 */
function reset() {
    playerMoves.length = 0;
    aiMoves.length = 0;
}

/**
 * Called when the AI should make a move
 */
function aiMove(availableMoves, recentPlayerMove, currentDiff) {
    //Gets the results from the checkers
    let possibleAiWin = findPossibleAiWin(availableMoves);
    let possiblePlayerWin = findPossiblePlayerWin(availableMoves);

    //Determines the current difficulty
    let currDiff = currentDiff;

    console.log(`Current difficulty ${currDiff}`)

    //If the difficulty is not extremely easy this will run
    if (currDiff != "Extremely easy") {
        console.log("Difficulty is not extremely easy")
        //Checks if the checkers outputted a number
        if (possibleAiWin != undefined) {
            return possibleAiWin;
        } else if (possiblePlayerWin != undefined) {
            return possiblePlayerWin;
        }

        //if the current difficulty is impossible, hard or medium this will run
        if (currDiff == "Impossible" || currDiff == "Hard" || currDiff == "Medium") {
            let ratTacticsTest = ratTacticsDetection(availableMoves, recentPlayerMove, currDiff);
            console.log("difficulty is not easy")
            if (ratTacticsTest != undefined) {
                return ratTacticsTest;
            }
        }

        //Ai always picks middle if it's available to prevent the player from winning. Only runs if the difficulty is not easy
        if (availableMoves.includes(5) && currDiff != "Easy") {
            console.log("difficulty is not easy")
            return 5;
        }
    }

    //If the difficulty is extremely easy the moves will be completely random
    if (currDiff == "Extremely easy") {
        //code credit: https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/
        let move = availableMoves[(Math.floor(Math.random() * availableMoves.length))];
        return move;
    }
    //In the event that a move is not found in the other checkers, the ai will pick the first available spot
    let move = availableMoves[0];
    aiMoves.push(move);
    console.log(aiMoves);
    return move;

}

/**
 * Find a possible player win and put the O in there
 * checks through all the possible moves the player can make
 */
function findPossiblePlayerWin(possibleMoves) {
    for (let move of possibleMoves) {
        let tempPlayerMoves = [...playerMoves];
        tempPlayerMoves.push(move);
        if (checkWin(tempPlayerMoves, aiMoves, possibleMoves) == "win") {
            console.log(`Found possible player win: ${move}`);
            return move;
        }
    }
}

/**
 * Find a possible ai win and put the O in there
 * checks through all the possible moves the ai can make
 */
function findPossibleAiWin(possibleMoves) {
    for (let move of possibleMoves) {
        let tempAiMoves = [...aiMoves];
        tempAiMoves.push(move);
        if (checkWin(playerMoves, tempAiMoves, possibleMoves) == "loss") {
            console.log(`Found possible ai win: ${move}`);
            return move;
        }
    }
}

/**
 * Detect tactics from the player that almost always guarantees a win. 
 * The amount of tactics checked depends on difficulty
 */
function ratTacticsDetection(possibleMoves, recentPlayerMove, difficulty) {
    //If the player places their X in a corner put the O in the middle if possible
    if (corners.includes(recentPlayerMove)) {
        if (possibleMoves.includes(5)) {
            return 5;
        } else {
            //Check if the third square from the player move is available, then put the O in there
            if (possibleMoves.includes(recentPlayerMove + 3) && difficulty == "Impossible") {
                console.log("difficulty is impossible")
                return recentPlayerMove + 3;
            }
            //If not possible, put on the sides
            if (difficulty != "Medium") {
                console.log("difficulty is not medium")
                for (let i of sides) {
                    if (possibleMoves.includes(i)) {
                        return i;
                    }
                }
            }
        }

    }
    //If the player has put their X on the sides, put the O on the 3rd square away. 
    //Results in a corner when the right or left side is taken, middle if the top is taken. 
    //Otherwise it defaults to the middle due to the code in the aiMove function
    if (sides.includes(recentPlayerMove) && difficulty == "Impossible") {
        if (possibleMoves.includes(recentPlayerMove + 3)) {
            return recentPlayerMove + 3;
        }
    }
}

/**
 * Checks in anyone has won. returns 0 if the human has won, 1 if the ai won, undefined if no one has won
 */
function checkWin(player, ai, availableMoves) {

    for (let combo of combinations) {
        if (availableMoves.length === 0) {
            return "draw";
        } else if (player.includes(combo[0]) && player.includes(combo[1]) && player.includes(combo[2])) {
            return "win";
        } else if (ai.includes(combo[0]) && ai.includes(combo[1]) && ai.includes(combo[2])) {
            return "loss";
        }
    }
}

//Customizeable tictactoe stuff

/**
 * Changes the color theme
 */
function changeTheme() {
    let oldTheme = themes[currentTheme];
    let newTheme = themes[currentTheme + 1];
    //Used to prevent the theme from completely removing all the colors
    if (newTheme === undefined) {
        newTheme = themes[0];
    }

    console.log(`Switching from ${oldTheme} to ${newTheme}`)

    //Switches the color theme related classname on all 4 elements
    document.querySelector("body").classList.replace(oldTheme, newTheme);
    document.querySelector("header").classList.replace(oldTheme, newTheme);
    document.querySelector("main").classList.replace(oldTheme, newTheme);
    document.querySelector("footer").classList.replace(oldTheme, newTheme);

    //If the Current theme is the last in the list, loop it back to 0
    if (currentTheme == (themes.length - 1)) {
        currentTheme = 0;
    } else {
        ++currentTheme
    }
}

/**
 * Changes the difficulty
 */
function changeDifficulty() {
    let oldDifficulty = difficulty[currentDifficulty];
    let newDifficulty = difficulty[currentDifficulty + 1];
    //Used to prevent the theme from completely removing all the colors
    if (newDifficulty === undefined) {
        newDifficulty = difficulty[0];
    }

    console.log(`Switching from ${oldDifficulty} to ${newDifficulty}`)

    //Switches the text on the difficulty button
    document.getElementById("difficulty").children[1].innerText = newDifficulty;


    //If the Current theme is the last in the list, loop it back to 0
    if (currentDifficulty == (difficulty.length - 1)) {
        currentDifficulty = 0;
    } else {
        ++currentDifficulty;
    }

    return newDifficulty;
}