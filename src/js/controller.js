import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js'; //can change name to any if export default
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1) updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 2)loading recipe
    await model.loadRecipe(id); //will pause here until this is done
    // 3)rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
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

const controlServings = function (updateServings) {
  //update the recipe servings (in state)
  model.updateServings(updateServings);
  //update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  // recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmarks(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerCloseRecipe();
  recipeView.openRecipe();
};
init();
console.log('hello world');
console.log('hello world');
console.log('hello world');
