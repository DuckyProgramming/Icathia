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
                layer.fill(...mergeColor(color1,color2,a/la),fade)
                layer.stroke(...mergeColor(color1,color2,a/la),fade)
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
    displayTrianglesFrontMergeDown(layer,parts,direction,base,width,weight,slant,color1,color2,fade){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color1==-1){
                layer.fill(0,fade)
                layer.stroke(0,fade)
                layer.erase(fade,fade)
            }else{
                layer.fill(...mergeColor(color1,color2,a/la))
                layer.stroke(...mergeColor(color1,color2,a/la))
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            if(reality[0]>=360&&reality[1]>=360&&reality[2]>=360){
                reality[0]-=360
                reality[1]-=360
                reality[2]-=360
            }
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
                        layer.rect(
                            0.5*(s[0]+s[1])*(width/2+part.y[0]*slant),
                            5,
                            abs(s[0]-s[1])*(width/2+part.y[0]*slant),
                            10,
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
    displayTrianglesBackMerge3D(layer,parts,direction,base,width,weight,slant,color1,color2,fade,plane,advance){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        let pool=[]
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color1==-1){
                layer.fill(0,fade)
                layer.stroke(0,fade)
                layer.erase(fade,fade)
            }else{
                layer.fill(...mergeColor(color1,color2,a/la),fade)
                layer.stroke(...mergeColor(color1,color2,a/la),fade)
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            if(reality[0]>=360&&reality[1]>=360&&reality[2]>=360){
                reality[0]-=360
                reality[1]-=360
                reality[2]-=360
            }
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]<0){
                if(c[1]<0){
                    if(c[2]<0){
                        if(part.set==undefined){
                            layer.triangle(
                                s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant,
                                s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant,
                                s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant,
                            )
                        }else{
                            pool.push(
                                [s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant],
                                [s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant],
                                [s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant],
                            )
                            let done=false
                            while(!done&&a<la-1){
                                a++
                                let part=parts[a]
                                let reality=[
                                    (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                                    (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                                    part.spin[2]+direction
                                ]
                                if(reality[0]>=360&&reality[1]>=360&&reality[2]>=360){
                                    reality[0]-=360
                                    reality[1]-=360
                                    reality[2]-=360
                                }
                                let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
                                let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
                                if(c[0]<0&&c[1]<0&&c[2]<0){
                                    switch(part.set){
                                        case 0:
                                            pool.push([s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant])
                                        break
                                        case 1:
                                            pool.splice(0,0,[s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant])
                                        break
                                    }
                                }else{
                                    a--
                                    done=true
                                }
                            }
                            if(pool.length==3){
                                layer.triangle(...pool.flat())
                            }else{
                                layer.beginShape()
                                pool.forEach(set=>layer.vertex(...set))
                                layer.endShape()
                                pool=[]
                            }
                        }
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
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant,
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant,
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
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant,
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
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant,
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant,
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
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant,
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1]
                        )
                    }
                }
            }
        }
        layer.strokeJoin(MITER)
    }
    displayTrianglesFrontMerge3D(layer,parts,direction,base,width,weight,slant,color1,color2,fade,plane,advance){
        layer.strokeWeight(weight)
        layer.strokeJoin(ROUND)
        let pool=[]
        for(let a=0,la=parts.length;a<la;a++){
            let part=parts[a]
            if(color1==-1){
                layer.fill(0,fade)
                layer.stroke(0,fade)
                layer.erase(fade,fade)
            }else{
                layer.fill(...mergeColor(color1,color2,a/la))
                layer.stroke(...mergeColor(color1,color2,a/la))
            }
            let reality=[
                (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                part.spin[2]+direction
            ]
            if(reality[0]>=360&&reality[1]>=360&&reality[2]>=360){
                reality[0]-=360
                reality[1]-=360
                reality[2]-=360
            }
            let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
            let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
            if(c[0]>=0){
                if(c[1]>=0){
                    if(c[2]>=0){
                        if(part.set==undefined){
                            layer.triangle(
                                s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant,
                                s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant,
                                s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant,
                            )
                        }else{
                            pool.push(
                                [s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant],
                                [s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant],
                                [s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant],
                            )
                            let done=false
                            while(!done&&a<la-1){
                                a++
                                let part=parts[a]
                                let reality=[
                                    (part.spin[0]<part.spin[2]-180?part.spin[0]+360:part.spin[0]>part.spin[2]+180?part.spin[0]-360:part.spin[0])+direction,
                                    (part.spin[1]<part.spin[2]-180?part.spin[1]+360:part.spin[1]>part.spin[2]+180?part.spin[1]-360:part.spin[1])+direction,
                                    part.spin[2]+direction
                                ]
                                if(reality[0]>=360&&reality[1]>=360&&reality[2]>=360){
                                    reality[0]-=360
                                    reality[1]-=360
                                    reality[2]-=360
                                }
                                let c=[lcos(reality[0]),lcos(reality[1]),lcos(reality[2])]
                                let s=[lsin(reality[0]),lsin(reality[1]),lsin(reality[2])]
                                if(c[0]>0&&c[1]>0&&c[2]>0){
                                    switch(part.set){
                                        case 0:
                                            pool.push([s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant])
                                        break
                                        case 1:
                                            pool.splice(0,0,[s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant])
                                        break
                                    }
                                }else{
                                    a--
                                    done=true
                                }
                            }
                            if(pool.length==3){
                                layer.triangle(...pool.flat())
                            }else{
                                layer.beginShape()
                                pool.forEach(set=>layer.vertex(...set))
                                layer.endShape()
                                pool=[]
                            }
                        }
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
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant,
                            width/2+cut[0]*slant,base+cut[0],
                            width/2+cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant,
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
                            s[0]*(width/2+part.y[0]*slant),base+part.y[0]+c[0]*plane*(part.y[0]+advance)*slant,
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
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant,
                            -width/2-cut[0]*slant,base+cut[0],
                            -width/2-cut[1]*slant,base+cut[1],
                            s[2]*(width/2+part.y[2]*slant),base+part.y[2]+c[2]*plane*(part.y[2]+advance)*slant,
                        )
                        if(cut[0]>=50||cut[1]>=50){
                            print(part,cut,inter,reality)
                        }
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
                            s[1]*(width/2+part.y[1]*slant),base+part.y[1]+c[1]*plane*(part.y[1]+advance)*slant,
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
            [`Sakura`],
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
                        parent.displayTrianglesFrontMerge(layer,data.parts.hair.inside,direction,0,33,0.5,0.1,data.color.hair.insideFront,data.color.hair.insideFront,1)
                        layer.arc(0,0,33,32,-180,0)
                        layer.line(-16.5,0,16.5,0)
                        parent.displayTrianglesFrontMerge(layer,data.parts.hair.reverseInside,direction,0.5,33.5,0.1,0.15,-1,-1,1)
                        parent.displayTrianglesFrontMerge(overlayer,data.parts.hair.main,direction,0,34,0.5,0.1,data.color.hair.front,data.color.hair.front,1)
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
                        parent.displayTrianglesBackMerge(layer,data.parts.hair.main,direction,0,34,0.5,0.1,data.color.hair.back,data.color.hair.back,1)
                        layer.arc(0,0,34,33,-180,0)
                        layer.line(-17,0,17,0)
                        parent.displayTrianglesBackMerge(overlayer,data.parts.hair.inside,direction,0,33,0.5,0.1,data.color.hair.insideBack,data.color.hair.insideBack,1)
                        overlayer.arc(0,0,33,32,-180,0)
                        overlayer.line(-16.5,0,16.5,0)
                        parent.displayTrianglesBackMerge(overlayer,data.parts.hair.reverseInside,direction,0.5,33.5,0.1,0.15,-1,-1,1)
                        layer.image(overlayer,0,10,40,60)
                        return layer
                    case 2:
                        layer=parent.subSprite(240,600,120,0)
                        layer.scale(2)
                        for(let a=0,la=data.parts.hair.tail.length;a<la;a++){
                            parent.controlSpin(data.parts.hair.tail[a][0],direction,0)
                            parent.controlSpin(data.parts.hair.tail[a][1],direction,0)
                            layer.translate(sin(direction*6+a*135)*0.6,0)
                            parent.displayTrianglesFrontMerge(layer,data.parts.hair.tail[a][0],direction,30-a*5,3.2+min(a,3),1,0.4*(0.8+min(a,3)*0.3),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),lcos(direction+data.spin.tail)*20,[1,1,1]),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),lcos(direction+data.spin.tail)*20,[1,1,1]),1),
                            parent.displayTrianglesFrontMerge(layer,data.parts.hair.tail[a][1],direction,30-a*5,3.2+min(a,3),1,-0.4*(0.8+min(a,3)*0.3),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,a/la),lcos(direction+data.spin.tail)*20,[1,1,1]),
                                upColor(mergeColor(data.color.hair.tail.start,data.color.hair.tail.end,(a+1)/la),lcos(direction+data.spin.tail)*20,[1,1,1]),1)
                            layer.translate(sin(direction*6+a*135)*-0.6,0)
                        }
                        layer.noFill()
                        layer.stroke(172,21,30)
                        layer.strokeWeight(0.3)
                        let width=abs(lsin(direction*6)*0.57-lsin(direction*6+135)*0.57)+3.2
                        layer.line(lsin(direction*6)*0.3+lsin(direction*6+135)*0.3-width/2,27.5,lsin(direction*6)*0.3+lsin(direction*6+135)*0.3+width/2,27.5)
                        layer.push()
                        layer.translate(lsin(direction*6)*0.3+lsin(direction*6+135)*0.3+lsin(direction-15)*width,27.5)
                        let scaling=lcos(direction-15)
                        layer.line(0,0,-0.3*scaling,2.25)
                        layer.line(0,0,0.3*scaling,2.25)
                        layer.bezier(0,0,-2.25*scaling,0.75,-0.75*scaling,2.25,0,0)
                        layer.bezier(0,0,2.25*scaling,0.75,0.75*scaling,2.25,0,0)
                        layer.pop()
                        return layer
                    case 3:
                        layer=parent.subSprite(300,300,150,0)
                        parent.controlSpin(data.parts.wrap.main,direction,1)
                        parent.displayTrianglesFrontMerge(layer,data.parts.wrap.main,direction,19,20,0.5,0.25,data.color.wrap.main,data.color.wrap.main,1)
                        for(let a=0,la=data.parts.wrap.decoration.length;a<la;a++){
                            if(lcos(data.parts.wrap.decoration[a].spin+direction)>0){
                                layer.push()
                                layer.translate(lsin(data.parts.wrap.decoration[a].spin+direction)*(10.5+0.25*data.parts.wrap.decoration[a].y),20+data.parts.wrap.decoration[a].y)
                                layer.image(data.sprites.minor[1],0,0,20*lcos(data.parts.wrap.decoration[a].spin+direction),20)
                                layer.pop()
                            }
                        }
                        layer.noStroke()
                        layer.fill(...data.color.wrap.decoration.front)
                        for(let a=0,la=data.parts.wrap.tick.small.length;a<la;a++){
                            if(lcos(data.parts.wrap.tick.small[a].spin+direction)>0){
                                layer.push()
                                layer.translate(lsin(data.parts.wrap.tick.small[a].spin+direction)*(10.5+0.25*data.parts.wrap.tick.small[a].y),20+data.parts.wrap.tick.small[a].y)
                                layer.rotate(data.parts.wrap.tick.small[a].rotate)
                                layer.ellipse(0,0,data.parts.wrap.tick.small[a].width*lcos(data.parts.wrap.tick.small[a].spin+direction),data.parts.wrap.tick.small[a].height)
                                layer.pop()
                            }
                        }
                        for(let a=0,la=data.parts.wrap.tick.large.length;a<la;a++){
                            if(lcos(data.parts.wrap.tick.large[a].spin+direction)>0){
                                layer.push()
                                layer.translate(lsin(data.parts.wrap.tick.large[a].spin+direction)*(10.5+0.25*data.parts.wrap.tick.large[a].y),20+data.parts.wrap.tick.large[a].y)
                                layer.rotate(data.parts.wrap.tick.large[a].rotate)
                                diamond(layer,0,0,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction),data.parts.wrap.tick.large[a].height,0)
                                diamond(layer,-data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*2.5,0,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*0.75,data.parts.wrap.tick.large[a].height*0.75,15)
                                diamond(layer,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*2.5,0,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*0.75,data.parts.wrap.tick.large[a].height*0.75,-15)
                                layer.pop()
                            }
                        }
                        layer.erase(0.5)
                        layer.rect(0,38,40,40)
                        return layer
                    case 4:
                        layer=parent.subSprite(300,300,150,0)
                        parent.displayTrianglesBackMerge(layer,data.parts.wrap.main,direction,19,20,0.5,0.25,data.color.wrap.main,data.color.wrap.main,1)
                        layer.noStroke()
                        layer.fill(...data.color.wrap.decoration.back)
                        for(let a=0,la=data.parts.wrap.tick.small.length;a<la;a++){
                            if(lcos(data.parts.wrap.tick.small[a].spin+direction)<=0){
                                layer.push()
                                layer.translate(lsin(data.parts.wrap.tick.small[a].spin+direction)*(10.5+0.25*data.parts.wrap.tick.small[a].y),20+data.parts.wrap.tick.small[a].y)
                                layer.rotate(data.parts.wrap.tick.small[a].rotate)
                                layer.ellipse(0,0,data.parts.wrap.tick.small[a].width*lcos(data.parts.wrap.tick.small[a].spin+direction),data.parts.wrap.tick.small[a].height)
                                layer.pop()
                            }
                        }
                        for(let a=0,la=data.parts.wrap.tick.large.length;a<la;a++){
                            if(lcos(data.parts.wrap.tick.large[a].spin+direction)<=0){
                                layer.push()
                                layer.translate(lsin(data.parts.wrap.tick.large[a].spin+direction)*(10.5+0.25*data.parts.wrap.tick.large[a].y),20+data.parts.wrap.tick.large[a].y)
                                layer.rotate(-data.parts.wrap.tick.large[a].rotate)
                                diamond(layer,0,0,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction),data.parts.wrap.tick.large[a].height,0)
                                diamond(layer,-data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*2.5,0,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*0.75,data.parts.wrap.tick.large[a].height*0.75,15)
                                diamond(layer,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*2.5,0,data.parts.wrap.tick.large[a].width*lcos(data.parts.wrap.tick.large[a].spin+direction)*0.75,data.parts.wrap.tick.large[a].height*0.75,-15)
                                layer.pop()
                            }
                        }
                        layer.erase(0.5)
                        layer.rect(0,38,40,40)
                        return layer
                }
            },function(parent){
                let data={
                    sprites:{
                        detail:constants.graphics.detail,genAmount:360/constants.graphics.detail,
                        hair:{back:[],front:[],tail:[]},wrap:{back:[],front:[]},minor:[],
                    },parts:{
                        hair:{main:[
                            {spin:[40,84,52],y:[0,0,2]},
                            {spin:[-100,-44,-56],y:[0,0,4]},
                            {spin:[-124,-68,-96],y:[0,0,8]},
                            {spin:[-124,-56,-72],y:[0,0,6]},
                            {spin:[36,108,84],y:[0,0,3]},
                            {spin:[56,120,80],y:[0,0,7]},
                            {spin:[-164,-116,-136],y:[0,0,14]},
                            {spin:[-164,-92,-120],y:[0,0,10]},
                            {spin:[-48,-32,-40],y:[0,0,1]},
                            {spin:[156,-132,-180],y:[0,0,21]},
                            {spin:[132,-132,-180],y:[0,0,23]},
                            {spin:[164,-132,-164],y:[0,0,17]},
                            {spin:[132,-164,160],y:[0,0,21]},
                            {spin:[84,140,108],y:[0,0,4]},
                            {spin:[96,180,124],y:[0,0,11]},
                            {spin:[120,-148,140],y:[0,0,16]},
                            {spin:[68,124,100],y:[0,0,6]},
                            {spin:[-132,-92,-108],y:[0,0,9]},
                        ],inside:[],reverse:[
                            {spin:[-36,-12,-27],y:[0,0,-2]},
                            {spin:[36,3,21],y:[0,0,-1.5]},
                            {spin:[-21,18,-6],y:[0,0,-3]},
                        ],reverseInside:[],tail:[]},
                        wrap:{main:[],decoration:[
                            {spin:-48,y:2.5},
                            {spin:0,y:1.5},
                            {spin:-24,y:6.5},
                            {spin:42,y:2.5},
                            {spin:18,y:7.5},
                            {spin:84,y:3.5},
                            {spin:60,y:8.5},
                            {spin:126,y:4.5},
                            {spin:102,y:9.5},
                            {spin:78,y:14.5},
                            {spin:168,y:5.5},
                            {spin:144,y:10.5},
                            {spin:120,y:15.5},
                            {spin:-126,y:1.5},
                            {spin:-150,y:6.5},
                            {spin:-174,y:11.5},
                            {spin:-84,y:2.5},
                        ],tick:{large:[],small:[]}},
                    },color:{
                        hair:{back:[243,134,143],front:[250,181,196],insideBack:[233,155,172],insideFront:[241,152,190],tail:{start:[231,146,154],end:[255,206,214]},glow:[254,214,213]},
                        skin:{head:[255,239,224],body:[254,238,223],legs:[255,235,217],arms:[255,233,216],button:[250,188,173]},
                        eye:{back:[201,108,113],front:[48,4,7],glow:[255,166,168]},
                        under:{top:[251,223,202]},
                        camisole:{main:[245,243,237],string:[199,72,60],tie:[218,74,69]},
                        bottoms:{main:[245,243,237],string:[199,72,60],tie:[218,74,69]},
                        wrap:{main:[232,164,199],decoration:{back:[165,92,144],front:[114,40,119]}},
                        necklace:[202,51,60],
                        mouth:{in:[235,146,132],out:[0,0,0]},
                    },
                    spin:{tail:108}
                }
                for(let a=0,la=16;a<la;a++){
                    data.parts.hair.inside.push({spin:[-data.parts.hair.main[a].spin[1],-data.parts.hair.main[a].spin[0],-data.parts.hair.main[a].spin[2]],y:[0,0,data.parts.hair.main[a].y[2]*0.75]})
                }
                for(let a=0,la=3;a<la;a++){
                    data.parts.hair.reverseInside.push({spin:[-data.parts.hair.reverse[a].spin[1],-data.parts.hair.reverse[a].spin[0],-data.parts.hair.reverse[a].spin[2]],y:[0,0,data.parts.hair.reverse[a].y[2]*1]})
                }
                for(let a=0,la=6;a<la;a++){
                    data.parts.hair.tail.push([[],[]])
                    for(let b=0,lb=12;b<lb;b++){
                        data.parts.hair.tail[a][0].push({spin:[a/la*90+b/lb*360-15,a/la*90+b/lb*360+15,a/la*90+b/lb*360],y:[0,0,-5]})
                        data.parts.hair.tail[a][1].push({spin:[a/la*90+b/lb*360-15,a/la*90+b/lb*360+15,a/la*90+b/lb*360],y:[0,0,5]})
                    }
                }
                for(let a=0,la=5;a<la;a++){
                    data.parts.wrap.main.push({spin:[-120+a*48,-96+a*48,-108+a*48],y:[0,0,16+a*5]})
                    data.parts.wrap.main.push({spin:[-108+a*48,-92+a*48,-87+a*48],y:[16+a*5,0,15.5+a*5]})
                    data.parts.wrap.main.push({spin:[-92+a*48,-84+a*48,-87+a*48],y:[0,17.5+a*5,15.5+a*5]})
                    data.parts.wrap.main.push({spin:[-92+a*48,-68+a*48,-84+a*48],y:[0,0,17.5+a*5]})
                    data.parts.wrap.main.push({spin:[-84+a*48,-75+a*48,-72+a*48],y:[17.5+a*5,0,17+a*5]})
                    data.parts.wrap.main.push({spin:[-75+a*48,-60+a*48,-72+a*48],y:[0,21+a*5,17+a*5]})
                }
                data.parts.wrap.main.push({spin:[117,132,132],y:[0,0,41]})
                for(let a=0,la=2;a<la;a++){
                    data.parts.wrap.main.push({spin:[132+a*48,146+a*48,132+a*48],y:[0,39,41+a]})
                    data.parts.wrap.main.push({spin:[132+a*48,156+a*48,146+a*48],y:[0,0,39]})
                    data.parts.wrap.main.push({spin:[146+a*48,156+a*48,156+a*48],y:[39,0,40]})
                    data.parts.wrap.main.push({spin:[156+a*48,166+a*48,156+a*48],y:[0,39,40]})
                    data.parts.wrap.main.push({spin:[180+a*48,156+a*48,166+a*48],y:[0,0,39]})
                    data.parts.wrap.main.push({spin:[166+a*48,180+a*48,180+a*48],y:[39,0,42-a]})
                }
                data.parts.wrap.main.push({spin:[228,243,228],y:[0,0,41]})
                for(let a=4,la=1;a>=la;a--){
                    data.parts.wrap.main.push({spin:[75-a*48,60-a*48,72-a*48],y:[0,21+a*5,17+a*5]})
                    data.parts.wrap.main.push({spin:[84-a*48,75-a*48,72-a*48],y:[17.5+a*5,0,17+a*5]})
                    data.parts.wrap.main.push({spin:[92-a*48,68-a*48,84-a*48],y:[0,0,17.5+a*5]})
                    data.parts.wrap.main.push({spin:[92-a*48,84-a*48,87-a*48],y:[0,17.5+a*5,15.5+a*5]})
                    data.parts.wrap.main.push({spin:[108-a*48,92-a*48,87-a*48],y:[16+a*5,0,15.5+a*5]})
                    data.parts.wrap.main.push({spin:[120-a*48,96-a*48,108-a*48],y:[0,0,16+a*5]})
                }
                for(let a=0,la=data.parts.wrap.main.length;a<la;a++){
                    data.parts.wrap.main[a].y[0]=max(0,data.parts.wrap.main[a].y[0]-20.5)
                    data.parts.wrap.main[a].spin[0]-=78
                    data.parts.wrap.main[a].y[1]=max(0,data.parts.wrap.main[a].y[1]-20.5)
                    data.parts.wrap.main[a].spin[1]-=78
                    data.parts.wrap.main[a].y[2]=max(0,data.parts.wrap.main[a].y[2]-20.5)
                    data.parts.wrap.main[a].spin[2]-=78
                    if(data.parts.wrap.main[a].y[0]<=0&&data.parts.wrap.main[a].y[1]<=0&&data.parts.wrap.main[a].y[2]<=0){
                        data.parts.wrap.main.splice(a,1)
                        a--
                        la--
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    data.parts.wrap.tick.large.push({spin:90-a*47.5,rotate:24,y:50-a*5,width:0.35,height:1})
                }
                data.parts.wrap.tick.large.push({spin:134,rotate:12,y:54,width:0.35,height:1})
                data.parts.wrap.tick.large.push({spin:180,rotate:0,y:55,width:0.35,height:1})
                data.parts.wrap.tick.large.push({spin:226,rotate:-12,y:54,width:0.35,height:1})
                for(let a=0,la=7;a<la;a++){
                    data.parts.wrap.tick.large.push({spin:270+a*47.5,rotate:-24,y:50-a*5,width:0.35,height:1})
                }
                for(let a=0,la=data.parts.wrap.tick.large.length;a<la;a++){
                    data.parts.wrap.tick.large[a].y=max(0,data.parts.wrap.tick.large[a].y-38.25)
                    data.parts.wrap.tick.large[a].spin-=78
                    if(data.parts.wrap.tick.large[a].y<=0){
                        data.parts.wrap.tick.large.splice(a,1)
                        a--
                        la--
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    data.parts.wrap.tick.small.push({spin:66-a*47.5,rotate:24,y:47-a*5,width:0.6,height:0.8})
                }
                data.parts.wrap.tick.small.push({spin:112,rotate:21,y:52,width:0.6,height:0.8})
                data.parts.wrap.tick.small.push({spin:156,rotate:6,y:54.5,width:0.6,height:0.8})
                data.parts.wrap.tick.small.push({spin:204,rotate:-6,y:54.5,width:0.6,height:0.8})
                data.parts.wrap.tick.small.push({spin:248,rotate:-21,y:52,width:0.6,height:0.8})
                for(let a=0,la=7;a<la;a++){
                    data.parts.wrap.tick.small.push({spin:294+a*47.5,rotate:-24,y:47-a*5,width:0.6,height:0.8})
                }
                for(let a=0,la=data.parts.wrap.tick.small.length;a<la;a++){
                    data.parts.wrap.tick.small[a].y=max(0,data.parts.wrap.tick.small[a].y-38.25)
                    data.parts.wrap.tick.small[a].spin-=78
                    if(data.parts.wrap.tick.small[a].y<=0){
                        data.parts.wrap.tick.small.splice(a,1)
                        a--
                        la--
                    }
                }
                data.sprites.minor.push(createGraphics(160,240))
                data.sprites.minor.push(createGraphics(160,160))
                data.sprites.minor.push(createGraphics(160,160))
                data.sprites.minor.push(createGraphics(160,160))
                data.sprites.minor.forEach(img=>setupLayer(img))
                let flower=(layer,size,color,width,height,fade,extent)=>{
                    layer.push()
                    layer.scale(size)
                    layer.strokeWeight(0.6)
                    layer.strokeJoin(ROUND)
                    for(let a=0,la=extent;a<la;a++){
                        for(let b=0,lb=5;b<lb;b++){
                            layer.fill(...mergeColor(color[0],color[1],a/la),fade)
                            layer.stroke(...mergeColor(color[0],color[1],a/la),fade)
                            if(a<la/2){
                                layer.beginShape()
                                layer.vertex(0,0)
                                layer.bezierVertex(-width[0]*(1-a/la*2),-30,-width[1]*(1-a/la*2),-40,-width[2],-70)
                                layer.vertex(-width[2]*(1-(a+1)/la*2),-height[0])
                                layer.endShape(CLOSE)
                            }
                            layer.rotate(-72)
                            layer.beginShape()
                            layer.vertex(0,0)
                            layer.bezierVertex(width[0],-30,width[1],-40,width[2],-70)
                            if(a>=la/2){
                                layer.vertex(width[2]*(-1+a/la*2),-height[0])
                                layer.bezierVertex(width[1]*(-1+a/la*2),-40,width[0]*(-1+a/la*2),-30,0,0)
                            }else{
                                layer.vertex(0,-height[0])
                            }
                            layer.endShape(CLOSE)
                        }
                    }
                    layer.noStroke()
                    layer.fill(...color[2],fade)
                    for(let a=0,la=5;a<la;a++){
                        layer.rotate(60)
                        layer.quad(0,-4,width[3],-16,0,-24,-width[3],-16)
                        layer.rotate(12)
                    }
                    layer.fill(...color[3],fade)
                    layer.ellipse(0,0,12,12)
                    layer.pop()
                }
                data.sprites.minor[0].translate(80,140)
                data.sprites.minor[0].rotate(24)
                flower(data.sprites.minor[0],0.4,[[136,61,92],[195,68,87],[124,41,51],[211,153,120]],[21,28,7,3],[56],1,100)
                data.sprites.minor[0].rotate(-24)
                data.sprites.minor[0].translate(0,-36)
                flower(data.sprites.minor[0],0.5,[[136,61,92],[195,68,87],[124,41,51],[211,153,120]],[21,28,7,3],[56],1,100)
                data.sprites.minor[1].translate(80,80)
                flower(data.sprites.minor[1],0.25,[[241,170,189],[250,222,226],[240,207,211],[254,228,232]],[20,40,12,4],[54],1,100)
                data.sprites.minor[2].fill(151,119,103)
                data.sprites.minor[2].rect(80,80,100,40)
                data.sprites.minor[2].ellipse(80,60,100,100)
                data.sprites.minor[2].ellipse(80,100,100,100)
                data.sprites.minor[2].fill(122,94,90)
                data.sprites.minor[2].rect(80,60,100,6)
                data.sprites.minor[2].rect(80,80,100,6)
                data.sprites.minor[2].rect(80,100,100,6)
                data.sprites.minor[2].quad(54,17,106,17,114,23,46,23)
                data.sprites.minor[2].quad(36,37,124,37,127,43,33,43)
                data.sprites.minor[2].quad(36,123,124,123,127,117,33,117)
                data.sprites.minor[2].quad(54,143,106,143,114,137,46,137)
                data.sprites.minor[3].stroke(201,61,96)
                data.sprites.minor[3].strokeWeight(20)
                data.sprites.minor[3].line(24,46,80,150)
                data.sprites.minor[3].line(136,46,80,150)
                data.sprites.minor[3].noStroke()
                data.sprites.minor[3].fill(233,216,194)
                for(let a=0,la=4;a<la;a++){
                    data.sprites.minor[3].push()
                    data.sprites.minor[3].translate(28+a*14,56+a*26)
                    data.sprites.minor[3].scale(0.1)
                    data.sprites.minor[3].rotate(a*90+13)
                    for(let b=0,lb=5;b<lb;b++){
                        data.sprites.minor[3].beginShape()
                        data.sprites.minor[3].vertex(0,0)
                        data.sprites.minor[3].bezierVertex(-21,-30,-28,-40,-7,-70)
                        data.sprites.minor[3].vertex(0,-56)
                        data.sprites.minor[3].vertex(7,-20)
                        data.sprites.minor[3].bezierVertex(28,-40,21,-30,0,0)
                        data.sprites.minor[3].endShape()
                        data.sprites.minor[3].rotate(72)
                    }
                    data.sprites.minor[3].pop()
                    data.sprites.minor[3].push()
                    data.sprites.minor[3].translate(132-a*14,56+a*26)
                    data.sprites.minor[3].scale(0.1)
                    data.sprites.minor[3].rotate(-a*90-13)
                    for(let b=0,lb=5;b<lb;b++){
                        data.sprites.minor[3].beginShape()
                        data.sprites.minor[3].vertex(0,0)
                        data.sprites.minor[3].bezierVertex(-21,-30,-28,-40,-7,-70)
                        data.sprites.minor[3].vertex(0,-56)
                        data.sprites.minor[3].vertex(7,-20)
                        data.sprites.minor[3].bezierVertex(28,-40,21,-30,0,0)
                        data.sprites.minor[3].endShape()
                        data.sprites.minor[3].rotate(72)
                    }
                    data.sprites.minor[3].pop()
                }
                for(let a=0,la=data.sprites.genAmount;a<la;a++){
                    data.sprites.hair.front.push(this.generateSprite(parent,0,360*a/la,data))
                    data.sprites.hair.back.push(this.generateSprite(parent,1,360*a/la,data))
                    data.sprites.hair.tail.push(this.generateSprite(parent,2,360*a/la,data))
                    data.sprites.wrap.front.push(this.generateSprite(parent,3,360*a/la,data))
                    data.sprites.wrap.back.push(this.generateSprite(parent,4,360*a/la,data))
                }
                return data
            },function(){
                let colorBase=this.graphicManager.getData(this.name).color
                this.components=this.standardModel(
                    0,
                    15.5,[{x:-2.5,y:-31,z:0},{x:2.5,y:-31,z:0}],[{x:-3.25,y:-55,z:0},{x:3.25,y:-55,z:0}],
                    [-45,-75,-69.5,-72.5,-72.5,-69.5,-69.5],[[11,32],[30,30]],{x:8,y:5,open:0,wide:39},[18,18,30,30]
                )
                this.components.hair.tail={display:true,fade:1,spin:108}
                this.components.hair.pin={display:true,fade:1,spin:-48}
                this.components.sandal=[{display:{back:true,front:true},fade:{back:1,front:1}},{display:{back:true,front:true},fade:{back:1,front:1}}]
                this.components.button={display:true,fade:1,spin:0,deviation:5.2,level:-40,color:colorBase.skin.button,dimensions:[0.8,1.4]}
                this.components.under={top:[{display:true,fade:1,spin:-40,color:colorBase.under.top},{display:true,fade:1,spin:40,color:colorBase.under.top}]}
                this.components.camisole={display:true,fade:1,color:colorBase.camisole}
                this.components.bottoms={display:true,fade:1,color:colorBase.bottoms}
                this.components.wrap={display:true,fade:1,color:colorBase.wrap,level:-48}
                this.components.necklace={
                    main:{spin:[-45,45,0],fade:1,display:true,color:colorBase.necklace},
                    bow:{spin:{center:180},level:-59,fade:1,display:true,color:colorBase.necklace},
                }
                this.routines.calculatePart=[0,1,2,3]
            },function(args){
                let parent=args[0]
                if(this.components.hair.pin.display&&lcos(this.direction.main+this.components.hair.pin.spin)<=0){
                    this.layer.noStroke()
                    this.layer.push()
                    this.layer.translate(lsin(this.direction.main+this.components.hair.pin.spin)*17,-78.5)
                    this.layer.rotate(lsin(this.direction.main+this.components.hair.pin.spin)*-5)
                    this.layer.scale(lcos(this.direction.main+this.components.hair.pin.spin),1)
                    this.layer.rotate(3)
                    this.layer.image(this.graphicManager.getData(this.name).sprites.minor[0],0,0,20,30)
                    this.layer.pop()
                }
                if(this.components.hair.display.back){
                    let size=this.fade.main*this.components.hair.fade.back
                    this.layer.image(this.graphicManager.getData(this.name).sprites.hair.back[this.sprites.spinDetail],0,this.components.head.level+10*size,40*size,60*size)
                }
                if(this.components.hair.tail.display&&lcos(this.components.hair.tail.spin+this.direction.main)<=0){
                    let size=this.fade.main*this.components.hair.tail.fade
                    this.layer.image(this.graphicManager.getData(this.name).sprites.hair.tail[this.sprites.spinDetailHead],lsin(this.components.hair.tail.spin+this.direction.main)*14.5,this.components.head.level+25*size,20*size,50*size)
                }
                if(this.components.necklace.main.display){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.necklace.main.color),this.fade.main*this.components.necklace.main.fade)
                    this.layer.strokeWeight(0.3)
                    if(lcos(this.components.necklace.main.spin[0]+this.direction.main)<=0){
                        this.layer.arc(0,-59,6,3,atan2(lsin(90-this.components.necklace.main.spin[0]-this.direction.main),lcos(90-this.components.necklace.main.spin[0]-this.direction.main)*2),0)
                    }
                    if(lcos(this.components.necklace.main.spin[1]+this.direction.main)<=0){
                        this.layer.arc(0,-59,6,3,-180,atan2(lsin(90-this.components.necklace.main.spin[1]-this.direction.main),lcos(90-this.components.necklace.main.spin[1]-this.direction.main)*2))
                    }
                    if(lcos(this.components.necklace.main.spin[0]+this.direction.main)>0&&lcos(this.components.necklace.main.spin[1]+this.direction.main)>0){
                        this.layer.arc(0,-59,6,3,-180,0)
                    }
                    if(!(this.components.necklace.main.spin[0]+this.direction.main>-130&&this.components.necklace.main.spin[0]+this.direction.main<65)){
                        if(lsin(this.components.necklace.main.spin[2]+this.direction.main)*5.25<lsin(this.components.necklace.main.spin[0]+this.direction.main)*3){
                            this.layer.arc(lsin(this.components.necklace.main.spin[0]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[0]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[0]+this.direction.main)*3,-180,-90)
                        }else{
                            this.layer.arc(lsin(this.components.necklace.main.spin[0]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[0]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[0]+this.direction.main)*3,-90,0)
                        }
                    }
                    if(!(this.components.necklace.main.spin[1]+this.direction.main<130&&this.components.necklace.main.spin[1]+this.direction.main>-65)){
                        if(lsin(this.components.necklace.main.spin[2]+this.direction.main)*5.25>lsin(this.components.necklace.main.spin[1]+this.direction.main)*3){
                            this.layer.arc(lsin(this.components.necklace.main.spin[1]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[1]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[1]+this.direction.main)*3,-90,0)
                        }else{
                            this.layer.arc(lsin(this.components.necklace.main.spin[1]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[1]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[1]+this.direction.main)*3,-180,-90)
                        }
                    }
                }
                if(this.components.necklace.bow.display&&lcos(this.components.necklace.bow.spin.center+this.direction.main)<=0){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.necklace.bow.color),this.fade.main*this.components.necklace.bow.fade)
                    this.layer.strokeWeight(0.3)
                    this.layer.push()
                    this.layer.translate(lsin(this.components.necklace.bow.spin.center+this.direction.main)*3,this.components.necklace.bow.level+1.5*sqrt(1-lsin(this.components.necklace.bow.spin.center+this.direction.main)*lsin(this.components.necklace.bow.spin.center+this.direction.main)))
                    this.layer.rotate(-20*lsin(this.components.necklace.bow.spin.center+this.direction.main))
                    let scaling=-lcos(this.components.necklace.bow.spin.center+this.direction.main)
                    this.layer.line(0,0,-0.4*scaling,3)
                    this.layer.line(0,0,0.4*scaling,3)
                    this.layer.bezier(0,0,-3*scaling,1,-1*scaling,3,0,0)
                    this.layer.bezier(0,0,3*scaling,1,1*scaling,3,0,0)
                    this.layer.pop()
                }
                for(let a=0,la=this.components.arms.length;a<la;a++){
                    let part=this.components.arms[a]
                    if(part.display&&lcos(part.anim.top.theta+this.direction.main)<=-0.2){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                        this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                    }
                }
                if(this.components.wrap.display){
                    let size=this.fade.main*this.components.wrap.fade
                    this.layer.image(this.graphicManager.getData(this.name).sprites.wrap.back[this.sprites.spinDetail],0,this.components.wrap.level+15*size,30*size,30*size)
                }
                if(this.components.bottoms.display){
                    for(let a=0,la=2;a<la;a++){
                        let spin=this.direction.main-84+a*168
                        if(lcos(spin)<=0){
                            this.layer.stroke(...this.flashColor(this.components.bottoms.color.string),this.fade.main*this.components.bottoms.fade)
                            this.layer.strokeWeight(7.5)
                            this.layer.noFill()
                            this.layer.push()
                            this.layer.translate(lsin(spin)*4.5,-35.35)
                            this.layer.scale(0.04*lcos(spin),0.04)
                            for(let a=0,la=5;a<la;a++){
                                this.layer.beginShape()
                                this.layer.vertex(0,0)
                                this.layer.bezierVertex(-21,-30,-28,-40,-7,-70)
                                this.layer.vertex(0,-52)
                                this.layer.vertex(7,-70)
                                this.layer.bezierVertex(28,-40,21,-30,0,0)
                                this.layer.endShape()
                                this.layer.rotate(360/la)
                            }
                            this.layer.bezier(0,0,-16,50,-22,100,-24,150)
                            this.layer.bezier(0,0,16,50,22,100,24,150)
                            let size=this.fade.main*this.components.camisole.fade
                            this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],-28,150,225,225)
                            this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],28,150,225,225)
                            this.layer.pop()
                        }
                    }
                }
                if(this.components.under.top[0].display&&lcos(this.components.under.top[0].spin+this.direction.main)<=0){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(mergeColor(this.components.body.color,this.components.under.top[0].color,1)),this.fade.main*this.components.under.top[0].fade)
                    this.layer.ellipse(lsin(this.components.under.top[0].spin+this.direction.main)*4.4,-51.75,lcos(this.components.under.top[0].spin+this.direction.main)*2.4+3.2,6)
                }
                if(this.components.under.top[1].display&&lcos(this.components.under.top[1].spin+this.direction.main)<=0){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(mergeColor(this.components.body.color,this.components.under.top[1].color,1)),this.fade.main*this.components.under.top[1].fade)
                    this.layer.ellipse(lsin(this.components.under.top[1].spin+this.direction.main)*4.4,-51.75,lcos(this.components.under.top[1].spin+this.direction.main)*2.4+3.2,6)
                }
                if(this.components.body.display){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
                    this.layer.ellipse(0,this.components.body.level,this.components.body.dimensions[0],this.components.body.dimensions[1])
                }
                if(this.components.under.top[0].display&&lcos(this.components.under.top[0].spin+this.direction.main)>0){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(mergeColor(this.components.body.color,this.components.under.top[0].color,1)),this.fade.main*this.components.under.top[0].fade)
                    this.layer.ellipse(lsin(this.components.under.top[0].spin+this.direction.main)*4.4,-51.75,lcos(this.components.under.top[0].spin+this.direction.main)*2.4+3.2,6)
                }
                if(this.components.under.top[1].display&&lcos(this.components.under.top[1].spin+this.direction.main)>0){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(mergeColor(this.components.body.color,this.components.under.top[1].color,1)),this.fade.main*this.components.under.top[1].fade)
                    this.layer.ellipse(lsin(this.components.under.top[1].spin+this.direction.main)*4.4,-51.75,lcos(this.components.under.top[1].spin+this.direction.main)*2.4+3.2,6)
                }
                if(this.components.button.display){
                    if(lcos(this.components.button.spin+this.direction.main)>0){
                        this.layer.noStroke()
                        this.layer.fill(...this.flashColor(this.components.button.color),this.fade.main*this.components.button.fade)
                        this.layer.ellipse(lsin(this.components.button.spin+this.direction.main)*this.components.button.deviation,this.components.button.level,this.components.button.dimensions[0]*lcos(this.components.button.spin+this.direction.main),this.components.button.dimensions[1])
                    }
                }
                if(this.components.necklace.main.display){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.necklace.main.color),this.fade.main*this.components.necklace.main.fade)
                    this.layer.strokeWeight(0.3)
                    if(lcos(this.components.necklace.main.spin[0]+this.direction.main)>0){
                        this.layer.arc(0,-59,6,3,atan2(lsin(90-this.components.necklace.main.spin[0]-this.direction.main),lcos(90-this.components.necklace.main.spin[0]-this.direction.main)*2),180)
                    }
                    if(lcos(this.components.necklace.main.spin[1]+this.direction.main)>0){
                        this.layer.arc(0,-59,6,3,0,atan2(lsin(90-this.components.necklace.main.spin[1]-this.direction.main),lcos(90-this.components.necklace.main.spin[1]-this.direction.main)*2))
                    }
                    if(lcos(this.components.necklace.main.spin[0]+this.direction.main)<=0&&lcos(this.components.necklace.main.spin[1]+this.direction.main)<=0){
                        this.layer.arc(0,-59,6,3,0,180)
                    }
                    if(this.components.necklace.main.spin[0]+this.direction.main>-130&&this.components.necklace.main.spin[0]+this.direction.main<65){
                        if(lsin(this.components.necklace.main.spin[2]+this.direction.main)*5.25<lsin(this.components.necklace.main.spin[0]+this.direction.main)*3){
                            this.layer.arc(lsin(this.components.necklace.main.spin[0]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[0]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[0]+this.direction.main)*3,-180,-90)
                        }else{
                            this.layer.arc(lsin(this.components.necklace.main.spin[0]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[0]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[0]+this.direction.main)*3,-90,0)
                        }
                    }
                    if(this.components.necklace.main.spin[1]+this.direction.main<130&&this.components.necklace.main.spin[1]+this.direction.main>-65){
                        if(lsin(this.components.necklace.main.spin[2]+this.direction.main)*5.25>lsin(this.components.necklace.main.spin[1]+this.direction.main)*3){
                            this.layer.arc(lsin(this.components.necklace.main.spin[1]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[1]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[1]+this.direction.main)*3,-90,0)
                        }else{
                            this.layer.arc(lsin(this.components.necklace.main.spin[1]+this.direction.main)*3,-54,lsin(this.components.necklace.main.spin[2]+this.direction.main)*10.5-lsin(this.components.necklace.main.spin[1]+this.direction.main)*6,10-lcos(this.components.necklace.main.spin[1]+this.direction.main)*3,-180,-90)
                        }
                    }
                }
                if(this.components.necklace.bow.display&&lcos(this.components.necklace.bow.spin.center+this.direction.main)>0){
                    this.layer.noFill()
                    this.layer.stroke(...this.flashColor(this.components.necklace.bow.color),this.fade.main*this.components.necklace.bow.fade)
                    this.layer.strokeWeight(0.3)
                    this.layer.push()
                    this.layer.translate(lsin(this.components.necklace.bow.spin.center+this.direction.main)*3,this.components.necklace.bow.level+1.5*sqrt(1-lsin(this.components.necklace.bow.spin.center+this.direction.main)*lsin(this.components.necklace.bow.spin.center+this.direction.main)))
                    this.layer.rotate(-20*lsin(this.components.necklace.bow.spin.center+this.direction.main))
                    let scaling=lcos(this.components.necklace.bow.spin.center+this.direction.main)
                    this.layer.line(0,0,-0.4*scaling,3)
                    this.layer.line(0,0,0.4*scaling,3)
                    this.layer.bezier(0,0,-3*scaling,1,-1*scaling,3,0,0)
                    this.layer.bezier(0,0,3*scaling,1,1*scaling,3,0,0)
                    this.layer.pop()
                }
                if(this.components.camisole.display){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(upColor(this.components.camisole.color.main,-20,[1,1,1])),this.fade.main*this.components.camisole.fade)
                    this.layer.beginShape()
                    this.layer.vertex(-5.4,-48.8)
                    this.layer.bezierVertex(-5.4,-51,-5,-53,-4.4,-54.7)
                    this.layer.vertex(4.4,-54.7)
                    this.layer.bezierVertex(5,-53,5.4,-51,5.4,-48.8)
                    this.layer.endShape()
                    for(let a=0,la=24;a<la;a++){
                        let size=a%3==0?1:0.6
                        this.layer.ellipse(4.4*lsin(a/la*360),-54.7,1.2*size*lcos(a/la*360),0.8*size)
                    }
                    for(let a=0,la=30;a<la;a++){
                        let size=a%3==0?1:0.6
                        this.layer.ellipse(5.4*lsin(a/la*360),-48.8,1.2*size*lcos(a/la*360),0.8*size)
                    }
                    this.layer.fill(...this.flashColor(this.components.camisole.color.main),this.fade.main*this.components.camisole.fade)
                    this.layer.beginShape()
                    this.layer.vertex(-5.4,-49)
                    this.layer.bezierVertex(-5.4,-51,-5,-53,-4.4,-54.5)
                    this.layer.vertex(4.4,-54.5)
                    this.layer.bezierVertex(5,-53,5.4,-51,5.4,-49)
                    this.layer.endShape()
                    this.layer.ellipse(lsin(this.components.under.top[0].spin+this.direction.main)*4.4,-51.75,lcos(this.components.under.top[0].spin+this.direction.main)*2.4+3.2,6)
                    this.layer.ellipse(lsin(this.components.under.top[1].spin+this.direction.main)*4.4,-51.75,lcos(this.components.under.top[1].spin+this.direction.main)*2.4+3.2,6)
                    for(let a=0,la=24;a<la;a++){
                        let size=a%3==0?1:0.6
                        this.layer.ellipse(4.4*lsin(a/la*360),-54.5,1.2*size*lcos(a/la*360),0.8*size)
                    }
                    for(let a=0,la=30;a<la;a++){
                        let size=a%3==0?1:0.6
                        this.layer.ellipse(5.4*lsin(a/la*360),-49,1.2*size*lcos(a/la*360),0.8*size)
                    }
                    this.layer.fill(...this.flashColor(this.components.camisole.color.string),this.fade.main*this.components.camisole.fade)
                    for(let a=0,la=18;a<la;a++){
                        let dir=[(a-0.25)/la*360+this.direction.main,(a+0.25)/la*360+this.direction.main]
                        if(lcos(dir[0])>0&&lcos(dir[1])>0){
                            this.layer.rect(lsin(dir[0])*2.3+lsin(dir[1])*2.3,-54,abs(lsin(dir[0])-lsin(dir[1]))*4.6,0.3)
                        }else if(lcos(dir[0])<0&&lcos(dir[1])>0){
                            this.layer.rect(-2.3+lsin(dir[1])*2.3,-54,abs(-1-lsin(dir[1]))*4.6,0.3)
                        }else if(lcos(dir[0])>0&&lcos(dir[1])<0){
                            this.layer.rect(lsin(dir[0])*2.3+2.3,-54,abs(lsin(dir[0])-1)*4.6,0.3)
                        }
                    }
                    this.layer.stroke(...this.flashColor(this.components.camisole.color.string),this.fade.main*this.components.camisole.fade)
                    this.layer.strokeWeight(7.5)
                    this.layer.noFill()
                    if(lcos(this.direction.main)>0){
                        this.layer.push()
                        this.layer.translate(lsin(this.direction.main)*4.6,-54)
                        this.layer.scale(0.04*lcos(this.direction.main),0.04)
                        for(let a=0,la=5;a<la;a++){
                            this.layer.beginShape()
                            this.layer.vertex(0,0)
                            this.layer.bezierVertex(-21,-30,-28,-40,-7,-70)
                            this.layer.vertex(0,-52)
                            this.layer.vertex(7,-70)
                            this.layer.bezierVertex(28,-40,21,-30,0,0)
                            this.layer.endShape()
                            this.layer.rotate(360/la)
                        }
                        this.layer.bezier(0,0,-16,50,-22,100,-24,150)
                        this.layer.bezier(0,0,16,50,22,100,24,150)
                        let size=this.fade.main*this.components.camisole.fade
                        this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],-28,150,225,225)
                        this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],28,150,225,225)
                        this.layer.pop()
                    }
                }
                if(this.components.bottoms.display){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(upColor(this.components.bottoms.color.main,-20,[1,1,1])),this.fade.main*this.components.bottoms.fade)
                    this.layer.beginShape()
                    this.layer.vertex(-4.6,-36.2)
                    this.layer.bezierVertex(-4,-33,-2.2,-29,0,-29)
                    this.layer.bezierVertex(2.2,-29,4,-33,4.6,-36.2)
                    this.layer.endShape()
                    for(let a=0,la=24;a<la;a++){
                        let size=a%3==0?1:0.6
                        this.layer.ellipse(4.6*lsin(a/la*360),-36.2,1.2*size*lcos(a/la*360),0.8*size)
                    }
                    this.layer.fill(...this.flashColor(this.components.bottoms.color.main),this.fade.main*this.components.bottoms.fade)
                    this.layer.beginShape()
                    this.layer.vertex(-4.6,-36)
                    this.layer.bezierVertex(-4,-33,-2.2,-29,0,-29)
                    this.layer.bezierVertex(2.2,-29,4,-33,4.6,-36)
                    this.layer.endShape()
                    for(let a=0,la=24;a<la;a++){
                        let size=a%3==0?1:0.6
                        this.layer.ellipse(4.6*lsin(a/la*360),-36,1.2*size*lcos(a/la*360),0.8*size)
                    }
                    this.layer.fill(...this.flashColor(this.components.bottoms.color.string),this.fade.main*this.components.bottoms.fade)
                    for(let a=0,la=18;a<la;a++){
                        let dir=[(a-0.25)/la*360+this.direction.main,(a+0.25)/la*360+this.direction.main]
                        if(lcos(dir[0])>0&&lcos(dir[1])>0){
                            this.layer.rect(lsin(dir[0])*2.25+lsin(dir[1])*2.25,-35.35,abs(lsin(dir[0])-lsin(dir[1]))*4.5,0.3)
                        }else if(lcos(dir[0])<0&&lcos(dir[1])>0){
                            this.layer.rect(-2.25+lsin(dir[1])*2.25,-35.35,abs(-1-lsin(dir[1]))*4.5,0.3)
                        }else if(lcos(dir[0])>0&&lcos(dir[1])<0){
                            this.layer.rect(lsin(dir[0])*2.25+2.25,-35.35,abs(lsin(dir[0])-1)*4.5,0.3)
                        }
                    }
                    if(lsin(this.direction.main)>0&&lcos(this.direction.main-105)>0&&lcos(this.direction.main-75)>0){
                        this.layer.fill(...this.flashColor(upColor(this.components.bottoms.color.main,-20,[1,1,1])),this.fade.main*this.components.bottoms.fade)
                        this.layer.beginShape()
                        this.layer.vertex(4.6*lsin(this.direction.main-105),-36.3)
                        this.layer.bezierVertex(4*lsin(this.direction.main-105),-33,2.2*lsin(this.direction.main-105),-29,0,-29)
                        this.layer.bezierVertex(2.2*lsin(this.direction.main-60),-29,4*lsin(this.direction.main-60),-33,4.6*lsin(this.direction.main-60),-36.3)
                        this.layer.endShape()
                        this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
                        this.layer.beginShape()
                        this.layer.vertex(4.6*lsin(this.direction.main-102),-36.6)
                        this.layer.bezierVertex(4*lsin(this.direction.main-102),-33,2.2*lsin(this.direction.main-102),-29,0,-29)
                        this.layer.bezierVertex(2.2*lsin(this.direction.main-63),-29,4*lsin(this.direction.main-63),-33,4.6*lsin(this.direction.main-63),-36.6)
                        this.layer.endShape()
                        this.layer.fill(...this.flashColor(this.components.bottoms.color.string),this.fade.main*this.components.bottoms.fade)
                        this.layer.quad(
                            4.45*lsin(this.direction.main-102),-35.2,
                            4.5*lsin(this.direction.main-102),-35.5,
                            4.5*lsin(this.direction.main-63),-35.5,
                            4.45*lsin(this.direction.main-63),-35.2
                        )
                    }
                    if(lsin(this.direction.main)<0&&lcos(this.direction.main+105)>0&&lcos(this.direction.main+75)>0){
                        this.layer.fill(...this.flashColor(upColor(this.components.bottoms.color.main,-20,[1,1,1])),this.fade.main*this.components.bottoms.fade)
                        this.layer.beginShape()
                        this.layer.vertex(4.6*lsin(this.direction.main+105),-36.3)
                        this.layer.bezierVertex(4*lsin(this.direction.main+105),-33,2.2*lsin(this.direction.main+105),-29,0,-29)
                        this.layer.bezierVertex(2.2*lsin(this.direction.main+60),-29,4*lsin(this.direction.main+60),-33,4.6*lsin(this.direction.main+60),-36.3)
                        this.layer.endShape()
                        this.layer.fill(...this.flashColor(this.components.body.color),this.fade.main*this.components.body.fade)
                        this.layer.beginShape()
                        this.layer.vertex(4.6*lsin(this.direction.main+102),-36.6)
                        this.layer.bezierVertex(4*lsin(this.direction.main+102),-33,2.2*lsin(this.direction.main+102),-29,0,-29)
                        this.layer.bezierVertex(2.2*lsin(this.direction.main+63),-29,4*lsin(this.direction.main+63),-33,4.6*lsin(this.direction.main+63),-36.6)
                        this.layer.endShape()
                        this.layer.fill(...this.flashColor(this.components.bottoms.color.string),this.fade.main*this.components.bottoms.fade)
                        this.layer.quad(
                            4.45*lsin(this.direction.main+102),-35.2,
                            4.5*lsin(this.direction.main+102),-35.5,
                            4.5*lsin(this.direction.main+63),-35.5,
                            4.45*lsin(this.direction.main+63),-35.2
                        )
                    }
                }
                for(let a=0,la=this.components.arms.length;a<la;a++){
                    let part=this.components.arms[a]
                    if(part.display&&lcos(part.anim.top.theta+this.direction.main)>-0.2&&lcos(part.anim.top.theta+this.direction.main)<=0.4){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                        this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    let key=this.components.legs[0].appear.bottom.z<=this.components.legs[1].appear.bottom.z?a:1-a
                    let part=this.components.legs[key]
                    let part2=this.components.sandal[key]
                    if(part2.fade.back>0&&part2.display.back){
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y+0.5)
                        this.layer.rotate(-this.direction.main)
                        this.layer.image(this.graphicManager.getData(this.name).sprites.minor[2],0,3.2,6.4*part2.fade.front*this.fade.main,6.4*part2.fade.front*this.fade.main)
                        this.layer.pop()

                        this.layer.fill(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                        this.layer.rotate(-this.direction.main)
                        let pos=[
                            [-2,0.2],
                            [-2.1,0.8],
                            [-2.1,1.4],
                            [-2,2],
                            [-2,2.8],
                            [-1.9,3.6],
                            [-1.6,4.4],
                            [-1.4,5.2],
                            [-1,6],
                            [0,6],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,3.6,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.pop()
                    }
                    if(part2.fade.front>0&&part2.display.front){
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                        this.layer.rotate(-this.direction.main)
                        this.layer.image(this.graphicManager.getData(this.name).sprites.minor[3],0,3.2,6.4*part2.fade.front*this.fade.main,6.4*part2.fade.front*this.fade.main)
                        this.layer.pop()
                    }
                    if(part.display){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(part.appear.top.x,part.appear.top.y,part.appear.middle.x,part.appear.middle.y)
                        this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                    }
                }
                if(this.components.bottoms.display){
                    for(let a=0,la=2;a<la;a++){
                        let spin=this.direction.main-84+a*168
                        if(lcos(spin)>0){
                            this.layer.stroke(...this.flashColor(this.components.bottoms.color.string),this.fade.main*this.components.bottoms.fade)
                            this.layer.strokeWeight(7.5)
                            this.layer.noFill()
                            this.layer.push()
                            this.layer.translate(lsin(spin)*4.5,-35.35)
                            this.layer.scale(0.04*lcos(spin),0.04)
                            for(let a=0,la=5;a<la;a++){
                                this.layer.beginShape()
                                this.layer.vertex(0,0)
                                this.layer.bezierVertex(-21,-30,-28,-40,-7,-70)
                                this.layer.vertex(0,-52)
                                this.layer.vertex(7,-70)
                                this.layer.bezierVertex(28,-40,21,-30,0,0)
                                this.layer.endShape()
                                this.layer.rotate(360/la)
                            }
                            this.layer.bezier(0,0,-16,50,-22,100,-24,150)
                            this.layer.bezier(0,0,16,50,22,100,24,150)
                            let size=this.fade.main*this.components.camisole.fade
                            this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],-28,150,225,225)
                            this.layer.image(this.graphicManager.getData(this.name).sprites.minor[1],28,150,225,225)
                            this.layer.pop()
                        }
                    }
                }
                if(this.components.wrap.display){
                    let size=this.fade.main*this.components.wrap.fade
                    this.layer.image(this.graphicManager.getData(this.name).sprites.wrap.front[this.sprites.spinDetail],0,this.components.wrap.level+15*size,30*size,30*size)
                }
                for(let a=0,la=this.components.arms.length;a<la;a++){
                    let part=this.components.arms[a]
                    if(part.display&&lcos(part.anim.top.theta+this.direction.main)>-0.2&&lcos(part.anim.top.theta+this.direction.main)<0.6){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(min(4,lcos(part.anim.top.theta+this.direction.main)*5+2))
                        this.layer.line(part.appear.stack.top.x,part.appear.stack.top.y,part.appear.stack.middle.x,part.appear.stack.middle.y)
                        this.layer.line(part.appear.stack.middle.x,part.appear.stack.middle.y,part.appear.stack.bottom.x,part.appear.stack.bottom.y)
                    }
                }
                if(this.components.head.display){
                    this.layer.noStroke()
                    this.layer.fill(...this.flashColor(this.components.head.color),this.fade.main*this.components.head.fade)
                    this.layer.ellipse(0,this.components.head.level,this.components.head.dimensions[0],this.components.head.dimensions[1])
                }
                if(this.components.head.mouth.display&&lcos(this.direction.main)>0){
                    this.displayGeneralComponent(1,[])
                }
                for(let a=0,la=this.components.arms.length;a<la;a++){
                    let part=this.components.arms[a]
                    if(part.display&&lcos(part.anim.top.theta+this.direction.main)>=0.6){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(min(4,lcos(part.anim.top.theta+this.direction.main)*5+2))
                        this.layer.line(part.appear.stack.top.x,part.appear.stack.top.y,part.appear.stack.middle.x,part.appear.stack.middle.y)
                        this.layer.line(part.appear.stack.middle.x,part.appear.stack.middle.y,part.appear.stack.bottom.x,part.appear.stack.bottom.y)
                    }else if(part.display&&part.appear.bottom.z>2){
                        this.layer.stroke(...this.flashColor(part.color),this.fade.main*part.fade)
                        this.layer.strokeWeight(4)
                        this.layer.line(part.appear.middle.x,part.appear.middle.y,part.appear.bottom.x,part.appear.bottom.y)
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.components.head.eye[a].display){
                        this.displayGeneralComponent(0,[a])
                    }
                }
                if(this.components.hair.tail.display&&lcos(this.components.hair.tail.spin+this.direction.main)>0){
                    let size=this.fade.main*this.components.hair.tail.fade
                    this.layer.image(this.graphicManager.getData(this.name).sprites.hair.tail[this.sprites.spinDetailHead],lsin(this.components.hair.tail.spin+this.direction.main)*14.5,this.components.head.level+25*size,20*size,50*size)
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
                if(this.components.hair.pin.display&&lcos(this.direction.main+this.components.hair.pin.spin)>0){
                    this.layer.noStroke()
                    this.layer.push()
                    this.layer.translate(lsin(this.direction.main+this.components.hair.pin.spin)*17,-78.5)
                    this.layer.rotate(lsin(this.direction.main+this.components.hair.pin.spin)*-5)
                    this.layer.scale(lcos(this.direction.main+this.components.hair.pin.spin),1)
                    this.layer.rotate(3)
                    this.layer.image(this.graphicManager.getData(this.name).sprites.minor[0],0,0,20,30)
                    this.layer.pop()
                }
            },function(type,args){},
        ))
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
                        shoe:{main:[174,181,242],under:[137,138,214]},
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
                this.components.shoe=[
                    {
                        display:true,
                        fade:1,
                        color:colorBase.shoe,
                    },{
                        display:true,
                        fade:1,
                        color:colorBase.shoe,
                    }
                ]
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
                            this.layer.fill(...this.flashColor(this.components.hair.color.bow),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.quad(0.5,-0.5,-5,2.75,-3.5,3.5,-2.75,5)
                            this.layer.quad(-0.5,-0.5,5,2.75,3.5,3.5,2.75,5)
                            this.layer.fill(...this.flashColor(mergeColor(this.components.hair.color.bow,[0,0,0],0.2)),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.quad(0.5,-0.5,-4.1,3.05,-3.5,3.5,-3.05,4.1)
                            this.layer.quad(-0.5,-0.5,4.1,3.05,3.5,3.5,3.05,4.1)
                            this.layer.fill(...this.flashColor(this.components.hair.color.bow),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.ellipse(0,0,2)
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
                    let key=this.components.legs[0].appear.bottom.z<=this.components.legs[1].appear.bottom.z?a:1-a
                    let part=this.components.legs[key]
                    let part2=this.components.shoe[key]
                    if(part2.display){
                        this.layer.fill(...this.flashColor(upColor(part2.color.under,lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y+0.5)
                        this.layer.rect(lsin(this.direction.main)*-0.75,1.8,1,3.6)
                        this.layer.ellipse(lsin(this.direction.main)*-0.75,3.6,1,0.6)
                        this.layer.fill(...this.flashColor(upColor(part2.color.main,lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                        this.layer.rotate(-this.direction.main)
                        this.layer.arc(0,0.2,4.8,5,-180,0)
                        this.layer.ellipse(0,0.2,4.8,1)
                        let pos=[
                            [-2.4,0.2],
                            [-2.4,2.5],
                            [-1.8,4.5],
                            [-1,6],
                            [-0.7,6.4],
                            [-0.4,6.8],
                            [0,6.8],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,5,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.pop()
                        this.layer.fill(...this.flashColor(upColor(part.color,lcos(this.direction.main+part.anim.top.theta)*5,[1,1,1])),this.fade.main*part2.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                        this.layer.rotate(-this.direction.main)
                        let expand=lcos(this.direction.main)*0.25
                        pos=[
                            [-2,0.2],
                            [-2,2],
                            [-1.7,3.2+expand*0.25],
                            [-1.3,4.15+expand*0.5],
                            [-1.1,4.45+expand*0.75],
                            [-0.7,4.7+expand],
                            [0,4.78+expand],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,3.6,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.pop()
                    }
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
                            this.layer.fill(...this.flashColor(this.components.hair.color.bow),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.quad(0.5,-0.5,-5,2.75,-3.5,3.5,-2.75,5)
                            this.layer.quad(-0.5,-0.5,5,2.75,3.5,3.5,2.75,5)
                            this.layer.fill(...this.flashColor(mergeColor(this.components.hair.color.bow,[0,0,0],0.2)),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.quad(0.5,-0.5,-4.1,3.05,-3.5,3.5,-3.05,4.1)
                            this.layer.quad(-0.5,-0.5,4.1,3.05,3.5,3.5,3.05,4.1)
                            this.layer.fill(...this.flashColor(this.components.hair.color.bow),this.fade.main*this.components.hair.bow[a].fade)
                            this.layer.ellipse(0,0,2)
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
                        shoe:{main:[186,135,89],outside:[146,105,69]},
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
                this.components.shoe=[
                    {
                        display:true,fade:1,
                        color:colorBase.shoe,
                    },{
                        display:true,fade:1,
                        color:colorBase.shoe,
                    },
                ]
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
                    let shoe=this.components.shoe[key]
                    if(shoe.display){
                        this.layer.fill(...this.flashColor(upColor(shoe.color.main,lcos(this.direction.main+part.appear.middle.z)*10,[1,1,1])),this.fade.main*shoe.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y+0.625)
                        this.layer.rotate(-this.direction.main+part.anim.middle.phi*(1-a*2)*0.25)
                        let pos=[
                            [-2.4,0.2],
                            [-2.4,3.6],
                            [-1.2,6.4],
                            [0,6.4],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,5,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.pop()
                        this.layer.fill(...this.flashColor(shoe.color.outside),this.fade.main*shoe.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                        this.layer.rotate(-this.direction.main+part.anim.middle.phi*(1-a*2)*0.25)
                        let expand=lcos(this.direction.main)*0.5
                        pos=[
                            [-2,0.2],
                            [-2,2],
                            [-1.8,3.3+expand*0.25],
                            [-1.5,4.1+expand*0.5],
                            [-1.3,4.7+expand*0.75],
                            [-0.9,5.1+expand],
                            [0,5.1+expand],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,3.6,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.fill(...this.flashColor(part.color),this.fade.main*shoe.fade)
                        pos=[
                            [-2,0.2],
                            [-2,2],
                            [-1.75,3.2+expand*0.25],
                            [-1.4,4+expand*0.5],
                            [-1.2,4.6+expand*0.75],
                            [-0.8,5+expand],
                            [0,5+expand],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,3.6,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.pop()
                    }
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
                    this.graphicManager.controlSpin(part.parts,this.direction.main,0)
                    this.layer.fill(...this.flashColor(part.color.back),this.fade.main*part.fade.main)
                    this.graphicManager.displayTrianglesBackMerge3D(this.layer,part.parts,this.direction.main,-41,12,1,0.2,part.color.back,part.color.back,this.fade.main*part.fade.main,0.2,0)
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
                    this.graphicManager.displayTrianglesFrontMerge3D(this.layer,part.parts,this.direction.main,-41,12,1,0.2,part.color.main,part.color.main,this.fade.main*part.fade.main,0.2,0)
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
                    let shoe=this.components.shoe[key]
                    if(shoe.display){
                        this.layer.fill(...this.flashColor(upColor(shoe.color,lcos(this.direction.main+part.appear.middle.z)*10,[1,1,1])),this.fade.main*shoe.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y+0.625)
                        this.layer.rotate(-this.direction.main)
                        let pos=[
                            [-2.4,0.2],
                            [-2.4,4],
                            [-1.5,6.6],
                            [0,6.6],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,5,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.pop()
                        this.layer.fill(...this.flashColor(part.color),this.fade.main*shoe.fade)
                        this.layer.noStroke()
                        this.layer.push()
                        this.layer.translate(part.appear.bottom.x,part.appear.bottom.y)
                        this.layer.rotate(-this.direction.main)
                        let expand=lcos(this.direction.main)*0.5
                        pos=[
                            [-2,0.2],
                            [-2,2],
                            [-1.75,3.2+expand*0.25],
                            [-1.4,4+expand*0.5],
                            [-1.2,4.6+expand*0.75],
                            [-0.8,5+expand],
                            [0,5+expand],
                        ]
                        for(let a=0,la=pos.length-1;a<la;a++){
                            pos.splice(la+1,0,[-pos[a][0],pos[a][1]])
                        }
                        this.layer.arc(0,pos[0][1],pos[0][0]*2,3.6,-180,0)
                        this.layer.ellipse(0,pos[0][1],pos[0][0]*2,2)
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
                        this.layer.fill(...this.flashColor(upColor(shoe.color,lcos(this.direction.main+part.appear.middle.z)*10,[1,1,1])),this.fade.main*shoe.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1.95,2.3+expand*0.5)
                        this.layer.bezierVertex(-0.65,2.6+expand*0.5,0.65,2.6+expand*0.5,1.95,2.3+expand*0.5)
                        this.layer.vertex(1.8,3+expand*0.5)
                        this.layer.bezierVertex(0.6,3.3+expand*0.5,-0.6,3.3+expand*0.5,-1.8,3+expand*0.5)
                        this.layer.endShape()
                        this.layer.pop()
                    }
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
                for(let a=0,la=720;a<la;a++){
                    let dir=[a/la*360,(a+1)/la*360,(a-0.5)/la*360,(a+0.5)/la*360]
                    let q=10
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
                    [-47.75,-79,-72.75,-77.25,-77.25,-72.75,-72.75],[[11.5,34.5],[30,30]],{x:8,y:3,open:0,wide:27},[18,18,30,30]
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