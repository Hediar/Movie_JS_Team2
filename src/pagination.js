import * as load from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  const moviesPerPage = 6; // Number of movies to show per page
  let currentPage = 1; // Current page number

  const showMoviesOnPage = (page) => {
    const movieCards = document.querySelectorAll(".movie-card");

    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = page * moviesPerPage;

    movieCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };

  const changePage = (page) => {
    currentPage = page;
    showMoviesOnPage(currentPage);
    highlightCurrentPage(currentPage); // Call the highlightCurrentPage function
  };

  const highlightCurrentPage = (currentPage) => {
    const paginationButtons = document.querySelectorAll(".pagination-page");
    paginationButtons.forEach((button) => {
      const page = parseInt(button.dataset.page);
      if (page === currentPage) {
        button.classList.add("current-page"); // Add a CSS class to change the color
      } else {
        button.classList.remove("current-page"); // Remove the CSS class if it was added previously
      }
    });
  };

  const loadMoviesAndInitializePagination = async () => {
    const movies = await load.loadmovies();
    const movieCards = document.querySelectorAll(".movie-card");
    const totalPages = Math.ceil(movieCards.length / moviesPerPage);

    // Generate pagination buttons dynamically
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Clear existing buttons

    for (let page = 1; page <= totalPages; page++) {
      const button = document.createElement("button");
      button.classList.add("pagination-page");
      button.dataset.page = page;
      button.textContent = page;
      paginationContainer.appendChild(button);
    }

    // Example usage:
    showMoviesOnPage(currentPage);
    highlightCurrentPage(currentPage);

    // Event listener for pagination buttons
    const paginationButtons = document.querySelectorAll(".pagination-page");
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const page = parseInt(button.dataset.page);
        changePage(page);
      });
    });

    // Create left arrow button
    const leftArrowButton = document.createElement("button");
    leftArrowButton.classList.add("arrow-button");
    leftArrowButton.id = "left-arrow";
    leftArrowButton.innerHTML = "←"; // Left arrow unicode
    paginationContainer.prepend(leftArrowButton);

    // Create right arrow button
    const rightArrowButton = document.createElement("button");
    rightArrowButton.classList.add("arrow-button");
    rightArrowButton.id = "right-arrow";
    rightArrowButton.innerHTML = "→"; // Right arrow unicode
    paginationContainer.appendChild(rightArrowButton);

    // Event listener for left arrow button
    leftArrowButton.addEventListener("click", () => {
      if (currentPage > 1) {
        changePage(currentPage - 1);
      }
    });

    // Event listener for right arrow button
    rightArrowButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        changePage(currentPage + 1);
      }
    });
  };

  // Call the function to load movies and initialize pagination
  loadMoviesAndInitializePagination();
});