document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("player");
    const gameContainer = document.getElementById("gameContainer");
    const viewport = document.getElementById("viewport");
    const platforms = document.getElementsByClassName("platform");
    const hazards = document.getElementsByClassName("hazard"); // Updated to get elements by class

    const keys = {
        left: false,
        right: false,
        up: false
    };

    const settings = {
        gravity: 0.4,
        friction: 0.8,
        moveSpeed: 5,
        jumpStrength: 10
    };

    let playerState = {
        x: 150,
        y: 100,
        xVelocity: 0,
        yVelocity: 0,
        onGround: false,
        canJump: true  // Flag to track if player can jump
    };

    function resetPlayer() {
        playerState.x = 100;
        playerState.y = 100;
        playerState.xVelocity = 0;
        playerState.yVelocity = 0;
        gameContainer.style.transform = 'translateX(0px)';
    }

    function update() {
        // Apply gravity
        playerState.yVelocity += settings.gravity;
        
        // Apply horizontal movement
        if (keys.left) playerState.xVelocity = -settings.moveSpeed;
        else if (keys.right) playerState.xVelocity = settings.moveSpeed;
        else playerState.xVelocity *= settings.friction;
        
        // Update player position
        playerState.x += playerState.xVelocity;
        playerState.y += playerState.yVelocity;

        // Collision detection with platforms
        playerState.onGround = false;
        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];
            let platformRect = platform.getBoundingClientRect();
            let playerRect = player.getBoundingClientRect();

            // Simple collision detection
            if (playerRect.right > platformRect.left && 
                playerRect.left < platformRect.right && 
                playerRect.bottom > platformRect.top && 
                playerRect.top < platformRect.bottom) {
                
                if (playerRect.bottom - playerState.yVelocity <= platformRect.top) {
                    playerState.y = platformRect.top - playerRect.height;
                    playerState.yVelocity = 0;
                    playerState.onGround = true;
                    playerState.canJump = true; // Allow jumping when on ground
                }
            }
        }

        // Reset the player if they collide with a hazard
        let playerRect = player.getBoundingClientRect();
        for (let i = 0; i < hazards.length; i++) {
            let hazard = hazards[i];
            let hazardRect = hazard.getBoundingClientRect();

            if (playerRect.right > hazardRect.left && 
                playerRect.left < hazardRect.right && 
                playerRect.bottom > hazardRect.top && 
                playerRect.top < hazardRect.bottom) {
                resetPlayer();
            }
        }

        // Reset player if they fall out of the game container
        if (playerState.y + player.offsetHeight > gameContainer.offsetHeight || 
            playerState.x + player.offsetWidth < 0 || playerState.x > gameContainer.offsetWidth) {
            resetPlayer();
        }

        // Scroll the viewport with the player
        const viewportWidth = viewport.offsetWidth;
        const scrollThreshold = viewportWidth * 0.4;  // 40% of the screen width

        if (playerState.x > scrollThreshold) {
            gameContainer.style.transform = `translateX(${scrollThreshold - playerState.x}px)`;
        } else {
            gameContainer.style.transform = 'translateX(0px)';
        }

        // Update player element position
        player.style.left = playerState.x + "px";
        player.style.top = playerState.y + "px";

        requestAnimationFrame(update);
    }

    function keyDownHandler(e) {
        if (e.key === "ArrowLeft") keys.left = true;
        if (e.key === "ArrowRight") keys.right = true;
        if (e.key === "ArrowUp" && playerState.canJump) {
            keys.up = true;
            playerState.yVelocity = -settings.jumpStrength;
            playerState.onGround = false; // Ensure we don't double jump accidentally
            playerState.canJump = false;  // Prevent consecutive jumps
        }
    }

    function keyUpHandler(e) {
        if (e.key === "ArrowLeft") keys.left = false;
        if (e.key === "ArrowRight") keys.right = false;
        if (e.key === "ArrowUp") keys.up = false;
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    update();
});
