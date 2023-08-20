import { refs } from "./refs";




export function toggleModal() {
    refs.modulWindow.classList.toggle('is-visible');
    modalIsOpen();
}

export function modalIsOpen() {
    if (refs.modulWindow.classList.contains('is-visible')) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
}


refs.openModalButton.addEventListener('click', toggleModal);
refs.closeModalButton.addEventListener('click', toggleModal);

refs.modulWindow.addEventListener('click', (event) => {

    if (!event.target.closest('.mobile-menu-content')) {
        toggleModal();

    }
});