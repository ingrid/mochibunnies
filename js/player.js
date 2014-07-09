define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var maxSpeed = 400;
  var maxMass = 400;
  var initialSize = 10;

  var player = function(x, y){
	jam.Sprite.call(this, x, y);

    this.mass = 4;
    this.speed = 100;
    this.interactive = true;


    this.setSize(initialSize);
    this.grow();

    this.on("update", function(dt) {
      if (this.interactive === true){
	    if(jam.Input.justPressed("UP")) {
		  this.velocity.y = -100;
	    }
	    if(jam.Input.justPressed("DOWN")) {
		  this.velocity.y = 100;
	    }
	    if(jam.Input.justPressed("LEFT")) {
		  this.velocity.x = -100;
	    }
	    if(jam.Input.justPressed("RIGHT")) {
		  this.velocity.x = 100;
	    }

        // Testing.
	    if(jam.Input.justPressed("W")) {
		  this.grow();
	    }
	    if(jam.Input.justPressed("S")) {
          this.shrink();
	    }
      }
    });
  };

  player.prototype = new jam.Sprite(0, 0);

  player.prototype.setSize = function(size){
    var p_img = new proto.cir(size, 255, 0, 0);
    var l = size * 2;

    this.setImage(p_img.toDataURL(), l, l);
    this._renderOffsetX = -size;
    this._renderOffsetY = -size;
    this.size = size;
  };

  player.prototype.grow = function(){
    // TODO: Add boundry checking.
    this.setSize(this.size + 1);
  };

  player.prototype.shrink = function(){
    // TODO: Add boundry checking.
    this.setSize(this.size - 1);
  };

  return player;
});
