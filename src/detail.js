/* detail HTML UPDATE & */
const displayDetail = (data) => {
  const containerDetail = document.querySelector("#movie-info");
  //console.log(movie);
  let movieDetail = createMovieDetail(data.movie);
  //console.log(movieDetail);
  containerDetail.innerHTML = movieDetail;
};

/*detail 페이지를 구성할 HTML*/

const createMovieDetail = (movie) => {
  //console.log(movie.poster_path);
  let detail_html = `
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
      `;
  // img 백그라운드를 이미지 id에 맞춰서 css 변경하는 방법... 알고 싶어요

  return detail_html;
};

// /* 리뷰 */
// const posting = () => {};

// /* 메인 페이지로 돌아가는 클릭 이벤트 */

// /* 생각해본 데이터 형태
// {
//   "id": 영화 id{
//     "movie": [
//     {
//       영화 객체
//     }
//   ],
//   "reviews": [
//     { 첫번째 리뷰 },
//     { 두번째 리뷰 }, ...
//   ]
//   }
// }
// */

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // 영화 id 출력됨
  let movie = JSON.parse(localStorage.getItem(id));
  //console.log(id);
  //console.log(movie);
  displayDetail(movie);
});

// ----------------------------------------------------------------------------------
/* 리뷰 */
const posting = () => {
  const textarea = document.getElementById("write-comment");
  const password = document.getElementById("comment-pw1");
  const writer = document.getElementById("comment-name");
  const urlParams = new URLSearchParams(window.location.search);

  const review = textarea.value;
  const name = writer.value;
  const pw = password.value;
  const id = urlParams.get("id");

  let movie = localStorage.getItem(id);
  movie = movie ? JSON.parse(movie) : {};

  // 기존 댓글이 있을 경우에는 배열로 저장
  if (movie.comments) {
    movie.comments.push({ review, name, pw });
  } else {
    movie.comments = [{ review, name, pw }];
  }
  localStorage.setItem(id, JSON.stringify(movie));

  alert("리뷰가 저장되었습니다.");

  textarea.value = ""; // 입력값 초기화
  password.value = "";
  writer.value = "";
};

// 저장 버튼 클릭 시 이벤트 처리
window.onload = function () {
  const saveButton = document.getElementById("submit-btn");
  saveButton.addEventListener("click", posting);
};

// 1. 리뷰 저장
//     1. id를 key으로 저장되어 있던 데이터에 review 배열 추가
//        객체 불러오기-> 객체에 value 추가 -> 객체 저장

//         1. 기존에 배열이 있을 시 배열에 객체 추가, 기존 배열 없을 시 배열 추가
//         2. 입력값 없을 시 유효성 검사
//         3. 저장 후 input 값 없애기
// 2. 리뷰 불러오기
//     1. card id 와 비교하여 일치하는 key 내의 review 배열 내의 객체를 listing
