// 변수 받아오기

const movieName= localStorage.getItem("movie_name");
const apiKey = localStorage.getItem('youtube');

const searchQuery = movieName+' trailer';

// 동영상 ID를 가져와서 재생하는 함수

function playYouTubeVideo(videoId) {
  // iframe 요소 생성
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1'; // autoplay 추가
  iframe.width = '540';
  iframe.height = '250';
  iframe.allowFullscreen = true;

  // 동영상을 표시할 컨테이너 요소
  var playerContainer = document.getElementById('player');
  // 기존에 표시된 내용 제거
  playerContainer.innerHTML = '';
  // iframe 요소 추가
  playerContainer.appendChild(iframe);
}

// YouTube iframe API가 로드된 후에 실행될 함수
function onYouTubeIframeAPIReady() {
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(searchQuery) + '&key=' + apiKey;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let videoId = data.items[0].id.videoId;
      
      playYouTubeVideo(videoId);
    })
    .catch(function(error) {
      console.log('오류 발생:', error);
    });
}

// YouTube iframe API 로드 스크립트 추가
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);