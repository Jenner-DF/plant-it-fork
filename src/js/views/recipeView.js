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
            <span>${this._data.commonName}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-cycle"></use>
          </svg>
          <span class="recipe__info-text">${this._data.cycle}</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-water"></use>
          </svg>
          <span class="recipe__info-text">${this._data.watering}</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-sun"></use>
          </svg>
          <span class="recipe__info-text">${this._data.sunlight}</span>
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
          <svg class="recipe__info-icon">
            <use href="${icons}.svg#icon-care"></use>
          </svg>
          <h2 class="heading--2">Plant Care Guide</h2>
          <span> Watering:
          Watermelons need a lot of water, especially during the hot summer months. To successfully grow watermelon, water the plant when the top 1-2 inches of the soil is dry. Water deeply and slowly, soaking the soil evenly so that the water reaches the roots. If water runs off of the soil, wait 20 minutes and then water again. Allow the soil to dry slightly between waterings. Water the plants 2 to 3 times a week with 2-3 gallons of water per plant. Avoid wetting the foliage while watering. During a prolonged dry period, or if temperatures exceed 90°F, increase watering to once per day. <br> <br>
          Sunlight: Watermelons require 8 to 10 hours of direct sunlight each day for optimal growth and development. This species of plant grows best in areas with full sun, which is defined as at least 6 hours of direct sunlight, or 8 to 10 hours of sun with some light shade during the hottest parts of the day. For best results, watermelons should receive the majority of their sunlight during the morning hours. Too much direct sunlight during the afternoon can cause the plant's leaves to sunburn, resulting in lower yields. Watermelons are also at risk of diseases, such as powdery mildew, when grown in shady conditions. <br> <br>
          Pruning:Watermelon (Citrullus lanatus) should be pruned shortly after planting. This should involve removing any weak or unhealthy seedlings. After the plant is established, begin by pinching off any lateral runners that are growing away from the main stem, leaving only a few of the strongest ones. Throughout the growing season, selectively prune off older leaves and stems to promote better air circulation and to prevent disease. Pruning of watermelon plants should be done in early to mid-summer as the plant matures. As the vines begin to produce melons, pinch off the ends of the main runners to establish a final trail. Make sure that the fruits are left with enough foliage to protect them from sunburn. Finally, up to 1 week before harvest, remove any remaining vine tips to focus energy on ripening the existing melons.
          
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
