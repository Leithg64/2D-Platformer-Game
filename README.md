2D PLATFORMER GAME
By Leith Green

Project Overview
The "2D Platformer Game" is a browser-based game developed using HTML, CSS, and JavaScript. Players navigate a character through a series of platforms, avoiding hazards, to reach a goal. The game features realistic movement mechanics, collision detection, and a victory screen upon completion.

HTML Files:
index.html
The main menu page with a start button that redirects to the game.

game.html:
The main game interface containing the player, platforms, hazards, and goal elements.

game_complete.html
The victory screen displayed when the player reaches the goal.

CSS File:
styles.css
Defines the visual styling of the game elements, including the player, platforms, hazards, and the game container. The file also includes animations for the moving hazards. All custom art created in Adobe Fresco by me.


JavaScript File:
script.js
Manages the game logic, player movements, collision detection, and game state updates. Key functions include:

resetPlayer
Resets the player’s position and velocity to the initial state, typically called when the player collides with a hazard or falls off the game area.

checkGoalCollision
Checks if the player has reached the goal area. If the player collides with the goal, the game redirects to the victory screen.

Update()
The main game loop, called continuously using requestAnimationFrame. It handles physics (gravity and friction), player movement, collision detection with platforms and hazards, and updates the player’s position. It also manages the viewport scrolling to follow the player.

keyDownHandler
Handles keydown events to move the player left, right, or up. It updates the movement keys’ states and initiates jumping.

keyUpHandler
Handles keyup events to stop the player's movement when the corresponding keys are released.

document.addEventListener("DOMContentLoaded", function() { ... })
Initializes the game elements, such as the player, game container, viewport, platforms, hazards, and goal. It sets up event listeners for keydown and keyup events.

Key Features:
•	Player Movement: Implemented with gravity and friction for realistic motion.
•	Collision Detection: Ensures the player interacts correctly with platforms and hazards.
•	Victory Condition: Reaching the goal triggers a redirection to a victory screen.
•	Hazards: Animated elements that reset the player upon collision.
•	Viewport Scrolling: The game container scrolls with the player to create a continuous gameplay experience.

Conclusion
This project demonstrates the fundamentals of a 2D platformer game with basic mechanics such as player movement, collision detection, and goal achievement. The clear separation of HTML, CSS, and JavaScript allows for easy maintenance and scalability. This structure provides a solid foundation for further development and enhancements. Thanks for reading, I hope you enjoyed the project. Check out my portfolio and GitHub for more interesting projects! 
-Leith Green


 
