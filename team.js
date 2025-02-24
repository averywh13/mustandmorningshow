document.addEventListener("DOMContentLoaded", () => {
    fetch("team.json")
        .then(response => response.json())
        .then(data => {
            const castContainer = document.querySelector(".cast-container");
            const productionContainer = document.querySelector(".production-container");

            castContainer.innerHTML = "";
            productionContainer.innerHTML = "";

            function createCard(person) {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${person.image}" alt="${person.name}">
                    <div class="info">
                        <h3>${person.name}</h3>
                        <p>${person.role}</p>
                    </div>
                `;
                return card;
            }

            data.cast.forEach(person => castContainer.appendChild(createCard(person)));
            data.production.forEach(person => productionContainer.appendChild(createCard(person)));
        })
        .catch(error => console.error("Error loading JSON:", error));
});
