import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (evt) {
      const btn = evt.target.closest(".btn--inline");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page1 + more pages
    if (currentPage === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next" data-goto = "${
        currentPage + 1
      }">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //page1 & no other pages
    if (currentPage === 1 && numPages === 1) {
      return ``;
    }
    if (currentPage === numPages && numPages > 1) {
      //Last page
      return `<button class="btn--inline pagination__btn--prev" data-goto = "${
        currentPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    }
    //other page in the middle
    if (currentPage < numPages) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto = "${
        currentPage - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next" data-goto = "${
      currentPage + 1
    }">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    }
  }
}

export default new PaginationView();
