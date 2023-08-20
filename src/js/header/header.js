import { refs } from "./refs";


import { toggleModal, modalIsOpen } from "./_modal-window";


const currentPath = window.location.pathname;
console.log(currentPath);


refs.navigationLinks.forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('current-link');
    }
    else if (currentPath.length <= 1) {
        refs.navigationLinks[0].classList.add('current-link')
    }
    else {
        link.classList.remove('current-link');
    }
});


function onScrollHeader(px) {
    const screenSize = window.screen.width;
    if (screenSize >= px) {
        scrollY <= 70
            ? document.getElementById('header').classList.remove('header-scroll')
            : document.getElementById('header').classList.add('header-scroll');
    }
}
window.onscroll = function () {
    onScrollHeader(768);
};



refs.sliderEl.forEach(checkboxInput => {
    checkboxInput.addEventListener('change', () => {
        refs.iconMoon.forEach((iconMoon, idx) => {
            const iconSun = refs.iconSun[idx];

            if (!checkboxInput.checked) {
                iconMoon.classList.add('visibility-hidden');
                iconSun.classList.remove('visibility-hidden');
            } else {
                iconMoon.classList.remove('visibility-hidden');
                iconSun.classList.add('visibility-hidden');
            }
        });
    });
});