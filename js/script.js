const sidebarItems = document.querySelectorAll(
  '.col-1-description-sidebar__item'
);

const bigLamp = document.querySelector('.col-1-description__image');
const smallLamp = document.querySelector('.col-2__lamp');

sidebarItems.forEach((item) => {
  item.addEventListener('click', () => {
    const id = item.dataset.id;
    removeActiveClasses();
    switch (id) {
      case '2':
        bigLamp.style.left = '33.4rem';
        break;
      case '3':
        bigLamp.style.left = '23.1rem';
        break;
      default:
        bigLamp.style.left = '29.4rem';
    }
    item.classList.add('col-1-description-sidebar__item--active');
    bigLamp.setAttribute('src', `assets/lamp${id}.png`);
    smallLamp.setAttribute('src', `assets/lamp${id}-medium.png`);
    console.log(bigLamp.style.left);
  });
});

function removeActiveClasses() {
  sidebarItems.forEach((item) =>
    item.classList.remove('col-1-description-sidebar__item--active')
  );
}

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

const data = fetchData();
