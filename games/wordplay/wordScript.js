var nav = document.getElementById('mob-nav')
function show() {
    if (nav.style.display == "none") {
        nav.style.display = "flex"
    } else {
        nav.style.display = "none"
    }
}

var word = ['BREAK', 'CHAR', 'ABORT', 'CHART', 'PUBLIC', 'THROW', 'BYTE', 'ELSE', 'CLASS', 'FLOAT', 'CASE', 'DELETE', 'CONST', 'DELETE', 'BOOLEAN', 'CATCH', 'CONTINUE', 'FUNCTION', 'PRIVATE', 'RETURN', 'STATIC', 'WHILE', 'VOID', 'TRUE', 'THIS', 'TRUE', 'FINAL', 'CASE'];
var ranword = word[Math.floor(Math.random() * word.length)];
var question = ranword;
console.log(question);


const scramword = function (arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i]
        arr[i] = arr[j];
        arr[j] = temp
    }
    return arr;
}
document.getElementById('result').style.marginBottom = "40px"
ranword = scramword(ranword.split("")).join("");

document.getElementById("question").innerHTML = ranword;

function check() {
    document.getElementById('result').style.marginTop = "10px"
    var ans = document.getElementById("answer").value;
    if (ans.toUpperCase() == question) {
        document.getElementById("result").innerHTML = "Well Done ✔️😃";
        setTimeout(function(){
            window.location.reload();
        },1000)
    } else {
        document.getElementById("result").innerHTML = "Oops !! Try Again ❌🤔";
    }
}

document.getElementById('answer').addEventListener('keypress', function(event){
    if (event.keyCode === 13){
        event.preventDefault()
        check()
    }
})