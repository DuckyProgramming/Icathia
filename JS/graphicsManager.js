class graphicsManager{
    constructor(){
        this.data=[
        ]
    }
    displaySymbol(layer,x,y,type,direction,size,fade){
        layer.push()
        layer.translate(x,y)
        layer.rotate(direction)
        layer.scale(size)
        layer.noFill()
        layer.noStroke()
        switch(type){
        }
        layer.pop()
    }
    controlSpin(set,direction,spec){
        for(let g=0,lg=set.length;g<lg;g++){
            if(set[g].spin[0]>set[g].spin[1]&&spec==1){
                set[g].spin=[set[g].spin[1],set[g].spin[0],set[g].spin[2]]
                set[g].y=[set[g].y[1],set[g].y[0],set[g].y[2]]
            }
            for(let h=0,lh=set[g].spin.length;h<lh;h++){
                if(direction+set[g].spin[h]>180){
                    set[g].spin[h]-=360
                }else if(direction+set[g].spin[h]<-180){
                    set[g].spin[h]+=360
                }
            }
        }
    }
    displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
        if(color==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else{
            layer.fill(...color,fade)
            layer.stroke(...color,fade)
        }
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]<0){
                if(c[1]<0){
                    if(c[2]<0){
                        layer.triangle(
                            s[0]*width/2,base,
                            s[1]*width/2,base,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }
                }else{
                    if(c[2]<0){
                        let inter=reality[1]<90?
                            abs(-90-reality[1])/abs(reality[2]-reality[1]):
                            abs(270-reality[1])/abs(reality[2]-reality[1])
                        layer.quad(
                            s[0]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<90?
                            abs(-90-reality[0])/abs(reality[2]-reality[0]):
                            abs(270-reality[0])/abs(reality[2]-reality[0])
                        layer.triangle(
                            s[0]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }else{
                if(c[1]<0){
                    if(c[2]<0){
                        let inter=reality[1]<-90?
                            abs(-270-reality[0])/abs(reality[2]-reality[0]):
                            abs(90-reality[0])/abs(reality[2]-reality[0])
                        layer.quad(
                            s[1]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<-90?
                            abs(-270-reality[1])/abs(reality[2]-reality[1]):
                            abs(90-reality[1])/abs(reality[2]-reality[1])
                        layer.triangle(
                            s[1]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesFront(layer,parts,direction,base,width,weight,slant,color,fade){
        if(color==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else if(weight==0){
            layer.fill(...color,fade)
            layer.noStroke()
        }else{
            layer.fill(...color,fade)
            layer.stroke(...color,fade)
        }
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]>=0){
                if(c[1]>=0){
                    if(c[2]>=0){
                        layer.triangle(
                            s[0]*width/2,base,
                            s[1]*width/2,base,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }
                }else{
                    if(c[2]>=0){
                        let inter=reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[2]-reality[1]):
                            abs(90-reality[1])/abs(reality[2]-reality[1])
                        layer.quad(
                            s[0]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[2]-reality[0]):
                            abs(90-reality[0])/abs(reality[2]-reality[0])
                        layer.triangle(
                            s[0]*width/2,base,
                            width/2,base,
                            width/2+part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }else{
                if(c[1]>=0){
                    if(c[2]>=0){
                        let inter=reality[1]<90?
                            abs(-90-reality[0])/abs(reality[2]-reality[0]):
                            abs(270-reality[0])/abs(reality[2]-reality[0])
                        layer.quad(
                            s[1]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter,
                            s[2]*(width/2+part.height*slant),base+part.height
                        )
                    }else{
                        let inter=reality[0]<90?
                            abs(-90-reality[1])/abs(reality[2]-reality[1]):
                            abs(270-reality[1])/abs(reality[2]-reality[1])
                        layer.triangle(
                            s[1]*width/2,base,
                            -width/2,base,
                            -width/2-part.height*inter*slant,base+part.height*inter
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesBackMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        if(color1==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color!=-1){
                layer.fill(...mergeColor(color1,color2,a/la))
                layer.stroke(...mergeColor(color1,color2,a/la))
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]<0){
                if(c[1]<0){
                    if(c[2]<0){
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }
                }else{
                    if(c[2]<0){
                        let inter=[
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[0]-reality[1]):
                            abs(270-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[1]-reality[2]):
                            abs(270-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[1]):
                            abs(270-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[2]):
                            abs(270-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }else{
                if(c[1]<0){
                    if(c[2]<0){
                        let inter=[
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[1]):
                            abs(90-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[2]):
                            abs(90-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[0]-reality[1]):
                            abs(90-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[1]-reality[2]):
                            abs(90-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesFrontMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        if(color1==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color!=-1){
                layer.fill(...mergeColor(color1,color2,a/la))
                layer.stroke(...mergeColor(color1,color2,a/la))
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]>=0){
                if(c[1]>=0){
                    if(c[2]>=0){
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }
                }else{
                    if(c[2]>=0){
                        let inter=[
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[0]-reality[1]):
                            abs(90-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<-90?
                            abs(-270-reality[1])/abs(reality[1]-reality[2]):
                            abs(90-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[1]):
                            abs(90-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<-90?
                            abs(-270-reality[0])/abs(reality[0]-reality[2]):
                            abs(90-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0],
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }else{
                if(c[1]>=0){
                    if(c[2]>=0){
                        let inter=[
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[1]):
                            abs(270-reality[0])/abs(reality[0]-reality[1]),
                            reality[0]<90?
                            abs(-90-reality[0])/abs(reality[0]-reality[2]):
                            abs(270-reality[0])/abs(reality[0]-reality[2])
                        ]
                        let cut=[
                            part.y[0]*(1-inter[0])+part.y[1]*inter[0],
                            part.y[0]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.quad(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]
                        )
                    }else{
                        let inter=[
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[0]-reality[1]):
                            abs(270-reality[1])/abs(reality[0]-reality[1]),
                            reality[1]<90?
                            abs(-90-reality[1])/abs(reality[1]-reality[2]):
                            abs(270-reality[1])/abs(reality[1]-reality[2])
                        ]
                        let cut=[
                            part.y[1]*(1-inter[0])+part.y[0]*inter[0],
                            part.y[1]*(1-inter[1])+part.y[2]*inter[1]
                        ]
                        layer.triangle(
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1],
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    subSprite(width,height,jumpX,jumpY){
        let layer=createGraphics(width,height)
        setupLayer(layer)
        layer.translate(jumpX,jumpY)
        layer.scale(5)
        return layer
    }
    generateSprite(name,type,direction,data){
        let layer
        let overlayer
        switch(name){
            case `Shiru`:
                switch(type){
                    case 0:
                        layer=this.subSprite(200,300,100,100)
                        this.controlSpin(data.parts.hair.inside,direction,0)
                        this.displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,-0.06,data.color.hair.insideFront,1)
                        this.controlSpin(data.parts.hair.main,direction,0)
                        this.displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.03,data.color.hair.front,1)
                        layer.arc(0,0,35,34,-180,0)
                        layer.line(-17.5,0,17.5,0)
                        return layer
                    case 1:
                        layer=this.subSprite(200,300,100,100)
                        this.displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.06,data.color.hair.back,1)
                        this.displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,-0.03,data.color.hair.insideBack,1)
                        return layer
                    case 2: case 3:
                        layer=this.subSprite(120,360,60,0)
                        let set=type-2
                        for(let a=0,la=data.parts.hair.tail[set].length;a<la;a++){
                            this.controlSpin(data.parts.hair.tail[set][a][0],direction,0)
                            this.controlSpin(data.parts.hair.tail[set][a][1],direction,0)
                            layer.translate(sin(direction*6+a*135)*0.3,0)
                            this.displayTrianglesFrontMerge(layer,data.parts.hair.tail[set][a][0],direction,24-a*5,4,1,0.48,
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),1),
                            this.displayTrianglesFrontMerge(layer,data.parts.hair.tail[set][a][1],direction,24-a*5,4,1,-0.48,
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),1)
                            layer.translate(sin(direction*6+a*135)*-0.3,0)
                        }
                        return layer
                }
            break
            case `Meri`:
                switch(type){
                    case 0:
                        layer=this.subSprite(200,300,100,100)
                        overlayer=this.subSprite(200,300,100,100)
                        this.controlSpin(data.parts.hair.inside,direction,0)
                        this.controlSpin(data.parts.hair.main,direction,0)
            			this.controlSpin(data.parts.hair.reverseInside,direction,0)
			            this.controlSpin(data.parts.hair.reverse,direction,0)
                        this.displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,33,1,-0.0225,data.color.hair.insideFront,data.color.hair.insideFront,1)
                        layer.arc(0,0,35,34,-180,0)
                        layer.line(-17.5,0,17.5,0)
                        this.displayTrianglesFrontMerge(layer,data.parts.hair.reverseInside,direction,1,34.5,0.2,0.1,-1,-1,1)
                        this.displayTrianglesFrontMerge(overlayer,data.parts.hair.main,direction,0,35,1,-0.015,data.color.hair.front,data.color.hair.front,1)
                        overlayer.arc(0,0,35,34,-180,0)
                        overlayer.line(-17.5,0,17.5,0)
                        this.displayTrianglesFrontMerge(overlayer,data.parts.hair.reverse,direction,1,34.5,0.2,0.1,-1,-1,1)
                        layer.image(overlayer,0,10,40,60)
                        return layer
                    case 1:
                        layer=this.subSprite(200,300,100,100)
                        this.displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,35,1,-0.0225,data.color.hair.back,data.color.hair.back,1)
                        this.displayTrianglesBackMerge(layer,data.parts.hair.inside,direction,0,33,1,-0.015,data.color.hair.insideBack,data.color.hair.insideBack,1)
                        return layer
                }
            break
            default:
                switch(type){
                    case 0:
                        layer=this.subSprite(200,200,100,100)
                        return layer
                }
            break
        }
    }
    generateGraphics(name){
        let data
        switch(name){
            case 'Shiru':
                data={
                    sprites:{
                        detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                        hair:{back:[],front:[],tail:[[],[]]},
                    },
                    parts:{
                        hair:{main:[
                            {spin:[-9,-3,-6],height:1},
                            {spin:[-3,9,6],height:1},

                            {spin:[-18,-12,-14],height:0.5},
                            {spin:[12,18,14],height:0.5},
                            {spin:[-24,-15,-19],height:1},
                            {spin:[15,24,19],height:1},
                            {spin:[-30,-24,-26],height:1.5},
                            {spin:[24,30,26],height:1.5},

                            {spin:[-51,-33,-42],height:2},
                            {spin:[33,51,42],height:2},
                            {spin:[-63,-45,-54],height:3},
                            {spin:[45,63,54],height:3},
                            {spin:[-90,-60,-75],height:4},
                            {spin:[60,90,75],height:4},

                            {spin:[-108,-84,-96],height:6},
                            {spin:[84,108,96],height:6},
                            {spin:[-81,-72,-78],height:8},
                            {spin:[72,81,78],height:8},
                            {spin:[-81,-72,-75],height:7},
                            {spin:[72,81,75],height:7},

                            {spin:[96,150,132],height:14},
                            {spin:[-150,-96,-132],height:14},
                            
                            {spin:[120,180,156],height:17},
                            {spin:[-180,-120,-156],height:17},

                            {spin:[120,-120,180],height:18},
                        ],inside:[
                            {spin:[-3,3,0],height:1.5},
                            
                            {spin:[-12,-6,-8],height:1},
                            {spin:[6,12,8],height:1},
                            {spin:[-18,-9,-13],height:0.5},
                            {spin:[9,18,13],height:0.5},
                            {spin:[-24,-18,-20],height:2},
                            {spin:[18,24,20],height:2},

                            {spin:[-54,-42,-48],height:2.5},
                            {spin:[42,54,48],height:2.5},
                            {spin:[-72,-60,-66],height:3.5},
                            {spin:[60,72,66],height:3.5},

                            {spin:[-93,-75,-84],height:7},
                            {spin:[75,93,84],height:7},
                            {spin:[-150,-90,-120],height:11},
                            {spin:[90,150,120],height:11},
                            {spin:[105,-165,165],height:12.5},
                            {spin:[165,-105,-165],height:12.5},
                        ],tail:[[],[]]}
                    },color:{
                        hair:{back:[182,202,209],front:[252,255,254],insideBack:[147,178,197],insideFront:[216,236,241],tail:{start:[211,238,245],end:[158,198,221]},glow:[255,255,255],bow:[88,90,123]},
                        skin:{head:[255,243,229],body:[247,251,235],legs:[251,247,239],arms:[253,237,225]},
                        eye:{back:[255,148,157],front:[61,0,5],glow:[255,238,236]},
                        mouth:{in:[254,194,166],out:[0,0,0]},
                        blush:[255,214,231],
                        dress:{main:[254,253,255],shawl:[239,237,238],inside:[88,91,129],highlight:[84,147,210],border:[49,100,192],tie:[89,95,97],bow:[[48,125,242],[216,242,255]],sleeve:[233,232,237]},
                    },
                    spin:{tail:[-114,114]}
                }
                for(let a=0,la=2;a<la;a++){
                    for(let b=0,lb=4;b<lb;b++){
                        data.parts.hair.tail[a].push([[],[]])
                        for(let c=0,lc=12;c<lc;c++){
                            data.parts.hair.tail[a][b][0].push({spin:[b*15+c*30-15,b*15+c*30+15,b*15+c*30],y:[0,0,-4]})
                            data.parts.hair.tail[a][b][1].push({spin:[b*15+c*30-15,b*15+c*30+15,b*15+c*30],y:[0,0,4]})
                        }
                    }
                }
                for(let a=0,la=data.sprites.genAmount;a<la;a++){
                    data.sprites.hair.front.push(this.generateSprite(`Shiru`,0,360*a/la,data))
                    data.sprites.hair.back.push(this.generateSprite(`Shiru`,1,360*a/la,data))
                }
                for(let a=0,la=2;a<la;a++){
                    for(let b=0,lb=data.sprites.genAmount;b<lb;b++){
                        data.sprites.hair.tail[a].push(this.generateSprite(`Shiru`,2+a,360*a/la,data))
                    }
                }
            break
            case 'Meri':
                data={
                    sprites:{
                        detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                        hair:{back:[],front:[]},
                    },
                    parts:{
                        hair:{main:[],inside:[],reverse:[],reverseInside:[],}
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
                    data.sprites.hair.front.push(this.generateSprite(`Meri`,0,360*a/la,data))
                    data.sprites.hair.back.push(this.generateSprite(`Meri`,1,360*a/la,data))
                }
            break
        
        }
        data.name=name
        this.data.push(data)
    }
    getData(name){
        for(let a=0,la=this.data.length;a<la;a++){
            if(this.data[a].name==name){
                return this.data[a]
            }
        }
    }
}