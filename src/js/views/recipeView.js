import icons from 'url:../../img/icons.svg';
import View from './View';
import fracty from 'fracty';

class recipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMsg = `could not find recipe. please try another.`;
  _Msg = ``;

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo; //convert to int
      if (updateTo > 0) handler(updateTo);
    });
  }
  addHandlerAddBookmarks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.commonName} </span>
            <span><em>${this._data.scientificName} </em></span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-text">${this._data.cycle}</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-text">${this._data.watering}</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-text">${this._data.sunlight}</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-text">${this._data.careLevel}</span>
          </div>

          <div class="recipe__user-generated">
           
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Plant Description:</h2>
          <span>
            ${this._data.description}
          </span>
        </div>
        <div class="recipe__ingredients">
          <h2 class="heading--2">Plant Care Guide</h2>
          <span> Watering:
          ${this._data.careGuide.watering} <br> <br>
          Sunlight:  ${this._data.careGuide.sunlight} <br> <br>
          Pruning: ${this._data.careGuide.pruning}
          </span> 
        </div>
    `;
  }

  _generateMarkupIngredients(ingredient) {
    return ` <li class="recipe__ingredient">
   <svg class="recipe__icon">
     <use href="${icons}.svg#icon-check"></use>
   </svg>
   <div class="recipe__quantity">${
     ingredient.quantity ? fracty(ingredient.quantity).toString() : 'as desired'
   }</div>
   <div class="recipe__description">
     <span class="recipe__unit">${ingredient.unit}</span>
     ${ingredient.description}
   </div>
 </li>`;
  }
}

export default new recipeView();
