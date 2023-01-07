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

//이미지 보여주기
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // ()안에는 이미지, x,y좌표, 너비와 높이를 넣어준다.
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

//render를 한번이 아니라 계속 호출하기 위함이다.
function main() {
  render();
  requestAnimationFrame(main); //이 함수는 애니메이션처럼 어떤 프레임을 계속 호출해서 보여주게 되는 함수. (main->render) 계속 반복
}
loadImage();
main();
