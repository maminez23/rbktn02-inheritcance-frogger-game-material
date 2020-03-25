// Enemies our player must avoid
/*
   Inside the app.js file, you will need to implement the Player and the Enemy classes, using Object-Oriented JavaScript. Part of the code for the Enemy is provided to you, and you will need to complete the following:
   *	The Enemy function, which initiates the Enemy by:
   *	Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
   *	The update method for the Enemy
   *	Updates the Enemy location (you need to implement)
   *	EXTRA: RANDOMIZES ENEMY RE-START SPEED
   *	              //TODO: MAKE ENEMIES DO NOT COINCEDE IN ROW 
   *	Handles collision with the Player (you need to implement)	
   *	You can add your own Enemy methods as needed
 */



var Enemy = function(sens, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.h = canvas.height
    this.w = canvas.width

    this.sens  = sens;
    if(y > this.h){
        this.y = y - this.h
    }
    else{
        this.y = y
    }

    this.x = this.sens+1 && this.w

    this.speed = this.sens*Math.random() * 150

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png' ;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;
    if(Math.ceil(this.x) > this.w) {
        this.x= -90;
    }
    if(Math.ceil(this.x) < -90) {
        this.x = this.w;
    }
    if(Math.abs(player.x - this.x) < 40 && Math.abs(player.y - this.y) < 40) {

        player.x = this.w /2 -52.5;
        player.y = this.h - 176;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.sens === -1) {
        function flipHorizontally(img,x,y){
            ctx.translate(x+img.width,y);

            // scaleX by -1; this "trick" flips horizontally
            ctx.scale(-1,1);

            // draw the img
            // no need for x,y since we've already translated
            ctx.drawImage(img,0,0);

            // always clean up -- reset transformations to default
            ctx.setTransform(1,0,0,1,0,0);
        }
        flipHorizontally(Resources.get(this.sprite), this.x, this.y)
        function start(){
            //ctx.drawImage(Resources.get('images/enemy-bug.png'), this.x, this.y);
            flipHorizontally(Resources.get('images/enemy-bug.png'), this.x, this.y);

        }
        start()
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.h = canvas.height -176
    this.w = canvas.width - 105
    this.x = this.w /2;
    this.y = this.h  ;
    this.level = 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png' ;
};
Player.prototype.update = function() {
    // this.y -= 3
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(direction) {
    if(direction === 'left'  && this.x > 2) {
        this.x -= 50;
    } else if(direction === 'right'&& this.x < this.w - 2) {
        this.x += 50;
    }
    else if(direction === 'up' && this.y > 0) {

        this.y -= 50;
        if(this.y === -20){
            this.level ++
            if(canvas.width < 1200){
                canvas.width += 202
                this.w += 200
                this.x = this.w/2;
                this.y = this.h;
                for(var bug of allEnemies){
                    bug.w = canvas.width
                }
                for (var i = 1; i < allEnemies.length; i++){
                    allEnemies[i].y -= 10*i
                }
                var s = allEnemies[allEnemies.length - 1].sens * (-1)
                var pos = allEnemies[allEnemies.length - 1].y +(100 - 10*this.level)

                allEnemies.push(new Enemy(s,pos))
            }



            // level(this.level)
        }
    }
    else if(direction === 'down' && this.y < this.h) {
        this.y += 50;
    }
}
//0<y<430
//0<x<400

var allEnemies = [new Enemy (-1,20), new Enemy (1,120), new Enemy(-1,220), new Enemy(1, 320)]
var player = new Player()
var allPlayer = [player]
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});