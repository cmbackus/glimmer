//sceneLib.js
//drawLib.js
"use strict";
var app=app || {};

app.sceneLib={



drawBG: function(ctx,width,height,image,darkness){
	this.image=image;
	this.width=width;
	this.height=height;
	this.darkness=darkness;
	
	
	if(!this.image){
			this.drawGradient(ctx);
			this.drawNight(ctx);
		}
		else{
		
			ctx.drawImage(this.image,0,0,this.width,this.height);
			this.drawNight(ctx);
			}
},
//just in case no images
drawGradient: function(ctx){
		ctx.save();
		//gradient top to bottom
		var grad=ctx.createLinearGradient(0,0,0,height);
		grad.addColorStop(0,"#336");//top
		grad.addColorStop(.4,"#335252");
		grad.addColorStop(.8,"#334747");
		
		grad.addColorStop(1,"#004747");//bottom
		
		ctx.fillStyle=grad;
		ctx.fillRect(0,0,width,height);
		ctx.restore
	
},
//draws darkness at current level
drawNight:function(ctx){
		ctx.save;
		ctx.globalAlpha=.2;
		ctx.fillStyle='black';
		ctx.fillRect(0,0,this.width,this.height);	
		ctx.globalAlpha=this.darkness;
		ctx.fillRect(0,0,this.width,this.height);	
		ctx.globalAlpha=1;
		ctx.restore();
},

}