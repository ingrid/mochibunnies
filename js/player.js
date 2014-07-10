define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var maxSpeed = 400;
  var maxMass = 400;
  // 5 is smallest;
  var initialSize = 5;

  var player = function(x, y){
	jam.Sprite.call(this, x, y);

    this.mass = 4;
    this.speed = 100;
    this.interactive = true;


    this.setSize(initialSize);
    this.grow();
    this.drag = 200;
    // Action!
    this.on("update", function(dt) {
      this.acceleration.x = 0;
      this.acceleration.y = 0;
      if (this.interactive === true){
	    if(jam.Input.down("UP")) {
		  this.acceleration.y = -100;
	    }
	    if(jam.Input.down("DOWN")) {
		  this.acceleration.y = 100;
	    }
	    if(jam.Input.down("LEFT")) {
		  this.acceleration.x = -100;
	    }
	    if(jam.Input.down("RIGHT")) {
		  this.acceleration.x = 100;
	    }

        // Testing.
	    if(jam.Input.down("W")) {
		  this.grow();
	    }
	    if(jam.Input.down("S")) {
          this.shrink();
	    }
      }
    });

    // Super jenky drag.
    this.on("update", function(dt) {
      if (this.acceleration.x === 0){
        var d = this.drag * dt;
        if(this.velocity.x - d > 0){
          this.velocity.x = this.velocity.x - d;
        }
        else if(this.velocity.x + d < 0)
          this.velocity.x += d;
        else
          this.velocity.x = 0;
      }
      if (this.acceleration.y === 0){
        var d = this.drag * dt;
        if(this.velocity.y - d > 0){
          this.velocity.y = this.velocity.y - d;
        }
        else if(this.velocity.y + d < 0)
          this.velocity.y += d;
        else
          this.velocity.y = 0;
      }
    });
  };

  player.prototype = new jam.Sprite(0, 0);

  //s35, v100, s20
  // 255 - 0
  // size: 5 - 56
  // 51 grads
  player.prototype.setSize = function(size){
    if ((size >= 5) && (size <= 56)){
      var hue = Math.floor(255 - ((size - 5)* 5));
      var color = util.hsv_to_rgb(hue, 0.2, 1.0);
      var o_color = util.hsv_to_rgb(hue, 0.35, 1.0);
      var p_img = new proto.outcir(size, color, o_color);
      var l = size * 2;

      this.setImage(p_img.toDataURL(), l, l);
      this._renderOffsetX = -size;
      this._renderOffsetY = -size;
      this.size = size;
    }
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
