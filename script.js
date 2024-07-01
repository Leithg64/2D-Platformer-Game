document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("player");
    const gameContainer = document.getElementById("gameContainer");
    const platforms = document.getElementsByClassName("platform");

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
        x: 100,
        y: 100,
        xVelocity: 0,
        yVelocity: 0,
        onGround: false
    };

    function update() {
        // Apply gravity
        playerState.yVelocity += settings.gravity;
        
        // Apply horizontal movement
        if (keys.left) playerState.xVelocity = -settings.moveSpeed;
        if (keys.right) playerState.xVelocity = settings.moveSpeed;
        if (!keys.left && !keys.right) playerState.xVelocity *= settings.friction;
        
        // Update player position
        playerState.x += playerState.xVelocity;
        playerState.y += playerState.yVelocity;

        // Collision detection
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
                }
            }
        }

        // Prevent player from falling out of the game container
        if (playerState.y + player.offsetHeight > gameContainer.offsetHeight) {
            playerState.y = gameContainer.offsetHeight - player.offsetHeight;
            playerState.yVelocity = 0;
            playerState.onGround = true;
        }

        // Prevent player from moving out of the game container horizontally
        if (playerState.x < 0) playerState.x = 0;
        if (playerState.x + player.offsetWidth > gameContainer.offsetWidth) playerState.x = gameContainer.offsetWidth - player.offsetWidth;

        // Update player element position
        player.style.left = playerState.x + "px";
        player.style.top = playerState.y + "px";

        requestAnimationFrame(update);
    }

    function keyDownHandler(e) {
        if (e.key === "ArrowLeft") keys.left = true;
        if (e.key === "ArrowRight") keys.right = true;
        if (e.key === "ArrowUp" && playerState.onGround) {
            keys.up = true;
            playerState.yVelocity = -settings.jumpStrength;
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
