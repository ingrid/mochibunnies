define(["jam", "../proto", "../state", "./mainstate"], function(jam, proto, state, mainstate) {
  // Maybe we can have a state object that had set up tear down and update functions?
  var titlestate = function(gamestate){
    var g = gamestate.g;
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
            state(mainstate);
            proto.fade(s, "IN", cb);
          }
          proto.fade(s, "OUT", cb);
        }
      }
    });

    // move run to state function?
    g.run();
  }
  console.log(state);
  return titlestate;
});
