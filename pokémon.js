let fightButton = document.getElementById('fightButton');
let itemsButton = document.getElementById('itemsButton');
let startSection = document.querySelector('.start');
let fightSection = document.querySelector('.fight');
let itemsSection = document.querySelector('.items');
let backButtonFight = document.getElementById('backFight');
let backButtonItems = document.getElementById('backItems');

let myHPDisplay = document.getElementById("myHP");
let enemyHPDisplay = document.getElementById("enemyHP");
let myAttack1 = document.getElementById("attack1").addEventListener("click", attack1);
let myAttack2 = document.getElementById("attack2").addEventListener("click", attack2);
let myAttack3 = document.getElementById("attack3").addEventListener("click", attack3);
let myAttack4 = document.getElementById("attack4").addEventListener("click", attack4);
let healButton = document.getElementById("heal");
healButton.addEventListener("click", healing);
let myEventBox = document.getElementById("myEvent");
let enemyEventBox = document.getElementById("enemyEvent");
let pokeball = document.getElementById("pokeball");
pokeball.addEventListener("click",catchPokemon);
let namePokemon = document.getElementById("namePokemon").addEventListener("click",displayInput);

document.addEventListener('DOMContentLoaded', function () {
    fightSection.style.display = 'none';
    itemsSection.style.display = 'none';
    fightButton.addEventListener('click', function () {
        fightSection.style.display = 'grid';
        startSection.style.display = 'none';
    });
    itemsButton.addEventListener('click', function () {
        itemsSection.style.display = 'grid';
        startSection.style.display = 'none';
    });
    backButtonFight.addEventListener('click', function () {
        startSection.style.display = 'grid';
        fightSection.style.display = 'none';
    });
    backButtonItems.addEventListener('click', function () {
        startSection.style.display = 'grid';
        itemsSection.style.display = 'none';
    });   
    updateHealSpell();
});


let myHP = Number(myHPDisplay.innerHTML);
let enemyHP = Number(enemyHPDisplay.innerHTML);
let charged = 0;
let protected = 1;
let myHealspells = 2;

function attack(damage,healing,chance) {
    let myHP = Number(myHPDisplay.innerHTML);
    let enemyHP = Number(enemyHPDisplay.innerHTML);
    if(myHP > 0 && enemyHP > 0){
        if (Math.random() > chance) {
            myHP += healing;
            enemyHP -= damage;
            if(myHP < 0){
                myHPDisplay.innerHTML = 0;
            }
            else if(enemyHP < 0){
                enemyHPDisplay.innerHTML = 0;   
            }
            else{
                myHPDisplay.innerHTML = myHP;
                enemyHPDisplay.innerHTML = enemyHP   
            }
            fightSection.style.display = 'none';
            itemsSection.style.display = 'none';
            startSection.style.display = 'none';  
            return true;
        }  
        else{
            fightSection.style.display = 'none';
            itemsSection.style.display = 'none';
            startSection.style.display = 'none';  
            return false
        }
    } 
    else{
        youLost()
    }
}

function attack1() {
    let attackWork = attack(0,50,0.40);
    if(attackWork == true){
        myEventBox.textContent = "Barbarian used RECOVER and restored some health"
        let cross = document.querySelector('.cross');

        cross.classList.add('animate1');
            setTimeout(function () {
                cross.classList.remove('animate1');
                enemyAttack()
            }, 1000);  
    }
    else if(attackWork == false){
        myEventBox.textContent = "Barbarian used RECOVER, but it failed"
        enemyAttack();
    }
}

function attack2() {
    let attackWork = attack(70, 0, 0.10);
    if (attackWork == true) {
        let enemyHP = Number(enemyHPDisplay.innerHTML);
        myEventBox.textContent = "Barbarian used SLASH";
        let highSlash = document.querySelector('.highSlash');

        highSlash.classList.add('animate1');
        setTimeout(function () {
            highSlash.classList.remove('animate1');
            if(enemyHP > 0){
                enemyAttack();
            }
            else{
                youWon();
            }
        }, 1000);  
    } else if (attackWork == false) {
        myEventBox.textContent = "Barbarian used SLASH, but it missed";
        enemyAttack();
    }
}

