define(["jam", "./proto", "./util"], function(jam, proto, util) {

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

    this.hopsquish = new jam.Sprite.Animation([0, 1], 1, 0, 0, function(){
    });

    this.setSize(5);
    this.hopping = false;
    this.setImage("bunny.png", 17, 17);
    this.on("update", function(dt) {
      this.playAnimation(this.hopsquish);
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
    this.size = size;
  };

  return bunny;
});
