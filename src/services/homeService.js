import axios from "axios";
import API from "../api/index.js";
//轮播图数据请求
export function homeBannerData() {
	return new Promise((resolve,reject)=>{
		axios.get(API.HOME_BANNER_URL,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(response=>{
			var res = response.data.data.billboards.map(item=>{
				return {
					id: item.id,
					imgUrl: item.imageUrl
				}
			})
			resolve(res);
		})
		.catch(err=>{
			console.log(err)
		})
	})
}

//热映数据请求
export function nowPlayingData(page,count) {
	return new Promise((resolve,reject)=>{
		axios.get(API.NOW_PLAYING_URL,{
			params: {
				__t: new Date().getTime(),
				page,
				count
			}
		})
		.then(response=>{
			let result = response.data.data.films.map(item=>{
				return {
					id: item.id,
					imgUrl: item.cover.origin,
					name: item.name,
					watchCount: item.watchCount,
					cinemaCount: item.cinemaCount,
					grade: item.grade,
					intro: item.intro,
					cover: item.poster.origin,//海报图片
				}
			})
			let totalPage = response.data.data.page.total;
			resolve({
				data: result,
				totalPage
			});
		})
		.catch(err=>{
			console.log(err)
		})
	})
}

//即将热映数据请求
export function comingSoonData(page,count) {
	return new Promise((resolve,reject)=>{
		axios.get(API.COMING_SOON_URL,{
			params: {
				__t: new Date().getTime(),
				page,
				count 
			}
		})
		.then(response=>{
			let result = response.data.data.films.map(item=>{
				return {
					id: item.id,
					name: item.name,
					imgUrl: item.cover.origin,
					time: item.premiereAt,
					intro: item.intro,
					cover: item.poster.origin
				}
			})
			resolve({
				data: result,
				totalPage: response.data.data.page.total
			});
		})
		.catch(err=>{
			console.log(err);
		})
	})
}

//从首页进电影详情页

export function FilmDetailData(id) {
	return new Promise((resolve,reject)=>{
		axios.get(`${API.FILM_DETAIL_URL}/${id}`,{
			params: {
				__t: new Date().getTime()
			}
		})
		.then(response=>{
			let info = response.data.data.film;
			let infoObj = {
				name: info.name,
				imgUrl: info.cover.origin,
				director: info.director,
				actors: info.actors,
				nation: info.nation,
				language: info.language,
				category: info.category,
				time: info.premiereAt,
				synopsis: info.synopsis
			}
			resolve(infoObj);
		})
		.catch(err=>{
			console.log(err)
		})
	})
}