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
        <section id="movie-info" id = "${movie.id}">
            <img
            src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
            alt="영화이미지"
            class="movie-img"
            />
            <div class="movie-info">
                <h4 class="movie-rate">⭐ ${movie.vote_average}</h4>
                <h2 class="movie-title">${movie.original_title}</h2>
                <h3 class="movie-desc">
                ${movie.overview}
                </h3>
            </div>
        </section>
      `;
  return temp_html;
}

// 영화 정보를 가져올 때 id에 해당하는 영화만 표시
function getMovieById(movies, id) {
  return movies.find((movie) => movie.id.toString() === id);
}

// 영화 카드를 불러오고 id에 해당하는 카드만 표시
function displayCardById(movies, id) {
  const container = document.querySelector("#movie-info");
  const movie = getMovieById(movies, id);
  if (movie) {
    const cardHTML = createMovieCard(movie);
    container.innerHTML = cardHTML;
  } else {
    container.innerHTML = "해당 id에 해당하는 영화를 찾을 수 없습니다.";
  }
}

// sub
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  loadmovies().then((movies) => {
    displayCardById(movies, id);
  });
});

// ----------------------------------------------------------------------------

// 리뷰 저장하기
const saveComment = () => {
  const textarea = document.getElementById("write-comment");
  const password = document.getElementById("comment-pw1");
  const urlParams = new URLSearchParams(window.location.search);

  const comment = textarea.value;
  const id = urlParams.get("id"); // 카드의 id 값 가져오기
  const pw = password.value;

  const commentData = {
    id: id,
    password: pw,
    comment: comment,
  };

  // 이전에 저장된 댓글 가져오기
  let comments = localStorage.getItem("Comments");
  comments = comments ? JSON.parse(comments) : [];

  comments.push(commentData); // 새로운 댓글 추가

  localStorage.setItem("Comments", JSON.stringify(comments)); // 업데이트된 댓글 저장

  alert("리뷰가 저장되었습니다.");

  textarea.value = ""; // 입력값 초기화
  password.value = "";
};

// 저장 버튼 클릭 시 이벤트 처리
window.onload = function () {
  const saveButton = document.getElementById("submit-btn");
  saveButton.addEventListener("click", saveComment);
};
