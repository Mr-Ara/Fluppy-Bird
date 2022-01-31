var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var frames = 0
var Degree = Math.PI/180

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
            bird.rotation = 0
            bird.speed = 0
            pipes.position =[]
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
    dx : 2,
    draw : function(){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h)
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x + this.w - 7,this.y,this.w,this.h)
    },
    update : function(){
        this.x = (this.x - this.dx) % (this.w/2 - 15)
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

var pipes ={
    top:{
        sX: 5,
        sY: 0,
        h: 100

    },
    bottom:{
        sX: 85,
        sY: 0,
        h:60
    },
    w:75,
    dx:2,
    gap:80,
    position:[],
    maxYpos: 150,
   draw : function () {
    for (let i = 0; i < this.position.length; i++) {
         var p = this.position[i];
         var TopP = p.y;
         var bottomY =  this.gap + 50 + p.y

         ctx.drawImage(sprite,this.top.sX,this.top.sY,this.w,this.top.h,p.x,0,this.w,TopP-this.gap)
         ctx.drawImage(sprite,this.bottom.sX,this.bottom.sY,this.w,this.bottom.h,p.x,bottomY - 50,this.w,bottomY)
         
    }
   },
   
   update : function (){
    if(s.cr != s.game)return;
    if(frames % 100 == 0){
        this.position.push({
            x:canvas.width,
            y:this.maxYpos * (Math.random()+1)
        })
    }
    for (let i = 0; i < this.position.length; i++) {
        var p = this.position[i]  
        p.x -= this.dx     
        
        
        if(p.x + this.w < 0 ){
            this.position.shift()
        }
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
    speed : 0,
    gravity : 0.25,
    jump: 4.6,
    rotation:0,
    draw : function(){
        var bird = this.animate[this.animationIndex]
       
        ctx.save()
        ctx.translate(this.x ,this.y)
        ctx.rotate(this.rotation)
        if(s.cr == s.game){
        ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,-this.w/2 +15,-this.h/2,this.w,this.h)}
        ctx.restore()
    },
    updadeBird : function(){
        this.animationIndex += frames % 5 == 0 ? 1 : 0;
        this.animationIndex = this.animationIndex % this.animate.length

        if(s.cr == s.game){
            this.speed += this.gravity;
            this.y += this.speed

            if (this.speed < this.jump) {
                this.rotation = -25 * Degree
            }else{
                this.rotation = 90 * Degree
            }
        }

        if(this.y + this.h/2 > canvas.height - fg.h ){
            this.y =  canvas.height - fg.h - this.h/2
            if (s.cr == s.game) {
                s.cr = s.gover
            }
        }
    }, 
    flap : function(){
        this.speed -= this.jump
    }
}

function update(){

    bird.updadeBird()
    fg.update()
    pipes.update()
}


function draw(){
ctx.fillStyle = "#70c5ce"
ctx.fillRect(0,0,canvas.width , canvas.height)
bg.draw()
fg.draw()
pipes.draw()
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