let canvas;
let ctx;
let ball_list = [];
let elements_limit = 10;
let game_alphabet = [];
let hit_count = 0;
let wrong_count = 0;
let miss_count = 0;

//täiendada mängu!
//mänguelemendid värviliseks - juhuslikud värvid
//lugeda ka valesid ja lausa mööda tehtud klikke!
//Luua mängu alustamine ja lõpetamine koos võimalusega uuesti mängida
//lisada heliklipid erinevate tabamuste jaoks, miks mitte ka mängu alguseks ja lõpuks. 
//lisada taustamuusika (võimalusega seda mitte mängida) igasugused muud helid (kui läheb serva vastu, saab pihta jne)
//lisada ajavõtt (fikseerida algushetk, lõpuhetk,  getTime() annab ajahetke millisekundites ja sellest saab arvutada minutid, sekundid jms).
//lisada punktisüsteem
//laske fantaasial lennata!


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    init_game();
}

function init_game() {
    add_elements();
    canvas.addEventListener("mousedown", check_hits);
}

function add_elements() {
    let base_alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "W", "Õ", "Ä", "Ö", "Ü", "X", "Y"];
    // loosime soovitud arvu tähti
    game_alphabet = base_alphabet.slice(0);
    while (game_alphabet.length > elements_limit) {
        let one_to_remove = Math.round(Math.random() * (game_alphabet.length - 1));
        game_alphabet.splice(one_to_remove, 1);
    }
    // console.log(game_alphabet);
    // let x = canvas.width / 2;
    // let y = canvas.height / 2;
    // let r = 15;
    for (let i = 0; i < elements_limit; i++) {
        let r = 15 + Math.round(Math.random() * 15);
        let x = Math.round(Math.random() * (canvas.width - 4 * r) + 2 * r);
        let y = Math.round(Math.random() * (canvas.height - 4 * r) + 2 * r);
        let symbol = game_alphabet[game_alphabet.length - 1 - i];
        let colour = "hsl(" + Math.round(Math.random() * 359) + ", 100%, 50%)";
        ball_list.push(new Game_ball(x, y, r, symbol, colour));
    }
    // move_1();
    // ball = new Game_ball(x, y, r);
    move_elements();
}

function move_elements() {
    canvas.width = canvas.width;
    // ball.move_self();
    // ball.draw_self();
    for (let i = 0; i < ball_list.length; i++) {
        ball_list[i].move_self();
        ball_list[i].draw_self();
    }
    if (ball_list.length > 0) {
        requestAnimationFrame(move_elements);
    }
}

function check_hits(e) {
    let m_x = e.clientX - canvas.offsetLeft + window.scrollX;
    let m_y = e.clientY - canvas.offsetTop + window.scrollY;
    let hit = false;
    for (let i = 0; i < ball_list.length; i++) {
        if (ball_list[i].was_hit(m_x, m_y)) {
            hit = true;
            if (ball_list[i].symbol == game_alphabet[hit_count]) {
                ball_list.splice(i, 1);
                hit_count++;
            break;
            } else {
                wrong_count++;
            }          
        }
    }
    if (!hit) {
        miss_count++;
    }
}

function pythagoras(b_x, b_y, m_x, m_y) {
    return Math.sqrt(Math.pow(b_x - m_x, 2) + Math.pow(b_y - m_y, 2));
}

class Game_ball {
    constructor(x, y, r, symbol, colour) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.symbol = symbol;
        this.colour = colour;
        this.speed_x = 0;
        this.speed_y = 0;
        this.set_speed();
        this.draw_self();
    }

    draw_self() {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fill();
        ctx.closePath();
        // lisame tähe
        ctx.fillStyle = "#ffffff";
        // "bold 24px Verdana"
        ctx.font = "bold " + Math.round(this.r * 1.4) + "px Verdana";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.symbol, this.x, this.y);
    }

    set_speed() {
        while (this.speed_x == 0 && this.speed_y == 0) {
            // juhuslikud kiirused -5 ... 5
            this.speed_x = 5 - Math.round(Math.random() * 10);
            this.speed_y = 5 - Math.round(Math.random() * 10);
        }
    }

    move_self() {
        // edge of canvas?
        if (this.x <= this.r || this.x >= canvas.width - this.r) {
            this.speed_x *= -1;
        }
        if (this.y <= this.r || this.y >= canvas.height - this.r) {
            this.speed_y *= -1;
        }
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

    was_hit(m_x, m_y) {
        return pythagoras(this.x, this.y, m_x, m_y) <= this.r;
    }
}

function move_1() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.width; // Lähtestab kogu canvas elemendi
    ctx.fillStyle = "#ffcc00";
    x += speed_x;
    y += speed_y;
    // edge of canvas?
    if (x <= r || x >= canvas.width - r) {
        speed_x *= -1;
    }
    if (y <= r || y >= canvas.height - r) {
        speed_y *= -1;
    }
    ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    ctx.closePath();
    requestAnimationFrame(move_1);
}
