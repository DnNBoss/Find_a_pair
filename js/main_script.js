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
    consecutiveGuessesTag,
    refreshButton,
    confirmWinForm,
    cancelWinForm;
        
let maxTime,
    amountOfCards,
    timeLeft,
    flips,
    matchedCard,
    disableDeck,
    isPlaying,
    cardOne,
    cardTwo,
    timer,
    rankLevel = 1,
    consecutiveGuesses,
    consecutiveGuessesStatus = true;

let easyLevel = document.getElementById("easy-container");
let mediumLevel = document.getElementById("medium-container");
let hardLevel = document.getElementById("hard-container");
let gameLabel = document.getElementById("game-label");
let winForm = document.getElementById("win-form");

function startEasyLevel() {
    easyLevel.style.order = 1;
    mediumLevel.style.order = 2;
    hardLevel.style.order = 2;
    easyLevel.style.display = "flex";
    mediumLevel.style.display = "none";
    hardLevel.style.display = "none";
    rankLevel = 1;
    consecutiveGuesses = 0;

    amountOfCards = 12;
       
    if (isStartEasyLevel) {
        isStartEasyLevel = false;
        isStartMediumLevel = true;
        isStartHardLevel = true;
        
        createCards("easy-container", amountOfCards);

        cards = document.querySelectorAll(".card"),
        timeTag = document.querySelector(".time b"),
        flipsTag = document.querySelector(".flips b"),
        consecutiveGuessesTag = document.querySelector(".consecutive-guesses b");
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
    rankLevel = 2;
    consecutiveGuesses = 0;
    
    amountOfCards = 20;

    if (isStartMediumLevel) {
        isStartEasyLevel = true;
        isStartMediumLevel = false;
        isStartHardLevel = true;     
        
        createCards("medium-container", amountOfCards);

        cards = document.querySelectorAll(".card"),
        timeTag = document.querySelector(".time b"),
        flipsTag = document.querySelector(".flips b"),
        consecutiveGuessesTag = document.querySelector(".consecutive-guesses b");
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

function startHardLevel() {
    easyLevel.style.order = 2;
    mediumLevel.style.order = 2;
    hardLevel.style.order = 1;
    easyLevel.style.display = "none";
    mediumLevel.style.display = "none";
    hardLevel.style.display = "flex";
    rankLevel = 3;
    consecutiveGuesses = 0;
    
    amountOfCards = 30;

    if (isStartHardLevel) {
        isStartEasyLevel = true;
        isStartMediumLevel = true;
        isStartHardLevel = false;
        
        createCards("hard-container", amountOfCards);

        cards = document.querySelectorAll(".card"),
        timeTag = document.querySelector(".time b"),
        flipsTag = document.querySelector(".flips b"),
        consecutiveGuessesTag = document.querySelector(".consecutive-guesses b");
        refreshButton = document.getElementById("refreshButton");

        maxTime = 120;

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
    consecutiveGuesses = 0;
    clearInterval(timer);

    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    gameLabel.style.display = "none";

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
        consecutiveGuesses = 0;
        consecutiveGuessesTag.innerText = consecutiveGuesses;
        handleMismatchedCards();
    }
}

function handleMatchedCards() {
    matchedCard++;
    consecutiveGuesses++;
    
    CheckConsecutive();

    if (matchedCard === (amountOfCards / 2) && timeLeft > 0) {
        showWinForm();
        clearInterval(timer);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
}

function CheckConsecutive() {
    if (consecutiveGuessesStatus) {
        if (consecutiveGuesses % 2 === 0) {
            timeLeft += 2 * rankLevel;
        }
        if (consecutiveGuesses % 3 === 0) {
            timeLeft += 3 * rankLevel;
        }
        consecutiveGuessesTag.innerText = consecutiveGuesses;
    }
}

function showWinForm() {
    winForm.style.display = "block";
    let score = Math.round((timeLeft / maxTime) * (flips + 1) * rankLevel * 100);
    document.getElementById("user-score").innerHTML = "Your score: " + score;
    confirmWinForm = document.getElementById("confirm-win-form");
    cancelWinForm = document.getElementById("cancel-win-form");

    confirmWinForm.addEventListener("click", confirmButton);
    cancelWinForm.addEventListener("click", cancelButton);
}
  
  function confirmButton() {
    let playerName = document.getElementById("name-input").value;
    if (playerName !== null) {
        let score = Math.round((timeLeft / maxTime) * (flips + 1) * rankLevel * 100);
        let player = { name: playerName, score: score };
        addPlayerToLeaderboard(player);
    }
    hideWinForm();
  }
  
  function cancelButton() {
    hideWinForm();
  }
  
  function hideWinForm() {
    document.getElementById("win-form").style.display = "none";
    document.getElementById("name-input").value = "";
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