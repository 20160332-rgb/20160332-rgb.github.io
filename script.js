const game=document.getElementById("game");
const player=document.getElementById("player");
const gameWidth = 600;
const gameHeight = 700;
let px = 280;
let py = gameHeight - 60;

px = gameWidth / 2 - 20;
py = gameHeight - 60;

player.style.left = px + "px";
player.style.top = py + "px";
let life=1;
let time=0;

let playing=false;

let flyInterval;
let gameLoop;
let timer;
let difficulty=250;

const keys={};
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function pressLeft(){
    keys["ArrowLeft"]=true;
}

function releaseLeft(){
    keys["ArrowLeft"]=false;
}

function pressRight(){
    keys["ArrowRight"]=true;
}

function releaseRight(){
    keys["ArrowRight"]=false;
}

leftBtn.addEventListener("mousedown",pressLeft);
leftBtn.addEventListener("mouseup",releaseLeft);
leftBtn.addEventListener("mouseleave",releaseLeft);

rightBtn.addEventListener("mousedown",pressRight);
rightBtn.addEventListener("mouseup",releaseRight);
rightBtn.addEventListener("mouseleave",releaseRight);

leftBtn.addEventListener("touchstart",e=>{
    e.preventDefault();
    pressLeft();
});

leftBtn.addEventListener("touchend",releaseLeft);

rightBtn.addEventListener("touchstart",e=>{
    e.preventDefault();
    pressRight();
});

rightBtn.addEventListener("touchend",releaseRight);

leftBtn.addEventListener("touchstart", e=>{
    e.preventDefault();
    keys["ArrowLeft"] = true;
});

leftBtn.addEventListener("touchend", ()=>{
    keys["ArrowLeft"] = false;
});

rightBtn.addEventListener("touchstart", e=>{
    e.preventDefault();
    keys["ArrowRight"] = true;
});

rightBtn.addEventListener("touchend", ()=>{
    keys["ArrowRight"] = false;
});
leftBtn.addEventListener("mousedown", ()=>keys["ArrowLeft"]=true);
leftBtn.addEventListener("mouseup", ()=>keys["ArrowLeft"]=false);
leftBtn.addEventListener("mouseleave", ()=>keys["ArrowLeft"]=false);

rightBtn.addEventListener("mousedown", ()=>keys["ArrowRight"]=true);
rightBtn.addEventListener("mouseup", ()=>keys["ArrowRight"]=false);
rightBtn.addEventListener("mouseleave", ()=>keys["ArrowRight"]=false);

document.addEventListener("keydown",e=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});
document.getElementById("start").onclick = startGame;


function startGame(){

    document.querySelectorAll(".fly").forEach(f=>f.remove());

    px = gameWidth / 2 - 20;
    py = gameHeight - 60;

    player.style.left=px+"px";
    player.style.top=py+"px";

    life=1;
    time=0;
    difficulty=250;

    document.getElementById("life").textContent=life;
    document.getElementById("time").textContent=time;

    document.getElementById("gameOver").style.display="none";

    clearInterval(flyInterval);
    clearInterval(timer);

    playing=true;

    flyInterval=setInterval(spawnFly,difficulty);

    timer=setInterval(()=>{
        time++;
        document.getElementById("time").textContent=time;

        if(time%5===0 && difficulty>80){

            difficulty-=20;

            clearInterval(flyInterval);
            flyInterval=setInterval(spawnFly,difficulty);

        }

    },1000);

    cancelAnimationFrame(gameLoop);
    update();
}

function spawnFly(){

    const count = Math.floor(Math.random()*3)+3; // 3~5마리

    for(let i=0;i<count;i++){

        const fly=document.createElement("div");
        fly.className="fly";
        fly.textContent="🪰";

        fly.style.left=Math.random()*(gameWidth-40)+"px";
        fly.style.top="-50px";
        fly.style.transform="rotate(180deg)";

        fly.speed=4+Math.random()*5;

        game.appendChild(fly);

    }

}

function update(){

    if(!playing) return;

    if(keys["ArrowLeft"] || keys["a"]) px -= 8;
    if(keys["ArrowRight"] || keys["d"]) px += 8;

    px = Math.max(0, Math.min(gameWidth - 40, px));

    player.style.left = px + "px";

    document.querySelectorAll(".fly").forEach(fly=>{

        fly.style.top=(parseFloat(fly.style.top)+fly.speed)+"px";

        if(hit(player,fly)){

            fly.remove();

            life--;

            document.getElementById("life").textContent=life;

            if(life<=0){

                endGame();

            }

        }

        if(parseFloat(fly.style.top)>gameHeight){

            fly.remove();

        }

    });

    gameLoop=requestAnimationFrame(update);

}

function hit(a,b){

    const r1=a.getBoundingClientRect();
    const r2=b.getBoundingClientRect();

    return !(r1.right<r2.left||
             r1.left>r2.right||
             r1.bottom<r2.top||
             r1.top>r2.bottom);

}

function endGame(){

    playing=false;

    clearInterval(flyInterval);
    clearInterval(timer);

    document.getElementById("result").textContent=
    "살아남은 시간 : "+time+"초";

    document.getElementById("gameOver").style.display="block";

}
