let soundUrl = "../../../~rinde/media/sounds/kellaheli/";
let clockSpeaker = new Audio();
let timeWords = [];
let bell = new Audio();
let prevHour;
let animationID;
let repeat;

function initClock() {
    document.getElementById("clock_speak_btn").addEventListener("click", tellTime);
    // Kas äratuskell on seatud?
    document.getElementById("set_alarm_btn").addEventListener("change", setAlarm);
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
    // if (currentMinutes == 0 && currentSeconds == 0 && currentTime.getMilliseconds() < 1000 / 60 && document.getElementById("allow_bell_btn").checked) { // <-- Testimiseks
    if (document.getElementById("allow_bell_btn").checked && currentHour != prevHour) {
        // loendur, mitu korda vaja lüüa
        let tollCount = 0;
        let count = 0;
        if(currentHour == 0) {
            tollCount = 12;
        } else if (currentHour > 0 && currentHour < 13) {
            tollCount = currentHour;
        } else {
            tollCount = currentHour - 12;
        }

        bell.play();
        count++;
        bell.onended = function() {
            if (count < tollCount) {
                bell.play();
                count++;
            }
        }

        prevHour = currentHour;
    }
    // setTimeout(1000, clockTick); <-- iga sekundi järel (sekund on ebasobimatu ajaühik, setTimeout ei saa hakkama (aeg-ajalt läheb +1 millisekund))
    requestAnimationFrame(clockTick); // teist akent vaadates jääb seisma
}

function setAlarm() {
    // console.log("Set");
    let currentTime = new Date();
    let alarm = new Audio();
    alarm.src = "../media/moo.mp3";
    alarm.volume = 0.1;
    if (document.getElementById("set_alarm_btn").checked) {
        document.getElementById("alarmLabel").innerHTML = "Lülita äratuskell välja";
        repeat = true;
    } else {
        document.getElementById("alarmLabel").innerHTML = "Lülita äratuskell sisse";
        if (animationID != null) {
            cancelAnimationFrame(animationID);
            animationId = null;
        }
        repeat = false;
    }
    
    if (document.getElementById("alarm_hour_btn").value == currentTime.getHours() && document.getElementById("alarm_minute_btn").value == currentTime.getMinutes() && currentTime.getSeconds() == 0) {
        cancelAnimationFrame(animationID);       
        ringAlarm(alarm);
    } else if (!document.getElementById("set_alarm_btn").checked) {
        cancelAnimationFrame(setAlarm);
    } else {
        animationID = requestAnimationFrame(setAlarm);
    }
}

function ringAlarm(alarm) {
    alarm.play();
    alarm.onended = function() {
        if (repeat) {
            if (alarm.volume <= 0.9) {
                alarm.volume += 0.1;
            }
            alarm.play();
        }
    }  
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