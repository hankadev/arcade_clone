/* Enemies our player must avoid
 * bugs are starting on the left side of the screen,
 * only one bug per row (coordinates are given to specific bugs)
 * speed is randomly choosen from given interval
 */
let Enemy = function(x, y) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = Math.random() * 200 + 50;
};

/* movement from left to right is speed times dt parameter
 * dt ensures that the game runs same for all computers
 * if the bug reaches the right side of the canvas,
 * the bug starts at the left side, new speed is randomly assign
 */
Enemy.prototype.update = function(dt) {
  if(this.x > 700) {
    this.x = -100;
    this.speed = Math.random() * 200 + 50;
  } else {
    this.x = this.x + this.speed * dt;
  }

  if((this.y === player.y) && (this.x + 75 > player.x && this.x < player.x + 75) && (player.updatePlayer === true)) {
    player.updatePlayerScore(-50);
    player.lives -= 1;
    player.updatePlayer = false;
  }
};

/* Draw the enemy object on the screen
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* player initial position - last row on the canvas, in center
 * the image for the player is defined here
 */
let Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 300;
  this.y = 400;
  this.score = 0;
  this.lives = 3;
  this.updatePlayer = true;
};

/* Draw the player object on the screen
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
  /* if player reaches water, put him back to initial position
   * and increment the player score
   */
  if (this.y === -10 && this.updatePlayer === true) {
    this.updatePlayerScore(50);
  }
  this.updatePlayerLives();
};

Player.prototype.updatePlayerScore = function(points) {
  player.score += points;
  document.querySelector(".score").innerHTML = player.score;
  player.updatePlayer = false;
  setTimeout(function() {
    player.y = 400;
    player.x = 300;
    player.updatePlayer = true;
  }, 100);
};

Player.prototype.updatePlayerLives = function() {
  let lives = document.querySelector(".lives");
  if (this.lives === 3) {
    lives.innerHTML = '<img src="images/Heart.png" alt="heart icon">' +
      '<img src="images/Heart.png" alt="heart icon">' +
      '<img src="images/Heart.png" alt="heart icon">';
  } else if (this.lives === 2) {
    lives.innerHTML = '<img src="images/Heart.png" alt="heart icon">' +
      '<img src="images/Heart.png" alt="heart icon">';
  } else if (this.lives === 1) {
    lives.innerHTML = '<img src="images/Heart.png" alt="heart icon">';
  }  else {
    lives.innerHTML = "";
    // stop the game when player has no lives
    allEnemies.forEach(function(enemy) {
      enemy.speed = 0;
    });
    // show modal with player score and restart button
    let modalScore = document.querySelector(".modalScore");
    modalScore.innerHTML = player.score;
    let modal = document.querySelector(".modalWindow");
    modal.style.display = "flex";
    // add event listener to replay button to restart the game
    let replay = document.querySelector(".replay");
    replay.addEventListener("click", function() {
      window.location.reload(false);
    });
  }
};

/* this function handles the movement of the player
 */
Player.prototype.handleInput = function(key) {
  if ((key === "up") && (this.y >= 72)) {
    this.y -= 82;
  } else if ((key === "down") && (this.y <= 318)) {
    this.y += 82;
  } else if ((key === "left") && (this.x >= 100)) {
    this.x -= 100;
  } else if ((key === "right") && (this.x <= 500)) {
    this.x += 100;
  }
};

/* Stars - randomly positioned within the canvas
 */
let Star = function() {
  this.sprite = "images/Star.png";
  this.x = Math.floor(Math.random() * 7) * 100;
  let starWidth = [72, 154, 236, 318];
  this.y = starWidth[Math.floor(Math.random() * 4)];
};

/* Draw the star object on the screen
 */
Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.update = function() {
  /* player - star collision => increment player score
   * and reposition the star
   */
  if((this.y === player.y) && (this.x + 75 > player.x && this.x < player.x + 75)) {
    player.score += 100;
    document.querySelector(".score").innerHTML = player.score;
    this.x = Math.floor(Math.random() * 7) * 100;
    let starWidth = [72, 154, 236, 318];
    this.y = starWidth[Math.floor(Math.random() * 4)];
  }
};

/* creating bugs using the Enemy object
 * every bug is given starting coordinates
 * define the allEnemies array with all bugs in it
 * creating player using Player object
 */
let bug1 = new Enemy(0,72);
let bug2 = new Enemy(200,154);
let bug3 = new Enemy(100,236);
let bug4 = new Enemy(100, 318);
let bug5 = new Enemy(500,72);
let bug6 = new Enemy(300,154);
let bug7 = new Enemy(400,236);
let bug8 = new Enemy(600, 318);
let allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6, bug7, bug8];
let player = new Player();
let star1 = new Star();
let star2 = new Star();
let star3 = new Star();
let allStars = [star1, star2, star3];

/* listening for pressed keys
 * calling player.handleInput() method to move the player
 */
document.addEventListener("keyup", function(e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
