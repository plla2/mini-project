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

// 게임오버 변수만들기
let gameOver = false; // true이면 게임이 끝나고, false면 게임이 지속.
let score = 0;
// 우주선 좌표
let spaceshipX = canvas.width / 2 - 24;
let spaceshipY = canvas.height - 48;

let bulletList = []; // 총알들을 저장하는 리스트
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 12; // 우주선의 가운데에서 총알을 발사하기 위해 +12를 해준다.
    this.y = spaceshipY;
    this.alive = true; //true면 살아있는 총알, false면 죽은 총알
    bulletList.push(this); // bulletList 배열안에 this.x , this.y 좌표를 추가한다.
  };
  // 총알을 발사하는 함수.
  this.update = function () {
    this.y -= 7; // 이 말의 뜻은 총알의 y축을 줄임으로써 위로 올라가게 만든다.
  };

  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 40
      ) {
        // 총알이 죽게됨 -> 적군의 우주선이 없어짐 -> 점수 획득
        score++;
        this.alive = false; // 죽은 총알
        enemyList.splice(i, 1);
      }
    }
  };
}

function generateRandomValue(min, max) {
  //랜덤하게 나오되 최솟값과 최댓값 사이에서만 나오게 설정한다.
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min; // 최솟값은 0, 최댓값은 canvas.width-48
  return randomNum;
}

let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48);
    enemyList.push(this);
  };

  // 적군을 내려오게하는 함수
  this.update = function () {
    this.y += 2; //이 말의 뜻은 적군의 y축을 늘림으로써 아래로 내려오게 된다.
    if (this.y >= canvas.height - 48) {
      gameOver = true;
      console.log("game over");
    }
  };
}

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
  gameOverImage.src = "images/gameover.webp";
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

    if (event.keyCode == 32) {
      // 32:스페이스바를 눌렀다가 뗄때 createBullet함수 실행
      createBullet(); // 총알생성함수
    }
  });
}

// 총알을 생성.
function createBullet() {
  console.log("총알 생성!");
  let b = new Bullet();
  b.init(); // b에 init함수내용인 this.x = spaceshipX, this.y = spaceshipY를 넣어준다.
  console.log("새로운 총알 리스트", bulletList);
}

// 적군을 생성.
function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init(); // 총알생성과 똑같은 메커니즘
  }, 1000);
  // setInterval은 호출하고싶은함수, 시간을 넣어준다. 이렇게해서 시간마다 반복해서 함수를 호출해준다.
}

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

  // 총알의 y좌표를 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      //총알이 살아있을 때만 아래를 실행하게 조건을 넣어줘야한다.
      bulletList[i].update();
      bulletList[i].checkHit(); //총알의 y좌표를 업데이트 계속하면서 checkHit도 했는지 계속 확인한다.
    }
  }
  // 적군의 y좌표를 업데이트하는 함수 호출
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

//이미지 보여주기
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // ()안에는 이미지, x,y좌표, 너비와 높이를 넣어준다.
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`score: ${score}`, 20, 20); // 점수창을 보여준다.
  ctx.fillStyle = "white"; //점수창의 텍스트 컬러
  ctx.font = "20px Arial"; // 텍스트 폰트크기와 폰트명

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      // 만약 총알이 살아있으면 이미지를 보여준다.
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다
// render를 한번이 아니라 계속 호출하기 위함이다.
function main() {
  if (!gameOver) {
    // gameover가 false일때는 아래함수들이 실행되다가 true가 되면 실행되지 않는다.
    update(); // 좌표값을 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main); //이 함수는 main함수 안의 내용을 계속 반복시켜준다. (update, render)를 반복
  } else {
    ctx.drawImage(gameOverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupKeyboardListener();
createEnemy(); //웹페이지가 실행되자마자 적군이 나오기 때문에 이곳에 작성.
main();

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알 발사 = 총알의 y값은 --, 총알의 x값은 스페이스바를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장한다.
// 4. 총알들은 x,y좌표값이 있어야한다.
// 5. 총알배열을 가지고 render를 한다.

// 적군 만들기 (x, ,y, init, update)
// 1.적군은 위치가 랜덤하다.
// 2. 적군은 밑으로 내려온다.
// 3. 1초마다 하나씩 적군이 나온다.
// 4. 적군의 우주선이 바닥에 닿으면 게임오버
// 5. 적군과 총알이 만나면 적군 우주선이 사라진다 그리고 점수 1점획득

// 적군 죽이기
// 총알.y <= 적군.y  And  총알.x >= 적군.x  And  총알.x <= 적군.x+적군의 넓이
// 위가 성립되면 닿았다고 할 수 있다.
// 총알이 죽게됨 -> 적군의 우주선이 없어짐 -> 점수 획득
