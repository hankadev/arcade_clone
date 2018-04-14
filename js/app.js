/* Enemies our player must avoid
 * bugs are starting on the left side of the screen,
 * only one bug per row (coordinates are given to specific bugs)
 * speed is randomly choosen from given interval
 */
var Enemy = function(x, y) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = Math.random() * 250 + 100;
};

/* movement from left to right is speed times dt parameter
 * dt ensures that the game runs same for all computers
 * if the bug reaches the right side of the canvas,
 * the bug starts at the left side, new speed is randomly assign
 */
Enemy.prototype.update = function(dt) {
  if(this.x > 500) {
    this.x = 0;
    this.speed = Math.random() * 100 + 50;
  } else {
    this.x = this.x + this.speed * dt;
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
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 200;
  this.y = 400;
};

/* Draw the player object on the screen
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// TODO: implement win - achieving the water - update method
// TODO: implement the collision between bug and player!!!
Player.prototype.update = function() {

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
  } else if ((key === "right") && (this.x <= 300)) {
    this.x += 100;
  }
};
/* creating 3 bugs using the Enemy object
 * every bug is given starting coordinates
 * define the allEnemies array with all bugs in it
 * creating player using Player object
 */
var bug1 = new Enemy(0,60);
var bug2 = new Enemy(100,145);
var bug3 = new Enemy(150,230);
var bug4 = new Enemy(300,60);
var bug5 = new Enemy(200,145);
var bug6 = new Enemy(400,230);
var allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];
var player = new Player();

/* listening for pressed keys
 * calling player.handleInput() method to move the player
 */
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
