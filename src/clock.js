const clock = document.querySelector(".h1-clock");

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  // 10시,분,초 미만 일시 앞에 0붙이기
  clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

// 1초마다 비동기 함수 실행
function init() {
  setInterval(getTime, 1000);
}

init();
