let canvas;
let ctx;

function initDraw() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    draw_background();
    draw_stars();
    draw_moon();
    draw_house();


    // draw_rect();
    // draw_circle();
    // draw_line();
    // draw_pacman();
}

function draw_background() {
    let gradient = ctx.createRadialGradient(380, 450, 25, 380, 310, 500);
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(0.2, "#bd521c");
    gradient.addColorStop(0.5, "#630966");
    gradient.addColorStop(0.7, "#1c0e5c");
    gradient.addColorStop(1, "#1c0547");
    let green_gradient = ctx.createRadialGradient(200, 280, 25, 200, 310, 600);
    green_gradient.addColorStop(0, "#3c6621");
    green_gradient.addColorStop(0.6, "#174a1b");
    green_gradient.addColorStop(1, "#15302a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 960, 310);
    ctx.fillStyle = green_gradient;
    ctx.fillRect(0, 310, 960, 540);
}

function draw_stars() {
    let rnd = Math.floor(Math.random() * (2000 - 500 + 1) + 500);
    for (let i = 0; i < rnd; i++) {
        let r = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        let x = Math.floor(Math.random() * (960 - 1 + 1) + 1);
        let y = Math.floor(Math.random() * (310 - 1 + 1) + 1);
        let grd = ctx.createRadialGradient(x, y, 1, x - 1, y - 1, r);
        grd.addColorStop(0, "rgb(255, 255, 255)");
        ctx.beginPath();
        if (r >= 2) {
            grd.addColorStop(0.5, "rgba(170, 173, 173, 0.3)");
        }
        grd.addColorStop(1, "rgba(170, 173, 173, 0.3)");
        ctx.fillStyle = grd;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function draw_moon() {
    let grd = ctx.createRadialGradient(100, 90, 5, 100, 90, 50);
    grd.addColorStop(0, "rgb(255, 255, 255)");
    grd.addColorStop(1, "rgba(170, 173, 173, 0.5)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(100, 100, 30, 0.2 * Math.PI, 1.6 * Math.PI);
    ctx.quadraticCurveTo(80, 110, 125, 120);
    ctx.fill();
    ctx.closePath();
}

function draw_house() {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "green";
    ctx.beginPath();
        ctx.moveTo(750, 300); // Esikülje kolmnurkne sein
        ctx.lineTo(680, 120);
        ctx.lineTo(595, 300);
        ctx.rect(595, 300, 155, 100); // Esikülje nelinurkne sein
        ctx.moveTo(595, 300); // Maja külg
        ctx.lineTo(440, 280);
        ctx.lineTo(430, 235); // Külje kolmnurga tipp
        ctx.lineTo(400, 280);
        ctx.lineTo(400, 400);
        ctx.lineTo(555, 420);
        ctx.lineTo(555, 390);
        ctx.lineTo(595, 400);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
        ctx.moveTo(600, 140); // Vasakpoolne katus - külg
        ctx.lineTo(435, 135);
        ctx.lineTo(480, 365);
        ctx.lineTo(525, 330);
        ctx.lineTo(555, 230);
        ctx.lineTo(545, 165);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "orange";
    ctx.beginPath();
        ctx.moveTo(680, 65); // Parempoolne katus - külg
        ctx.bezierCurveTo(670, 65, 640, 125, 545, 165);
        ctx.bezierCurveTo(550, 225, 545, 270, 505, 330);
        ctx.quadraticCurveTo(470, 390, 460, 380);
        ctx.quadraticCurveTo(465, 400, 485, 390);
        ctx.bezierCurveTo(575, 300, 660, 160, 680, 65);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "yellow";
    ctx.beginPath();
        ctx.moveTo(480, 365); // Vasakpoolne katus - otse
        ctx.lineTo(460, 365);
        ctx.lineTo(430, 235);
        ctx.lineTo(390, 345);
        ctx.lineTo(365, 340);
        ctx.lineTo(435, 135);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "brown";
    ctx.beginPath();
        ctx.moveTo(390, 345); // Vasakpoolne katus - vari
        ctx.lineTo(400, 340);
        ctx.lineTo(400, 317);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "yellow";
    ctx.beginPath();
        ctx.moveTo(680, 65); // Parempoolne katus - otse
        ctx.bezierCurveTo(620, 80, 620, 290, 470, 393);
        ctx.bezierCurveTo(570, 450, 650, 200, 680, 120);
        ctx.quadraticCurveTo(710, 300, 790, 360);
        ctx.quadraticCurveTo(815, 370, 815, 345);
        ctx.bezierCurveTo(690, 200, 750, 80, 680, 65);
    ctx.closePath();
    ctx.fill();
}

function draw_pacman() {
    ctx.beginPath();
        ctx.arc(800, 110, 100, .1 * Math.PI, 1.9 * Math.PI);
        ctx.lineTo(800, 110);
        ctx.fill();
    ctx.closePath();
}

function draw_line() {
    ctx.beginPath();
        ctx.moveTo(200, 0);
        ctx.lineTo(200, canvas.height / 3);
        // quadratic    kontrollpunkti x, kontrollpunkti y, x, y
        ctx.quadraticCurveTo(480, 270, 200, 360);
        // bezier    kontrollpunkti x, kontrollpunkti y, 2kontrollpunkti x, 2kontrollpunkti y, x, y
        ctx.bezierCurveTo(400, 400, 0, 450, 200, 540);
        ctx.stroke();
    ctx.closePath();
    
}

function draw_circle() {
    ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    ctx.beginPath();
    // kaar arc x, y, r, algusnurk, lõpunurk
        ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function draw_rect() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#ffaaaa";

    // x, y, w, h
    ctx.beginPath();
        ctx.rect((canvas.width - 200) / 2, (canvas.height - 100) / 2, 200, 100);
    ctx.closePath();
    // ctx.stroke();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "green";
    ctx.fillStyle = "#aaffaa";
    ctx.beginPath();
        ctx.rect((canvas.width - 200) / 2 + 200 + 6, (canvas.height - 100) / 2, 200, 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "magenta";
    ctx.strokeRect((canvas.width - 200) / 2, (canvas.height - 100) / 2 - 100 - 6, 200, 100);
    ctx.fillStyle = "#ffff00";
    ctx.fillRect((canvas.width - 200) / 2, (canvas.height - 100) / 2 + 100 + 6, 200, 100);
}