function attack3() {
    let attackWork = attack(110,0,0.50)
    if(attackWork == true){
        let enemyHP = Number(enemyHPDisplay.innerHTML);
        myEventBox.textContent = "Barbarian used GIGA IMPACT"
        let giga = document.getElementById('impact');
        document.getElementById('myPokémon').classList.add('hidden');
        giga.classList.add('animate3');
        setTimeout(function () {
            giga.classList.remove('animate3');
            document.getElementById('myPokémon').classList.remove('hidden');
            if(enemyHP > 0){
                enemyAttack();
            }
            else{
                youWon();
            }
        }, 1000);  
    }
    else if(attackWork == false){
        myEventBox.textContent = "Barbarian used GIGA IMPACT, but it missed"
        enemyAttack();
    }
}

function attack4() {
    let attackWork = attack(0,0,0.50)
    if(attackWork == true){
        myEventBox.textContent = "Barbarian used PROTECT"
        enemyEventBox.textContent = "The Barbarian protected itself"
        protected = 0;
        let shield = document.getElementById('shield');

        shield.classList.add('animate4');
            setTimeout(function () {
                shield.classList.remove('animate4');
                enemyAttack()
            }, 1000);  
    }
    else if(attackWork == false){
        protected = 1;
        myEventBox.textContent = "Barbarian used PROTECT, but it failed"
        enemyAttack();
    }
}

function enemyAttack() {
    let myHP = Number(myHPDisplay.innerHTML);
    let enemyHP = Number(enemyHPDisplay.innerHTML);
    let chance = Math.random();
    if(chance > 0.80 || charged == 1){
        if(charged == 1){
            myHP -= 150 * protected;
            charged = 0;
            enemyEventBox.textContent = "Darmanitan used SOLARBEAM";
            
            let solarCircle = document.getElementById('solarbeamCircle');
            let solarBeam = document.getElementById('solarbeamBeam');
            
            solarCircle.classList.add('show');
            
            setTimeout(function () {
                solarBeam.classList.add('show');
                
                setTimeout(function () {
                    solarBeam.classList.remove('show');
                    solarCircle.classList.remove('show');
                    startSection.style.display = 'grid';
                    if(myHP <= 0){
                        youLost()
                    }
                }, 1000);
            }, 1000);
            if(myHP < 0){
                myHPDisplay.innerHTML = 0;
            }
            else if(enemyHP < 0){
                enemyHPDisplay.innerHTML = 0;   
            }
            else{
                myHPDisplay.innerHTML = myHP;
                enemyHPDisplay.innerHTML = enemyHP   
            }
        }                       
        else{
            enemyEventBox.textContent = "Darmanitan is charging up"
            charged = 1;
            startSection.style.display='grid';
        }
       
    }
    else if (chance > 0.60) {
        myHP -= 80 * protected;
        myHPDisplay.innerHTML = myHP;
        attack(10,0,0);
        enemyHP = enemyHPDisplay.innerHTML;
        enemyEventBox.textContent = "Darmanitan used FLAREBLITZ but took some recoil";
        let blitz = document.getElementById('flareBlitz');
        document.getElementById('enemyPokémon').classList.add('hidden');
        blitz.classList.add('enemyAnimate1');
        setTimeout(function () {
            blitz.classList.remove('enemyAnimate1');
            document.getElementById('enemyPokémon').classList.remove('hidden');
            startSection.style.display = 'grid';
            if(myHP <= 0){
                youLost()
            }
            else if(enemyHP <= 0){
                youWon()
            }
        }, 1000); 
        if(myHP < 0){
            myHPDisplay.innerHTML = 0;
        }
        else if(enemyHP < 0){
            enemyHPDisplay.innerHTML = 0;   
        }
        else{
            myHPDisplay.innerHTML = myHP;
            enemyHPDisplay.innerHTML = enemyHP   
        }
    }
    else if (chance > 0.30) {
        myHP -= 60 * protected;
        myHPDisplay.innerHTML = myHP;
        enemyEventBox.textContent = "Darmanitan used FIREFANG";
        let fangsUpper = document.getElementById('fangsUpper');
        let fangsLower = document.getElementById('fangsLower');
        fangsUpper.classList.add('enemyAnimate2');
        fangsLower.classList.add('enemyAnimate2');
        setTimeout(function () {
            fangsUpper.classList.remove('enemyAnimate2'); 
            fangsLower.classList.remove('enemyAnimate2');   
            startSection.style.display = 'grid';
            if(myHP <= 0){
                youLost()
            }
        }, 1000); 
        if(myHP < 0){
            myHPDisplay.innerHTML = 0;
        }
        else if(enemyHP < 0){
            enemyHPDisplay.innerHTML = 0;   
        }
        else{
            myHPDisplay.innerHTML = myHP;
            enemyHPDisplay.innerHTML = enemyHP   
        }
    } 
    else {
        myHP -= 40 * protected;
        myHPDisplay.innerHTML = myHP;
        enemyEventBox.textContent = "Darmanitan used TACKLE"
        let tackle = document.querySelector('.enemy');
        tackle.classList.add('enemyAnimate3');
        setTimeout(function () {
            tackle.classList.remove('enemyAnimate3');   
            startSection.style.display = 'grid';
            if(myHP <= 0){
                youLost()
            }
        }, 1000); 
        if(myHP < 0){
            myHPDisplay.innerHTML = 0;
        }
        else if(enemyHP < 0){
            enemyHPDisplay.innerHTML = 0;   
        }
        else{
            myHPDisplay.innerHTML = myHP;
            enemyHPDisplay.innerHTML = enemyHP   
        }
    }
    
    protected = 1;
}

