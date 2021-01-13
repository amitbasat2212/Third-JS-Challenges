
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//create a random hole 
function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;

}

//doing the jump of the moles
function peep() {
    const time = randomTime(500, 1000); //get a random time to determine how long mole should peep
    const holerand = randomHole(holes); //get the random hole from the randomHole function
    holerand.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        holerand.classList.remove('up'); //make the selected mole "pop down" after a random time
        if(!timeUp) {
            peep();
        }
    }, time);

        
 }

//start the game itself 
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random moles for 15 seconds
       
}

//the push itself on the button 
function weck(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent=score;
}

//
moles.forEach(mole => mole.addEventListener('click', weck));






