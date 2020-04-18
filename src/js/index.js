import Search from "./models/Search.js";
import * as searchView from "./views/searchView.js";
import {elements, renderLoader,clearLoader} from "./views/base.js";
import Recipe from "./models/Recipe.js";
import * as recipeView from "./views/recipeView.js";
import List from "./models/List.js";
import Likes from "./models/Likes.js";
import * as shoppingListView from "./views/shoppingListView.js";
import * as likesView from "./views/likesView.js";
//Global state of the application
//Search object
//Current recipe object
//Shopping list object
//Liked recipes






const state={};
window.state=state;

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
			recipeView.clearRecipeDOM();
			renderLoader(elements.recipeDIV);

			if(state.search){
				searchView.higlight(id)
			};

			//create new recipe object
				state.recipe=new Recipe(id);
				window.r=state.recipe;
			//get recipe data
			await state.recipe.getRecipe();
			//calc time and servings
				state.recipe.calcServings();
				state.recipe.calcTime();
				state.recipe.parseIngredient();
				
			//render the recipe to the UI
			clearLoader();

			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
		}
}


const controlList=()=>{
	if(!state.list){

		state.list=new List();

		state.recipe.ingredients.forEach(ingredient=>{
			const item=state.list.addItem(ingredient.count,ingredient.unit,ingredient.ingredient);
			shoppingListView.renderItem(item);
		})
	}else {
		state.recipe.ingredients.forEach(ingredient=>{
			const item=state.list.addItem(ingredient.count,ingredient.unit,ingredient.ingredient);
			shoppingListView.renderItem(item);
		})
	}
}

//testing
state.likes=new Likes();

const controlLike=()=>{
	if(!state.likes){
		state.likes=new Likes();	
}
		const currentID=state.recipe.id;
		
		if(!state.likes.isLiked(currentID)){
			//стави го лике во стате.ликес низата
			const newLike=state.likes.addLike(currentID,state.recipe.title,state.recipe.author,state.recipe.image);

			//toggle like button da se smeni
			likesView.toggleButton(true);

			//add the like to the UI
		
				likesView.renderLike(newLike);
		
		}else {
			//remove like from the state
			state.likes.deleteLike(currentID);
			//toggle like button
			likesView.toggleButton(false);
			//remove like from the ui
			likesView.deleteLike(currentID);

		}
		console.log(state.likes.getNumOfLikes());
		likesView.toggleMenuLike(state.likes.getNumOfLikes());
}

window.addEventListener("hashchange", controlRecipe);

window.addEventListener("load",controlRecipe);


elements.recipeDIV.addEventListener("click", e=>{
	if(e.target.matches(`.btn--decrease, .btn--decrease *`)){
		if(state.recipe.servings>1){

			state.recipe.updateServings("dec");
		}
	}
	if(e.target.matches(`.btn--increase, .btn--increase *`)){
		state.recipe.updateServings("inc");
	}
	recipeView.updateServings(state.recipe);

})


elements.recipeDIV.addEventListener("click", e=>{
	if(e.target.matches('.recipe__love, .recipe__love *')){
		controlLike();
	}
})



elements.recipeDIV.addEventListener("click", e=>{
if(e.target.matches(`.recipe__btn, .recipe__btn *`)){
		controlList();
}

})

elements.shoppingListDiv.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        shoppingListView.deleteItem(id);

    // Handle the count update
    } else if (e.target.matches('.shopping__count--value')) {
        const val = parseFloat(e.target.value, 10);
      	console.log(val);
        	state.list.updateCount(id, val);
        
        
    }
});


