OVERVIEW

Pac-Man is a classic arcade game from the 80s. The player aims to eat all the food in a maze whilst being hunted by ghosts.

Timeframe

A 8 days solo project.



Demo version

[img]https://i.ibb.co/5TSzy5d/babushkaland01.gif[/img] [img]https://i.ibb.co/hKKkX3D/babushkaland02.gif[/img] 

Deployed version

https://vaniatominc.github.io/GA-Project-01/ 

TABLE OF CONTENTS
Brief
Technologies used:
Frontend,
Development tools.
Process:
Planning,
JavaScript functionalities:
Creating grid,
Populating grid,
Pac-Man/Soldier’s movement,
Enemy,
The game.
Project walkthrough.
Bugs, challenges, wins
Extra features and key learnings:
Extra features,
Key learnings.

BRIEF

Render a game in the browser.
Be built on a grid: do not use HTML Canvas for this.
Design logic for winning & visually display which player won.
Include separate HTML / CSS / JavaScript files.
Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles.
Use Javascrip for DOM manipulation.
Deploy your game online, where the rest of the world can access it (we will do this together at the end of the project).
Use semantic markup for HTML and CSS (adhere to best practices).

TECHNOLOGIES USED

Frontend:

HTML5,
CSS3,
Vanilla JavaScript.

Development tools:

Visual Studio Code,
Git (committing) & GitHub (storying my project),
Google Chrome development tools,
Adobe Photoshop (for images),
Zoom,
GitHub pages (deployment).

PROCESS

Planning – day 1

First, I started with pseudo-code, and wrote down steps I wanted to take to achieve as many functionalities as possible for my game. The instructors agreed with my plan and gave me the green light to start with actual coding.

I NEED TO SCAN FRAMEWORKS I DRAW FOR THE PROJECT.

JavaScript functionalities (day 1 – day 7) 

Creating grid

I had to create a grid for my game. Since we learned about DOM before the project started, I decided to build my grid with JavaScript. By doing this, I didn't need to hard code my grid inside the HTML file with different divs. I could solve this with JavaScript instead.

The HTML has the main div with a class ='maze':



class ='maze' is then called in my app.js with querySelector.



Once done, I created an empty array called cells which was meant for divs, created with DOM. I decided my grid would have 200 cells/divs. They would be stored inside the main div with a class ='maze'. 



To store 200 divs in array cells, I created a function using a for-loop that repeated 200 times and created a new mini div every time. They were stored inside the array cells with an appendChild method.



For the grid to be displayed in the browser, the function must be called.


It was time to put my Pac-Man / Soldier on the grid. Here too, I decided to create him like I had built small divs. The function also needed an argument, because I wanted my soldier to move from one place to another. Once sorted, I had to "call" him inside the createGrid() function if I wanted him to be displayed with the rest of the grid.




At the beginning of the game, the soldier's current position corresponds to the starting position. If a player loses, his soldier needs to return to his initial starting position.  

Populating grid

In the classic Pac-Man game, there are obstacles in the grid. I decided to do the same. To achieve it, I created a new array with 200 items, each with a different number, spanning from 0 to 7. Each number would have a special purpose:

0 – empty place,
1 – soldier’s starting/current position,
2 – obstacles,
3 – points,
4 – big points,
5 – enemy one’s starting position,
6 – enemy two’s starting position,
7 – enemy three’s starting position,
8 – enemy four’s starting position.



To populate the existing grid with numbers from the array aMazing and give it the final, visual look, I solved the problem in this way.



I did the same in other cases.

Pac-Man/Soldier’s movement 

In all games, the player can move the hero with the keys on a keyboard. For the browser to recognize that the player is pressing keys, it is necessary to add eventListener to app.js.



JavaScript also has a unique code for each key on the keyboard. In my case, I only needed codes for the arrow keys (←, →, ↑, ↓):
37 – left arrow,
39 – right arrow,
38 – up arrow,
40 – down arrow.

With the special handleKeyUp() function, I used an if-else statement to determine which key was pressed, and I wrote a logic for soldier movement depending on the direction he was moving. There are also additional conditions within the main conditions. I am checking whether there is an obstacle in the direction of the soldier's movement or if there are coins on his path. In the end, my code / logic looked like this (for instance, if the player clicks right):



Every time a soldier picks up a coin, a prize of 10 points is added to the scoreboard, and a sound effect plays out. After being collected, a previously visible coin disappears from the grid.



Enemy

At the suggestion of the instructors, I initially created only one enemy and a function to move that enemy. Since I achieved this without much difficulty, my next step was to create more enemies.

As I had significant problems with the JavaScript Class during the lectures, I wanted to consolidate my JavaScript knowledge. For this, I decided to create enemies with a Class, a blueprint for creating objects. My constructor then accepted two arguments, namePresident and startingPosition.



The next step was to add values for each enemy in a separate variable. These variables were stored inside an array.

 

I populated enemies to their starting positions on the grid using an array method foreach. It had to be done in this way because enemies were stored inside an array.



The enemies hunt my soldier down. To do it, I gave them a logic with the function enemyMovement(). The enemy can move randomly left, right, up, or down.



As they move, the enemies must be careful not to hit the wall, and simultaneously check if there is a soldier in their path. If they encounter an obstacle, they must get a new direction of movement. When they meet the soldier, he dies and the game restarts.



The Game

As soon as the player presses the play button, the game begins. The game is controlled by setInterval which also triggers enemy movement.



The player starts the game with three lives. If the player loses a life, the game restarts, the timer stops with clearInterval() method, the soldier and enemies return to their starting position, and the previously obtained points return to the initial state 0. If all lives are lost, the game is over.



Styling (day 1 – day 7)

Throughout the week, in addition to building JavaScript functions, I also worked on building CSS. From the beginning, I knew what my page was supposed to look like, but I didn’t know what colour scheme to use. Thus, it changed several times during the week. I wanted to create a “Soviet” themed game, and one of the ways to achieve it was to use a colour scheme, typical for the Cold War period. I also chose sound effects that are more Russian-oriented. All in all, I think I managed to create a unique online game.

BUGS, BLOCKERS, WINS

Bugs

There were some unexplainable cases where Soldiers or Enemies disappeared from the grid, but I managed to sort the majority of the bugs during the coding week.
Not a bug, per se, but Mr. Trump has a red point on his face. I think it might be due to the opacity settings in the CSS file (equals to 1).
When the game ends, pop-up windows appear. If a player clicks on the “no” button, the website does not refresh and restart but reverts to the previous step. And the player has one more life. It is a bug for cheating.



Challenges

I didn't have enough time to implement the logic of the ghost movement properly, so I had to stick to the basic ghost logic. It is an area of functionality that I want to change in the future.

Wins

Working with the classes and understanding how they behave in certain situations.
CSS styling and audio files. I managed to give my personal and unique touch to the classical game of Pac-Man.


FUTURE FEATURES AND KEY LEARNINGS

Future features

Improving website responsiveness
Creating a mobile friendly game where players can use their fingers’ touch to play.
Implement the logical movements of Ghosts, so they can effectively chase my Pac-Man / Soldier.
Adding more levels.
Different behaviour for Ghosts, depending on what type of coins are collected by Soldier. For example, when a Soldier collects a big Babushka, Presidents start to flee from the Soldier and try to hide from him.

Key Learnings

How to use JavaScript properly, as I had previously struggled to understand its concept. It was nice to see JavaScript working in a real environment.



