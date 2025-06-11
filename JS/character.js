class character{
    constructor(layer,graphicManager,x,y,name,direction){
        this.layer=layer
        this.graphicManager=graphicManager
        this.position={x:x,y:y}
        this.name=name
        this.offset={position:{x:x,y:y}}
        this.size=1
        this.fade=1
        this.time=0
        this.routines={}
        this.setupGraphics(direction)
    }
    standardModel(limbLength,legStartTop,armStartTop,levels,dimensions,mouthAnim,spins){
        let colorBase=this.graphicManager.getData(this.name).color
        return {
            hair:{
                display:{back:true,front:true,glow:true},
                fade:{back:1,front:1,glow:1},
                color:colorBase.hair,
            },legs:[
                {
                    color:colorBase.skin.legs,
                    display:true,fade:1,
                    anim:{
                        top:{rho:limbLength,phi:6,theta:-60},
                        middle:{rho:limbLength,phi:12,theta:-150},
                    },points:{
                        top:legStartTop[0],
                        middle:{x:0,y:0,z:0},
                        bottom:{x:0,y:0,z:0},
                    },appear:{
                        top:{x:0,y:0},
                        middle:{x:0,y:0},
                        bottom:{x:0,y:0},
                    },
                },{
                    color:colorBase.skin.legs,
                    display:true,fade:1,
                    anim:{
                        top:{rho:limbLength,phi:6,theta:60},
                        middle:{rho:limbLength,phi:12,theta:150},
                    },points:{
                        top:legStartTop[1],
                        middle:{x:0,y:0,z:0},
                        bottom:{x:0,y:0,z:0},
                    },appear:{
                        top:{x:0,y:0},
                        middle:{x:0,y:0},
                        bottom:{x:0,y:0},
                    },
                },
            ],arms:[
                {
                    color:colorBase.skin.arms,
                    display:true,fade:1,
                    anim:{
                        top:{rho:limbLength,phi:27,theta:-90},
                        middle:{rho:limbLength,phi:9,theta:-84},
                    },points:{
                        top:armStartTop[0],
                        middle:{x:0,y:0,z:0},
                        bottom:{x:0,y:0,z:0},
                    },appear:{
                        top:{x:0,y:0},
                        middle:{x:0,y:0},
                        bottom:{x:0,y:0},
                        stack:{
                            top:{x:0,y:0},
                            middle:{x:0,y:0},
                            bottom:{x:0,y:0},
                        },
                    },
                },{
                    color:colorBase.skin.arms,
                    display:true,fade:1,
                    anim:{
                        top:{rho:limbLength,phi:27,theta:90},
                        middle:{rho:limbLength,phi:9,theta:84},
                    },points:{
                        top:armStartTop[1],
                        middle:{x:0,y:0,z:0},
                        bottom:{x:0,y:0,z:0},
                    },appear:{
                        top:{x:0,y:0},
                        middle:{x:0,y:0},
                        bottom:{x:0,y:0},
                        stack:{
                            top:{x:0,y:0},
                            middle:{x:0,y:0},
                            bottom:{x:0,y:0},
                        },
                    },
                },
            ],body:{
                color:colorBase.skin.body,
                display:true,fade:1,
                level:levels[0],dimensions:dimensions[0],
                button:{spin:0},
            },head:{
                color:colorBase.skin.head,
                display:true,fade:1,
                level:levels[1],dimensions:dimensions[1],
                mouth:{color:colorBase.mouth,display:true,fade:1,level:levels[2],anim:mouthAnim},
                eye:[
                    {
                        display:true,fade:1,
                        color:colorBase.eye,
                        level:levels[3],anim:0,style:0,spin:-spins[0]
                    },{
                        display:true,fade:1,
                        color:colorBase.eye,
                        level:levels[4],anim:0,style:0,spin:spins[1]
                    },
                ],blush:[
                    {
                        display:true,fade:1,
                        color:colorBase.blush,
                        level:levels[5],spin:-spins[2]
                    },{
                        display:true,fade:1,
                        color:colorBase.blush,
                        level:levels[6],spin:spins[3]
                    },
                ],
            }
        }
    }
    setupGraphics(direction){
        this.subSetupGraphics=this.graphicManager.getPackage(this.name).setupGraphics
        this.subSetupGraphics()
        this.sprites={spin:0,detail:constants.graphics.detail,spinDetail:0,spinDetailHead:0,temp:0}
        this.direction={external:0,main:direction,head:direction,goal:direction}
        this.calc={int:[]}
        this.subDisplay=this.graphicManager.getPackage(this.name).display
        this.displayComponent=this.graphicManager.getPackage(this.name).displayComponent
    }
    calculatepart(){
        this.direction.head=this.direction.main
        for(let a=0,la=this.routines.calculatepart.length;a<la;a++){
            switch(this.routines.calculatepart[a]){
                case 0:
                    this.sprites.spin=round(((this.direction.main%360)+360)%360)
                    this.sprites.spinDetail=constrain(round((((this.direction.main%360)+360)%360)/this.sprites.detail),0,360/this.sprites.detail-1)
                    this.sprites.spinDetailHead=constrain(round((((this.direction.head%360)+360)%360)/this.sprites.detail),0,360/this.sprites.detail-1)
                break
                case 1:
                    for(let b=0,lb=this.components.legs.length;b<lb;b++){
                        let part=this.components.legs[b]

                        part.points.middle.x=part.points.top.x+part.anim.top.rho*lsin(part.anim.top.phi)*lsin(part.anim.top.theta)
                        part.points.middle.y=part.points.top.y+part.anim.top.rho*lcos(part.anim.top.phi)
                        part.points.middle.z=part.points.top.z+part.anim.top.rho*lsin(part.anim.top.phi)*lcos(part.anim.top.theta)

                        part.points.bottom.x=part.points.middle.x+part.anim.middle.rho*lsin(part.anim.middle.phi)*lsin(part.anim.middle.theta)
                        part.points.bottom.y=part.points.middle.y+part.anim.middle.rho*lcos(part.anim.middle.phi)
                        part.points.bottom.z=part.points.middle.z+part.anim.middle.rho*lsin(part.anim.middle.phi)*lcos(part.anim.middle.theta)

                        part.appear.top.x=lcos(this.direction.main)*part.points.top.x+lsin(this.direction.main)*part.points.top.z
                        part.appear.top.y=part.points.top.y
                        part.appear.top.z=-lsin(this.direction.main)*part.points.top.x+lcos(this.direction.main)*part.points.top.z

                        part.appear.middle.x=lcos(this.direction.main)*part.points.middle.x+lsin(this.direction.main)*part.points.middle.z
                        part.appear.middle.y=part.points.middle.y
                        part.appear.middle.z=-lsin(this.direction.main)*part.points.middle.x+lcos(this.direction.main)*part.points.middle.z

                        part.appear.bottom.x=lcos(this.direction.main)*part.points.bottom.x+lsin(this.direction.main)*part.points.bottom.z
                        part.appear.bottom.y=part.points.bottom.y
                        part.appear.bottom.z=-lsin(this.direction.main)*part.points.bottom.x+lcos(this.direction.main)*part.points.bottom.z
                    }
                break
                case 2:
                    for(let b=0,lb=this.components.arms.length;b<lb;b++){
                        let part=this.components.arms[b]

                        part.points.middle.x=part.points.top.x+part.anim.top.rho*lsin(part.anim.top.phi)*lsin(part.anim.top.theta)
                        part.points.middle.y=part.points.top.y+part.anim.top.rho*lcos(part.anim.top.phi)
                        part.points.middle.z=part.points.top.z+part.anim.top.rho*lsin(part.anim.top.phi)*lcos(part.anim.top.theta)

                        part.points.bottom.x=part.points.middle.x+part.anim.middle.rho*lsin(part.anim.middle.phi)*lsin(part.anim.middle.theta)
                        part.points.bottom.y=part.points.middle.y+part.anim.middle.rho*lcos(part.anim.middle.phi)
                        part.points.bottom.z=part.points.middle.z+part.anim.middle.rho*lsin(part.anim.middle.phi)*lcos(part.anim.middle.theta)

                        part.appear.top.x=lcos(this.direction.main)*part.points.top.x+lsin(this.direction.main)*part.points.top.z
                        part.appear.top.y=part.points.top.y
                        part.appear.top.z=-lsin(this.direction.main)*part.points.top.x+lcos(this.direction.main)*part.points.top.z

                        part.appear.middle.x=lcos(this.direction.main)*part.points.middle.x+lsin(this.direction.main)*part.points.middle.z
                        part.appear.middle.y=part.points.middle.y
                        part.appear.middle.z=-lsin(this.direction.main)*part.points.middle.x+lcos(this.direction.main)*part.points.middle.z

                        part.appear.bottom.x=lcos(this.direction.main)*part.points.bottom.x+lsin(this.direction.main)*part.points.bottom.z
                        part.appear.bottom.y=part.points.bottom.y
                        part.appear.bottom.z=-lsin(this.direction.main)*part.points.bottom.x+lcos(this.direction.main)*part.points.bottom.z
                    }
                break
                case 3:
                    for(let b=0,lb=this.components.arms.length;b<lb;b++){
                        let part=this.components.arms[b]
                        let deviation=(4-min(4,lcos(part.anim.top.theta+this.direction.main)*5+2))/2

                        part.appear.stack.top.x=(lcos(this.direction.main)*part.points.top.x+deviation)+lsin(this.direction.main)*part.points.top.z
                        part.appear.stack.top.y=part.appear.top.y-deviation/2
                        part.appear.stack.top.z=(-lsin(this.direction.main)*part.points.top.x+deviation)+lcos(this.direction.main)*part.points.top.z

                        part.appear.stack.middle.x=(lcos(this.direction.main)*part.points.middle.x+deviation)+lsin(this.direction.main)*part.points.middle.z
                        part.appear.stack.middle.y=part.appear.middle.y
                        part.appear.stack.middle.z=(-lsin(this.direction.main)*part.points.middle.x+deviation)+lcos(this.direction.main)*part.points.middle.z

                        part.appear.stack.bottom.x=(lcos(this.direction.main)*part.points.bottom.x+deviation)+lsin(this.direction.main)*part.points.bottom.z
                        part.appear.stack.bottom.y=part.appear.bottom.y
                        part.appear.stack.bottom.z=(-lsin(this.direction.main)*part.points.bottom.x+deviation)+lcos(this.direction.main)*part.points.bottom.z
                    }
                break
            }
        }
    }
    flashColor(color){
        return color
    }
    display(){
        if(this.fade>0&&this.size>0){
            this.calculatepart()
            this.layer.push()
            this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
            this.layer.rotate(this.direction.external)
            this.layer.scale(this.size)
            this.subDisplay()
            this.layer.pop()
        }
    }
    displayGeneralComponent(type,args){
        let part
        switch(type){
            case 0:
                part=this.components.head.eye[args[0]]
                this.layer.noFill()
                if(part.style==6&&part.anim>0){
                    this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                    this.layer.strokeWeight((4-part.anim*3)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2)
                    this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level)
                    this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*4,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2)
                    this.layer.stroke(...this.components.head.eye[args[0]].color.front,this.fade*part.fade)
                    this.layer.strokeWeight((3-part.anim*2)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2+0.2-part.anim*0.2)
                    this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2+part.anim*2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2)
                    this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2+part.anim*4,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2+part.anim*2)
                }else if(part.style==5){
                    this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                    this.layer.strokeWeight((6-part.anim*3)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    if(part.anim==0){
                        this.layer.point(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level)
                        this.layer.point(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level)
                    }else{
                        this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2)
                        this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2)
                    }
                    this.layer.stroke(...this.components.head.eye[args[0]].color.front,this.fade*part.fade)
                    this.layer.strokeWeight((6-part.anim*2)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    if(part.anim==0){
                        this.layer.point(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2)
                        this.layer.point(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2)
                    }else{
                        this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2+0.2-part.anim*0.2)
                        this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2+0.2-part.anim*0.2)
                    }
                    if(part.anim==0&&constrain(lcos(part.spin+this.direction.head)*5,0,1)>0){
                        this.layer.stroke(...this.components.head.eye[args[0]].color.glow,this.fade*part.fade/4)
                        this.layer.strokeWeight(0.6)
                        this.layer.arc(lsin(part.spin+this.direction.head)*(this.components.head.dimensions[0]*0.5+0.5),part.level,2.7*constrain(lcos(part.spin+this.direction.head)*5,0,1),2.7*constrain(lcos(part.spin+this.direction.head)*5,0,1),-72,-12)
                        if(part.style==4){
                            this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                            this.layer.strokeWeight(0.5)
                            this.layer.arc(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5,part.level,10*constrain(lcos(part.spin+this.direction.head)*5,0,1),10*constrain(lcos(part.spin+this.direction.head)*5,0,1),-165+args[0]*90,-105+args[0]*90)
                        }
                    }
                }else if(part.style==3&&part.anim>0){
                    this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                    this.layer.strokeWeight((4-part.anim*3)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2)
                    this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level)
                    this.layer.stroke(...this.components.head.eye[args[0]].color.front,this.fade*part.fade)
                    this.layer.strokeWeight((3-part.anim*2)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2+0.2-part.anim*0.2)
                    this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2+part.anim*2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2)
                }else if(part.style==2&&part.anim>0){
                    this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                    this.layer.strokeWeight((4-part.anim*3)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.arc(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5,part.level-1*part.anim,3*part.anim,4*part.anim,30,150)
                    this.layer.stroke(...this.components.head.eye[args[0]].color.front,this.fade*part.fade)
                    this.layer.strokeWeight((3-part.anim*2)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.arc(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5),part.level-1*part.anim,3*part.anim,4*part.anim,30,150)
                }else if(part.style==1&&part.anim>0){                    
                    this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                    this.layer.strokeWeight((4-part.anim*3)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.arc(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5,part.level+2*part.anim,3*part.anim,4*part.anim,-150,-30)
                    this.layer.stroke(...this.components.head.eye[args[0]].color.front,this.fade*part.fade)
                    this.layer.strokeWeight((3-part.anim*2)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    this.layer.arc(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5),part.level+2*part.anim,3*part.anim,4*part.anim,-150,-30)
                }else{
                    this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                    this.layer.strokeWeight((4-part.anim*3)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    if(part.anim==0){
                        this.layer.point(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level)
                        this.layer.point(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level)
                    }else{
                        this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2)
                        this.layer.line(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level,lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2)
                    }
                    this.layer.stroke(...this.components.head.eye[args[0]].color.front,this.fade*part.fade)
                    this.layer.strokeWeight((3-part.anim*2)*constrain(lcos(part.spin+this.direction.head)*5,0,1))
                    if(part.anim==0){
                        this.layer.point(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2)
                        this.layer.point(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2)
                    }else{
                        this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level-part.anim*2+0.2-part.anim*0.2)
                        this.layer.line(lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)-(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+0.2-part.anim*0.2,lsin(part.spin+this.direction.head)*((this.components.head.dimensions[0]*0.5+0.5)-part.anim*0.5)+(args[0]*2-1)*lcos(part.spin+this.direction.head)*part.anim*2,part.level+part.anim*2+0.2-part.anim*0.2)
                    }
                    if(part.anim==0&&constrain(lcos(part.spin+this.direction.head)*5,0,1)>0){
                        this.layer.stroke(...this.components.head.eye[args[0]].color.glow,this.fade*part.fade/4)
                        this.layer.strokeWeight(0.6)
                        this.layer.arc(lsin(part.spin+this.direction.head)*(this.components.head.dimensions[0]*0.5+0.5),part.level,1.8*constrain(lcos(part.spin+this.direction.head)*5,0,1),1.8*constrain(lcos(part.spin+this.direction.head)*5,0,1),-72,-12)
                        if(part.style==4){
                            this.layer.stroke(...this.components.head.eye[args[0]].color.back,this.fade*part.fade)
                            this.layer.strokeWeight(0.5)
                            this.layer.arc(lsin(part.spin+this.direction.head)*this.components.head.dimensions[0]*0.5,part.level,6.5*constrain(lcos(part.spin+this.direction.head)*5,0,1),6.5*constrain(lcos(part.spin+this.direction.head)*5,0,1),-165+args[0]*90,-105+args[0]*90)
                        }
                    }
                }
            break
            case 1:
                part=this.components.head.mouth
                if(part.anim.open>0){
                    this.layer.fill(...part.color.in,this.fade*part.fade)
                }else{
                    this.layer.noFill()
                }
                this.layer.stroke(...part.color.out,this.fade*part.fade)
                this.layer.strokeWeight(0.5-part.anim.open*0.25)
                this.layer.arc(lsin(this.direction.main)*(this.components.head.dimensions[0]*0.5-2),part.level,part.anim.x*lcos(this.direction.main),part.anim.y*(0.5+lcos(this.direction.main)*0.5),part.anim.wide,180-part.anim.wide)
                this.layer.strokeWeight(0.25*part.anim.open)
                this.layer.line(lsin(this.direction.main)*(this.components.head.dimensions[0]*0.5-2)-part.anim.x/2*lcos(this.direction.main),part.level,lsin(this.direction.main)*(this.components.head.dimensions[0]*0.5-2)+part.anim.x/2*lcos(this.direction.main),part.level)
            break
        }
    }
    update(){
        this.time++
    }
}