import axios from "axios";
import API from "../api/index.js";
export function getLoginData() {
	return new Promise((resolve,reject)=>{
		axios.post(API.Login_URL, {
				__t: new Date().getTime()
			})
	})
	.then(res=>{
		console.log(res)
	})
	.catch(err=>{
		console.log(err);
	})
}