import icons from '../../img/icons.svg';
import View from './View';
import fracty from 'fracty';

class plantView extends View {
  _parentElement = document.querySelector('.plant');
  _errorMsg = `Cannot find plant data 😢. Try another plant`;
  _Msg = ``;

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerAddBookmarks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  // Opening the plant view on mobile devices
  openPlant = function () {
    const element = document.querySelector('.plant');
    window.addEventListener('hashchange', function () {
      element.classList.add('plant-show');
    });
  };

  // Closing the plant view on mobile devices
  addHandlerClosePlant() {
    this._parentElement.addEventListener('click', function (e) {
      const btnPlantClose = e.target.closest('.plant__btn-close');
      if (!btnPlantClose) return;
      this.classList.remove('plant-show');
    });
  }
  _generateMarkup() {
    return `
    <div class="plant__btn-close">X</div>
    <figure class="plant__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="plant__img" />
          <h1 class="plant__title">
            <span>${this._data.commonName} </span>
            <span><em>${this._data.scientificName} </em></span>
          </h1>
        </figure>

        <div class="plant__details">
          <div class="plant__info">
          <svg class="plant__info-icon">
          <use href="${icons}#icon-cycle"></use>
          </svg>
          <span class="plant__info-text">${this._data.cycle}</span>
          </div>
          <div class="plant__info">
          <svg class="plant__info-icon">
          <use href="${icons}#icon-water"></use>
          </svg>
          <span class="plant__info-text">${this._data.watering}</span>
          </div>
          <div class="plant__info">
          <svg class="plant__info-icon">
          <use href="${icons}#icon-sun"></use>
          </svg>
          <span class="plant__info-text">${this._data.sunlight}</span>
          </div>
          <div class="plant__info">
          <svg class="plant__info-icon">
          <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="plant__info-text">${this._data.careLevel}</span>
          </div>

          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>
        <div class="plant__ingredients">
          <h2 class="heading--2">Plant Description:</h2>
          <span style="text-align: justify">
            ${this._data.description}
          </span>
        </div>
        <div class="plant__ingredients">
          <svg class="plant__info-icon">
            <use href="${icons}.svg#icon-care"></use>
          </svg>
          <h2 class="heading--2">Plant Care Guide</h2>
          <span style="text-align: justify"> <b>Watering:</b>
          ${this._data.careGuide.watering} <br> <br>
          <b>Sunlight:</b> ${this._data.careGuide.sunlight} <br> <br>
          <b>Pruning:</b> ${this._data.careGuide.pruning}
          </span>
        </div>
    `;
  }
}

export default new plantView();
