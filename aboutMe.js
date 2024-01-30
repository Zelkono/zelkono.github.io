document.getElementById("homeButton").addEventListener("click",function(){
    location.href = "index.html";
})

document.getElementById("clashRoyale").addEventListener("click", function(){
    document.getElementById("line2").classList.add("moveLine");
    document.getElementById("line2").style.opacity = 1;
    setTimeout (function(){
        document.getElementById("clash").classList.add("moveClash");
        document.getElementById("clash").style.opacity = 1;
    },2000);
})

let nameShort = document.querySelector(".nameShort");
let nameLong = document.querySelector(".nameLong");
nameShort.addEventListener("mouseover", mouseoverName);
function mouseoverName() {
    console.log("hover")
    nameShort.style.display = "none";
    nameLong.style.display = "block";
}

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

document.getElementById("colorButton").addEventListener("click", changeColors);
let light = false;

function changeColors() {
    if (light == false) {
        document.documentElement.style.setProperty('--whiteColor', '#333');
        document.documentElement.style.setProperty('--darkColor', '#fff');
        document.documentElement.style.setProperty('--mainColor', '#fff3b0');
        document.documentElement.style.setProperty('--secondColor', '#e09f3e');
        document.documentElement.style.setProperty('--offColor', '#ffba08');
        document.documentElement.style.setProperty('--buttonColor', '#fcbf49');
        light = true
    } else {
        document.documentElement.style.setProperty('--whiteColor', '#fff');
        document.documentElement.style.setProperty('--darkColor', '#333');
        document.documentElement.style.setProperty('--mainColor', '#284b63');
        document.documentElement.style.setProperty('--secondColor', '#003049');
        document.documentElement.style.setProperty('--offColor', '#2a9d8f');
        document.documentElement.style.setProperty('--buttonColor', '#8bfff2');
        light = false
    }
}

