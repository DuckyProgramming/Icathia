function formImage(width,height){
    let layer=createGraphics(width,height)
    setupLayer(layer)
    layer.translate(layer.width/2,layer.height/2)
    return layer
}
function displayScene(type){
    let manager=new graphicsManager();
    let layer
    let char=[]
    switch(type){
        case 0:
            layer=formImage(600,600)
            manager.generateGraphics(`Shiru`)
            char.push(new character(layer,manager,0,125,`Shiru`,30))
            char[0].size=5
            char[0].components.arms[0].anim.top.theta=-75
            char[0].components.arms[0].anim.middle.theta=60
            char[0].components.arms[0].anim.middle.phi=60
            char[0].display()
            return layer
        case 1:
            layer=formImage(600,600)
            manager.generateGraphics(`Meri`)
            char.push(new character(layer,manager,0,125,`Meri`,30))
            char[0].size=5
            char[0].display()
            return layer
    }
}