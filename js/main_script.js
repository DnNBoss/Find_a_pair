document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    refreshButton = document.getElementById("refreshButton");

    let maxTime = 30;
    let timeLeft = maxTime;
    let flips = 0;
    let matchedCard = 0;
    let disableDeck = false;
    let isPlaying = false;
    let cardOne, cardTwo, timer;

    function initTimer() {
        if(timeLeft <= 0) {
            return clearInterval(timer);
        }

        timeLeft--;
        timeTag.innerText = timeLeft;
    }

    function flipCard({target: clickedCard}) {
        if(!isPlaying) {
            isPlaying = true;
            timer = setInterval(initTimer, 1000);
        }
        
        if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
            flips++;
            flipsTag.innerText = flips;
            clickedCard.classList.add("flip");

            if(!cardOne) {
                return cardOne = clickedCard;
            }

            cardTwo = clickedCard;
            disableDeck = true;     
            let cardOneImage = cardOne.querySelector(".front-view img").getAttribute("src");
            let cardTwoImage = cardTwo.querySelector(".front-view img").getAttribute("src");
            matchCards(cardOneImage, cardTwoImage);
        
        } else if (clickedCard === cardOne) {
            clickedCard.classList.remove("flip");
            cardOne = "";
        }
    }

    function matchCards(firstImage, secondImage) {
        if(firstImage === secondImage) {
            matchedCard++;
            
            if(matchedCard == 6 && timeLeft > 0) {
                return clearInterval(timer);
            }

            cardOne.removeEventListener("click", flipCard);
            cardTwo.removeEventListener("click", flipCard);
            cardOne = cardTwo = "";

            return disableDeck = false;
        } else {
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
    }

    function shuffleCard() {
        timeLeft = maxTime;
        flips = matchedCard = 0;
        cardOne = cardTwo = "";
        clearInterval(timer);
        timeTag.innerText = timeLeft;
        flipsTag.innerText = flips;
        disableDeck = isPlaying = false;

        let arrayOfNumbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
        arrayOfNumbers.sort(() => Math.random() > 0.5 ? 1 : -1);

        cards.forEach((card, index) => {
            card.classList.remove("flip");
            let imageTag = card.querySelector(".front-view img");

            setTimeout(() => {
                imageTag.src = `../images/image_${arrayOfNumbers[index]}.png`;
            }, 500);

            card.addEventListener("click", flipCard);
        });
    }

    shuffleCard();

    refreshButton.addEventListener("click", shuffleCard);

    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
});