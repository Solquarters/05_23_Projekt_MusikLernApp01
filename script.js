let chromaticOctaveJson = [
    
    {   "imgSrc": './img/note-c.png',
        "notename": 'c',
        "noteNumber":0,
    },

    {   "imgSrc": './img/note-c#.png',
        "notename": 'c#',
        "noteNumber":1,
    },

    {   "imgSrc": './img/note-d.png',
        "notename": 'd',
        "noteNumber":2,
    },

    {   "imgSrc": './img/note-d#.png',
        "notename": 'd#',
        "noteNumber":3,
    },
    
    {   "imgSrc": './img/note-e.png',
        "notename": 'e',
        "noteNumber":4,
    },

    {   "imgSrc": './img/note-f.png',
        "notename": 'f',
        "noteNumber":5,
    },

    {   "imgSrc": './img/note-f#.png',
        "notename": 'f#',
        "noteNumber":6,
    },

    {   "imgSrc": './img/note-g.png',
        "notename": 'g',
        "noteNumber":7,
    },

    {   "imgSrc": './img/note-g#.png',
        "notename": 'g#',
        "noteNumber":8,
    },

    {   "imgSrc": './img/note-a.png',
        "notename": 'a',
        "noteNumber":9,
    },

    {   "imgSrc": './img/note-a#.png',
        "notename": 'a#',
        "noteNumber":10,
    },

    {   "imgSrc": './img/note-b.png',
        "notename": 'b',
        "noteNumber":11,
    },
]

//to implement: Höhere ocatave einarbeiten !

let currentQuestionsJson = [];
let currentCorrectAnswer = '';
let currentUserAnswer = '';
let randomIndexInRange = -1;
let lastRandomIndex = -2;
let currentUserScore=0;
let keyNumbersArray =[];
let currentLevel = 0;
let userGameDuration = 0;
let currentMinimalScore =0;

//to implement:
let LevelHighscoresJson =[ 
    {"imgSrc": './img/note-a#.png',
    "notename": 'a#',
    "noteNumber":10,
    },

    {"imgSrc": './img/note-b.png',
    "notename": 'b',
    "noteNumber":11,
    },
];

function init(){
    document.getElementById('startGameButtonId').style.display="none";

    //countdown position
    updateTextPosition();


    /////////////LOAD LEVEL SCORES FROM LOCAL STORAGE
}

function selectLevel(levelNumber){
    currentQuestionsJson = [];

    switch(levelNumber) {
        case 1:
            keyNumbersArray =[0,2,4];
            addAnimationToKeys(keyNumbersArray);
            currentLevel = 1;
          break;
        case 2:
            keyNumbersArray =[5,7,9,11];
            addAnimationToKeys(keyNumbersArray);
            currentLevel = 2;
          break;
        case 3:
            keyNumbersArray =[0,2,4,5,7,9,11];
            addAnimationToKeys(keyNumbersArray);
            currentLevel = 3;
          break;
        default: console.log('no valid level selected');
      }

      document.getElementById('startGameButtonId').disabled = false;
      document.getElementById('startGameButtonId').classList.add('blink');
      document.getElementById('setTimerMainDivId').style.display ="flex";
      
}

function setupCurrentQuestions(keyNumbersArray){
    for(let i = 0; i < keyNumbersArray.length; i++){
        currentQuestionsJson.push(chromaticOctaveJson[keyNumbersArray[i]]);
    }
}

function addAnimationToKeys(keyNumbersArray){
    removeAnimationFromKeys();
    //Making sure the added animations are synchronous
    setTimeout(() => {
        for(let i = 0; i < keyNumbersArray.length; i++){
            document.getElementById(`key${keyNumbersArray[i]}Id`).classList.add('blink');
        }
    }, 10); 
}

function removeAnimationFromKeys(){
        for(let i = 0; i < 12; i++){
            const element = document.getElementById(`key${i}Id`);
            if (element.classList.contains('blink')) {
                element.classList.remove('blink');  
            }
        }
    }

function beginGame(){
    removeAnimationFromKeys(keyNumbersArray);
    setupCurrentQuestions(keyNumbersArray);
    document.getElementById('beforeGameMenuDivId').style.display = 'none';
    renderNextQuestion();
    resetAnimation();


    document.getElementById('setTimerMainDivId').style.display="none";
}

