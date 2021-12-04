const cards = document.querySelectorAll('.card');
const jogadasScore = document.querySelector('.jogadas')
const errosScore = document.querySelector('.erros')
const btnReiniciar = document.querySelector('.btn-reiniciar')
const modal = document.querySelector('.wrapper-modal')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let jogadas = 0;
let acertos = 0;
let erros = 0;

modal.style.display = 'none';

const setModal = (display, delay) => {
    setTimeout(() => modal.style.display = display, delay)
}
const setMatch = (card, value) => card.dataset.match = value;

const setFlip = (card, value) => value ? card.classList.add('flip') : card.classList.remove('flip');

const shuffle = () => {
    cards.forEach(card => (card.style.order = Math.floor(Math.random() * 12)))
};

const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

const disableCards = () => {
    setMatch(firstCard, true);
    setMatch(secondCard, true);
    resetBoard();
}

const unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

const checkForMatch = () => {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        acertos++;
        disableCards();
        (acertos === 6) && winner();
        return;
    }
    erros++;
    unflipCards();
}

const winner = () => {
    setModal('flex', 1200)
    jogadasScore.innerText = `Jogadas: ${jogadas}`;
    errosScore.innerText = `Erros: ${erros}`;
}

const resetGame = () => {
    setModal('none', 0)
    cards.forEach((card) => {
        card.classList.remove('flip')
        card.dataset.match = false
    });
    jogadas = 0;
    acertos = 0;
    erros = 0;
    resetBoard();
    shuffle();
}

function flipCard() {
    if ((lockBoard) ||
        (this.dataset.match === 'true') ||
        (this === firstCard)
    ) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    jogadas++;
    checkForMatch();
}

cards.forEach((card) => card.addEventListener('click', flipCard));
btnReiniciar.addEventListener('click', resetGame);
shuffle();