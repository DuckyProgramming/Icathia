this.packages.push(new graphicsPackage(
    [`Duck`],
    0,
    function(parent){
        return {
            color:{
                eye:{back:[0,0,0],front:[40,30,0],glow:[250,250,250]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}
            },
        }
    },function(){
        this.components=this.standardModel(
            1,
            10,[{x:-3,y:-15,z:0},{x:3,y:-15,z:0}],[{x:-3,y:-25,z:0},{x:3,y:-25,z:0}],
            [-19,-38,-32,-32,-33.5,-40,-40],[[14,24],[30,30],[12,12],[12,12],[12,12],[12,12]],[18,18]
        )
        this.routines.calculatepart=[0,4,5]
    },function(){
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&part.appear.bottom.z<=0){
                this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                this.layer.noStroke()
                this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
            }
        }
        for(let a=0,la=this.components.legs.length;a<la;a++){
            let part=this.components.legs[a]
            if(part.display&&part.appear.bottom.z<=0){
                this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                this.layer.noStroke()
                this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
            }
        }
        if(this.components.body.display){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
            this.layer.ellipse(0,this.components.body.level,this.components.body.dimensions[0],this.components.body.dimensions[1])
        }
        for(let a=0,la=this.components.legs.length;a<la;a++){
            let part=this.components.legs[a]
            if(part.display&&part.appear.bottom.z>0){
                this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                this.layer.noStroke()
                this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
            }
        }
        if(this.components.head.beak.main.display&&lcos(this.components.head.beak.spin+this.direction.main)<=0){
            this.layer.fill(...this.flashColor(this.components.head.beak.main.color),this.fade.main*this.components.head.beak.main.fade)
            this.layer.noStroke()
            this.layer.ellipse(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.main.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,8)
        }
        if(this.components.head.beak.mouth.display&&lcos(this.components.head.beak.spin+this.direction.main)<=0){
            this.layer.noFill()
            this.layer.stroke(...this.flashColor(this.components.head.beak.mouth.color),this.fade.main*this.components.head.beak.mouth.fade)
            this.layer.strokeWeight(0.5)
            this.layer.arc(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.mouth.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,1,0,180)
        }
        if(this.components.head.beak.nostril.display&&lcos(this.components.head.beak.spin+this.direction.main)<=0){
            this.layer.noFill()
            this.layer.stroke(...this.flashColor(this.components.head.beak.nostril.color),this.fade.main*this.components.head.beak.nostril.fade)
            this.layer.strokeWeight(0.5)
            for(let a=0,la=2;a<la;a++){
                this.layer.line(lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level+0.5)
            }
        }
        if(this.components.head.display){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.head.color),this.fade.main*this.components.head.fade)
            this.layer.ellipse(0,this.components.head.level,this.components.head.dimensions[0],this.components.head.dimensions[1])
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&part.appear.bottom.z>0){
                this.layer.fill(...this.flashColor(upColor(part.color,5*part.appear.bottom.z,[1,1,1])),this.fade.main*part.fade)
                this.layer.noStroke()
                this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y,part.dimensions[0],part.dimensions[1])
            }
        }
        for(let a=0,la=2;a<la;a++){
            if(this.components.head.eye[a].display){
                this.displayGeneralComponent(0,[a])
            }
        }
        if(this.components.head.beak.main.display&&lcos(this.components.head.beak.spin+this.direction.main)>0){
            this.layer.fill(...this.flashColor(this.components.head.beak.main.color),this.fade.main*this.components.head.beak.main.fade)
            this.layer.noStroke()
            this.layer.ellipse(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.main.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,8)
        }
        if(this.components.head.beak.mouth.display&&lcos(this.components.head.beak.spin+this.direction.main)>0){
            this.layer.noFill()
            this.layer.stroke(...this.flashColor(this.components.head.beak.mouth.color),this.fade.main*this.components.head.beak.mouth.fade)
            this.layer.strokeWeight(0.5)
            this.layer.arc(lsin(this.components.head.beak.spin+this.direction.main)*12,this.components.head.beak.mouth.level,12+lcos(this.components.head.beak.spin+this.direction.main)*2,1,0,180)
        }
        if(this.components.head.beak.nostril.display&&lcos(this.components.head.beak.spin+this.direction.main)>0){
            this.layer.noFill()
            this.layer.stroke(...this.flashColor(this.components.head.beak.nostril.color),this.fade.main*this.components.head.beak.nostril.fade)
            this.layer.strokeWeight(0.5)
            for(let a=0,la=2;a<la;a++){
                this.layer.line(lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.components.head.beak.nostril.level+0.5)
            }
        }
    },
    0,
))