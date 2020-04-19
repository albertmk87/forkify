import {elements} from "./base.js";


export const getInput =()=>{
	return elements.searchInput.value;
}

export const clearInput=()=>{
	elements.searchInput.value="";
}
export const clearDOM=()=>{
	elements.recipesDOM.innerHTML="";
}
export const clearButtonDOM=()=>{
	elements.buttonDIV.innerHTML="";
}

export const limitTitle=(title,max)=>{
	const newArr=[];

	if(title.length>max){
		title.split(" ").reduce((acc,cur)=>{
			if(acc+cur.length<=max){
				newArr.push(cur);
			}
			return acc+cur.length;
		},0);
		return `${newArr.join(" ")} ...`;
	}else{
	
		return title;
	}
	
}


const createButton=(page,type)=>{

           return  `<button class="btn-inline results__btn--${type}" data-goto=${type==="prev" ? page-1 : page+1}>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type==="prev" ? "left" : "right"}"></use>
                </svg>
                   <span>Page ${type==="prev" ? page-1 : page+1}</span>
            </button>`
                
             
}

const renderButtons=(page,numOfResults,resPerPage)=>{
	let button;
	const pages=Math.ceil(numOfResults/resPerPage);
	if(page===1 && pages>1){
		button=createButton(page,"next");
	}else if(page<pages){
		button=
        `
		${createButton(page,"prev")}
		${createButton(page,"next")}
		`
	}else if(page===pages && pages>1){
		button=createButton(page,"prev");

	}
	elements.buttonDIV.insertAdjacentHTML("afterbegin", button);
}

const renderRecipe=(recipe)=>{
	const markUp=`
	<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
             </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitle(recipe.title,17)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
          </a>
    </li>
	`
	elements.recipesDOM.insertAdjacentHTML("beforeend", markUp);
}


export const renderResults=(recipes,page=1,resPerPage=10) =>{
			const start=(page-1)*resPerPage;
			const end=page*resPerPage;

			recipes.slice(start,end).forEach(recipe=>{
		
			renderRecipe(recipe);
			
		})
			renderButtons(page,recipes.length,resPerPage);
}

export const higlight=(id)=>{
	let allLi=Array.from(document.querySelectorAll('.results__link'));
	console.log(allLi);	
	allLi.forEach(el=>{
		el.classList.remove("results__link--active");
	})
	document.querySelector(`a[href="#${id}"]`).classList.add("results__link--active");
}