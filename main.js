const toggleBtn = document.querySelector(`.toggle`);
const card = document.querySelector(`.card`);

toggleBtn.addEventListener(`click`, function () {
  card.classList.toggle(`visible`);
});
// toggleBtn.onClick = function () {
//   console.log(`ok`);
//   card.classList.toggle(`visible`);
// };

const slides = document.querySelectorAll(`.slide`);

const backwardBtn = document.querySelector(`.button__left`);
const forwardBtn = document.querySelector(`.button__right`);
const dotsContainer = document.querySelector(`.dots`);
const dots = document.querySelectorAll(`.dot`);

let curSlide = 0;
let maxSlide = slides.length;

//generate slide
slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
});

//generate dots
for (let i = 0; i < maxSlide; i++) {
  if (i === 0) {
    dotsContainer.insertAdjacentHTML(
      `beforeend`,
      `<div class="dot active" data-id=${i}></div>`
    );
  } else {
    dotsContainer.insertAdjacentHTML(
      `beforeend`,
      `<div class="dot" data-id=${i}></div>`
    );
  }
}

dotsContainer.addEventListener(`click`, function (e) {
  const dots = document.querySelectorAll(`.dot`);
  curSlide = +e.target.dataset.id;
  slideImage(curSlide);
  activateDots(curSlide);
});

function activateDots(curSlide) {
  const dots = document.querySelectorAll(`.dot`);

  dots.forEach((dot) => dot.classList.remove(`active`));

  document.querySelector(`.dot[data-id="${curSlide}"]`).classList.add(`active`);
}

function slideImage(curSlide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
}

function nextSlide() {
  curSlide++;
  if (curSlide === maxSlide) curSlide = 0;

  slideImage(curSlide);
  activateDots(curSlide);
}

function prevSlide() {
  if (curSlide === 0) curSlide = maxSlide;
  curSlide--;

  slideImage(curSlide);
  activateDots(curSlide);
}

backwardBtn.addEventListener(`click`, prevSlide);

forwardBtn.addEventListener(`click`, nextSlide);

document.addEventListener(`keydown`, function (e) {
  if (e.key === `ArrowRight`) {
    nextSlide();
  }

  if (e.key === `ArrowLeft`) {
    prevSlide();
  }
});
