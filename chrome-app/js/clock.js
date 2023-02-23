const clock = document.querySelector("h2#clock");

function sayHello() {
  console.log("hello");
}

setInterval(sayHello, 5000); // setInterval은 (실행하고자하는 함수, 호출주기)
