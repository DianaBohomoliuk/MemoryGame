const cards = document.querySelectorAll('.memory-card');
const congrat = document.querySelector('.congrat');
const btnAgain = document.querySelector('.btnAgain');

let hasFlippedCard = false;
let firstCard, secondCard;
let boardLocked = false;

const flipCard = (e) => {
    if(boardLocked) return;
    const target = e.target.parentElement;

    if(target === firstCard) return;

    target.classList.add('flip');

    if(!hasFlippedCard){
         //first click
        hasFlippedCard =true;
        firstCard = target;
    } else {
        //second click
        hasFlippedCard= false;
        secondCard = target;

        //check for match
        checkForMatch();

    }
}

const checkForMatch = () =>{
    const isEqual = firstCard.dataset.animal === secondCard.dataset.animal;
    isEqual? disableCards(): unflipCards();
}

const disableCards = () =>{
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    inArray()

}

const unflipCards = () => {
    boardLocked = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1000)
}

const resetBoard = () =>{
    [hasFlippedCard, boardLocked] = [false, false]; //hasFlippedCard = boardLocked= false
    [firstCard, secondCard] = [null, null];
}

const resetGame = () =>{
    btnAgain.addEventListener('click',() =>{
        congrat.style.display = 'none';

        forReset();
    } );
}

const forReset = ()=> {
    cards.forEach(card =>{
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        const randomIndex = Math.floor(Math.random()*cards.length);
        card.style.order = randomIndex;
    })
}


function inArray(){
    let listOfContains= 0;
    cards.forEach(card =>{
        if(card.classList.contains('flip')){
            listOfContains++;
            if(listOfContains == 12){
                congrat.style.display = 'flex';
                resetGame();
            }else return;
        }
    })
}
document.addEventListener("DOMContentLoaded", forReset);


