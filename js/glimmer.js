"use strict";
var app=app || {};

app.glimmer= {
	isStart:true,
	WIDTH : 1280, 
    HEIGHT: 800,
    canvas: undefined,
    ctx: undefined,
    firefly: undefined,
	sceneLib:undefined,
	start:undefined,
	darkness:1,
	dt: 1/60.0, 
    app:undefined,
	//images
	forestImage: undefined,
	riverImage:undefined,
	currentImage:undefined,
	freeFlies:[],
	capturedFlies:[],
	sceneBgs:[],
	DARK_INC:.1,
	FLY_PROBABILITY_PER_SECOND:.4,
	soundtrack:undefined,
	sceneCount:0,
	isRunning:false,
	soundTrackPaused:false,
	
	//make sure screens are in the right order
handleScreen:function(){
			//setup canvas element
			
			this.canvas = document.querySelector('canvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			
			//determine current screen
			if(this.isStart){
				this.start.init(this.ctx);
			}
			else{
			
			this.init();
			}
},
	
init : function() {
			this.isRunning=true;
			//this.handleScreen();
			
			console.log("app.glimmer.init() called");
			// declare properties
			
			
		
			//load images
			var image=new Image();
			image.src=this.app.IMAGES['forestImage'];
			this.forestImage=image;
			this.sceneBgs.push(image);
			var image2=new Image();
			image2.src=this.app.IMAGES['riverImage'];
			this.riverImage=image2;
			this.sceneBgs.push(image2);
			//set scene 1
			this.currentImage=this.forestImage;
			this.soundtrack=new Audio("media/bgSound.mp3");
			
			this.soundtrack.play();
			this.soundtrack.loop=true;
			//below is the better way that i couldn't get to work.
			//this.soundtrack=createjs.Sound.play("nightSound",{loop:-1,volume:0.4});
			//console.log(this.soundtrack);
			this.update();
			
			
	},
//update positions
moveSprites:function(){
		for(var i=0; i<this.freeFlies.length; i++){
			this.freeFlies[i].update();
			};
			//array.filter() returns new array with only active flies
			this.freeFlies=this.freeFlies.filter(function(firefly){
			return firefly.active;
			});
			if(Math.random()<this.FLY_PROBABILITY_PER_SECOND/60){
				this.freeFlies.push(new app.firefly(this.WIDTH,this.HEIGHT,this.dt));
				
				//console.log("New firefly created! freeFlies.length="+this.freeFlies.length);
			}

},
//make visible
drawSprites:function(){

this.sceneLib.drawBG(this.ctx,this.WIDTH,this.HEIGHT,this.currentImage,this.darkness);
for(var i=0; i<this.freeFlies.length; i++){
		this.freeFlies[i].draw(this.ctx);
		};
},
update:function(){
	if(this.isRunning){
	requestAnimationFrame(this.update.bind(this));
	
	this.moveSprites();
	this.drawSprites();
	}
},
//this handles the click events and updates the background darkness
netTrack:function(mouseNow){	
		createjs.Sound.play("nightSound");
		var cMouse=mouseNow;
		for(var i=0; i<this.freeFlies.length; i++){
			var isCatch=this.checkCatch(cMouse.x,cMouse.y,i);
		
			if(isCatch){
				
				if(this.darkness-this.DARK_INC>0){
					
					
					this.darkness=this.darkness-this.DARK_INC;
					//console.log(this.DARK_INC);
				}
				
				else {
					this.sceneCount=3;
					this.darkness=1;
					
					console.log("scenecount: "+this.sceneCount);
					//debugger;
					
					this.newScene();
			
				
					
				}
			}
		}
	},
	//ideally this would switch the scenes to new pics with more warning
newScene:function(){
	if(this.sceneCount==1) {
		
		this.currentImage=sceneBgs[0];
	}
	else if(this.sceneCount==2) {
		
		this.currentImage=this.forestImage;
		
		}
	else if(this.sceneCount>=3){
					this.isRunning=false;
					this.isStart=true;
					this.start.endScreen(this.ctx,this.WIDTH,this.HEIGHT,this.capturedFlies.length);
					//make sure clicked before reset
					if(this.start.endScreen){
						this.sceneCount=0;
						this.capturedFlies=[];
						this.freeFlies=[];
						}
					}
},
	//check on fireflies to see if caught
checkCatch:function(x,y,i){
				
				//for(var i=0; i<this.freeFlies.length; i++){
				this.freeFlies[i].handleCatch(x,y);
				if(this.freeFlies[i].handleCatch(x,y)){
					this.capturedFlies.push(i);
					return true
					console.log("catch")
				}
				else return false;
			
},

//sound functions
resumeSoundtrack:function(){
	this.soundtrack.play();
	
},
pauseSoundtrack:function(){
	this.soundtrack.pause();
	
},
toggleSoundtrack:function(){
	this.soundtrackPaused=!this.soundtrackPaused;
	if(this.soundtrackPaused){
		this.pauseSoundtrack();
		
	}else{
		this.resumeSoundtrack();
		
	}
},


};//end glimmer