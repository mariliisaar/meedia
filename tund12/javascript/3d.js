let degree = 0;
let z_degree = 30;
let toggle = 0;
let percent = 301;
let up = true;

window.onload = function() {
    rotate_cube();
}

function rotate_cube() {
    let cube = document.getElementById("cube");
    if (degree == 362) {
        degree = 0;
        toggle += 1;
        if (toggle > 2) {
            toggle = 0;
        }
    }

    if (percent >= 700) {
        up = false;
    }
    if (percent <= 0) {
        up = true;
    }
    document.getElementById("area").style.perspectiveOrigin = "0%" + (percent - 371) + "%";
    if (up) {
        percent += 1;
    } else {
        percent -= 1;
    }
    cube.style.transform = "rotateZ(" + z_degree + "deg) rotateY(" + degree + "deg)";
    degree += 2;
    if (degree % 90 == 0) {
        change_image(degree / 90);
    }
    requestAnimationFrame(rotate_cube);
}

function change_image(side) {
    let image;
    if (side == 1) {
        image = document.getElementById("front").getElementsByTagName("img")[0];
    } else if (side == 2) {
        image = document.getElementById("right").getElementsByTagName("img")[0];
    } else if (side == 3) {
        image = document.getElementById("back").getElementsByTagName("img")[0];
    } else {
        image = document.getElementById("left").getElementsByTagName("img")[0];
    }
    toggle_img(image, side);
}

function toggle_img(target, side) {
    if (toggle == 0) {
        target.src = "../media/cube/uni" + side + ".png";
    } else if (toggle == 1) {
        target.src = "../media/cube/dino" + side + ".png";
    } else {
        target.src = "../media/cube/dragon" + side + ".png";
    }
}