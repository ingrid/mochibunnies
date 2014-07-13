define(["jam", "./proto", "./util", "./player"], function(jam, proto, util, player) {

  // Possible bunny colors. Maybe tie this to size?
  var colors = [
    [176, 162, 197],
    [167, 201, 204],
    [197, 224, 224],
    [237, 248, 249],
    [255, 239, 239]
  ]

  var bunny = function(x, y){
    // TODO: Maybe player can inherit from this.
	jam.Sprite.call(this, x, y);

    this.squish = new jam.Sprite.Animation([1], 0, 0, 0, function(){
    });

    this.hop = new jam.Sprite.Animation([0], 0, 0, 0, function(){
    });

    this.setSize(5);
    this.hopping = false;
    this.hopDt = 0;
    // Hop destination, not end destination.
    // Destination direction?
    this.destination = {
      x: this.x,
      y: this.y
    }
    this.setImage("bunny.png", 17, 17);
    this.on("update", function(dt) {
      if (this.hopping){
        this.playAnimation(this.hop);
        this.hopDt -= dt;
        if (this.hopDt <= 0){
          this.hopping = false;
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.hopDt = 0.25 + (Math.random()/2);
        }
      } else {
        this.playAnimation(this.squish);
        this.hopDt -= dt;
        if (this.hopDt <= 0){
          // Stood still long enough. Hop!
          this.hopping = true;

          var ang = Math.floor(Math.random()*361);
          var vec = {
            x: Math.cos(ang),
            y: Math.sin(ang)
          }
          this.velocity = jam.Vector.mul(vec, 80)
          this.hopDt = 0.5 + (Math.random()/2);
        }
      }
    });
  };

  bunny.prototype = new jam.Sprite(0, 0);

  bunny.prototype.hop = function(x, y){

  };

  bunny.prototype.setSize = function(size){
    var c = colors[Math.floor(Math.random() * colors.length)];

    var p_img = new proto.cir(size, c);
    var l = size * 2;

    //this.setImage(p_img.toDataURL(), l, l);
    this.setImage("bunny.png", 17, 17);
    //this._renderOffsetX = -size;
    //this._renderOffsetY = -size;
    this._renderOffsetX = -8;
    this._renderOffsetY = -8;
    this._collisionOffsetX = -8;
    // TODO: What is this.
    this._collisionOffsetY = -8 + 15;
    this._collisionOffsetHeight = -16;
    this.size = size;
    this.radius = 8;
  };

  return bunny;
});
