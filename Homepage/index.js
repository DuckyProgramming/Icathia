function formatNumber(base){
    if(base<10){
        return '0'+base
    }else{
        return base
    }
}
function formatDay(base){
    switch(base){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}
function quickMouse(x,y,widthC,heightC){
    return mouseX/width*graphics.main.width>x-widthC/2&&mouseX/width*graphics.main.width<x+widthC/2&&mouseY/height*graphics.main.height>y-heightC/2&&mouseY/height*graphics.main.height<y+heightC/2
}
function mouseClicked(){
    if(width<1000){
        for(let a=0;a<tabName.length;a++){
            if(tabTrigger[a]){
                for(let b=0,lb=tabList[a].length;b<lb;b++){
                    if(quickMouse(graphics.main.width/2,100+b*160,720,120)){
                        window.open(tabURL[a][b])
                    }
                }
            }
        }
        for(let a=0;a<tabName.length;a++){
            tabTrigger[a]=false
        }
        noTabTrigger=true
        for(let a=0;a<tabName.length;a++){
            if(quickMouse(graphics.main.width/2,100+a*160,720,120)){
                tabTrigger[a]=true
                noTabTrigger=false
            }
        }
    }else{
        for(let a=0;a<tabName.length;a++){
            if(tabTrigger[a]){
                for(let b=0,lb=tabList[a].length;b<lb;b++){
                    if(quickMouse(600,100+b*160,720,120)){
                        window.open(tabURL[a][b])
                    }
                }
            }
        }
        for(let a=0;a<tabName.length;a++){
            tabTrigger[a]=false
        }
        noTabTrigger=true
        for(let a=0;a<tabName.length;a++){
            if(quickMouse(600,100+a*160,720,120)){
                tabTrigger[a]=true
                noTabTrigger=false
            }
        }
    }
}
function keyPressed(){
    for(let a=0;a<tabName.length;a++){
        if(tabTrigger[a]){
            for(let b=0,lb=tabList[a].length;b<lb;b++){
                if(int(key)==b+1){
                    window.open(tabURL[a][b])
                }
            }
        }
    }
    for(let a=0;a<tabName.length;a++){
        tabTrigger[a]=false
    }
    noTabTrigger=true
    for(let a=0;a<tabName.length;a++){
        if(int(key)==a+1){
            tabTrigger[a]=true
            noTabTrigger=false
        }
    }
}
function setup(){
    date=new Date()
    tabName=['Programming','Random','School']
    tabList=[
        ['p5.js Reference','GitHub','OpenProcessing','Khan Academy'],
        ['Gmail','Wikipedia','Random Page'],
        ['Classlink','Infinite Campus','AP Classroom','Canvas'],
    ]
    tabURL=[
        ['https://p5js.org/reference/','https://github.com/DuckyProgramming','https://openprocessing.org/user/136141/?o=6&view=sketches','https://www.khanacademy.org/profile/kaid_253672516860707312241676/projects'],
        ['https://mail.google.com/mail/u/1/#inbox','https://en.wikipedia.org/wiki/Main_Page','https://en.wikipedia.org/wiki/Special:Random'],
        ['https://launchpad.classlink.com/fcs','https://campus.fultonschools.org/campus/fulton.jsp?status=login','https://prod.idp.collegeboard.org/','https://login.microsoftonline.com/0cdcb198-8169-4b70-ba9f-da7e3ba700c2/saml2?SAMLRequest=fZJPj9MwEMXvfIrIdyduEprGaiuVrRCVFqi2ZQ9ckDOZbC05dvHYwH573JQ%2Fi9Dudew3v%2FeeZklqNGe5ieFk7%2FBrRArZj9FYktPDikVvpVOkSVo1IskA8rB5fyvLXMizd8GBM%2ByJ5GWFIkIftLMs221X7EtVdwD9vOTVfN7yuq4Fb%2BtO8aqqsRUVDDhHlt2jp6RZsbQiCYki7iwFZUMaibLmYsHL9iiErBr5uvnMsm3Koa0Kk%2BoUwplkURj3oG0%2BavCO3BCcNdpiDm4sBPTQzdoFX8wuNrpG8E61A%2B9Vg1WnGiGgLC7pSpZtfke4cZbiiP6A%2FpsG%2FHR3%2Bxc1RJP2E5ycM5TrZNZHCNFfcZORaR%2FL9r86fKNtr%2B3Dy%2FV1108k3x2Pe77%2FeDiy9fKyR06l%2BPWF%2FwcPLtrwqOE%2F%2FpRkWTwVLq938CEhd9u9Mxoes7fOjyo872iWz6aJ7vkwfZXR0hlBDxr7VJQx7vuNRxVwxRIfWbG%2BQv%2B9t%2FWrnw%3D%3D&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=K2HEMhgnT%2Fp2kPSU7HsnUGOF7jF1OpuOJUf1AeWDSBjiBCmNZluXEwT359VkD7hFUW%2BoWVox%2FS9ZuPKKXW2T%2FXm%2BEx5T1WHBv1wrijbMLF4sK71Y%2B5Dt8stlrCsb%2F7y7gmuSPSAVJSleuypooNym2yl%2BlhoK1vslAWxH5ierSwbHJIJIuGiQUfaFILyx6LuVOvQxPgUN88WTwd%2BEW3cW0mb2nKz5W%2BSBMP0EirOuqIEZSYLYskNDrlmw6zrWFiqVm%2BjtafxJ%2BJmrtxdJDQZwyxbxSXpj8VcP0%2F18a3ZhvQvabELm2kKzuZ8m792fmt89uhZEc4H%2BHXnCSHze5tXfcg%3D%3D'],
    ]
    tabTrigger=[]
    tabFade=[]
    for(let a=0,la=tabName.length;a<la;a++){
        tabTrigger.push(false)
        tabFade.push(0)
    }
    noTabTrigger=true
    noTabFade=1
    rands=[]
    for(let a=0,la=1+tabName.length;a<la;a++){
        rands.push(random(0,100))
    }
    underRands=[]
    for(let a=0;a<tabName.length;a++){
        underRands.push([])
        for(let b=0,lb=tabList[a].length;b<lb;b++){
            underRands[a].push(random(0,100))
        }
    }
    createCanvas(windowWidth-20,windowHeight-25)
    graphics={main:createGraphics(width<1000?1478:3016,1426)}
    graphics.main.rectMode(CENTER)
    graphics.main.colorMode(RGB,255,255,255,1)
    graphics.main.textAlign(CENTER,CENTER)
}
function windowResized(){
    resizeCanvas(windowWidth-20,windowHeight-25)
    graphics.main=createGraphics(width<1000?1478:3016,1426)
    graphics.main.rectMode(CENTER)
    graphics.main.colorMode(RGB,255,255,255,1)
    graphics.main.textAlign(CENTER,CENTER)
}
function draw(){
    date=new Date()
    graphics.main.clear()
    if(width<1000){
        document.body.style.backgroundImage='url(Album/HalfDai.png)'
        graphics.main.noStroke()
        if(noTabTrigger&&noTabFade<1){
            noTabFade=round(noTabFade*10+1)/10
        }
        if(!noTabTrigger&&noTabFade>0){
            noTabFade=round(noTabFade*10-1)/10
        }
        for(let a=0;a<tabName.length;a++){
            if(tabTrigger[a]&&tabFade[a]<1){
                tabFade[a]=round(tabFade[a]*10+1)/10
            }
            if(!tabTrigger[a]&&tabFade[a]>0){
                tabFade[a]=round(tabFade[a]*10-1)/10
            }
        }
        for(let a=0;a<tabName.length;a++){
            if(tabFade[a]>0){
                for(let b=0,lb=tabList[a].length;b<lb;b++){
                    graphics.main.fill(160,200-underRands[a][b],40,tabFade[a])
                    graphics.main.rect(graphics.main.width*0.5,100+b*160,720,120,8)
                    graphics.main.fill(180,tabFade[a])
                    graphics.main.rect(graphics.main.width*0.5,100+b*160,540,80,6)
                }
            }
        }
        graphics.main.fill(160,200-rands[0],40,noTabFade)
        graphics.main.rect(graphics.main.width*0.5,220,960,340,12)
        graphics.main.fill(180,noTabFade)
        graphics.main.rect(graphics.main.width*0.5,220,720,260,8)
        graphics.main.fill(0,noTabFade)
        graphics.main.textSize(120)
        graphics.main.text(formatNumber(date.getHours())+':'+formatNumber(date.getMinutes())+':'+formatNumber(date.getSeconds()),graphics.main.width*0.5,160)
        graphics.main.textSize(80)
        graphics.main.text(date.getDate()+'/'+('0'+(date.getMonth()+1)).slice(-2)+'/'+date.getFullYear(),graphics.main.width*0.5,260)
        graphics.main.textSize(40)
        graphics.main.text(formatDay(date.getDay()),graphics.main.width*0.5,320)
        graphics.main.textSize(50)
        for(let a=0;a<tabName.length;a++){
            if(tabFade[a]>0){
                graphics.main.fill(0,tabFade[a])
                for(let b=0,lb=tabList[a].length;b<lb;b++){
                    graphics.main.text(tabList[a][b],graphics.main.width*0.5,100+b*160)
                }
            }
        }
    }else{
        document.body.style.backgroundImage='url(Album/Dai.png)'
        graphics.main.noStroke()
        if(noTabTrigger&&noTabFade<1){
            noTabFade=round(noTabFade*10+1)/10
        }
        if(!noTabTrigger&&noTabFade>0){
            noTabFade=round(noTabFade*10-1)/10
        }
        for(let a=0;a<tabName.length;a++){
            graphics.main.fill(160,200-rands[a+1],40,noTabFade)
            graphics.main.rect(600,100+a*160,720,120,8)
            graphics.main.fill(180,noTabFade)
            graphics.main.rect(600,100+a*160,540,80,6)
            if(tabTrigger[a]&&tabFade[a]<1){
                tabFade[a]=round(tabFade[a]*10+1)/10
            }
            if(!tabTrigger[a]&&tabFade[a]>0){
                tabFade[a]=round(tabFade[a]*10-1)/10
            }
        }
        for(let a=0;a<tabName.length;a++){
            if(tabFade[a]>0){
                for(let b=0,lb=tabList[a].length;b<lb;b++){
                    graphics.main.fill(160,200-underRands[a][b],40,tabFade[a])
                    graphics.main.rect(600,100+b*160,720,120,8)
                    graphics.main.fill(180,tabFade[a])
                    graphics.main.rect(600,100+b*160,540,80,6)
                }
            }
        }
        graphics.main.fill(160,200-rands[0],40)
        graphics.main.rect(graphics.main.width*0.64,220,960,340,12)
        graphics.main.fill(180)
        graphics.main.rect(graphics.main.width*0.64,220,720,260,8)
        graphics.main.fill(0)
        graphics.main.textSize(120)
        graphics.main.text(formatNumber(date.getHours())+':'+formatNumber(date.getMinutes())+':'+formatNumber(date.getSeconds()),graphics.main.width*0.64,160)
        graphics.main.textSize(80)
        graphics.main.text(date.getDate()+'/'+('0'+(date.getMonth()+1)).slice(-2)+'/'+date.getFullYear(),graphics.main.width*0.64,260)
        graphics.main.textSize(40)
        graphics.main.text(formatDay(date.getDay()),graphics.main.width*0.64,320)
        graphics.main.textSize(50)
        for(let a=0;a<tabName.length;a++){
            graphics.main.fill(0,noTabFade)
            graphics.main.text(tabName[a],600,100+a*160)
        }
        for(let a=0;a<tabName.length;a++){
            if(tabFade[a]>0){
                graphics.main.fill(0,tabFade[a])
                for(let b=0,lb=tabList[a].length;b<lb;b++){
                    graphics.main.text(tabList[a][b],600,100+b*160)
                }
            }
        }
    }
    clear()
    image(graphics.main,0,0,height*graphics.main.width/graphics.main.height,height)
}