function updateHealSpell() {
    healButton.textContent = `Healspells (${myHealspells} remaining)`;
}

function healing() {
    attackWork = attack(0,0,0)
    if(attackWork == true && myHP > 0 && myHealspells > 0 ){
        myHealspells = myHealspells - 1;
        updateHealSpell();
        attack(0,100,0)
        myEventBox.textContent = "Barbarian used a HEALSPELL. Fresh";
        let cross = document.querySelector('.cross');
        cross.classList.add('animate1');
            setTimeout(function () {
                cross.classList.remove('animate1');
                enemyAttack()
            }, 1000);  
    }
    else{
        myEventBox.textContent = "OH NO! Barbarian is out of HEALSPELLS";
        startSection.style.display = 'grid';
    }

}

function catchPokemon() {
    let attackWork;
    enemyHP = enemyHPDisplay.innerHTML;

    if (enemyHP > 200) {
        attackWork = attack(0, 0, 0.90);
    } else if (enemyHP > 100) {
        attackWork = attack(0, 0, 0.70);
    } else {
        attackWork = attack(0, 0, 0.50);
    }

    myEventBox.textContent = "You threw a pokéball at Darmanitan";
    enemyEventBox.textContent = "Will it work?";
    document.getElementById('enemyPokémon').classList.add('hidden');
    document.getElementById('capture').classList.add('show');
    document.getElementById('enemyHP').classList.add('hidden');

    setTimeout(function () {
        if (attackWork === true) {
            myEventBox.textContent = "Darmanitan was caught and added to the Pokedex";
            enemyEventBox.textContent = "Try again?";
            setTimeout(function () {
                document.querySelector('.pokedex').classList.add('show');
                document.querySelector('.wrapper').classList.add('hidden');
            }, 3000);
        } else {
            myEventBox.textContent = "OH NO, Darmanitan escaped the pokéball !!!";
            document.getElementById('enemyPokémon').classList.remove('hidden');
            document.getElementById('capture').classList.remove('show');
            document.getElementById('enemyHP').classList.remove('hidden');
            enemyAttack();
        }
    }, 2000);
}


function youWon(){
    myEventBox.textContent = "You won the battle !!!"
    enemyEventBox.textContent = "Well done!"
    document.getElementById('enemyPokémon').classList.add('hidden');
    document.getElementById('enemyHP').classList.add('hidden');
    startSection.style.display = 'none';
    setTimeout(function () {
        document.querySelector('.evolution').classList.add('show');
        document.querySelector('.wrapper').classList.add('hidden');
        setTimeout( function (){
            document.getElementById("evoEffectCont").classList.add('animation');
            setTimeout( function (){
                document.getElementById('whatEvo').style.display="none";
                document.getElementById('nowayEvo').style.display="block"
                document.getElementById('barbarianKing').style.display="block";
                document.getElementById('barbarian').style.display="none";
            },3500)
        }, 4000);
    }, 1000);
    
}

function youLost(){
    myEventBox.textContent = "You lost the battle ..."
    enemyEventBox.textContent = "Try again?"
    document.getElementById('myPokémon').classList.add('hidden');
    document.getElementById('myHP').classList.add('hidden');
    startSection.style.display = 'none';
}

function displayInput() {
    let inputValue = document.getElementById('input').value;
    document.getElementById('output').innerText = inputValue + " entered your party.";
}