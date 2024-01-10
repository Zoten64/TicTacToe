console.log("Connected!");

// Global variables

//Possible win combinations
let combinations = []
//The grid items X has claimed
let xCombinations = []
//The grid items O has claimed
let oCombinatioms = []

document.addEventListener("DOMContentLoaded", function(){
    console.log("Loaded")

    let gridItem = document.getElementsByClassName("game-grid-item");

    for(let item of gridItem){
        item.addEventListener("click", function(){
            let clickedItem = item.getAttribute("grid-number");
            console.log(clickedItem)
            document.getElementsByClassName("game-grid-item")[parseInt(clickedItem - 1)].children[0].innerText = "X";
            addXToCombo(clickedItem);
        })
    }
})

function addXToCombo(clickedItem){
    xCombinations.push(parseInt(clickedItem))
    console.log(xCombinations)
};

function checkWin(clickedItem){
    
};