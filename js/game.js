const characters = [
    'um',
    'elefante',
    'tigre',
    'leao',
    'macaco',
    
    
];

let timer
let currentTime
let gameEnded = false
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    console.log(disableCards.length)

    if (disableCards.length === 10){
        clearInterval(setInterval);
        alert('O jogo acabou')
        gameEnded = true
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter){
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame()

    } else {
        
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');  
            
            firstCard = '';
            secondCard = '';

        }, 500);
    } 
    

}   

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}


const createCard = (character) => {
    
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    front.style.backgroundImage = `url('../images/${character}.png')`;
    
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
    
    return card;
}

const loadGame = () => {
    const grid = document.getElementById('grid');
    
    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {    
        const card = createCard(character);
        grid.appendChild(card)
    });
}

const startTimer = () => {
    setInterval(() => {
         timer = document.querySelector('.timer');
         
         currentTime = +timer.innerHTML;
         timer.innerHTML = currentTime + 1;
         if(gameEnded === true){
            timer.innerHTML = currentTime
         }
     }, 1000);
 }

window.onload = () => { 
    const spanPlayer = document.querySelector('.player');
    spanPlayer.innerHTML = localStorage.getItem('player');
    
}

document.addEventListener('DOMContentLoaded',() => loadGame());
document.addEventListener('DOMContentLoaded',() => startTimer());

