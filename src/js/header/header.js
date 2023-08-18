const openModalButton = document.querySelector('.open-modal-button');
const modulWindow = document.querySelector('.mobile-menu');
const mobileMenuContent = document.querySelector('.mobile-menu-content');
const closeModalButton = document.querySelector('.close-modal-button');
const input = document.querySelector('.mobile-menu input');






openModalButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);
modulWindow.addEventListener('click', (event) => {
    if (!event.target.closest('.mobile-menu-content')) {
        toggleModal();
    }
});

function toggleModal() {
    modulWindow.classList.toggle('is-hidden');
}


const svgList = document.querySelector('.svg-list');
const switcher = document.querySelector('.switch');
const mediaQuery = window.matchMedia('(min-width: 768px)');


// function handleMediaQuery(event) {
//     if (event.matches) {
//         // Добавляем элемент в главное меню
//         svgList.replaceChild(switcher, openModalButton);
//     } else {
//         // Возвращаем openModalButton в svgList
//         svgList.replaceChild(switcher, openModalButton);
//     }
// }

// // Добавляем слушатель для изменения медиа-запроса
// mediaQuery.addEventListener('change', handleMediaQuery);

// // Инициализируем обработку медиа-запроса
// handleMediaQuery(mediaQuery);


