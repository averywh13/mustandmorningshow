document.addEventListener('DOMContentLoaded', function() {
  // Define arrays for images (keeping this in JavaScript)
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150/ff0000',
    'https://via.placeholder.com/150/00ff00'
  ];

  // Load JSON file to change card text dynamically
  fetch('index.json')
    .then(response => response.json())
    .then(data => {
      const cards = data.cards;
      const cards2 = data.cards2;
      const cards3 = data.cards3;

      // Set card text from JSON
      document.getElementById('cardTitle1').innerText = cards[0].title;
      document.getElementById('cardText1').innerText = cards[0].text;
      document.getElementById('cardButton1').innerText = cards[0].buttonText;

      document.getElementById('cardTitle2').innerText = cards2[1].title;
      document.getElementById('cardText2').innerText = cards2[1].text;
      document.getElementById('cardButton2').innerText = cards2[1].buttonText;

      document.getElementById('cardTitle3').innerText = cards3[2].title;
      document.getElementById('cardText3').innerText = cards3[2].text;
      document.getElementById('cardButton3').innerText = cards3[2].buttonText;

      // Event listeners for next and prev buttons (for all three carousels)
      const carousels = ['carouselExample1', 'carouselExample2', 'carouselExample3'];
      carousels.forEach((carousel, index) => {
        const nextButton = document.querySelector(`#${carousel} .carousel-control-next`);
        const prevButton = document.querySelector(`#${carousel} .carousel-control-prev`);
        
        let currentIndex = 0;
        nextButton.addEventListener('click', function() {
          currentIndex = (currentIndex + 1) % images.length;
          document.getElementById(`cardTitle${index + 1}`).innerText = cards[currentIndex].title;
          document.getElementById(`cardText${index + 1}`).innerText = cards[currentIndex].text;
          document.getElementById(`cardButton${index + 1}`).innerText = cards[currentIndex].buttonText;
        });

        prevButton.addEventListener('click', function() {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          document.getElementById(`cardTitle${index + 1}`).innerText = cards[currentIndex].title;
          document.getElementById(`cardText${index + 1}`).innerText = cards[currentIndex].text;
          document.getElementById(`cardButton${index + 1}`).innerText = cards[currentIndex].buttonText;
        });
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});