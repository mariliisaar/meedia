let musicUrl = "../../../~rinde/media/sounds/Funkytown.mp3";
// let musicUrl = "../../../~rinde/media/sounds/Tuuletallajad.mp3";
let musicPlayer = new Audio();

function prepareAudio() {
    // musicPlayer.addEventListener("canplay", showInfo);
    musicPlayer.addEventListener("canplaythrough", canStart);
    musicPlayer.addEventListener("durationchange", showInfo);
    musicPlayer.src = musicUrl;
    document.getElementById("music_vol_btn").addEventListener("input", setMusicVolume);
    document.getElementById("music_speed_btn").addEventListener("input", setMusicSpeed);
    // musicPlayer.play();
}

function setMusicVolume(e) {
    musicPlayer.volume = e.target.value;
}

function setMusicSpeed(e) {
    musicPlayer.playbackRate = e.target.value;
}

function showInfo(e) {
    // console.log("Saab!");
    if (e.type == "durationchange") {
        musicPlayer.removeEventListener("durationchange", showInfo);
        document.getElementById("music_pos_slider").max = e.target.duration;
        musicPlayer.addEventListener("timeupdate", showInfo);
        document.getElementById("music_pos_slider").addEventListener("change", musicSeek);
    }
    if (e.type == "timeupdate") {
        document.getElementById("music_pos").innerHTML = e.target.currentTime.toFixed(2);
        document.getElementById("music_pos_slider").value = e.target.currentTime.toFixed(2);
    }
}

function canStart() {
    // console.log("Saab lõpuni!");
    musicPlayer.removeEventListener("canplaythrough", canStart);
    document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
    document.getElementById("music_btn").addEventListener("click", toggleMusicPlay);
}

function toggleMusicPlay() {
    let btn = document.getElementById("music_btn");
    if (musicPlayer.paused) {
        musicPlayer.play();
        btn.innerHTML = "Peata muusika!";
    } else {
        musicPlayer.pause();
        btn.innerHTML = "Mängi muusikat";
    }
}

function musicSeek(e) {
    musicPlayer.currentTime = e.target.value;
}