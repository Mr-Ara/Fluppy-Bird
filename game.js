var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var frames = 0

var sprite = new Image();
sprite.src = "img/i2.png";


var s = {
   
   cr:0,
   getReady:0,
   game:1,
   gover:2
}

function clickHandler(){
    switch (s.cr) {
        case s.getReady:
            s.cr = s.game
            break;
        case s.game:
                bird.flap()
                break;
        default:
            s.cr = s.getReady
            break;
    }
}

document.addEventListener("click" , clickHandler )
document.addEventListener("keydown",(e)=>{
    if(e.keyCode == 32){
        clickHandler()}
})


var bg ={
    sX : 400,
    sY : 0,
    w : 230,
    h : 635,
    x : 0,
    y : canvas.height - 625,
    draw : function(){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h),
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + this.w -5,this.y,this.w,this.h)
    }
}

var fg ={
    sX : 650,
    sY : 15,
    w : 215,
    h : 135,
    x : 0,
    y : canvas.height - 135,
    draw : function(){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h)
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + this.w - 7,this.y,this.w,this.h)
    }
}


var getReady ={
    sX : 1100,
    sY : 80,
    w : 235,
    h : 65,
    x : canvas.width/2 - 235/2,
    y : canvas.height - 400,
    draw : function(){
        if(s.cr == s.getReady){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h)
        }
    }
}

var getReady2 ={
    sX : 890,
    sY : 160,
    w : 150,
    h : 150,
    x : canvas.width/2 - 145/2,
    y : canvas.height - 320,
    draw : function(){
        if(s.cr == s.getReady){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h)
        }
    }
}

var gameOver ={
    sX : 1090,
    sY : 150,
    w : 255,
    h : 65,
    x : canvas.width/2 - 255/2,
    y : canvas.height - 400,
    draw : function(){
        if(s.cr == s.gover){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h)
        }
    }
}

var gameOver2 ={
    sX : 650,
    sY : 475,
    w : 290,
    h : 150,
    x : canvas.width/2 - 290/2,
    y : canvas.height - 320,
    draw : function(){
        if(s.cr == s.gover){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h)
        }
    }
}

var bird ={
    animate:[
        {sX : 875 , sY : 10},
        {sX : 935 , sY : 10},
        {sX : 1000 , sY : 10},
        {sX : 935 , sY : 10}
    ],
    w : 60,
    h : 40,
    x : 20,
    y : 90,
    animationIndex : 0,
    draw : function(){
       
        var bird = this.animate[this.animationIndex]
        if(s.cr == s.game){
        ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,this.x,this.y,this.w,this.h)}
    },
    updadeBird : function(){
        this.animationIndex += frames % 5 == 0 ? 1 : 0;
        this.animationIndex = this.animationIndex % this.animate.length
    }, 
    flap : function(){

    }
}

function update(){

    bird.updadeBird()
}


function draw(){
ctx.fillStyle = "#70c5ce"
ctx.fillRect(0,0,canvas.width , canvas.height)
bg.draw()
fg.draw()
bird.draw()
getReady.draw()
getReady2.draw()
gameOver.draw()
gameOver2.draw()
}

function animate(){
    update()
    draw()
    frames ++
    requestAnimationFrame(animate)
}
animate() 