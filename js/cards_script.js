export function createCards() {
    let imagePath = ["image_1.png", "image_2.png", "image_3.png", "image_4.png", "image_5.png", "image_6.png"];
    let amountOfPairs = 2;
    let amountOfCards = imagePath.length * amountOfPairs;
    let createdCards = [];

    for (let i = 0; i < amountOfCards; i++) {
        let imageIndex = i % imagePath.length;
        let imageName = imagePath[imageIndex];
        let card = createNewCard(imageName);
        createdCards.push(card);
    }
    addCardsToContainer(createdCards, "cards");
}

function createNewCard(imageName) {
    let card = document.createElement("li");
    card.classList.add("card");

    let backView = createCardView("back-view", '<img src="../images/background_image.png" alt="icon">');
    let frontView = createCardView("front-view", '<img src="../images/' + imageName + '" alt="card-image">');

    card.appendChild(backView);
    card.appendChild(frontView);

    return card;
}

function createCardView(viewClass, content) {
    let view = document.createElement("div");
    view.classList.add("view", viewClass);
    view.innerHTML = content;
    return view;
}

function addCardsToContainer(cards, containerId) {
    let cardsContainer = document.getElementById(containerId);
    cards.forEach(function (card) {
        cardsContainer.appendChild(card);
    });
}