import icons from "url:../../img/icons.svg";
import PreviewView from "./previewView.js";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errMessage = "Oh, Snap! I think there's a typo your query. Try again!";
  _successMessage = "";
}

export default new ResultsView();
