# Tic Tac Toe
**Impossible base game and an extra customizeable page**

## [Link to website](https://zoten64.github.io/TicTacToe/)

## Table of Contents:

* [Goals and target audience](#goals-and-target-audience)
* [Design](#design)
* [User stories](#user-stories)
* [Features](#features)
* [Bugs and fixes](#bugs-and-fixes)
* [Technologies and tools](#technologies-and-tools)
* [Wireframes](#wireframes)
* [Validation and testing](#validation-and-testing)
* [Deployment](#deployment)
* [Credits](#credits)

## Goals and target audience

The goal of the project is to make an unbeatable TicTacToe ai as well as have a separate site with added functionality and advanced options including difficulty.

## Design


## User stories

1. As a player I want to play a tic tac toe game against an ai so that I can challenge myself
2. As a player I want the game to have a nice layout that is easy to understand
3. As a mobile user I want the website to be optimized for mobile to make it easier to navigate
4. As a desktop user I want the website to be optimized for desktop to make it easier to navigate
5. As a visually impaired user I want the website to be accessible so that I can also play
6. As a player I want difficulty settings
7. As a player I want customizeability
8. As a player I want to have fun playing 

## Features


## Bugs and fixes

Most of these bugs and fixes are now redundant as I rewrote the script to make it easier to maintain

| Bug  | Fix |
| ------------- | ------------- |
| AI is able to win when a valid combo has not been achieved  | Forgot to change xCombination to oCombination in the check win section as it was copied and pasted |
| Player can still make a move after the ai has won | Add checkWin() after the AI Move which locks the board |
| Player can override the AI moves| Add an if statement that checks if the move has been entered by the AI already | 
| Throws "Uncaught TypeError: document.getElementsByClassName(...)[(move - 1)] is undefined" every time the player wins on a full board| Check is the board is locked before the AI can make a move |
| Player gains double points when winning | Move the checkWin() function after the AI move to the AIMove function in order to make sure the player's win isn't checked twice per move |
| Throws an error when the game ends in a draw | Add a separate function that checks for draws and locks the board, preventing the ai from trying to make more moves |
| User can override their own move | Add a check to make sure that the users move isn't already on the board |
| The game counts wins/losses when the board is full as a draw | Check if the AI move is undefined before changing the draw counter. This also fixed the error thrown without having a seperate checker function |
| AI makes unlimited moves until it wins after implementing minimax algorithm | Add a "return false" if there is no winning move, stopping the execution of the function |
| AI wins on combinations it shouldn't | The temporary array wasn't a proper copy |
| AI do not recognize when a win is possible | The temporary list was all messed up. Use a more reliable way to clone an array using spread |
| Player gains double points sometimes when reaching a board where 2 rows are considered wins | Fixed itself with some code cleanup |
| X does not show up on the screen when squares are pressed after a reset | The originalboard variable was being overriden in a function where it shouldn't have been. Made a copy of it and used that instead |
 
Below are bugs that occured in the new script. Halfway through I scrapped the whole minimax algorithm idea in favor of a simple case by case calculation as I could not get it to work.

| Bug  | Fix |
| ------------- | ------------- |
| The ai doesn't place a move in certain conditions | Make it default to the first available move |
| The ai doesn't behave with the difficulty it's supposed to after implementing difficulties | Some of the comparisons for difficulty if statements were not capitalized and therefor did not run |
| Difficulty is undefined on the main page | Make the currentDifficultyString = "Impossible" by default|
| Script throws an error on the main page about not being able to find certain elements | Add a variable identifying which page the script is running on |


## Technologies and tools
**Languages**
- HTML
- CSS
- Javascript

**Tools**
- Git/github
- Visual Studio Code
- Figma
- Firefox dev tools
- Chrome dev tools (Briefly)


## Wireframes

<details><summary>Impossible TicTacToe</summary>
<img src="documentation/wireframes/Impossible_tictactoe.png">
</details>
<details><summary>Customizeable TicTacToe</summary>
<img src="documentation/wireframes/customizeable_tictactoe.png">
</details>

## Validation and testing
**HTML**


**CSS**


**Javascript**


**Wave accessibility**


**Lighthouse performance**


**Other tests**


**Browsers tested**


**Testing Devices**


**Testing user stories**


## Deployment

**Deploying and accessing the website on github pages**

Deployed on github pages. [Link to website](https://zoten64.github.io/TicTacToe/)
The steps taken to deploy is:
- Go to the repository
- Find the settings tab
- Go to pages
- Click source and choose "Deploy from branch"
- Choose Main as the branch and click save
- Wait a few minutes while github compiles the page
- Click the link at the top of the page to go to your website

**How to fork the project**

- Navigate to the github repository (You're probably here already)
- In the right corner click fork and choose a name

**How to clone the project**

Prerequisities:

- Have git downloaded and configured

steps:

- Go to the repository (You're probably here already)
- Click the code button
- Copy the url
- Open git and change the directory to the parent directory that you want the project to clone to
- Write "git clone [the link you just copied]", in this case "git clone https://github.com/Zoten64/TicTacToe.git"

## Credits
