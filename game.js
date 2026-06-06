
const stages = [

{
map:[
".p..",
".ox.",
"..o.",
"x..x"
],
answer:""
},

{
map:[
"..p.",
".ox.",
"x..o",
"...."
],
answer:""
},

{
map:[
"p..x",
".o..",
"..x.",
"...o"
],
answer:""
},

{
map:[
".p.o",
".x..",
"..o.",
"x..."
],
answer:""
},

{
map:[
"..p.",
".xo.",
"...x",
"o..."
],
answer:""
},

{
map:[
".p..",
"x.o.",
"..x.",
"...o"
],
answer:""
},

{
map:[
"....",
".pox",
".x..",
"o..."
],
answer:""
},

{
map:[
".p..",
"..ox",
"x...",
"...o"
],
answer:""
},

{
map:[
"..p.",
".o..",
"x.x.",
"...o"
],
answer:""
},

{
map:[
".p..",
".xo.",
"...o",
"x..."
],
answer:""
},
{
map:[
".p...",
"..ox.",
".x...",
"...o.",
"x...."
],
answer:""
},
{
map:[
"..p...",
".o....",
"...x..",
"..o...",
"....x.",
"x....."
],
answer:""
},{
map:[
".px.",
".oxx",
".x.o",
"...x",
"x..."
],
answer:"RDDLRUULDRD"
},

{
map:[
".....",
".pox.",
".x..o",
"..x..",
"o...."
],
answer:"DRURDLL"
},

{
map:[
".o...",
".xp..",
"...xo",
"..x..",
"o...."
],
answer:"ULDRURDD"
},
{
map:[
".p.x.",
".o...",
"..x..",
"...o.",
"x...."
],
answer:""
},

{
map:[
".p...",
".xxo.",
"...x.",
".o...",
"...x."
],
answer:""
},

{
map:[
"..p..",
".x.x.",
".o...",
"...o.",
"x...."
],
answer:""
},

{
map:[
".p..x",
"..o..",
".x.x.",
"...o.",
"x...."
],
answer:""
},

{
map:[
"..p..",
".o.x.",
"..x..",
".x.o.",
"....."
],
answer:""
},

{
map:[
".p...",
".o.x.",
"..x..",
"...o.",
".x..."
],
answer:""
},

{
map:[
"..p..",
".xx..",
".o.o.",
"...x.",
"....."
],
answer:""
},

{
map:[
".p.x.",
"...o.",
".x...",
".o.x.",
"....."
],
answer:""
},

{
map:[
"..p..",
".o...",
".x.x.",
"...o.",
"..x.."
],
answer:""
},

{
map:[
".p...",
".x.o.",
"...x.",
".o...",
"x...."
],
answer:""
},
{
map:[
"...p..",
".x....",
"..o.x.",
"......",
".o....",
"...x.."
],
answer:""
},

{
map:[
"..p...",
".x.x..",
"...o..",
"......",
"..o...",
".x...."
],
answer:""
},

{
map:[
".p....",
"...x..",
".o....",
"..x...",
"....o.",
"x....."
],
answer:""
},

{
map:[
"...p..",
".o....",
"..x.x.",
"......",
"...o..",
".x...."
],
answer:""
},

{
map:[
"..p...",
".xx...",
"...o..",
"......",
".o....",
"...x.."
],
answer:""
},
{
map:[
".p.xx",
".ox..",
".x.x.",
"..o..",
"x...x"
],
answer:""
},
{
map:[
".p.xx",
".ox.x",
".x...",
"..o.x",
"x...."
],
answer:""
},
{
map:[
".pxx.",
".o..x",
".x.x.",
"x..o.",
"xx..."
],
answer:""
},
{
map:[
".x..",
".oxx",
"px..",
"x.xo",
"...."
],
answer:""
}

];

let stageIndex=0;

let board=[];

let history=[];

let original=[];

const boardDiv =
document.getElementById("board");

const msg =
document.getElementById("message");

const select =
document.getElementById("stageSelect");

for(let i=0;i<stages.length;i++){

    let option =
    document.createElement("option");

    option.value=i;

    option.textContent=
    "스테이지 "+(i+1);

    select.appendChild(option);
}

select.addEventListener(
"change",
()=>{
stageIndex=
Number(select.value);

loadStage();
}
);

function loadStage(){

    history=[];

    board=
    stages[stageIndex]
    .map
    .map(r=>r.split(""));

    original=
    stages[stageIndex]
    .map
    .map(r=>r.split(""));

    draw();

    msg.innerHTML="";
}

