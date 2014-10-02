define(["jam", "./proto", "./player"], function(jam, proto, player) {
  // Maybe move this to tile map depending on how the art hashes out.
  var level = function(g){
	jam.Sprite.call(this, 0, 0);

    level.p = player.p;

	var s = g.root.scene;
    this.immovable = true;

    var h_img = new proto.rect(640, 10, 'red');
    var v_img = new proto.rect(10, 480, 'red');

    var u = new jam.Sprite(0, 0);
    u.immovable = true;
    u.setImage(h_img.toDataURL(), 640, 20);

    var d = new jam.Sprite(0, 470);
    d.immovable = true;
    d.setImage(h_img.toDataURL(), 640, 20);


    var l = new jam.Sprite(0, 0);
    l.immovable = true;
    l.setImage(v_img.toDataURL(), 10, 480);


    var r = new jam.Sprite(630, 0);
    r.immovable = true;
    r.setImage(v_img.toDataURL(), 10, 480);

    this.add(u);
    this.add(d);
    this.add(l);
    this.add(r);
    //s.add(this);
  };

  level.prototype = new jam.Sprite(0, 0);

  level.prototype.teardown = function(){
  };

  level.prototype.p = player.p;

  return level;
});
