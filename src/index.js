document.addEventListener('DOMContentLoaded', function() {
  // Base URL
  var baseURL = 'http://localhost:3000';
  var ticketCount = 0; // Variable to store the number of available tickets

  // Function to fetch and display movie details
  function fetchMovieDetails(filmId) {
    fetch(baseURL + '/films/' + filmId)
      .then(function(response) {
        return response.json();
      })
      .then(function(movieData) {
        // Update movie details 
        document.getElementById('poster').src = movieData.poster;
        document.getElementById('title').innerText = movieData.title;
        document.getElementById('runtime').innerText = movieData.runtime + ' minutes';
        document.getElementById('film-info').innerText = movieData.description;
        document.getElementById('showtime').innerText = movieData.showtime;
        ticketCount = movieData.capacity - movieData.tickets_sold; 
        updateTicketCount(); 
      })
      .catch(function(error) {
        console.error('Error fetching movie details:', error);
      });
  }

  // Function to update the ticket count
  function updateTicketCount() {
    document.getElementById('ticket-num').innerText = ticketCount;
  }

  // Function to handle buying tickets
  function buyTicket() {
    if (ticketCount > 0) {
      ticketCount--; 
      updateTicketCount();
    } else {
      console.log('No more tickets available.'); 
    }
  }

  // Function to fetch all movies
  function fetchAllMovies() {
    fetch(baseURL + '/films')
      .then(function(response) {
        return response.json();
      })
      .then(function(movies) {
        // Fill the film menu
        var filmsList = document.getElementById('films');
        filmsList.innerHTML = ''; // Clear existing list

        movies.forEach(function(movie) {
          var filmItem = document.createElement('li');
          filmItem.classList.add('film', 'item');
          filmItem.textContent = movie.title;
          filmItem.addEventListener('click', function() {
            fetchMovieDetails(movie.id);
          }); // Fetch movie details on click
          filmsList.appendChild(filmItem);
        });
      })
      .catch(function(error) {
        console.error('Error fetching movies:', error);
      });
  }

  // Add event listener to the "Buy Ticket" button
  document.getElementById('buy-ticket').addEventListener('click', buyTicket);

  // Initial setup: Fetch all movies and display details of the first movie
  fetchAllMovies();
  fetchMovieDetails(1); // Display details of the first movie by default
});
