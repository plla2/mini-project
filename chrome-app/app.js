const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(event) {
  event.preventDefault(); //preventDefault()는 해당 이벤트에 대한 기본동작을 실행하지 않게한다.
  // 기본동작을 실행하지 않으므로 submit이 되어도 새로고침이 되지 않는다.
  console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit); // form의 기본동작은 submit이다.
//**함수 뒤에 ()를 붙이면 브라우저가 보자마자 자동으로 함수를 실행시킨다.**
