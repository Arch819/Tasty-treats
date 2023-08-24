import axios from 'axios';
import Notiflix from 'notiflix';


  async addRating() {
    try {
      const URL = `https://tasty-treats-backend.p.goit.global/api/recipes/${this.id}/rating`;

      const obj = {
        rate: this.ratingValue,
        email: this.inputValue,
      };

      const responseFromRating = await axios.patch(URL, obj);

      Notiflix.Report.success(
        'Your rating was successfully added,please enter a new Email '
      );
    
    } catch (err) {
      if (err.response.status === 409) {
        Notiflix.Report.failure(
          'You have already rated this recipe',
          err.message
        );
      }
      if (err.response.status === 400) {
        Notiflix.Report.failure(
          'An error occured,plase try again',
          err.message
        );
      }
      ratingBackdrop.classList.remove('visible');
    }
  }

  setRatingValue(rating) {
    this.ratingValue = Number(rating);
  }

  setInpValue(inpValue) {
    this.inputValue = inpValue;
  }
  setId(id) {
    this.id = id;
  }
};
