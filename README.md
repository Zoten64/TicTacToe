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

The goal of the project is to make an unbeatable TicTacToe ai as well as have a separate site with added functionality and advanced options including difficulty, color theme and win effects. The goal of the project was to learn javascript, and I feel like I did learn a lot.

## Design

The design is simple and easy to navigate. It features a simple header, grid and a clear button as well as a link to the customizeable site.


<img src="documentation\other\design_index.png">

<br>

The customizeable page is just as simple, only adding 3 more buttons added that flips through options for the different settings


<img src="documentation\other\design_custom.png">


Both pages have very simple hover effects on the buttons, simply making them enlarge slightly on hover

The color schemes of the second page are taken from [happy hues](https://www.happyhues.co/palettes/9)

## User stories

1. As a player I want to play a tic tac toe game against an ai so that I can challenge myself
2. As a player I want the game to have a nice layout that is easy to understand
3. As a mobile user I want the website to be optimized for mobile to make it easier to navigate
4. As a desktop user I want the website to be optimized for desktop to make it easier to navigate
5. As a visually impaired user I want the website to be accessible so that I can also play
6. As a player I want difficulty settings
7. As a player I want customizeability

## Features

**Simple page design**


As stated above, the page has a very simple and minimalistic design in order to be easily understandable and accessible. It is made with semantic html in mind, featuring a header, main element and a footer. There are no unnecessary elements to distract from the main focus. The page is also fully responsive so the game is playable on both mobile and pc.

<img src="documentation\other\design_index.png">
<img src="documentation\other\design_custom.png">

<br>
User stories covered: 2, 3, 4, 5

**AI player**


<img src="documentation\other\tictactoe_ai.gif">


The O player is made up by a few functions that detect potential wins and losses to force the player into a draw if it is unable to win.
This is made up of a few different functions that are called depending on the difficulty the player have chosen. For example the impossible mode will run all checks before determining a move, the hard move will only check if the player has placed their move in a corner etc. 

<br>
User stories covered: 1, 6
<br>

**Tally counter**

<img src="documentation\other\tally_counter.png">

The tally counter keeps track of wins, draws and losses. It is clearly labeled as such.

<br>

User stories covered: 1
<br> 

**Clear button**


<img src="documentation\other\tictactoe_clear.gif">


The clear button clears the entire board by resetting all relevant variables and changing the grid item divs to "", aka empty. It is big and very clearly visible amking it easy to understand what the purpose is

<br>

User stories covered: 1
<br>

**Customizeable page**

<img src="documentation\other\custom_page_buttons.png">

The customizeable page features 3 extra buttons that allows for customizeability, including difficulty, color theme and win effect. See below for more. All 3 buttons works by cycling between the options.

<br>

User stories covered: 7
<br>

**Difficulty button**

<img src="documentation\other\tictactoe_difficulty.gif">

The difficulty button cycles between 5 different difficulties, Impossible, Hard, Medium, Easy and Extremely easy

<br>

User stories covered: 6, 7
<br>

**Color theme button**


<img src="documentation\other\tictactoe_color.gif">


The difficulty button cycles between 7 different color themes. See gif.

<br>

User stories covered: 7
<br>

**Win effect button**


<img src="documentation\other\tictactoe_win.gif">


The win effect button cycles through 4 different options, None, Confetti, Sound and Both. This effect will play upon a player win. For sound you need to try it out yourself [here](https://zoten64.github.io/TicTacToe/custom_tictactoe.html)

<br>

User stories covered: 7
<br>

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
| Ai stops making a move in certain situations after player has placed their move on the sides | Fixed an uncaught mistake where the backup move code block was inside the else if statement that only runs on medium and hard modes | 


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
- Happy hues
- Confetti Canvas


## Wireframes

<details><summary>Impossible TicTacToe</summary>
<img src="documentation/wireframes/Impossible_tictactoe.png">
</details>
<details><summary>Customizeable TicTacToe</summary>
<img src="documentation/wireframes/customizeable_tictactoe.png">
</details>

## Validation and testing
**HTML**


<details><summary>Main Page</summary>
<img src="documentation\validation\html_index.png">
</details>

<details><summary>Customizeable TicTacToe</summary>
<img src="documentation\validation\html_custom.png">
</details>
<br>

**CSS**

<details><summary>CSS</summary>
<img src="documentation\validation\css_validation.png">
</details>
<br>

**Javascript**


<details><summary>javascript</summary>
<img src="documentation\validation\javascript_validation.png">


Explaination: The undefined variable "confetti" is a function coming from another script. [Credits to the script here](#credits)
</details>
<br>

**Wave accessibility**


<details><summary>Main page</summary>
<img src="documentation\validation\wave_index.png">
</details>

<details><summary>Customizeable TicTacToe</summary>
<img src="documentation\validation\wave_custom.png">
</details>
<br>

**Lighthouse performance**

<details><summary>Main page</summary>
<img src="documentation\validation\lighthouse_index.png">
</details>

<details><summary>Customizeable TicTacToe</summary>
<img src="documentation\validation\lighthouse_custom.png">
</details>
<br>

**Other tests**
<br>

**Browsers tested**


- Firefox
- Chrome
- In theory any chromium based browser should work, such as edge, brave, newer versions of opera etc. 

<br>

**Testing Devices**


- Desktop pc (modified prebuild), 16GB RAM, i5-9400F
- Nothing Phone 2
- Microsoft surface pro
- HP probook


<br>

**Testing user stories**

1. As a player I want to play a tic tac toe game against an ai so that I can challenge myself

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| Player O is an AI | Play the game | The AI will play against the player | Works as expected |

2. As a player I want the game to have a nice layout that is easy to understand

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| A very simple layout featuring only the board and at most 4 buttons | Go onto the site | A simple layout that works across devices | Works as expected |

3. As a mobile user I want the website to be optimized for mobile to make it easier to navigate

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| Responsive design for mobile | Visit the site on mobile | A website suitable for mobile | Works as expected |

4. As a desktop user I want the website to be optimized for desktop to make it easier to navigate

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| Responsive design for desktop | Visit the site on a pc | A website suitable for PCs | Works as expected |

5. As a visually impaired user I want the website to be accessible so that I can also play

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| Semantic makeup of the html and high contrast | Visit the site | A website that is simple and accessible | Works as expected |

6. As a player I want difficulty settings

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| Difficulty settings on the customizeable TicTacToe page | From the main page, scroll to the footer and click the link. Press the "Difficulty" button to change the difficulty | The button changes the way the AI plays depending on the set difficulty | Works as expected |

7. As a player I want customizeability

| Feature  | Action | Expected results | Actual results |
| ------------- | ------------- | ------------- | ------------- |
| Second 'customizeable tictactoe" page | From the footer, click the link | A website with 3 different settings | Works as expected |
| Difficulty setting| On the customizeable page, press the "Difficulty" button to change the difficulty | The button changes the way the AI plays depending on the set difficulty | Works as expected |
| Color Theme changer | On the customizeable page, press the "color Theme" button to change the color theme | The button should change the color theme | Works as expected |
| Win effect changer | On the customizeable page, press the "Win effect" button to change the Win effect | Depending on the setting it should deploy nothing, confetti, play a sound or both when the player wins | Works as expected |


<br>

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

- Confetti Canvas by [catdad on github](https://github.com/catdad/canvas-confetti)
- Color palettes from [happy hues](https://www.happyhues.co/palettes/17)
- Sound effect from [youtube](https://www.youtube.com/watch?v=0CqEKoy-fIQ)