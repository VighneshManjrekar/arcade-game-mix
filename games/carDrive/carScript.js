var nav = document.getElementById('mob-nav')
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

var block = document.getElementById('block')
var car = document.getElementById('car')
var i = 5
var save
var ref = database.ref('users/car')
ref.on('value', getData, errData)

function getData(data) {
    save = data.val().playerScore
}
function errData(err) {
    console.log(err)
}
document.getElementById('left').addEventListener('touchstart', moveLeft)
document.getElementById('right').addEventListener('touchstart', moveRight)
var play = document.getElementById('play')
var road = document.getElementById('road')
const playGame = setInterval(function () {
    start()
    play.innerHTML = i
}, 1000)

function start() {
    i--
}

setTimeout(() => {
    clearInterval(playGame)
    block.style.animationPlayState = "running"
    road.style.animationPlayState = "running"
    play.style.display = "none"
}, 5000);

function move() {
    let e = window.event
    if (e.keyCode == '37') {
        moveLeft()
    } else if (e.keyCode == '39') {
        moveRight()
    }
}

function moveLeft() {
    let left = parseFloat(window.getComputedStyle(car).getPropertyValue('left'))
    left -= 50
    if (left >= 0) {
        car.style.left = left + 'px'
    }
}

function moveRight() {
    let left = parseFloat(window.getComputedStyle(car).getPropertyValue('left'))
    left += 50
    if (left <= 100) {
        car.style.left = left + 'px'
    }
}

setTimeout(function () {
    let count = 0;
    block.addEventListener('animationiteration', function () {
        let ran = Math.floor(Math.random() * 3)
        count++;
        block.style.left = ran * 50 + 'px'
    });

    var score = 0
    var s = setInterval(function () {
        score += 1
        document.getElementById('score').innerText = score

    }, 700)


    var fscore
    var si = setInterval(function () {
        var carLeft = parseFloat(window.getComputedStyle(car).getPropertyValue('left'))
        var blockLeft = parseFloat(window.getComputedStyle(block).getPropertyValue('left'))
        var blockTop = parseFloat(window.getComputedStyle(block).getPropertyValue('top'))

        if (carLeft == blockLeft && blockTop > 360 && blockTop < 550) {
            fscore = parseInt(document.getElementById('score').innerText)
            console.log(fscore)
            console.log(save)
            if (fscore > save) {
                var name = prompt('You scored high score \nEnter your name : ')
                firebase.database().ref('users/car').set({
                    playerName: name,
                    playerScore: fscore
                });
            }
            alert(`You drove car for : ` + score + ` m\nLet's Take another long drive`)
            block.classList.remove('animate')
            clearInterval(si)
            clearInterval(s)
            window.location.reload()
        }
    }, 1)
}, 5000)

