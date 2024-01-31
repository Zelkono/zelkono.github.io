let wrapper = document.querySelector(".wrapper");
let colorTop = document.getElementById("colorTop");
let colorBottom = document.getElementById("colorBottom");
colorTop.addEventListener("change", changeColor);
colorBottom.addEventListener("change", changeColor);

let inputDateEl = document.getElementById("date");
let inputCategoryEl = document.getElementById("category");
let inputTitleEl = document.getElementById("title");
let inputContentEl = document.getElementById("content");
let containerEl = document.getElementById("container");
let addToListEl = document.getElementById("add");
let sortDateEl = document.getElementById("sortDate");
let sortTitleEl = document.getElementById("sortTitle");
let sortCategoryEl = document.getElementById("sortCategory");
let imageInput = document.getElementById("imageInput");

addToListEl.addEventListener("click", addList);
sortDateEl.addEventListener("click", sortByDate);
sortCategoryEl.addEventListener("click", sortByCategory);
sortTitleEl.addEventListener("click", sortByTitle);
imageInput.addEventListener("change", handleImage);

//Definisjon av listen
let list = [
    { 
        dato: "Dato: 2023-6-12", 
        kategori: "Kategori: liten", 
        tittel: "Tittel: Emolga Pokémon", 
        innhold: "Innhold: Emolga er ganske insane fordi den er Electric og Flying type. Det eneste som er Super Effective mot Electric type er Ground. Siden Emolga er Flying type har den ikke denne svakheten på grunn av Levitate.", 
        bilde: "/587.png"
    },
    { 
        dato: "Dato: 2023-6-13", 
        kategori: "Kategori: liten", 
        tittel: "Tittel: Archer", 
        innhold: "Innhold: Archer føtter er crazy. My days.", 
        bilde: "/feet/images.jpg"
    },
    {
        dato: "Dato: 2023-6-14", 
        kategori: "Kategori: massiv", 
        tittel: "Tittel: Hog rider", 
        innhold: "Innhold: Hog rider er insane, men føttene hans er bedre", 
        bilde: "/feet/DBVCTJ6WsAA1IOb.jpg"
    }
];

showList();

//Viser oppdatert liste
function showList() {
    containerEl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        //Infomasjonen går i objektet tallet [i] er på
        let minListe = list[i];

        //Lager elementer
        let divEl = document.createElement("div");
        let pEl1 = document.createElement("p");
        let pEl2 = document.createElement("p");
        let pEl3 = document.createElement("p");
        let pEl4 = document.createElement("p");

        //Skriver inn informasjon fra nyeste inputs
        pEl1.innerText  = minListe.dato
        pEl2.innerText  = minListe.kategori 
        pEl3.innerText = minListe.tittel
        pEl4.innerText = minListe.innhold

        //Lager image element for bildet
        let imgEl = document.createElement("img");
        //Leter etter lenken av bildet
        imgEl.src = minListe.bilde;
        imgEl.alt = "Image";
        imgEl.setAttribute('width', '200px');
        imgEl.setAttribute('height', '200px');

        //Lager button element som er remove knapp
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "BEGONE";
        deleteBtn.id = i;
        deleteBtn.style.color = "black"
        deleteBtn.addEventListener("click", removeFromList);

        //Setter p, image, og button elementer som en child av div
        divEl.appendChild(pEl1);
        divEl.appendChild(pEl2);
        divEl.appendChild(pEl3);
        divEl.appendChild(pEl4);
        divEl.appendChild(imgEl);
        divEl.appendChild(deleteBtn);
        //Div element går i container
        containerEl.appendChild(divEl);
        //Container går i wrapper
        wrapper.appendChild(containerEl);
        //Gir div classnavn "liste"
        divEl.classList = "liste";
    }
}

//Sorterer datoer
function sortByDate() {
    list.sort(compareDate);
    showList();
}
function compareDate(a, b) {
    let dateA = new Date(a.dato);
    let dateB = new Date(b.dato);
    return dateB - dateA;
}

//Sorterer kategorier
function sortByCategory() {
    list.sort(compareCategory);
    showList();
}
function compareCategory(a, b) {
    return a.kategori.localeCompare(b.kategori);
}

//Sorterer titler
function sortByTitle(){
    list.sort(compareTitle);
    showList();
}
function compareTitle(a, b){
    return a.tittel.localeCompare(b.tittel);
}

//fjerner objekt som er liste[i]
function removeFromList(e) {
    let id = e.target.id;
    list.splice(id, 1);
    showList();
}

//Gjør om imageInput til en lenke
function handleImage() {
    //finner filen til bilde
    let file = imageInput.files[0];

    if (file) {
        //Leser filen gitt
        let reader = new FileReader();
        reader.readAsDataURL(file);

        //Når filen er ferdig lastet kjøres funksjonen
        reader.onload = function (e) {
        //Filen er nå en lenke til bildet
        imageDataURL = e.target.result;
        };

    } else {
        alert('Velg et bilde');
    }
}

//Legger inputs i listen
function addList() {
    //Legger det nye objektet under the forrige
    list.push({
        //Lager strings for det nye objektet
        dato: "Dato: " + inputDateEl.value,
        kategori: "Kategori: " + inputCategoryEl.value,
        tittel: "Tittel: " + inputTitleEl.value,
        innhold: "Innhold: " + inputContentEl.value,
        bilde: imageDataURL
    });
    
    //Viser det nye objektet sammen med de forrige
    showList();
    //Tømmer input verdiene slik at man kan skrive i dem på nytt
    inputDateEl.value = '';
    inputCategoryEl.value = '';
    inputTitleEl.value = '';
    inputContentEl.value = '';
    imageInput.value = '';
    imageDataURL = null;
}

function changeColor(){
    //Skjekker fargeverdiene på inputene
    let topColor = colorTop.value;
    let bottomColor = colorBottom.value;
    //Setter fargene inn i linear gradient
document.body.style.background = "linear-gradient(to bottom, " + topColor + ", " + bottomColor + ")";
wrapper.style.background = "linear-gradient(to bottom, " + topColor + ", " + bottomColor + ")";

    //Kjører funksjon med fargeverdiene
    isColorLight(topColor, bottomColor);
}

function isColorLight(hexColor1,hexColor2) {
    //Finner fargen sin r g b value i TopColor
    let r = parseInt(hexColor1.slice(1, 3), 16);
    let g = parseInt(hexColor1.slice(3, 5), 16);
    let b = parseInt(hexColor1.slice(5, 7), 16);

    //Finner fargen sin r g b verdie i bottomColor
    let x = parseInt(hexColor2.slice(1, 3), 16);
    let y = parseInt(hexColor2.slice(3, 5), 16);
    let z = parseInt(hexColor2.slice(5, 7), 16);

    //plusser verdiene sammen
    let comboColorTop = r + g + b;
    let comboColorBottom = x + y + z;

    //Skjekker om det er mer verdien satt til brightness. Hvis det er mer blir tekstfargen om til svart. Hvis ikke blir tekstfargen om til hvit
    let brightness = 500;
    if (comboColorTop + comboColorBottom > brightness){
        document.body.style.color ='black';
    }
    else{
        document.body.style.color = 'white';
    }
}