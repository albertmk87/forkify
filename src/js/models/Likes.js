import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default class Likes {
	constructor(){
		this.likes=[];
	}

	addLike(id,title,author,image){
		const newLike={
			id:id,
			title:title,
			author:author,
			image:image
		}
		this.likes.push(newLike);
		this.persistData();
		return newLike;

	}

	deleteLike(id){
		const index=this.likes.findIndex(el=>{
			return el.id===id;
		})
		this.likes.splice(index,1);
		this.persistData();
	}

	isLiked(id){
		return this.likes.findIndex(el=> el.id===id)!==-1;
	}

	getNumOfLikes(){
		return this.likes.length;
	}

	persistData(){
		localStorage.setItem("likes", JSON.stringify(this.likes));
	}
	readStorage(){
		const storage=JSON.parse(localStorage.getItem("likes"));
		if(storage){
				this.likes=storage;
		}
	}
}