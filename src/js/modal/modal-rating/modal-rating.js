// import Notiflix from 'notiflix';
// import icons from '../../../images/sprite.svg';

const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
    initRatings();

}

function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating); 
    }
    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
        
    }

    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue= rating.querySelector('.rating__value')
    }

    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
        
    }

}
// // DOM Elements
// const starIconGrey = <svg class="icon-star-modal"><use href="${icons}#icon-star-grey"></use></svg>;
// const backdrop = document.querySelector('.add-rating-backdrop');
// const modal = document.querySelector('.add-rating-modal');
// const closeModalBtn = document.getElementById('add-rating-close-btn');
// const form = document.querySelector('.add-rating-form');
// const starChoosed = document.querySelector('.js-rating-choosed');
// const starField = document.querySelector('.starability-slot');
// const addRatingEmail = document.querySelector('.add-rating-email');

// let stars = null;
// let giveRatingBtn = null;
// [ backdrop].forEach(el => {
//   if (el) {
//     el.style.display = 'none';
//   }
// });
// // EVENT LISTENERS
// [closeModalBtn].forEach(el => {
//   if (el) {
//     el.addEventListener('click', closeRecipe);
//   }
// });

// document.addEventListener('keydown', evt => {
//   if (evt.key === 'Escape') {
//     closeRecipe();
//     onClose();
//   }
// });

// if (starField) {
//   starField.addEventListener('click', starRatingChanger);
// }

// if (form) {
//   form.addEventListener('submit', submitRating);
// }

// if (closeModalBtn) {
//   closeModalBtn.addEventListener('click', onClose);
// }


// // Функція для зміни кольору іконок
// function changeColorOfStars() {
//   let icons = document.querySelectorAll('.icon-star-modal');
//   for (let i = 0; i < icons.length; i += 1) {
//     if (i < stars) {
//       icons[i].style.fill = '#FFA500';
//     } else {
//       icons[i].style.fill = '#ffffff1a';
//     }
//   }
// }
// // changeColorOfStars()
//     giveRatingBtn = document.getElementById('give-rating');
//     if (giveRatingBtn) {
//         giveRatingBtn.addEventListener('click', function () {
//             backdrop.style.display = 'block';
//         });
//     }
//     return giveRatingBtn;
// // MODAL-CLOSING
// function closeRecipe() {
//   document.body.style.overflow = 'auto';
// }
// function starRatingChanger() {
//   const selectedRadioButton = starField.querySelector(
//     'input[name="rating"]:checked'
//   );

//   const mail = addRatingEmail.value;
//   const data = {
//     rating: selectedRadioButton ? parseFloat(selectedRadioButton.value) : 0,
//     email: mail,
//   };

//   if (selectedRadioButton !== null) {
//     starChoosed.textContent = ${selectedRadioButton.value}.0;
//   } else {
//     starChoosed.textContent = '0.0';
//   }
// }
// function onClose() {
//   form.reset();
//   backdrop.style.display = 'none';
// }
// function submitRating(e) {
//   e.preventDefault();
//   const selectedRadioButton = starField.querySelector(
//     'input[name="rating"]:checked'
//   );

//   const mail = addRatingEmail.value;
//   const data = {
//     rate: selectedRadioButton ? parseFloat(selectedRadioButton.value) : 0,
//     email: mail,
//   };