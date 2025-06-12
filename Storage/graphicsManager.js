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