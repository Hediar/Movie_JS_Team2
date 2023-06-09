/* detail HTML UPDATE & */
const displayDetail = (data) => {
  const containerDetail = document.querySelector("#movie-info");
  let movieDetail = createMovieDetail(data.movie);
  containerDetail.innerHTML = movieDetail;
  changeheader(data.movie);
};

function changeheader(movie) {
  let bg = document.getElementById("background");
  let headerTitle = document.getElementById("header-title");

  let backdrop = movie.backdrop_path;
  let title = movie.title;

  bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 25%), rgba(0, 0, 0, 100%)),url(https://image.tmdb.org/t/p/original/${backdrop}`;
  headerTitle.innerText = `${title}`;
}
/*detail 페이지를 구성할 HTML*/
const createMovieDetail = (movie) => {
  let detail_html = `
    <img src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="영화이미지" class="movie-img"/>
    <div class="movie-info">
      <h4 class="movie-rate">⭐ ${movie.vote_average}<span class=movie-vote>(${movie.vote_count})</span></h4>
      <h2 class="movie-title">${movie.original_title}</h2>
      <h4 class="movie-detail"><span class="movie-date">${movie.release_date}</span><span>|</span><span class="movie-lang">${movie.original_language}</span><span>|</span><span class="movie-popularity">Popularity: ${movie.popularity}</span></h4>
      <h3 class="movie-desc">${movie.overview}</h3>
    </div>`;
  return detail_html;
};

// 전역 변수
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // 영화 id 출력됨
let movie = JSON.parse(localStorage.getItem(id));

window.addEventListener("DOMContentLoaded", () => {
  displayDetail(movie);
});

// ----------------------------------------------------------------------------------
/* 리뷰 */
const posting = () => {
  const textarea = document.querySelector("#write-comment");
  const password = document.getElementById("comment-pw1");
  const writer = document.getElementById("comment-name");

  const review = textarea.value;
  const name = writer.value;
  const pw = password.value;

  //댓글창 유효성검사

  if (review.trim() === "") {
    alert("리뷰를 입력해주세요.");
  } else {
    if (name.trim() === "") {
      alert("닉네임을 입력해주세요.");
    } else {
      if (pw.trim() === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        // 이전에 저장된 movie 데이터 가져오기
        //movie = movie ? JSON.parse(movie) : {};

        // 기존 댓글이 있을 경우에는 배열에 추가, 없을 시 새로운 배열로 추가
        if (movie.comments) {
          movie.comments.push({ review, name, pw });
        } else {
          movie.comments = [{ review, name, pw }];
        }
        localStorage.setItem(id, JSON.stringify(movie));

        alert("리뷰가 저장되었습니다.");
        location.reload();

        textarea.value = ""; // 입력값 초기화
        password.value = "";
        writer.value = "";
      }
    }
  }
};

