// A collection of helpful snippets for prototyping in jam.

define(["jam"], function(jam) {

  Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
  };

  Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
  };

  var worldspace = function(){
    var p = this.parentSprite;
    var x = this.x;
    var y = this.x;
    while (p){
      if (p.parentSprite !== null){
        x = x - p.x;
        y = y - p.y;
      } else {
        break;
      }
      p = p.parentSprite;
    }
    return {
      x : -x,
      y : -y
    };
  };

  jam.Sprite.prototype.worldspace = worldspace;

  var proto = {};

  proto.color = function(r, g, b){
    if (r === undefined){
      r = g = b = 255;
    }
    if (g === undefined){
      if (r instanceof Array){
        b = r[2];
        g = r[1];
        r = r[0];
      } else {
        return r;
      }
    }
    if (r === undefined){
      // Fucked up.
      r = g = b = 255;
    }
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  };

/** /
  var color = function(r, g, b) {
    if (r === undefined){
      return 'rgb(0, 0, 0)';
    }
    if (g === undefined){
      return r;
    }
    return 'rgb(' + r + ', ' + b + ', ' + g + ')';
  };
/**/

  proto.rect = function(w, h, r, g, b) {
    if (r == undefined){
      r = g = b = 0;
    }

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    var c = proto.color(r, g, b);

    ctx.fillStyle = c;
    ctx.fillRect(0, 0, w, h);

    return canvas;
  };

  proto.sq = function(s, r, g, b) {
    return proto.rect(s, s, r, g, b);
  };

  proto.cir = function(rad, r, g, b) {

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var d = rad * 2;

    canvas.width = d;
    canvas.height = d;

    var c = proto.color(r, g, b);

    ctx.fillStyle = c;


    ctx.beginPath();
    // x, y, r, start angle, end angle, counterclockwise (defautlts false)
    ctx.arc(rad, rad, rad, 0, 2*Math.PI);
    //ctx.stroke();
    ctx.fill();

    return canvas;
  };

  proto.outcir = function(rad, c1, c2) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var color = proto.color(c1);
    var o_color = proto.color(c2);

    canvas.width = rad * 2;
    canvas.height = rad * 2;

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(rad, rad, rad, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(rad, rad, rad-2, 0, 2 * Math.PI, false);

    ctx.lineWidth = 4;
    ctx.strokeStyle = o_color;
    ctx.stroke();

    return canvas;
  };

  proto.text = function(x, y, txt){
    jam.Sprite.call(this, x, y);

    this.text = txt || "";
    this.font = "";
    this.color = ""
    this.alpha = 1.0;

    this.render = function(context, camera){
	  if(!this.visible) { return; }

      context.save();

	  if(this.alpha !== 1.0){ context.globalAlpha = this.alpha; }

      context.font = this.font;
      context.fillStyle = this.color;

      context.fillText(this.text,
                       this.x,
                       this.y);

	context.restore();
    };
  };

  proto.text.prototype = new jam.Sprite(0, 0);

  proto.iso = function(w, h, r, g, b){
    // Isosceles
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    var c = color(r, g, b);

    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(Math.floor(w/2), 0);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    return canvas;
  };

  proto.fade = function(s, dir, cb){
    // TODO: Color options.
    // TODO: Add to game prototype? What about state, how to organize that?
    // Magic numbers. Can we pull from sprite?

    var fadeDt;
    var blank = new jam.Sprite(0, 0);
    var blankImg = new proto.rect(640, 480, 255, 255, 255);
    blank.setImage(blankImg.toDataURL(), 640, 480);

    if (dir === "IN"){
      blank.alpha = 1.0;
      fadeDt = 1;
      s.on("update", function(dt) {
        fadeDt -= dt;
        blank.alpha = fadeDt;
        if (fadeDt <= 0){
          s.remove(blank);
          cb();
        }
      });
    } else if (dir === "OUT"){
      blank.alpha = 0.0;
      fadeDt = 0;
      s.on("update", function(dt) {
        fadeDt += dt;
        blank.alpha = fadeDt;
        if (fadeDt >= 1){
          s.remove(blank);
          cb();
        }
      });
    }

    s.add(blank);

  };

  return proto;
});
