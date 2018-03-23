// Enemies our player must avoid
var Enemy = function(x, y) {
  /* bugs are starting on the left side of the screen,
   * only one bug per row (coordinates are given to specific bugs)
   * speed is randomly choosen from given interval
   */
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = Math.random() * 150 + 50;
};

Enemy.prototype.update = function(dt) {
  /* movement from left to right is speed times dt parameter
   * dt ensures that the game runs same for all computers
   * if the bug reaches the right side of the canvas,
   * the bug starts at the left side, new speed is randomly assign
   */
  if(this.x > 500) {
    this.x = 0;
    this.speed = Math.random() * 100 + 50;
  } else {
    this.x = this.x + this.speed * dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 200;
  this.y = 400;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {

};

Player.handleInput = function(key) {

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(0,60);
var bug2 = new Enemy(0,145);
var bug3 = new Enemy(0,230);
var allEnemies = [bug1, bug2, bug3];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
