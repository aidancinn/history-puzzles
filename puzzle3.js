const correctAnswer = "NATIONAL YOUTH ADMINISTRATION";

const finalInput = document.getElementById("finalInput");
const submitFinal = document.getElementById("submitFinal");
const message = document.getElementById("message");

function normalize(value) {
  return value.replace(/\s+/g, " ").trim().toUpperCase();
}

function checkAnswer() {
  const userAnswer = normalize(finalInput.value);

  if (userAnswer === correctAnswer) {
    message.textContent = "correct. access granted.";
    message.className = "message success";

    setTimeout(() => {
      window.location.href = "congratulations.html";
    }, 1000);
  } else {
    message.textContent = "wrong decryption. try again.";
    message.className = "message error";
  }
}

submitFinal.addEventListener("click", checkAnswer);

finalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});