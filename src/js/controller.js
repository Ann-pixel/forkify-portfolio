import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //loading recipe----
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    //rendering recipe----
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
}
init();
