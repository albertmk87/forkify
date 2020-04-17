import {elements} from "./base.js";

export const renderItem=(item)=>{
		const markUp=
		`

		    <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input class="shopping__count--value" type="number" value="${item.count}" step="${item.count}">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

		`;
		elements.shoppingListDiv.insertAdjacentHTML("beforeend", markUp);

}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
     item.parentElement.removeChild(item);
};