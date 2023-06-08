/* detail HTML UPDATE & */
const displayDetail = (data) => {
  const containerDetail = document.querySelector("#movie-info");
  //console.log(movie);
  let movieDetail = createMovieDetail(data.movie);
  //console.log(movieDetail);
  containerDetail.innerHTML = movieDetail;
  changeheader(data.movie);
};

function changeheader(movie) {
  let bg = document.getElementById("background");
  let headerTitle = document.getElementById("header-title");
  // console.log(movie);
  // console.log(movie.backdrop_path);
  let backdrop = movie.backdrop_path;
  let title = movie.title;
  // console.log(backdrop);
  bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 25%), rgba(0, 0, 0, 100%)),url(https://image.tmdb.org/t/p/original/${backdrop}`;
  headerTitle.innerText = `${title}`;
}
/*detail 페이지를 구성할 HTML*/

const createMovieDetail = (movie) => {
  //console.log(movie.poster_path);
  // movie.orginal_title -> movie.title
  let detail_html = `
        <img
        src="https://image.tmdb.org/t/p/w400/${movie.poster_path}"
        alt="영화이미지"
        class="movie-img"
    />
    <div class="movie-info">
        <h4 class="movie-rate">⭐ ${movie.vote_average}</h4>
        <h2 class="movie-title">${movie.title}</h2>
        <h3 class="movie-desc">
        ${movie.overview}
        </h3>
    </div>
      `;
  return detail_html;
};

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // 영화 id 출력됨
  let movie = JSON.parse(localStorage.getItem(id));

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
  const movieId = urlParams.get("id");

  // 댓글창 유효성검사

  if (review.trim() === "") {
    alert("리뷰를 입력해주세요.");
  } else {
    if (name.trim() === "") {
      alert("닉네임을 입력해주세요.");
    } else {
      if (pw.trim() === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        let movie = localStorage.getItem(movieId); // 이전에 저장된 movie 데이터 가져오기
        movie = movie ? JSON.parse(movie) : {};

        // UUID(고유 식별자) 생성
        let uuid = self.crypto.randomUUID();

        // 기존 댓글이 있을 경우에는 배열에 추가, 없을 시 새로운 배열로 추가
        if (movie.comments) {
          movie.comments.push({ id: uuid, review, name, pw });
        } else {
          movie.comments = [{ id: uuid, review, name, pw }];
        }
        localStorage.setItem(movieId, JSON.stringify(movie));

        alert("리뷰가 저장되었습니다.");

        textarea.value = ""; // 입력값 초기화
        password.value = "";
        writer.value = "";
      }
    }
  }
};

// --------------------------------------------------------------------------------------------------------------

const displayComments = () => {
  // 이전에 저장된 댓글 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  let movie = localStorage.getItem(movieId); // 이전에 저장된 movie 데이터 가져오기
  movie = movie ? JSON.parse(movie) : {};

  // 리뷰들을 가져오기 위해 movie 객체 내의 review 배열을 참조합니다.
  const comments = movie.comments || [];

  // 댓글을 표시할 HTML 요소 선택
  const reviewContainer = document.getElementById("review");

  // 댓글 템플릿 생성
  // 고유한 식별자를 속성으로 추가하여 어떤 댓글을 삭제할지 식별
  const commentsHTML = comments.map((comments) => {
    return `
    <div class="user-review">
          <p class="writer">${comments.name}</p>
          <p class="review-comment" id="review-comment">${comments.review}</p>
          <div class="edit-box">
            <div class="btns">
            <button class="comment-edit" data-id="${comments.id}">수정</button>
            <button class="comment-delete" data-id="${comments.id}">삭제</button>
            </div>
          </div>
        </div>
    `;
  });

  // 댓글을 HTML에 삽입
  reviewContainer.innerHTML = commentsHTML.join("");
};

window.onload = function () {
  const saveButton = document.getElementById("submit-btn");
  saveButton.addEventListener("click", () => {
    posting();
    location.reload();
  });
  displayComments();

  // 버튼에 삭제 기능 삽입
  const deleteButtons = document.querySelectorAll(".comment-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      deleteReview(id);
    });
  });
};

// 댓글 삭제
const deleteReview = (id) => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  let movie = localStorage.getItem(movieId);
  movie = movie ? JSON.parse(movie) : {};

  const comments = movie.comments || [];
  const updatedComments = comments.filter((comment) => comment.id !== id);

  movie.comments = updatedComments;
  localStorage.setItem(movieId, JSON.stringify(movie));

  displayComments();
};

// -----------------------------------------
// const updateReview = () => {};
