p5.Gradient=class{
	constructor(){}
	setAngle(angle){
		if(_angleMode=="degrees"){
			this.angle=radians(angle)
		}else{
			this.angle=angle
		}
	}
	colors(){
		let stops
		if(Array.isArray(arguments[0])){
			stops=arguments[0]
		}else{
			stops=arguments
		}
		for(let a=0,la=stops.length;a<la;a+=2){
			const pos=stops[a]
			const col=stops[a+1].toString()
			this.gradient.addColorStop(pos,col)
		}
	}
}
p5.LinearGradient=class LinearGradient extends p5.Gradient{
	constructor(angle,width){
		super()
		this.setAngle(angle||0)
		this.width=width||100
		const x=lcos(this.angle)*this.width
		const y=lsin(this.angle)*this.width
		this.gradient=drawingContext.createLinearGradient(0,0,x,y)
	}
}
p5.RadialGradient=class RadialGradient extends p5.Gradient{
	constructor(innerRadius,outerRadius,x,y){
		super()
		this.innerRadius=innerRadius||0
		this.outerRadius=outerRadius||100
		this.x=x||0
		this.y=y||0
		this.gradient=drawingContext.createRadialGradient(this.x,this.y,this.innerRadius,this.x,this.y,this.outerRadius)
	}
}
p5.ConicGradient=class ConicGradient extends p5.Gradient{
	constructor(angle,x,y){
	  super()
	  this.setAngle(angle||0)
	  this.x=x||0
	  this.y=y||0
	  this.gradient=drawingContext.createConicGradient(this.angle,this.x,this.y)
	}
}
p5.prototype.createLinearGradient=function(angle,width){
	return new p5.LinearGradient(angle,width)
}
p5.prototype.createConicGradient=function(angle,x,y){
	return new p5.ConicGradient(angle,x,y)
}
p5.prototype.createRadialGradient=function(innerRadius,outerRadius,x,y){
	return new p5.RadialGradient(innerRadius,outerRadius,x,y)
}
p5.prototype.createPattern=function(patternElement,repeat){
	if(patternElement.canvas){
		patternElement=patternElement.canvas
	}else if(patternElement.elt){
		patternElement=patternElement.elt
	}
	return this.drawingContext.createPattern(patternElement,repeat||"repeat")
}
p5.prototype.createSimplePattern=(func,w,h,repeat)=>{ 
	let buffer=this.createGraphics(w||5,h||5)
	buffer.pixelDensity(1)
	buffer.background(255)
	func(buffer)
	return this.drawingContext.createPattern(buffer.canvas,repeat||"repeat")
}
p5.prototype.fillGradient=function(gradient){
	this.drawingContext.fillStyle=gradient.gradient?gradient.gradient:gradient
}
p5.prototype.strokeGradient=function(gradient){
	this.drawingContext.strokeStyle=gradient.gradient?gradient.gradient:gradient
}
p5.prototype.backgroundPattern=function(pattern){
	this.drawingContext.fillStyle=pattern
	this.drawingContext.fillRect(0,0,width,height)
}
function quickGradient(angle,width,colors){
	let gradient=new p5.LinearGradient(angle,width)
	gradient.colors(...colors)
	return gradient
}
function setupGraphics(){
    setupBase()
    setupTrig()
}
function setupBase(){
    noStroke()
    angleMode(DEGREES)
	textAlign(CENTER,CENTER)
	rectMode(CENTER)
	colorMode(RGB,255,255,255,1)
	imageMode(CENTER)
    strokeJoin(ROUND)
}
function setupLayer(layer){
    layer.noStroke()
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
	layer.imageMode(CENTER)
    layer.strokeJoin(ROUND)
}
function displayMain(layer){
    image(layer,layer.width/2,layer.height/2,layer.width,layer.height)
}
function setupTrig(){
	for(let a=0,la=360;a<la;a++){
		constants.trig[0].push(sin(a/2))
		constants.trig[1].push(cos(a/2))
		if(abs(constants.trig[0][a])<0.001){
			constants.trig[0][a]=0
		}
		if(abs(constants.trig[1][a])<0.001){
			constants.trig[1][a]=0
		}
	}
	for(let a=0,la=360;a<la;a++){
		constants.trig[0].push(-constants.trig[0][a])
		constants.trig[1].push(-constants.trig[1][a])
	}
}
function lsin(direction){
	return constants.trig[0][floor((direction%360+360)%360*2)]
}
function lcos(direction){
	return constants.trig[1][floor((direction%360+360)%360*2)]
}
function formImage(width,height){
    let layer=createGraphics(width,height)
    setupLayer(layer)
    layer.translate(layer.width/2,layer.height/2)
    return layer
}
function glitch(image,scale,strength,extent){
	let copy=formImage(image.width,image.height)
	copy.image(image,0,0)
	image.loadPixels()
	copy.loadPixels()
	let active=true
	let size=0
	let push=0
	for(let a=0,la=image.pixels.length/(scale**2)/4;a<la;a++){
		if(!active&&floor(random(0,strength))==0){
			active=true
			size=0
			push=floor(random(2,5))*(floor(random(0,2))*2-1)
		}else if(active&&floor(random(0,extent/size))==0&&size>=4){
			active=false
		}
		if(active){
			size++
		}
		if(active){
			for(let b=0,lb=scale;b<lb;b++){
				for(let c=0,lc=scale;c<lc;c++){
					for(let d=0,ld=4;d<ld;d++){
						image.pixels[(a*scale+floor(a/(image.width/scale))*image.width*(scale-1)+b+c*image.width)*4+d]=
							copy.pixels[((a*scale+floor(a/(image.width/scale))*image.width*(scale-1)+b+c*image.width+scale*push)*4+d)%(image.width*image.height*4)]
					}
				}
			}
		}
	}
	image.updatePixels()
}