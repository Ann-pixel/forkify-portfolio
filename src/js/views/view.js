import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );
    newElements.forEach((newEl, idx) => {
      const curEl = currentElements[idx];

      //Update changed TEXT!!!
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      //Updates changed ATTRIBUTES-- eg- dataset. so we can keep moving b/n servings
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attribute) => {
          curEl.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderError(message = this._errMessage) {
    this._clear();
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href=${icons}#icon-alert-triangle></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSuccessMessage(message = this._successMessage) {
    this._clear();
    const markup = `
      <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
