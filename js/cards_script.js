document.addEventListener("DOMContentLoaded", function(){
    var imagePaths = ["image_1.png", "image_2.png", "image_3.png", "image_4.png", "image_5.png", "image_6.png"];
    var cardsContainer = document.getElementById("cards");
  
    for (var i = 0; i < imagePaths.length * 2; i++){
      var card = document.createElement("li");
      card.classList.add("card");
      
      var backView = document.createElement("div");
      backView.classList.add("view", "back-view");
      backView.innerHTML = '<img src="../images/background_image.png" alt="icon">';
      
      var frontView = document.createElement("div");
      frontView.classList.add("view", "front-view");
      var imageIndex = i % imagePaths.length;
      frontView.innerHTML = '<img src="../images/' + imagePaths[imageIndex] + '" alt="card-image">';
      
      card.appendChild(backView);
      card.appendChild(frontView);
      
      cardsContainer.appendChild(card);
    }
  });