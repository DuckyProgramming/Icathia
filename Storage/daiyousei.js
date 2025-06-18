this.packages.push(new graphicsPackage(
    [`Daiyousei`],
    function(parent,type,direction,data){
        let layer
        let overlayer
        switch(type){
            case 0:
                layer=parent.subSprite(200,300,100,100)
                parent.controlSpin(data.parts.hair.inside,direction,0)
                parent.displayTrianglesFront(layer,data.parts.hair.inside,direction,0,32,1,-0.25,data.color.hair.insideFront,1)
                parent.controlSpin(data.parts.hair.main,direction,0)
                parent.displayTrianglesFront(layer,data.parts.hair.main,direction,0,34,1,-0.125,data.color.hair.front,1)
                layer.arc(0,0,34,33,-180,0)
                layer.line(-17,0,17,0)
                return layer
            case 1:
                layer=parent.subSprite(200,300,100,100)
                parent.displayTrianglesBack(layer,data.parts.hair.main,direction,0,34,1,-0.125,data.color.hair.back,1)
                parent.displayTrianglesBack(layer,data.parts.hair.inside,direction,0,32,1,-0.25,data.color.hair.insideBack,1)
                return layer
            case 2:
                layer=parent.subSprite(100,200,50,50)
                for(let a=0,la=data.parts.hair.tail.length;a<la;a++){
                    parent.controlSpin(data.parts.hair.tail[a][0],direction,0)
                    parent.controlSpin(data.parts.hair.tail[a][1],direction,0)
                    layer.push()
                    layer.translate(lsin(data.spin.tail+direction)*data.parts.hair.tailKey[a][0]+lsin(data.spin.tail+direction+a*150)*0.5,-5+data.parts.hair.tailKey[a][1])
                    layer.rotate(lsin(data.spin.tail+direction)*data.parts.hair.tailKey[a][2])
                    parent.displayTrianglesFrontMerge(layer,data.parts.hair.tail[a][0],direction,5,3,1,0.4,
                        upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),lcos(direction+data.spin.tail)*20,[1,1,1]),
                        upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),lcos(direction+data.spin.tail)*20,[1,1,1]),1)
                    parent.displayTrianglesFrontMerge(layer,data.parts.hair.tail[a][1],direction,5,3,1,-0.4,
                        upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),lcos(direction+data.spin.tail)*20,[1,1,1]),
                        upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),lcos(direction+data.spin.tail)*20,[1,1,1]),1)
                    layer.pop()
                }
                return layer
        }
    },function(parent){
        let data={
            sprites:{
                detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                hair:{back:[],front:[],tail:[]},
            },parts:{
                hair:{
                    main:[
                        {spin:[-6,6,0],height:3},
                        {spin:[-9,0,-4.5],height:2.5},
                        {spin:[-0,9,4.5],height:2.5},
                        {spin:[-15,-3,-10.5],height:1},
                        {spin:[3,15,10.5],height:1},
                        {spin:[-30,-12,-24],height:1.5},
                        {spin:[12,30,24],height:1.5},
                        {spin:[-60,-24,-42],height:5},
                        {spin:[24,60,42],height:5},
                        {spin:[-84,-42,-66],height:9},
                        {spin:[42,84,66],height:9},
                        {spin:[-108,-66,-90],height:11},
                        {spin:[66,108,90],height:11},
                        {spin:[-138,-90,-114],height:12},
                        {spin:[90,138,114],height:12},
                        {spin:[-162,-114,-138],height:12.5},
                        {spin:[114,162,138],height:12.5},
                        {spin:[174,-138,-162],height:13},
                        {spin:[138,-174,162],height:13},
                        {spin:[153,-153,180],height:13.5},
                        {spin:[-93,-69,-84],height:15},
                        {spin:[69,93,84],height:15},
                        {spin:[-123,-99,-114],height:17.5},
                        {spin:[99,123,114],height:17.5},
                    ],inside:[
                        {spin:[-27,-15,-15],height:0.5},
                        {spin:[15,27,15],height:0.5},
                        {spin:[-42,-18,-30],height:2.5},
                        {spin:[18,42,30],height:2.5},
                        {spin:[-66,-42,-54],height:7},
                        {spin:[42,66,54],height:7},
                        {spin:[-90,-66,-78],height:10},
                        {spin:[66,90,78],height:10},
                        {spin:[-114,-90,-102],height:11.25},
                        {spin:[90,114,102],height:11.25},
                        {spin:[-138,-114,-126],height:12.125},
                        {spin:[114,138,126],height:12.125},
                        {spin:[-162,-138,-150],height:12.625},
                        {spin:[138,162,150],height:12.625},
                        {spin:[174,-162,-174],height:13.125},
                        {spin:[162,-174,174],height:13.125},
                        {spin:[-108,-84,-99],height:15.5},
                        {spin:[84,108,99],height:15.5},
                    ],tailKey:[
                        [-3,-3,-18],
                        [-0.5,2,-9],
                        [0,7,0],
                        [-0.25,12,6],
                        [-0.75,17,9],
                    ],tail:[],
                }
            },color:{
                hair:{
                    back:[185,191,104],front:[211,216,127],insideBack:[117,123,90],insideFront:[154,155,98],glow:[228,239,181],
                    bow:[[234,200,116],[203,130,68]],tail:{start:[203,210,116],end:[221,233,138]}
                },
                skin:{head:[250,235,193],body:[250,228,186],legs:[247,241,189],arms:[249,236,192]},
                eye:{back:[45,74,118],front:[47,53,77],glow:[176,188,183]},
                mouth:{in:[235,168,126],out:[0,0,0]},
                blush:[232,157,122],
                dress:{under:[254,249,226],over:[88,127,166],stripe:[243,238,230],tie:[238,233,143]},
                wing:{back:[250,237,214],front:[86,53,57]},
            },
            spin:{tail:93}
        }
        for(let a=0,la=5;a<la;a++){
            data.parts.hair.tail.push([[],[]])
            for(let b=0,lb=6;b<lb;b++){
                data.parts.hair.tail[a][0].push({spin:[a*30+b*60-30,a*30+b*60+30,a*30+b*60],y:[0,0,-3.6]})
                data.parts.hair.tail[a][1].push({spin:[a*30+b*60-30,a*30+b*60+30,a*30+b*60],y:[0,0,3.6]})
            }
        }
        for(let a=0,la=data.sprites.genAmount;a<la;a++){
            data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
            data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
            data.sprites.hair.tail.push(this.generateSprite(parent,2,360*a/la,data))
        }
        return data
    },function(){
        let colorBase=this.graphicManager.getData(this.name).color
        this.components=this.standardModel(
            0,
            15,[{x:-2.5,y:-31,z:0},{x:2.5,y:-31,z:0}],[{x:-3,y:-51,z:0},{x:3,y:-51,z:0}],
            [-44,-72,-64.5,-67.5,-67.5,-64.75,-64.75],[[9,28],[30,30]],{x:8,y:4,open:0,wide:36},[18,18,21,21]
        )
        this.components.dress={
            display:{main:true,sleeve:[true,true]},
            fade:{main:1,sleeve:[1,1]},
            color:colorBase.dress,
            anim:{wide:1,lift:0},
            tie:{display:true,fade:1,color:colorBase.dress.tie,spin:0}
        }
        this.components.hair.tail={display:true,fade:1,spin:93}
        this.components.hair.bow={display:true,fade:1,color:colorBase.hair.bow,spin:93,level:-76}
        this.components.wing={
            display:true,fade:1,
            color:colorBase.wing,
            anim:{size:1,lift:0}
        }
        this.routines.calculatePart=[0,1,2,3]
    },function(){
        if(this.components.wing.display&&lcos(this.direction.main)>=0.1){
            let part=this.components.wing
            this.layer.push()
            this.layer.translate(-6*lsin(this.direction.main),part.anim.lift)
            this.layer.scale(part.anim.size)
            for(let a=0,la=2;a<la;a++){
                let mult=lcos(this.direction.main)*(lcos(this.time*2)*0.15+0.7+lcos(this.direction.main-60+a*120)*0.3)
                this.layer.noStroke()
                this.layer.fill(...this.flashColor(part.color.back),this.fade.main*part.fade)
                this.layer.beginShape()
                this.layer.vertex(0,-37)
                this.layer.vertex(-10*mult,-37)
                this.layer.bezierVertex(-15*mult,-42,-12*mult,-54,-28*mult,-54)
                this.layer.vertex(-30*mult,-54)
                this.layer.bezierVertex(-25*mult,-50,-25*mult,-34,-15*mult,-34)
                this.layer.vertex(0,-34)
                this.layer.endShape()
                this.layer.noFill()
                this.layer.stroke(...this.flashColor(part.color.front),this.fade.main*part.fade)
                this.layer.strokeWeight(1)
                this.layer.beginShape()
                this.layer.vertex(0,-37)
                this.layer.vertex(-10*mult,-37)
                this.layer.bezierVertex(-15*mult,-42,-12*mult,-54,-28*mult,-54)
                this.layer.vertex(-29.5*mult,-54)
                this.layer.endShape()
                this.layer.strokeWeight(0.75)
                this.layer.beginShape()
                this.layer.vertex(0*mult,-37)
                this.layer.vertex(-10*mult,-37)
                this.layer.bezierVertex(-16*mult,-40,-15*mult,-48,-19*mult,-48)
                this.layer.endShape()
                this.layer.scale(-1,1)
            }
            this.layer.pop()
        }
        if(this.components.hair.tail&&lcos(this.components.hair.tail.spin+this.direction.main)<=0){
            let dir=this.components.hair.tail.spin+this.direction.main
            this.layer.push()
            this.layer.translate(lsin(dir)*18,-64)
            this.layer.rotate(lsin(dir)*-1.5)
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.tail[this.sprites.spinDetail],0,5*this.fade.main*this.components.hair.tail.fade,20*this.fade.main*this.components.hair.tail.fade,40*this.fade.main*this.components.hair.tail.fade)
            this.layer.pop()
        }
        if(this.components.hair.bow.display&&lcos(this.direction.main+this.components.hair.bow.spin)<=0){
            let part=this.components.hair.bow
            this.layer.push()
            this.layer.translate(lsin(this.direction.main+part.spin)*17,part.level)
            this.layer.scale(constrain(lcos(this.direction.main+part.spin)*-1.5,0,1)*0.1875,0.1875)
            this.layer.rotate(-155)
            for(let a=0,la=16;a<la;a++){
                this.layer.fill(...mergeColor(...part.color,abs(8-a)/8))
                this.layer.rotate(-10)
                this.layer.quad(0,0,-48+a/la*24,-24+a/la*24,-39+a/la*12,0,-48+a/la*24,24-a/la*24)
                this.layer.rotate(20)
                this.layer.quad(0,0,48-a/la*24,-24+a/la*24,39-a/la*12,0,48-a/la*24,24-a/la*24)
                this.layer.rotate(50)
                this.layer.quad(0,0,-48+a/la*24,-9+a/la*9,-42+a/la*12,0,-48+a/la*24,9-a/la*9)
                this.layer.rotate(-120)
                this.layer.quad(0,0,48-a/la*24,-9+a/la*9,42-a/la*12,0,48-a/la*24,9-a/la*9)
                this.layer.rotate(60)
            }
            this.layer.pop()
        }
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
            if(this.components.legs[key].display){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
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
            this.layer.fill(...this.flashColor(part.color.under),this.fade.main*part.fade.main)
            this.layer.arc(0,-49,9.5+2.5*abs(lcos(this.direction.main)),11,-180,0)
            this.layer.fill(...this.flashColor(part.color.stripe),this.fade.main*part.fade.main)
            for(let a=0,la=11;a<la;a++){
                if(lcos(a/la*360+this.direction.main)>0){
                    this.layer.arc(10.6*lsin((a+0.5)/la*360+this.direction.main)*part.anim.wide,-24.25+lcos((a+0.5)/la*360+this.direction.main)*1.5-part.anim.lift,6*lcos((a+0.5)/la*360+this.direction.main)*part.anim.wide,2.4,-15,195)
                }
            }
            this.layer.fill(...this.flashColor(part.color.over),this.fade.main*part.fade.main)
            this.layer.quad(-5,-49,5,-49,6,-35,-6,-35)
            this.layer.quad(-6,-36,6,-36,11*part.anim.wide,-24-part.anim.lift,-11*part.anim.wide,-24-part.anim.lift)
            this.layer.arc(0,-24-part.anim.lift,22*part.anim.wide,3,0,180)
            for(let a=0,la=4;a<la;a++){
                let dir=[-153,-27,27,153][a]
                if(lcos(this.direction.main+dir)>0){
                    this.layer.quad(
                        lsin(this.direction.main+dir)*5-(lcos(this.direction.main+dir)*0.8+0.2)*0.9,-48.5,
                        lsin(this.direction.main+dir)*5+(lcos(this.direction.main+dir)*0.8+0.2)*0.9,-48.5,
                        lsin(this.direction.main+dir)*3+(lcos(this.direction.main+dir)*0.8+0.2)*0.6,-54.5,
                        lsin(this.direction.main+dir)*3-(lcos(this.direction.main+dir)*0.8+0.2)*0.6,-54.5)
                }
            }
            for(let a=0,la=11;a<la;a++){
                if(lcos(a/la*360+this.direction.main)>0){
                    this.layer.arc(10.6*lsin(a/la*360+this.direction.main)*part.anim.wide,-24.25+lcos(a/la*360+this.direction.main)*1.5-part.anim.lift,6*lcos(a/la*360+this.direction.main)*part.anim.wide,2,-15,195)
                }
            }
            this.layer.fill(...this.flashColor(part.color.stripe),this.fade.main*part.fade.main)
            this.layer.beginShape()
            this.layer.vertex(-1-9.5*part.anim.wide,-25.2-part.anim.lift)
            this.layer.vertex(-1-9.7*part.anim.wide,-24.72-part.anim.lift)
            this.layer.bezierVertex(-7*part.anim.wide,-23.62-part.anim.lift,7*part.anim.wide,-23.62-part.anim.lift,1+9.7*part.anim.wide,-24.72-part.anim.lift)
            this.layer.vertex(1+9.5*part.anim.wide,-25.2-part.anim.lift)
            this.layer.bezierVertex(7*part.anim.wide,-24.1-part.anim.lift,-7*part.anim.wide,-24.1-part.anim.lift,-1-9.5*part.anim.wide,-25.2-part.anim.lift)
            this.layer.endShape()

            if(lcos(this.direction.main)>0.1){
                this.layer.fill(...this.flashColor(part.color.tie),this.fade.main*part.fade.main)
                regPoly(this.layer,lsin(this.direction.main)*4,-53,6,1.5*lcos(this.direction.main),1.5,0)
                pentagon(this.layer,
                    lsin(this.direction.main)*4-lcos(this.direction.main)*0.5,-53,
                    lsin(this.direction.main)*4+lcos(this.direction.main)*0.5,-53,
                    lsin(this.direction.main)*5.2+lcos(this.direction.main)*1.2,-47,
                    lsin(this.direction.main)*5.4,-46,
                    lsin(this.direction.main)*5.2-lcos(this.direction.main)*1.2,-47
                )
            }
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
            }else if(part.display&&part.appear.bottom.z>2){
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
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
                this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade*0.15)
                if(lcos(part.spin+this.direction.main)>0){
                    this.layer.push()
                    this.layer.translate(13.5*lsin(part.spin+this.direction.main),part.level)
                    this.layer.rotate(30*lsin(part.spin+this.direction.main))
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
            this.layer.stroke(...this.components.hair.color.glow,this.fade.main*0.25*this.components.hair.fade.glow)
            for(let a=0,la=6;a<la;a++){
                this.layer.strokeWeight((3-a/2))
                this.layer.arc(0,this.components.head.level,this.components.head.dimensions[0]+a,this.components.head.dimensions[1]+a,-72+a*6,-12-a*6)
            }
        }
        if(this.components.hair.bow.display&&lcos(this.direction.main+this.components.hair.bow.spin)>0){
            let part=this.components.hair.bow
            this.layer.push()
            this.layer.translate(lsin(this.direction.main+part.spin)*17,part.level)
            this.layer.scale(constrain(lcos(this.direction.main+part.spin)*1.5,0,1)*0.1875,0.1875)
            this.layer.rotate(-155)
            for(let a=0,la=16;a<la;a++){
                this.layer.fill(...mergeColor(...part.color,abs(8-a)/8))
                this.layer.rotate(-10)
                this.layer.quad(0,0,-48+a/la*24,-24+a/la*24,-39+a/la*12,0,-48+a/la*24,24-a/la*24)
                this.layer.rotate(20)
                this.layer.quad(0,0,48-a/la*24,-24+a/la*24,39-a/la*12,0,48-a/la*24,24-a/la*24)
                this.layer.rotate(50)
                this.layer.quad(0,0,-48+a/la*24,-9+a/la*9,-42+a/la*12,0,-48+a/la*24,9-a/la*9)
                this.layer.rotate(-120)
                this.layer.quad(0,0,48-a/la*24,-9+a/la*9,42-a/la*12,0,48-a/la*24,9-a/la*9)
                this.layer.rotate(60)
            }
            this.layer.pop()
        }
        if(this.components.hair.tail&&lcos(this.components.hair.tail.spin+this.direction.main)>0){
            let dir=this.components.hair.tail.spin+this.direction.main
            this.layer.push()
            this.layer.translate(lsin(dir)*18,-64)
            this.layer.rotate(lsin(dir)*-1.5)
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.tail[this.sprites.spinDetail],0,5*this.fade.main*this.components.hair.tail.fade,20*this.fade.main*this.components.hair.tail.fade,40*this.fade.main*this.components.hair.tail.fade)
            this.layer.pop()
        }
        if(this.components.wing.display&&lcos(this.direction.main)<0.1){
            let part=this.components.wing
            this.layer.push()
            this.layer.translate(-6*lsin(this.direction.main),part.anim.lift)
            this.layer.scale(part.anim.size)
            for(let a=0,la=2;a<la;a++){
                let mult=lcos(this.direction.main)*(lcos(this.time*2)*0.15+0.7+lcos(this.direction.main-60+a*120)*0.3)
                this.layer.noStroke()
                this.layer.fill(...this.flashColor(part.color.back),this.fade.main*part.fade)
                this.layer.beginShape()
                this.layer.vertex(0,-37)
                this.layer.vertex(-10*mult,-37)
                this.layer.bezierVertex(-15*mult,-42,-12*mult,-54,-28*mult,-54)
                this.layer.vertex(-30*mult,-54)
                this.layer.bezierVertex(-25*mult,-50,-25*mult,-34,-15*mult,-34)
                this.layer.vertex(0,-34)
                this.layer.endShape()
                this.layer.noFill()
                this.layer.stroke(...this.flashColor(part.color.front),this.fade.main*part.fade)
                this.layer.strokeWeight(1)
                this.layer.beginShape()
                this.layer.vertex(0,-37)
                this.layer.vertex(-10*mult,-37)
                this.layer.bezierVertex(-15*mult,-42,-12*mult,-54,-28*mult,-54)
                this.layer.vertex(-29.5*mult,-54)
                this.layer.endShape()
                this.layer.strokeWeight(0.75)
                this.layer.beginShape()
                this.layer.vertex(0*mult,-37)
                this.layer.vertex(-10*mult,-37)
                this.layer.bezierVertex(-16*mult,-40,-15*mult,-48,-19*mult,-48)
                this.layer.endShape()
                this.layer.scale(-1,1)
            }
            this.layer.pop()
        }
    },function(type,args){
        let dir
        let sc
        let loc=[]
        switch(type){
            case 0:
                loc=[
                    this.components.arms[args[0]].appear.top,
                    this.components.arms[args[0]].appear.middle,
                    this.components.arms[args[0]].appear.bottom
                ]
                dir=atan2(loc[0].x-loc[1].x,loc[0].y-loc[1].y)
                sc=[lsin(dir+90),lcos(dir+90)]

                this.layer.noStroke()
                this.layer.fill(...this.flashColor(this.components.dress.color.under),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.beginShape()
                this.layer.vertex(
                    loc[1].x*0.5+loc[0].x*0.5-3.9*sc[0],
                    loc[1].y*0.5+loc[0].y*0.5-3.9*sc[1])
                this.layer.vertex(
                    loc[1].x*0.575+loc[0].x*0.425-2.7*sc[0],
                    loc[1].y*0.575+loc[0].y*0.425-2.7*sc[1])
                this.layer.vertex(
                    loc[1].x*0.65+loc[0].x*0.35-2.8*sc[0],
                    loc[1].y*0.65+loc[0].y*0.35-2.8*sc[1])
                this.layer.vertex(
                    loc[1].x*0.65+loc[0].x*0.35+2.8*sc[0],
                    loc[1].y*0.65+loc[0].y*0.35+2.8*sc[1])
                this.layer.vertex(
                    loc[1].x*0.575+loc[0].x*0.425+2.7*sc[0],
                    loc[1].y*0.575+loc[0].y*0.425+2.7*sc[1])
                this.layer.vertex(
                    loc[1].x*0.5+loc[0].x*0.5+3.9*sc[0],
                    loc[1].y*0.5+loc[0].y*0.5+3.9*sc[1])
                this.layer.vertex(
                    loc[0].x+2*sc[0],
                    loc[0].y+2*sc[1])
                this.layer.vertex(
                    loc[0].x-2*sc[0],
                    loc[0].y-2*sc[1])
                this.layer.endShape()
                this.layer.ellipse(loc[0].x,loc[0].y,4)
            break
        }
    },
))