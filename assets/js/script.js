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
let themes = ["light-monochrome", "dark-monochrome", "pink", "pink-dark", "forest", "twilight", "space"];
let currentTheme = 0;
//Difficulty list
let difficulty = ["Impossible", "Hard", "Medium", "Easy", "Extremely easy"];
let currentDifficulty = 0;
let currentDifficultyString = "Impossible";
//Win effects
let winEffects = ["None", "Confetti", "Sound", "Both"];
let currentWinEffect = 0;
let currentWinEffectString = "None";
//Sound effect on win
let winSound = new Audio("assets/audio/yippee.mp3");


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
                    //Win effects
                    //If confetti is enabled
                    if (currentWinEffectString == "Confetti" || currentWinEffectString == "Both") {
                        confetti({
                            spread: 180,
                            particleCount: 150
                        });
                    }
                    if (currentWinEffectString == "Sound" || currentWinEffectString == "Both") {
                        winSound.play();
                    }
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

        //Change win effect
        document.getElementById("win-effect").addEventListener("click", function () {
            currentWinEffectString = changeWinEffect();
        });
    }
});

/**
 * Checks if the spot is available, pushes the move into a list of the player's moves
 * and returns true. Otherwise undefined.
 */
function playerMove(availableMoves, move) {
    if (availableMoves.includes(move)) {
        playerMoves.push(move);
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
}

/**
 * resets the game
 */
function reset() {
    playerMoves.length = 0;
    aiMoves.length = 0;
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
            return move;
        }
    }
}

/**
 * Called when the AI should make a move
 */

function aiMove(availableMoves, recentPlayerMove, currentDiff) {
    let possibleAiWin = findPossibleAiWin(availableMoves);
    let possiblePlayerWin = findPossiblePlayerWin(availableMoves);
    let move;
    //If the difficulty is not extremely easy the ai will look for potential wins, both player and ai vice 
    if (currentDiff != "Extremely easy") {
        //Checks if the checkers outputted a number
        if (possibleAiWin != undefined) {
            return possibleAiWin;
        } else if (possiblePlayerWin != undefined) {
            return possiblePlayerWin;
        }
    }
    //Checks for difficulty
    if (currentDiff == "Impossible") {
        if (recentPlayerMove == 5) {
            return 9;
        }
        move = playerPlaceCornerCounter(availableMoves, recentPlayerMove, currentDiff);
        if (move != undefined) {
            return move;
        } else {
            move = playerPlaceSidesCounter(availableMoves, recentPlayerMove);
            if (move != undefined) {
                return move;
            }
        }
    } else if (currentDiff == "Hard" || currentDiff == "Medium") {
        move = playerPlaceCornerCounter(availableMoves, recentPlayerMove, currentDiff);
        if (move != undefined) {
            return move;
        }
    //If the difficulty is extremely easy the moves will be completely random
    } else if (currentDiff == "Extremely easy") {
        //code credit: https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/
        let move = availableMoves[(Math.floor(Math.random() * availableMoves.length))];
        return move;
    }

    //In the event that a move is not found in the other checkers, the ai will pick the first available spot
    move = availableMoves[0];
    aiMoves.push(move);
    return move;

}


/**
 * If the player puts their move on one of the corners this will run
 */
function playerPlaceCornerCounter(possibleMoves, recentPlayerMove, difficulty) {
    //Start by checking if middle is available
    if (corners.includes(recentPlayerMove)) {
        if (possibleMoves.includes(5)) {
            return 5;
        } else {
            //If possible, place the O 3 squares in front of the player move 
            if (possibleMoves.includes(recentPlayerMove + 3)) {
                return recentPlayerMove + 3;
                //Else, if possible place the O 3 squares behind the player move 
            } else if (possibleMoves.includes(recentPlayerMove - 3)) {
                return recentPlayerMove - 3;
            } else {
                if (difficulty != "Medium") {
                    //If not possible, put on the sides
                    for (let i of sides) {
                        if (possibleMoves.includes(i)) {
                            return i;
                        }
                    }
                }
            }
        }
    }
}

/**
 * If the player places their move on the side, this will run
 */
function playerPlaceSidesCounter(possibleMoves, recentPlayerMove) {
    //If the ai can, it will place it's move 3 in front of the players recent move
    //Else if the ai can, it places it's move 3 behind the players recent move
    //If not possible it does the same, but 1 instead of 3
    if (possibleMoves.includes(recentPlayerMove + 3)) {
        return recentPlayerMove + 3;
    } else if (possibleMoves.includes(recentPlayerMove - 3)) {
        return recentPlayerMove - 3;
    } else if (possibleMoves.includes(recentPlayerMove + 1)) {
        return recentPlayerMove + 1;
    } else if (possibleMoves.includes(recentPlayerMove - 1)) {
        return recentPlayerMove - 1;
    }

}

/**
 * Checks in anyone has won. Returns undefined if no one has won
 */
function checkWin(player, ai, availableMoves) {
    //Checks if the moves the player/ai has made matches one of the winning combinations by checking if the first
    //number in the nested list is found in the ai/player moves list. Ditto for the second and third.
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

    //Switches the color theme related classname on all 4 elements
    document.querySelector("body").classList.replace(oldTheme, newTheme);
    document.querySelector("header").classList.replace(oldTheme, newTheme);
    document.querySelector("main").classList.replace(oldTheme, newTheme);
    document.querySelector("footer").classList.replace(oldTheme, newTheme);

    document.getElementById("color").children[1].innerText = newTheme;
    //If the Current theme is the last in the list, loop it back to 0
    if (currentTheme == (themes.length - 1)) {
        currentTheme = 0;
    } else {
        ++currentTheme;
    }
}

/**
 * Changes the difficulty
 */
function changeDifficulty() {
    let newDifficulty = difficulty[currentDifficulty + 1];
    //Used to prevent the theme from completely removing all the colors
    if (newDifficulty === undefined) {
        newDifficulty = difficulty[0];
    }

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

/**
 * Changes win effect
 */
function changeWinEffect() {
    let newWinEffect = winEffects[currentWinEffect + 1];
    //Used to prevent the theme from completely removing all the colors
    if (newWinEffect === undefined) {
        newWinEffect = winEffects[0];
    }

    //Switches the text on the difficulty button
    document.getElementById("win-effect").children[1].innerText = newWinEffect;


    //If the Current theme is the last in the list, loop it back to 0
    if (currentWinEffect == (winEffects.length - 1)) {
        currentWinEffect = 0;
    } else {
        ++currentWinEffect;
    }

    return newWinEffect;
}