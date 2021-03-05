import icons from "url:../../img/icons.svg";

import PreviewView from "./previewView.js";
class BookmarksView extends PreviewView {
  _parentElement = document.querySelector(".bookmarks__list");
  _errMessage =
    "Couldn't find any bookmarks for you. Mark your favorite recipes & find them here!";
  _successMessage = "";
  addHandlerRenderBookmark(handler) {
    window.addEventListener("load", handler);
  }
}
export default new BookmarksView();
