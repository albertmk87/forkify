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
		return newLike;
	}

	deleteLike(id){
		const index=this.likes.findIndex(el=>{
			return el.id===id;
		})
		this.likes.splice(index,1);
	}

	isLiked(id){
		return this.likes.findIndex(el=> el.id===id)!==-1;
	}

	getNumOfLikes(){
		return this.likes.length;
	}

}