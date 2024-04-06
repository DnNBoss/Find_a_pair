export function createCards(containerId, amountOfCards) {  
    removeCards(containerId);
    
    let imagePath =  ["image_1.png", "image_2.png", "image_3.png", "image_4.png", "image_5.png",
                        "image_6.png", "image_7.png", "image_8.png", "image_9.png", "image_10.png",
                        "image_11.png", "image_12.png", "image_13.png", "image_14.png", "image_15.png"];

    let createdCards = [];

    for (let i = 0; i < amountOfCards; i++) {
        let imageIndex = i % (amountOfCards / 2);
        let imageName = imagePath[imageIndex];
        let card = createNewCard(imageName);
        createdCards.push(card);
    }
    addCardsToContainer(createdCards, containerId);
}

function removeCards(containerId) {
    let cardsContainer = document.getElementById(containerId);
    cardsContainer.innerHTML = "";
    let cardElements = document.querySelectorAll(".card");
    if (cardElements.length > 0) {
        cardElements.forEach(function(cardElement) {
            cardElement.remove();
        });
    }
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