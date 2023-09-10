import View from './View';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = `No bookmarks yet. :)`;
  _Msg = ``;

  _generateMarkup() {
    console.log(this._data);

    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
