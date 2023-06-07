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
  //console.log(data['results']);
  return data["results"];
};

// HTML UPDATE
function displaymovies(movies) {
  const container = document.querySelector(".movie-wrap");
  container.innerHTML = movies.map((movie) => createMovieCards(movie)).join("");
  onClickCard(movies);
}

// 영화 데이터 로컬에 저장
const movieData = function (movies) {
  if (localStorage === null) {
    movies.forEach((movie) => {
      const mData = JSON.stringify({ movie });
      //console.log(mData);
      localStorage.setItem(movie.id, mData);
    });
  }
};

// HTML list 만들기
function createMovieCards(movie) {
  let temp_html = `
  <div class="movie-card" id="${movie.id}">
  <img
    src="https://image.tmdb.org/t/p/w400/${movie.poster_path}"
    class="movie_poster"
  />
    <h3 class="movie_title">${movie.title}</h3>
    <p class="movie_overview">
      ${movie.overview}
    </p>
    <p class="movie_rate">${movie.vote_average}⭐(${movie.vote_count})</p>
</div>
        `;
  return temp_html;
}

// 클릭 이벤트 id에 알맞는 페이지로 이동하기
const onClickCard = function (movies) {
  const cards = document.querySelectorAll(".movie-card");
  let id_d;
  let detail_id;
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      id_d = this.getAttribute("id");
      //alert('해당 영화의 id는 ' + id_d + '입니다.');

      detail_id = movies.find((movie) => movie.id.toString() === id_d);
      window.location.href = `http://127.0.0.1:5500/detail.html?id=${id_d}`; // 페이지 이동
      //console.log(detail_id);

      /* 해당 id에 맞는 객체 배열을 저장한다. 
      같은 id가 없을 경우에만 저장한다.*/
    });
  });
};

// 검색 기능 : 대소문자 관계없이, enter입력해도 검색 클릭과 동일한 기능
const findTitle = function (movies) {
  // input값 가져와서 title과 비교하기
  let search = document.getElementById("search-input").value.toLowerCase();

  // 버튼 클릭이나 엔터 키 입력되었을 때 실행
  // 검색 유효성 검사
  if (search.length <= 0) {
    alert("검색어를 입력해주세요.");
  } else {
    const filtermovie = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search)
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
}

// main
loadmovies().then((movies) => {
  movieData(movies);
  displaymovies(movies);
  setEventListeners(movies);
  orderByTitle(movies);
  orderByRate(movies);
  orderByVote(movies);
});
// 알파벳 순서에 따른 정렬 함수
function orderByTitle(movies) {
  const element = document.getElementById("filter-title");
  element.addEventListener("click", function () {
    const lastChar = element.textContent.charAt(element.textContent.length - 1);
    movies.sort(function (a, b) {
      if (a.title && b.title) {
        return lastChar === "▼"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    displaymovies(movies);
    changeArrow(element);
  });
}

// 평점에 따른 정렬 함수
function orderByRate(movies) {
  const element = document.getElementById("filter-rate");
  element.addEventListener("click", function () {
    const lastChar = element.textContent.charAt(element.textContent.length - 1);
    movies.sort(function (a, b) {
      return lastChar === "▼"
        ? a.vote_average - b.vote_average
        : b.vote_average - a.vote_average;
    });
    displaymovies(movies);
    changeArrow(element);
  });
}
// 투표수에 따른 정렬 함수
function orderByVote(movies) {
  const element = document.getElementById("filter-vote");
  element.addEventListener("click", function () {
    const lastChar = element.textContent.charAt(element.textContent.length - 1);
    movies.sort(function (a, b) {
      return lastChar === "▼"
        ? a.vote_count - b.vote_count
        : b.vote_count - a.vote_count;
    });
    displaymovies(movies);
    changeArrow(element);
  });
}

function changeArrow(element) {
  const lastChar = element.textContent.charAt(element.textContent.length - 1);
  const newStr =
    lastChar === "▼"
      ? element.textContent.slice(0, -1) + "▲"
      : element.textContent.slice(0, -1) + "▼";
  element.textContent = newStr;
}
