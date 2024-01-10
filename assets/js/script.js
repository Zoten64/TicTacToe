console.log("Connected!");

// Global variables

//Possible win combinations
let combinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
//The grid items X has claimed
let xCombinations = [];
//The grid items O has claimed
let oCombinatioms = [];

document.addEventListener("DOMContentLoaded", function(){
    console.log("Loaded");

    let gridItem = document.getElementsByClassName("game-grid-item");

    for(let item of gridItem){
        item.addEventListener("click", function(){
            let clickedItem = item.getAttribute("grid-number");
            console.log(clickedItem)
            //Adds an X to the clicked grid item
            document.getElementsByClassName("game-grid-item")[parseInt(clickedItem - 1)].children[0].innerText = "X";
            addXToCombo(clickedItem);
            checkWin();
        })
    }
})

/**
 * Adds the id of the grid clicked to the array that keeps
 * track of the player's inputs
 */
function addXToCombo(clickedItem){
    xCombinations.push(parseInt(clickedItem));
    console.log(xCombinations);
};

/**
 * Checks if one of the combinations has been reached
 */
function checkWin(){
    for(let combo of combinations){
        if(xCombinations.includes(combo[0]) && xCombinations.includes(combo[1]) && xCombinations.includes(combo[2])){
            alert("You won")
            //Clears array
            xCombinations.length = 0;
        };
    };
};