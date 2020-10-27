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
var ref = database.ref('users/maro')
ref.on('value', getData, errData)

function getData(data) {
    var highScoreName = data.val().playerName
    var highScore = data.val().playerScore
    document.getElementById('mario-player').innerText = highScoreName
    document.getElementById('mario-score').innerText = highScore
}
function errData(err) {
    console.log(err)
}

var ref = database.ref('users/car')
ref.on('value', getDataCar, errDataCar)

function getDataCar(data) {
    var carHighScoreName = data.val().playerName
    var carHighScore = data.val().playerScore
    document.getElementById('car-player').innerText = carHighScoreName
    document.getElementById('car-score').innerText = carHighScore
}
function errDataCar(err) {
    console.log(err)
}
var ref = database.ref('users/stack')
ref.on('value', getDataStack, errDataStack)

function getDataStack(data) {
    var stackHighScoreName = data.val().playerName
    var stackHighScore = data.val().playerScore
    document.getElementById('stack-player').innerText = stackHighScoreName
    document.getElementById('stack-score').innerText = stackHighScore
}
function errDataStack(err) {
    console.log(err)
}