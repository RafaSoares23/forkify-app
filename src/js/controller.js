import * as modal from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';



// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const controlRecipe = async function() {
  try {
    const idClicked = window.location.hash.slice(1);

    if(!idClicked) return
    recipeView.renderSpiner();

    //1) Loading Recipe
    await modal.loadRecipe(idClicked);
    // const {recipe} = modal.state;

    //2) Rendering Recipe
    recipeView.render(modal.state.recipe);
    
  } catch(err) {
    console.error(err);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
}
init();