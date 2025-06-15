this.packages.push(new graphicsPackage(
    [`Sagume`],
    function(parent,type,direction,data){
        let layer
        let overlayer
        switch(type){
            case 0:
                layer=parent.subSprite(250,300,125,100)
                overlayer=parent.subSprite(250,300,125,100)
                parent.controlSpin(data.parts.hair.inside,direction,0)
                parent.controlSpin(data.parts.hair.main,direction,0)
                parent.controlSpin(data.parts.hair.reverse,direction,0)
                parent.displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,33.5,1,-0.025,data.color.hair.insideFront,data.color.hair.insideFront,1)
                overlayer.fill(...data.color.hair.front)
                overlayer.stroke(...data.color.hair.front)
                overlayer.strokeWeight(1)
                overlayer.arc(0,0,34,34,-180,0)
                overlayer.line(-17.5,0,17.5,0)
                parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.reverse,direction,0.5,33.5,0.2,0.15,-1,-1,1)
                overlayer.noErase()
                parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.main,direction,0,34,1,-0.025,data.color.hair.front,data.color.hair.front,1)
                layer.image(overlayer,0,10,50,60)
                layer.erase()
                layer.noFill()
                layer.stroke(0)
                layer.strokeWeight(3)
                layer.arc(0,0,38,38,-180,0)
                layer.line(-19,0,-19,10)
                layer.line(19,0,19,10)

                return layer
            case 1:
                layer=parent.subSprite(250,300,125,100)
                parent.displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,34,1,-0.025,data.color.hair.back,data.color.hair.back,1)
                parent.displayTrianglesBackMerge(layer,data.parts.hair.inside,direction,0,33.5,1,-0.025,data.color.hair.insideBack,data.color.hair.insideBack,1)
                layer.erase()
                layer.noFill()
                layer.stroke(0)
                layer.strokeWeight(3)
                layer.arc(0,0,38,38,-180,0)
                layer.line(-19,0,-19,10)
                layer.line(19,0,19,10)
                return layer
            case 2:
                layer=parent.subSprite(100,250,50,125)
                layer.fill(...data.color.jacket.main)
                layer.arc(0,0,13.5,52,-180,0)
                layer.quad(-6.75,0,6.75,0,7.25,4,-7.25,4)
                layer.arc(0,4,14.5,2,0,180)
                layer.erase()
                layer.noFill()
                layer.stroke(0)
                layer.strokeWeight(3)
                for(let a=0,la=3;a<la;a++){
                    let spin=[-20,0,20][a]
                    if(lcos(direction+spin)>0){
                        if(lsin(direction+spin)>0){
                            layer.arc(0,5,14.5*lsin(direction+spin),58,-90,0)
                        }else if(lsin(direction+spin)<0){
                            layer.arc(0,5,14.5*lsin(direction+spin),58,-180,-90)
                        }else{
                            layer.line(0,5,0,-24)
                        }
                    }
                }
                layer.fill(0)
                layer.noStroke()
                layer.ellipse(0,-24,12,5)
                overlayer=parent.subSprite(100,250,50,125)
                overlayer.fill(...data.color.jacket.detail)
                for(let a=0,la=18;a<la;a++){
                    let ls=lsin((a+0.5)/la*360+direction)
                    let lc=lcos((a+0.5)/la*360+direction)
                    if(a>=2&&a<16&&lc>0){
                        overlayer.rect(7.25*ls,2.5+lc,lc*0.4,2)
                        overlayer.triangle(7.25*ls-lc*0.2,2.25+lc,7.25*ls-lc*0.2,0.25+lc,7.25*ls+lc*0.6,2.25+lc)
                    }
                }
                overlayer.noFill()
                overlayer.stroke(...data.color.jacket.detail)
                overlayer.strokeWeight(0.4)
                overlayer.arc(0,3.5,14.5,2,0,180)
                overlayer.strokeWeight(4.4)
                for(let a=0,la=2;a<la;a++){
                    let spin=[-20,20][a]
                    if(lcos(direction+spin)>0&&abs(14.5*lsin(direction+spin*2))<12){
                        if(lsin(direction+spin)>0){
                            overlayer.arc(0,5,14.5*lsin(direction+spin),58,-90,0)
                        }else if(lsin(direction+spin)<0){
                            overlayer.arc(0,5,14.5*lsin(direction+spin),58,-180,-90)
                        }else{
                            overlayer.line(0,5,0,-23.5)
                        }
                    }
                }
                overlayer.erase()
                overlayer.stroke(0)
                overlayer.strokeWeight(3.6)
                for(let a=0,la=3;a<la;a++){
                    let spin=[-20,0,20][a]
                    if(lcos(direction+spin)>0){
                        if(lsin(direction+spin)>0){
                            overlayer.arc(0,5,14.5*lsin(direction+spin),58,-90,0)
                            overlayer.line(7.25*lsin(direction+spin),5,7.25*lsin(direction+spin),8)
                        }else if(lsin(direction+spin)<0){
                            overlayer.arc(0,5,14.5*lsin(direction+spin),58,-180,-90)
                            overlayer.line(7.25*lsin(direction+spin),5,7.25*lsin(direction+spin),8)
                        }else{
                            overlayer.line(0,8,0,-23.5)
                        }
                    }
                }
                overlayer.strokeCap(SQUARE)
                overlayer.arc(0,0,17.1,55.6,-180,0)
                overlayer.line(-8.7,0,-9.1,4)
                overlayer.line(8.7,0,9.1,4)
                overlayer.strokeCap(ROUND)
                overlayer.strokeWeight(20)
                overlayer.arc(0,3.5,48,22.4,0,180)
                overlayer.fill(0)
                overlayer.noStroke()
                overlayer.ellipse(0,-24,12,5)
                layer.image(overlayer,0,0,20,50)
                return layer
            case 3:
                layer=parent.subSprite(400,300,350,250)
                layer.stroke(...data.color.wing[1])
                layer.strokeWeight(0.5)
                let nodes=[[0,0],[-20,-5],[-35,-15],[-40,-30]]
                let lengths=[]
                let totalLength=0
                for(let a=0,la=nodes.length-1;a<la;a++){
                    layer.line(nodes[a][0],nodes[a][1],nodes[a+1][0],nodes[a+1][1])
                    lengths.push(dist(nodes[a][0],nodes[a][1],nodes[a+1][0],nodes[a+1][1]))
                    totalLength+=dist(nodes[a][0],nodes[a][1],nodes[a+1][0],nodes[a+1][1])
                }
                for(let a=0,la=nodes.length-1;a<la;a++){
                    for(let b=0,lb=round(lengths[a]*2);b<lb;b++){
                        layer.stroke(...mergeColor(data.color.wing[0],data.color.wing[1],random(0.5,1)))
                        let rand=random(0.2,0.8)
                        layer.strokeWeight(random(0.8,1.2))
                        layer.point(
                            map((b+rand)/lb,0,1,nodes[a][0],nodes[a+1][0]),
                            map((b+rand)/lb,0,1,nodes[a][1],nodes[a+1][1])
                        )
                    }
                }
                layer.strokeWeight(0.6)
                layer.noStroke()
                for(let a=0,la=600;a<la;a++){
                    let part=0
                    let prePosition=a*2%totalLength
                    let position=prePosition
                    while(position>lengths[part]){
                        position-=lengths[part]
                        part++
                    }
                    let dir=map(
                        position/lengths[part]*(part==lengths.length-1?1.8:1),0,1,
                        part==0?-75:atan2(nodes[part][0]-nodes[part-1][0],nodes[part][1]-nodes[part-1][1]),
                        atan2(nodes[part+1][0]-nodes[part][0],nodes[part+1][1]-nodes[part][1])
                    )
                    let size=random(0.4,0.8)+(prePosition/totalLength)**2.5*2
                    let offset=random(4,6)-a/la*4
                    layer.fill(...mergeColor(data.color.wing[0],data.color.wing[1],random(0,0.2)+a/la*0.8))
                    layer.push()
                    layer.translate(
                        map(position,0,lengths[part],nodes[part][0],nodes[part+1][0]),
                        map(position,0,lengths[part],nodes[part][1],nodes[part+1][1])
                    )
                    layer.rotate(-dir-90)
                    layer.beginShape()
                    layer.vertex(-0.2,-0.25+offset*0.1)
                    layer.bezierVertex(
                        -1.2*(0.5+size*0.5),(4+offset)*size,
                        -0.6*(0.5+size*0.5),(5+offset)*size,
                        0,(6+offset)*size,
                    )
                    layer.bezierVertex(
                        0.6*(0.5+size*0.5),(5+offset)*size,
                        1.2*(0.5+size*0.5),(4+offset)*size,
                        0.2,-0.25+offset*0.1
                    )
                    layer.endShape()
                    layer.pop()
                }
                return layer
        }
    },function(parent){
        let data={
            sprites:{
                detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                hair:{back:[],front:[]},jacket:[],wing:-1,
            },parts:{
                jacket:[],
                hair:{
                    main:[
                        {spin:[-14,-6,-10],y:[-6,-6,-2]},
                        {spin:[-6,2,-2],y:[-6,-6,-2]},
                        {spin:[-10,-2,-6],y:[-2,-2,-6]},
                        {spin:[-10,-2,-1],y:[-2,-2,2]},
                        {spin:[4,8,6],y:[-6,-6,-3]},
                        {spin:[8,12,10],y:[-6,-6,-3]},
                        {spin:[6,10,8],y:[-3,-3,-6]},
                        {spin:[6,10,5],y:[-3,-3,0]},
                        {spin:[-39,-27,-36],y:[-5,-5,1]},
                        {spin:[30,39,33],y:[-5,-5,1]},
                        {spin:[-72,-48,-63],y:[-2,-2,8]},
                        {spin:[-96,-69,-87],y:[0,0,11]},
                        {spin:[-111,-93,-105],y:[0,0,12.5]},
                        {spin:[-126,-93,-117],y:[0,0,13]},
                        {spin:[-156,-120,-132],y:[0,0,15]},
                        {spin:[-165,-144,-159],y:[0,0,14.5]},
                        {spin:[-186,-147,-171],y:[0,0,16]},
                        {spin:[48,72,57],y:[-2,-2,8]},
                        {spin:[69,96,78],y:[0,0,10]},
                        {spin:[96,108,99],y:[0,0,9.5]},
                        {spin:[93,126,117],y:[0,0,12]},
                        {spin:[120,156,129],y:[0,0,14.5]},
                        {spin:[147,186,165],y:[0,0,15.5]},
                    ],inside:[
                        {spin:[-2,2,1],y:[-6,-6,-1]},
                        {spin:[-13.5,-7.5,-15],y:[-6,-6,-1]},
                        {spin:[7.5,10.5,13.5],y:[-6,-6,-1.5]},
                        {spin:[-57,-48,-49.5],y:[-5,-5,4]},
                        {spin:[-78,-60,-72],y:[-2,-2,6.5]},
                        {spin:[-102,-90,-99],y:[0,0,9]},
                        {spin:[-136,-109,-124],y:[0,0,11]},
                        {spin:[-162,-138,-147],y:[0,0,12.5]},
                        {spin:[-192,-176,-183],y:[0,0,13.5]},
                        {spin:[27,33,30],y:[-5,-5,1.5]},
                        {spin:[42,51,45],y:[-5,-5,3]},
                        {spin:[63,72,69],y:[-2,-2,5]},
                        {spin:[87,93,90],y:[0,0,10.5]},
                        {spin:[144,159,150],y:[0,0,13]},
                    ],reverse:[
                        {spin:[-27,12,-8],y:[0,0,-5]},
                        {spin:[-12,27,8],y:[0,0,-6]},
                        {spin:[-48,-30,-36],y:[0,0,-3]},
                        {spin:[27,51,39],y:[0,0,-4]},
                    ]
                }
            },color:{
                hair:{back:[168,146,158],front:[229,229,227],insideBack:[121,104,122],insideFront:[208,188,190],glow:[255,249,233],braid:[206,198,211]},
                skin:{head:[228,199,185],body:[229,199,188],legs:[238,214,186],arms:[245,233,217],button:[162,112,115]},
                eye:{back:[139,40,119],front:[28,6,24],glow:[237,119,141]},
                mouth:{in:[191,125,127],out:[0,0,0]},
                blush:[253,241,214],
                dress:{main:[99,56,99],back:[43,29,64],highlight:[68,32,68],sleeve:[71,42,96],detail:[243,237,239],bow:{out:[130,19,51],center:[[109,100,127],[112,62,65],[41,7,40]]}},
                jacket:{main:[245,221,196],back:[118,90,113],sleeve:[234,210,174],detail:[61,45,92]},
                wing:[[103,100,181],[231,225,227]],
            },
        }
        for(let a=0,la=data.sprites.genAmount;a<la;a++){
            data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
            data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
            data.sprites.jacket.push(this.generateSprite(parent,2,360*a/la,data))
        }
        data.sprites.wing=this.generateSprite(parent,3,0,data)
        return data
    },function(){
        let colorBase=this.graphicManager.getData(this.name).color
        this.components=this.standardModel(
            0,
            16.75,[{x:-3,y:-33.5,z:0},{x:3,y:-33.5,z:0}],[{x:-3.5,y:-59,z:0},{x:3.5,y:-59,z:0}],
            [-48.25,-79.5,-73,-77,-77,-73,-73],[[11.5,34],[30,30]],{x:8,y:5,open:0,wide:39},[18,18,30,30]
        )
        this.components.dress={
            display:{main:true,sleeve:[true,true]},
            fade:{main:1,sleeve:[1,1]},
            color:colorBase.dress,
            parts:[],
            bow:{display:true,fade:1,color:colorBase.dress.bow,spin:0}
        }
        this.components.jacket={
            display:{main:true,sleeve:[true,true]},
            fade:{main:1,sleeve:[1,1]},
            color:colorBase.jacket
        }
        this.components.wing={display:true,fade:1}
        this.components.hair.braid={display:true,fade:1,color:colorBase.hair.braid,parts:[],level:[-80.5,-78]}
        for(let a=0,la=13;a<la;a++){
            this.components.dress.parts.push({spin:[-180+a/la*360,-120+a/la*360,-150+a/la*360],y:[0,0,20]})
            this.components.dress.parts.push({spin:[-153+a/la*360,-138+a/la*360,-150+a/la*360],y:[16,16,20]})
        }
        for(let a=0,la=26;a<la;a++){
            let spin=180+a*10-la*5+5+(a<la/2?-1:1)
            this.components.hair.braid.parts.push({spin:spin>180?spin-360:spin,rotate:a<la/2?random(-30,-20):random(20,30),size:random(1.2,1.5),down:-1.2*lcos(spin)})
        }
        this.routines.calculatePart=[0,1,2,3]
    },function(){
        if(this.components.wing.display){
            this.layer.push()
            this.layer.scale(lcos(this.direction.main)*(0.9+0.1*lsin(this.time*4)),1)
            this.layer.image(this.graphicManager.getData(this.name).sprites.wing,-30*this.fade.main,-56-20*this.fade.main,80*this.fade.main,60*this.fade.main)
            this.layer.pop()
        }
        if(this.components.hair.display.back){
            let size=this.fade.main*this.components.hair.fade.back
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.back[this.sprites.spinDetail],0,this.components.head.level+10*size,50*size,60*size)
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
        if(this.components.dress.bow.display&&lcos(this.components.dress.bow.spin+this.direction.main)<=0){
            let part=this.components.dress.bow
            this.layer.push()
            this.layer.translate(lsin(this.direction.main+part.spin)*4,-61)
            this.layer.rotate(-10*lsin(this.direction.main+part.spin))
            this.layer.scale(lcos(this.direction.main+part.spin),1)
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color.out),this.fade.main*part.fade)
            
            this.layer.beginShape()
            this.layer.vertex(-3,-2.4)
            this.layer.bezierVertex(1,-1.2,1,1.2,-3,2.4)
            this.layer.endShape()
            
            this.layer.beginShape()
            this.layer.vertex(3,-2.4)
            this.layer.bezierVertex(-1,-1.2,-1,1.2,3,2.4)
            this.layer.endShape()

            this.layer.ellipse(-3,-1.2,1,2.4)
            this.layer.ellipse(-3,1.2,1,2.4)
            this.layer.ellipse(3,-1.2,1,2.4)
            this.layer.ellipse(3,1.2,1,2.4)
            this.layer.fill(...this.flashColor(part.color.center[0]),this.fade.main*part.fade)
            this.layer.ellipse(0,0,2)
            this.layer.fill(...this.flashColor(part.color.center[1]),this.fade.main*part.fade)
            this.layer.ellipse(0,0,1.5)
            for(let a=0,la=3;a<la;a++){
                this.layer.fill(...this.flashColor(mergeColor(part.color.center[1],part.color.center[2],0.3*(a+1))),this.fade.main*part.fade)
                this.layer.ellipse(-0.08*(a+1),0.08*(a+1),1.5-a*0.3)
            }
            this.layer.pop()
        }
        if(this.components.dress.display.mains){
            let part=this.components.dress
            controlSpin(part.parts,this.direction.main,0)
            this.layer.fill(...this.flashColor(part.color.back),this.fade.main*part.fade.main)
            this.graphicManager.displayTrianglesBackMerge(this.layer,part.parts,this.direction.main,-41,12,1,0.2,part.color.back,part.color.back,this.fade.main*part.fade.main)
        }
        if(this.components.jacket.display.main){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.jacket.color.main),this.fade.main*this.components.jacket.fade.main)
            this.layer.arc(0,-41,13,50,-180,0)
            this.layer.quad(-6.5,-41,6.5,-41,7.25,-37,-7.25,-37)
            this.layer.arc(0,-37,14.5,2,0,180)
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
            this.layer.fill(...this.flashColor(part.color.main),this.fade.main*part.fade.main)
            this.layer.arc(0,-41,13,52,-180,0)
            this.graphicManager.displayTrianglesFrontMerge(this.layer,part.parts,this.direction.main,-41,12,1,0.2,part.color.main,part.color.main,this.fade.main*part.fade.main)
            this.layer.noFill()
            this.layer.stroke(...this.flashColor(part.color.highlight),this.fade.main*part.fade.main)
            for(let a=0,la=4;a<la;a++){
                let spin=[-13.5,-7.5,7.5,13.5][a]
                if(lcos(this.direction.main+spin)>0){
                    this.layer.strokeWeight(0.2*lcos(this.direction.main+spin))
                    if(lsin(this.direction.main+spin)>0){
                        this.layer.arc(0,-39,abs(13*lsin(this.direction.main+spin)),56,-90,a==0||a==3?(lsin(this.direction.main+spin)<0.05?-85.5:-15/(0.1+lsin(this.direction.main+spin))):0)
                    }else if(lsin(this.direction.main+spin)<0){
                        this.layer.arc(0,-39,abs(13*lsin(this.direction.main+spin)),56,a==0||a==3?(lsin(this.direction.main+spin)<0.05?-94.5:-180+15/(0.1-lsin(this.direction.main+spin))):-180,-90)
                    }else{
                        this.layer.line(0,-39,0,-67)
                    }
                }
            }
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
            this.layer.ellipse(0,-64.5,5.5,2.5)
        }
        if(this.components.jacket.display.main){
            let size=this.fade.main*this.components.jacket.fade.main
            this.layer.image(this.graphicManager.getData(this.name).sprites.jacket[this.sprites.spinDetail],0,-41,20*size,50*size)
        }
        if(this.components.dress.bow.display&&lcos(this.components.dress.bow.spin+this.direction.main)>0){
            let part=this.components.dress.bow
            this.layer.push()
            this.layer.translate(lsin(this.direction.main+part.spin)*4,-61)
            this.layer.rotate(-10*lsin(this.direction.main+part.spin))
            this.layer.scale(lcos(this.direction.main+part.spin),1)
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(part.color.out),this.fade.main*part.fade)
            
            this.layer.beginShape()
            this.layer.vertex(-3,-2.4)
            this.layer.bezierVertex(1,-1.2,1,1.2,-3,2.4)
            this.layer.endShape()
            
            this.layer.beginShape()
            this.layer.vertex(3,-2.4)
            this.layer.bezierVertex(-1,-1.2,-1,1.2,3,2.4)
            this.layer.endShape()

            this.layer.ellipse(-3,-1.2,1,2.4)
            this.layer.ellipse(-3,1.2,1,2.4)
            this.layer.ellipse(3,-1.2,1,2.4)
            this.layer.ellipse(3,1.2,1,2.4)
            this.layer.fill(...this.flashColor(part.color.center[0]),this.fade.main*part.fade)
            this.layer.ellipse(0,0,2)
            this.layer.fill(...this.flashColor(part.color.center[1]),this.fade.main*part.fade)
            this.layer.ellipse(0,0,1.5)
            for(let a=0,la=3;a<la;a++){
                this.layer.fill(...this.flashColor(mergeColor(part.color.center[1],part.color.center[2],0.3*(a+1))),this.fade.main*part.fade)
                this.layer.ellipse(-0.08*(a+1),0.08*(a+1),1.5-a*0.3)
            }
            this.layer.pop()
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
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.front[this.sprites.spinDetail],0,this.components.head.level+10*size,50*size,60*size)
        }
        if(this.components.hair.braid.display){
            let part=this.components.hair.braid
            this.layer.noStroke()
            for(let a=0,la=part.parts.length;a<la;a++){
                if(lcos(this.direction.main+part.parts[a].spin)>0){
                    this.layer.fill(...mergeColor(this.components.hair.color.front,part.color,0.5+abs(part.parts[a].spin/180)*0.5),this.fade.main*part.fade)
                    this.layer.push()
                    this.layer.translate(17*lsin(this.direction.main+part.parts[a].spin),part.level[0]-(a*2.1%5)/10+part.parts[a].down)
                    this.layer.rotate(part.parts[a].rotate)
                    this.layer.scale(lcos(this.direction.main+part.parts[a].spin),1)
                    this.layer.ellipse(0,0,3*part.parts[a].size,part.parts[a].size)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(17*lsin(this.direction.main+part.parts[a].spin),part.level[1]-(a*3.7%5)/10+part.parts[a].down)
                    this.layer.rotate(-part.parts[a].rotate)
                    this.layer.scale(lcos(this.direction.main+part.parts[a].spin),1)
                    this.layer.ellipse(0,0,3*part.parts[a].size,part.parts[a].size)
                    this.layer.pop()
                }
            }
        }
        if(this.components.hair.display.glow){
            this.layer.noFill()
            this.layer.stroke(...this.components.hair.color.glow,this.fade.main*0.25*this.components.hair.fade.glow)
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
                dir=[
                    atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y),
                    atan2(loc[0].x-loc[1].x,loc[0].y-loc[1].y)
                ]
                sc=[
                    [lsin(dir[0]+90),lcos(dir[0]+90)],
                    [lsin(dir[1]+90),lcos(dir[1]+90)]
                ]

                this.layer.noStroke()
                this.layer.fill(...this.flashColor(this.components.dress.color.sleeve),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.ellipse(loc[1].x,loc[1].y,4.8)
                this.layer.ellipse(loc[0].x,loc[0].y,4.3)
                this.layer.quad(
                    loc[2].x*0.9+loc[1].x*0.1-2.7*sc[0][0],
                    loc[2].y*0.9+loc[1].y*0.1-2.7*sc[0][1],
                    loc[2].x*0.9+loc[1].x*0.1+2.7*sc[0][0],
                    loc[2].y*0.9+loc[1].y*0.1+2.7*sc[0][1],
                    loc[1].x+2.4*sc[0][0],
                    loc[1].y+2.4*sc[0][1],
                    loc[1].x-2.4*sc[0][0],
                    loc[1].y-2.4*sc[0][1]
                )
                this.layer.quad(
                    loc[1].x-2.4*sc[1][0],
                    loc[1].y-2.4*sc[1][1],
                    loc[1].x+2.4*sc[1][0],
                    loc[1].y+2.4*sc[1][1],
                    loc[0].x+2.15*sc[1][0],
                    loc[0].y+2.15*sc[1][1],
                    loc[0].x-2.15*sc[1][0],
                    loc[0].y-2.15*sc[1][1]
                )

                this.layer.fill(...this.flashColor(this.components.jacket.color.sleeve),this.fade.main*this.components.jacket.fade.sleeve[args[0]])
                this.layer.ellipse(loc[1].x,loc[1].y,5.1)
                this.layer.ellipse(loc[0].x,loc[0].y,4.5)   
                this.layer.quad(
                    loc[2].x*0.75+loc[1].x*0.25-3*sc[0][0],
                    loc[2].y*0.75+loc[1].y*0.25-3*sc[0][1],
                    loc[2].x*0.75+loc[1].x*0.25+3*sc[0][0],
                    loc[2].y*0.75+loc[1].y*0.25+3*sc[0][1],
                    loc[1].x+2.55*sc[0][0],
                    loc[1].y+2.55*sc[0][1],
                    loc[1].x-2.55*sc[0][0],
                    loc[1].y-2.55*sc[0][1]
                )
                this.layer.quad(
                    loc[1].x-2.55*sc[1][0],
                    loc[1].y-2.55*sc[1][1],
                    loc[1].x+2.55*sc[1][0],
                    loc[1].y+2.55*sc[1][1],
                    loc[0].x+2.25*sc[1][0],
                    loc[0].y+2.25*sc[1][1],
                    loc[0].x-2.25*sc[1][0],
                    loc[0].y-2.25*sc[1][1]
                )

                this.layer.noFill()
                this.layer.stroke(...this.flashColor(this.components.dress.color.detail),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.strokeWeight(0.1)
                for(let a=0,la=4;a<la;a++){
                    let size=dist(
                        loc[1].x*0.12+loc[2].x*0.88,
                        loc[1].y*0.12+loc[2].y*0.88,
                        loc[1].x*0.15+loc[2].x*0.85,
                        loc[1].y*0.15+loc[2].y*0.85
                    )
                    this.layer.line(
                        loc[1].x*0.12+loc[2].x*0.88+(-2.7+(a+0.5)/la*5.4)*sc[0][0],
                        loc[1].y*0.12+loc[2].y*0.88+(-2.7+(a+0.5)/la*5.4)*sc[0][1],
                        loc[1].x*0.15+loc[2].x*0.85+(-2.7+a/la*5.4)*sc[0][0],
                        loc[1].y*0.15+loc[2].y*0.85+(-2.7+a/la*5.4)*sc[0][1]
                    )
                    this.layer.line(
                        loc[1].x*0.18+loc[2].x*0.82+(-2.7+(a+0.5)/la*5.4)*sc[0][0],
                        loc[1].y*0.18+loc[2].y*0.82+(-2.7+(a+0.5)/la*5.4)*sc[0][1],
                        loc[1].x*0.15+loc[2].x*0.85+(-2.7+(a+1)/la*5.4)*sc[0][0],
                        loc[1].y*0.15+loc[2].y*0.85+(-2.7+(a+1)/la*5.4)*sc[0][1]
                    )
                    this.layer.arc(
                        loc[1].x*0.135+loc[2].x*0.865+(-2.7+(a+0.5)/la*5.4)*sc[0][0],
                        loc[1].y*0.135+loc[2].y*0.865+(-2.7+(a+0.5)/la*5.4)*sc[0][1],
                        size,size,-dir[0]-90,-dir[0]+90
                    )
                    this.layer.arc(
                        loc[1].x*0.165+loc[2].x*0.835+(-2.7+(a+0.5)/la*5.4)*sc[0][0],
                        loc[1].y*0.165+loc[2].y*0.835+(-2.7+(a+0.5)/la*5.4)*sc[0][1],
                        size,size,-dir[0]+90,-dir[0]+270
                    )
                }
            break
        }
    },
))