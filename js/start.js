//looking back, this should have been named scenes
"use strict";
var app=app || {};

app.start = function(){

	function init(ctx){
			console.log("app.start.init() called");
			// declare properties
			
			this.WIDTH = 1280, 
			this.HEIGHT= 800,
			
			//this.canvas = document.querySelector('canvas');
			//this.canvas.width = this.WIDTH;
			//this.canvas.height = this.HEIGHT;
			//this.ctx = this.canvas.getContext('2d');
			ctx.save();
			ctx.fillStyle=this.drawStart(ctx,this.WIDTH,this.HEIGHT);
			ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
			ctx.textAlign="center";
			ctx.font='50pt Raleway';
			ctx.fillStyle="#FFE600";
			ctx.fillText('Glimmer',this.WIDTH/2,this.HEIGHT/2);
			ctx.fillStyle="white";
			ctx.font='25pt Amatic SC';
			ctx.fillText('by Charlie Backus',this.WIDTH/2,(this.HEIGHT/2)+50);
			ctx.font='10pt Raleway';
			//ctx.fillStyle="black";
			ctx.fillText('click to begin',this.WIDTH/2,(this.HEIGHT/2)+220);
			ctx.restore();
			
			
	}
	//because the values for the two gradients are different, it wasn't helpful to combine functions
	function drawStart(ctx,width,height){
	var gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
			gradient.addColorStop(0, "black");
			gradient.addColorStop(Math.random()*.1 +.3, "black");
			gradient.addColorStop(0.4, "#FFE600");
			gradient.addColorStop(1, "black");
			
			return gradient;
	}
	
	function drawend(ctx,width,height){
			var gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
			gradient.addColorStop(0, "#FFE600");
			gradient.addColorStop(Math.random()*.1 +.3, "#FFE600");
			gradient.addColorStop(0.4, "black");
			gradient.addColorStop(1, "#FFE600");
			
			return gradient;
	}
	//having the end screen here makes sense for the click function and also because of the similar functionality
	function endScreen(ctx,width,height,score){
			ctx.save();
			ctx.fillStyle=this.drawend(ctx,this.WIDTH,this.HEIGHT);
			ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
			ctx.textAlign="center";
			ctx.font='40pt Amatic SC';
			ctx.fillStyle="white";
			
			ctx.fillText('Scene Complete!',this.WIDTH/2,this.HEIGHT/2);
			ctx.fillStyle="black";
			ctx.font='25pt Raleway';
			ctx.fillText('you caught '+score+' fireflies',this.WIDTH/2,(this.HEIGHT/2)+50);
			ctx.font='10pt Raleway';
			ctx.fillStyle="black";
			ctx.fillText('click to play again',this.WIDTH/2,(this.HEIGHT/2)+100);
			ctx.restore();
	}
	//to let them know they are making progress
	function sceneScreen(ctx,width,height,currentImg){
			//ctx.drawImage(this.image,0,0,this.width,this.height);
			ctx.save();
			
			
			ctx.textAlign="black";
			ctx.font='40pt Amatic SC';
			
			
			ctx.fillText('Scene Complete!',this.WIDTH/2,this.HEIGHT/2);
		
		
			ctx.restore();
	}
	
	return{
	init: init,
	drawStart:drawStart,
	drawend:drawend,
	endScreen:endScreen,
	sceneScreen:sceneScreen
	}
	
}();