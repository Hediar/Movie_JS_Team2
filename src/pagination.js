document.addEventListener("DOMContentLoaded", () => {
  const moviesPerPage = 6; // Number of movies to show per page
  let currentPage = 1; // Current page number

  const showMoviesOnPage = (page, movies) => {
    const movieCards = document.querySelectorAll(".movie-card");

    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = page * moviesPerPage;

    movieCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  const changePage = (page, movies) => {
    currentPage = page;
    showMoviesOnPage(currentPage, movies);
  };

  // Example usage:
  const loadMoviesAndInitializePagination = async () => {
    const movies = await loadmovies();
    const movieCards = document.querySelectorAll(".movie-card");
    const totalPages = Math.ceil(movieCards.length / moviesPerPage);

    // Generate pagination buttons dynamically
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Clear previous buttons

    for (let page = 1; page <= totalPages; page++) {
      const button = document.createElement("button");
      button.classList.add("pagination-button");
      button.dataset.page = page;
      button.textContent = page;
      paginationContainer.appendChild(button);
    }

    showMoviesOnPage(currentPage, movies);

    // Event listener for pagination buttons
    const paginationButtons = document.querySelectorAll(".pagination-button");
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const page = parseInt(button.dataset.page);
        changePage(page, movies);
      });
    });
  };

  // Call the function to load movies and initialize pagination
  loadMoviesAndInitializePagination();
});
