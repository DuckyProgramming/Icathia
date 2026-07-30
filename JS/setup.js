function setup(){
    setupGraphics()
    graphics.main=displayScene(scene.index)
    createCanvas(graphics.main.width,graphics.main.height)
    image(graphics.main,width/2,height/2,width,height)
}