let menuOpened = document.querySelector(".menu-opened"),
  openMenuBtn = document.getElementById("open"),
  closeMenuBtn = document.getElementById("close"),
  prevBtn = document.querySelectorAll(".prev"),
  nextBtn = document.querySelectorAll(".next"),
  background = document.querySelectorAll(".background"),
  headerTexts = document.querySelectorAll(".header-texts"),
  headerHOne = document.querySelectorAll(".h1-header"),
  header = document.querySelector("header"),
  body = document.querySelector("body"),
  main = document.querySelector("main");

let counta = 0;
let countb = 0;
let countc = 0;
let mobilePics = [
  "url(./images/mobile-image-hero-1.jpg)",
  "url(./images/mobile-image-hero-2.jpg)",
  "url(./images/mobile-image-hero-3.jpg",
];
let desktopPics = [
  "url(./images/desktop-image-hero-1.jpg)",
  "url(./images/desktop-image-hero-2.jpg)",
  "url(./images/desktop-image-hero-3.jpg)",
];

let hOneTexts = [
  "Discover innovation ways to decorate",
  "We are available all across the globe",
  "Manufactured with the best materials",
];

let headersTexts = [
  "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
  "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we're in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
  "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
];

nextBtn.forEach((next) => {
  next.addEventListener("click", () => {
    nextSlide();
  });
});

prevBtn.forEach((prev) => {
  prev.addEventListener("click", () => {
    prevSlide();
  });
});

body.addEventListener("keydown", (e) => {
  e = e || window.Event;
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

openMenuBtn.addEventListener("click", () => {
  menuOpened.classList.toggle("show");
  header.classList.toggle("opac");
  main.classList.toggle("opac");
  body.classList.toggle("flow");
});

closeMenuBtn.addEventListener("click", () => {
  menuOpened.classList.toggle("show");
  header.classList.toggle("opac");
  main.classList.toggle("opac");
  body.classList.toggle("flow");
});
function nextSlide() {
  console.log("next");
  if (screen.width > "560") {
    if (counta >= desktopPics.length - 1) return;
    counta++;
    background.forEach((back) => {
      back.style.backgroundImage = desktopPics[counta];
    });
  } else {
    if (counta >= mobilePics.length - 1) return;
    counta++;
    background.forEach((back) => {
      back.style.backgroundImage = mobilePics[counta];
    });
  }
  if (countb >= hOneTexts.length - 1) return;
  countb++;
  headerHOne.forEach((hone) => (hone.innerHTML = hOneTexts[countb]));

  if (countc >= headersTexts.length - 1) return;
  countc++;
  headerTexts.forEach((texts) => (texts.innerHTML = headersTexts[countc]));
}

function prevSlide() {
  console.log("prev");
  if (screen.width > "560") {
    if (counta <= desktopPics.length && counta > 0) {
      counta--;
      background.forEach((back) => {
        back.style.backgroundImage = desktopPics[counta];
      });
    } else {
      return;
    }
  } else {
    if (counta <= mobilePics.length && counta > 0) {
      counta--;
      background.forEach((back) => {
        back.style.backgroundImage = mobilePics[counta];
      });
    } else {
      return;
    }
  }

  if (countb <= hOneTexts.length - 1 && countb > 0) {
    countb--;
    headerHOne.forEach((hone) => {
      hone.innerHTML = hOneTexts[countb];
    });
  } else {
    return;
  }

  if (countc <= headersTexts.length - 1 && countc > 0) {
    countc--;
    headerTexts.forEach((texts) => {
      texts.innerHTML = headersTexts[countc];
    });
  } else {
    return;
  }
}