const updateReview = (buttonIndex) => {
  const HIDDEN_CLASSNAME = "hidden";

  const userReviewElement = document
    .querySelector(`[data-index="${buttonIndex}"].comment-edit`)
    .closest(".user-review");
  const updateBox = userReviewElement.querySelector("#update");
  const currentReview = userReviewElement.querySelector(".review-comment");
  const viewReview = userReviewElement.querySelector(".btns");
  const saveReviewButton = userReviewElement.querySelector("#submit-btn");

  const updateButton = userReviewElement.querySelector("#submit-btn");

  // 패스워드 입력하는 곳 선택자
  const checkPassword = userReviewElement.querySelector("#password-check");
  const confirmButtons = userReviewElement.querySelector(".comment-confirm");
  const cancelButton = userReviewElement.querySelector(".cancel");

  checkPassword.classList.remove(HIDDEN_CLASSNAME);
  viewReview.classList.add(HIDDEN_CLASSNAME); // 기존 코멘트, 버튼 보이지 않게 만든다.
  currentReview.classList.add(HIDDEN_CLASSNAME);

  // 취소 버튼
  cancelButton.addEventListener("click", () => {
    checkPassword.classList.add(HIDDEN_CLASSNAME);
    viewReview.classList.remove(HIDDEN_CLASSNAME);
    currentReview.classList.remove(HIDDEN_CLASSNAME);
    return false;
  });

  // 확인 버튼
  confirmButtons.addEventListener("click", () => {
    const password = userReviewElement.querySelector(".comment-pw2").value;
    //비밀번호가 맞다면 수정 박스가 나타나게 만든다.
    if (pwCheck(buttonIndex, password)) {
      // True 값 반환된다면
      checkPassword.classList.add(HIDDEN_CLASSNAME); // 비밀번호 입력 칸 안보이게
      updateBox.classList.remove(HIDDEN_CLASSNAME); // 다시 입력할 수 있는 창이 보인다.
      saveReviewButton.classList.remove(HIDDEN_CLASSNAME);

    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  });
  
  // 저장 버튼이 눌러지면 적혀져 있는 것은 저장하고 다시 기존 형태로 display 해주어야 한다.
  updateButton.addEventListener("click", () => {
    const newComment =
      userReviewElement.querySelector("#update-comment").value;
    let updateData = movie.comments[buttonIndex];

    updateData.review = `${newComment}`;

    localStorage.setItem(id, JSON.stringify(movie));
    alert("수정되었습니다");
    location.reload();
  });
};

const deleteReview = (buttonIndex) => {
  const HIDDEN_CLASSNAME = "hidden";

  const userReviewElement = document
    .querySelector(`[data-index="${buttonIndex}"].comment-delete`)
    .closest(".user-review");

  const currentReview = userReviewElement.querySelector(".review-comment");
  const viewReview = userReviewElement.querySelector(".btns");

  // 패스워드 입력하는 곳 선택자
  const checkPassword = userReviewElement.querySelector("#password-check");
  const confirmButtons = userReviewElement.querySelector(".comment-confirm");
  const cancelButton = userReviewElement.querySelector(".cancel");

  checkPassword.classList.remove(HIDDEN_CLASSNAME);
  viewReview.classList.add(HIDDEN_CLASSNAME); // 기존 코멘트, 버튼 보이지 않게 만든다.
  currentReview.classList.add(HIDDEN_CLASSNAME);

  confirmButtons.addEventListener("click", () => {
    const password = userReviewElement.querySelector(".comment-pw2").value;

    // 비밀번호가 맞다면 수정 박스가 나타나게 만든다.
    if (pwCheck(buttonIndex, password)) {
      // True 값 반환된다면
      const comments = movie.comments || [];

      comments.splice(buttonIndex, 1);

      movie.comments = comments;
      localStorage.setItem(id, JSON.stringify(movie));

      alert("삭제되었습니다");
      location.reload();
      
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  });
  // 취소 버튼
  cancelButton.addEventListener("click", () => {
    checkPassword.classList.add(HIDDEN_CLASSNAME);
    viewReview.classList.remove(HIDDEN_CLASSNAME);
    currentReview.classList.remove(HIDDEN_CLASSNAME);
  });
};
// --------------------------------------------------------------------------------

//비밀번호 일치여부 확인
function pwCheck(index, password) {
  const currentPassword = movie.comments[index].pw; // 리뷰 객체에서 비밀번호 가져오기

  return password === currentPassword; // 비밀번호 일치 여부 반환
}

// --------------------------------------------------------------------------------------------------------------

const displayComments = () => {
  // 이전에 저장된 댓글 가져오기

  movie = movie ? movie : {};

  // 리뷰들을 가져오기 위해 movie 객체 내의 review 배열을 참조합니다.
  const comments = movie.comments || [];

  // 댓글을 표시할 HTML 요소 선택
  const reviewContainer = document.getElementById("review");

  // 댓글 템플릿 생성
  const commentsHTML = comments.map((comments, index) => {
    return `
    <div class="user-review">
      <div class="written-comment">
        <p class="writer">${comments.name}</p>
        <p class="review-comment" id="review-comment">${comments.review}</p>
        <div id="update" class="hidden">
          <textarea name="comment" id="update-comment" cols="auto" rows="5">${comments.review}</textarea>
        </div>
        <div id="password-check" class="hidden">
          <input
            type="password"
            class="comment-pw2"
            placeholder="비밀번호 입력"
          />
          <button class="comment-confirm" data-index="${index}">확인</button>
          <button class="cancel" data-index="${index}">취소</button>
        </div>
      </div>
      <div class="edit-box">
        <div class="btns">
          <button class="comment-edit" data-index="${index}">수정</button>
          <button class="comment-delete" data-index="${index}">삭제</button>
        </div>
        <button type="submit" id="submit-btn" class="hidden">저장</button>
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
    
  });
  displayComments();

  // update 버튼
  const updateButtons = document.querySelectorAll(".comment-edit");
  updateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      buttonIndex = button.dataset.index;
      if(updateReview(buttonIndex)){
        updateReview(buttonIndex);
      }
    });
  });

  // delete 버튼
  const deleteButtons = document.querySelectorAll(".comment-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      buttonIndex = button.dataset.index;
      deleteReview(buttonIndex);
    });
  });
};