function disableAllKeys(){
    for (let i = 0; i < 12; i++) {
            let div = document.getElementById(`key${i}Id`);
            if (div) {div.removeAttribute('onclick');}
        }
}

function enableAllKeys(){
    for (let i = 0; i < 12; i++) {
            let div = document.getElementById(`key${i}Id`);
            if (div) {div.setAttribute('onclick', `sendKey(${i}, this)`);}
        }
}

function renderNextQuestion(){
    enableAllKeys();
    let arrayLength = currentQuestionsJson.length;
    randomIndexInRange = Math.floor(Math.random() * arrayLength);
    if(lastRandomIndex == randomIndexInRange){renderNextQuestion();return;}
    lastRandomIndex =  randomIndexInRange;

    document.getElementById('mainImageDivId').innerHTML = '';
    document.getElementById('mainImageDivId').innerHTML += /*html*/`
    <img src="${currentQuestionsJson[randomIndexInRange]["imgSrc"]}" alt="" class="questionImgClass">
    <br>
    <span>What note is that?</span>
    <button id="nextQuestionButtonId" onclick="renderNextQuestion()" class="levelButtonClass">Next</button>
    <button id="nextQuestionButtonId2" onclick="renderNextQuestion()" class="levelButtonClass">Next</button>
    <div class="currentScoreDivClass">Score: <span id="currentScoreId"><b>${currentUserScore}</b></span></div>
    `;

document.getElementById('nextQuestionButtonId').disabled = true;
document.getElementById('nextQuestionButtonId').classList.add('grayClass');
document.getElementById('nextQuestionButtonId2').disabled = true;
document.getElementById('nextQuestionButtonId2').classList.add('grayClass');

 //Reset Keyboard colors here
 resetWrongRightKeyColors();

}

function sendKey(keyNumber, pushedKey){
    disableAllKeys();
    currentUserAnswer = keyNumber;
    if(currentQuestionsJson[randomIndexInRange]["noteNumber"] == currentUserAnswer){
        pushedKey.classList.add('successClass', 'animate');
        currentUserScore++;
        document.getElementById('currentScoreId').innerHTML = `<b>${currentUserScore}</b><br>`;
        
        //hier eine SVG Animation bei Score Up 
        //Score Text animation 
    }
    else{
        pushedKey.classList.add('wrongClass');
        document.getElementById(`key${currentQuestionsJson[randomIndexInRange]["noteNumber"]}Id`).classList.add('successClass', 'animate');
        //Send message: wrong note!
    }
  
    if (document.getElementById('nextQuestionButtonId').classList.contains('animate')) {
    document.getElementById('nextQuestionButtonId').classList.remove('animate');  }
    document.getElementById('nextQuestionButtonId').disabled = false;
    document.getElementById('nextQuestionButtonId').classList.remove('grayClass');
    document.getElementById('nextQuestionButtonId').classList.add('animate');

    document.getElementById('nextQuestionButtonId2').classList.remove('animate');  
    document.getElementById('nextQuestionButtonId2').disabled = false;
    document.getElementById('nextQuestionButtonId2').classList.remove('grayClass');
    document.getElementById('nextQuestionButtonId2').classList.add('animate');
}

function resetWrongRightKeyColors(){
    for(let i = 0; i < 12; i++){
        document.getElementById(`key${i}Id`).classList.remove('successClass');
        document.getElementById(`key${i}Id`).classList.remove('wrongClass');
        document.getElementById(`key${i}Id`).classList.remove('animate');
        }
}


function changeBackGroundColor(element){
element.classList.add('grayClass');
}

function toggleButton(buttonId) {
    const buttonContainer = document.getElementById('beforeGameMenuDivId');
    const buttons = buttonContainer.querySelectorAll('.levelButtonClass');
   
    buttons.forEach(button => {button.classList.remove('grayClass');});
    const clickedButton = document.getElementById(`${buttonId}`);
    clickedButton.classList.add('grayClass');
}



/////////////////NEW FUNCTIONS CHAT GPT//////////////////
let eventListenerAdded = false;



function resetAnimation() {
    const animation = document.getElementById('progressAnimation');
    if (!eventListenerAdded) {
        animation.addEventListener('endEvent', openOverlayOnAnimationEnd);
        eventListenerAdded = true;
    }
    animation.setAttribute('from', '0');  // Reset the animation start value
    animation.setAttribute('to', '-188.496');  // Reset the animation end value
    animation.beginElementAt(0);
    startCountdown();
}

