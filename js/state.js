define(["jam", "../js/proto"], function(jam, proto) {

  var g = new jam.Game(640, 480, document.body);

  var state = function(gs, state){
    // Maybe pass around a state string or object.
    // Maybe push state objects to other files.
    if (state == undefined){
      state = {
      }
    }
    if (state.g == undefined){
        state.g = g;
    }
    if (g !== undefined){
      //g._canvas.parentNode.removeChild(g._canvas);
      var f = new jam.Sprite(0,0);
      g.root.remove(g.root.scene);
      g.root.scene = new jam.Sprite(0,0);
      g.root.add(g.root.scene);
    }
    //g = new jam.Game(640, 480, document.body);
    gs(state);

  };

  state.g = g;

  return state;
});
