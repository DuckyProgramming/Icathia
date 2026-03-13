function randin(array){
    return array[floor(random(0,array.length))]
}
function distPos(p1,p2){
	return dist(p1.position.x,p1.position.y,p2.position.x,p2.position.y)
}
function dirPos(p1,p2){
	return atan2(p2.position.x-p1.position.x,p2.position.y-p1.position.y)
}
function magVec(vec){
	return sqrt(vec.x**2+vec.y**2)
}
function closest(obj1,obj2,layer){
    return {
        x:(obj2.position.x-obj1.position.x+layer.width/2)%layer.width-layer.width/2,
        y:(obj2.position.y-obj1.position.y+layer.height/2)%layer.height-layer.height/2
    }
}
class operation{
    constructor(layer){
        this.layer=layer
        this.id=0
        this.types=[]
        this.images=[]
        this.cells=[]
        this.speed=1
        this.initial()
    }
    initial(){
        let col=random(0,1)
        let num=floor(random(8,11))
        for(let a=0,la=num;a<la;a++){
            let occur=floor(random(1,16))
            this.types.push({size:16-sqrt(occur)*8/3,num:occur,color:[(a+col)/la,random(0.6,1)],interact:[]})
            this.images.push(createGraphics(this.types[a].size+4,this.types[a].size+4))
            setupLayer(this.images[a])
        	this.images[a].colorMode(HSB,1,1,1,1)
            this.images[a].strokeWeight(this.types[a].size*0.05)
            this.images[a].noFill()
            for(let b=0,lb=10;b<lb;b++){
                this.images[a].stroke(this.types[a].color[0],this.types[a].color[1]-b/lb*0.8,0.8+b/lb*0.2)
                this.images[a].ellipse(this.types[a].size*0.5+2,this.types[a].size*0.5+2,this.types[a].size*(1-b/lb*0.6))
            }
            for(let b=0,lb=num;b<lb;b++){
                let set=random(-1,3)
                let key=random(20,40)*(set>1?12:1)
                this.types[a].interact.push([set,key,random(key+5,120*(set>1?6:1))])
            }
        }
        let splash=[]
        for(let a=0,la=this.types.length;a<la;a++){
            for(let b=0,lb=this.types[a].num;b<lb;b++){
                splash.push(a)
            }
        }
        for(let a=0,la=this.layer.width*this.layer.height/10000;a<la;a++){
            let type=randin(splash)
            this.cells.push(new cell(this.layer,random(0,this.layer.width),random(0,this.layer.height),type,this.types[type],this.id++,this.images[type]))
        }
    }
    display(){
        for(let a=0,la=this.cells.length;a<la;a++){
            this.cells[a].display()
        }
    }
    update(){
        for(let a=0,la=this.speed;a<la;a++){
            for(let b=0,lb=this.cells.length;b<lb;b++){
                this.cells[b].update(this.cells)
            }
        }
    }
}
class cell{
    constructor(layer,x,y,type,data,id,image){
        this.layer=layer
        this.position={x:x,y:y}
        this.velocity={x:0,y:0}
        this.type=type
        this.data=data
        this.id=id
        this.image=image
        this.timer={main:0,tick:this.id%30,minTick:this.id%3}
        this.adj=[]
        this.holdAdj=[]
    }
    display(){
        this.layer.stroke(this.data.color,0.8,0.8)
        this.layer.strokeWeight(this.data.size*0.2)
        this.layer.noFill()
        this.layer.image(this.image,this.position.x,this.position.y)
        if(this.position.x<this.data.size*0.5){
            this.layer.image(this.image,this.position.x+this.layer.width,this.position.y)
        }
        if(this.position.x>this.layer.width-this.data.size*0.5){
            this.layer.image(this.image,this.position.x-this.layer.width,this.position.y)
        }
        if(this.position.y<this.data.size*0.5){
            this.layer.image(this.image,this.position.x,this.position.y+this.layer.height)
            if(this.position.x<this.data.size*0.5){
                this.layer.image(this.image,this.position.x+this.layer.width,this.position.y+this.layer.height)
            }
            if(this.position.x>this.layer.width-this.data.size*0.5){
                this.layer.image(this.image,this.position.x-this.layer.width,this.position.y+this.layer.height)
            }
        }
        if(this.position.y>this.layer.height-this.data.size*0.5){
            this.layer.image(this.image,this.position.x,this.position.y-this.layer.height)
            if(this.position.x<this.data.size*0.5){
                this.layer.image(this.image,this.position.x+this.layer.width,this.position.y-this.layer.height)
            }
            if(this.position.x>this.layer.width-this.data.size*0.5){
                this.layer.image(this.image,this.position.x-this.layer.width,this.position.y-this.layer.height)
            }
        }
    }
    update(cells){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.velocity.x*=0.99
        this.velocity.y*=0.99
        if(this.position.x<0){
            this.position.x=this.layer.width
        }
        if(this.position.x>this.layer.width){
            this.position.x=0
        }
        if(this.position.y<0){
            this.position.y=this.layer.height
        }
        if(this.position.y>this.layer.height){
            this.position.y=0
        }
        if(this.timer.main%30==this.timer.tick||this.timer.main==0){
            this.adj=[]
            this.adj.push(...this.holdAdj)
            this.holdAdj=[]
            for(let a=this.id,la=cells.length;a<la;a++){
                if(cells[a].id!=this.id){
                    let close=closest(this,cells[a],this.layer)
                    let dist=magVec(close)
                    let interact=this.data.interact[cells[a].type]
                    if(dist<interact[2]&&abs(interact[0])>0.1){
                        this.adj.push(cells[a])
                        cells[a].holdAdj.push(this)
                    }
                }
            }
        }
        if(this.timer.main%3==this.timer.minTick){
            for(let a=0,la=this.adj.length;a<la;a++){
                let close=closest(this,this.adj[a],this.layer)
                let dist=magVec(close)
                let interact=this.data.interact[this.adj[a].type]
                if(dist<this.data.size*0.5+cells[a].data.size*0.5){
                    let push=this.data.size*0.5+cells[a].data.size*0.5-dist
                    this.adj[a].position.x+=push*0.5*close.x/dist
                    this.adj[a].position.y+=push*0.5*close.y/dist
                    this.position.x-=push*0.5*close.x/dist
                    this.position.y-=push*0.5*close.y/dist
                }
                let moved=false
                if(interact[0]>1){
                    if(dist>interact[1]&&dist<interact[2]){
                        let mag=this.data.size*this.adj[a].data.size*(interact[0]-1)*20/interact[1]/interact[1]*(dist-interact[1])/(interact[2]-interact[1])
                        this.velocity.x+=close.x/dist*mag
                        this.velocity.y+=close.y/dist*mag
                        moved=true
                    }else if(dist<interact[1]){
                        let mag=this.data.size*this.adj[a].data.size*(interact[0]-1)*20/interact[1]/interact[1]*(dist-interact[1])/interact[1]
                        this.velocity.x+=close.x/dist*mag
                        this.velocity.y+=close.y/dist*mag
                        moved=true
                    }
                }else{
                    if(dist>interact[1]&&dist<interact[2]){
                        let mag=this.data.size*this.adj[a].data.size*interact[0]*20/interact[1]/interact[1]*(1-abs(dist-(interact[1]+interact[2])/2)/((interact[2]-interact[1])/2))
                        this.velocity.x+=close.x/dist*mag
                        this.velocity.y+=close.y/dist*mag
                        moved=true
                    }
                }
                if(dist<12){
                    let mag=dist/25-1
                    this.velocity.x+=close.x/dist*mag
                    this.velocity.y+=close.y/dist*mag
                    moved=true
                }
                if(!moved){
                    this.adj.splice(a,1)
                    a--
                    la--
                }
            }
        }
        this.timer.main++
    }
}