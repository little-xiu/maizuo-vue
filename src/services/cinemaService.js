import axios from "axios";
import API from "../api/index.js";
//所有影院列表数据请求
export function getCinemaListData() {
	return new Promise((resolve,reject)=>{
		axios.get(API.CINEMA_LIST_URL,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(res=>{
			let cinemas = res.data.data.cinemas;//数组
			// console.log(cinemas)
			let cityObj = {};
			let result = cinemas.map(item=>{
				let name = item.district.name;
				if(!cityObj[name]) {
					cityObj[name] = {
						name: name,
						show: false,
						data: []
					}
				}
				cityObj[name].data.push(item);
			})
			resolve(cityObj);
			// console.log(cityObj)
		})
		.catch(err=>{
			console.log(err);
		})
	})
}
//通过id获取某个影院信息
//const CINEMA_LIST_URL = '/v4/api/cinema'
export function getCinemaInfo(id) {
	return new Promise((resolve,reject)=>{
		axios.get(`${API.CINEMA_LIST_URL}/${id}`,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(res=>{
			let obj = res.data.data.cinema;
			let takeTickit,glass,parking,gift,traffic;
			obj.services.map(item=>{
				if(item.type == 1) {
					takeTickit = item.description
				} else if(item.type == 2) {
					parking = item.description;
				} else if (item.type == 3) {
					glass = item.description;
				} else if (item.type == 4) {
					gift = item.description;
				} else if (item.type == 5) {
					traffic = item.description;
				} else if (item.type == 6) {
					traffic += '或' + item.description;
				}
				takeTickit = takeTickit ? takeTickit : "暂无信息";
				glass = glass ? glass : "暂无信息";
				parking = parking ? parking : "暂无信息";
				gift = gift ? gift : "暂无信息";
				traffic = traffic ? traffic : "暂无信息";
			})
			let result = {
				id: obj.id,
				name: obj.name,
				address: obj.address,
				telephones: obj.telephones[0],
				parking,
				glass,
				traffic,
				takeTickit,
				gift
			}
			resolve(result);
		})
		.catch(err=>{
			console.log(err);
		})
	})
}

//通兑票信息获取
//https://m.maizuo.com/v4/api/cinema/152/item?__t=1531881870040
export function getExchangeTicket(id) {
	return new Promise ((resolve,reject)=>{
		axios.get(`${API.CINEMA_LIST_URL}/${id}/item`,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(res=>{
			let arr = res.data.data.items;
			let result = arr.map(item=>{
				return {
					name: item.name,
					cinema: item.price.cinema,
					maizuo: item.price.maizuo
				}
			})
			resolve(result);
		})
		.catch(err=>{
			console.log(err);
		})
	})
}

//https://m.maizuo.com/v4/api/preorder/201807184771152841?__t=1531898926897&sign=
//获取购买通票信息
export function getBuyExTicket() {
	return new Promise((resolve,reject)=>{
		axios.get(API.BUY_EXCHANGE_TICKET,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(res=>{
			console.log(res.data);
		})
		.catch(err=>{
			console.log(err);
		})
	})
}


//立即订座页面,电影列表接口: 
//https://m.maizuo.com/v4/api/cinema/243/film?__t=1532051434669
//const SCHEDULE_FILM_URL = '/v4/api';
export function getScheduleFilm (id) {
	return new Promise((resolve,reject)=>{
		axios.get(`${API.SCHEDULE_FILM_URL}/cinema/${id}/film`,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(res=>{
			let arr = res.data.data.filmList;
			let result = arr.map(item=>{
				return {
					filmName: item.filmName,
					img: item.posterAddress,
					grade: item.grade
				}
			})
			resolve(result);
		})
		.catch(err=>{
			console.log(err);
		})
	})
}
//立即订座场次安排 https://m.maizuo.com/v4/api/schedule?__t=1532051104100&film=0&cinema=5230
//const SCHEDULE_ORDER_URL = '/v4/api/schedule';
export function getScheduleTime (id) {
	return new Promise((resolve,reject)=>{
		axios.get(API.SCHEDULE_ORDER_URL,{
			params: {
				__t: new Date().getTime(),
				film: 0,
				cinema: id
			}
		})
		.then(res=>{
			let resArr = res.data.data.schedules;
			let obj = {};
			let result = resArr.map(item=>{
				return {
					name: item.film.name,
					language: item.film.language,
					hallName: item.hall.name,
					imagery: item.imagery,
					cinemaPrice: item.price.cinema,
					maizuoPrice: item.price.maizuo,
					showAt: item.showAt,
					stopSellingAt: item.stopSellingAt
				}
			})
			console.log(result);
			resolve(result);
		})
		.catch(err=>{
			console.log(err);
		})
	})
}

//获取所有城市列表
export function getCityListData() {
	return new Promise((resolve,reject)=>{
		axios.get(API.CITY_LIST_URL,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(res=>{
			let arr = res.data.data.cities;
			let obj = {};
			arr.map(item=>{
				let letter = item.pinyin[0];
				if(!obj[letter]) {
					obj[letter] = [];
				}
				obj[letter].push(item)
			})
			//把对象转数组进行字母排序
			let cityArr = Object.keys(obj).map(key=>{
				return {
					letter: key,
					data: obj[key]
				}
			})
			//从小到大冒泡排序
			for(let i = 0; i < cityArr.length-1; i++) {
				for(let j = 0; j < cityArr.length-1-i; j++) {
					if(cityArr[j].letter > cityArr[j+1].letter) {
						let tmp = cityArr[j];
						cityArr[j] = cityArr[j+1];
						cityArr[j+1] = tmp;
					}
				}
			}
			console.log(cityArr)
			// console.log(arr)
			// console.log(obj)
			resolve(cityArr);
		})
		.catch(err=>{
			console.log(err)
		})
	})
}