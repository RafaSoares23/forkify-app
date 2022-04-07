import * as modal from './model.js';
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
    await modal.loadRecipe(idClicked);

    //2) Rendering Recipe
    recipeView.render(modal.state.recipe);
    
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

      //2) laod on modal the results
      await modal.loadSearchResults(query);

      //3) Render de Search
      resultsView.render(modal.getSearchResults());
      //4) Render initial Pagination Buttons
      paginationView.render(modal.state.search);

    } catch (err) {
      console.log(err);
    }
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();




















// https://forkify-api.herokuapp.com/v2