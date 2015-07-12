(function(){
	'use strict';
	
	var app = (typeof WinJS != 'undefined')?WinJS.Application:window;
	if( Window.ApplicationModel && Window.ApplicationModel.Activation){
		app.onactivated = function(args){
			if( args.detail.previousExcutionState !== activation.AppliactionExcutionState.terminated){
				//new launched
				initialize();
			} else {
				//restore from suspend
			}
		}
		args.setPromise(WinJS.UI.processAll());
	}else{
		window.addEventListener("load",  initialize);
	}
	
	function initialize(){
		app.canv = document.getElementById("gameCanvas");
		app.ctx = app.canv.getContext("2d");
		
		testRender();
	}
	
	function testRender(){
		var sprite = new Sprite({
			image:'assets/images/sprites.png',
			sw:60, sh:60,
			x:100, y:100,
			loaded:function(){
				console.log("Render Image");
				sprite.render(app.ctx);
			}
		});
	}
})();