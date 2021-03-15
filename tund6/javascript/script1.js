let message = "Töötab!";
let picUrl = "../../../~rinde/media/photos/TLU_600x400/";
let picNamePrefix = "tlu_";
let picExt = ".jpg";
let minPicNum = 1;
let maxPicNum = 43;
let picNum = 1;
let picChange = 0;
let counter = 0;

window.onload = function() {
    // alert(message);
    console.log("Sõnum on: " + message);
    putOpenTime();
    putRandomPic();
    clockTick();
    // setInterval(300, clockTick); <-- sama probleem nagu setTimeout + ressursirohke kuna teist akent vaadates käib edasi
    setButtons();
}

function setButtons() {
    document.getElementById("nextphoto").addEventListener("click", nextPhoto);
    document.getElementById("prevphoto").addEventListener("click", prevPhoto);
    // panen foto opacity siirde lõppu kuulama
    document.getElementById("tlu_pic2").addEventListener("transitionend", enableButtons);
    document.getElementById("animBtn").addEventListener("click", toggleAnim);
    document.getElementById("stage").addEventListener("animationstart", animInfo);
    document.getElementById("stage").addEventListener("animationend", animInfo);
    document.getElementById("stage").addEventListener("animationiteration", animInfo);
    document.getElementById("night").addEventListener("transitionend", animInfo);
}

function enableButtons() {
    document.getElementById("nextphoto").disabled = false;
    document.getElementById("prevphoto").disabled = false;
}

function nextPhoto() {
    picNum ++;
    if (picNum > maxPicNum) {
        picNum = minPicNum;
    }
    putPhoto();
}

function prevPhoto() {
    picNum --;
    if (picNum < minPicNum) {
        picNum = maxPicNum;
    }
    putPhoto();
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
    picNum = randomNum;
    putPhoto();
}

function putPhoto() {
    document.getElementById("nextphoto").disabled = true;
    document.getElementById("prevphoto").disabled = true;
    if (picChange % 2 == 0) {
        document.getElementById("tlu_pic2").src = picUrl + picNamePrefix + picNum + picExt;
        document.getElementById("tlu_pic2").style.opacity = 1; 
    } else {
        document.getElementById("tlu_pic").src = picUrl + picNamePrefix + picNum + picExt;
        document.getElementById("tlu_pic2").style.opacity = 0;
    }
    picChange ++;
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

function toggleAnim() {
    // console.log(document.getElementById("truckarea").style.animationPlayState);
    let allItems = document.getElementById("stage").getElementsByTagName("*");
    // console.log(allItems);
    if (document.getElementById("animBtn").innerHTML == "Käivita animatsioon") {
        document.getElementById("animBtn").innerHTML = "Peata animatsioon";
        // document.getElementById("truckarea").style.animationPlayState = "running";
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].style.animationPlayState = "running";
        }
    } else {
        document.getElementById("animBtn").innerHTML = "Käivita animatsioon"
        // document.getElementById("truckarea").style.animationPlayState = "paused";
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].style.animationPlayState = "paused";
        }
    }
}

function animInfo(e) {
    let randomDuration = 8 + Math.round(Math.random() * (13 - 8));
    let randomDelay = 1 + Math.round(Math.random() * (6 - 1));
    let night = document.getElementById("night");
    let carcone = document.querySelector(".carcone");
    let truckcone = document.querySelector(".truckcone");
    if (e.type == "animationend") {
        // console.log(e.animationName);
        // console.log(e.target.id);
        if (e.target.id == "truckarea" || e.target.id == "cararea") {
            e.target.style.animationDelay = randomDelay + "s";
            e.target.style.animationDuration = randomDuration + "s";
            if (e.animationName == "drive") {
                e.target.style.animationName = "driveback";
            } else {
                e.target.style.animationName = "drive";
            }
        }

        if (e.target.id == "cararea") {
            carcone.style.display = "none";
        }

        if (e.target.id == "truckarea") {
            truckcone.style.display = "none";
        }
    }


    if (e.type == "animationstart" && e.target.id == "cararea") {
        carcone.style.display = "block";
    }

    if (e.type == "animationstart" && e.target.id == "truckarea") {
        truckcone.style.display = "block";
    }

    if (e.type == "animationiteration" && e.target.id == "wm_wings") {
        counter++;
        if (counter % 2 == 0) {
            if(night.style.opacity == 0) {
                night.style.opacity = 0.8;
            } else {
                night.style.opacity = 0;
                carcone.style.opacity = 0;
                truckcone.style.opacity = 0;
            } 
        }
    }

    if (e.type == "transitionend") {
        if(night.style.opacity != 0) {
            carcone.style.opacity = 1;
            truckcone.style.opacity = 1;
        }
    }
}