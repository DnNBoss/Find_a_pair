import { createCards } from "./cards_script.js";
import { addPlayerToLeaderboard, updateLeaderboard } from "./leaderboard_script.js";

document.getElementById("startEasyLevel").addEventListener("click", startEasyLevel);
document.getElementById("startMediumLevel").addEventListener("click", startMediumLevel);
document.getElementById("startHardLevel").addEventListener("click", startHardLevel);

let isStartEasyLevel = true;
let isStartMediumLevel = true;
let isStartHardLevel = true;

let cards,
    timeTag,
    flipsTag,
    refreshButton;
        
let maxTime,
    amountOfCards,
    timeLeft,
    flips,
    matchedCard,
    disableDeck,
    isPlaying,
    cardOne,
    cardTwo,
    timer;

let easyLevel = document.getElementById("easy-container");
let mediumLevel = document.getElementById("medium-container");
let hardLevel = document.getElementById("hard-container");

function startEasyLevel() {
    easyLevel.style.order = 1;
    mediumLevel.style.order = 2;
    hardLevel.style.order = 2;
    easyLevel.style.display = "flex";
    mediumLevel.style.display = "none";
    hardLevel.style.display = "none";

    amountOfCards = 12;

    if (isStartEasyLevel) {
        isStartEasyLevel = false;
        isStartMediumLevel = true;
        isStartHardLevel = true;
        
        createCards("easy-container", amountOfCards);

        cards = document.querySelectorAll(".card"),
        timeTag = document.querySelector(".time b"),
        flipsTag = document.querySelector(".flips b"),
        refreshButton = document.getElementById("refreshButton");

        maxTime = 30;

        initGame();
        
        refreshButton.addEventListener("click", initGame);
        
        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });
    }
    else {
        initGame();
    }
}

function startMediumLevel() {
    easyLevel.style.order = 2;
    mediumLevel.style.order = 1;
    hardLevel.style.order = 2;
    easyLevel.style.display = "none";
    mediumLevel.style.display = "flex";
    hardLevel.style.display = "none";
    
    amountOfCards = 20;

    if (isStartMediumLevel) {
        isStartEasyLevel = true;
        isStartMediumLevel = false;
        isStartHardLevel = true;     
        
        createCards("medium-container", amountOfCards);

        cards = document.querySelectorAll(".card"),
        timeTag = document.querySelector(".time b"),
        flipsTag = document.querySelector(".flips b"),
        refreshButton = document.getElementById("refreshButton");

        maxTime = 45;

        initGame();
        
        refreshButton.addEventListener("click", initGame);
        
        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });
    }
    else {
        initGame();
    }
}

function startHardLevel() {
    easyLevel.style.order = 2;
    mediumLevel.style.order = 2;
    hardLevel.style.order = 1;
    easyLevel.style.display = "none";
    mediumLevel.style.display = "none";
    hardLevel.style.display = "flex";
    
    amountOfCards = 30;

    if (isStartHardLevel) {
        isStartEasyLevel = true;
        isStartMediumLevel = true;
        isStartHardLevel = false;
        
        createCards("hard-container", amountOfCards);

        cards = document.querySelectorAll(".card"),
        timeTag = document.querySelector(".time b"),
        flipsTag = document.querySelector(".flips b"),
        refreshButton = document.getElementById("refreshButton");

        maxTime = 60;

        initGame();
        
        refreshButton.addEventListener("click", initGame);
        
        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });
    }
    else {
        initGame();
    }
}
      
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
    let arrayOfNumbers = createArray();
    arrayOfNumbers.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
    resetCard(card, arrayOfNumbers[index]);
    });
}

function createArray() {
    let result = [];
    for (let i = 1; i <= amountOfCards; i++) {
      result.push(i % (amountOfCards / 2) || (amountOfCards / 2));
    }
    return result;
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
    let score = 30 - timeLeft;
    let player = { name: 'n_' + flips, score: score };
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