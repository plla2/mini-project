//  canvas(캔버스) 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas); //html의 body태그에 canvas를 붙여준다.

// 게임 이미지 가져오기
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 24;
let spaceshipY = canvas.height - 48;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.webp";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "gameover.webp";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true; //키보드를 누를때 값을 keysDown객체에 저장한다.
    console.log("키다운객체에 들어간 값은?", keysDown);
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode]; // 키보드를 떼면 keysDown객체의 값을 삭제한다.
    console.log("버튼 클릭후", keysDown);
    // 이렇게 함으로써 버튼이 눌리고 있을땐 키다운객체에 값이 계속 들어가지만, 떼면 값이 삭제된다.
  });
}

// 우주선이 오른쪽으로 갈때
function update() {
  if (39 in keysDown) {
    // 39: right방향키, 즉 keysDown객체에 39가 들어가있으면 x좌표를 5씩 증가해라
    spaceshipX += 5; // 우주선의 속도
  }
  if (37 in keysDown) {
    // 37: left방향키, 위의 내용과같이 5를 감소시킨다.
    spaceshipX -= 5;
  }

  // 우주선의 좌표값이 무한대로 업데이트가 되는게 아닌
  // 화면 안에서만 있게 하려면?
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 48) {
    spaceshipX = canvas.width - 48;
  }
}

//이미지 보여주기
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // ()안에는 이미지, x,y좌표, 너비와 높이를 넣어준다.
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다
// render를 한번이 아니라 계속 호출하기 위함이다.
function main() {
  update(); // 좌표값을 업데이트하고
  render(); // 그려주고
  requestAnimationFrame(main); //이 함수는 main함수 안의 내용을 계속 반복시켜준다. (update, render)를 반복
}

loadImage();
setupKeyboardListener();
main();
