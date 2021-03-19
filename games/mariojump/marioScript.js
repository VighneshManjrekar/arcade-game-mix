var nav = document.getElementById('mob-nav')
document.addEventListener('contextmenu', event => event.preventDefault())
function show() {
    if (nav.style.display == "none") {
        nav.style.display = "flex"
    } else {
        nav.style.display = "none"
    }
}

var firebaseConfig = {
    apiKey: "AIzaSyBffsEoJZLDTc-hq-e1FkJdY-uvSofoBaE",
    authDomain: "arcade-highscore.firebaseapp.com",
    databaseURL: "https://arcade-highscore.firebaseio.com",
    projectId: "arcade-highscore",
    storageBucket: "arcade-highscore.appspot.com",
    messagingSenderId: "333323248754",
    appId: "1:333323248754:web:94bb79b09d813bf1748eeb",
    measurementId: "G-73FQWCC1TG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

var play = document.getElementById('play')
var mario = document.getElementById('mario')
var pipe = document.getElementById('pipe')
var count = 0
var i = 5
var name

const playGame = setInterval(function () {
    start()
    play.innerHTML = i
}, 1000)

function start() {
    i--
}

setTimeout(() => {
    clearInterval(playGame)
    pipe.style.animationPlayState = "running"
    play.style.display = "none"
}, 5000);


function jump() {
    mario.classList.add('animate')
    setTimeout(function () {
        mario.classList.remove('animate')
    }, 500)
}

setTimeout(function () {

    setInterval(function () {
        var pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('left'))
        var pipeTop = parseInt(window.getComputedStyle(pipe).getPropertyValue('top'))
        var marioTop = parseInt(window.getComputedStyle(mario).getPropertyValue('top'))
        if (marioTop >= pipeTop && pipeLeft > 4 && pipeLeft < 21) {
            pipe.style.animationPlayState = "paused"
            mario.style.animationPlayState = "paused"
            update()
        } else {
            count++
            scoreUpdate()
        }
    }, 10);

    function update() {
        alert("Anyway Try again :) \nYour score : " + (Math.floor(count / 100)));
        window.location.reload();
        let nScore = (Math.floor(count / 100))
        if (nScore > save) {
            name = prompt('You scored high score \nEnter your name : ')
            firebase.database().ref('users/maro').set({
                playerName: name,
                playerScore: nScore,
            });
        }
    }

    function scoreUpdate() {
        document.getElementById('score-banner').innerHTML = 'Score : ' + (Math.floor(count / 100))
        document.getElementById('high-score-banner').innerText = 'High Score : ' + save
    }

    let animationCount = 0
    pipe.addEventListener('animationiteration', () => {
        var h = Math.floor(Math.random() * (40 - 10) + 10)
        pipe.style.height = `${h}px`
        pipe.style.top = `${200 - h}px`

        if (animationCount < 10 && animationCount > 0) {
            pipe.style.animationDuration = "1s"
        } else if (animationCount < 40 && animationCount >= 10) {
            pipe.style.animationDuration = "0.9s"
        } else if (animationCount < 60 && animationCount >= 40) {
            pipe.style.animationDuration = "0.8s"
        } else if (animationCount >= 60) {
            pipe.style.animationDuration = "0.7s"
        }
        animationCount++
    })

}, 4990);

var ref = database.ref('users/maro')
ref.on('value',getData,errData)

function getData(data){
    save = data.val().playerScore
    
}
function errData(err){
    console.log(err)
}
