/* detail HTML UPDATE & */
const displayDetail = (data) => {
    const containerDetail = document.querySelector(".movie-detail");
    //console.log(movie);
    let movieDetail = createMovieDetail(data.movie);
    //console.log(movieDetail);
    containerDetail.innerHTML = movieDetail;
    
  }
  
  /*detail 페이지를 구성할 HTML*/ 
  
  const createMovieDetail = (movie) => {
    console.log(movie.poster_path);
    let detail_html = `
      <div class="movie-detail">
          <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          class="movie-detail-poster"
          />
        <div class="movie-detail-body">
          <h3 class="detail-title">${movie.original_title}</h3>
          <p>투표평균: ${movie.vote_average}</p>
          <p>투표횟수: ${movie.vote_count}</p>
          <p>인기도: ${movie.popularity}</p>
          <p>기본 언어: ${movie.original_language}</p>
          <p>
          ${movie.overview}
          </p>
        </div>
      </div>
      `;
    return detail_html;
  }
  
/* 리뷰 */
const posting = () => {
  
}

/* 메인 페이지로 돌아가는 클릭 이벤트 */


/* 생각해본 데이터 형태 
{
  "id": 영화 id,
  "movie": [
    {
      영화 객체
    }
  ],
  "reviews": [
    { 첫번째 리뷰 },
    { 두번째 리뷰 }, ...
  ]
}
*/


window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); // 영화 id 출력됨
    let movie = JSON.parse(localStorage.getItem(id));
    //console.log(id);
    //console.log(movie);
    displayDetail(movie);
  });