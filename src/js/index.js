import Search from "./models/Search.js";
import * as searchView from "./views/searchView.js";
import {elements, renderLoader,clearLoader} from "./views/base.js";
import Recipe from "./models/Recipe.js";


//Global state of the application
//Search object
//Current recipe object
//Shopping list object
//Liked recipes






const state={};

const controlSearch=async ()=>{
	// 1. get the query from the view
	const query=searchView.getInput();
	if(query){
		// 2. New search object and add to state
		state.search=new Search(query);

		//3. Prepare UI for results
			searchView.clearInput();
			searchView.clearDOM();
			renderLoader(elements.recipesResultDIV);
		//4 Search for recipes

		await state.search.getResults();

		//5. Render results on UI
		clearLoader();
		searchView.renderResults(state.search.result);
	}
}

elements.searchForm.addEventListener("submit", e=>{
	e.preventDefault();
    controlSearch();
})



elements.buttonDIV.addEventListener("click", (e)=>{
	const btn=e.target.closest(".btn-inline");
	if(btn){
		const page=parseInt(btn.dataset.goto,10);
		searchView.clearDOM();
		searchView.clearButtonDOM();
		searchView.renderResults(state.search.result,page);	
	}
})

const controlRecipe=async ()=>{
		const id=window.location.hash.substring(1);

		if(id){

			//prepare UI for Changes



			//create new recipe object
				state.recipe=new Recipe(id);
				window.r=state.recipe;
			//get recipe data
			await state.recipe.getRecipe();
			//calc time and servings
				state.recipe.calcServings();
				state.recipe.calcTime();
				state.recipe.parseIngredient();
				console.log(state.recipe.ingredients)
			//render the recipe to the UI
			console.log(state.recipe);
		}
}

window.addEventListener("hashchange", controlRecipe);

window.addEventListener("load",controlRecipe);