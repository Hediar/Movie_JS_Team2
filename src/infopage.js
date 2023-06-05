// movies api
const loadmovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmU0ZmQ2OTExMjk4YTk1MGI3ODhlNjk0ODVkZjZmZiIsInN1YiI6IjY0NzU4M2Y1Njc0M2ZhMDExOTdhNzA1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.exgR1edP5kPFmM8OjkVJfy8DoRlmQMJV4bQ_Msz6pBc",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await response.json();
  return data["results"];
};

// 해당 id에 해당하는 HTML 만들기
function createMovieCard(movie) {
  const temp_html = `
      <div class="movieInfoCard" id="${movie.id}">
        <div class="movieCard">
          <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" class="moviePoster" />
          <div class="movieBody">
            <h3 class="movieTitle">${movie.original_title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p class="movieOverview">${movie.overview}</p>
          </div>
        </div>
      </div>
    `;
  return temp_html;
}

// 영화 정보를 가져올 때 id에 해당하는 영화만 표시
function getMovieById(movies, id) {
  return movies.find((movie) => movie.id.toString() === id);
}

// 영화 카드를 불러오고 id에 해당하는 카드만 표시
function displayCardById(movies, id) {
  const container = document.querySelector(".movieWrap");
  const movie = getMovieById(movies, id);
  if (movie) {
    const cardHTML = createMovieCard(movie);
    container.innerHTML = cardHTML;
  } else {
    container.innerHTML = "해당 id에 해당하는 영화를 찾을 수 없습니다.";
  }
}

// info
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  loadmovies().then((movies) => {
    displayCardById(movies, id);
  });
});
