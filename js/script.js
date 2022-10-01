const sidebarItems = document.querySelectorAll('.lamp-list__item');
const bigLamp = document.querySelector('.description__image');
const mediumLamp = document.querySelector('.right-col__image--medium');
const sunBtn = document.querySelector('.btn--sun');
const moonBtn = document.querySelector('.btn--moon');
const heroImg = document.querySelector('.right-col__image');
const initHeroImgSource = heroImg.getAttribute('src');
const initHeroImgSourceSet = heroImg.getAttribute('srcset');

let data = [];
let src1 = '';
let src2 = '';
let src3 = '';
let isDarkMode = false;

sidebarItems.forEach((item) => {
  item.addEventListener('click', () => {
    const id = item.children[0].dataset.id;
    if (!isDarkMode) {
      removeActiveClasses();
      item.classList.add('lamp-list__item--active');
    }
    switch (id) {
      case '2':
        if (!isDarkMode) {
          bigLamp.setAttribute('src', src2);
          setInitMediumImagePos();
          mediumLamp.setAttribute('src', src2);
          break;
        }
      case '3':
        bigLamp.style.left = '33%';
        bigLamp.setAttribute('src', src3);
        if (!isDarkMode) {
          mediumLamp.setAttribute('src', src3);
        }
        mediumLamp.style.top = '-11rem';
        mediumLamp.style.max;
        mediumLamp.style.left = '20.5%';
        break;
      default:
        if (!isDarkMode) {
          bigLamp.style.left = '43%';
          bigLamp.setAttribute('src', src1);
          setInitMediumImagePos();
          mediumLamp.setAttribute('src', src1);
        }
    }
  });
});

function removeActiveClasses() {
  sidebarItems.forEach((item) =>
    item.classList.remove('lamp-list__item--active')
  );
}

function setInitMediumImagePos() {
  mediumLamp.style.left = '25%';
  mediumLamp.style.top = '0';
  bigLamp.style.left = '43%';
}

function setInitCond() {
  setInitMediumImagePos();
  mediumLamp.setAttribute('src', src1);
  bigLamp.setAttribute('src', src1);
  removeActiveClasses();
  console.log(sidebarItems[0]);
  sidebarItems[0].classList.add('lamp-list__item--active');
  heroImg.setAttribute('src', initHeroImgSource);
  heroImg.setAttribute('srcset', initHeroImgSourceSet);
}

moonBtn.addEventListener('click', () => {
  isDarkMode = true;
  mediumLamp.setAttribute('src', '');
  heroImg.setAttribute('src', 'assets/webp/hero/hero-img-dark.webp');
  heroImg.setAttribute(
    'srcset',
    `assets/webp/hero/hero-img-dark.webp    1x, 
    assets/webp/hero/hero-img-dark@2x.webp 2x, 
    assets/webp/hero/hero-img-dark@3x.webp 3x`
  );
});

sunBtn.addEventListener('click', () => {
  isDarkMode = false;
  setInitCond();
});

async function fetchData() {
  try {
    const response = await fetch(
      'https://private-anon-b86aaf46c1-lampshop.apiary-mock.com/lamps',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    alert(`Failed to fetch data: ${err}`);
  }
}

async function setSources() {
  data = await fetchData();
  src1 = data.at(0).image;
  src2 = data.at(2).image;
  src3 = data.at(1).image;
  mediumLamp.setAttribute('src', src1);
  bigLamp.setAttribute('src', src1);
}

setSources();
