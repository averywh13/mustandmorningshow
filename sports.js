document.addEventListener('DOMContentLoaded', function() {
    fetch('sports.json')
      .then(response => response.json())
      .then(data => {
        window.sportsData = data.seasons; // Store data globally
  
        function updateSportInfo(season) {
          if (sportsData[season]) {
              const seasonData = sportsData[season];
      
              // Clear existing sport buttons
              const sportsList = document.getElementById('sports-list');
              sportsList.innerHTML = "";
      
              seasonData.sports.forEach((sport, index) => {
                  const sportButton = document.createElement('button');
                  sportButton.classList.add('btn', 'btn-secondary', 'butn');
      
                  // Create an image element
                  const sportImage = document.createElement('img');
                  sportImage.src = sport.image; // Assuming each sport object has an "image" property
                  sportImage.alt = sport.name;
                  sportImage.style.width = "50px"; // Adjust size as needed
                  sportImage.style.height = "50px";
      
                  // Append the image to the button
                  sportButton.appendChild(sportImage);
      
                  // Set button click event
                  sportButton.onclick = () => displaySportCards(season, index);
                  
                  sportsList.appendChild(sportButton);
              });
      
              // Clear sport details when changing seasons
              document.getElementById('cards-container').style.display = "none"; // Hide cards initially
          }
      }
      
  
        function displaySportCards(season, sportIndex) {
          const sport = sportsData[season].sports[sportIndex];
  
          // Display the cards container
          const cardsContainer = document.getElementById('cards-container');
          cardsContainer.style.display = "flex";
  
          // Clear previous cards
          cardsContainer.innerHTML = "";
  
          // Loop through each card and display its unique information
          sport.cards.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('col-12', 'col-md-4', 'mb-4');
  
            cardDiv.innerHTML = `
              <div class="card">
                <img src="${card.image}" class="card-img-top" alt="Card image">
                <div class="card-body">
                  <h5 class="card-title">${card.title}</h5>
                  <p class="card-text">${card.text}</p>
                </div>
              </div>
            `;
  
            cardsContainer.appendChild(cardDiv);
          });
        }
  
        // Assign functions to buttons
        window.fallSport = () => updateSportInfo('fall');
        window.winterSport = () => updateSportInfo('winter');
        window.springSport = () => updateSportInfo('spring');
      })
      .catch(error => console.error('Error loading JSON:', error));
  });
  