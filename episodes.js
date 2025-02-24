fetch('episodes.json')
      .then(response => response.json())
      .then(data => {
        // Store the data in a variable for easy access
        const seasonsData = data;

        // Function to populate the image grid based on the selected season
        function populateImageGrid(seasonKey) {
          const season = seasonsData[seasonKey];
          const grid = document.getElementById('imageGrid');
          const seasonTitle = document.getElementById('seasonTitle');
          grid.innerHTML = '';  // Clear any existing images

          // Update the season title
          seasonTitle.textContent = season.title;

          let row;
          season.episodes.forEach((episode, index) => {
            // Create a new row every 5 episodes
            if (index % 5 === 0) {
              row = document.createElement('div');
              row.classList.add('row', 'justify-content-center', 'mb-3'); // Center row
              grid.appendChild(row);
            }

            // Create column for each image
            const col = document.createElement('div');
            col.classList.add('col-md-2', 'text-center', 'mx-auto'); // Centers each column

            // Create image element
            const img = document.createElement('img');
            img.src = episode.image;
            img.classList.add('episode-img');
            img.alt = episode.name;

            // Create caption
            const caption = document.createElement('p');
            caption.textContent = episode.name;

            // Append elements
            col.appendChild(img);
            col.appendChild(caption);
            row.appendChild(col);

            // Add event listener to open modal when an episode is clicked
            col.addEventListener('click', () => showEpisodeModal(episode));
          });

          grid.style.display = 'block';
        }

        // Function to show the episode modal with YouTube video
        function showEpisodeModal(episode) {
          const videoIframe = document.getElementById('episodeVideo');
          videoIframe.src = episode.videoUrl;

          // Show the modal
          const modal = new bootstrap.Modal(document.getElementById('episodeModal'));
          modal.show();
        }

        // Event listeners for dropdown items
        document.getElementById('season1').addEventListener('click', () => {
          populateImageGrid('season1');
        });

        document.getElementById('season2').addEventListener('click', () => {
          populateImageGrid('season2');
        });

        // Default load for Season 1
        populateImageGrid('season1');
      })
      .catch(err => console.error('Error loading JSON:', err));