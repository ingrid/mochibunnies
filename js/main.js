require.config({
  baseUrl:"jam/",
});

require(["jam", "../js/state", "../js/states/titlestate"], function(jam, state, titlestate){
  jam.config({dataDir:"data/"});

  var g = state.g;
  var init = function(){
    console.log(state);
    state(titlestate);
  };


  var preload = function() {
    jam.preload("bunny.png");
	jam.showPreloader(init);
  };

  preload();

  /**/
  window.setTimeout(function(){
    window.console.log = function(){
    };
  }, 8000);
  /**/
});
