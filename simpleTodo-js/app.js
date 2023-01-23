let push = document.querySelector("#push");
let input = document.querySelector("#newtask input");
let tasks = document.querySelector("#tasks");

// input 필드에 타당성을 부여해준다.
push.onclick = function () {
  if (input.value.length === 0) {
    alert("Please Enter a Task");
  } else {
    // input에 들어간 내용을 innerHTML로 추가해준다.
    tasks.innerHTML += `<div class="task"><span id="taskname">${input.value}</span><button class='delete'><i class="fa-solid fa-trash-can"></i>
    </button></div>`;
    input.value = "";
    // 추가된 task 중 class가 delete인 버튼을 눌러 제거한다.
    let current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }
    let com_tasks = document.querySelectorAll(".task");
    for (let i = 0; i < com_tasks.length; i++) {
      com_tasks[i].onclick = function () {
        // task의 글자를 누르면 완료
        this.classList.toggle("completed");
      };
    }
  }
};
