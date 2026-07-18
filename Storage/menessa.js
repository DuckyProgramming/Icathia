this.packages.push(new graphicsPackage(
    [`Menessa`],
    function(parent,type,direction,data){
        let layer
        let overlayer
        switch(type){
            case 0:
                layer=parent.subSprite(400,600,200,200)
                overlayer=parent.subSprite(400,600,200,200)
                layer.scale(2)
                overlayer.scale(2)
                parent.controlSpin(data.parts.hair.inside,direction,0)
                parent.controlSpin(data.parts.hair.main,direction,0)
                parent.controlSpin(data.parts.hair.reverseInside,direction,0)
                parent.controlSpin(data.parts.hair.reverse,direction,0)
                parent.displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,34,0.5,0.0225,data.color.hair.insideFront,data.color.hair.insideFront,1)
                layer.arc(0,0,34,33,-180,0)
                layer.line(-17,0,17,0)
                parent.displayTrianglesFrontMerge(layer,data.parts.hair.reverseInside,direction,0.5,33.5,0.1,0.15,-1,-1,1)
                parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.main,direction,0,34,0.5,0.025,data.color.hair.front,data.color.hair.front,1)
                overlayer.arc(0,0,34,33,-180,0)
                overlayer.line(-17,0,17,0)
                parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.reverse,direction,0.5,33.5,0.1,0.15,-1,-1,1)
                layer.image(overlayer,0,10,40,60)
                return layer
            case 1:
                layer=parent.subSprite(400,600,200,200)
                overlayer=parent.subSprite(400,600,200,200)
                layer.scale(2)
                overlayer.scale(2)
                parent.displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,34,0.5,0.025,data.color.hair.back,data.color.hair.back,1)
                layer.arc(0,0,34,33,-180,0)
                layer.line(-17,0,17,0)
                parent.displayTrianglesBackMerge(overlayer,data.parts.hair.inside,direction,0,34,0.5,0.0225,data.color.hair.insideBack,data.color.hair.insideBack,1)
                overlayer.arc(0,0,34,33,-180,0)
                overlayer.line(-17,0,17,0)
                parent.displayTrianglesBackMerge(overlayer,data.parts.hair.reverseInside,direction,0.5,33.5,0.1,0.15,-1,-1,1)
                layer.image(overlayer,0,10,40,60)
                return layer
            case 2:
                layer=parent.subSprite(300,300,150,0)
                layer.scale(2)
                parent.controlSpin(data.parts.dress,direction,1)
                parent.displayTrianglesFrontMerge3D(layer,data.parts.dress.inside,direction,18,24.6,0.1,1/3,data.color.dress.main,data.color.dress.main,1,0.4,18)
                layer.erase(0.5)
                layer.rect(0,15,30,30)
                layer.noErase()
                parent.displayTrianglesFrontMerge3D(layer,data.parts.dress.main,direction,18,24.6,0.2,1/3,data.color.dress.main,data.color.dress.main,1,0.4,18)
                layer.quad(-6.3,0,6.3,0,12.3,18,-12.3,18)
                layer.arc(0,18,24.6,7.2,0,180)
                return layer
            case 3:
                layer=parent.subSprite(300,300,150,0)
                layer.scale(2)
                parent.displayTrianglesBackMerge3D(layer,data.parts.dress.inside,direction,18,24.6,0.1,1/3,data.color.dress.back,data.color.dress.back,1,-0.4,18)
                layer.erase(0.5)
                layer.rect(0,15,30,30)
                layer.noErase()
                parent.displayTrianglesBackMerge3D(layer,data.parts.dress.main,direction,18,24.6,0.2,1/3,data.color.dress.back,data.color.dress.back,1,-0.4,18)
                layer.quad(-6.3,0,6.3,0,12.3,18,-12.3,18)
                layer.arc(0,18,24.6,7.2,0,180)
                return layer
        }
    },function(parent){
        let data={
            sprites:{
                detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                hair:{back:[],front:[]},dress:{back:[],front:[]},minor:[],
            },parts:{
                hair:{main:[],inside:[],reverse:[],reverseInside:[]},
                dress:{main:[],inside:[]},
            },color:{
                hair:{back:[143,106,77],front:[209,170,123],insideBack:[156,128,105],insideFront:[192,150,101],glow:[236,203,159],bow:[32,31,32],pin:[255,227,156],},
                skin:{head:[252,231,227],body:[248,208,197],legs:[244,214,207],arms:[255,231,227],button:[227,176,165]},
                eye:{back:[211,108,109],front:[71,0,0],glow:[202,168,193]},
                mouth:{in:[191,125,127],out:[0,0,0]},
                dress:{
                    main:[236,231,233],over:[220,213,212],back:[196,169,171],
                    sleeve:[232,217,217],sleeveOver:[222,207,209],sleeveBack:[187,149,149],
                    bow:[29,29,29],flaps:[62,63,62],button:[235,216,175],buttonGlow:[243,232,216],
                    pocket:[[226,204,201],[213,190,188],[237,214,196]],
                },
                shoe:{main:[32,29,27],over:[15,11,10],inside:[99,87,82],under:[64,57,56],bow:[65,64,63],glow:[131,120,115]},
            },
        }
        for(let a=0,la=20;a<la;a++){
            let zonal=[[random(-180/la,0/la),random(-90/la,90/la)],[random(-150/la,30/la),random(-90/la,90/la)]]
            zonal[0].push(zonal[0][0]+random(150,180)/la)
            zonal[1].push(zonal[1][0]+random(90,120)/la)
            let scale=4.5+(lcos(a/la*360)>0.5?(-lcos(a/la*360)+0.5)*20:lcos(a/la*240+60)*-15)
            let bar=scale<0?[random(0.5,0.6),random(0.75,0.85)]:[random(0.4,0.5),random(0.6,0.7)]
            let init=(a+random(-0.1,0.1))/la*360
            let width=random(180,240)+a%2*30
            let mult=[min(1,abs(scale)/(scale<0?5:10)+(scale<0?0.5:0.25)),min(6/5,abs(scale)/(scale<0?5:10)+(scale<0?0.5:0.25))]
            zonal=zonal.map((set,index)=>set.map(num=>num*mult[index]))
            if(scale>0){
                data.parts.hair.main.push(
                    {spin:[init-width/la,init,init+zonal[0][0]],y:[0,0,scale*bar[0]]},
                    {spin:[init,init+width/la,init+zonal[0][2]],y:[0,0,scale*bar[0]]},
                    {spin:[init+zonal[0][0],init+zonal[0][2],init],y:[scale*bar[0],scale*bar[0],0]},
                    {spin:[init+zonal[0][0],init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[1][0]],y:[scale*bar[0],scale*bar[0],scale*bar[1]]},
                    {spin:[init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[0][2],init+zonal[1][2]],y:[scale*bar[0],scale*bar[0],scale*bar[1]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[0][0]*0.5+zonal[0][2]*0.5],y:[scale*bar[1],scale*bar[1],scale*bar[0]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[1][1]],y:[scale*bar[1],scale*bar[1],scale]}
                )
            }else{
                data.parts.hair.reverse.push(
                    {spin:[init-width/la-max(0,-6-scale*4),init,init+zonal[0][0]],y:[0,0,(scale-1)*bar[0]]},
                    {spin:[init,init+width/la+max(0,-6-scale*4),init+zonal[0][2]],y:[0,0,(scale-1)*bar[0]]},
                    {spin:[init+zonal[0][0],init+zonal[0][2],init],y:[(scale-1)*bar[0],(scale-1)*bar[0],0]},
                    {spin:[init+zonal[0][0],init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[1][0]],y:[(scale-1)*bar[0],(scale-1)*bar[0],(scale-1)*bar[1]]},
                    {spin:[init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[0][2],init+zonal[1][2]],y:[(scale-1)*bar[0],(scale-1)*bar[0],(scale-1)*bar[1]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[0][0]*0.5+zonal[0][2]*0.5],y:[(scale-1)*bar[1],(scale-1)*bar[1],(scale-1)*bar[0]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[1][1]],y:[(scale-1)*bar[1],(scale-1)*bar[1],(scale-1)]}
                )
            }
            zonal=[[random(-180/la,-30/la),random(-60/la,60/la)],[random(-150/la,0),random(-60/la,60/la)]]
            zonal[0].push(zonal[0][0]+random(180,210)/la)
            zonal[1].push(zonal[1][0]+random(120,150)/la)
            scale=1.5+(lcos(a/la*360)>0.5?(-lcos(a/la*360)+0.5)*20:lcos(a/la*240+60)*-15)
            bar=scale<0?[random(0.5,0.6),random(0.75,0.85)]:[random(0.25,0.375),random(0.625,0.75)]
            init=(a+random(0.4,0.6))/la*360
            width=random(180,240)+a%2*30
            mult=[min(1,abs(scale)/(scale<0?5:10)+(scale<0?0.5:0.25)),min(6/5,abs(scale)/(scale<0?5:10)+(scale<0?0.5:0.25))]
            zonal=zonal.map((set,index)=>set.map(num=>num*mult[index]))
            if(scale>0){
                data.parts.hair.inside.push(
                    {spin:[init-width/la,init,init+zonal[0][0]],y:[0,0,scale*bar[0]]},
                    {spin:[init,init+width/la,init+zonal[0][2]],y:[0,0,scale*bar[0]]},
                    {spin:[init+zonal[0][0],init+zonal[0][2],init],y:[scale*bar[0],scale*bar[0],0]},
                    {spin:[init+zonal[0][0],init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[1][0]],y:[scale*bar[0],scale*bar[0],scale*bar[1]]},
                    {spin:[init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[0][2],init+zonal[1][2]],y:[scale*bar[0],scale*bar[0],scale*bar[1]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[0][0]*0.5+zonal[0][2]*0.5],y:[scale*bar[1],scale*bar[1],scale*bar[0]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[1][1]],y:[scale*bar[1],scale*bar[1],scale]}
                )
            }else{
                data.parts.hair.reverseInside.push(
                    {spin:[init-width/la-max(0,-6-scale*4),init,init+zonal[0][0]],y:[0,0,(scale-2)*bar[0]]},
                    {spin:[init,init+width/la+max(0,-6-scale*4),init+zonal[0][2]],y:[0,0,(scale-2)*bar[0]]},
                    {spin:[init+zonal[0][0],init+zonal[0][2],init],y:[(scale-2)*bar[0],(scale-2)*bar[0],0]},
                    {spin:[init+zonal[0][0],init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[1][0]],y:[(scale-2)*bar[0],(scale-2)*bar[0],(scale-2)*bar[1]]},
                    {spin:[init+zonal[0][0]*0.5+zonal[0][2]*0.5,init+zonal[0][2],init+zonal[1][2]],y:[(scale-2)*bar[0],(scale-2)*bar[0],(scale-2)*bar[1]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[0][0]*0.5+zonal[0][2]*0.5],y:[(scale-2)*bar[1],(scale-2)*bar[1],(scale-2)*bar[0]]},
                    {spin:[init+zonal[1][0],init+zonal[1][2],init+zonal[1][1]],y:[(scale-2)*bar[1],(scale-2)*bar[1],(scale-2)]}
                )
            }
        }
        let flow=1
        for(let a=0,la=360;a<la;a++){
            let dir=[a/la*360,(a+1)/la*360,(a-0.5)/la*360,(a+0.5)/la*360]
            let q=5
            data.parts.dress.inside.push(
                {spin:[dir[2],dir[3],dir[0]],y:[0,0,2+flow*lcos(dir[0]*5)+sqrt(1-abs(q-a%(2*q))**2/q/q)],set:0},
                {spin:[dir[0],dir[1],dir[2]],y:[2+flow*lcos(dir[0]*5)+sqrt(1-abs(q-a%(2*q))**2/q/q),2+flow*lcos(dir[1]*5)+sqrt(1-abs(q-(a+1)%(2*q))**2/q/q),0],set:1},
            )
            data.parts.dress.main.push(
                {spin:[dir[2],dir[3],dir[0]],y:[0,0,2+flow*lcos(dir[0]*5)],set:0},
                {spin:[dir[0],dir[1],dir[2]],y:[2+flow*lcos(dir[0]*5),2+flow*lcos(dir[1]*5),0],set:1},
            )
        }
        for(let a=0,la=data.sprites.genAmount;a<la;a++){
            data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
            data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
            data.sprites.dress.front.push(this.generateSprite(parent,2,360*a/la,data))
            data.sprites.dress.back.push(this.generateSprite(parent,3,360*a/la,data))
        }
        data.sprites.minor.push(createGraphics(160,160))
        data.sprites.minor.push(createGraphics(200,160))
        data.sprites.minor.forEach(img=>setupLayer(img))
        let temp=[createGraphics(160,160),createGraphics(160,160)]
        temp.forEach(img=>setupLayer(img))
        let gradient=[new p5.LinearGradient(80),new p5.LinearGradient(80)]
        gradient[0].colors(
            0.00,color(255,251,222),
            1.00,color(255,215,115)
        )
        gradient[1].colors(
            0.00,color(253,234,172),
            1.00,color(239,192,104)
        )
        temp[0].translate(0,40)
        temp[0].fillGradient(gradient[1])
        temp[0].ellipse(60,40,103,103)
        temp[0].fillGradient(gradient[0])
        temp[0].ellipse(60,40,100,100)
        temp[0].fillGradient(gradient[1])
        temp[0].ellipse(50,40,81,81)
        temp[0].erase()
        temp[0].ellipse(50,40,78,78)
        temp[0].rect(10,40,20,25)
        temp[0].noErase()
        temp[0].noFill()
        temp[0].stroke(0)
        temp[0].strokeJoin(ROUND)
        for(let a=0,la=2;a<la;a++){
            temp[0].strokeGradient(gradient[1-a])
            temp[0].strokeWeight(7-a*3.5)
            temp[0].beginShape()
            let points=[]
            let flip=0
            for(let b=0,lb=49;b<lb;b++){
                let R=5
                let z=1.5
                let dir=(b+10)/lb*360+3-flip*6
                if(dir<100){
                    dir+=360
                }
                let width=-z*lsin(dir)+sqrt((z*lsin(dir))**2-z**2+R**2)-3.65
                let end=b%2==0?41:41+width*6
                if(width>0.1){
                    points.push([dir,end])
                }
            }
            for(let b=0,lb=points.length;b<lb;b++){
                let point=points[b]
                if(b==0){
                    temp[0].vertex(50+flip*60+(flip*2-1)*lsin(point[0])*point[1],40+lcos(point[0])*point[1])
                }else{
                    let last=points[b-1]
                    let w=[
                        ((point[1]**4)/3+(last[1]**4)*2/3)**0.25,
                        ((point[1]**4)*2/3+(last[1]**4)/3)**0.25,
                    ]
                    temp[0].bezierVertex(
                        50+flip*16+(flip*2-1)*lsin(point[0]/3+last[0]*2/3)*w[0],40+lcos(point[0]/3+last[0]*2/3)*w[0],
                        50+flip*60+(flip*2-1)*lsin(point[0]*2/3+last[0]/3)*w[1],40+lcos(point[0]*2/3+last[0]/3)*w[1],
                        50+flip*60+(flip*2-1)*lsin(point[0])*point[1],40+lcos(point[0])*point[1],
                    )
                }
            }
            temp[0].endShape()
        }
        gradient=[new p5.LinearGradient(80),new p5.LinearGradient(80)]
        gradient[0].colors(
            0.00,color(255,215,115),
            1.00,color(255,251,222)
        )
        gradient[1].colors(
            0.00,color(239,192,104),
            1.00,color(253,234,172)
        )
        temp[1].translate(0,40)
        temp[1].fillGradient(gradient[1])
        temp[1].ellipse(100,40,103,103)
        temp[1].fillGradient(gradient[0])
        temp[1].ellipse(100,40,100,100)
        temp[1].fillGradient(gradient[1])
        temp[1].ellipse(110,40,81,81)
        temp[1].erase()
        temp[1].ellipse(110,40,78,78)
        temp[1].rect(150,40,20,25)
        temp[1].noErase()
        temp[1].noFill()
        temp[1].stroke(0)
        temp[1].strokeJoin(ROUND)
        for(let a=0,la=2;a<la;a++){
            temp[1].strokeGradient(gradient[1-a])
            temp[1].strokeWeight(7-a*3.5)
            temp[1].beginShape()
            let points=[]
            let flip=1
            for(let b=0,lb=49;b<lb;b++){
                let R=5
                let z=1.5
                let dir=(b+10)/lb*360+3-flip*6
                if(dir<100){
                    dir+=360
                }
                let width=-z*lsin(dir)+sqrt((z*lsin(dir))**2-z**2+R**2)-3.65
                let end=b%2==0?41:41+width*6
                if(width>0.1){
                    points.push([dir,end])
                }
            }
            for(let b=0,lb=points.length;b<lb;b++){
                let point=points[b]
                if(b==0){
                    temp[1].vertex(50+flip*60+(flip*2-1)*lsin(point[0])*point[1],40+lcos(point[0])*point[1])
                }else{
                    let last=points[b-1]
                    let w=[
                        ((point[1]**4)/3+(last[1]**4)*2/3)**0.25,
                        ((point[1]**4)*2/3+(last[1]**4)/3)**0.25,
                    ]
                    temp[1].bezierVertex(
                        50+flip*60+(flip*2-1)*lsin(point[0]/3+last[0]*2/3)*w[0],40+lcos(point[0]/3+last[0]*2/3)*w[0],
                        50+flip*60+(flip*2-1)*lsin(point[0]*2/3+last[0]/3)*w[1],40+lcos(point[0]*2/3+last[0]/3)*w[1],
                        50+flip*60+(flip*2-1)*lsin(point[0])*point[1],40+lcos(point[0])*point[1],
                    )
                }
            }
            temp[1].endShape()
        }
        data.sprites.minor[0].image(temp[0],80,40,160,80,0,0,160,80)
        data.sprites.minor[0].image(temp[1],80,80)
        data.sprites.minor[0].image(temp[0],80,120,160,80,0,80,160,80)
        gradient=[new p5.LinearGradient(80),new p5.LinearGradient(80),new p5.LinearGradient(80),new p5.LinearGradient(80),new p5.LinearGradient(80),new p5.LinearGradient(80)]
        gradient[0].colors(0.00,color(255,247,189),1.00,color(255,207,87))
        gradient[1].colors(0.00,color(255,207,87),1.00,color(255,247,189))
        gradient[2].colors(0.00,color(255,239,123),1.00,color(235,159,0))
        gradient[3].colors(0.00,color(235,159,0),1.00,color(255,239,123))
        gradient[4].colors(0.00,color(255,243,156),1.00,color(245,183,0))
        gradient[5].colors(0.00,color(245,183,0),1.00,color(255,243,156))
        data.sprites.minor[1].translate(0,40)
        data.sprites.minor[1].fillGradient(gradient[5])
        data.sprites.minor[1].ellipse(52,40,94)
        data.sprites.minor[1].fillGradient(gradient[4])
        data.sprites.minor[1].ellipse(148,40,94)
        data.sprites.minor[1].erase()
        data.sprites.minor[1].ellipse(38,40,72)
        data.sprites.minor[1].ellipse(162,40,72)
        data.sprites.minor[1].noErase()
        data.sprites.minor[1].stroke(0)
        data.sprites.minor[1].noFill()
        data.sprites.minor[1].strokeJoin(ROUND)
        for(let a=0,la=4;a<la;a++){
            data.sprites.minor[1].strokeGradient(gradient[[2,0,3,1][a]])
            data.sprites.minor[1].strokeWeight(8-a%2*4)
            data.sprites.minor[1].beginShape()
            let points=[]
            let flip=a<2?1:0
            for(let b=0,lb=37;b<lb;b++){
                let R=5
                let z=1.5
                let dir=((b+floor(lb/4)+0.2)%lb+0.1)/lb*360+5-flip*10
                if(dir<100){
                    dir+=360
                }
                let width=-z*lsin(dir)+sqrt((z*lsin(dir))**2-z**2+R**2)-3.65
                let end=b%2==0?35:35+width*8
                if(width>0){
                    points.push([dir,end])
                }
            }
            for(let b=0,lb=points.length;b<lb;b++){
                let point=points[b]
                if(b==0){
                    data.sprites.minor[1].vertex(40+flip*120+(flip*2-1)*lsin(point[0])*point[1],40+lcos(point[0])*point[1])
                }else{
                    let last=points[b-1]
                    let w=[
                        ((point[1]**4)/3+(last[1]**4)*2/3)**0.25,
                        ((point[1]**4)*2/3+(last[1]**4)/3)**0.25,
                    ]
                    data.sprites.minor[1].bezierVertex(
                        40+flip*120+(flip*2-1)*lsin(point[0]/3+last[0]*2/3)*w[0],40+lcos(point[0]/3+last[0]*2/3)*w[0],
                        40+flip*120+(flip*2-1)*lsin(point[0]*2/3+last[0]/3)*w[1],40+lcos(point[0]*2/3+last[0]/3)*w[1],
                        40+flip*120+(flip*2-1)*lsin(point[0])*point[1],40+lcos(point[0])*point[1],
                    )
                }
            }
            data.sprites.minor[1].endShape()
        }
        return data
    },function(){
        let colorBase=this.graphicManager.getData(this.name).color
        this.components=this.standardModel(
            0,
            16.75,[{x:-3,y:-33.5,z:0},{x:3,y:-33.5,z:0}],[{x:-3.45,y:-58.5,z:0},{x:3.45,y:-58.5,z:0}],
            [-47.75,-79,-73.25,-77.25,-77.25,-72.75,-72.75],[[11.5,34.5],[30,30]],{x:8,y:5,open:0,wide:39},[18,18,30,30]
        )
        this.components.dress={
            level:-48,
            display:{main:true,sleeve:[true,true],bow:true,pocket:true},
            fade:{main:1,sleeve:[1,1],bow:1,pocket:1},
            color:colorBase.dress,
            parts:{top:[
                {spin:[24,96,27],height:5},
                {spin:[-96,-24,-27],height:5},
                {spin:[84,186,153],height:5},
                {spin:[-186,-84,-153],height:5}
            ],open:[
                {spin:[-24,24,0],height:2},
            ],openReverse:[
                {spin:[-24,24,0],height:-3},
            ]},
        }
        this.components.shoe=[{display:{main:true,buckle:true},anim:0,fade:1,color:colorBase.shoe},{display:{main:true,buckle:true},anim:0,fade:1,color:colorBase.shoe}]
        this.components.hair.pin={display:true,fade:1,spin:54}
        this.components.hair.bow=[{display:true,fade:1,spin:-108},{display:true,fade:1,spin:108}]
        this.routines.calculatePart=[0,1,2,3]
    },function(args){
        let parent=args[0]
        if(this.components.hair.pin.display&&lcos(this.direction.main+this.components.hair.pin.spin)<=0){
            this.layer.noStroke()
            this.layer.push()
            this.layer.translate(lsin(this.direction.main+this.components.hair.pin.spin)*17,-81)
            this.layer.rotate(lsin(this.direction.main+this.components.hair.pin.spin)*-5)
            this.layer.scale(lcos(this.direction.main+this.components.hair.pin.spin),1)
            this.layer.rotate(24)
            this.layer.fill(...this.flashColor(this.components.hair.color.pin),this.fade.main*this.components.hair.pin.fade)
            this.layer.noStroke()
            this.layer.rect(2,0,2.5,0.25)
            this.layer.image(this.graphicManager.getData(this.name).sprites.minor[0],0,0,10,10)
            this.layer.pop()
        }
        for(let a=0,la=2;a<la;a++){
            if(this.components.hair.bow[a].display){
                if(lcos(this.direction.main+this.components.hair.bow[a].spin)<=0){
                    this.displayComponent(3,[a])
                }
            }
        }
        if(this.components.hair.display.back){
            let size=this.fade.main*this.components.hair.fade.back
            this.layer.image(this.graphicManager.getData(this.name).sprites.hair.back[this.sprites.spinDetail],0,this.components.head.level+10*size,40*size,60*size)
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)<=-0.6){
                this.displayComponent(7,[a])
            }
        }
        if(this.components.dress.display.main){
            this.layer.image(this.graphicManager.getData(this.name).sprites.dress.back[this.sprites.spinDetail],0,this.components.dress.level+15*this.fade.main*this.components.dress.fade.main,30*this.fade.main*this.components.dress.fade.main,30*this.fade.main*this.components.dress.fade.main)
        }
        if(this.components.dress.display.main&&lcos(this.direction.main+180)<0){
            this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
            this.layer.ellipse(0,-65,4.5,3.25)
            this.layer.noStroke()
            for(let a=0,la=3;a<la;a++){
                this.displayComponent(2,[a])
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
                this.displayComponent(7,[a])
            }
        }
        for(let a=0,la=2;a<la;a++){
            let key=this.components.legs[0].appear.bottom.z<=this.components.legs[1].appear.bottom.z?a:1-a
            let part=this.components.legs[key]
            let part2=this.components.shoe[key]
            if(part2.display.main){
                let expand=lcos(this.direction.main)*0.5
                if(part2.anim==0){
                    this.layer.fill(...this.flashColor(upColor(mergeColor(part2.color.under,part2.color.over,0.5),lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                    this.layer.noStroke()
                    this.layer.ellipse(part.appear.bottom.x-lsin(this.direction.main)*0.3,part.appear.bottom.y-lcos(this.direction.main)*0.3+1.4-min(0.25,abs(lcos(this.direction.main)*0.5)),4,3)
                    this.layer.fill(...this.flashColor(upColor(part2.color.under,lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                    this.layer.ellipse(part.appear.bottom.x-lsin(this.direction.main)*0.3,part.appear.bottom.y-lcos(this.direction.main)*0.3+1.2-min(0.25,abs(lcos(this.direction.main)*0.5)),4,3)
                    //heel
                }
                this.layer.fill(...this.flashColor(upColor(part2.color.main,lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                this.layer.noStroke()
                this.layer.push()
                this.layer.translate(part.appear.bottom.x,part.appear.bottom.y+0.375)
                this.layer.rotate(-this.direction.main)
                if(part2.anim>0){
                    this.layer.translate(0,3.5)
                    this.layer.rotate(-part2.anim*36)
                    this.layer.translate(0,-3.5)
                }
                let pos=[
                    [-2.5,0.25],
                    [-2.5,0.75],
                    [-2.4,1.5],
                    [-2.35,2.25],
                    [-2.3,4],
                    [-1.6,5.5],
                    [-1.1,6.25],
                    [-0.8,6.75],
                    [-0.4,7],
                    [0,7],
                ]
                for(let a=0,la=pos.length-1;a<la;a++){
                    pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                }
                this.layer.arc(0,0.25,pos[0][0]*2,5.6,-180,0)
                this.layer.ellipse(0,0.25,pos[0][0]*2,2)
                this.layer.beginShape()
                this.layer.vertex(pos[0][0],pos[0][1])
                for(let a=0,la=floor(pos.length/3);a<la;a++){
                    this.layer.bezierVertex(
                        pos[a*3+1][0],pos[a*3+1][1],
                        pos[a*3+2][0],pos[a*3+2][1],
                        pos[a*3+3][0],pos[a*3+3][1],
                    )
                }
                this.layer.endShape()
                //main
                this.layer.fill(...this.flashColor(upColor(part2.color.over,lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                pos=[
                    [-2.2,0.25],
                    [-2.2,0.75],
                    [-2.1,1.5],
                    [-2.05,2.25],
                    [-2,4],
                    [-1.4,5.5],
                    [-0.9,6.25],
                    [-0.6,6.75],
                    [-0.2,7],
                    [0,7],
                ]
                for(let a=0,la=pos.length-1;a<la;a++){
                    pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                }
                this.layer.arc(0,0.25,pos[0][0]*2,5.4,-180,0)
                this.layer.ellipse(0,0.25,pos[0][0]*2,2)
                this.layer.beginShape()
                this.layer.vertex(pos[0][0],pos[0][1])
                for(let a=0,la=floor(pos.length/3);a<la;a++){
                    this.layer.bezierVertex(
                        pos[a*3+1][0],pos[a*3+1][1],
                        pos[a*3+2][0],pos[a*3+2][1],
                        pos[a*3+3][0],pos[a*3+3][1],
                    )
                }
                this.layer.endShape()
                //slightly darker layer
                this.layer.noFill()
                this.layer.stroke(...part2.color.glow,0.2*this.fade.main*part2.fade)
                for(let a=0,la=8;a<la;a++){
                    this.layer.strokeWeight(0.4-a*0.05)
                    this.layer.arc(-0.3,5.2,3+a*0.05,3+a*0.05,12+a*3,78-a*3)
                }
                this.layer.noStroke()
                //glow
                this.layer.pop()
                if(lcos(this.direction.main)<0){
                    this.layer.push()
                    this.layer.translate(part.appear.bottom.x*0.98+part.appear.middle.x*0.02,part.appear.bottom.y*0.98+part.appear.middle.y*0.02+0.5)
                    this.layer.rotate(-this.direction.main)
                    this.layer.translate(0,5.4+expand*0.5)
                    this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],0,0,3,2.4)
                    this.layer.pop()
                }
                //buckle
                this.layer.fill(...this.flashColor(upColor(part2.color.inside,lcos(this.direction.main+part.anim.top.theta)*10,[1,1,1])),this.fade.main*part2.fade)
                this.layer.noStroke()
                this.layer.push()
                this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                this.layer.rotate(-this.direction.main)
                if(part2.anim>0){
                    this.layer.translate(0,3.5)
                    this.layer.rotate(-part2.anim*36)
                    this.layer.translate(0,-3.5)
                }
                pos=[
                    [-2.1,0],
                    [-2.15,0.75],
                    [-2.15,1.5],
                    [-2.15,2.25],
                    [-2.15,3],
                    [-1.75,3.55+expand],
                    [-1.25,4.15+expand],
                    [-0.8,4.6+expand],
                    [-0.3,4.65+expand],
                    [0,4.65+expand],
                ]
                for(let a=0,la=pos.length-1;a<la;a++){
                    pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                }
                this.layer.arc(0,0,-pos[0][0]*2,-pos[0][0]*2,-180,0)
                this.layer.ellipse(0,0,pos[0][0]*2,2)
                this.layer.beginShape()
                this.layer.vertex(pos[0][0],pos[0][1])
                for(let a=0,la=floor(pos.length/3);a<la;a++){
                    this.layer.bezierVertex(
                        pos[a*3+1][0],pos[a*3+1][1],
                        pos[a*3+2][0],pos[a*3+2][1],
                        pos[a*3+3][0],pos[a*3+3][1],
                    )
                }
                this.layer.endShape()
                //rim
                if(part2.anim>0){
                    this.layer.fill(...this.flashColor(upColor(part2.color.inside,lcos(this.direction.main+part.anim.top.theta)*10-25,[1,1,1])),this.fade.main*part2.fade)
                    pos=[
                        [-1.8,0],
                        [-1.85,0.75],
                        [-1.85,1.5],
                        [-1.85,2.25],
                        [-1.85,3],
                        [-1.45,3.45+expand],
                        [-1.05,3.9+expand],
                        [-0.7,4.3+expand],
                        [-0.25,4.35+expand],
                        [0,4.35+expand],
                    ]
                    for(let a=0,la=pos.length-1;a<la;a++){
                        pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                    }
                    this.layer.arc(0,0,pos[0][0]*2,pos[0][0]*2,-180,0)
                    this.layer.ellipse(0,0,pos[0][0]*2,2)
                    this.layer.beginShape()
                    this.layer.vertex(pos[0][0],pos[0][1])
                    for(let a=0,la=floor(pos.length/3);a<la;a++){
                        this.layer.bezierVertex(
                            pos[a*3+1][0],pos[a*3+1][1],
                            pos[a*3+2][0],pos[a*3+2][1],
                            pos[a*3+3][0],pos[a*3+3][1],
                        )
                    }
                    this.layer.endShape()
                    //inner rim
                }
                this.layer.pop()
            }
            if(part.display){
                this.layer.stroke(...this.flashColor(upColor(part.color,lcos(this.direction.main+part.anim.top.theta)*10,[1,1,1])),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
            }
            if(part2.display.main){
                let expand=lcos(this.direction.main)*0.5

                this.layer.fill(...this.flashColor(upColor(part.color,lcos(this.direction.main+part.anim.top.theta)*10,[1,1,1])),this.fade.main*part2.fade)
                this.layer.noStroke()
                this.layer.push()
                this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                this.layer.rotate(-this.direction.main)

                let pos=[
                    [-2,0],
                    [-2.05,0.75],
                    [-2.05,1.5],
                    [-2.05,2.25],
                    [-2.05,3],
                    [-1.65,3.5+expand],
                    [-1.2,4+expand],
                    [-0.8,4.45+expand],
                    [-0.3,4.5+expand],
                    [0,4.5+expand],
                ]
                for(let a=0,la=pos.length-1;a<la;a++){
                    pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                }
                this.layer.arc(0,0.25,pos[0][0]*2,3.5,-180,0)
                this.layer.ellipse(0,0.25,pos[0][0]*2,2)
                this.layer.beginShape()
                this.layer.vertex(pos[0][0],pos[0][1])
                for(let a=0,la=floor(pos.length/3);a<la;a++){
                    this.layer.bezierVertex(
                        pos[a*3+1][0],pos[a*3+1][1],
                        pos[a*3+2][0],pos[a*3+2][1],
                        pos[a*3+3][0],pos[a*3+3][1],
                    )
                }
                this.layer.endShape()
                //instep

                this.layer.pop()

                if(lcos(this.direction.main)>=0){
                    this.layer.push()
                    this.layer.translate(part.appear.bottom.x*0.98+part.appear.middle.x*0.02,part.appear.bottom.y*0.98+part.appear.middle.y*0.02+0.5)
                    this.layer.rotate(-this.direction.main)
                    if(part2.anim>0){
                        this.layer.translate(0,3.5)
                        this.layer.rotate(-part2.anim*36)
                        this.layer.translate(0,-3.5)
                    }
                    this.layer.translate(0,5.4+expand*0.5)
                    this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],0,0,3,2.4)
                    this.layer.pop()
                }
                //buckle
            }
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)>-0.4&&lcos(part.anim.top.theta+this.direction.main)<0.4){
                this.displayComponent(7,[a])
            }
        }
        if(this.components.dress.display.main){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.main)
            this.layer.arc(0,-48,13,34.5,-180,0)
            this.layer.ellipse(0,-48,13,1)
            this.layer.image(this.graphicManager.getData(this.name).sprites.dress.front[this.sprites.spinDetail],0,this.components.dress.level+15*this.fade.main*this.components.dress.fade.main,30*this.fade.main*this.components.dress.fade.main,30*this.fade.main*this.components.dress.fade.main)
            this.layer.fill(...this.flashColor(this.components.dress.color.over),this.fade.main*this.components.dress.fade.main)
            for(let a=0,la=25;a<la;a++){
                if(lcos(a/la*360+this.direction.main)>0){
                    let dist=19+lcos(a/la*360*5)
                    this.layer.quad(
                        6.5*lsin(a/la*360+this.direction.main),-48+2*lcos(a/la*360+this.direction.main),
                        (6.5+dist*0.3)*lsin((a-0.15)/la*360+this.direction.main),-48+dist*10/11+4*lcos((a-0.15)/la*360+this.direction.main),
                        (6.5+dist/3)*lsin(a/la*360+this.direction.main),-48+dist+4*lcos(a/la*360+this.direction.main),
                        (6.5+dist*0.3)*lsin((a+0.15)/la*360+this.direction.main),-48+dist*10/11+4*lcos((a+0.15)/la*360+this.direction.main)
                    )
                }
            }
            if(lcos(this.direction.main+180)>0){
                for(let a=0,la=3;a<la;a++){
                    this.displayComponent(2,[a])
                }
            }else if(lcos(this.direction.main)>0){
                this.layer.fill(...this.flashColor(this.components.dress.color.button),this.fade.main*this.components.dress.fade.main)
                this.layer.ellipse(4.25*lsin(this.direction.main),-60.5,0.6*lcos(this.direction.main),0.6)
                this.layer.ellipse(4.5*lsin(this.direction.main),-59.5,0.6*lcos(this.direction.main),0.6)
                this.layer.fill(...this.flashColor(this.components.dress.color.buttonGlow),this.fade.main*this.components.dress.fade.main)
                this.layer.ellipse(4.25*lsin(this.direction.main)+0.1*lcos(this.direction.main),-60.6,0.3*lcos(this.direction.main),0.3)
                this.layer.ellipse(4.5*lsin(this.direction.main)+0.1*lcos(this.direction.main),-59.6,0.3*lcos(this.direction.main),0.3)
            }
        }
        for(let a=0,la=this.components.arms.length;a<la;a++){
            let part=this.components.arms[a]
            if(part.display&&lcos(part.anim.top.theta+this.direction.main)>=0.4){
                this.displayComponent(7,[a])
            }else if(part.display&&lcos(part.anim.top.theta+this.direction.main)<0.4&&lcos(part.anim.middle.theta+this.direction.main)>=0.4){
                let part=this.components.arms[a]
                let loc=[
                    this.components.arms[a].appear.top,
                    this.components.arms[a].appear.middle,
                    this.components.arms[a].appear.bottom
                ]
                if(this.components.dress.display.sleeve){
                    this.displayComponent(5,[a])
                }
                this.layer.strokeCap(SQUARE)
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.line(loc[1].x,loc[1].y,loc[2].x,loc[2].y)
                this.layer.strokeCap(ROUND)
                this.layer.point(loc[2].x,loc[2].y)
                if(this.components.dress.display.sleeve){
                    this.displayComponent(4,[a])
                }
                this.layer.strokeCap(SQUARE)
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade*0.25)
                this.layer.strokeWeight(4)
                this.layer.line(loc[1].x,loc[1].y,loc[2].x,loc[2].y)
                this.layer.strokeCap(ROUND)
            }
        }
        if(this.components.dress.display.main){
            this.layer.stroke(this.flashColor(this.components.dress.color.main)[0],this.flashColor(this.components.dress.color.main)[1],this.flashColor(this.components.dress.color.main)[2],this.fade.main*this.components.dress.fade.main)
            this.layer.strokeWeight(0.6*lcos(this.direction.main))
            parent.controlSpin(this.components.dress.parts.top,this.direction.main,0)
            parent.controlSpin(this.components.dress.parts.open,this.direction.main,0)
            parent.controlSpin(this.components.dress.parts.openReverse,this.direction.main,0)
            parent.displayTrianglesFront(this.layer,this.components.dress.parts.top,this.direction.main,-63.25,5.2,0.4,0.6,this.flashColor(this.components.dress.color.flaps),this.fade.main*this.components.dress.fade.main)
            if(lcos(this.direction.main)>0){
                parent.displayTrianglesFront(this.layer,this.components.dress.parts.open,this.direction.main,-63.25,5.2,0.4,0.6,this.flashColor(this.components.dress.color.flaps),this.fade.main*this.components.dress.fade.main)
            }
            parent.displayTrianglesFront(this.layer,this.components.dress.parts.top,this.direction.main,-63.85,5.2,0,0.6,this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.main)
            parent.displayTrianglesFront(this.layer,this.components.dress.parts.open,this.direction.main,-63.85,5.2,0,0.6,this.flashColor(this.components.body.color),this.fade.main*this.components.dress.fade.main)
            parent.displayTrianglesFront(this.layer,this.components.dress.parts.openReverse,this.direction.main,-63.85,5.2,0,0.6,this.flashColor(this.components.body.color),this.fade.main*this.components.dress.fade.main)

            this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
            this.layer.ellipse(0,-64.75,4.5,3.25)
        }
        if(this.components.dress.display.pocket&&lcos(this.direction.main+36)>0){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.dress.color.pocket[0]),this.fade.main*this.components.dress.fade.pocket)
            this.layer.beginShape()
            this.layer.vertex(lsin(this.direction.main+36)*6-1.5*lcos(this.direction.main+36),-55)
            this.layer.vertex(lsin(this.direction.main+36)*6-1.5*lcos(this.direction.main+36),-53.5)
            this.layer.vertex(lsin(this.direction.main+36)*6-1.25*lcos(this.direction.main+36),-53)
            this.layer.vertex(lsin(this.direction.main+36)*6,-52.75)
            this.layer.vertex(lsin(this.direction.main+36)*6+1.25*lcos(this.direction.main+36),-53)
            this.layer.vertex(lsin(this.direction.main+36)*6+1.5*lcos(this.direction.main+36),-53.5)
            this.layer.vertex(lsin(this.direction.main+36)*6+1.5*lcos(this.direction.main+36),-55)
            this.layer.endShape()
            this.layer.fill(...this.flashColor(this.components.dress.color.pocket[1]),this.fade.main*this.components.dress.fade.pocket)
            pentagon(this.layer,
                lsin(this.direction.main+36)*6-1.6*lcos(this.direction.main+36),-56,
                lsin(this.direction.main+36)*6+1.6*lcos(this.direction.main+36),-56,
                lsin(this.direction.main+36)*6+1.6*lcos(this.direction.main+36),-55,
                lsin(this.direction.main+36)*6,-54.5,
                lsin(this.direction.main+36)*6-1.6*lcos(this.direction.main+36),-55,
            )
            this.layer.fill(...this.flashColor(this.components.dress.color.pocket[2]),this.fade.main*this.components.dress.fade.pocket)
            this.layer.ellipse(lsin(this.direction.main+36)*6,-55.25,0.5*lcos(this.direction.main+36),0.5)
        }
        if(this.components.head.display){
            this.layer.noStroke()
            this.layer.fill(...this.flashColor(this.components.head.color),this.fade.main*this.components.head.fade)
            this.layer.ellipse(0,this.components.head.level,this.components.head.dimensions[0],this.components.head.dimensions[1])
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
            this.layer.stroke(...this.components.hair.color.glow,this.fade.main/4*this.components.hair.fade.glow)
            for(let a=0,la=6;a<la;a++){
                this.layer.strokeWeight((3-a/2))
                this.layer.arc(0,this.components.head.level,this.components.head.dimensions[0]+a-1,this.components.head.dimensions[1]+a-1,-72+a*6,-12-a*6)
            }
        }
        for(let a=0,la=2;a<la;a++){
            if(this.components.hair.bow[a].display){
                if(lcos(this.direction.main+this.components.hair.bow[a].spin)>0){
                    this.displayComponent(3,[a])
                }
            }
        }
        if(this.components.hair.pin.display&&lcos(this.direction.main+this.components.hair.pin.spin)>0){
            this.layer.noStroke()
            this.layer.push()
            this.layer.translate(lsin(this.direction.main+this.components.hair.pin.spin)*17,-81)
            this.layer.rotate(lsin(this.direction.main+this.components.hair.pin.spin)*-5)
            this.layer.scale(lcos(this.direction.main+this.components.hair.pin.spin),1)
            this.layer.rotate(24)
            this.layer.fill(...this.flashColor(this.components.hair.color.pin),this.fade.main*this.components.hair.pin.fade)
            this.layer.noStroke()
            this.layer.rect(2,0,2.5,0.25)
            this.layer.image(this.graphicManager.getData(this.name).sprites.minor[0],0,0,10,10)
            this.layer.pop()
        }
    },function(type,args){
        let dir
        let sc
        let loc=[]
        let ang
        switch(type){
            case 0:
                this.displayComponent(4,args)
                loc=[
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
                this.layer.ellipse(loc[1].x,loc[1].y,4.2)
                this.layer.quad(
                    loc[1].x-2.1*sc[1][0],
                    loc[1].y-2.1*sc[1][1],
                    loc[1].x+2.1*sc[1][0],
                    loc[1].y+2.1*sc[1][1],
                    loc[0].x+2.2*sc[1][0],
                    loc[0].y+2.2*sc[1][1],
                    loc[0].x-2.2*sc[1][0],
                    loc[0].y-2.2*sc[1][1]
                )
                this.layer.fill(...this.flashColor(this.components.dress.color.sleeve),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                for(let a=0,la=11;a<la;a++){
                    let sc2=[lsin(a/la*360+this.direction.main),lcos(a/la*360+this.direction.main)]
                    if(sc2[1]>0){
                        this.layer.quad(
                            loc[1].x*0.1+loc[0].x*0.9+2.19*sc[1][0]*sc2[0],
                            loc[1].y*0.1+loc[0].y*0.9+2.19*sc[1][1]*sc2[0],
                            loc[1].x*0.5+loc[0].x*0.5+2.15*sc[1][0]*sc2[0]+sc[1][0]*sc2[1]*0.25,
                            loc[1].y*0.5+loc[0].y*0.5+2.15*sc[1][1]*sc2[0]-sc[1][1]*sc2[1]*0.25,
                            loc[1].x*0.9+loc[0].x*0.1+2.11*sc[1][0]*sc2[0],
                            loc[1].y*0.9+loc[0].y*0.1+2.11*sc[1][1]*sc2[0],
                            loc[1].x*0.5+loc[0].x*0.5+2.15*sc[1][0]*sc2[0]-sc[1][0]*sc2[1]*0.25,
                            loc[1].y*0.5+loc[0].y*0.5+2.15*sc[1][1]*sc2[0]+sc[1][1]*sc2[1]*0.25,
                        )
                    }
                }
                this.displayComponent(8,args)
            break
            case 1:
                this.displayComponent(5,args)
                loc=[
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
                this.layer.fill(...this.flashColor(mergeColor(this.components.dress.color.back,this.components.dress.color.main,0.25)),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.push()
                this.layer.translate(loc[1].x*0.4+loc[0].x*0.6,loc[1].y*0.4+loc[0].y*0.6)
                this.layer.rotate(-dir[1])
                ang=atan2(4,dist(loc[1].x,loc[1].y,loc[0].x,loc[0].y)*0.6)
                this.layer.fill(...this.flashColor(mergeColor(this.components.dress.color.back,this.components.dress.color.main,0.25)),this.fade.main*this.components.dress.fade.sleeve[args[0]]*0.8)
                for(let a=0,la=11;a<la;a++){
                    let turn=[(a-0.5)/la*360+this.direction.main,(a+0.5)/la*360+this.direction.main]
                    if(lcos(turn[0])<=0&&lcos(turn[1])<=0){
                        this.layer.push()
                        this.layer.translate(
                            lsin(turn[0])*1.5+lsin(turn[1])*1.5,
                            -abs(lcos(turn[0])+lcos(turn[1]))/3
                        )
                        this.layer.rotate(ang*lsin(turn[1]))
                        this.layer.ellipse(0,0,sqrt(
                            (3*abs(lsin(turn[1])-lsin(turn[0])))**2+
                            (abs(abs(lcos(turn[1]))-abs(lcos(turn[0]))))**2
                        ),1)
                        this.layer.pop()
                    }
                }
                this.layer.pop()
            break
            case 2:
                this.layer.push()
                this.layer.translate(lsin(this.direction.main+180)*[5.9,8,12][args[0]],-55.5+args[0]*12+[2,3,4][args[0]]*lcos(this.direction.main+180))
                this.layer.rotate(lsin(this.direction.main+180)*[-10,-20,-20][args[0]])
                this.layer.scale(lcos(this.direction.main+180)*0.375,0.375)
                this.displayComponent(6,[sqrt(abs(lcos(this.direction.main+180))),this.components.dress.color.bow,1.5,this.components.dress.fade.bow])
                this.layer.pop()
            break
            case 3:
                this.layer.push()
                this.layer.translate(lsin(this.direction.main+this.components.hair.bow[args[0]].spin)*14,-88)
                this.layer.rotate(lsin(this.direction.main+this.components.hair.bow[args[0]].spin)*-30)
                this.displayComponent(6,[sqrt(abs(lcos(this.direction.main+this.components.hair.bow[args[0]].spin))),this.components.hair.color.bow,1,this.components.hair.fade.bow])
                this.layer.pop()
            break
            case 4:
                loc=[
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
                this.layer.beginShape()
                hexagon(
                    this.layer,
                    loc[1].x+2.1*sc[0][0],
                    loc[1].y+2.1*sc[0][1],
                    loc[1].x*0.9+loc[2].x*0.1+2.1*sc[0][0],
                    loc[1].y*0.9+loc[2].y*0.1+2.1*sc[0][1],
                    loc[1].x*0.25+loc[2].x*0.75+6*sc[0][0],
                    loc[1].y*0.25+loc[2].y*0.75+6*sc[0][1],
                    loc[1].x*0.25+loc[2].x*0.75-6*sc[0][0],
                    loc[1].y*0.25+loc[2].y*0.75-6*sc[0][1],
                    loc[1].x*0.9+loc[2].x*0.1-2.1*sc[0][0],
                    loc[1].y*0.9+loc[2].y*0.1-2.1*sc[0][1],
                    loc[1].x-2.1*sc[0][0],
                    loc[1].y-2.1*sc[0][1]
                )
                this.layer.endShape()
                this.layer.push()
                this.layer.translate(loc[1].x*0.25+loc[2].x*0.75,loc[1].y*0.25+loc[2].y*0.75)
                this.layer.rotate(-dir[0])
                this.layer.arc(0,0,12,2,-180,0)
                this.layer.ellipse(0,0,12,1)
                this.layer.fill(...this.flashColor(this.components.dress.color.sleeve),this.fade.main*this.components.dress.fade.sleeve[args[0]]*0.8)
                ang=atan2(6,dist(loc[1].x,loc[1].y,loc[2].x,loc[2].y)*0.75)
                for(let a=0,la=17;a<la;a++){
                    if(lcos(a/la*360+this.direction.main)>0){
                        let turn=[(a-0.5)/la*360+this.direction.main,(a+0.5)/la*360+this.direction.main]
                        this.layer.push()
                        this.layer.translate(
                            lsin(turn[0])*3+lsin(turn[1])*3,
                            -abs(lcos(turn[0])+lcos(turn[1]))*0.5
                        )
                        this.layer.rotate(ang*lsin(turn[1]))
                        this.layer.ellipse(0,0,sqrt(
                            (6*abs(lsin(turn[1])-lsin(turn[0])))**2+
                            (abs(abs(lcos(turn[1]))-abs(lcos(turn[0]))))**2
                        ),2.4)
                        this.layer.pop()
                    }
                }
                this.layer.pop()
                let len=dist(
                    loc[1].x*0.9+loc[2].x*0.1,
                    loc[1].y*0.9+loc[2].y*0.1,
                    loc[1].x*0.25+loc[2].x*0.75,
                    loc[1].y*0.25+loc[2].y*0.75
                )
                this.layer.push()
                this.layer.translate(
                    loc[1].x*0.9+loc[2].x*0.1,
                    loc[1].y*0.9+loc[2].y*0.1
                )
                this.layer.rotate(-dir[0])
                this.layer.fill(...this.flashColor(this.components.dress.color.sleeveOver),this.fade.main*this.components.dress.fade.main*0.8)
                for(let a=0,la=17;a<la;a++){
                    if(lcos((a+0.5)/la*360+this.direction.main)>0){
                        this.layer.quad(
                            2*lsin((a+0.5)/la*360+this.direction.main),-lcos((a+0.5)/la*360+this.direction.main)*0.5,
                            5.6*lsin((a+0.35)/la*360+this.direction.main),-len*0.9-abs(lcos((a+0.35)/la*360+this.direction.main)),
                            6*lsin((a+0.5)/la*360+this.direction.main),-len-abs(lcos((a+0.5)/la*360+this.direction.main)),
                            5.6*lsin((a+0.65)/la*360+this.direction.main),-len*0.9-abs(lcos((a+0.65)/la*360+this.direction.main))
                        )
                    }
                }
                this.layer.pop()
            break
            case 5:
                loc=[
                    this.components.arms[args[0]].appear.top,
                    this.components.arms[args[0]].appear.middle,
                    this.components.arms[args[0]].appear.bottom
                ]
                dir=[
                    atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y),
                    atan2(loc[0].x-loc[1].x,loc[0].y-loc[1].y)
                ]
                this.layer.noStroke()
                this.layer.fill(...this.flashColor(this.components.dress.color.sleeveBack),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.push()
                this.layer.translate(loc[1].x*0.25+loc[2].x*0.75,loc[1].y*0.25+loc[2].y*0.75)
                this.layer.rotate(-dir[0])
                ang=atan2(6,dist(loc[1].x,loc[1].y,loc[2].x,loc[2].y)*0.75)
                for(let a=0,la=17;a<la;a++){
                    let turn=[(a-0.5)/la*360+this.direction.main,(a+0.5)/la*360+this.direction.main]
                    if(lcos(turn[0])<=0&&lcos(turn[1])<=0){
                        this.layer.push()
                        this.layer.translate(
                            lsin(turn[0])*3+lsin(turn[1])*3,
                            -abs(lcos(turn[0])+lcos(turn[1]))*0.5
                        )
                        this.layer.rotate(ang*lsin(turn[1]))
                        this.layer.ellipse(0,0,sqrt(
                            (6*abs(lsin(turn[1])-lsin(turn[0])))**2+
                            (abs(abs(lcos(turn[1]))-abs(lcos(turn[0]))))**2
                        ),2.4)
                        this.layer.pop()
                    }
                }
                this.layer.pop()
            break
            case 6:
                this.layer.noStroke()
                this.layer.rotate(-10*args[0])
                this.displayComponent(9,args)
                this.layer.rotate(180+20*args[0])
                this.displayComponent(9,args)
                this.layer.rotate(-180-10*args[0])
                this.layer.scale(args[0],1)
                this.layer.fill(...this.flashColor([args[1][0]*0.4,args[1][1]*0.4,args[1][2]*0.4]),args[3])
                this.layer.rotate(60)
                pentagon(this.layer,0,0.4,0,-0.4,7.4,-2,5.8,0,7.4,2)
                this.layer.rotate(60)
                pentagon(this.layer,0,0.4,0,-0.4,7.4,-2,5.8,0,7.4,2)
                this.layer.fill(...this.flashColor(args[1]),args[3])
                this.layer.rotate(-60)
                pentagon(this.layer,0,0.2,0,-0.2,6.8,-1.85,5.32,0,6.8,1.85)
                this.layer.rotate(60)
                pentagon(this.layer,0,0.2,0,-0.2,6.8,-1.85,5.32,0,6.8,1.85)
                this.layer.fill(...this.flashColor([args[1][0]*1.4,args[1][1]*1.4,args[1][2]*1.4]),args[3])
                this.layer.rotate(-60)
                pentagon(this.layer,0,0.2,0,-0.2,5.8,-1.6,4.52,0,5.8,1.6)
                this.layer.rotate(60)
                pentagon(this.layer,0,0.2,0,-0.2,5.8,-1.6,4.52,0,5.8,1.6)
                this.layer.fill(...this.flashColor([args[1][0]*0.8,args[1][1]*0.8,args[1][2]*0.8]),args[3])
                this.layer.rotate(-60)
                pentagon(this.layer,0,0.1,0,-0.1,5.16,-0.8,4.52,0,5.16,0.8)
                this.layer.rotate(60)
                pentagon(this.layer,0,0.1,0,-0.1,5.16,-0.8,4.52,0,5.16,0.8)
                this.layer.fill(...this.flashColor(mergeColor(args[1],[255,255,255],args[2]*0.25)),args[3])
                this.layer.rotate(-60)
                pentagon(this.layer,0,0.1,0,-0.1,4.84+args[2]*0.16,-0.4-args[2]*0.2,4.84-args[2]*0.32,0,4.84+args[2]*0.16,0.4+args[2]*0.2)
                this.layer.rotate(60)
                pentagon(this.layer,0,0.1,0,-0.1,4.84+args[2]*0.16,-0.4-args[2]*0.2,4.84-args[2]*0.32,0,4.84+args[2]*0.16,0.4+args[2]*0.2)
                this.layer.fill(...this.flashColor([args[1][0]*0.8,args[1][1]*0.8,args[1][2]*0.8]),args[3])
                this.layer.rotate(-60)
                pentagon(this.layer,0,0.1,0,-0.1,4.84,-0.4,4.52,0,4.84,0.4)
                this.layer.rotate(60)
                pentagon(this.layer,0,0.1,0,-0.1,4.84,-0.4,4.52,0,4.84,0.4)
                this.layer.rotate(60)
                this.layer.fill(...this.flashColor([args[1][0]*0.6,args[1][1]*0.6,args[1][2]*0.6]),args[3])
                hexagon(this.layer,-1.6,-0.7+args[0]*0.3,-1.2,args[0]*0.3,-1.4,0.7+args[0]*0.3,1.4,0.7+args[0]*0.3,1.2,args[0]*0.3,1.6,-0.7+args[0]*0.3)
            break
            case 7:
                let part=this.components.arms[args[0]]
                loc=[
                    this.components.arms[args[0]].appear.top,
                    this.components.arms[args[0]].appear.middle,
                    this.components.arms[args[0]].appear.bottom
                ]
                if(this.components.dress.display.sleeve[args[0]]){
                    this.displayComponent(1,args)
                }
                this.layer.noFill()
                this.layer.strokeJoin(ROUND)
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                this.layer.strokeWeight(4)
                this.layer.beginShape()
                this.layer.vertex(loc[0].x,loc[0].y)
                this.layer.vertex(loc[1].x,loc[1].y)
                this.layer.vertex(loc[2].x,loc[2].y)
                this.layer.endShape()
                if(this.components.dress.display.sleeve[args[0]]){
                    this.displayComponent(0,args)
                }
                this.layer.noFill()
                this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade*0.25)
                this.layer.strokeWeight(4)
                this.layer.beginShape()
                this.layer.vertex(loc[0].x,loc[0].y)
                this.layer.vertex(loc[1].x,loc[1].y)
                this.layer.vertex(loc[2].x,loc[2].y)
                this.layer.endShape()
                this.layer.strokeJoin(MITER)
                if(this.components.dress.display.sleeve[args[0]]){
                    this.displayComponent(8,args)
                }
            break
            case 8:
                loc=[
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
                this.layer.fill(...this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.quad(
                    loc[0].x-2.4*sc[1][0],
                    loc[0].y-2.4*sc[1][1],
                    loc[0].x+2.4*sc[1][0],
                    loc[0].y+2.4*sc[1][1],
                    loc[1].x*0.4+loc[0].x*0.6+3*sc[1][0],
                    loc[1].y*0.4+loc[0].y*0.6+3*sc[1][1],
                    loc[1].x*0.4+loc[0].x*0.6-3*sc[1][0],
                    loc[1].y*0.4+loc[0].y*0.6-3*sc[1][1]
                )
                this.layer.fill(...this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                this.layer.push()
                this.layer.translate(loc[0].x,loc[0].y)
                this.layer.rotate(-dir[1])
                this.layer.arc(0,0,4.8,4.2,0,180)
                this.layer.ellipse(0,0,4.8,0.4)
                this.layer.pop()
                this.layer.push()
                this.layer.translate(loc[1].x*0.4+loc[0].x*0.6,loc[1].y*0.4+loc[0].y*0.6)
                this.layer.rotate(-dir[1])
                this.layer.arc(0,0,6,4/3,-180,0)
                this.layer.ellipse(0,0,6,4/3)
                ang=atan2(0.6,dist(loc[1].x,loc[1].y,loc[0].x,loc[0].y)*0.6)
                this.layer.fill(...this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.sleeve[args[0]]*0.8)
                for(let a=0,la=11;a<la;a++){
                    if(lcos(a/la*360+this.direction.main)>0){
                        this.layer.push()
                        this.layer.translate(
                            lsin((a-0.5)/la*360+this.direction.main)*1.5+lsin((a+0.5)/la*360+this.direction.main)*1.5,
                            -abs(lcos((a-0.5)/la*360+this.direction.main)+lcos((a+0.5)/la*360+this.direction.main))/3
                        )
                        this.layer.rotate(ang*lsin((a+0.5)/la*360+this.direction.main))
                        this.layer.ellipse(0,0,sqrt(
                            (3*abs(lsin((a+0.5)/la*360+this.direction.main)-lsin((a-0.5)/la*360+this.direction.main)))**2+
                            (abs(abs(lcos((a+0.5)/la*360+this.direction.main))-abs(lcos((a-0.5)/la*360+this.direction.main))))**2
                        ),1)
                        this.layer.pop()
                    }
                }
                this.layer.pop()
            break
            case 9:
                this.layer.scale(args[0],1)
                this.layer.fill(...this.flashColor([args[1][0]*0.4,args[1][1]*0.4,args[1][2]*0.4]),args[3])
                hexagon(this.layer,0,0,6.4,-3.2,8,-3.6,7.2,0,8,3.6,6.4,3.2)
                this.layer.fill(...this.flashColor(args[1]),args[3])
                hexagon(this.layer,0,0,6.4,-3.2,7.4,-3.45,6.46,0,7.4,3.45,6.4,3.2)
                this.layer.fill(...this.flashColor([args[1][0]*1.4,args[1][1]*1.4,args[1][2]*1.4]),args[3])
                this.layer.quad(0,0,6.4,-3.2,5.12,0,6.4,3.2)
                this.layer.fill(...this.flashColor([args[1][0]*1.1,args[1][1]*1.1,args[1][2]*1.1]),args[3])
                this.layer.quad(0,0,5.92,-2,5.12,0,5.92,2)
                this.layer.fill(...this.flashColor([args[1][0]*0.8,args[1][1]*0.8,args[1][2]*0.8]),args[3])
                this.layer.quad(0,0,5.6,-1.2,5.12,0,5.6,1.2)
                this.layer.fill(...this.flashColor(mergeColor(args[1],[255,255,255],args[2]*0.125)),args[3])
                this.layer.quad(2.25+args[2]*0.15,0,6.68+args[2]*0.08,-1.4-args[2]*0.2,6.12,0,6.68+args[2]*0.08,1.4+args[2]*0.2)
                this.layer.fill(...this.flashColor([args[1][0]*0.8,args[1][1]*0.8,args[1][2]*0.8]),args[3])
                this.layer.quad(2.25,0,6.68,-1.4,6.12,0,6.68,1.4)
                this.layer.fill(...this.flashColor(mergeColor(args[1],[255,255,255],args[2]*0.25)),args[3])
                this.layer.quad(0,0,6.36+args[2]*0.08,-0.6-args[2]*0.2,6.12,0,6.36+args[2]*0.08,0.6+args[2]*0.2)
                this.layer.fill(...this.flashColor([args[1][0]*0.8,args[1][1]*0.8,args[1][2]*0.8]),args[3])
                this.layer.quad(0.4,0,6.36,-0.6,6.12,0,6.36,0.6)
                this.layer.fill(...this.flashColor(mergeColor(args[1],[255,255,255],args[2]*0.125)),args[3])
                this.layer.quad(0.4,0,4.87,-0.45,4.44,0,4.87,0.45)
                this.layer.fill(...this.flashColor([args[1][0]*0.8,args[1][1]*0.8,args[1][2]*0.8]),args[3])
                this.layer.quad(0.4,0,4.51,-0.39,4.12,0,4.51,0.39)
                this.layer.scale(1/args[0],1)
            break
        }
    },
))