this.packages.push(new graphicsPackage(
    [`Meri`],
    function(parent,type,direction,data){
        let layer
        let overlayer
        switch(type){
            case 0:
                layer=parent.subSprite(200,300,100,100)
                overlayer=parent.subSprite(200,300,100,100)
                parent.controlSpin(data.parts.hair.inside,direction,0)
                parent.controlSpin(data.parts.hair.main,direction,0)
                parent.controlSpin(data.parts.hair.reverseInside,direction,0)
                parent.controlSpin(data.parts.hair.reverse,direction,0)
                parent.displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,33,1,-0.0225,data.color.hair.insideFront,data.color.hair.insideFront,1)
                layer.arc(0,0,35,34,-180,0)
                layer.line(-17.5,0,17.5,0)
                parent.displayTrianglesFrontMerge(layer,data.parts.hair.reverseInside,direction,1,34.5,0.2,0.1,-1,-1,1)
                parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.main,direction,0,35,1,-0.015,data.color.hair.front,data.color.hair.front,1)
                overlayer.arc(0,0,35,34,-180,0)
                overlayer.line(-17.5,0,17.5,0)
                parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.reverse,direction,1,34.5,0.2,0.1,-1,-1,1)
                layer.image(overlayer,0,10,40,60)
                return layer
            case 1:
                layer=parent.subSprite(200,300,100,100)
                parent.displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,35,1,-0.0225,data.color.hair.back,data.color.hair.back,1)
                parent.displayTrianglesBackMerge(layer,data.parts.hair.inside,direction,0,33,1,-0.015,data.color.hair.insideBack,data.color.hair.insideBack,1)
                return layer
        }
    },function(parent){
        let data={
            sprites:{
                detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                hair:{back:[],front:[]},
            },
            parts:{
                hair:{main:[],inside:[],reverse:[],reverseInside:[]}
            },color:{
                hair:{back:[50,50,70],front:[70,70,90],insideBack:[40,40,60],insideFront:[60,60,80],glow:[245,230,245]},
                skin:{head:[223,214,197],body:[200,186,177],legs:[224,234,243],arms:[235,233,221]},
                eye:{back:[203,183,210],front:[65,76,108],glow:[222,227,223]},
                mouth:{in:[191,125,127],out:[0,0,0]},
                blush:[247,204,229],
                dress:{main:[137,106,172],over:[122,92,163],sleeve:[154,135,192],stripe:[170,182,208],highlight:[188,207,221],bow:[253,253,253],tie:[112,59,127]},
                shoe:[165,89,116],
                bell:[[200,180,100],[0,0,0]],
            },
            spin:{tail:[-114,114]}
        }
        for(let a=0,la=12;a<la;a++){
            let zonal=[random(-180/la,-60/la),random(-60/la,60/la),random(60/la,180/la)]
            let scale=8.5-lcos(a/la*360)*9-lcos(a/la*360)*abs(lcos(a/la*360))*3.5+random(-0.2,0.2)
            if(scale>0){
                data.parts.hair.main.push({spin:[a/la*360-180/la,a/la*360,a/la*360+zonal[0]],y:[0,0,scale/2]})
                data.parts.hair.main.push({spin:[a/la*360,a/la*360+180/la,a/la*360+zonal[2]],y:[0,0,scale/2]})
                data.parts.hair.main.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360],y:[scale/2,scale/2,0]})
                data.parts.hair.main.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360+zonal[1]],y:[scale/2,scale/2,scale]})
            }else{
                data.parts.hair.reverse.push({spin:[a/la*360-180/la-max(0,-6-scale*4),a/la*360,a/la*360+zonal[0]],y:[0,0,scale/2-0.5]})
                data.parts.hair.reverse.push({spin:[a/la*360,a/la*360+180/la+max(0,-6-scale*4),a/la*360+zonal[2]],y:[0,0,scale/2-0.5]})
                data.parts.hair.reverse.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360],y:[scale/2-0.5,scale/2-0.5,0]})
                data.parts.hair.reverse.push({spin:[a/la*360+zonal[0],a/la*360+zonal[2],a/la*360+zonal[1]],y:[scale/2-0.5,scale/2-0.5,scale-1]})
            }

            zonal=[random(-180/la,-30/la),random(-90/la,90/la),random(30/la,180/la)]
            scale=6.5-lcos((a+0.5)/la*360)*8-lcos((a+0.5)/la*360)*abs(lcos((a+0.5)/la*360))*3.25+random(-0.2,0.2)
            if(scale>0){
                data.parts.hair.inside.push({spin:[(a+0.5)/la*360-180/la,(a+0.5)/la*360,(a+0.5)/la*360+zonal[0]],y:[0,0,scale/2]})
                data.parts.hair.inside.push({spin:[(a+0.5)/la*360,(a+0.5)/la*360+180/la,(a+0.5)/la*360+zonal[2]],y:[0,0,scale/2]})
                data.parts.hair.inside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360],y:[scale/2,scale/2,0]})
                data.parts.hair.inside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360+zonal[1]],y:[scale/2,scale/2,scale]})
            }else{
                data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360-180/la-max(0,-6-scale*4),(a+0.5)/la*360,(a+0.5)/la*360+zonal[0]],y:[0,0,scale/2-1]})
                data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360,(a+0.5)/la*360+180/la+max(0,-6-scale*4),(a+0.5)/la*360+zonal[2]],y:[0,0,scale/2-1]})
                data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360],y:[scale/2-1,scale/2-1,0]})
                data.parts.hair.reverseInside.push({spin:[(a+0.5)/la*360+zonal[0],(a+0.5)/la*360+zonal[2],(a+0.5)/la*360+zonal[1]],y:[scale/2-1,scale/2-1,scale-2]})
            }
        }
        for(let a=0,la=data.sprites.genAmount;a<la;a++){
            data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
            data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
        }
        return data
    },function(){
        let colorBase=this.graphicManager.getData(this.name).color
        this.components=this.standardModel(
            16.25,[{x:-3,y:-32.5,z:0},{x:3,y:-32.5,z:0}],[{x:-3.25,y:-57.5,z:0},{x:3.25,y:-57.5,z:0}],
            [-46,-78,-71.75,-75.75,-75.75,-71.5,-71.5],[[11,35],[30,30]],{x:8,y:5,open:0,wide:39},[18,18,30,30]
        )
        this.components.dress={
            display:{main:true,sleeve:[true,true]},
            fade:{main:1,sleeve:[1,1]},
            color:colorBase.dress,
            bow:{display:true,fade:1,color:colorBase.dress.bow,spin:180},
            tie:{display:true,fade:1,color:colorBase.dress.tie,spin:0},
        }
        this.components.shoe=[
            {
                display:true,fade:1,
                color:colorBase.shoe,
            },{
                display:true,fade:1,
                color:colorBase.shoe,
            },
        ]
        this.components.bell={
            display:true,fade:1,
            color:colorBase.bell,
            spin:0,
        }
        this.routines.calculatePart=[0,1,2,3]
    },function(){
                        if(this.components.hair.display.back){
            let size=this.fade.main*this.components.hair.fade.back
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.back[this.sprites.spinDetail],0,this.components.head.level+10*size,40*size,60*size)
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)<=-0.6){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                if(this.components.dress.display.sleeve[a]){
                    this.displayComponent(0,[a])
                }
            }
        }
        if(this.components.bell.display&&lcos(this.components.bell.spin+this.direction.main)<=0){
            this.layer.noStroke()
            this.layer.fill(...this.components.bell.color[0],this.components.bell.fade)
            this.layer.ellipse(7*lsin(this.components.bell.spin+this.direction.main),-59,6)
        }
        if(this.components.dress.tie.display&&lcos(this.components.dress.tie.spin+this.direction.main)<=0){
            let part=this.components.dress.tie
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.strokeWeight(0.5)
            this.layer.strokeJoin(ROUND)
            this.layer.quad(
                4*lsin(part.spin+this.direction.main),-59.5,
                4.5*lsin(part.spin+this.direction.main)-2.5*lcos(part.spin+this.direction.main),-55.5,
                4.5*lsin(part.spin+this.direction.main)-3*lcos(part.spin+this.direction.main),-53,
                4.5*lsin(part.spin+this.direction.main)-1.5*lcos(part.spin+this.direction.main),-55
            )
            this.layer.quad(
                4*lsin(part.spin+this.direction.main),-59.5,
                4.5*lsin(part.spin+this.direction.main)+2.5*lcos(part.spin+this.direction.main),-55.5,
                4.5*lsin(part.spin+this.direction.main)+3*lcos(part.spin+this.direction.main),-53,
                4.5*lsin(part.spin+this.direction.main)+1.5*lcos(part.spin+this.direction.main),-55
            )
            this.layer.strokeJoin(MITER)
        }
        if(this.components.dress.bow.display&&lcos(this.components.dress.bow.spin+this.direction.main)<=0){
            let part=this.components.dress.bow
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.strokeWeight(1)
            this.layer.strokeJoin(ROUND)
            this.layer.triangle(
                6.75*lsin(part.spin+this.direction.main),-46,
                6.75*lsin(part.spin+this.direction.main)-7*lcos(part.spin+this.direction.main),-48.5,
                6.75*lsin(part.spin+this.direction.main)-6.5*lcos(part.spin+this.direction.main),-42.5
            )
            this.layer.triangle(
                6.75*lsin(part.spin+this.direction.main),-46,
                6.75*lsin(part.spin+this.direction.main)+7*lcos(part.spin+this.direction.main),-48.5,
                6.75*lsin(part.spin+this.direction.main)+6.5*lcos(part.spin+this.direction.main),-42.5
            )
            this.layer.strokeJoin(MITER)
            for(let a=0,la=15;a<la;a++){
                this.layer.strokeWeight(1.5+a*0.08)
                this.layer.line(
                    6.75*lsin(part.spin+this.direction.main)-a*(1+0.25*lsin(a/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+a*1.5,
                    6.75*lsin(part.spin+this.direction.main)-(a+1)*(1+0.25*lsin((a+1)/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+(a+1)*1.5
                )
            }
            for(let a=0,la=15;a<la;a++){
                this.layer.strokeWeight(1.5+a*0.08)
                this.layer.line(
                    6.75*lsin(part.spin+this.direction.main)+a*(1+0.25*lsin((a+2.5)/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+a*1.5,
                    6.75*lsin(part.spin+this.direction.main)+(a+1)*(1+0.25*lsin((a+3.5)/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+(a+1)*1.5
                )
            }
        }
        if(this.components.body.display){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
            this.layer.ellipse(0,this.components.body.level,this.components.body.dimensions[0],this.components.body.dimensions[1])
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)<0.4&&lcos(part.anim.top.theta+this.direction.main)>-0.6){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                if(this.components.dress.display.sleeve[a]){
                    this.displayComponent(0,[a])
                }
            }
        }
        for(let a=0,la=2;a<la;a++){
            let key=this.components.legs[0].appear.bottom.z<=this.components.legs[1].appear.bottom.z?a:1-a
            let part=this.components.legs[key]
            if(this.components.shoe[key].display){
                let color=this.flashColor(upColor(this.components.shoe[key].color,lcos(this.direction.main+part.appear.middle.z)*10,[1,1,1]))
                this.layer.fill(...color,this.fade.main*this.components.shoe[key].fade)
                this.layer.noStroke()
                this.layer.ellipse(part.appear.bottom.x,part.appear.bottom.y+1.25,5.5,3)
            }
            if(this.components.legs[key].display){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
            }
            if(this.components.shoe[key].display){
                let color=this.flashColor(upColor(this.components.shoe[key].color,lcos(this.direction.main+part.appear.middle.z)*10,[1,1,1]))
                this.layer.stroke(...color,this.fade.main*this.components.shoe[key].fade)
                this.layer.strokeWeight(1)
                this.layer.noFill()
                this.layer.arc(part.appear.bottom.x,part.appear.bottom.y+1.25,4.5,2,0,180)
                this.layer.strokeWeight(1.25)
                this.layer.arc(part.appear.bottom.x+lsin(this.direction.main)*2,part.appear.bottom.y+1.25+abs(lsin(this.direction.main))*0.5,4.5+abs(lsin(this.direction.main))*2,1.5+abs(lsin(this.direction.main)),-180-min(0,lsin(this.direction.main))*90,-max(0,lsin(this.direction.main))*90)
            }
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)>-0.4&&lcos(part.anim.top.theta+this.direction.main)<0.4){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(min(4,lcos(part.anim.top.theta+this.direction.main)*5+2))
                this.layer.line(part.appear.stack.top.x,part.appear.stack.top.y,part.appear.stack.middle.x,part.appear.stack.middle.y)
                this.layer.line(part.appear.stack.middle.x,part.appear.stack.middle.y,part.appear.stack.bottom.x,part.appear.stack.bottom.y)
                if(this.components.dress.display.sleeve[a]){
                    this.displayComponent(0,[a])
                }
            }
        }
        if(this.components.dress.display.main){
            let part=this.components.dress
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color.highlight),this.fade.main*part.fade.main)
            for(let a=0,la=18;a<la;a++){
                if(lcos(a/la*360)>0){
                    this.layer.push()
                    this.layer.translate(13.75*lsin((a-0.2)/la*360),-24.5+4*lcos((a-0.2)/la*360))
                    this.layer.rotate(-18*lsin(lsin((a-0.2)/la*360)*90))
                    this.layer.ellipse(0,0,3.25*lcos((a-0.2)/la*360),4.5)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(13.75*lsin((a+0.2)/la*360),-24.5+4*lcos((a+0.2)/la*360))
                    this.layer.rotate(-18*lsin(lsin((a+0.2)/la*360)*90))
                    this.layer.ellipse(0,0,3.25*lcos((a+0.2)/la*360),4.5)
                    this.layer.pop()
                }
            }
            this.layer.fill(...this.flashColor(part.color.main),this.fade.main*part.fade.main)
            this.layer.quad(-6,-44,6,-44,14,-24,-14,-24)
            this.layer.ellipse(0,-24,28,8)
            this.layer.arc(0,-44,12,40,-180,0)
            this.layer.ellipse(0,-44,12,2)
            this.layer.fill(...this.flashColor(part.color.over),this.fade.main*part.fade.main)
            for(let a=0,la=15;a<la;a++){
                if(lcos((a-0.16)/la*360)>0){
                    this.layer.triangle(
                        6*lsin((a-0.16)/la*360),-45.5+lcos((a-0.16)/la*360)*2,
                        14*lsin((a-0.24)/la*360),-24+4*sqrt(1-lsin((a-0.24)/la*360)**2),
                        14*lsin((a-0.08)/la*360),-24+4*sqrt(1-lsin((a-0.08)/la*360)**2)
                    )
                }
                if(lcos((a+0.16)/la*360)>0){
                    this.layer.triangle(
                        6*lsin((a+0.16)/la*360),-45.5+lcos((a+0.16)/la*360)*2,
                        14*lsin((a+0.24)/la*360),-24+4*sqrt(1-lsin((a+0.24)/la*360)**2),
                        14*lsin((a+0.08)/la*360),-24+4*sqrt(1-lsin((a+0.08)/la*360)**2)
                    )
                }
            }
            this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*part.fade.main)
            this.layer.ellipse(0,-62.75,4,2.5)
            this.layer.fill(...this.flashColor(part.color.stripe),this.fade.main*part.fade.main)
            this.layer.beginShape()
            this.layer.vertex(-13.5,-25.25)
            this.layer.bezierVertex(-9.4,-21.25,9.4,-21.25,13.5,-25.25)
            this.layer.vertex(13.7,-24.75)
            this.layer.bezierVertex(9.5,-20.5,-9.5,-20.5,-13.7,-24.75)
            this.layer.endShape()
        }
        if(this.components.dress.bow.display&&lcos(this.components.dress.bow.spin+this.direction.main)>0){
            let part=this.components.dress.bow
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.strokeWeight(1)
            this.layer.strokeJoin(ROUND)
            this.layer.triangle(
                6.75*lsin(part.spin+this.direction.main),-46,
                6.75*lsin(part.spin+this.direction.main)-7*lcos(part.spin+this.direction.main),-48.5,
                6.75*lsin(part.spin+this.direction.main)-6.5*lcos(part.spin+this.direction.main),-42.5
            )
            this.layer.triangle(
                6.75*lsin(part.spin+this.direction.main),-46,
                6.75*lsin(part.spin+this.direction.main)+7*lcos(part.spin+this.direction.main),-48.5,
                6.75*lsin(part.spin+this.direction.main)+6.5*lcos(part.spin+this.direction.main),-42.5
            )
            this.layer.strokeJoin(MITER)
            for(let a=0,la=15;a<la;a++){
                this.layer.strokeWeight(1.5+a*0.08)
                this.layer.line(
                    6.75*lsin(part.spin+this.direction.main)-a*(1+0.25*lsin(a/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+a*1.5,
                    6.75*lsin(part.spin+this.direction.main)-(a+1)*(1+0.25*lsin((a+1)/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+(a+1)*1.5
                )
            }
            for(let a=0,la=15;a<la;a++){
                this.layer.strokeWeight(1.5+a*0.08)
                this.layer.line(
                    6.75*lsin(part.spin+this.direction.main)+a*(1+0.25*lsin((a+2.5)/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+a*1.5,
                    6.75*lsin(part.spin+this.direction.main)+(a+1)*(1+0.25*lsin((a+3.5)/la*480+this.time))*lcos(part.spin+this.direction.main),
                    -45.5+(a+1)*1.5
                )
            }
        }
        if(this.components.dress.tie.display&&lcos(this.components.dress.tie.spin+this.direction.main)>0){
            let part=this.components.dress.tie
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
            this.layer.strokeWeight(0.5)
            this.layer.strokeJoin(ROUND)
            this.layer.quad(
                4*lsin(part.spin+this.direction.main),-59.5,
                4.5*lsin(part.spin+this.direction.main)-2.5*lcos(part.spin+this.direction.main),-55.5,
                4.5*lsin(part.spin+this.direction.main)-3*lcos(part.spin+this.direction.main),-53,
                4.5*lsin(part.spin+this.direction.main)-1.5*lcos(part.spin+this.direction.main),-55
            )
            this.layer.quad(
                4*lsin(part.spin+this.direction.main),-59.5,
                4.5*lsin(part.spin+this.direction.main)+2.5*lcos(part.spin+this.direction.main),-55.5,
                4.5*lsin(part.spin+this.direction.main)+3*lcos(part.spin+this.direction.main),-53,
                4.5*lsin(part.spin+this.direction.main)+1.5*lcos(part.spin+this.direction.main),-55
            )
            this.layer.strokeJoin(MITER)
        }
        if(this.components.bell.display&&lcos(this.components.bell.spin+this.direction.main)>0){
            this.layer.noStroke()
            this.layer.fill(...this.components.bell.color[0],this.components.bell.fade)
            this.layer.ellipse(7*lsin(this.components.bell.spin+this.direction.main),-59,6)
            this.layer.fill(...this.components.bell.color[1],this.components.bell.fade)
            this.layer.ellipse(9*lsin(this.components.bell.spin+this.direction.main),-59,2*lcos((this.components.bell.spin+this.direction.main)))
            this.layer.rect(9*lsin(this.components.bell.spin+this.direction.main),-58,2/3*lcos((this.components.bell.spin+this.direction.main)),2,1/3*lcos((this.components.bell.spin+this.direction.main)))
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)>=0.4){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(min(4,lcos(part.anim.top.theta+this.direction.main)*5+2))
                this.layer.line(part.appear.stack.top.x,part.appear.stack.top.y,part.appear.stack.middle.x,part.appear.stack.middle.y)
                this.layer.line(part.appear.stack.middle.x,part.appear.stack.middle.y,part.appear.stack.bottom.x,part.appear.stack.bottom.y)
                if(this.components.dress.display.sleeve[a]){
                    this.displayComponent(0,[a])
                }
            }
        }
        if(this.components.head.display){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.head.color),this.fade.main*this.components.head.fade)
            this.layer.ellipse(0,this.components.head.level,this.components.head.dimensions[0],this.components.head.dimensions[1])
        }
        for(let a=0,la=2;a<la;a++){
            let part=this.components.head.blush[a]
            if(part.display){
                this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade*0.2)
                if(lcos(part.spin+this.direction.main)>0){
                    this.layer.push()
                    this.layer.translate(12.5*lsin(part.spin+this.direction.main),part.level)
                    this.layer.rotate(36*lsin(part.spin+this.direction.main))
                    this.layer.ellipse(0,0,5*lcos(part.spin+this.direction.main),4)
                    this.layer.ellipse(0,0,3.75*lcos(part.spin+this.direction.main),3)
                    this.layer.ellipse(0,0,2.5*lcos(part.spin+this.direction.main),2)
                    this.layer.ellipse(0,0,1.25*lcos(part.spin+this.direction.main),1)
                    this.layer.pop()
                }
            }
        }
        for(let a=0,la=2;a<la;a++){
            if(this.components.head.eye[a].display){
                this.displayGeneralComponent(0,[a])
            }
        }
        if(this.components.head.mouth.display&&lcos(this.direction.main)>0){
            this.displayGeneralComponent(1,[])
        }
        if(this.components.hair.display.front){
            let size=this.fade.main*this.components.hair.fade.front
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.front[this.sprites.spinDetail],0,this.components.head.level+10*size,40*size,60*size)
        }
        if(this.components.hair.display.glow){
            this.layer.noFill()
            this.layer.stroke(...this.components.hair.color.glow,this.fade.main*0.15*this.components.hair.fade.glow)
            for(let a=0,la=6;a<la;a++){
                this.layer.strokeWeight((3-a/2))
                this.layer.arc(0,this.components.head.level,this.components.head.dimensions[0]+a,this.components.head.dimensions[1]+a,-72+a*6,-12-a*6)
            }
        }
    },function(type,args){
        let dir
        let sc
        switch(type){
            case 0:
                let loc=[
                    this.components.arms[args[0]].appear.top,
                    this.components.arms[args[0]].appear.middle,
                    this.components.arms[args[0]].appear.bottom
                ]
                dir=atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y)
                sc=[lsin(dir+90),lcos(dir+90)]
                this.layer.noStroke()
                this.layer.fill(...this.flashColor(this.components.dress.color.highlight),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.quad(
                    loc[1].x*0.2+loc[2].x*0.8+2.4*sc[0],
                    loc[1].y*0.2+loc[2].y*0.8+2.4*sc[1],
                    loc[1].x*0.2+loc[2].x*0.8-2.4*sc[0],
                    loc[1].y*0.2+loc[2].y*0.8-2.4*sc[1],
                    loc[1].x*0.25+loc[2].x*0.75-2.5*sc[0],
                    loc[1].y*0.25+loc[2].y*0.75-2.5*sc[1],
                    loc[1].x*0.25+loc[2].x*0.75+2.5*sc[0],
                    loc[1].y*0.25+loc[2].y*0.75+2.5*sc[1]
                )
                this.layer.fill(...this.flashColor(this.components.dress.color.sleeve),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.beginShape()
                this.layer.vertex(
                    loc[1].x+2.1*sc[0],
                    loc[1].y+2.1*sc[1])
                this.layer.vertex(
                    loc[1].x*0.4+loc[2].x*0.6+3.25*sc[0],
                    loc[1].y*0.4+loc[2].y*0.6+3.25*sc[1])
                this.layer.vertex(
                    loc[1].x*0.25+loc[2].x*0.75+2.5*sc[0],
                    loc[1].y*0.25+loc[2].y*0.75+2.5*sc[1])
                this.layer.vertex(
                    loc[1].x*0.25+loc[2].x*0.75-2.5*sc[0],
                    loc[1].y*0.25+loc[2].y*0.75-2.5*sc[1])
                this.layer.vertex(
                    loc[1].x*0.4+loc[2].x*0.6-3.25*sc[0],
                    loc[1].y*0.4+loc[2].y*0.6-3.25*sc[1])
                this.layer.vertex(
                    loc[1].x-2.1*sc[0],
                    loc[1].y-2.1*sc[1])
                this.layer.endShape()
                this.layer.ellipse(loc[1].x,loc[1].y,4.3)
                dir=atan2(loc[0].x-loc[1].x,loc[0].y-loc[1].y)
                sc=[lsin(dir+90),lcos(dir+90)]
                this.layer.quad(
                    loc[1].x-2.1*sc[0],
                    loc[1].y-2.1*sc[1],
                    loc[1].x+2.1*sc[0],
                    loc[1].y+2.1*sc[1],
                    loc[0].x+2.1*sc[0],
                    loc[0].y+2.1*sc[1],
                    loc[0].x-2.1*sc[0],
                    loc[0].y-2.1*sc[1]
                )
                this.layer.fill(...this.flashColor(this.components.dress.color.highlight),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.beginShape()
                let set=[
                    [0,1],
                    [0.225,1],
                    [0.175,2/3],
                    [0.225,1/3],
                    [0.175,0],
                    [0.225,-1/3],
                    [0.175,-2/3],
                    [0.225,-1],
                    [0,-1],
                ]
                for(let a=0,la=set.length;a<la;a++){
                    this.layer.vertex(
                        loc[0].x*(1-set[a][0])+
                        loc[1].x*set[a][0]+
                        (2.15+1.75*set[a][0])*set[a][1]*sc[0],
                        loc[0].y*(1-set[a][0])+
                        loc[1].y*set[a][0]+
                        (2.15+1.75*set[a][0])*set[a][1]*sc[1]
                    )
                }
                this.layer.endShape()
                this.layer.noStroke()
                this.layer.fill(...this.flashColor(this.components.dress.color.highlight),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.quad(
                    loc[0].x*0.2+loc[1].x*0.8+2.1*sc[0],
                    loc[0].y*0.2+loc[1].y*0.8+2.1*sc[1],
                    loc[0].x*0.2+loc[1].x*0.8-2.1*sc[0],
                    loc[0].y*0.2+loc[1].y*0.8-2.1*sc[1],
                    loc[0].x*0.25+loc[1].x*0.75-2.1*sc[0],
                    loc[0].y*0.25+loc[1].y*0.75-2.1*sc[1],
                    loc[0].x*0.25+loc[1].x*0.75+2.1*sc[0],
                    loc[0].y*0.25+loc[1].y*0.75+2.1*sc[1]
                )
                this.layer.fill(...this.flashColor(this.components.dress.color.bow),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.quad(
                    loc[0].x*0.225+loc[1].x*0.775+1.4*sc[0]+0.8*sc[1],
                    loc[0].y*0.225+loc[1].y*0.775+1.4*sc[1]-0.8*sc[0],
                    loc[0].x*0.225+loc[1].x*0.775+1.4*sc[0]-0.8*sc[1],
                    loc[0].y*0.225+loc[1].y*0.775+1.4*sc[1]+0.8*sc[0],
                    loc[0].x*0.225+loc[1].x*0.775-1.4*sc[0]+0.8*sc[1],
                    loc[0].y*0.225+loc[1].y*0.775-1.4*sc[1]-0.8*sc[0],
                    loc[0].x*0.225+loc[1].x*0.775-1.4*sc[0]-0.8*sc[1],
                    loc[0].y*0.225+loc[1].y*0.775-1.4*sc[1]+0.8*sc[0]
                )
                this.layer.ellipse(
                    loc[0].x*0.225+loc[1].x*0.775,
                    loc[0].y*0.225+loc[1].y*0.775,
                    0.8
                )
                this.layer.fill(...this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.push()
                this.layer.translate(loc[0].x,loc[0].y)
                this.layer.rotate(-dir)
                this.layer.arc(0,0,4.6,4.2,0,180)
                this.layer.ellipse(0,0,4.6,0.4)
                this.layer.pop()
                this.layer.beginShape()
                set=[
                    [0,1],
                    [0.16,1],
                    [0.11,2/3],
                    [0.16,1/3],
                    [0.11,0],
                    [0.16,-1/3],
                    [0.11,-2/3],
                    [0.16,-1],
                    [0,-1],
                ]
                for(let a=0,la=set.length;a<la;a++){
                    this.layer.vertex(
                        loc[0].x*(1-set[a][0])+
                        loc[1].x*set[a][0]+
                        (2.2+2*set[a][0])*set[a][1]*sc[0],
                        loc[0].y*(1-set[a][0])+
                        loc[1].y*set[a][0]+
                        (2.2+2*set[a][0])*set[a][1]*sc[1]
                    )
                }
                this.layer.endShape()
            break
        }
    },
))