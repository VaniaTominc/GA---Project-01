# General Assembly - Project 01: Babushka Land.

## Overview

Pac-Man is a classic arcade game from the 80s. The player aims to eat all the food in a maze whilst being hunted by ghosts.

+ ### Timeframe

A 8 days solo project.

+ ### Demo version

<p align="center">
  <img src="https://i.ibb.co/5TSzy5d/babushkaland01.gif">
</p>

+ ### Deployed version

https://vaniatominc.github.io/GA-Project-01/ 

<br />

## Table of contents
+ Brief
+ Technologies used:
  - Frontend,
  - Development tools.
+ Process:
  - Planning,
  - JavaScript functionalities:
    + Creating grid,
    + Populating grid,
    + Pac-Man/Soldier’s movement,
    + Enemy,
    + The game.
  - Project walkthrough.
+ Bugs, challenges, wins
+ Extra features and key learnings:
  - Extra features,
  - Key learnings.

<br />

## Brief

+ **Render a game in the browser.**
+ **Be built on a grid**: do not use HTML Canvas for this.
+ **Design logic for winning** & visually display which player won.
+ **Include separate HTML / CSS / JavaScript files.**
+ **Stick with KISS** (Keep It Simple Stupid) **and DRY** (Don't Repeat Yourself) **principles**.
+ **Use JavaScript for DOM manipulation.**
+ **Deploy your game online**, where the rest of the world can access it (we will do this together at the end of the project).
+ **Use semantic markup for HTML and CSS** (adhere to best practices).

<br />

## Technologies used

+ **Frontend:**
  - HTML5,
  - CSS3,
  - Vanilla JavaScript.

+ **Development tools:**
  - Visual Studio Code,
  - Git (committing) & GitHub (storying my project),
  - Google Chrome development tools,
  - Adobe Photoshop (for images),
  - Zoom,
  - GitHub pages (deployment).

<br />

## Process

+ ### Planning (day 1)

First, I started with pseudo-code, and wrote down steps I wanted to take to achieve as many functionalities as possible for my game. The instructors agreed with my plan and gave me the green light to start with actual coding.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129629158-05deea28-da39-4634-84e5-25abe55a8e88.png">
</p>

**SCAN FRAMEWORKS I DRAW FOR THE PROJECT.**

+ ### JavaScript functionalities (day 1 – day 7) 

#### ➡️ Creating grid

I had to create a grid for my game. Since we learned about DOM before the project started, I decided to build my grid with JavaScript. By doing this, I didn't need to hard code my grid inside the HTML file with different divs. I could solve this with JavaScript instead.

The HTML has the main div with a ```class ='maze'```:

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129629778-c0cca0d1-5271-49a2-8d77-14a70d095b9d.png">
</p>
 
```class ='maze'``` is then called in my app.js with `querySelector`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129629853-bdc435ea-9f4f-43b8-94e2-5177cb68e6a7.png">
</p>

Once done, I created an empty array called ```cells``` which was meant for divs, created with DOM. I decided my grid would have 200 cells/divs. They would be stored inside the main div with a ```class ='maze'```. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129629891-df47d110-7feb-484e-a991-cc68c5b3f673.png">
</p>
 
To store 200 divs in array cells, I created a function using a for-loop that repeated 200 times and created a new mini div every time. They were stored inside the array `cells` with an ```appendChild``` method.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129629938-ad80be95-5f87-48ca-8596-be1d16fb0c7b.png">
</p>
 
For the grid to be displayed in the browser, the function must be called.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129629960-6536a8a1-f63f-4ff3-8f36-f6441b626e1b.png">
</p>
 
It was time to put my Pac-Man / Soldier on the grid. Here too, I decided to create him like I had built small divs. The function also needed an argument, because I wanted my soldier to move from one place to another. Once sorted, I had to "call" him inside the ```createGrid()``` function if I wanted him to be displayed with the rest of the grid.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630040-50886820-1e28-4278-93da-87ca1dc34627.png">
  <img src="(https://user-images.githubusercontent.com/83227280/129630047-677bac54-4491-4ed1-a54a-2027e14d08e3.png">
</p>
 
At the beginning of the game, the soldier's current position corresponds to the starting position. If a player loses, his soldier needs to return to his initial starting position.  

#### ➡️ Populating grid

In the classic Pac-Man game, there are obstacles in the grid. I decided to do the same. To achieve it, I created a new array with 200 items, each with a different number, spanning from 0 to 7. Each number would have a special purpose:

+ 0 – empty place,
+ 1 – soldier’s starting/current position,
+ 2 – obstacles,
+ 3 – points,
+ 4 – big points,
+ 5 – enemy one’s starting position,
+ 6 – enemy two’s starting position,
+ 7 – enemy three’s starting position,
+ 8 – enemy four’s starting position.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630086-b5f6a6bc-d834-487d-9350-961c492daa8e.png">
</p>
 
To populate the existing grid with numbers from the array `aMazing` and give it the final, visual look, I solved problem in this way.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630117-1b7c7c25-72c9-4eab-af24-f30d4baa3c97.png">
</p>
 
I did the same in other cases.

#### ➡️ Pac-Man/Soldier’s movement 

In all games, the player can move the hero with the keys on a keyboard. For the browser to recognize that the player is pressing keys, it is necessary to add ```eventListener``` to app.js.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630171-8b948dab-753b-493f-b795-543159129cb6.png">
</p>

JavaScript also has a unique code for each key on the keyboard. In my case, I only needed codes for the arrow keys (←, →, ↑, ↓):
+ 37 – left arrow,
+ 39 – right arrow,
+ 38 – up arrow,
+ 40 – down arrow.

With the special ```handleKeyUp()``` function, I used an if-else statement to determine which key was pressed, and I wrote a logic for soldier movement depending on the direction he was moving. There are also additional conditions within the main conditions. I am checking whether there is an obstacle in the direction of the soldier's movement or if there are coins on his path. In the end, my code / logic looked like this (for instance, if the player clicks right):

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630323-302e9bb8-c972-4959-b100-3fcd10c7ba64.png">
</p>
 
Every time a soldier picks up a coin, a prize of 10 points is added to the scoreboard, and a sound effect plays out. After being collected, a previously visible coin disappears from the grid.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630348-0f1b0f30-20b8-4dc2-a5a9-8dbe050a1cf7.png">
</p>
 
#### ➡️ Enemy

At the suggestion of the instructors, I initially created only one enemy and a function to move that enemy. Since I achieved this without much difficulty, my next step was to create more enemies.

As I had significant problems with the JavaScript ```Class``` during the lectures, I wanted to consolidate my JavaScript knowledge. For this, I decided to create enemies with a Class, a blueprint for creating objects. My constructor then accepted two arguments, ```namePresident``` and ```startingPosition```.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630425-ccc22dee-d152-4f82-b9c9-3efc888cf979.png">
</p>
 
The next step was to add values for each enemy in a separate variable. These variables were stored inside an array.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630445-e429e954-fa3f-431d-b911-0791e393ca70.png">
</p>
  
I populated enemies to their starting positions on the grid using an array method foreach. It had to be done in this way because enemies were stored inside an array.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630472-8cf021a2-56dc-4d19-9ce0-73f3b90585be.png">
</p>
 
The enemies hunt my soldier down. To do it, I gave them a logic with the function ```enemyMovement()```. The enemy can move randomly left, right, up, or down.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630496-f54fab64-8224-4077-b511-22abffe46286.png">
</p>
 
As they move, the enemies must be careful not to hit the wall, and simultaneously check if there is a soldier in their path. If they encounter an obstacle, they must get a new direction of movement. When they meet the soldier, he dies and the game restarts.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630536-7eec3412-e58a-49e7-add4-7c816664daae.png">
</p>
 
#### ➡️ The Game

As soon as the player presses the play button, the game begins. The game is controlled by ```setInterval``` which also triggers enemy movement.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630605-bd699a86-0c02-429c-84f2-a544e45bbd0e.png">
</p>
 
The player starts the game with three lives. If the player loses a life, the game restarts, the timer stops with ```clearInterval()``` method, the soldier and enemies return to their starting position, and the previously obtained points return to the initial state 0. If all lives are lost, the game is over.

<p align="center">
  <img src="https://user-images.githubusercontent.com/83227280/129630648-9554cdc3-a91a-47f7-9e4e-83aae70c9a3c.png">
</p>
 
+ ### Styling (day 1 – day 7)

Throughout the week, in addition to building JavaScript functions, I also worked on building CSS. From the beginning, I knew what my page was supposed to look like, but I didn’t know what colour scheme to use. Thus, it changed several times during the week. I wanted to create a “Soviet” themed game, and one of the ways to achieve it was to use colour scheme, typical for the Cold War period. I also chose sound effects that are more Russian-oriented. All in all, I think I managed to create a unique online game.

<br />

## Bugs, challenges, wins

+ ### Bugs

  - There were some unexplainable cases where Soldiers or Enemies disappeared from the grid, but I managed to sort the majority of the bugs during the coding week.
  - Not a bug, per se, but Mr. Trump has a red point on his face. I think it might be due to the opacity settings in the CSS file (equals to 1).
  - When the game ends, pop-up windows appear. If a player clicks on the “no” button, the website does not refresh and restart but reverts to the previous step. And the player has one more life. It is a bug for cheating.

+ ### Challenges

  - I didn't have enough time to implement the logic of the ghost movement properly, so I had to stick to the basic ghost logic. It is an area of functionality that I want to change in the future.

+ ### Wins

  - Working with the classes and understanding them how they behave in certain situations.
  - CSS styling and audio files. I managed to give my personal and unique touch to the classical game of Pac-Man.

<br />

## Future features and key learnings

+ ### Future features

  - Improving website responsiveness.
  - Creating a mobile friendly game where player can use their fingers’ touch to play.
  - Implement the logical movements of Ghosts, so they can effectively chase my Pac-Man / Soldier.
  - Adding more levels.
  - Different behaviour for Ghosts, depending on what type of coins are collected by Soldier. For example, when a Soldier collects a big Babushka, Presidents start to flee from the Soldier and try to hide from him.

+ ### Key Learnings

  - How to use JavaScript properly, as I had previously struggled to understand its concept. It was nice to see JavaScript working in a real environment.


