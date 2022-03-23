import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as modal from './modal.js';
import recipeView from './views/recipeView.js';



const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipe = async function () {
  recipeView.renderSpinner();
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // 1.Loading the recipe
     await modal.loadRecipe(id);

    // 2. Rendering the recipe

    recipeView.render(modal.state.recipe)

    
  } catch (err) {
    alert(err);
  }
};
controlRecipe();

['hashchange', 'load'].forEach((ev) => window.addEventListener(ev, controlRecipe));

