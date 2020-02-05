const p1Button = document.querySelector("#p1");
const p2Button = document.getElementById("p2");
const resetButton = document.querySelector("#reset");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const numInput = document.querySelector("input");
const winningDisplay = document.querySelector("p span");

let gameOver = false;
let p1Score = 0;
let p2Score = 0;
let winningScore = 0;

p1Button.addEventListener("click", () => {
  if (!gameOver) {
    p1Score++;
    if (p1Score === winningScore) {
      p1Display.classList.add("winner");
      gameOver = true;
    }
    p1Display.textContent = p1Score;
  }
});

p2Button.addEventListener("click", () => {
  if (!gameOver) {
    p2Score++;
    if (p2Score === winningScore) {
      p2Display.classList.add("winner");
      gameOver = true;
    }
    p2Display.textContent = p2Score;
  }
});

function reset() {
  p1Score = 0;
  p2Score = 0;
  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;
  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
  gameOver = false;
}

resetButton.addEventListener("click", () => {
  reset();
});

numInput.addEventListener("change", e => {
  winningScore = Number(e.currentTarget.value);
  winningDisplay.textContent = winningScore;
  reset();
});
