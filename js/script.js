const sidebarItems = document.querySelectorAll('.lamp-list__item');
const bigLamp = document.querySelector('.description__image');
const mediumLamp = document.querySelector('.right-col__image--medium');
const sunBtn = document.querySelector('.btn--sun');
const moonBtn = document.querySelector('.btn--moon');
const heroImg = document.querySelector('.right-col__image');
const initHeroImgSource = heroImg.getAttribute('src');

let data = [];
let src1 = '';
let src2 = '';
let src3 = '';
let isDarkMode = false;

sidebarItems.forEach((item) => {
  item.addEventListener('click', () => {
    const id = item.children[0].dataset.id;
    removeActiveClasses();
    switch (id) {
      case '2':
        bigLamp.style.left = '30rem';
        bigLamp.setAttribute('src', src2);
        setInitCond();
        mediumLamp.setAttribute('src', src2);
        break;
      case '3':
        bigLamp.style.left = '23.1rem';
        bigLamp.setAttribute('src', src3);
        mediumLamp.setAttribute('src', src3);
        mediumLamp.style.top = '-11rem';
        mediumLamp.style.left = '24%';
        isDarkMode = data.at;
        break;
      default:
        bigLamp.style.left = '29.4rem';
        bigLamp.setAttribute('src', src1);
        setInitCond();
        mediumLamp.setAttribute('src', src1);
    }
    item.classList.add('lamp-list__item--active');
  });
});

function removeActiveClasses() {
  sidebarItems.forEach((item) =>
    item.classList.remove('lamp-list__item--active')
  );
}

function setInitCond() {
  mediumLamp.style.left = '25%';
  mediumLamp.style.top = '0';
  heroImg.setAttribute('src', initHeroImgSource);
}

moonBtn.addEventListener('click', () => {
  mediumLamp.setAttribute('src', '');
  heroImg.setAttribute('src', 'assets/webp/hero/hero-img-dark.webp');
  heroImg.setAttribute(
    'srcset',
    `assets/webp/hero/hero-img-dark.webp    1x, 
    assets/webp/hero/hero-img-dark@2x.webp 2x, 
    assets/webp/hero/hero-img-dark@3x.webp 3x`
  );
});

async function fetchData() {
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
