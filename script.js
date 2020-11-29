const msgElement = document.getElementById('msg');

function getRandomNum() {
    return Math.floor(Math.random())*100 + 1;
}

const randomNum = getRandomNum();

// console.log('Number:' + randomNum);
// creates voice recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();


// starts recognition and onSpeak event
recognition.start();
recognition.addEventListener('result', onSpeak)

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(msg)

writeMessage(msg); 
checkNumber(msg); 
}

function writeMessage(msg) {
    msgElement.innerHTML =`
    <div> You said: </div>
    <span class="box">${msg}</span>`;
}

function checkNumber(msg) {
    const num = +msg;
    
    if (Number.isNaN(num)) {
        msgElement.innerHTML += `
        <div> Oops that is not a valid number</div>`;
        return;
    }

    if (num>100 || num<1) {
        msgElement.innerHTML += `<div> must be between 1 and 100 </div>`;
        return;
    }

    if (num === randomNum) {
        document.body.innerHTML = ` 
        <h1> Congratulations!!! You've guessed the number! <br><br>  It was ${num}.</h1>
        <button class="play-again" id="play-again"> Play Again </button>
        `;
    }

    else if (num > randomNum){
        msgElement.innerHTML = `
        <div> GO LOWER! </div`;
    }

    else {
        msgElement.innerHTML = `
        <div> GO HIGHER! </div>`
    }
} 

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener("click", e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});
