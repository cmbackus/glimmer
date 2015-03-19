//loader.js
"use strict";
var app=app || {};
app.mouse=[]
window.onload = function(){
	console.log("window.onload called");
	app.glimmer.app=app;
	app.glimmer.firefly=app.firefly;
	app.glimmer.utils=app.utils;
	app.glimmer.sceneLib=app.sceneLib;
	app.glimmer.start=app.start;
	
	app.IMAGES={
	forestImage:"media/forest.png",
	riverImage:"media/river.png"
	};
	
	//set up interaction
	document.querySelector("canvas").addEventListener("mousedown",function(e){
		if(app.glimmer.isStart==false){
			var body,$body;
			var mouse={};
			mouse.x = e.pageX - e.target.offsetLeft;
			mouse.y = e.pageY - e.target.offsetTop;
			app.glimmer.netTrack(mouse);
			//this would have been so nice. if the bg changed with the darkness.
			var currentDark="rgba(0,0,0,.1);";
			document.querySelector('body').style.background=currentDark;
		}
		else{
			console.log("start screen clicked");
			app.glimmer.isStart=false;
			if(app.glimmer.isRunning==false){
			app.glimmer.init();
			}
			else{
			app.glimmer.update();
			}
		}
	});
	document.querySelector("#incrementSlider").addEventListener("change",function(e){
			app.glimmer.DARK_INC=e.target.value;
			
		});
	document.querySelector("#probabilitySlider").addEventListener("change",function(e){
			app.glimmer.FLY_PROBABILITY_PER_SECOND=e.target.value;
			
		});
	document.querySelector("#pauseButton").onclick = function(){
				app.glimmer.toggleSoundtrack();
			};
		
	//load resources
	app.queue=new createjs.LoadQueue(false);
	app.queue.loadManifest([
	{id:"forestImage",src:"media/forest.png"},
	{id:"riverImage",src:"media/river.png"},
	{id:"nightSound",src:"media/bgSound.mp3"}
	]);
	//document.querySelector('#pauseButton').onclick=app.glimmer.toggleSoundtrack();
	
	app.queue.on("complete", function(){
		console.log("images loaded called");
		app.glimmer.handleScreen();
	});
	
	
	
}