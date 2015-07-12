
"use strict";

var app = window; 

// sprite class
function Sprite(opt){
	
	// basic properties
	this.x = opt.x||0;
	this.y = opt.y||0;
	this.width = opt.width||0;
	this.height = opt.height||0;
	
	// 4 properties in below are for separated sprites from an sprite sheet image.
	this.sx = opt.sx||0;  // x position in the source 
	this.sy = opt.sy||0;  // y position in the source
	this.sw = opt.sw||0;  // width in the source image
	this.sh = opt.sh||0;  // height in the source image
	
	
	this.image = new Image();
	
	this.rotation = opt.rotation||0;
	this.scale = opt.scale||1;
	this.originX = opt.originX||0.5;
	this.originY = opt.originY||0.5;
	
	this.offsetX = 0;
	this.offsetY = 0;
	
	// event handlers
	this.ev = {};
	this.ev.loaded = opt.loaded || null;
	var self = this;
	
	this.image.addEventListener('load', function(){
		self.width = self.sw || self.image.width;
		self.height = self.sh || self.image.height;
		
		if( self.originX !== undefined ) {
			self.offsetX = self.width * self.originX;
			self.offsetY = self.height * self.originY;
		}
		
		console.log("Image " + self.image.src + " has loaded");
		if(self.ev.loaded){
			self.ev.loaded();
		}
	});
	this.image.addEventListener('error', function(err){
		console.log(err);
	});
	if( typeof opt.image == "string" ){
		this.image.src = opt.image;
	}else if(typeof opt.image == "object" && opt.image.src ){
		this.image.src = opt.image.src;
	}
}
// methods
Sprite.prototype.render = function(ctx){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.scale(this.scale, this.scale);
	ctx.rotate(this.rotation *Math.PI / 180);
	
	if( this.sw && this.sh ){
		ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, -this.offsetX, -this.offsetY, this.sw, this.sh);
	}else{
		ctx.drawImage(this.image, -this.offsetX, -this.offsetY);
	}
	ctx.restore();
}


