import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //loading recipe----
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    console.log(model.state.recipe);
    //rendering recipe----
    recipeView.render(model.state.recipe);
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
  recipeView.render(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdate(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
