class graphicsPackage{
    constructor(name,generateSprite,generateGraphics,setupGraphics,display,displayComponent){
        this.name=name
        this.generateSprite=generateSprite
        this.generateGraphics=generateGraphics
        this.setupGraphics=setupGraphics
        this.display=display
        this.displayComponent=displayComponent
    }
}
class graphicsManager{
    constructor(){
        this.initialPackages()
        this.data=[
        ]
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
    generateGraphics(name){
        let data
        for(let a=0,la=this.packages.length;a<la;a++){
            if(this.packages[a].name.includes(name)){
                data=this.packages[a].generateGraphics(this)
            }
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
    getPackage(name){
        for(let a=0,la=this.packages.length;a<la;a++){
            if(this.packages[a].name.includes(name)){
                return this.packages[a]
            }
        }
    }
    initialPackages(){
        this.packages=[]
        this.packages.push(new graphicsPackage(
            [`Shiru`],
            function(parent,type,direction,data){
                let layer
                let overlayer
                switch(type){
                    case 0:
                        layer=parent.subSprite(200,300,100,100)
                        parent.controlSpin(data.parts.hair.inside,direction,0)
                        parent.displayTrianglesFront(layer,data.parts.hair.inside,direction,0,33,1,-0.06,data.color.hair.insideFront,1)
                        parent.controlSpin(data.parts.hair.main,direction,0)
                        parent.displayTrianglesFront(layer,data.parts.hair.main,direction,0,35,1,-0.03,data.color.hair.front,1)
                        layer.arc(0,0,35,34,-180,0)
                        layer.line(-17.5,0,17.5,0)
                        return layer
                    case 1:
                        layer=parent.subSprite(200,300,100,100)
                        parent.displayTrianglesBack(layer,data.parts.hair.main,direction,0,35,1,-0.06,data.color.hair.back,1)
                        parent.displayTrianglesBack(layer,data.parts.hair.inside,direction,0,33,1,-0.03,data.color.hair.insideBack,1)
                        return layer
                    case 2: case 3:
                        layer=parent.subSprite(120,360,60,0)
                        let set=type-2
                        for(let a=0,la=data.parts.hair.tail[set].length;a<la;a++){
                            parent.controlSpin(data.parts.hair.tail[set][a][0],direction,0)
                            parent.controlSpin(data.parts.hair.tail[set][a][1],direction,0)
                            layer.translate(sin(direction*6+a*135)*0.3,0)
                            parent.displayTrianglesFrontMerge(layer,data.parts.hair.tail[set][a][0],direction,24-a*5,4,1,0.48,
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),1),
                            parent.displayTrianglesFrontMerge(layer,data.parts.hair.tail[set][a][1],direction,24-a*5,4,1,-0.48,
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),cos(direction+data.spin.tail[0])*20,[1,1,1]),1)
                            layer.translate(sin(direction*6+a*135)*-0.3,0)
                        }
                        return layer
                }
            },function(parent){
                let data={
                    sprites:{
                        detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                        hair:{back:[],front:[],tail:[[],[]]},
                    },parts:{
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
                    data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
                    data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
                }
                for(let a=0,la=2;a<la;a++){
                    for(let b=0,lb=data.sprites.genAmount;b<lb;b++){
                        data.sprites.hair.tail[a].push(this.generateSprite(parent,2+a,360*a/la,data))
                    }
                }
                return data
            },function(){
                let colorBase=this.graphicManager.getData(this.name).color
                this.components=this.standardModel(
                    0,
                    15.5,[{x:-3,y:-31,z:0},{x:3,y:-31,z:0}],[{x:-3.5,y:-53,z:0},{x:3.5,y:-53,z:0}],
                    [-44.5,-72,-64,-67.75,-67.75,-63.5,-63.5],[[9,28],[28,28]],{x:8,y:3.5,open:0,wide:36},[18,18,30,30]
                )
                this.components.hair.tail=[{display:true,fade:1,spin:-114},{display:true,fade:1,spin:114}]
                this.components.hair.bow=[{display:true,fade:1,spin:-96},{display:true,fade:1,spin:96}]
                this.components.dress={
                    display:{main:true,sleeve:[true,true]},
                    fade:{main:1,sleeve:[1,1]},
                    color:colorBase.dress,
                    bow:{display:true,fade:1,color:colorBase.dress.bow,spin:0},
                }
                this.routines.calculatePart=[0,1,2,3]
            },function(){
                for(let a=0,la=2;a<la;a++){
                    if(this.components.hair.bow[a].display){
                        let dir=this.components.hair.bow[a].spin+this.direction.main
                        if(lcos(dir)<=0){
                            this.layer.translate(lsin(dir)*16,-80)
                            this.layer.scale(lcos(dir)*0.6+0.4,1)
                            this.layer.fill(...this.flashColor(this.components.hair.color.bow),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.noStroke()
                            this.layer.ellipse(0,0,2)
                            this.layer.quad(0.5,-0.5,-5,2.75,-3.75,3.75,-2.75,5)
                            this.layer.quad(-0.5,-0.5,5,2.75,3.75,3.75,2.75,5)
                            this.layer.scale(1/(lcos(dir)*0.6+0.4),1)
                            this.layer.translate(lsin(dir)*-16,80)
                        }
                    }
                }
                if(this.components.hair.display.back){
                    let size=this.fade.main*this.components.hair.fade.back
                    this.layer.image(this.graphicManager.getData(this.name).sprites.hair.back[this.sprites.spinDetail],0,this.components.head.level+10*size,40*size,60*size)
                }
                for(let a=0,la=2;a<la;a++){
                    let dir=this.components.hair.tail[a].spin+this.direction.main
                    if(this.components.hair.tail[a]&&lcos(dir)<=0){
                        this.layer.translate(lsin(dir)*16,-50)
                        this.layer.rotate(lsin(dir)*-12)
                        this.layer.image(this.graphicManager.getData(this.name).sprites.hair.tail[a][this.sprites.spinDetail],0,5*this.fade.main*this.components.hair.tail[a].fade,20*this.fade.main*this.components.hair.tail[a].fade,60*this.fade.main*this.components.hair.tail[a].fade)
                        this.layer.rotate(lsin(dir)*12)
                        this.layer.translate(lsin(dir)*-16,50)
                    }
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
                    let part=this.components.legs[this.components.legs[0].appear.bottom.z<=this.components.legs[1].appear.bottom.z?a:1-a]
                    if(part.display){
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
                if(this.components.dress.bow.display&&lcos(this.direction.main+this.components.dress.bow.spin)<=0){
                    let part=this.components.dress.bow

                    this.layer.push()
                    this.layer.translate(lsin(this.direction.main+part.spin)*5.5,-55)
                    this.layer.rotate(lsin(this.direction.main+part.spin)*-15)
                    this.layer.scale(lcos(this.direction.main+part.spin),1)
                    this.layer.noStroke()

                    let flashes=[this.flashColor(part.color[0]),this.flashColor(part.color[1])]
                    
                    this.layer.fill(flashes[0][0]-30,flashes[0][1]-30,flashes[0][2]-30,this.fade.main*part.fade)
                    this.layer.rotate(-24)
                    this.layer.quad(0,0,-1,6,0,5,1,6)
                    this.layer.rotate(48)
                    this.layer.quad(0,0,-1,6,0,5,1,6)
                    this.layer.rotate(-24)
                    this.layer.fill(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    pentagon(this.layer,0.8,0,-0.8,0,-2.4,6,0,5.25,2.4,6)
                    this.layer.rotate(162)
                    pentagon(this.layer,0.8,0,-0.8,0,-2.4,6,0,5.25,2.4,6)
                    this.layer.rotate(-81)

                    this.layer.fill(flashes[1][0]-30,flashes[1][1]-30,flashes[1][2]-30,this.fade.main*part.fade)
                    this.layer.rotate(-24)
                    this.layer.quad(0,-0.1,-0.8,4.8,0,4,0.8,4.8)
                    this.layer.rotate(48)
                    this.layer.quad(0,-0.1,-0.8,4.8,0,4,0.8,4.8)
                    this.layer.rotate(-24)
                    this.layer.fill(...this.flashColor(part.color[1]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    pentagon(this.layer,0.85,0,-0.85,0,-2.08,4.8,0,4.2,2.08,4.8)
                    this.layer.rotate(162)
                    pentagon(this.layer,0.85,0,-0.85,0,-2.08,4.8,0,4.2,2.08,4.8)
                    this.layer.rotate(-81)

                    this.layer.fill(flashes[0][0]-30,flashes[0][1]-30,flashes[0][2]-30,this.fade.main*part.fade)
                    this.layer.rotate(-24)
                    this.layer.quad(0,-0.2,-0.7,4.2,0,3.5,0.7,4.2)
                    this.layer.rotate(48)
                    this.layer.quad(0,-0.2,-0.7,4.2,0,3.5,0.7,4.2)
                    this.layer.rotate(-24)
                    this.layer.fill(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    pentagon(this.layer,0.9,0,-0.9,0,-1.92,4.2,0,3.675,1.92,4.2)
                    this.layer.rotate(162)
                    pentagon(this.layer,0.9,0,-0.9,0,-1.92,4.2,0,3.675,1.92,4.2)
                    this.layer.rotate(-81)

                    this.layer.fill(...this.flashColor(part.color[1]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    this.layer.quad(0.2,0,-0.2,0,-1.6,5.75,-1.1,5.5)
                    this.layer.quad(-0.2,0,0.2,0,1.6,5.75,1.1,5.5)
                    this.layer.rotate(162)
                    this.layer.quad(0.2,0,-0.2,0,-1.6,5.75,-1.1,5.5)
                    this.layer.quad(-0.2,0,0.2,0,1.6,5.75,1.1,5.5)
                    this.layer.rotate(-81)
                    this.layer.fill(flashes[0][0]-15,flashes[0][1]-15,flashes[0][2]-15,this.fade.main*part.fade)
                    this.layer.rect(0,0,2.5,2.5,0.5)
                    this.layer.fill(flashes[1][0]-15,flashes[1][1]-15,flashes[1][2]-15,this.fade.main*part.fade)
                    this.layer.rect(0,0,2.5,0.5)
                    this.layer.rect(0,0,0.5,2.5)

                    this.layer.pop()
                }
                if(this.components.dress.display.main){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.dress.color.inside),this.fade.main*this.components.dress.fade.main)
                    for(let a=0,la=16;a<la;a++){
                        if(lcos((a+0.5)/la*360+this.direction.main)>0){
                            this.layer.arc(11.7*lsin((a+0.5)/la*360+this.direction.main),-27.25,4*lcos((a+0.5)/la*360+this.direction.main),3.5,0,180)
                        }
                    }
                    this.layer.fill(...this.flashColor(this.components.dress.color.main),this.fade.main*this.components.dress.fade.main)
                    this.layer.arc(0,-35,11,42,-180,0)
                    this.layer.quad(-5.5,-36,5.5,-36,12,-27,-12,-27)
                    for(let a=0,la=16;a<la;a++){
                        if(lcos(a/la*360+this.direction.main)>0){
                            this.layer.arc(11.7*lsin(a/la*360+this.direction.main),-27.25,5*lcos(a/la*360+this.direction.main),4,0,180)
                        }
                    }
                    this.layer.stroke(...this.flashColor(this.components.dress.color.highlight),this.fade.main*this.components.dress.fade.main)
                    this.layer.strokeWeight(0.25)
                    for(let a=0,la=16;a<la;a++){
                        if(lcos(a/la*360+this.direction.main)>0){
                            this.layer.arc(10.8*lsin(a/la*360+this.direction.main),-28.5,4.5*lcos(a/la*360+this.direction.main),2,10,170)
                        }
                    }
                    this.layer.stroke(...this.flashColor(this.components.dress.color.border),this.fade.main*this.components.dress.fade.main)
                    this.layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        if(lcos(this.direction.main-22.5+a*45)>0){
                            this.layer.line(5.4*lsin(this.direction.main-22.5+a*45),-37,3.9*lsin(this.direction.main-22.5+a*45),-52)
                            if(a==0){
                                this.layer.line(5.4*lsin(this.direction.main-22.5+a*45),-37,-5.4,-37)
                            }else if(a==1){
                                this.layer.line(5.4*lsin(this.direction.main-22.5+a*45),-37,5.4,-37)
                            }
                        }
                    }
                    if(lcos(this.direction.main-22.5)<=0&&lcos(this.direction.main+22.5)<=0){
                        this.layer.line(-5.4,-37,5.4,-37)
                    }
                    this.layer.strokeWeight(0.3)
                    if(lcos(this.direction.main-22.5)>0&&lcos(this.direction.main+22.5)>0){
                        for(let a=0,la=4;a<la;a++){
                            this.layer.line((5.1-a*0.25)*lsin(this.direction.main-22.5),-40-a*2.5,(5.35-a*0.25)*lsin(this.direction.main+22.5),-37.5-a*2.5)
                            this.layer.line((5.35-a*0.25)*lsin(this.direction.main-22.5),-37.5-a*2.5,(5.1-a*0.25)*lsin(this.direction.main+22.5),-40-a*2.5)
                        }
                    }else if(lcos(this.direction.main-22.5)>0){
                        for(let a=0,la=4;a<la;a++){
                            this.layer.line((5.1-a*0.25)*lsin(this.direction.main-22.5),-40-a*2.5,5.4-a*0.25,-37.5-a*2.5)
                            this.layer.line((5.35-a*0.25)*lsin(this.direction.main-22.5),-37.5-a*2.5,5.4-a*0.25,-40-a*2.5)
                        }
                    }else if(lcos(this.direction.main+22.5)>0){
                        for(let a=0,la=4;a<la;a++){
                            this.layer.line((5.1-a*0.25)*lsin(this.direction.main+22.5),-40-a*2.5,-5.4+a*0.25,-37.5-a*2.5)
                            this.layer.line((5.35-a*0.25)*lsin(this.direction.main+22.5),-37.5-a*2.5,-5.4+a*0.25,-40-a*2.5)
                        }
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
                        if(this.components.dress.display.sleeve[a]){
                            this.displayComponent(1,[a])
                        }
                    }
                }
                if(this.components.dress.display.main){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.dress.color.shawl),this.fade.main*this.components.dress.fade.main)
                    this.layer.arc(0,-47,18,21,-180,0)
                    for(let a=0,la=20;a<la;a++){
                        if(lcos(a/la*360+this.direction.main)>0){
                            this.layer.arc(8.9*lsin(a/la*360+this.direction.main),-47.25,3*lcos(a/la*360+this.direction.main),2,0,180)
                        }
                    }
                    this.layer.stroke(...this.flashColor(this.components.dress.color.highlight),this.fade.main*this.components.dress.fade.main)
                    this.layer.strokeWeight(0.25)
                    for(let a=0,la=20;a<la;a++){
                        if(lcos(a/la*360+this.direction.main)>0){
                            this.layer.arc(8.75*lsin(a/la*360+this.direction.main),-49,3*lcos(a/la*360+this.direction.main),2,10,170)
                        }
                    }
                    this.layer.arc(0,-57,8,4,8,172)
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.dress.fade.main)
                    this.layer.ellipse(0,-57,4,1)
                }
                if(this.components.dress.bow.display&&lcos(this.direction.main+this.components.dress.bow.spin)>0){
                    let part=this.components.dress.bow

                    this.layer.push()
                    this.layer.translate(lsin(this.direction.main+part.spin)*5.5,-55)
                    this.layer.rotate(lsin(this.direction.main+part.spin)*-15)
                    this.layer.scale(lcos(this.direction.main+part.spin),1)
                    this.layer.noStroke()

                    let flashes=[this.flashColor(part.color[0]),this.flashColor(part.color[1])]
                    
                    this.layer.fill(flashes[0][0]-30,flashes[0][1]-30,flashes[0][2]-30,this.fade.main*part.fade)
                    this.layer.rotate(-24)
                    this.layer.quad(0,0,-1,6,0,5,1,6)
                    this.layer.rotate(48)
                    this.layer.quad(0,0,-1,6,0,5,1,6)
                    this.layer.rotate(-24)
                    this.layer.fill(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    pentagon(this.layer,0.8,0,-0.8,0,-2.4,6,0,5.25,2.4,6)
                    this.layer.rotate(162)
                    pentagon(this.layer,0.8,0,-0.8,0,-2.4,6,0,5.25,2.4,6)
                    this.layer.rotate(-81)

                    this.layer.fill(flashes[1][0]-30,flashes[1][1]-30,flashes[1][2]-30,this.fade.main*part.fade)
                    this.layer.rotate(-24)
                    this.layer.quad(0,-0.1,-0.8,4.8,0,4,0.8,4.8)
                    this.layer.rotate(48)
                    this.layer.quad(0,-0.1,-0.8,4.8,0,4,0.8,4.8)
                    this.layer.rotate(-24)
                    this.layer.fill(...this.flashColor(part.color[1]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    pentagon(this.layer,0.85,0,-0.85,0,-2.08,4.8,0,4.2,2.08,4.8)
                    this.layer.rotate(162)
                    pentagon(this.layer,0.85,0,-0.85,0,-2.08,4.8,0,4.2,2.08,4.8)
                    this.layer.rotate(-81)

                    this.layer.fill(flashes[0][0]-30,flashes[0][1]-30,flashes[0][2]-30,this.fade.main*part.fade)
                    this.layer.rotate(-24)
                    this.layer.quad(0,-0.2,-0.7,4.2,0,3.5,0.7,4.2)
                    this.layer.rotate(48)
                    this.layer.quad(0,-0.2,-0.7,4.2,0,3.5,0.7,4.2)
                    this.layer.rotate(-24)
                    this.layer.fill(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    pentagon(this.layer,0.9,0,-0.9,0,-1.92,4.2,0,3.675,1.92,4.2)
                    this.layer.rotate(162)
                    pentagon(this.layer,0.9,0,-0.9,0,-1.92,4.2,0,3.675,1.92,4.2)
                    this.layer.rotate(-81)

                    this.layer.fill(...this.flashColor(part.color[1]),this.fade.main*part.fade)
                    this.layer.rotate(-81)
                    this.layer.quad(0.2,0,-0.2,0,-1.6,5.75,-1.1,5.5)
                    this.layer.quad(-0.2,0,0.2,0,1.6,5.75,1.1,5.5)
                    this.layer.rotate(162)
                    this.layer.quad(0.2,0,-0.2,0,-1.6,5.75,-1.1,5.5)
                    this.layer.quad(-0.2,0,0.2,0,1.6,5.75,1.1,5.5)
                    this.layer.rotate(-81)
                    this.layer.fill(flashes[0][0]-15,flashes[0][1]-15,flashes[0][2]-15,this.fade.main*part.fade)
                    this.layer.rect(0,0,2.5,2.5,0.5)
                    this.layer.fill(flashes[1][0]-15,flashes[1][1]-15,flashes[1][2]-15,this.fade.main*part.fade)
                    this.layer.rect(0,0,2.5,0.5)
                    this.layer.rect(0,0,0.5,2.5)

                    this.layer.pop()
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
                for(let a=0,la=2;a<la;a++){
                    let dir=this.components.hair.tail[a].spin+this.direction.main
                    if(this.components.hair.tail[a]&&lcos(dir)>0){
                        this.layer.translate(lsin(dir)*16,-50)
                        this.layer.rotate(lsin(dir)*-12)
                        this.layer.image(this.graphicManager.getData(this.name).sprites.hair.tail[a][this.sprites.spinDetail],0,5*this.fade.main*this.components.hair.tail[a].fade,20*this.fade.main*this.components.hair.tail[a].fade,60*this.fade.main*this.components.hair.tail[a].fade)
                        this.layer.rotate(lsin(dir)*12)
                        this.layer.translate(lsin(dir)*-16,50)
                    }
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
                        this.layer.arc(0,this.components.head.level,this.components.head.dimensions[0]+a,this.components.head.dimensions[1]+a,-72+a*6,-12-a*6)
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.components.hair.bow[a].display){
                        let dir=this.components.hair.bow[a].spin+this.direction.main
                        if(lcos(dir)>0){
                            this.layer.translate(lsin(dir)*16,-80)
                            this.layer.scale(lcos(dir)*0.6+0.4,1)
                            this.layer.fill(...this.flashColor(this.components.hair.color.bow),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.noStroke()
                            this.layer.ellipse(0,0,2)
                            this.layer.quad(0.5,-0.5,-5,2.75,-3.75,3.75,-2.75,5)
                            this.layer.quad(-0.5,-0.5,5,2.75,3.75,3.75,2.75,5)
                            this.layer.scale(1/(lcos(dir)*0.6+0.4),1)
                            this.layer.translate(lsin(dir)*-16,80)
                        }
                    }
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
                        dir=atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y)
                        sc=[lsin(dir+90),lcos(dir+90)]
                        this.layer.noStroke()
                        this.layer.fill(...this.flashColor(this.components.dress.color.sleeve),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                        this.layer.beginShape()
                        this.layer.vertex(
                            loc[1].x+2.1*sc[0],
                            loc[1].y+2.1*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.45+loc[2].x*0.55+3.6*sc[0],
                            loc[1].y*0.45+loc[2].y*0.55+3.6*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.3+loc[2].x*0.7+2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7+2.4*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.15+loc[2].x*0.85+2.7*sc[0],
                            loc[1].y*0.15+loc[2].y*0.85+2.7*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.25+loc[2].x*0.75+0.9*sc[0],
                            loc[1].y*0.25+loc[2].y*0.75+0.9*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.15+loc[2].x*0.85,
                            loc[1].y*0.15+loc[2].y*0.85)
                        this.layer.vertex(
                            loc[1].x*0.25+loc[2].x*0.75-0.9*sc[0],
                            loc[1].y*0.25+loc[2].y*0.75-0.9*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.15+loc[2].x*0.85-2.7*sc[0],
                            loc[1].y*0.15+loc[2].y*0.85-2.7*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.3+loc[2].x*0.7-2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7-2.4*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.45+loc[2].x*0.55-3.6*sc[0],
                            loc[1].y*0.45+loc[2].y*0.55-3.6*sc[1])
                        this.layer.vertex(
                            loc[1].x-2.1*sc[0],
                            loc[1].y-2.1*sc[1])
                        this.layer.endShape()
                        this.layer.ellipse(loc[1].x,loc[1].y,4.5)
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
                        dir=atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y)
                        sc=[lsin(dir+90),lcos(dir+90)]
                        this.layer.stroke(...this.flashColor(this.components.dress.color.tie),this.fade.main*this.components.dress.fade.sleeve[[args[0]]])
                        this.layer.strokeWeight(0.5)
                        this.layer.line(
                            loc[1].x*0.3+loc[2].x*0.7+2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7+2.4*sc[1],
                            loc[1].x*0.3+loc[2].x*0.7-2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7-2.4*sc[1])
                    break
                    case 1:
                        loc=[
                            this.components.arms[args[0]].appear.top,
                            this.components.arms[args[0]].appear.middle,
                            this.components.arms[args[0]].appear.bottom
                        ]
                        dir=atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y)
                        sc=[lsin(dir+90),lcos(dir+90)]
                        this.layer.noStroke()
                        this.layer.fill(...this.flashColor(this.components.dress.color.sleeve),this.fade.main*this.components.dress.fade.sleeve[args[0]])
                        this.layer.beginShape()
                        this.layer.vertex(
                            loc[1].x+2.1*sc[0],
                            loc[1].y+2.1*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.45+loc[2].x*0.55+3.6*sc[0],
                            loc[1].y*0.45+loc[2].y*0.55+3.6*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.3+loc[2].x*0.7+2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7+2.4*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.15+loc[2].x*0.85+2.7*sc[0],
                            loc[1].y*0.15+loc[2].y*0.85+2.7*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.25+loc[2].x*0.75+0.9*sc[0],
                            loc[1].y*0.25+loc[2].y*0.75+0.9*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.15+loc[2].x*0.85,
                            loc[1].y*0.15+loc[2].y*0.85)
                        this.layer.vertex(
                            loc[1].x*0.25+loc[2].x*0.75-0.9*sc[0],
                            loc[1].y*0.25+loc[2].y*0.75-0.9*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.15+loc[2].x*0.85-2.7*sc[0],
                            loc[1].y*0.15+loc[2].y*0.85-2.7*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.3+loc[2].x*0.7-2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7-2.4*sc[1])
                        this.layer.vertex(
                            loc[1].x*0.45+loc[2].x*0.55-3.6*sc[0],
                            loc[1].y*0.45+loc[2].y*0.55-3.6*sc[1])
                        this.layer.vertex(
                            loc[1].x-2.1*sc[0],
                            loc[1].y-2.1*sc[1])
                        this.layer.endShape()
                        this.layer.ellipse(loc[1].x,loc[1].y,4.5)
                        dir=atan2(loc[1].x-loc[2].x,loc[1].y-loc[2].y)
                        sc=[lsin(dir+90),lcos(dir+90)]
                        this.layer.stroke(...this.flashColor(this.components.dress.color.tie),this.fade.main*this.components.dress.fade.sleeve[[args[0]]])
                        this.layer.strokeWeight(0.5)
                        this.layer.line(
                            loc[1].x*0.3+loc[2].x*0.7+2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7+2.4*sc[1],
                            loc[1].x*0.3+loc[2].x*0.7-2.4*sc[0],
                            loc[1].y*0.3+loc[2].y*0.7-2.4*sc[1])
                    break
                    
                }
            },
        ))
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
                }
            },function(parent){
                let data={
                    sprites:{
                        detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                        hair:{back:[],front:[]},
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
                                {spin:[-93,-69,-84],height:19},
                                {spin:[69,93,84],height:19},
                                {spin:[-123,-99,-114],height:22},
                                {spin:[99,123,114],height:22},
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
                                {spin:[-108,-84,-99],height:17},
                                {spin:[84,108,99],height:17},
                            ]
                        }
                    },color:{
                        hair:{back:[185,191,104],front:[211,216,127],insideBack:[117,123,90],insideFront:[154,155,98],glow:[228,239,181],bow:[[234,200,116],[203,130,68]]},
                        skin:{head:[250,235,193],body:[250,228,186],legs:[247,241,189],arms:[249,236,192]},
                        eye:{back:[45,74,118],front:[47,53,77],glow:[176,188,183]},
                        mouth:{in:[235,168,126],out:[0,0,0]},
                        blush:[232,157,122],
                        dress:{under:[254,249,226],over:[88,127,166],stripe:[243,238,230],tie:[238,233,143]},
                        wing:{back:[250,237,214],front:[86,53,57]},
                    },
                }
                for(let a=0,la=data.sprites.genAmount;a<la;a++){
                    data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
                    data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
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
                this.components.hair.bow={display:true,fade:1,color:colorBase.hair.bow,spin:93,level:-76}
                this.components.wing={
                    display:true,fade:1,
                    color:colorBase.wing,
                    anim:{size:0,lift:2}
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
                if(this.components.hair.bow.display&&lcos(this.direction.main+this.components.hair.bow.spin)<=0){
                    let part=this.components.hair.bow
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
                            this.layer.arc(10.6*lsin((a+0.5)/la*360+this.direction.main)*part.anim.wide,-24.25+lcos((a+0.5)/la*360+this.direction.main)-part.anim.lift,6*lcos((a+0.5)/la*360+this.direction.main)*part.anim.wide,2.4,-15,195)
                        }
                    }
                    this.layer.fill(...this.flashColor(part.color.over),this.fade.main*part.fade.main)
                    this.layer.quad(-5,-49,5,-49,6,-35,-6,-35)
                    this.layer.quad(-6,-36,6,-36,11*part.anim.wide,-24-part.anim.lift,-11*part.anim.wide,-24-part.anim.lift)
                    this.layer.arc(0,-24-part.anim.lift,22*part.anim.wide,2,0,180)
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
                            this.layer.arc(10.6*lsin(a/la*360+this.direction.main)*part.anim.wide,-24.25+lcos(a/la*360+this.direction.main)-part.anim.lift,6*lcos(a/la*360+this.direction.main)*part.anim.wide,2,-15,195)
                        }
                    }
                    this.layer.fill(...this.flashColor(part.color.stripe),this.fade.main*part.fade.main)
                    this.layer.beginShape()
                    this.layer.vertex(-1-9.5*part.anim.wide,-25.2-part.anim.lift)
                    this.layer.vertex(-1-9.7*part.anim.wide,-24.72-part.anim.lift)
                    this.layer.bezierVertex(-7*part.anim.wide,-23.97-part.anim.lift,7*part.anim.wide,-23.97-part.anim.lift,1+9.7*part.anim.wide,-24.72-part.anim.lift)
                    this.layer.vertex(1+9.5*part.anim.wide,-25.2-part.anim.lift)
                    this.layer.bezierVertex(7*part.anim.wide,-24.45-part.anim.lift,-7*part.anim.wide,-24.45-part.anim.lift,-1-9.5*part.anim.wide,-25.2-part.anim.lift)
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
                    this.layer.translate(lsin(this.direction.main+part.spin)*18,part.level)
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
                if(this.components.dress.display.main){
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
                    }else if(part.display&&part.appear.bottom.z>2){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                        if(this.components.dress.display.sleeve[a]){
                            this.displayComponent(1,[a])
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
                let loc=[]
                switch(type){
                    case 0:
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
                    case 1:
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
                        overlayer=parent.subSprite(200,300,100,100)
                        parent.displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,35,1,-0.0225,data.color.hair.back,data.color.hair.back,1)
                        layer.arc(0,0,35,34,-180,0)
                        layer.line(-17.5,0,17.5,0)
                        parent.displayTrianglesBackMerge(overlayer,data.parts.hair.inside,direction,0,33,1,-0.015,data.color.hair.insideBack,data.color.hair.insideBack,1)
                        overlayer.arc(0,0,35,34,-180,0)
                        overlayer.line(-17.5,0,17.5,0)
                        parent.displayTrianglesBackMerge(overlayer,data.parts.hair.reverseInside,direction,1,34.5,0.2,0.1,-1,-1,1)
                        layer.image(overlayer,0,10,40,60)
                        return layer
                }
            },function(parent){
                let data={
                    sprites:{
                        detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                        hair:{back:[],front:[]},
                    },parts:{
                        hair:{main:[],inside:[],reverse:[],reverseInside:[]}
                    },color:{
                        hair:{back:[50,50,70],front:[70,70,90],insideBack:[40,40,60],insideFront:[60,60,80],glow:[245,230,245]},
                        skin:{head:[223,214,197],body:[200,186,177],legs:[224,234,243],arms:[235,233,221]},
                        eye:{back:[203,183,210],front:[65,76,108],glow:[222,227,223]},
                        mouth:{in:[191,125,127],out:[0,0,0]},
                        blush:[247,204,229],
                        dress:{
                            main:[137,106,172],highlight:[188,207,221],over:[122,92,163],sleeve:[154,135,192],stripe:[170,182,208],
                            inside:[147,154,198],insideHighlight:[174,171,198],insideOver:[141,139,190],bow:[[253,253,253],[205,226,243]],tie:[112,59,127]
                        },
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
                    0,
                    16.25,[{x:-3,y:-32.5,z:0},{x:3,y:-32.5,z:0}],[{x:-3.25,y:-57.5,z:0},{x:3.25,y:-57.5,z:0}],
                    [-46.5,-78,-71.75,-75.75,-75.75,-71.5,-71.5],[[11,34],[30,30]],{x:8,y:5,open:0,wide:39},[18,18,30,30]
                )
                this.components.dress={
                    display:{main:true,sleeve:[true,true]},
                    fade:{main:1,sleeve:[1,1]},
                    color:colorBase.dress,
                    anim:{reverse:false,wide:1,lift:2},
                    bow:{
                        display:true,fade:1,color:colorBase.dress.bow,spin:180,
                        anim:{size:1,length:1,fall:1,swivel:1}
                    },
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
                    this.layer.stroke(...this.flashColor(part.color[1]),this.fade.main*part.fade)
                    for(let a=0,la=15*part.anim.length;a<la;a++){
                        this.layer.strokeWeight(1.5+a/la*1.2)
                        this.layer.line(
                            6.75*lsin(part.spin+this.direction.main)-a*(1+0.25*lsin(a/la*480*part.anim.swivel[0]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+a*1.5*part.anim.fall,
                            6.75*lsin(part.spin+this.direction.main)-(a+1)*(1+0.25*lsin((a+1)/la*480*part.anim.swivel[0]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+(a+1)*1.5*part.anim.fall
                        )
                    }
                    for(let a=0,la=15*part.anim.length;a<la;a++){
                        this.layer.strokeWeight(1.5+a/la*1.2)
                        this.layer.line(
                            6.75*lsin(part.spin+this.direction.main)+a*(1+0.25*lsin((a+2.5)/la*480*part.anim.swivel[1]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+a*1.5*part.anim.fall,
                            6.75*lsin(part.spin+this.direction.main)+(a+1)*(1+0.25*lsin((a+3.5)/la*480*part.anim.swivel[1]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+(a+1)*1.5*part.anim.fall
                        )
                    }
                    this.layer.fill(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.stroke(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.strokeWeight(1)
                    this.layer.strokeJoin(ROUND)
                    this.layer.triangle(
                        6.75*lsin(part.spin+this.direction.main),-46,
                        6.75*lsin(part.spin+this.direction.main)-7*lcos(part.spin+this.direction.main)*part.anim.size,-46-2.5*part.anim.size,
                        6.75*lsin(part.spin+this.direction.main)-6.5*lcos(part.spin+this.direction.main)*part.anim.size,-46+3.5*part.anim.size
                    )
                    this.layer.triangle(
                        6.75*lsin(part.spin+this.direction.main),-46,
                        6.75*lsin(part.spin+this.direction.main)+7*lcos(part.spin+this.direction.main)*part.anim.size,-46-2.5*part.anim.size,
                        6.75*lsin(part.spin+this.direction.main)+6.5*lcos(part.spin+this.direction.main)*part.anim.size,-46+3.5*part.anim.size
                    )
                    this.layer.strokeJoin(MITER)
                }
                if(this.components.dress.display.main&&this.components.dress.anim.reverse){
                    let part=this.components.dress
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(part.color.insideHighlight),this.fade.main*part.fade.main)
                    for(let a=0,la=18;a<la;a++){
                        if(lcos(a/la*360)>0){
                            this.layer.push()
                            this.layer.translate(13.5*lsin((a-0.2)/la*360)*part.anim.wide,-24.5+4*lcos((a-0.2)/la*360)-part.anim.lift)
                            this.layer.rotate(-(18+3*part.anim.lift)*lsin(lsin((a-0.2)/la*360)*90)*part.anim.wide)
                            this.layer.ellipse(0,0,3.25*lcos((a-0.2)/la*360)*part.anim.wide,4.5)
                            this.layer.pop()
                            this.layer.push()
                            this.layer.translate(13.5*lsin((a+0.2)/la*360)*part.anim.wide,-24.5+4*lcos((a+0.2)/la*360)-part.anim.lift)
                            this.layer.rotate(-(18+3*part.anim.lift)*lsin(lsin((a+0.2)/la*360)*90)*part.anim.wide)
                            this.layer.ellipse(0,0,3.25*lcos((a+0.2)/la*360)*part.anim.wide,4.5)
                            this.layer.pop()
                        }
                    }
                    this.layer.fill(...this.flashColor(part.color.inside),this.fade.main*part.fade.main)
                    this.layer.ellipse(0,-24-part.anim.lift,28*part.anim.wide,8)
                    this.layer.quad(-6,-44,6,-44,14*part.anim.wide,-24-part.anim.lift,-14*part.anim.wide,-24-part.anim.lift)
                    this.layer.fill(...this.flashColor(part.color.insideOver),this.fade.main*part.fade.main)
                    for(let a=0,la=15;a<la;a++){
                        if(lcos((a-0.16)/la*360)>0){
                            this.layer.triangle(
                                6*lsin((a-0.16)/la*360),-45.5+lcos((a-0.16)/la*360)*2,
                                14*lsin((a-0.24)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a-0.24)/la*360)**2)-part.anim.lift,
                                14*lsin((a-0.08)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a-0.08)/la*360)**2)-part.anim.lift
                            )
                        }
                        if(lcos((a+0.16)/la*360)>0){
                            this.layer.triangle(
                                6*lsin((a+0.16)/la*360),-45.5+lcos((a+0.16)/la*360)*2,
                                14*lsin((a+0.24)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a+0.24)/la*360)**2)-part.anim.lift,
                                14*lsin((a+0.08)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a+0.08)/la*360)**2)-part.anim.lift
                            )
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
                            if(part.anim.reverse){
                                this.layer.translate(13.25*lsin((a-0.2)/la*360)*part.anim.wide,-24.5-4*lcos((a-0.2)/la*360)-part.anim.lift)
                            }else{
                                this.layer.translate(13.75*lsin((a-0.2)/la*360)*part.anim.wide,-24.5+4*lcos((a-0.2)/la*360)-part.anim.lift)
                            }
                            this.layer.rotate(-(18+3*part.anim.lift)*lsin(lsin((a-0.2)/la*360)*90)*part.anim.wide)
                            this.layer.ellipse(0,0,3.25*lcos((a-0.2)/la*360)*part.anim.wide,4.5)
                            this.layer.pop()
                            this.layer.push()
                            if(part.anim.reverse){
                                this.layer.translate(13.25*lsin((a+0.2)/la*360)*part.anim.wide,-24.5-4*lcos((a+0.2)/la*360)-part.anim.lift)
                            }else{
                                this.layer.translate(13.75*lsin((a+0.2)/la*360)*part.anim.wide,-24.5+4*lcos((a+0.2)/la*360)-part.anim.lift)
                            }
                            this.layer.rotate(-(18+3*part.anim.lift)*lsin(lsin((a+0.2)/la*360)*90)*part.anim.wide)
                            this.layer.ellipse(0,0,3.25*lcos((a+0.2)/la*360)*part.anim.wide,4.5)
                            this.layer.pop()
                        }
                    }
                    this.layer.fill(...this.flashColor(part.color.main),this.fade.main*part.fade.main)
                    if(part.anim.reverse){
                        this.layer.beginShape()
                        this.layer.vertex(-6,-44)
                        this.layer.vertex(6,-44)
                        this.layer.vertex(14*part.anim.wide,-24-part.anim.lift)
                        this.layer.bezierVertex(11*part.anim.wide,-29.25-part.anim.lift,-11*part.anim.wide,-29.25-part.anim.lift,-14*part.anim.wide,-24-part.anim.lift)
                        this.layer.endShape()
                    }else{
                        this.layer.ellipse(0,-24,28,8)
                        this.layer.quad(-6,-44,6,-44,14,-24,-14,-24)
                    }
                    this.layer.arc(0,-44,12,40,-180,0)
                    this.layer.ellipse(0,-44,12,2)
                    if(part.anim.reverse){
                        this.layer.fill(...this.flashColor(part.color.over),this.fade.main*part.fade.main)
                        for(let a=0,la=15;a<la;a++){
                            if(lcos((a-0.16)/la*360)>0){
                                this.layer.triangle(
                                    5.5*lsin((a-0.16)/la*360),-44.5-lcos((a-0.16)/la*360)*2,
                                    14*lsin((a-0.24)/la*360)*part.anim.wide,-24-4*sqrt(1-lsin((a-0.24)/la*360)**2)-part.anim.lift,
                                    14*lsin((a-0.08)/la*360)*part.anim.wide,-24-4*sqrt(1-lsin((a-0.08)/la*360)**2)-part.anim.lift
                                )
                            }
                            if(lcos((a+0.16)/la*360)>0){
                                this.layer.triangle(
                                    5.5*lsin((a+0.16)/la*360),-44.5-lcos((a+0.16)/la*360)*2,
                                    14*lsin((a+0.24)/la*360)*part.anim.wide,-24-4*sqrt(1-lsin((a+0.24)/la*360)**2)-part.anim.lift,
                                    14*lsin((a+0.08)/la*360)*part.anim.wide,-24-4*sqrt(1-lsin((a+0.08)/la*360)**2)-part.anim.lift
                                )
                            }
                        }
                    }else{
                        this.layer.fill(...this.flashColor(part.color.over),this.fade.main*part.fade.main)
                        for(let a=0,la=15;a<la;a++){
                            if(lcos((a-0.16)/la*360)>0){
                                this.layer.triangle(
                                    6*lsin((a-0.16)/la*360),-45.5+lcos((a-0.16)/la*360)*2,
                                    14*lsin((a-0.24)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a-0.24)/la*360)**2)-part.anim.lift,
                                    14*lsin((a-0.08)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a-0.08)/la*360)**2)-part.anim.lift
                                )
                            }
                            if(lcos((a+0.16)/la*360)>0){
                                this.layer.triangle(
                                    6*lsin((a+0.16)/la*360),-45.5+lcos((a+0.16)/la*360)*2,
                                    14*lsin((a+0.24)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a+0.24)/la*360)**2)-part.anim.lift,
                                    14*lsin((a+0.08)/la*360)*part.anim.wide,-24+4*sqrt(1-lsin((a+0.08)/la*360)**2)-part.anim.lift
                                )
                            }
                        }
                    }
                    this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*part.fade.main)
                    this.layer.ellipse(0,-62.75,4,2.5)
                    this.layer.fill(...this.flashColor(part.color.stripe),this.fade.main*part.fade.main)
                    this.layer.beginShape()
                    if(part.anim.reverse){
                        this.layer.vertex(-13.2*part.anim.wide,-26-part.anim.lift)
                        this.layer.bezierVertex(-9.4*part.anim.wide,-30-part.anim.lift,9.4*part.anim.wide,-30-part.anim.lift,13.2*part.anim.wide,-26-part.anim.lift)
                        this.layer.vertex(13.5*part.anim.wide,-25.25-part.anim.lift)
                        this.layer.bezierVertex(9.5,-29.5-part.anim.lift,-9.5*part.anim.wide,-29.5-part.anim.lift,-13.5*part.anim.wide,-25.25-part.anim.lift)
                    }else{
                        this.layer.vertex(-13.5*part.anim.wide,-25.25-part.anim.lift)
                        this.layer.bezierVertex(-9.4*part.anim.wide,-21.25-part.anim.lift,9.4*part.anim.wide,-21.25-part.anim.lift,13.5*part.anim.wide,-25.25-part.anim.lift)
                        this.layer.vertex(13.7*part.anim.wide,-24.75-part.anim.lift)
                        this.layer.bezierVertex(9.5*part.anim.wide,-20.5-part.anim.lift,-9.5*part.anim.wide,-20.5-part.anim.lift,-13.7*part.anim.wide,-24.75-part.anim.lift)
                    }
                    this.layer.endShape()
                }
                if(this.components.dress.bow.display&&lcos(this.components.dress.bow.spin+this.direction.main)>0){
                    let part=this.components.dress.bow
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.stroke(...this.flashColor(part.color[0]),this.fade.main*part.fade)
                    this.layer.strokeWeight(1)
                    this.layer.strokeJoin(ROUND)
                    this.layer.triangle(
                        6.75*lsin(part.spin+this.direction.main),-46,
                        6.75*lsin(part.spin+this.direction.main)-7*lcos(part.spin+this.direction.main)*part.anim.size,-46-2.5*part.anim.size,
                        6.75*lsin(part.spin+this.direction.main)-6.5*lcos(part.spin+this.direction.main)*part.anim.size,-46+3.5*part.anim.size
                    )
                    this.layer.triangle(
                        6.75*lsin(part.spin+this.direction.main),-46,
                        6.75*lsin(part.spin+this.direction.main)+7*lcos(part.spin+this.direction.main)*part.anim.size,-46-2.5*part.anim.size,
                        6.75*lsin(part.spin+this.direction.main)+6.5*lcos(part.spin+this.direction.main)*part.anim.size,-46+3.5*part.anim.size
                    )
                    this.layer.strokeJoin(MITER)
                    this.layer.fill(...this.flashColor(part.color[1]),this.fade.main*part.fade)
                    for(let a=0,la=15*part.anim.length;a<la;a++){
                        this.layer.strokeWeight(1.5+a/la*1.2)
                        this.layer.line(
                            6.75*lsin(part.spin+this.direction.main)-a*(1+0.25*lsin(a/la*480*part.anim.swivel[0]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+a*1.5*part.anim.fall,
                            6.75*lsin(part.spin+this.direction.main)-(a+1)*(1+0.25*lsin((a+1)/la*480*part.anim.swivel[0]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+(a+1)*1.5*part.anim.fall
                        )
                    }
                    for(let a=0,la=15*part.anim.length;a<la;a++){
                        this.layer.strokeWeight(1.5+a/la*1.2)
                        this.layer.line(
                            6.75*lsin(part.spin+this.direction.main)+a*(1+0.25*lsin((a+2.5)/la*480*part.anim.swivel[1]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+a*1.5*part.anim.fall,
                            6.75*lsin(part.spin+this.direction.main)+(a+1)*(1+0.25*lsin((a+3.5)/la*480*part.anim.swivel[1]+this.time))*lcos(part.spin+this.direction.main),
                            -45.5+(a+1)*1.5*part.anim.fall
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
                    }else if(part.display&&part.appear.bottom.z>2){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                        if(this.components.dress.display.sleeve[a]){
                            this.displayComponent(1,[a])
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
                let loc=[]
                switch(type){
                    case 0:
                        loc=[
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
                    case 1:
                        loc=[
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
                    break
                    
                }
            },
        ))
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
                this.routines.calculatePart=[0,4,5]
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
        /*this.packages.push(new graphicsPackage(
            ``,
            function(type,direction,data){
                switch(type){
                    case 0:
                        layer=parent.subSprite(200,200,100,100)
                        return layer
                }
            },function(){
                let data={}
                return data
            }
        ))*/
    }
}