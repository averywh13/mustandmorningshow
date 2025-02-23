document.addEventListener("DOMContentLoaded", () => {
    fetch("team.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(".containercard");
            container.innerHTML = ""; // Clear existing content

            data.forEach(person => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${person.image}" alt="${person.name}">
                    <div class="info">
                        <h3>${person.name}</h3>
                        <p>${person.role}</p>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});
