const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"; // string이 중복되어 나올때는 이렇게 변수로 지정해줘야 편하다.
const USERNAME_KEY = "username"; // string이 중복되어 나올때는 이렇게 변수로 지정해줘야 편하다.

function onLoginSubmit(event) {
  event.preventDefault(); //preventDefault()는 해당 이벤트에 대한 기본동작을 실행하지 않게한다.
  // 기본동작을 실행하지 않으므로 submit이 되어도 새로고침이 되지 않는다.
  loginForm.classList.add(HIDDEN_CLASSNAME); // loginForm class에 hidden을 추가하여 css의 .hidden을 실행
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username); // "username"은 key, username은 value
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

//**함수 뒤에 ()를 붙이면 브라우저가 보자마자 자동으로 함수를 실행시킨다.**

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME); // show the form
  loginForm.addEventListener("submit", onLoginSubmit); // submit이 되면 onLoginSubmit함수가 실행된다.
} else {
  paintGreetings(savedUsername); // show the greetings
}
