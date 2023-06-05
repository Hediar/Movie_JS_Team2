
// movies api
const loadmovies = async() => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTUyMTcwNGJlYmRlZmIxZmU5YTRiMTg0MGNiYzYxNyIsInN1YiI6IjY0NzU1ZjgwYzI4MjNhMDBhOGQ0OWRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eZnRu1VA2riP3i1VqNMnW4Qqilb-P_EEZjOvjcpOmvQ'
        }
      };
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const data = await response.json();
    // console.log(data['results']);
    return data['results'];
}

// HTML UPDATE 
function displaymovies(movies) {
  const container = document.querySelector(".movie-wrap");
  container.innerHTML = movies.map(movie => createMovieCards(movie)).join('');
  onClickCard();
}

// HTML list 만들기
function createMovieCards(movie){
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

// 클릭 이벤트 alert로 해당 movie id 나오게 만들기 
const onClickCard = function() {
  const cards = document.querySelectorAll('.movie-card');
  cards.forEach(card =>{
    card.addEventListener('click', function(){
      let id = this.getAttribute('id');
      alert('해당 영화의 id는 ' + id + '입니다.');
    });
  })
};

// 검색 기능 : 대소문자 관계없이, enter입력해도 검색 클릭과 동일한 기능
const findTitle = function(movies) {
  
  // input값 가져와서 title과 비교하기 
  let search = document.getElementById("search-input").value.toLowerCase();
  
  // 버튼 클릭이나 엔터 키 입력되었을 때 실행 
  const filtermovie = movies.filter(movie => 
      movie.original_title.toLowerCase().includes(search));

  // console.log(filtermovie);
  displaymovies(filtermovie);
}

// 이벤트 관리
function setEventListeners(movies) {
  const form = document.querySelector(".search");
  // 검색창에 입력 수행 시 
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    findTitle(movies);
  })
  // 카드 클릭 이벤트 
  //onClickCard();
}

// main
loadmovies()
  .then(movies => {
    
    displaymovies(movies);
    setEventListeners(movies);
  })

