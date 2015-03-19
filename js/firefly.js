//firefly.js

"use strict";
var app=app || {};

app.firefly = function(){

	
	function Firefly(canvasWidth,canvasHeight,dt){
		this.dt=dt;
		//console.log(dt);
		this.canvasWidth=canvasWidth;
		this.canvasHeight=canvasHeight;
		this.active=true;
		this.age=Math.floor(Math.random()*128);
		this.color="#FFE600";
		this.y=this.canvasWidth/4+Math.random()*this.canvasWidth/2;
		this.x=app.utils.getRandom(0,600);
		//this.y=100;
		this.xVelocity=30;
		this.yVelocity=1;
		this.amplitude=app.utils.getRandom(1,3);
	
		this.radius=10;
		this.height=40;
	};
	
	var f=Firefly.prototype;
	//draw the firefly
	f.draw=function(ctx){
		var halfR=this.radius/2;
		var halfH=this.height/2;
		
		
		//gradient
		ctx.save();
		var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
			gradient.addColorStop(0, "white");
			gradient.addColorStop(Math.random()*.1 +.3, "white");
			gradient.addColorStop(0.4, this.color);
			gradient.addColorStop(1, "black");
			ctx.fillStyle = gradient;
			
			if(app.utils.getRandom(0,4)>3.9){
			ctx.globalAlpha=0;
			}
			else ctx.globalAlpha=1;
			ctx.beginPath();
			//ctx.fillStyle=this.color;
			ctx.arc(this.x,this.y,this.radius,0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
	};
	
	//determine new position and if it has been around too long
	f.update=function(){
		this.yVelocity=this.amplitude*Math.cos(this.age*Math.PI*this.dt);
		this.y+=this.yVelocity;
		if(app.utils.getRandom(0,4)>3.9) this.dt=this.dt*-1;
		this.x+=this.xVelocity*this.dt;
		this.age++;
		this.active=this.active &&inBounds(this);
		if(this.age>1000) this.active=false;
	};
	//check to see if firefly was caught. some padding was given.
	f.handleCatch=function(x,y){
	var padding=20;
	if(this.x<=x+padding & this.x>=x-padding){
		if(this.y<=y+padding & this.y>=y-padding){
				this.active=false;
				return true;
			}
		}
		else{
		//console.log("firefly: "+this.x,this.y);
		//console.log("mouse: "+x,y);
		return false;
		}
	}
	f.explode=function(){
		this.active=false;
	};
	//private
	
	function inBounds(obj){
		return obj.y<=obj.canvasHeight+obj.height*0.5;
	};
	return Firefly;
	}();