import { createCards } from "./cards_script.js";
import { addPlayerToLeaderboard, updateLeaderboard } from "./leaderboard_script.js";
    
createCards();

const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    refreshButton = document.getElementById("refreshButton");

let maxTime = 30,
    timeLeft,
    flips,
    matchedCard,
    disableDeck,
    isPlaying,
    cardOne,
    cardTwo,
    timer;

function initGame() {
    timeLeft = maxTime;
    flips = 0;
    matchedCard = 0;
    disableDeck = false;
    isPlaying = false;
    cardOne = "";
    cardTwo = "";
    clearInterval(timer);

    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;

    shuffleCards();
    updateLeaderboard();
}

function shuffleCards() {
    let arrayOfNumbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arrayOfNumbers.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
    resetCard(card, arrayOfNumbers[index]);
    });
}

function resetCard(card, number) {
    card.classList.remove("flip", "shake");
    let imageTag = card.querySelector(".front-view img");
    
    setTimeout(() => {
    imageTag.src = `../images/image_${number}.png`;
    }, 500);

    card.addEventListener("click", flipCard);
}

function flipCard({target: clickedCard}) {
    if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
    }

    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    handleCardClick(clickedCard);
    } else if (clickedCard === cardOne) {
    clickedCard.classList.remove("flip");
    cardOne = "";
    }
}

function initTimer() {
    if (timeLeft <= 0) {
    return clearInterval(timer);
    }

    timeLeft--;
    timeTag.innerText = timeLeft;
}

function handleCardClick(clickedCard) {
    flips++;
    flipsTag.innerText = flips;
    clickedCard.classList.add("flip");

    if (!cardOne) {
    cardOne = clickedCard;
    return;
    }

    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImage = cardOne.querySelector(".front-view img").getAttribute("src");
    let cardTwoImage = cardTwo.querySelector(".front-view img").getAttribute("src");
    matchCards(cardOneImage, cardTwoImage);
}

function matchCards(firstImage, secondImage) {
    if (firstImage === secondImage) {
    handleMatchedCards();
    } else {
    handleMismatchedCards();
    }
}

function handleMatchedCards() {
    matchedCard++;

    if (matchedCard === 6 && timeLeft > 0) {
    var score = 30 - timeLeft;
    var player = { name: 'n_' + flips, score: score };
    addPlayerToLeaderboard(player);
    clearInterval(timer);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
}

function handleMismatchedCards() {
    setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
    }, 1200);
}

initGame();

refreshButton.addEventListener("click", initGame);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});