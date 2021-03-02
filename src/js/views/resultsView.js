import icons from "url:../../img/icons.svg";

import View from "./view.js";
class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = "Oh, Snap! I think there's a typo your query. Try again!";
  _successMessage = "";

  _generateMarkup() {
    return this._data.map((recipe) => this._generateMarkupRes(recipe)).join("");
  }
  _generateMarkupRes(recipe) {
    return `
    <li class="preview">
    <a class="preview__link " href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image}" alt="${recipe.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        
      </div>
    </a>
  </li>
      `;
  }
}
export default new ResultsView();
