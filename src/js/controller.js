import "core-js/stable";
import "regenerator-runtime/runtime";
import { MODAL_CLOSE_SEC } from "./config.js";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //loading recipe----
    await model.loadRecipe(id);
    //rendering recipe----
    recipeView.render(model.state.recipe);

    resultsView.update(model.getSearchResultPage());
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultPage());

    //render pagination buttons--
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(gotoPage) {
  //render new results
  resultsView.render(model.getSearchResultPage(gotoPage));
  //render new pagination buttons--
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  //update recipe servings in the state-
  model.updateServings(newServings);
  //update the recipeView-
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  //update recipe view
  recipeView.update(model.state.recipe);

  //render bookmark preview
  bookmarksView.render(model.state.bookmarks);
}
function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}
async function controlAddRecipe(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderSuccessMessage();
    setTimeout(function () {
      addRecipeView.toggleHidden();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(`${err} 🎇`);
    addRecipeView.renderError(err.message);
  }
}
function init() {
  bookmarksView.addHandlerRenderBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdate(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
