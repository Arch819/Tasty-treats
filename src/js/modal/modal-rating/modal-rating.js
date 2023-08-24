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
const backdrop = document.querySelector('.add-rating-backdrop');
document.addEventListener('click', function (event) {
  // Перевірка, чи було натиснуто кнопку "Open Modal"
  if (event.target.classList.contains('js-rating')) {
    // Рендерінг модального вікна і кнопки "Give a rating"
    const closeModalBtn = document.getElementById('add-rating-close-btn');
    const modal = document.querySelector('.add-rating-modal')
    openModal()
    closeModalBtn.addEventListener('click', closeModal);
  }
})


function openModal() {
  backdrop.style.display = 'block';
  backdrop.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('add-rating-backdrop')) {
    return
    }
    closeModal()
  }  )
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closeModal()
  }
  });
  
}

function closeModal() {
  
  backdrop.style.display = 'none';
  document.removeEventListener('keydown', evt => {
    if (evt.key === 'Escape')
    {
      closeModal()
    }
  })
}