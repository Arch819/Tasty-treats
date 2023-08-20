import { refs } from "./refs";

refs.openModalButton.addEventListener('click', toggleModal);
refs.closeModalButton.addEventListener('click', toggleModal);
refs.modulWindow.addEventListener('click', (event) => {
    if (!event.target.closest('.mobile-menu-content')) {
        toggleModal();
    }
});
function toggleModal() {

    refs.modulWindow.classList.toggle('is-visible');
}

const currentPath = window.location.pathname;

refs.navigationLinks.forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('current-link');
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