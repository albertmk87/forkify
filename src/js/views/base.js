export const elements={

searchInput:document.querySelector(".search__field"),
searchForm:document.querySelector(".search"),
recipesDOM:document.querySelector(".results__list"),
recipesResultDIV:document.querySelector(".results"),
buttonDIV:document.querySelector(".results__pages"),
recipeDIV:document.querySelector(".recipe"),
shoppingListDiv:document.querySelector(".shopping__list"),
likesMenuDiv:document.querySelector(".likes__field"),
likesListDiv:document.querySelector(".likes__list")
}

export const elementsStrings={
	loader:"loader"
}

export const renderLoader=(parent)=>{
	const loader=`
	<div class="${elementsStrings.loader}">
		<svg>
			<use href="img/icons.svg#icon-cw"></use>
		</svg>
	</div>
	`
	parent.insertAdjacentHTML("afterbegin",loader);
}

export const clearLoader=()=>{
	const loader=document.querySelector(`.${elementsStrings.loader}`)
	if(loader){
		loader.parentElement.removeChild(loader);
	}
}