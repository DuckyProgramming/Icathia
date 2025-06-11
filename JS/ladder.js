class entity{
    constructor(layer,fade){
        this.layer=layer
        this.timer={main:0}
        this.fade=fade
        this.remove=false
    }
    update(){
        this.timer.main++
        this.fade.main=smoothAnim(this.fade.main,this.fade.trigger,0,1,this.fade.speed)
    }
}
class located extends entity{
    constructor(layer,fade,x,y){
        super(layer,fade)
        this.position={x:x,y:y}
    }
}