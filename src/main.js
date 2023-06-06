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
  // console.log(data['results']);
  return data["results"];
};

// HTML UPDATE
function displaymovies(movies) {
  const container = document.querySelector(".movie-wrap");
  container.innerHTML = movies.map((movie) => createMovieCards(movie)).join("");
  onClickCard();
}

// HTML list 만들기
function createMovieCards(movie) {
  let temp_html = `
        <div class="movie-card" id="${movie.id}">
            <div class="movie">
              <img
                src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                class="movie_poster"
              />
              <div class="movie_body">
                <h3 class="movie_title">${movie.original_title}</h3>
                <p>Rating: ${movie.vote_average}</p>
              </div>
              <div class="movie_footer">
                <p class="movie_overview">
                  ${movie.overview}
                </p>
              </div>
            </div>
          </div>
        `;
  return temp_html;
}

// 검색 기능 : 대소문자 관계없이, enter입력해도 검색 클릭과 동일한 기능
const findTitle = function (movies) {
  // input값 가져와서 title과 비교하기
  let search = document.getElementById("search-input").value.toLowerCase();

  // 버튼 클릭이나 엔터 키 입력되었을 때 실행
  if (search.length <= 0) {
    alert("검색어를 입력해주세요.");
  } else {
    const filtermovie = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(search)
    );

    if (filtermovie.length === 0) {
      alert("검색어에 해당하는 영화가 없습니다.");
    } else {
      displaymovies(filtermovie);
    }
  }
};

// 이벤트 관리
function setEventListeners(movies) {
  const form = document.querySelector(".search");
  // 검색창에 입력 수행 시
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    findTitle(movies);
  });
  // 카드 클릭 이벤트
  //onClickCard();
}

// main
loadmovies().then((movies) => {
  displaymovies(movies);
  setEventListeners(movies);
});

/* --------------------------------------------------------------------------------------- */

// 클릭 이벤트 상세페이지 이동하기
const onClickCard = function () {
  const cards = document.querySelectorAll(".movie-card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const id = this.getAttribute("id");
      window.location.href = `http://127.0.0.1:5500/sub.html?id=${id}`; // 상세 페이지로 이동
    });
  });
};
