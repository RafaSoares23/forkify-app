// import { async } from 'regenerator-runtime';
import { API_URL , RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
}

export const loadRecipe = async function(idClicked) {
    try {
        const data = await getJSON(`${API_URL}${idClicked}`);
        
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients, 
        }
        state.search.page = 1;
        //console.log(state.recipe);

        if(state.bookmarks.some(bookmark => bookmark.id === idClicked))
            state.recipe.bookmarked = true;
            else state.recipe.bookmarked = false;
        

    } catch (err) {
        console.error(`${err} 😫😫`);
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })

        //console.log(state.search.results);
    } catch (err) {
        console.error(`${err} 😫😫`);
        throw err;
    }
}

export function getSearchResults(page = state.search.page) {
    state.search.page = page;

    const start = (page -1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 10

    return state.search.results.slice(start, end);
}

export function updateServings(newServings) {
    state.recipe.ingredients.forEach( ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
        // newQt = oldQt * newServing / oldServings // 2 * 8 / 4 = 4
    });

    state.recipe.servings = newServings;
}

//BOOKMARK
export function addBookmark(recipe) {
    //Add bookmark
    state.bookmarks.push(recipe)
    //Mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}

export function deleteBookmark(id) {
    //Delete Bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

     //Mark current recipe as NOT bookmark
     if(id === state.recipe.id) state.recipe.bookmarked = false;
}