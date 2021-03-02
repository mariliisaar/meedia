let message = "Töötab!";
let picUrl = "../../../~rinde/media/photos/TLU_600x400/";
let picNamePrefix = "tlu_";
let picExt = ".jpg";
let minPicNum = 1;
let maxPicNum = 43;

window.onload = function() {
    // alert(message);
    console.log("Sõnum on: " + message);
    putOpenTime();
    putRandomPic();
    clockTick();
    // setInterval(300, clockTick); <-- sama probleem nagu setTimeout + ressursirohke kuna teist akent vaadates käib edasi
}

function putOpenTime() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();
    document.getElementById("open_message").innerHTML = "Leht avati kell " + currentHour + ":" + currentMinutes + ":" + currentSeconds + ".";
}

function putRandomPic() {
    let randomNum = minPicNum + Math.round(Math.random() * (maxPicNum - minPicNum));
    document.getElementById("tlu_pic").src = picUrl + picNamePrefix + randomNum + picExt;
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
    // setTimeout(1000, clockTick); <-- iga sekundi järel (sekund on ebasobimatu ajaühik, setTimeout ei saa hakkama (aeg-ajalt läheb +1 millisekund))
    requestAnimationFrame(clockTick); // teist akent vaadates jääb seisma
}