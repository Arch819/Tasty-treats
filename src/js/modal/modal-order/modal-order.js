const refs = {
    openModalBtn: document.querySelectorAll('.create-order-link'),
    closeModalBtn: document.querySelector('.close'),
    modal: document.querySelector('[data-modal]'),
    modalContent: document.querySelector('.order-modal'),
    
    buttonToSimulateClick: document.querySelector('#imitation'),
  };

console.log(refs.openModalBtn);
  refs.buttonToSimulateClick.addEventListener('click', toggleModal);
  refs.openModalBtn.forEach(button => {button.addEventListener('click', toggleModal);})


  refs.closeModalBtn.addEventListener('click', event => {
    event.stopPropagation();
    toggleModal();
  });


  refs.modalContent.addEventListener('click', event => {
    event.stopPropagation();
  });


  refs.modal.addEventListener('click', event => {
    event.stopPropagation();
    toggleModal();
  });


  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (!refs.modal.classList.contains('is-hidden')) {
        toggleModal();
      }
    }
  });


function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    if (refs.modal.classList.contains('is-hidden')) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }