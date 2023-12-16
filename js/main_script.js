const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let disableDeck = false;
let cardOne, cardTwo;

function flipCard({target: clickedCard}) {
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        if(!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;     
        let cardOneImage = cardOne.querySelector(".front-view img").src;
        let cardTwoImage = cardTwo.querySelector(".front-view img").src;
        matchCards(cardOneImage, cardTwoImage);
    }
}

function matchCards(firstImage, secondImage) {
    if(firstImage === secondImage) {
        matchedCard++;
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";

        return disableDeck = false;
    }

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

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;

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

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});