const timerElement = document.querySelector('.timer');
const startBtn = document.querySelector('.start');

let seconds = 100
let intervalId = null

startBtn.addEventListener('click', () => {
  if (intervalId !== null) return

  intervalId = setInterval(() => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    timerElement.textContent = `${min}:${sec}`
    seconds--

    if (seconds < 0) {
      clearInterval(intervalId)
      intervalId = null
    }
  }, 1000)
})
