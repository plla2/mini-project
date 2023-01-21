let menuOpened = document.querySelector(".menu-opened"),
  openMenuBtn = document.getElementById("open"),
  closeMenuBtn = document.getElementById("close"),
  prevBtn = document.querySelectorAll(".prev"),
  nextBtn = document.querySelectorAll(".next"),
  background = document.querySelector(".background"),
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

function nextSlide() {
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
}
