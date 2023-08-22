import Notiflix from 'notiflix';
const orderModal = () => {
  const refs = {
    openModalBtn: document.querySelectorAll('.create-order-link'),
    closeModalBtn: document.querySelector('.close'),
    sendBtn: document.querySelector('.submit-btn'),

    modal: document.getElementById('modal'),
    modalContent: document.querySelector('.order-modal'),

    buttonToSimulateClick: document.querySelector('#imitation'),
  };

  // console.log(refs.openModalBtn);
  // refs.buttonToSimulateClick.addEventListener('click', toggleModal);
  refs.openModalBtn.forEach(button => {
    button.addEventListener('click', toggleModal);
  }
  );

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

  const form = document.getElementById('order-form');
  const sendBtn = document.querySelector('.submit-btn');
  const inputs = form.querySelectorAll('.input-js');

  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      validateInput(input);
      checkFormValidity();
    });
  });
  function validateInput(input) {
    if (input.checkValidity()) {
      input.classList.add('valid');
      input.classList.remove('invalid');
    } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
    }
  }
  function checkFormValidity() {
    let isValid = true;

    inputs.forEach(function (input) {
      if (!input.checkValidity()) {
        isValid = false;
      }
    });

    if (isValid) {
      sendBtn.removeAttribute('disabled');
    } else {
      sendBtn.setAttribute('disabled', 'disabled');
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),

        comment: form.comment.value.trim(),

        comment: form.comment.value.trim()


      };
      if (
        formData.name === '' ||
        formData.phone === '' ||
        formData.email === ''
      ) {
        Notiflix.Report.failure('Please fill out all required fields.');
        return;
      }
      // Збереження даних у localStorage
      saveFormDataToLocalStorage(formData);
      console.log(`https://tasty-treats-backend.p.goit.global/api/orders/add&{
            name: ${formData.name},
            phone: ${formData.phone},
            email: ${formData.email},
            comment:${formData.comment},
        }`);

      Notiflix.Report.success("Your order has successfully been sent. Thank you!", "OK");

      form.reset();

      setTimeout(() => {
        toggleModal();
      }, 1000);
    } else {
      Notiflix.Report.failure('Please enter valid data.');
    }
  });

  // Збереження даних у localStorage
  function saveFormDataToLocalStorage(formData) {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    storedData.push(formData);
    localStorage.setItem('storedData', JSON.stringify(storedData));
  }
};

orderModal();
export default orderModal;
