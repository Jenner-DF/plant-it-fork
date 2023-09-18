import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import plantView from './views/plantView.js'; //can change name to any if export default
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

async function controlPlants() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    plantView.renderSpinner();
    //update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1 updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 2 loading recipe
    await model.loadPlant(id); //will pause here until this is done
    // 3 rendering recipe
    plantView.render(model.state.plant);
  } catch (error) {
    plantView.renderError(error);
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query
    const userQuery = searchView.getQuery();
    if (!userQuery) return;
    //load search query
    await model.loadSearchResults(userQuery);
    //render query
    resultsView.render(model.getSearchResultsPage());
    //render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  console.log(`hi! ${goToPage}`);
  //render the page selected
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render page number
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.plant.bookmarked) {
    model.addBookmark(model.state.plant);
  } else model.deleteBookmark(model.state.plant.id);

  console.log(model.state.plant);
  //update recipe view
  plantView.update(model.state.plant);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  plantView.addHandlerRender(controlPlants);
  plantView.addHandlerAddBookmarks(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  plantView.addHandlerClosePlant();
  plantView.openPlant();
};
init();
