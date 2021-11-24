var step = 0;
var score = 0;
document.getElementById('rulesButton').addEventListener('click', function () {
    document.getElementById("rules").classList.remove('inactive');
    document.querySelector('header').style.opacity = "0.3";
    document.getElementsByClassName('step').style.opacity = "0.3";
});
document.getElementById('rulesButton2').addEventListener('click', function (){
    document.getElementById("rules").classList.add('inactive');
    document.querySelector('header').style.opacity = "1";
    document.getElementsByClassName('step')[0].style.opacity = "1";
});
changeStep();


function changeStep() {
    document.getElementById('step'+step).classList.add('inactive');
    step++;
    document.getElementById('step'+step).classList.remove('inactive');
    console.log(step);
    switch(step) {
        case 1:
            document.getElementById('scoreNum').innerHTML = score;
            Array.from(document.getElementsByClassName('icon')).forEach(function(Icon) {
                Icon.addEventListener('click', stepOne,true);
            });
            break;
        case 2:
            Array.from(document.getElementsByClassName('icon')).forEach(function(Icon) {
                Icon.removeEventListener('click', stepOne,true);
            });
            setTimeout(() => stepTwo(), 2000);
            break;
        case 3:
            setTimeout(() => stepThree(), 3000);
            break;  
    };
}
function stepOne(e){
    changeStep();
    var choosedObject=e.currentTarget;
    var Parent= document.getElementsByClassName('step2');
    console.log(choosedObject.children[0].children[0]);
    createIcon(Parent[0], choosedObject.children[0].children[0].classList);
    choosedObject.classList.remove('step1');
    choosedObject.id ='choosedObject';
}
function stepTwo() {

    createIcon(document.getElementsByClassName('step3')[0], document.getElementById('choosedObject').children[0].children[0].classList);
    let Inactive= document.getElementsByClassName('step1');
    if (Math.floor(Math.random() * 2) == 1) {
        console.log(Inactive[0]);
        createIcon(document.getElementsByClassName('step3')[1], Inactive[0].children[0].children[0].classList);
    } else {
        console.log(Inactive[1]);
        createIcon(document.getElementsByClassName('step3')[1], Inactive[1].children[0].children[0].classList);
    };
    choosedObject.classList.add('step1');
    changeStep();
}
function stepThree() {
    createIcon(document.getElementsByClassName('step4')[0], document.getElementById('choosedObject').children[0].children[0].classList);
    createIcon(document.getElementsByClassName('step4')[1], document.getElementsByClassName('step3')[1].children[0].children[0].classList);
    document.getElementById('playAgain').addEventListener('click', playAgain);
    loseOrWin(document.getElementById('choosedObject').children[0].children[0].classList, document.getElementsByClassName('step3')[1].children[0].children[0].classList)
    changeStep();
}
function loseOrWin(playerObject, houseObject) {
    if(playerObject=="rock" && houseObject=="scissors" || playerObject=="scissors" && houseObject=="paper"|| playerObject=="paper" && houseObject=="rock"){
        score++;
        document.getElementById('LoseOrWin').innerHTML = "WIN";
        document.getElementsByClassName('step4')[0].classList.add('bright');
        } else {
        score--;
        document.getElementById('LoseOrWin').innerHTML = "LOSE";
        document.getElementsByClassName('step4')[1].classList.add('bright');
    };
    console.log("test");
}
function playAgain(){
    choosedObject.id ='';
    document.getElementById('step4').classList.add('inactive');
    step = 0;
    Array.from(document.querySelectorAll('.step2,.step3,.step4')).forEach(function(Icon) {
        Icon.classList.remove('rockIcon');
        Icon.classList.remove('scissorsIcon');
        Icon.classList.remove('paperIcon');
        Icon.classList.remove('bright');
        console.log('cleared');
    });
    changeStep();
}

function createIcon(Parent, Path) {
    console.log(Path);
    Parent.innerHTML = '<div class="inner"><img src="images/icon-'+Path+'.svg" class="'+Path+'"></div>';
    Parent.classList.add(""+Path+"Icon");
}