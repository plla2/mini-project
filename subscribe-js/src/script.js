const days = document.querySelector(".days span");
const hours = document.querySelector(".hours span");
const min = document.querySelector(".min span");
const sec = document.querySelector(".sec span");

countDown();
setInterval(() => countDown(), 1000);

function countDown() {
  let countDownDate = new Date("Apr 30, 2023 19:00:00").getTime();
  let dateNow = new Date().getTime();
  let dateDiff = countDownDate - dateNow;
  let remDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let remHours = Math.floor(
    (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let remMin = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let remSec = Math.floor((dateDiff % (1000 * 60)) / 1000);
  upDateTimer(remDays, remHours, remMin, remSec);
}
function upDateTimer(remDays, remHours, remMin, remSec) {
  days.textContent = setZero(remDays);
  hours.textContent = setZero(remHours);
  min.textContent = setZero(remMin);
  sec.textContent = setZero(remSec);
}
function setZero(number) {
  if (number < 10) return (number = "0" + number);
  return number;
}

const inputs = document.querySelectorAll("input");
const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", (submition) => {
  let inValid = invalidInput();
  if (inValid) submition.preventDefault();
});

function invalidInput() {
  let inValid = false;
  let emailRegex = /^\S+@\S+\.\S+$/;

  for (let i = 0; i < inputs.length - 1; i++) {
    let input = inputs[i];
    if (
      (input.id === "email" && !input.value.match(emailRegex)) ||
      !input.value
    ) {
      inValid = true;
      input.classList.add("invalidInput");
      removeInvalidStyleOnInput(input);
    } else if (!input.value) {
      inValid = true;
      input.classList.add("invalidInput");
      removeInvalidStyleOnInput(input);
    }
  }
  return inValid;
}
function removeInvalidStyleOnInput(input) {
  input.addEventListener("input", () => {
    input.classList.remove("invalidInput");
  });
}
