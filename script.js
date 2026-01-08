let gameSeq=[];
let userSeq=[];

let btns=['yellow','red', 'purple', 'green'];

let started=false;
let level=0;

let h2=document.querySelector('h2');

document.addEventListener('keypress',function(){
    if(!started){
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },300);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },300);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;

    let randColor=btns[Math.floor(Math.random()*4)];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            document.querySelector('#score').innerText=level;
            document.querySelector('#highScore').innerText=Math.max(level, document.querySelector('#highScore').innerText);
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level-1}</b> <br> Press Any Key to Restart.`;
        document.querySelector('#score').innerText='0';
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
        },200);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute('id');
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}