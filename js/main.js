require.config({
  baseUrl:"jam/",
});

var p;

require(["jam", "../lib/sylvester", "../js/proto", "../js/player", "../js/level", "../js/util"], function(jam, syl, proto, player, level, util){
  jam.config({dataDir:"data/"});

  var g = new jam.Game(640, 480, document.body);

  var gameState = function(gs, state){
    // Maybe pass around a state string or object.
    // Maybe push state objects to other files.
    if (g !== undefined){
      //g._canvas.parentNode.removeChild(g._canvas);
      var f = new jam.Sprite(0,0);
      g.root.remove(g.root.scene);
      g.root.scene = new jam.Sprite(0,0);
      console.log(g.root.scene);
      g.root.add(g.root.scene);
    }
    //g = new jam.Game(640, 480, document.body);
    gs();
  };

  var fade = function(dir, cb){
    // TODO: Color options.
    // TODO: Add to game prototype? What about state, how to organize that?
    var fadeDt;
    var blank = new jam.Sprite(0, 0);
    var blankImg = new proto.rect(640, 480, 255, 255, 255);
    blank.setImage(blankImg.toDataURL(), 640, 480);

    if (dir === "IN"){
      blank.alpha = 1.0;
      fadeDt = 1;
      g.root.scene.on("update", function(dt) {
        fadeDt -= dt;
        blank.alpha = fadeDt;
        if (fadeDt <= 0){
          g.root.scene.remove(blank);
          cb();
        }
      });
    } else if (dir === "OUT"){
      blank.alpha = 0.0;
      fadeDt = 0;
      g.root.scene.on("update", function(dt) {
        fadeDt += dt;
        blank.alpha = fadeDt;
        if (fadeDt >= 1){
          g.root.scene.remove(blank);
          cb();
        }
      });
    }

    g.root.scene.add(blank);
  };

  var titleState = function(state){
    var s = g.root.scene;

    g.bgColor = "rgb(232, 210, 240)";

    var startTxt = new proto.text(260, 230, "Press arrow keys to start.");
    startTxt.font = "monospace";
    startTxt.color = "rgb(138, 85, 158)";

    var started = false;

    // TODO: Add arrows, add flashing.
    s.add(startTxt);
    // TODO: Maybe add bunnies hopping, and fade out.
    s.on("update", function(dt) {
      if (started === false){
        // TODO: Make input take an array of key strings so we can avoid this.
	    if(jam.Input.justPressed("UP")    ||
           jam.Input.justPressed("DOWN")  ||
           jam.Input.justPressed("LEFT")  ||
           jam.Input.justPressed("RIGHT")) {
          // Start game.
          started = true;
          var cb = function(){
            // TODO: Maybe make all fade cbs states and pass in state.
            var cb = function(){
              // Some flag to set interaction
            }
            gameState(main);
            fade("IN", cb);
          }
          fade("OUT", cb);
        }
      }
    });

    // move run to state function?
    g.run();
  }

  var main = function() {
	var s = g.root.scene;

    g.bgColor = "rgb(55, 55, 55)";

    p = new player(20, 200);
    s.add(p);

    var l = new level(g, p);

    p.on("update", function(dt) {

    });

	g.run();
  };

  var preload = function() {
	jam.showPreloader(titleState);
  };

  preload();

  /** /
  window.setTimeout(function(){
    window.console.log = function(){
    };
  }, 3000);
  /**/
});
