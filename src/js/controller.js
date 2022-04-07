import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();




















// https://forkify-api.herokuapp.com/v2