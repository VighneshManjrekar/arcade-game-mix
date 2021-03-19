document.addEventListener('contextmenu', event => event.preventDefault())
var nav = document.getElementById('mob-nav')
function show() {
    if (nav.style.display == "none") {
        nav.style.display = "flex"
    } else {
        nav.style.display = "none"
    }
}

for (let d = 25; d >= 1; d--) {
    let slider = document.createElement('div')
    slider.setAttribute('class', 'slider animate')
    slider.setAttribute('id', 'slider' + d)
    document.querySelector('.game').append(slider)
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
var save
var ref = database.ref('users/stack')
ref.on('value', getData, errData)

function getData(data) {
    save = data.val().playerScore
}
function errData(err) {
    console.log(err)
}
var i = 0
var sliderWidth = 200

function stop() {
    i++
    //variable declaration
    var sm = document.getElementById('slider' + i)
    var sa = document.getElementById('slider' + (i + 1))
    if (i == 1) {
        var sb = sm
    } else {
        var sb = document.getElementById('slider' + (i - 1))
    }
    var left = window.getComputedStyle(sm).getPropertyValue('left')
    var leftb4 = window.getComputedStyle(sb).getPropertyValue('left')
    var width = window.getComputedStyle(sm).getPropertyValue('width')

    //Stop  animation & visible next slider
    sm.classList.remove('animate')
    sm.style.left = left

    //string to float
    left = parseFloat(left)
    leftb4 = parseFloat(leftb4)
    width = parseFloat(width)

    //setting position of slider
    var dif = left - leftb4
    var absDif = Math.abs(dif)

    if (dif > 0) {
        left += absDif
    } else {
        left -= dif
        sm.style.left = left
    }

    // setting width of slider
    var offset = (width - absDif) + 'px'
    sm.style.width = offset
    sa.style.width = offset

    // //setting animation to 200
    sliderWidth += absDif
    document.documentElement.style.setProperty('--width', sliderWidth + 'px')

    //GameOver
    document.getElementById('score').innerHTML = 'Score : ' + i

    if (dif > width || dif < -width || width < 2) {
        var iscore = (i - 2)
        if (iscore > save) {
            var name = prompt('You scored high score \nEnter your name : ')
            firebase.database().ref('users/stack').set({
                playerName: name,
                playerScore: iscore
            });
        }
        alert('Try Again \n Score : ' + (i - 1))
        window.location.reload()
    }
    sa.style.visibility = 'visible'
}
