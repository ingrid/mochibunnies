define([], function() {
  var util = {};

  // To nearest twentieth.
  util.approx = function(n) {
    var t = Math.floor(n);
    var p = n % 1;

    p = p * 100;
    p = (Math.floor(p / 5) * 5)/100

    t += p;

    return t;
  };

/**/
  util.HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
      s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    }
    /** /
    return {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    };
    /**/
    r = Math.floor(r * 255);
    g = Math.floor(g * 255);
    b = Math.floor(b * 255);
    return [r, g, b];
  }
/**/

  // 360, 100, 100
  util.hsv_to_rgb = function(h, s, v){
    var r, g, b;

    if(s === 0) {
      // Achromatic
      r = g = b = v;
    } else {
      // Figure out hue 'sector'.
      var i = Math.floor(h/60);
      // A whole lot of magic.
      var f = h - i;
      /** /
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      /**/
      var c = v * s;
      var x = c * (1 - Math.abs(((h/60) % 2) - 1));
      var m = v - c;

      switch(i){
      case 0:
        r = c;
        g = x;
        b = 0;
        break;
      case 1:
        r = x;
        g = c;
        b = 0;
        break;
      case 2:
        r = 0;
        g = c;
        b = x;
        break;
      case 3:
        r = 0;
        g = x;
        b = c;
        break;
      case 4:
        r = x;
        g = 0;
        b = c;
        break;
      default:
        r = c;
        g = 0;
        b = x;
        break;
      }
    }

    var ret = {
      r: Math.floor(255 * (r + m)),
      g: Math.floor(255 * (g + m)),
      b:  Math.floor(255 * (g + m))
    }

    //return ret;
    return [ret.r, ret.g, ret.b];
  };

  return util;
})
