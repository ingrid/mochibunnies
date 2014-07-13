require.config({
  baseUrl:"jam/",
});

require(["jam", "../js/state", "../js/states/titlestate", "../js/states/mainstate"], function(jam, state, titlestate, mainstate){
  jam.config({dataDir:"data/"});

  var g = state.g;
  var init = function(){
    //state(titlestate);
    state(mainstate);
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
