import Notiflix from 'notiflix';
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
    ratingValue = rating.querySelector('.rating__value')
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
        
  }
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener('mouseenter', function () {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener('mouseleave', function (e) {
        setRatingActiveWidth();
    
      });
  
      ratingItem.addEventListener('click', function (e) {
        initRatingVars(rating);
        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      });
    }
    async function setRatingValue(value, rating) {
      if (!rating.classList.contains('rating_sending')) {
        rating.classList.add('rating_sending');
        let response = await fetch('https://tasty-treats-backend.p.goit.global/api/recipes/', {
          method: 'GET',

        });
        if (response.ok) {
          const result = await response.json();
          const newRating = result.newRating;
          ratingValue.innerHTML = newRating;
          setRatingActiveWidth();
          rating.classList.remove('rating_sending');
        } else {
          alert('error');

          rating.classList.remove('rating_sending');
        }
          
        }
      }
    }
  }


// DOM Elements
// const starIconGrey = <svg class="icon-star-modal"><use href="${icons}#icon-star-grey"></use></svg>;
const backdrop = document.querySelector('.add-rating-backdrop');
const modal = document.querySelector('.add-rating-modal');
const closeModalBtn = document.getElementById('add-rating-close-btn');
const form = document.querySelector('.add-rating-form');
// const starChoosed = document.querySelector('.js-rating-choosed');
// const starField = document.querySelector('.starability-slot');
const addRatingEmail = document.querySelector('.add-rating-email');
const opnElements = document.getElementsByClassName('js-rating');
for (const opn of opnElements) {
    opn.addEventListener('click', () => {
        // modal.style.display = 'block';
      backdrop.style.display = 'block';
      backdrop.style.zIndex = '9999';
    });
// console.log(opn)
// console.log()
// opn.addEventListener('click', () => {modal.style.display = 'block';
//   backdrop.style.display = 'block';
};
    


// console.log(opn);
// console.log(opn.currentTurget);
// let stars = null;
// let giveRatingBtn = null;
[backdrop].forEach(el => {
  if (el) {
    el.style.display = 'none';
  }
});
// EVENT LISTENERS
document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {

    onClose();
    console.log(' text `click esc`')
  }
});

if (form) {
  form.addEventListener('submit', submitRating);
  console.log("форма закрита")
}

if (closeModalBtn||Escape) {
  closeModalBtn.addEventListener('click', onClose);
  console.log('X')
}
function onClose() {
  // form.reset();
  backdrop.style.display = 'none';
}
function submitRating(e) {
    e.preventDefault();
    const selectedRadioButton = starField.querySelector(
        'input[name="rating"]:checked'
    );

    const mail = addRatingEmail.value;
    const data = {
        rate: selectedRadioButton ? parseFloat(selectedRadioButton.value) : 0,
        email: mail,
    };
}