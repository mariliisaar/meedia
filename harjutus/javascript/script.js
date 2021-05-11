let degree = 0;
let turns = 0;
let audio = new Audio();

window.onload = function() {
    document.addEventListener("click", rotate_cube);
}

function rotate_cube() {
    document.removeEventListener("click", rotate_cube);
    document.getElementById("main-content").addEventListener("click", change_bg);
    let cube = document.getElementById("cube");
    if (degree == 360) {
        degree = 0;
        play_audio();
    }

    if (degree % 90 == 0) {
        turns++;
        document.getElementById("front").innerHTML = "Veerandpöördeid: <br>" + turns;
        document.getElementById("back").innerHTML = "Veerandpöördeid: <br>" + turns;
        document.getElementById("left").innerHTML = "Veerandpöördeid: <br>" + turns;
        document.getElementById("right").innerHTML = "Veerandpöördeid: <br>" + turns;
    }
    cube.style.transform = "rotateY(" + degree + "deg)";
    degree += 1;
    requestAnimationFrame(rotate_cube);
}

function play_audio() {
    audio.src = "media/tilkumine.mp3";
    audio.play();
}

function change_bg() {
    document.getElementById("main-content").style.backgroundColor = "hsl(" + Math.round(Math.random() * 359) + ", 50%, 80%)";
}