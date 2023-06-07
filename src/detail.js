/* detail HTML UPDATE & */
const displayDetail = (data) => {
    const containerDetail = document.querySelector("#movie-info");
    //console.log(movie);
    let movieDetail = createMovieDetail(data.movie);
    //console.log(movieDetail);
    containerDetail.innerHTML = movieDetail;
    
  }
  
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
    return detail_html;
  }
  
/* 리뷰 */
const posting = (movie) => {
  const getName = document.querySelector("#comment-id1").value;
  const getPassword = document.querySelector("#comment-pw1").value;
  const getComment = document.querySelector("#write-comment").value;
  console.log(getName, getPassword, getComment);
}

const reviewDisplay = () => {

}



/* 생각해본 데이터 형태 
{
  "id": 영화 id{
    "movie": [
    {
      영화 객체
    }
  ],
  "reviews": [
    { "name" : "",
        "password": "",
        "comment": "" },
    { 두번째 리뷰 }, ...
  ]
  }
}
*/

const onClickSave = function() {
    
}

const setEventListeners = function() {

}

window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); // 영화 id 출력됨
    let movie = JSON.parse(localStorage.getItem(id));

    console.log(movie);
    displayDetail(movie);
    posting(movie);
  });