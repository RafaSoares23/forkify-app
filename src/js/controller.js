import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipe = async function() {
  try {
    const idClicked = window.location.hash.slice(1);

    if(!idClicked) return
    recipeView.renderSpiner();

    // 0) Update results view to mark selected seach result
    resultsView.update(model.getSearchResults())

    //1) Loading Recipe
    await model.loadRecipe(idClicked);

    //2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch(err) {
    console.error(err);
    recipeView.renderError()
  }
}

const controlSearchResults = async function() {
    try {
      resultsView.renderSpiner();
      //1) get search query
      const query = searchView.getQuery();
      if(!query) return;

      //2) laod on model the results
      await model.loadSearchResults(query);

      //3) Render de Search
      resultsView.render(model.getSearchResults());
      //4) Render initial Pagination Buttons
      paginationView.render(model.state.search);

    } catch (err) {
      console.log(err);
    }
}

function controlPagination(goToPage) {
  //3) Render new pagination
  resultsView.render(model.getSearchResults(goToPage));
  //4) Render new Pagination Buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  //Update the recipe serving (in state)
  model.updateServings(newServings);
  //Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // 1) Add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();




















// https://forkify-api.herokuapp.com/v2