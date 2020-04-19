import {elements} from "./base.js";
import { limitTitle } from "./SearchView.js";


export const renderLike=(like)=>{
	const markUp=
	`
		 <li>
             <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="${like.image}" alt="Test">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${limitTitle(like.title,17)}</h4>
                        <p class="likes__author">${like.author}</p>
                    </div>
             </a>
        </li>	
	`;
	elements.likesListDiv.insertAdjacentHTML("beforeend", markUp);

}

export const deleteLike=(id)=>{
	const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
	el.parentElement.removeChild(el);
}


export const toggleButton=(isLiked)=>{
		const iconString=isLiked ? "#icon-heart" : "#icon-heart-outlined";
		document.querySelector(".recipe__love use").setAttribute("href",`img/icons.svg${iconString}`);
		
}

export const toggleMenuLike=numOfLikes=>{
	elements.likesMenuDiv.style.visibility = numOfLikes > 0 ? "visible" : "hidden";	
}