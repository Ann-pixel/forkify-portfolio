import { API_URL, RESULTS_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};
//only changes state obj.
export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    console.log(recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.log(`${err} 🎃`);
    throw err;
  }
}
export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;

    state.search.results = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.log(`${err} 🎃`);
    throw err;
  }
}

export function getSearchResultPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach((ingr) => {
    ingr.quantity = (ingr.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
}
