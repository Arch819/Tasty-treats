import { refs } from "./refs";


import { toggleModal, modalIsOpen } from "./_modal-window";



const iconMoons = refs.iconMoon;
const iconSuns = refs.iconSun;

iconMoons.forEach((iconMoon, idx) => {
    const iconSun = iconSuns[idx];

    refs.sliderEl.forEach(checkboxInput => {
        checkboxInput.addEventListener('change', () => {
            const isChecked = checkboxInput.checked;

            iconSun.classList.toggle('visibility-hidden', isChecked);
            iconMoon.classList.toggle('visibility-hidden', !isChecked);
        });


        const isChecked = checkboxInput.checked;

        iconSun.classList.toggle('visibility-hidden', !isChecked);
        iconMoon.classList.toggle('visibility-hidden', isChecked);
    });
});




const currentPath = window.location.pathname;
console.log(currentPath);

const navigationLinksArray = Array.from(refs.navigationLinks);
const hasActiveLink = navigationLinksArray.some(link => link.getAttribute('href') === currentPath);


if (!hasActiveLink) {
    refs.navigationLinks[0].classList.add('current-link');
} else {
    refs.navigationLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('current-link');
        } else {
            link.classList.remove('current-link');
        }
    });
}



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



// if (checkboxInput.checked) {
//     iconMoon.classList.add('visibility-hidden');
//     iconSun.classList.remove('visibility-hidden');
// }

