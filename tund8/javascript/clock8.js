let soundUrl = "../../../~rinde/media/sounds/kellaheli/";
let clockSpeaker = new Audio();
let timeWords = [];
let bell = new Audio();
let prevHour;

function initClock() {
    document.getElementById("clock_speak_btn").addEventListener("click", tellTime);
    bell.src = soundUrl + "kell.mp3";
    prevHour = new Date().getHours();
    clockTick();
}

function clockTick() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();
    let secAngle = currentSeconds * 6;
    let minAngle = currentMinutes * 6 + (secAngle / 60);
    let hourAngle = currentHour * 30 + (minAngle / 12);
    document.getElementById("secondhand").style.transform = "rotate(" + secAngle +"deg)";
    document.getElementById("minutehand").style.transform = "rotate(" + minAngle +"deg)";
    document.getElementById("hourhand").style.transform = "rotate(" + hourAngle +"deg)";
    // Kas lüüa kella?
    if (currentMinutes == 22 && currentSeconds == 0 && currentTime.getMilliseconds() < 1000 / 60 && document.getElementById("allow_bell_btn").checked) { // <-- Testimiseks
        // Kavalam on kontrollida, if (document.getElementById("allow_bell_btn").checked && currentHour != prevHour) {
        // loendur, mitu korda vaja lüüa
        bell.play();
        prevHour = currentHour;
    }
    // setTimeout(1000, clockTick); <-- iga sekundi järel (sekund on ebasobimatu ajaühik, setTimeout ei saa hakkama (aeg-ajalt läheb +1 millisekund))
    requestAnimationFrame(clockTick); // teist akent vaadates jääb seisma
}

function tellTime() {
    timeWords.push("kellon");
    let currentTime = new Date();
    numToWords(currentTime.getHours());
    timeWords.push("ja");
    numToWords(currentTime.getMinutes());
    if (currentTime.getMinutes() == 1) {
        timeWords.push("minut");
    } else {
        timeWords.push("minutit");
    }
    // console.log(timeWords);
    document.getElementById("clock_speak_btn").removeEventListener("click", tellTime);
    document.getElementById("clock_speak_btn").disabled = true;
    clockSpeaker.addEventListener("ended", speakTime);
    speakTime();
}

function speakTime() {
    if (timeWords.length > 0) {
        clockSpeaker.src = soundUrl + timeWords[0] + ".mp3";
        clockSpeaker.play();
        timeWords.shift(); // Viskab ära esimese elemendi
    } else {
        clockSpeaker.removeEventListener("ended", speakTime);
        document.getElementById("clock_speak_btn").disabled = false;
        document.getElementById("clock_speak_btn").addEventListener("click", tellTime);
    }
}

function numToWords(numValue) {
    if (numValue <= 10) {
        timeWords.push(numValue);
    } else {
        let tens = Math.floor(numValue / 10);
        let ones = numValue % 10;
        if (tens == 1) {
            timeWords.push(ones);
            timeWords.push("teist");
        } else {
            timeWords.push(tens);
            timeWords.push("kymmend");
            if (ones > 0) {
                timeWords.push(ones);
            }
        }
    }
}