let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://jsonkeeper.com/b/VBLS' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
    $('.details').hide();
    startTimer();
    $('.moreIndicator').on('click', () => {
      $('.moreIndicator').toggleClass('rot90');
      $('.details').slideToggle();
    })
    $('#nextPhoto').on('click', () => {
      showNextPhoto();
    })
    $('#prevPhoto').on('click', () => {
      showPrevPhoto();
    })
    fetchJSON()
  })

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
    function fetchJSON() {
        $.ajax({
          type: 'GET',
          url: mUrl,
          success: function (data) {
            mImages = data.images;
            swapPhoto();
          },
          error: function () {
            console.log('Connection error.');
          }
        });
      }
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
    function swapPhoto() {
        let theData = mImages[mCurrentIndex];
        $('#photo').attr('src', theData.imgPath);
        $('#name').text(`Name: ${theData.name}`);
        $('#description').text(`Description: ${theData.description}`);
        $('#claim').text(`Claimed By: ${theData.claim}`);
      }
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
    function showNextPhoto() {
        mCurrentIndex++;
        if (mCurrentIndex === 10) {
          mCurrentIndex = 0;
        }
        swapPhoto()
        console.log(mCurrentIndex);
        resetTimer();
      }
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
    function showPrevPhoto() {
        mCurrentIndex--;
        if (mCurrentIndex === -1) {
          mCurrentIndex = 9;
        }
        swapPhoto()
        console.log(mCurrentIndex);
        resetTimer();
      }
}

// Starter code for the timer function
function startTimer () {
    let interval;
    function startTimer() {
      interval = setInterval(showNextPhoto, mWaitTime);
    }
    function resetTimer() {
      clearInterval(interval);
      startTimer()
    }
}