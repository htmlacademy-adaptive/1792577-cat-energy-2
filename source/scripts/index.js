/* eslint-disable no-use-before-define */
/* в этот файл добавляет скрипты*/

// eslint-disable-next-line check-file/folder-naming-convention
const openButton = document.querySelector('.header__button--open');
const closeButton = document.querySelector('.header__button--close');
const navList = document.querySelector('.header__nav-list');

function showMenu() {
  navList.style.display = 'block';
  openButton.style.display = 'none';
  closeButton.style.display = 'block';
}

function hideMenu() {
  navList.style.display = 'none';
  openButton.style.display = 'block';
  closeButton.style.display = 'none';
}

openButton.addEventListener('click', showMenu);
closeButton.addEventListener('click', hideMenu);

/*Slider*/
const sliderForm = document.querySelector('.example__sliders-container');

if (sliderForm) {
  const sliderButton = document.querySelector('.example__slider-button');
  const sliderBefore = document.querySelector('.example__slide--big-cat');
  const sliderAfter = document.querySelector('.example__slide--thin-cat');


  sliderButton.ondragstart = function() {
    return false;
  };

  sliderButton.onmousedown = function(e) {
    e.preventDefault();
    const shiftX = e.clientX - sliderButton.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - sliderForm.getBoundingClientRect().left + 20;
      if (newLeft < 0) {
        newLeft = 0;
      }

      const rightEdge = sliderForm.offsetWidth - sliderButton.offsetWidth + 40;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      sliderButton.style.left = `${newLeft}px`;
      sliderBefore.style.clipPath = `inset(0 ${sliderForm.offsetWidth - newLeft}px 0 0)`;
      sliderAfter.style.clipPath = `inset(0 0 0 ${newLeft}px)`;
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  window.addEventListener('resize', () => {
    sliderButton.style.left = '50%';
    sliderBefore.style.clipPath = 'inset(0 50% 0 0)';
    sliderAfter.style.clipPath = 'inset(0 0 0 50%)';
  });
}


const ymaps = window.ymaps;

ymaps.ready(() => {
  const mapElement1 = document.getElementById('map');
  if (mapElement1) {
    const myMap1 = new ymaps.Map(mapElement1, {
      center: [59.938679, 30.3230044],
      zoom: 15.5,
      controls: []
    });

    const screenWidth = window.innerWidth;

    let iconSize;

    if (screenWidth >= 768) {
      iconSize = [113, 106];
    } else {
      iconSize = [57, 53];
    }

    const myPlacemark1 = new ymaps.Placemark(myMap1.getCenter(), {}, {
      iconLayout: 'default#image',
      iconImageHref: '../images/logo-map.svg',
      iconImageSize: iconSize,
      iconImageOffset: [-26, -42]
    });

    myMap1.geoObjects.add(myPlacemark1);
  }
});