function setAnimationDuration(seconds) {
    //global variable userGameDuration
    userGameDuration = seconds;
    currentMinimalScore = Math.round(userGameDuration/2);

    const animation = document.getElementById('progressAnimation');
    animation.setAttribute('dur', `${seconds}s`);
    document.getElementById('startGameButtonId').style.display="flex";
}

function setCustomTime() {
    const customTimeInput = document.getElementById('customTimeInput');
    const minutes = customTimeInput.value;
    if (minutes > 0) {
        const seconds = minutes * 60;
        userGameDuration = seconds;
        setAnimationDuration(seconds);
    } else {
        alert('Please enter 1 - 60 min.');
    }
}

function renderScore(){
    document.getElementById('overlayDivChild1Id').innerHTML = /*html*/ `
        <b>Level ${currentLevel}</b><br>Your Score: <b>${currentUserScore}</b><br>
        Reach ${Math.round(userGameDuration/2)} scores in ${userGameDuration} sec<br> to unlock the next Level<br> and soon become a real Notes Ninja!<br>
        <br>
        <button id="restartGameButtonId" class="levelButtonClass" onclick="location.reload()">Restart Game</button>
        
        `;
}

function openOverlayOnAnimationEnd(){
    document.getElementById('mainOverlayDivId').style.display = "flex";
    renderScore();
    disableAllKeys();
    document.getElementById('nextQuestionButtonId').style.display ="none";
    document.getElementById('nextQuestionButtonId2').style.display ="none";

    ///////////DISPLAY FLEX TO RESTART GAME BUTTON
    ///////////////SAVE SCORE AND CURRENT LEVEL TO LOCAL STORE
    //////////CHECK currentMinimalScore with reachedScore - if equals unlock next level! 
}



//////Overlap of timer and Level selection Div
function checkOverlap() {
    const absoluteDiv = document.getElementById('svgTimerId');
    const flexItem = document.getElementById('beforeGameMenuDivId');

    const rect1 = absoluteDiv.getBoundingClientRect();
    const rect2 = flexItem.getBoundingClientRect();

    const isOverlap = !(rect1.right < rect2.left || 
                        rect1.left > rect2.right || 
                        rect1.bottom < rect2.top || 
                        rect1.top > rect2.bottom);

    if (isOverlap) {
      flexItem.style.marginTop = '100px';
    } else {
      flexItem.style.marginTop = '0';
    }
  }



  // Optional: Run the check on window resize to handle responsive layouts
  window.onresize = checkOverlap;


  function limitInput() {
    var input = document.getElementById("customTimeInput");
    if (input.value > 30) {
        input.value = 30;
        alert('Max input is 30.')
    }
}

function checkInput(event) {
    var key = event.key;
    // Allow only numbers and backspace/delete keys
    if (isNaN(key) && key !== 'Backspace' && key !== 'Delete') {
        event.preventDefault();
    }
}



//////////////////////////
function updateCountdown(value) {
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = value;
    if (value <= 5) {
        countdownElement.style.fill = 'red';
        countdownElement.style.fontSize = '25.2px';  // 24 * 1.05 = 25.2
    } else {
        countdownElement.style.fill = '#000';
        countdownElement.style.fontSize = '24px';
    }
}

function updateTextPosition() {
    const outerCircle = document.getElementById('outerCircle');
    const countdownElement = document.getElementById('countdown');
    const cx = outerCircle.getAttribute('cx');
    const cy = parseFloat(outerCircle.getAttribute('cy')) + 8;
    countdownElement.setAttribute('x', cx);
    countdownElement.setAttribute('y', cy);
}

function startCountdown() {
    // Get the duration from the 'dur' attribute of the animate element
const progressAnimation = document.getElementById('progressAnimation');
let duration = parseFloat(progressAnimation.getAttribute('dur'));
let currentValue = duration;
updateCountdown(currentValue);
updateTextPosition();  // Initial positioning

   const interval = setInterval(() => {
       currentValue--;
       if (currentValue >= 0) {
           updateCountdown(currentValue);
       } else {
           clearInterval(interval);
       }
   }, 1000);
}