function cloneBoard(){

    return board.map(
    row=>[...row]
    );
}

function draw(){

    let rows=
    board.length;

    let cols=
    board[0].length;

    boardDiv.style.gridTemplateColumns=
    `repeat(${cols},70px)`;

    boardDiv.innerHTML="";

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            let cell=
            document.createElement("div");

            cell.className=
            "cell";

            let value=
            board[r][c];

            if(value==="p"){

                cell.textContent="😀";
                cell.classList.add(
                "player"
                );
            }

            if(value==="o"){
                cell.textContent="O";
            }

            if(value==="x"){
                cell.textContent="X";
            }

            boardDiv.appendChild(
            cell
            );
        }
    }
}

function findPlayer(){

    for(let r=0;r<board.length;r++){

        for(let c=0;c<board[0].length;c++){

            if(board[r][c]==="p"){

                return [r,c];
            }
        }
    }
}

function move(dr,dc){

    let [r,c]=findPlayer();

    let nr=r+dr;
    let nc=c+dc;

    if(
        nr<0||
        nc<0||
        nr>=board.length||
        nc>=board[0].length
    ){
        return;
    }

    history.push(
    cloneBoard()
    );

    let target=
    board[nr][nc];

    if(target==="."){

        board[r][c]=".";
        board[nr][nc]="p";
    }

    else if(
        target==="o"||
        target==="x"
    ){

        let br=nr+dr;
        let bc=nc+dc;

        if(
            br<0||
            bc<0||
            br>=board.length||
            bc>=board[0].length
        ){
            history.pop();
            return;
        }

        if(board[br][bc]!=="."){
            history.pop();
            return;
        }

        board[br][bc]=target;

        board[nr][nc]="p";

        board[r][c]=".";
    }

    check();

    draw();
}

function checkLine(ch){

    for(let r=0;r<board.length;r++){

        let count=0;

        for(let c=0;c<board[0].length;c++){

            let v=
            board[r][c];

            if(
                v===ch ||
                (ch==="o"&&v==="p")
            ){
                count++;
            }
            else{
                count=0;
            }

            if(count>=3){
                return true;
            }
        }
    }

    for(let c=0;c<board[0].length;c++){

        let count=0;

        for(let r=0;r<board.length;r++){

            let v=
            board[r][c];

            if(
                v===ch ||
                (ch==="o"&&v==="p")
            ){
                count++;
            }
            else{
                count=0;
            }

            if(count>=3){
                return true;
            }
        }
    }

    return false;
}

function check(){

    // 실패
    if(checkLine("x")){

        msg.innerHTML="❌ 실패!";

        setTimeout(()=>{

            reset();

        },1000);

        return;
    }

    // 성공
    if(checkLine("o")){

        msg.innerHTML="🎉 클리어!";

        setTimeout(()=>{

            // 마지막 스테이지인지 확인
            if(stageIndex < stages.length-1){

                stageIndex++;

                select.value = stageIndex;

                loadStage();

            }else{

                msg.innerHTML=
                "🏆 모든 스테이지 클리어!";

            }

        },1000);

        return;
    }
}

function undo(){

    if(history.length===0){
        return;
    }

    board=
    history.pop();

    draw();
}

function reset(){

    history=[];

    board=
    original.map(
    row=>[...row]
    );

    draw();

    msg.innerHTML="";
}

function showAnswer(){

    alert(
    stages[stageIndex]
    .answer
    );
}

document.addEventListener(
"keydown",
e=>{

    if(e.key==="ArrowUp"){
        move(-1,0);
    }

    if(e.key==="ArrowDown"){
        move(1,0);
    }

    if(e.key==="ArrowLeft"){
        move(0,-1);
    }

    if(e.key==="ArrowRight"){
        move(0,1);
    }

    if(
        e.key==="u"||
        e.key==="U"
    ){
        undo();
    }

    if(
        e.key==="r"||
        e.key==="R"
    ){
        reset();
    }

});

loadStage();
function showRules(){

    alert(
`틱택고 규칙

1. 방향키로 플레이어(P)를 움직인다.

2. O 또는 X 한 개는 밀 수 있다.

예)
P O .
→ 가능

3. O 또는 X가 두 개 이상 연속이면 밀 수 없다.

예)
P O O .
→ 불가능

4. O 3개를 가로 또는 세로로 연결하면 클리어.

5. X 3개가 가로 또는 세로로 연결되면 실패.

6. U 키 = Undo(되돌리기)

7. R 키 = Reset(초기화)

8. 스테이지를 모두 클리어해보자!`
    );

}