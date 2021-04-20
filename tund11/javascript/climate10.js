let canvas;
let ctx;
let temp_unit;
let time_unit;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    // nihutan graafikakonteksti
    ctx.translate(0, canvas.height / 2);
    ctx.scale(1, -1);
    // arvutan ühikud
    temp_unit = Math.floor(canvas.height / 60);
    time_unit = Math.floor(canvas.width / avg_temp.length + 1);
    draw_center();
    draw_graph();
}

function draw_center() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.stroke();
    ctx.closePath();
}

function draw_graph() {
    ctx.strokeStyle = "gray";
    ctx.beginPath();
        ctx.moveTo(time_unit, avg_temp[0][2] * temp_unit);
        for (let i = 1; i < avg_temp.length; i++) {
            ctx.lineTo(time_unit * (i + 1), avg_temp[i][2] * temp_unit);
        }
        ctx.stroke();
    ctx.closePath();
}