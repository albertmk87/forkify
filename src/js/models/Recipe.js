import axios from "axios";


export default class Recipe {
	constructor(id){
		this.id=id;
	}

	async getRecipe(){

		try{

     const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
	    this.title=res.data.recipe.title;
	    this.author=res.data.recipe.publisher;
	    this.image=res.data.recipe.image_url;
	    this.url=res.data.recipe.source_url;
	    this.ingredients=res.data.recipe.ingredients;
		}catch(error){
			console.log(error);
		}
	}

	calcTime(){
		const numIng=this.ingredients.length;
		const periods=Math.ceil(numIng/3);
		this.time=periods*15;
	}

	calcServings(){
		this.servings=4;
	}

	    parseIngredient() {

	 //две низи од зборови што ќе ги замениме со помали зборови
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    
   //итерираме низ низата на состојки
        const newIngredients = this.ingredients.map(el => {
      //секоја состојка со мали букви     
            let ingredient = el.toLowerCase();
    //итерираме низ првата низа со долги зборови и заменуваме во
    // секоја состојка(ingredient) зборото доколку го има во долгата низа
    //со збор од малата низа
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

   	//доколку има во секоја состојка некое објаснување во загради го острануваме	  
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

     //правиме нова низа од секоја состојка     
            const arrIng = ingredient.split(' ');
     //го бараме индексот на местото во низата на состојките каде што постоит
     //зборот пример 'tbsp' , 'oz'......
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            //ako ima takov zbor togas unitIndex ke bide pogolemo od -1
            if (unitIndex > -1) {
          //pravime arrCount i i pravime slice na nizata od sostojkata od 0 do toj indeks 
          //bez toj indeks za da go dobieme brojot pr 1 tbsp ili 1/2 tbsp ke vrati 1
          //ili 1/2 vo arrCount 
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                //ako arrCount ===1 znaci ima eden broj osven ako ima 1-1/2 togas gi sobirame
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
               //inakku ako e primer 1 1/2 togas stavame plus 1+1/2 i povtorno gi sobirame 	
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                //object sto ke go vratime mu stavame count da bide count
                //odnostno brojot unit da bide nizata kaj sto e indeksot na tbsp,oz....
                //a objasnuvanjeto na sostojkata od toj indeks plus 1 do kraj .join za da bide string
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
        //ako nema takov indeks odnosno nema tbsp,oz zborce a prviot el e broj
            } else if (parseInt(arrIng[0], 10)) {
         //count e prviot element, unit e prazno nema tbsp,oz i objasnuvawnjett
         //e se ostaanato
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
        //ako nema tbsp,oz... i nema broj na prvoto mesto od nizata        
            } else if (unitIndex === -1) {
            //count e 1 se podrazbira primer tomato juice ke bide 1 tomato juice
            //unit e pak prazno bidejki nema tbsp,oz//// 
            //a ingredient e cel string
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
           //go vrakame objectot vo koj za sekoj ingredient ke napravi obj vo this.ingredients
            return objIng;
        });
        this.ingredients = newIngredients;
    }

}