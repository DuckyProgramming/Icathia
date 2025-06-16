function displayScene(type){
    let manager=new graphicsManager();
    let layer
    let tick
    let char=[]
    switch(type){
        case 0:
            layer=formImage(600,600)
            manager.generateGraphics(`Shiru`)
            char.push(new character(layer,manager,0,225,`Shiru`,30))
            char[0].size=5
            char[0].components.arms[0].anim.top.theta=-75
            char[0].components.arms[0].anim.middle.theta=60
            char[0].components.arms[0].anim.middle.phi=60
            char[0].display()
            return layer
        case 1:
            layer=formImage(600,600)
            manager.generateGraphics(`Daiyousei`)
            char.push(new character(layer,manager,0,225,`Daiyousei`,-30))
            char[0].size=5
            char[0].display()
            return layer
        case 2:
            layer=formImage(600,600)
            manager.generateGraphics(`Meri`)
            char.push(new character(layer,manager,0,225,`Meri`,30))
            char[0].size=5
            char[0].display()
            return layer
        case 3:
            layer=formImage(600,600)
            manager.generateGraphics(`Duck`)
            char.push(new character(layer,manager,0,225,`Duck`,30))
            char[0].size=5
            char[0].display()
            return layer
        case 4:
            layer=formImage(3840,2160)
            layer.fillGradient(quickGradient(86,layer.height,[0.0,color(30,100,80),1.0,color(75,250,250)]))
            layer.push()
            layer.translate(-layer.width/2,-layer.height/2)
            layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
            layer.pop()

            let temp=[]
            for(let a=0,la=4;a<la;a++){
                temp.push(formImage(40,40))
                temp[a].noStroke()
                temp[a].rotate(45*type)
                for(let b=0,lb=6;b<lb;b++){
                    temp[a].fill(160,240,240)
                    temp[a].rotate(180/lb)
                    temp[a].triangle(0,0,4,4,5,20)
                    temp[a].fill(120,200,240)
                    temp[a].rotate(180/lb)
                    temp[a].triangle(0,0,4,4,5,20)
                }
            }

            for(let a=0,la=6;a<la;a++){
                layer.fill(mergeColor([120,200,200],[200,250,250],a/la*0.7+a%2*0.3))
                layer.beginShape()
                layer.vertex(-layer.width*0.5,layer.height)
                let c=random(0.5,0.6)
                let d=0
                let e=[]
                for(let b=0,lb=41-a*4;b<lb;b++){
                    d=((b==0||b==lb-1?c:random(0.5,0.6))+a/la*0.3)
                    layer.vertex(layer.width*(b/(lb-1)-0.5),layer.height*(d-0.5))
                    e.push(d)
                }
                layer.vertex(layer.width*0.5,layer.height)
                layer.endShape()
                for(let b=0,lb=e.length-1;b<lb;b++){
                    if(floor(random(0,3))!=0){
                        let c=random(0,1)
                        let d=random(32,50)
                        layer.image(temp[floor(random(0,4))],layer.width*(constrain(map(c,0,1,b/lb,(b+1)/lb),0.01,0.99)-0.5),layer.height*(map(c,0,1,e[b],e[b+1])-0.5),d,d)
                    }
                }
            }
            for(let a=0,la=3;a<la;a++){
                for(let b=0,lb=1000;b<lb;b++){
                    let key=(a+b)%3
                    layer.fill(100,255-key*100,100+key*155,0.025)
                    layer.ellipse(((b+0.5)/lb-0.5)*layer.width*1.05+random(-15,15),sin(b/lb*720+key*100)*150-layer.height*0.3+random(-30,30),random(40,80))
                }
            }
            for(let a=0,la=80;a<la;a++){
                layer.push()
                layer.translate(((a+0.5)/la-0.5)*layer.width,layer.height*random(-0.5,-0.1))
                layer.rotate(random(-1,1))
                layer.scale(random(0.4,1.2))
                layer.noStroke()
                layer.fill(240,255,255,0.5)
                layer.quad(-1.5,0,0,-15,1.5,0,0,15)
                layer.quad(-15,0,0,-1.5,15,0,0,1.5)
                if(floor(random(0,3))==0){
                    layer.noFill()
                    layer.stroke(240,255,255,0.5)
                    layer.strokeWeight(1.5)
                    layer.ellipse(0,0,12)
                }
                layer.pop()
            }

            for(let a=0,la=layer.width/25;a<la;a++){
                for(let b=0,lb=layer.height/25;b<lb;b++){
                    if(floor(random(0,6))==0){
                        layer.fill(random(150,175)+b/lb*100,random(200,225)+b/lb*50,255,0.75)
                        layer.ellipse(((a+random(0.1,0.9))/la-0.5)*layer.width,((b+random(0.1,0.9))/lb-0.5)*layer.height,random(2,4),random(4,6))
                    }
                }
            }

            layer.fill(140,200,180)
            layer.beginShape()
            layer.vertex(layer.width*0.5,layer.height*0.5-700)
            layer.vertex(layer.width*0.5-300,layer.height*0.5-800)
            layer.vertex(layer.width*0.5-700,layer.height*0.5-750)
            layer.vertex(layer.width*0.5-1100,layer.height*0.5-760)
            layer.vertex(layer.width*0.5-1250,layer.height*0.5-650)
            layer.vertex(layer.width*0.5-1200,layer.height*0.5-550)
            layer.vertex(layer.width*0.5-850,layer.height*0.5-400)
            layer.vertex(layer.width*0.5-630,layer.height*0.5-200)
            layer.vertex(layer.width*0.5-550,layer.height*0.5)
            layer.vertex(layer.width*0.5,layer.height*0.5)
            layer.endShape()

            let points=[
                [layer.width*0.5,layer.height*0.5-700],
                [layer.width*0.5-300,layer.height*0.5-800],
                [layer.width*0.5-700,layer.height*0.5-750],
                [layer.width*0.5-1100,layer.height*0.5-760],
                [layer.width*0.5-1250,layer.height*0.5-650],
            ]
            let length=0
            let dists=[]
            for(let a=0,la=points.length-1;a<la;a++){
                dists.push(dist(points[a][0],points[a][1],points[a+1][0],points[a+1][1]))
                length+=dist(points[a][0],points[a][1],points[a+1][0],points[a+1][1])
            }
            for(let a=0,la=500;a<la;a++){
                let loc=100*a%length
                let part=0
                while(part<dists.length-1&&loc>dists[part]){
                    loc-=dists[part]
                    part++
                }
                let size=random(0.8,1.2)
                let send=random(0.5,2)
                let pos=[
                    map(loc/dists[part],0,1,points[part][0],points[part+1][0])+random(-10,10),
                    map(loc/dists[part],0,1,points[part][1],points[part+1][1])+random(-10,10),
                ]
                layer.fill(random(230,250))
                layer.ellipse(...pos,20*size)
                let dir=random(-2,2)
                layer.triangle(
                    pos[0]+lcos(dir)*6*size,
                    pos[1]+lsin(dir)*6*size,
                    pos[0]-lcos(dir)*6*size,
                    pos[1]-lsin(dir)*6*size,
                    pos[0]-lsin(dir)*60*send*size,
                    pos[1]+lcos(dir)*60*send*size
                )
            }

            manager.generateGraphics(`Shiru`)
            char.push(new character(layer,manager,layer.width*0.5-700,310,`Shiru`,30))
            char[0].size=8
            for(let a=0,la=2;a<la;a++){
                char[0].components.head.eye[a].spin+=1.5-a*3
                char[0].components.head.eye[a].level+=0.5
            }
            char[0].components.head.mouth.anim.x--
            char[0].components.head.mouth.anim.y-=0.5
            char[0].components.head.mouth.level+=0.25

            char[0].components.arms[0].anim.top.theta=-84
            char[0].components.arms[0].anim.middle.theta=30
            char[0].components.arms[0].anim.middle.phi=54

            char[0].components.arms[1].anim.top.theta=84
            char[0].components.arms[1].anim.middle.theta=-39
            char[0].components.arms[1].anim.middle.phi=54

            char[0].components.legs[0].anim.top.phi=3
            char[0].components.legs[0].anim.middle.phi=12

            char[0].components.legs[1].anim.top.phi=18
            char[0].components.legs[1].anim.middle.phi=6
            char[0].components.legs[1].anim.middle.theta=-90

            char[0].display()

            layer.push()
            layer.translate(layer.width*0.5-660,layer.height*0.5-1040)
            layer.scale(2)
            layer.noFill()
            layer.stroke(250,0.75)
            layer.strokeWeight(3)
            layer.rotate(-20)
            layer.arc(-15,-24,16,40,95,160)
            layer.rotate(10)
            layer.arc(-13,-26,12,36,95,160)
            layer.rotate(30)
            layer.arc(15,-20,16,40,20,85)
            layer.rotate(-10)
            layer.arc(13,-26,12,36,20,85)
            layer.rotate(-10)
            layer.noStroke()
            layer.fill(123,189,156)
            for(let a=0,la=15;a<la;a++){
                layer.triangle(-2.25,12,2.25,12,0,21)
                layer.rotate(360/la)
            }
            let colors=[[206,111,147],[234,147,180],[253,173,205],[236,141,177],[251,158,193],[255,177,210],[255,203,235]]
            let offset=[15,10,25,-15,10,15,10,25,-15]
            for(let a=0,la=7;a<la;a++){
                layer.fill(colors[a][0],colors[a][1],colors[a][2])
                for(let b=0,lb=9;b<lb;b++){
                    layer.ellipse(0,9-a,6-a*2/3,18-a*2)
                    layer.rotate(360/la)
                }
                layer.rotate(offset[a])
            }
            layer.pop()

            return layer
        case 5:
            layer=formImage(3072,1492)
            layer.fillGradient(quickGradient(86,layer.height,[0.0,color(50,50,50),1.0,color(70,70,70)]))
            layer.push()
            layer.translate(-layer.width/2,-layer.height/2)
            layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
            layer.pop()
            tick=0
            for(let a=0,la=6;a<la;a++){
                let h=((a+0.95)/la*0.925-0.5)*layer.height
                layer.fill(80)
                layer.rect(0,h,layer.width,20)
                layer.fill(100)
                for(let b=0,lb=36;b<lb;b++){
                    layer.ellipse(((b+0.1+a%2*0.5)/lb-0.5)*layer.width,h,8)
                    layer.ellipse(((b+0.9+a%2*0.5)/lb-0.5)*layer.width,h,8)
                    layer.rect(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h,30,2)
                }
                for(let b=-a%2,lb=80;b<lb;b++){
                    if(!(a==4&&b==54)){
                        layer.fill(160,200-random(0,100),40)
                        layer.rect(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h-95,24,170)
                        layer.fill(180)
                        layer.rect(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h-95,14,110)
                        layer.push()
                        layer.translate(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h-95)
                        layer.rotate(-90)
                        layer.fill(0)
                        layer.textSize(10)
                        layer.text('MMIB-1052ME-'+('0000'+(1649+tick)).slice(-4),0,0)
                        layer.pop()
                    }
                    tick++
                }
            }

            for(let a=0,la=320;a<la;a++){
                layer.fill(60-a/la*60)
                layer.rect(0,layer.height*0.5-160+a*0.5,layer.width,320-a)
            }

            layer.fill(160,200-random(0,100),40)
            layer.rect(layer.width*0.36-500,layer.height*0.5-310,170,24)
            layer.fill(180)
            layer.rect(layer.width*0.36-500,layer.height*0.5-310,110,14)
            layer.fill(0)
            layer.textSize(10)
            layer.text('MMIB-1052ME-2025',layer.width*0.36-500,layer.height*0.5-310)

            for(let a=0,la=18;a<la;a++){
                let d=(a+random(0.3,0.7))/la*360
                let r=random(240,320)+a%2*100
                layer.push()
                layer.translate(layer.width*0.36-680+lsin(d)*r,layer.height*0.35-170+lcos(d)*r)
                layer.rotate(random(-1,1))
                layer.scale(random(0.8,1.2))
                layer.noStroke()
                layer.fill(200,255,225,0.5)
                layer.quad(-1.5,0,0,-15,1.5,0,0,15)
                layer.quad(-15,0,0,-1.5,15,0,0,1.5)
                if(floor(random(0,3))!=0){
                    layer.noFill()
                    layer.stroke(200,255,225,0.5)
                    layer.strokeWeight(1.5)
                    layer.ellipse(0,0,12)
                }
                layer.pop()
            }

            manager.generateGraphics(`Daiyousei`)
            char.push(new character(layer,manager,layer.width*0.36-680,layer.height*0.5-135,`Daiyousei`,-33))
            char[0].size=5
            char[0].components.dress.anim.wide=1.2
            char[0].components.dress.anim.lift=3
            char[0].components.hair.bow.spin-=9
            char[0].components.wing.anim.size=1.5
            char[0].components.wing.anim.lift=8

            char[0].components.arms[0].anim.top.theta=-90
            char[0].components.arms[0].anim.top.phi=36
            char[0].components.arms[0].anim.middle.theta=-90
            char[0].components.arms[0].anim.middle.phi=72

            char[0].components.arms[1].anim.top.theta=90
            char[0].components.arms[1].anim.top.phi=48
            char[0].components.arms[1].anim.middle.theta=90
            char[0].components.arms[1].anim.middle.phi=81

            char[0].components.legs[0].anim.top.phi=42
            char[0].components.legs[0].anim.middle.theta=-60
            char[0].components.legs[0].anim.middle.phi=114

            char[0].components.legs[1].anim.top.phi=36
            char[0].components.legs[1].anim.middle.theta=123
            char[0].components.legs[1].anim.middle.phi=99

            char[0].display()

            overlayer=formImage(3840,2160)
            overlayer.fill(0,0.8)
            overlayer.rect(0,0,layer.width,layer.height)
            overlayer.erase()
            for(let a=0,la=500;a<la;a++){
                overlayer.fill(0,(a+1)/la*0.05)
                overlayer.ellipse(layer.width*0.36-680,layer.height*0.35-200,1350*(1-a/la),900*(1-a/la))
            }

            layer.image(overlayer,0,0)
            
            return layer
        case 6:
            layer=formImage(3840,2160)
            layer.fillGradient(quickGradient(86,layer.height,[0.0,color(0,30,120),1.0,color(120,180,255)]))
            layer.push()
            layer.translate(-layer.width/2,-layer.height/2)
            layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
            layer.pop()
            manager.generateGraphics(`Meri`)
            char.push(new character(layer,manager,0,125,`Meri`,-42))
            char[0].size=5
            char[0].direction.external=75
            char[0].offset.position.y+=225
            char[0].components.dress.anim.reverse=true
            char[0].components.dress.anim.wide=1.5
            char[0].components.dress.anim.lift=3
            char[0].components.dress.bow.anim.size=1.5
            char[0].components.dress.bow.anim.length=4
            char[0].components.dress.bow.anim.fall=-0.25
            char[0].components.dress.bow.anim.swivel=[1.25,1.5]
            for(let a=0,la=2;a<la;a++){
                char[0].components.head.eye[a].style=[2,0.6]
                char[0].components.head.eye[a].anim=1
                char[0].components.head.eye[a].level+=0.75
            }
            char[0].components.head.mouth.anim.x*=0.75
            char[0].components.head.mouth.anim.y*=0.45
            char[0].components.head.mouth.anim.wide=18
            char[0].components.head.mouth.level+=1.25

            char[0].components.arms[0].anim.top.theta=-90
            char[0].components.arms[0].anim.top.phi=33
            char[0].components.arms[0].anim.middle.theta=42
            char[0].components.arms[0].anim.middle.phi=48

            char[0].components.arms[1].anim.top.theta=90
            char[0].components.arms[1].anim.top.phi=33
            char[0].components.arms[1].anim.middle.theta=-18
            char[0].components.arms[1].anim.middle.phi=54

            char[0].components.legs[0].anim.top.theta=-48
            char[0].components.legs[0].anim.top.phi=66
            char[0].components.legs[0].anim.middle.theta=-60
            char[0].components.legs[0].anim.middle.phi=48

            char[0].components.legs[1].anim.top.theta=-30
            char[0].components.legs[1].anim.top.phi=54
            char[0].components.legs[1].anim.middle.theta=-15
            char[0].components.legs[1].anim.middle.phi=24
            char[0].display()
            glitch(layer,5,200,200)

            overlayer=formImage(3840,2160)
            
            for(let a=0,la=15;a<la;a++){
                let x=((a+random(0.15,0.75))/la-0.5)*layer.width
                let y=layer.height*random(0.4,0.65)
                let w=random(80,120)
                let c=[random(0,1)]
                overlayer.fill(100+c[0]*60,100+c[0]*60,120+c[0]*60)
                overlayer.rect(x,y-100,w,600)
                overlayer.fill(120+c[0]*60,120+c[0]*60,140+c[0]*60)
                let chunk=[random(0,10),random(0,5)]
                for(let b=0,lb=10;b<lb;b++){
                    overlayer.rect(x,y-400+b*(60+chunk[0]+chunk[1]),w+10,(40+chunk[0]))
                }
            }
            overlayer.erase()
            overlayer.fill(0,0.1)
            for(let a=0,la=overlayer.height;a<la;a++){
                if(a%10==0){
                    overlayer.rect(0,-overlayer.height/2+(a+1)/2,overlayer.width,a+1)
                }
            }

            layer.image(overlayer,0,0)

            overlayer=formImage(3840,2160)
            
            let p=layer.height*0.05
            let v=12
            for(let a=0,la=250;a<la;a++){
                p+=v
                v+=random(-1,1)-(p-layer.height*0.05)*0.075
                let btick=0
                let x=((a+0.5)/la-0.5)
                for(let b=p+sqrt(0.5-abs(x))*layer.height*0.4+random(0,50),lb=layer.height;b<lb;b+=random(16,20)){
                    btick++
                    let c=[lsin(a/la*360*6)*0.5+random(0,0.5),random(0,1)]
                    x=((a+random(0,0.5)+btick%2*0.5)/la-0.5)
                    overlayer.fill(200+c[0]*20,200+c[0]*20+c[1]*20,220+c[0]*20+c[1]*20)
                    overlayer.ellipse(x*layer.width,b,random(24,30))
                }
            }
            for(let a=0,la=20;a<la;a++){
                overlayer.push()
                let d=(a+random(0.4,0.6))/la*360
                let r=random(overlayer.width*0.3,overlayer.width*0.5)+a%2*overlayer.width*0.15
                let size=random(1,1.2)
                overlayer.push()
                overlayer.translate(lsin(d)*r,overlayer.height*0.05+lcos(d)*r*0.6)
                for(let b=0,lb=random(1000,4000);b<lb;b++){
                    let c=[random(0,1),random(0,1)]
                    overlayer.fill(200+c[0]*20,200+c[0]*20+c[1]*20,220+c[0]*20+c[1]*20,0.025)
                    let d=b*19
                    let r=(sqrt(random(0,60000*(1-b/lb*0.8))))*random(1,1.2)*size
                    overlayer.ellipse(lsin(d)*r,lcos(d)*r*0.5,random(24,30))
                }
                overlayer.pop()
            }

            overlayer.erase()
            for(let a=0,la=overlayer.width;a<la;a++){
                overlayer.fill(0,0.1*a/la)
                if(a%20==0){
                    overlayer.ellipse(0,layer.height*0.35,la-a,layer.height)
                }
            }

            layer.image(overlayer,0,0)

            for(let a=0,la=18;a<la;a++){
                let d=(a+random(0.3,0.7))/la*360
                let r=random(320,480)+a%2*120
                layer.push()
                layer.translate(lsin(d)*r,layer.height*0.05+lcos(d)*r)
                layer.rotate(random(-1,1))
                layer.scale(random(0.8,1.2))
                layer.noStroke()
                layer.fill(200,255,255,0.5)
                layer.quad(-1.5,0,0,-15,1.5,0,0,15)
                layer.quad(-15,0,0,-1.5,15,0,0,1.5)
                if(floor(random(0,3))!=0){
                    layer.noFill()
                    layer.stroke(200,255,255,0.5)
                    layer.strokeWeight(1.5)
                    layer.ellipse(0,0,12)
                }
                layer.pop()
            }

            return layer
        case 7:
            layer=formImage(1505,1492)
            layer.fillGradient(quickGradient(86,layer.height,[0.0,color(50,50,50),1.0,color(70,70,70)]))
            layer.push()
            layer.translate(-layer.width/2,-layer.height/2)
            layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
            layer.pop()
            tick=0
            for(let a=0,la=6;a<la;a++){
                let h=((a+0.95)/la*0.925-0.5)*layer.height
                layer.fill(80)
                layer.rect(0,h,layer.width,20)
                layer.fill(100)
                for(let b=0,lb=36;b<lb;b++){
                    layer.ellipse(((b+0.1+a%2*0.5)/lb-0.5)*layer.width,h,8)
                    layer.ellipse(((b+0.9+a%2*0.5)/lb-0.5)*layer.width,h,8)
                    layer.rect(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h,30,2)
                }
                for(let b=-a%2,lb=38;b<lb;b++){
                    if(!(a==4&&b==22)){
                        layer.fill(160,200-random(0,100),40)
                        layer.rect(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h-95,24,170)
                        layer.fill(180)
                        layer.rect(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h-95,14,110)
                        layer.push()
                        layer.translate(((b+0.5+a%2*0.5)/lb-0.5)*layer.width,h-95)
                        layer.rotate(-90)
                        layer.fill(0)
                        layer.textSize(10)
                        layer.text('MMIB-1052ME-'+('0000'+(1849+tick)).slice(-4),0,0)
                        layer.pop()
                    }
                    tick++
                }
            }

            for(let a=0,la=320;a<la;a++){
                layer.fill(60-a/la*60)
                layer.rect(0,layer.height*0.5-160+a*0.5,layer.width,320-a)
            }

            layer.fill(160,200-random(0,100),40)
            layer.rect(180,layer.height*0.5-310,170,24)
            layer.fill(180)
            layer.rect(180,layer.height*0.5-310,110,14)
            layer.fill(0)
            layer.textSize(10)
            layer.text('MMIB-1052ME-2025',180,layer.height*0.5-310)

            for(let a=0,la=18;a<la;a++){
                let d=(a+random(0.3,0.7))/la*360
                let r=random(240,320)+a%2*100
                layer.push()
                layer.translate(lsin(d)*r,layer.height*0.35-170+lcos(d)*r)
                layer.rotate(random(-1,1))
                layer.scale(random(0.8,1.2))
                layer.noStroke()
                layer.fill(200,255,225,0.5)
                layer.quad(-1.5,0,0,-15,1.5,0,0,15)
                layer.quad(-15,0,0,-1.5,15,0,0,1.5)
                if(floor(random(0,3))!=0){
                    layer.noFill()
                    layer.stroke(200,255,225,0.5)
                    layer.strokeWeight(1.5)
                    layer.ellipse(0,0,12)
                }
                layer.pop()
            }

            manager.generateGraphics(`Daiyousei`)
            char.push(new character(layer,manager,0,layer.height*0.5-135,`Daiyousei`,-33))
            char[0].size=5
            char[0].components.dress.anim.wide=1.2
            char[0].components.dress.anim.lift=3
            char[0].components.hair.bow.spin-=9
            char[0].components.wing.anim.size=1.5
            char[0].components.wing.anim.lift=8

            char[0].components.arms[0].anim.top.theta=-90
            char[0].components.arms[0].anim.top.phi=36
            char[0].components.arms[0].anim.middle.theta=-90
            char[0].components.arms[0].anim.middle.phi=72

            char[0].components.arms[1].anim.top.theta=90
            char[0].components.arms[1].anim.top.phi=48
            char[0].components.arms[1].anim.middle.theta=90
            char[0].components.arms[1].anim.middle.phi=81

            char[0].components.legs[0].anim.top.phi=42
            char[0].components.legs[0].anim.middle.theta=-60
            char[0].components.legs[0].anim.middle.phi=114

            char[0].components.legs[1].anim.top.phi=36
            char[0].components.legs[1].anim.middle.theta=123
            char[0].components.legs[1].anim.middle.phi=99

            char[0].display()

            overlayer=formImage(3840,2160)
            overlayer.fill(0,0.8)
            overlayer.rect(0,0,layer.width,layer.height)
            overlayer.erase()
            for(let a=0,la=500;a<la;a++){
                overlayer.fill(0,(a+1)/la*0.05)
                overlayer.ellipse(0,layer.height*0.35-200,1350*(1-a/la),900*(1-a/la))
            }

            layer.image(overlayer,0,0)
            
            return layer
        case 8:
            layer=formImage(600,600)
            manager.generateGraphics(`Daiyousei`)
            char.push(new character(layer,manager,0,125,`Daiyousei`,30))
            char[0].size=5
            char[0].display()
            return layer
    }
}