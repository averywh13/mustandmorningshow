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

          season.episodes.forEach((episode) => {
            const col = document.createElement('div');
            col.classList.add('col-md-2', 'mb-4');
            const img = document.createElement('img');
            img.src = episode.image;
            img.classList.add('img-fluid');
            img.alt = episode.name;
            const caption = document.createElement('p');
            caption.textContent = episode.name;
            col.appendChild(img);
            col.appendChild(caption);
            // Add event listener to open modal when an episode is clicked
            col.addEventListener('click', () => showEpisodeModal(episode));
            grid.appendChild(col);
          });

          grid.style.display = 'flex';
          grid.style.flexWrap = 'wrap';
        }

        // Function to show the episode modal with YouTube video
        function showEpisodeModal(episode) {
          const videoContainer = document.getElementById('videoContainer');
          const videoIframe = document.getElementById('episodeVideo');
          // Set the video iframe src to the video URL
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