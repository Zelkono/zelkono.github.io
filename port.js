let nameShort = document.querySelector(".nameShort");
let nameLong = document.querySelector(".nameLong");
let lightFade = document.getElementById("lightFade");
let darkFade = document.getElementById("darkFade");
let dark = document.querySelectorAll(".dark");
let light = document.querySelectorAll(".light");

let meteor = document.getElementById("meteor");
let space = document.getElementById("stars");
let galaxy = document.getElementById("galaxy");
let moon = document.getElementById("moon");

let blackHole = document.getElementById("blackHole");
let birds = document.getElementById("birds");
let sky = document.getElementById("sky");
let sun = document.getElementById("sun");
let forest = document.getElementById("forest");

let title = document.querySelector(".title");

let mode = 0;

document.getElementById("moreButton").addEventListener("click",function(){
    console.log("more");
    location.href = "aboutMe.html";
})

document.getElementById("photoButton").addEventListener("click", photoDrop);
let movePhoto = false;
function photoDrop(){
    let photo = document.getElementById("photoImage");
    if(movePhoto == false){
        photo.classList.add("movePhoto");
        photo.style.display = "block";
        movePhoto = true;
    }
    else{
        photo.classList.remove("movePhoto");
        movePhoto = false
        photo.style.display = "none"
    }
}

document.getElementById("colorButton").addEventListener("click", colorButton);

nameShort.addEventListener("mouseover", mouseoverName);
function mouseoverName() {
    nameShort.style.display = "none";
    nameLong.style.display = "block";
}

window.addEventListener("scroll", parallax);
function parallax (){
    if (mode == 0){
        space.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        galaxy.style.transform = `translate(${-window.scrollY * 0.05}px, ${window.scrollY * 0.4}px)`;
        moon.style.transform = `translate(${window.scrollY * 0.5}px, ${window.scrollY * 0.4}px)`;
        document.getElementById("title1").style.transform = `translateY(${window.scrollY * 0.6}px)`;
    }
    else if(mode == 1){
        sky.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        sun.style.transform = `translate(${window.scrollY * 0.05}px, ${window.scrollY * 0.4}px)`;
        birds.style.transform = `translate(${-window.scrollY * 0.5}px, ${window.scrollY * 0.4}px)`;
        document.getElementById("title2").style.transform = `translateY(${window.scrollY * 0.6}px)`;
    }
};

//If it works, don't fix it
function toggleMode(newMode, opacityElement, hideElement, objectElement, fadeElement, fadeAnimation, newAnimation, oldAnimation, gradientColor, color) {
    if (mode !== newMode) {
        objectElement.classList.add(newAnimation);
        objectElement.style.display = "block";
        if (oldAnimation == true){
            opacityElement.classList.remove(oldAnimation);
        }
        oldAnimation = true;
        fadeElement.classList.add(fadeAnimation);
        setTimeout(function () {
            objectElement.classList.remove(newAnimation);
            changeColors(color);
            document.getElementById("colorButton").innerText = color;
            blackHole.style.rotate ="0deg"
            opacityElement.forEach(el =>{
                el.style.opacity = 0;
            })
            objectElement.style.display = "none"
            hideElement.forEach(el =>{
                el.style.opacity = 1;
            })
            fadeElement.classList.remove(fadeAnimation);
            document.querySelectorAll(".image-overlay").forEach(function (el) {
                el.style.background = gradientColor;
            });
            mode = newMode;
        }, 4000);
    }
}

function colorButton(){
    let newmode = 1
    if (mode !== newmode){
        lightMeteor()
    }
    else if(mode == newmode){
        darkHole()
    }
}

function lightMeteor() {
    toggleMode(
        1,
        dark,
        light,
        meteor,
        lightFade,
        "lightFade",
        "moveMeteor",
        "moveBlackHole",
        "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.9))",
        "Mørk"
    );
}

function darkHole() {
    toggleMode(
        0,
        light,
        dark,
        blackHole,
        darkFade,
        "darkFade",
        "moveBlackHole",
        "moveMeteor",
        "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",
        "Lys"
    );
}

function changeColors(darkOrLight) {
    if (darkOrLight == "Mørk") {
        document.documentElement.style.setProperty("--whiteColor", "#333");
        document.documentElement.style.setProperty("--darkColor", "#fff");
        document.documentElement.style.setProperty("--mainColor", "#fff3b0");
        document.documentElement.style.setProperty("--secondColor", "#e09f3e");
        document.documentElement.style.setProperty("--offColor", "#ffba08");
        document.documentElement.style.setProperty("--buttonColor", "#fcbf49");

    } else {
        document.documentElement.style.setProperty("--whiteColor", "#fff");
        document.documentElement.style.setProperty("--darkColor", "#333");
        document.documentElement.style.setProperty("--mainColor", "#284b63");
        document.documentElement.style.setProperty("--secondColor", "#003049");
        document.documentElement.style.setProperty("--offColor", "#2a9d8f");
        document.documentElement.style.setProperty("--buttonColor", "#8bfff2");
    }
}
