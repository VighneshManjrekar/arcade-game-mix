var nav = document.getElementById('mob-nav')
function show() {
    if (nav.style.display == "none") {
        nav.style.display = "flex"
    } else {
        nav.style.display = "none"
    }
}
document.getElementById("nav-btn").addEventListener("click", show)



var userChoice
var choiceArray = ['r', 'p', 's', 'r', 'p', 's']
var compChoice
var userScore = 0
var compScore = 0
var userImg = document.getElementById('user-choice')
var compImg = document.getElementById('comp-choice')

function choice(c) {
    userChoice = c.value

    function ran() {
        var random = Math.floor(Math.random() * 6)
        compChoice = choiceArray[random]
    }
    ran()
    console.log(userChoice)
    console.log(compChoice)

    userImg.style.animationPlayState = 'running'
    compImg.style.animationPlayState = 'running'
    document.getElementById('result').innerHTML = `Result`

    userImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/r.png`
    compImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/r.png`


    setTimeout(() => {


        if (userChoice == compChoice) {

            document.getElementById('result').innerHTML = `Draw`

        } else if (userChoice == 'r' && compChoice == 's' ||
            userChoice == 'p' && compChoice == 'r' ||
            userChoice == 's' && compChoice == 'p') {

            document.getElementById('result').innerHTML = `Won`
            userScore += 1
            document.getElementById('user-score').innerHTML = userScore

        } else {

            document.getElementById('result').innerHTML = `Lost`
            compScore += 1
            document.getElementById('comp-score').innerHTML = compScore
        }

    }, 2000)

    setTimeout(() => {
        userImg.style.animationPlayState = 'paused'
        compImg.style.animationPlayState = 'paused'
        userImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/${userChoice}.png`
        compImg.src = `https://res.cloudinary.com/vighnesh/image/upload/v1618223368/rps/${compChoice}.png`
    }, 1500)

}