let collision = false;
let player = document.querySelector('.player');
let xlPlayer, xrPlayer, ytPlayer, ybPlayer;
let spikes = document.querySelectorAll(".spike");
let blade1 = document.querySelectorAll(".blade1");
let blade2 = document.querySelectorAll(".blade2");
let topObject = document.querySelectorAll(".topObject");
let canonBall;
let bottomObject = document.querySelectorAll(".bottomObject");
let middleObject = document.querySelectorAll(".middleObject");
let goal = document.querySelectorAll(".goal");
let goalCounter = 1;
let deathCounter = document.getElementById("deathCounter");
let numberDeath = 0;
deathCounter.innerHTML = numberDeath;


let stages = document.querySelectorAll("[id^='stage']");


let assignedLevelClasses = [];

function removeLevelClasses(stage) {
    const classes = stage.classList;
    console.log("almost");

    if (classes) {
        console.log("work");
        for (let i = classes.length - 1; i >= 0; i--) {
            if (classes[i].startsWith('lvl')) {
                classes.remove(classes[i]);
            }
        }
        console.log("s0j0w");
    }
}

function levelCreate() {
    console.log("level made");
    assignedLevelClasses = [];

    stages.forEach((stage) => {
        let randomLevelNumber;
        do {
            randomLevelNumber = Math.floor(Math.random() * 3) + 1;
        } while (assignedLevelClasses.includes(`lvl${randomLevelNumber}`));

        assignedLevelClasses.push(`lvl${randomLevelNumber}`);
        stage.classList.add(`lvl${randomLevelNumber}`);
    });
}

function removeLevelClassesFromStages() {
    stages.forEach((stage) => {
        removeLevelClasses(stage);
    });
    levelCreate()
}

let X = 0;
let Y = 0;
let speed = 2;

let VXR = 0;
let VXL = 0;
let VYU = 0;
let VYD = 0;

let VX = 0;
let VY = 0;

function update() {
    xlPlayer = player.getBoundingClientRect().left;
    xrPlayer = player.getBoundingClientRect().right;
    ytPlayer = player.getBoundingClientRect().top;
    ybPlayer = player.getBoundingClientRect().bottom;

    wallL = xlPlayer < 0;
    wallR = xrPlayer > window.innerWidth;
    wallB = ybPlayer > window.innerHeight;
    wallT = ytPlayer < 0;

    if (wallL) VXL = 0;
    if (wallR) VXR = 0;
    if (wallB) VYD = 0;
    if (wallT) VYU = 0;

    collisionType(canonBalls, 'canonBall');
    collisionType(spikes, 'spike');
    collisionType(blade1, 'blade');
    collisionType(blade2, 'blade');
    collisionType(middleObject, 'object');
    collisionType(topObject, 'object');
    collisionType(bottomObject, 'object');
    collisionType(goal, 'goal');

    checkDiagonal();

    X += VX * speed;
    Y += VY * speed;

    if (collision == true) {
        console.log("death");
        resetGame();
    } else if (collision == false) {
        player.style.left = X + 'px';
        player.style.top = Y + 'px';
    }
    requestAnimationFrame(update);
}

function checkCollisionContact(contact, type) {
    someCollision(contact.getBoundingClientRect(), type);
}

function someCollision(spikeRekt, type) {
    if (
        xrPlayer >= spikeRekt.left &&
        xlPlayer < spikeRekt.right &&
        ytPlayer <= spikeRekt.bottom &&
        ybPlayer >= spikeRekt.top
    ) {
        if (type === 'spike' || type === 'blade' || type === 'canonBall') {
            collision = true;
        } else if (type === 'object') {
            const isCollidingLeft = xrPlayer >= spikeRekt.left && xlPlayer <= spikeRekt.left;
            if (isCollidingLeft) VXR = 0;

            const isCollidingRight = xlPlayer <= spikeRekt.right && xrPlayer >= spikeRekt.right;
            if (isCollidingRight) VXL = 0;

            const isCollidingBottom = ybPlayer >= spikeRekt.top && ytPlayer <= spikeRekt.top - 10;
            if (isCollidingBottom) VYD = 0;

            const isCollidingTop = ytPlayer <= spikeRekt.bottom && ybPlayer >= spikeRekt.bottom + 10;
            if (isCollidingTop) VYU = 0;
        } else if (type === 'goal') {
            console.log("Reached the goal!");
            numberDeath -=1
            collision = true;
            removeLevelClassesFromStages();
        }
    }
}11

function collisionType(type, damageCheck) {
    type.forEach((contact) => checkCollisionContact(contact, damageCheck));
}

function createCanonBall() {
    console.log("created canonball");
    let canonBall = document.createElement("div");
    canonBall.classList.add("canonBall");
    document.querySelector(".canon").appendChild(canonBall);
    canonBalls = document.querySelectorAll(".canonBall");
}

setTimeout(createCanonBall, 1000);
let canonBalls = document.querySelectorAll(".canonBall");

addEventListener("keydown", function (e) {
    if (e.code == "KeyW") {
        VYU = -3;
    }
    if (e.code == "KeyS") {
        VYD = 3;
    }
    if (e.code == "KeyA") {
        VXL = -3;
    }
    if (e.code == "KeyD") {
        VXR = 3;
    }
});

addEventListener("keyup", function (e) {
    if (e.code == "KeyW") {
        VYU = 0;
    }
    if (e.code == "KeyS") {
        VYD = 0;
    }
    if (e.code == "KeyA") {
        VXL = 0;
    }
    if (e.code == "KeyD") {
        VXR = 0;
    }
});

function checkDiagonal() {
    if ((VYU !== 0 || VYD !== 0) && (VXL !== 0 || VXR !== 0)) {
        VX = (VXR + VXL) / Math.sqrt(2);
        VY = (VYU + VYD) / Math.sqrt(2);
    } else {
        VX = VXR + VXL;
        VY = VYU + VYD;
    }
}

function resetGame() {
    X = 0;
    Y = 0;
    player.style.left = X + 'px';
    player.style.top = Y + 'px';
    collision = false;
    numberDeath += 1;
    deathCounter.innerHTML = numberDeath;
}

function timer() {
    let seconds = 0;
    function updateTimer() {
        document.getElementById("timer").innerHTML = seconds;
        seconds++;
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

timer();
update();
levelCreate();
