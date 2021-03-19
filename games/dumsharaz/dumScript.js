document.addEventListener('contextmenu', event => event.preventDefault())
var nav = document.getElementById('mob-nav')
function show() {
    if (nav.style.display == "none") {
        nav.style.display = "flex"
    } else {
        nav.style.display = "none"
    }
}

var array = ['ROCKSTAR', 'HOUSEFULL', 'DIL DHADAKNE DO', 'CHANDNI CHOWK TO CHINA', 'EK THA TIGER', 'GARAM MASALA', 'MR INDIA', 'ZERO', 'SUI DHAAGA', 'RACE 3', 'PARMANU', 'AGNEEPATH', 'ANKHEN', 'QUEEN', 'PIZZA', 'NAGIN', 'DANGAL', 'JOKER', 'STREE', 'ANDHADHUN', 'SARKAR', 'GOLMAAL', 'HEYY BABYY', 'TAARE ZAMEEN PAR', 'DIL', 'NAMASTEY LONDON'];
var ranNum = Math.floor(Math.random() * array.length);
var question = array[ranNum];
console.log(question);

function start() {
    document.getElementById('ready-banner').style.display = "none"
    document.querySelector('.ready').style.display = "none"
    document.getElementById('puzzle').style.display = "block"
    document.querySelector('.submit').style.display = "block"
    document.querySelector('.pass').style.display = "block"
    document.getElementById('input-field').style.display = "block"
    document.getElementById('puzzle-img').src = 'images/Move/' + ranNum + '.jpg'
    document.getElementById('result').innerHTML = "<br/><br/><br/><br/>"

}

function run() {
    document.getElementById('result').style.display = "block"
    var ans = document.getElementById('input-field').value;
    if (ans.toUpperCase() == question) {
        document.getElementById("result").innerHTML = "Well Done ✔️😃";
        setTimeout(function () {
            window.location.reload();
        }, 1000)

    } else {
        document.getElementById("result").innerHTML = "Oops !! Try Again ❌🤔";
    }
}

function pass() {
    document.getElementById('result').style.display = "block"
    document.getElementById('result').innerText = question
    setTimeout(function () {
        window.location.reload();
    }, 1000)
}

document.getElementById('input-field').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        run()
    }
})
