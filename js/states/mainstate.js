define(["jam", "../proto", "../state", "../player", "../bunny"], function(jam, proto, state, player, bunny) {

  var mainstate = function(gamestate){
    var g = gamestate.g;
	var s = g.root.scene;

    g.bgColor = "rgb(200,200,169)";

    p = new player(20, 200);
    s.add(p);

    var bunnies = [];

    var spawnBunny = function(){
      var x;
      var y;

      do {
        x = Math.floor(Math.random() * 640);
        y = Math.floor(Math.random() * 480);
        // TOOO: This.
      } while (false);

      var b = new bunny(x, y);
      bunnies.push(b);
      s.add(b);
    }

    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();
    spawnBunny();

    var bunnySpawDt = 2;

    s.on("update", function(dt) {
      var b;
      for (b in bunnies){
        if (jam.Cir.overlap(p, bunnies[b]) === true){
          s.remove(bunnies[b]);
          bunnies.splice(b, 1);
          p.grow();
        }
      }

      bunnySpawDt -= dt;

      if (bunnySpawDt <= 0){
        if(bunnies.length <= 40){
          spawnBunny();
          spawnBunny();
          bunnySpawDt = Math.random() * 4;
        }
      }
    });


    //var l = new level(g, p);

    p.on("update", function(dt) {

    });

	g.run();
  };

  return mainstate;

});
