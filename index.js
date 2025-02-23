document.addEventListener("DOMContentLoaded", function () {
  fetch("index.json")
      .then(response => response.json())
      .then(data => {
          const carouselInner = document.querySelector(".carousel-inner");
          const cardTitle = document.getElementById("cardTitle");
          const cardText = document.getElementById("cardText");

          carouselInner.innerHTML = ""; // Clear existing content

          data.forEach((item, index) => {
              const isActive = index === 0 ? "active" : "";
              carouselInner.innerHTML += `
                  <div class="carousel-item ${isActive}" data-title="${item.title}" data-text="${item.text}">
                      <img src="${item.image}" class="d-block caroimage" alt="Image ${index + 1}">
                  </div>
              `;
          });

          // Set initial title and text
          cardTitle.textContent = data[0].title;
          cardText.textContent = data[0].text;

          // Update title and text on carousel slide change
          document.getElementById("carouselExample").addEventListener("slid.bs.carousel", function () {
              const activeItem = document.querySelector(".carousel-item.active");
              cardTitle.textContent = activeItem.getAttribute("data-title");
              cardText.textContent = activeItem.getAttribute("data-text");
          });
      })
      .catch(error => console.error("Error loading JSON:", error));
});