var nav = document.getElementById('mob-nav')
function show() {
    if (nav.style.display == "none") {
        nav.style.display = "flex"
    } else {
        nav.style.display = "none"
    }
}
document.getElementById("nav-btn").addEventListener("click", show)
const choiceArray = ['r', 'p', 's', 'r', 'p', 's'];
let userScore = 0;
let compScore = 0;
let userChoice = '';
let compChoice = '';
let userImg = document.getElementById('user-choice');
let compImg = document.getElementById('comp-choice');
function choice(v) {
    userImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/r.png`
    compImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/r.png`
    userImg.style.animationPlayState = 'running';
    compImg.style.animationPlayState = 'running';
    userChoice = v.value;
    compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
    function check() {
        if (userChoice == compChoice) {
            return `Draw`
        } else if (userChoice == 'r' && compChoice == 's' ||
            userChoice == 'p' && compChoice == 'r' ||
            userChoice == 's' && compChoice == 'p') {
            userScore += 1
            return `Won`
        } else {
            compScore += 1
            return 'Lost'
        }
    }
    let result = check();
    setTimeout(() => {
        if (result == 'Won') {
            updateImage(result)
            document.getElementById('user-score').innerHTML = userScore;
        } else {
            updateImage(result)
            document.getElementById('comp-score').innerHTML = compScore;
        }
    }, 1500)
}
function updateImage(r) {
    document.getElementById('result').innerHTML = `Result: ${r}`;
    userImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/${userChoice}.png`
    compImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/${compChoice}.png`
    userImg.style.animationPlayState = 'paused';
    compImg.style.animationPlayState = 'paused';
}
