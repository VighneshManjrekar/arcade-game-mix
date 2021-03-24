document.addEventListener("DOMContentLoaded", () => {
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


    const bird = document.querySelector('.bird')
    const game = document.querySelector('.game')
    const ground = document.querySelector('.ground')

    let i = 5
    let save
    let newScore
    let ref = database.ref('users/flappy')
    ref.on('value', getData, errData)

    function getData(data) {
        save = data.val().playerScore
    }
    function errData(err) {
        console.log(err)
    }

    var play = document.getElementById('play')
    const playGame = setInterval(function () {
        start()
        play.innerHTML = i
    }, 1000)

    function start() {
        i--
    }

    setTimeout(() => {
        clearInterval(playGame)
        ground.style.animationPlayState = "running"
        play.style.display = "none"
    }, 5000);


    let count = 0
    let gravity = 3
    let isGameOver = false
    let birdBottom = 300
    let gap = 380

    bird.style.bottom = birdBottom + 'px'

    function fall() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
    }

    function jump() {
        if (birdBottom > 80 && birdBottom < 470) {
            birdBottom += 40
            bird.style.bottom = birdBottom + 'px'
        }
    }

    function makePipe() {
        let pipeLeft = 350
        let pipeBottom = Math.random() * 85
        pipeBottom *= Math.round(Math.random()) ? 1 : -1
        const pipe = document.createElement('div')
        const topPipe = document.createElement('div')
        pipe.classList.add('pipe')
        topPipe.classList.add('topPipe')
        ground.appendChild(pipe)
        ground.appendChild(topPipe)
        game.appendChild(pipe)
        game.appendChild(topPipe)
        pipe.style.left = pipeLeft + 'px'
        topPipe.style.left = pipeLeft + 'px'
        pipe.style.bottom = pipeBottom + 'px'
        topPipe.style.bottom = pipeBottom + gap + 'px'

        pipe.style.left = pipeLeft + 'px'
        topPipe.style.left = pipeLeft + 'px'

        function movePipe() {

            pipeLeft -= 3
            pipe.style.left = pipeLeft + 'px'
            topPipe.style.left = pipeLeft + 'px'

            if (pipeLeft == -50) {
                clearInterval(pipeTimer)
                game.removeChild(pipe)
                game.removeChild(topPipe)
            }

            if (birdBottom < 80) {
                gameOver()
            }
            if ((pipeLeft >= 50 && pipeLeft <= 150) && (birdBottom < pipeBottom + 250 || birdBottom > pipeBottom + 345)) {
                gameOver()
            }
        }
        let pipeTimer = setInterval(movePipe, 20)
        function gameOver() {
            isGameOver = true
            clearInterval(pipeTimer)
            clearInterval(makeTimer)
            clearInterval(fallTimer)
            ground.style.animationPlayState = "paused"
            console.log(count)
            console.log(save)

            if (count > save) {
                var name = prompt('You scored high score \nEnter your name : ')
                firebase.database().ref('users/flappy').set({
                    playerName: name,
                    playerScore: count
                });
            }
            if (count > 0) {
                alert("oops!!\nYour Score : " + (count - 1))
                window.location.reload();
            } else {
                alert("oops!!\nYour Score : 0")
                window.location.reload();
            }


        }
    }
    let makeTimer
    let fallTimer
    setTimeout(() => {
        makeTimer = setInterval(makePipe, 2500)
        fallTimer = setInterval(fall, 20)
        setInterval(function () {
            if (isGameOver === false) {
                document.getElementById('score').innerHTML = "Score " + count
                count++
            }
        }, 2400)
        document.addEventListener('keypress', jump)
        document.addEventListener('click', jump)

    }, 5000)

    document.addEventListener('contextmenu', event => event.preventDefault())
})
