console.log("Connected!");

document.addEventListener("DOMContentLoaded", function(){
    console.log("Loaded")

    let gridItem = document.getElementsByClassName("game-grid-item");

    for(let item of gridItem){
        item.addEventListener("click", function(){
            let clickedItem = item.getAttribute("grid-number");
            console.log(clickedItem)
            document.getElementsByClassName("game-grid-item")[parseInt(clickedItem - 1)].children[0].innerText = "x";
        })
    }
})