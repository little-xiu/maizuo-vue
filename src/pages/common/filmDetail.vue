<template>
	<div>
		<app-content>
			<img :src="filmInfo.imgUrl" class="film-img">
			<div class="film-main">
				<h4 class="title"><span class="icon"></span>影片简介</h4>
				<p class="film-item">
					导演: {{filmInfo.director}}
				</p>
				<p class="film-item">
					主演: {{filmInfo.actors | actorsFilter}}
				</p>
				<p class="film-item">
					地区语言: {{filmInfo.nation}}({{filmInfo.language}})
				</p>
				<p class="film-item">
					类型: {{filmInfo.category}}
				</p>
				<p class="film-item">
					上映日期: {{filmInfo.time | dateFilter("date")}}上映
				</p>
				<p class="film-des">
					{{filmInfo.synopsis}}
				</p>
			</div>
		</app-content>
		<div class="buy-btn" v-if="filmBuy">
			<button class="btn" @click="buyAct">立即购买</button>
		</div>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
import {FilmDetailData} from "../../services/homeService.js";
import dataStore from "../../utils/dataStore.js";
	export default {
		props: ["id","buy"],
		data () {
			console.log(this.id)
			// 刷新页面从地址栏获取的值是字符串,字符串布尔值不好判断
			let id = this.id;
			let buy = this.buy;
			if(typeof id != "number") {
				id = Number(id);
			}
			if(typeof buy != "boolean") {
				buy = buy == "true" ? true : false;
			}
			return {
				filmId: id,
				filmBuy: buy,
				filmInfo: dataStore.getFilmInfo
			}
		},
		methods: {
			buyAct () {
				this.$router.push({
					name: "home-cinema",
					params: {
						cinemaId: this.filmInfo.id
					}
				})
			}
		},
		mounted() {
			FilmDetailData(this.filmId).then(data=>{
				this.filmInfo = data;
				//跳转电影详情页后头部的标题改变为电影名称
				this.$pubsub.$emit("replaceTitle",this.filmInfo.name);
			})
		}
	}
</script>
<style scoped>
	.film-img {
		width: 100%;
	}
	.title {
		margin: .32rem auto;
		border-left: .32rem solid RGB(228, 200, 156);
		font-size: .32rem;
		padding-left: .08rem;
	}
	.film-main {
		padding-left: .4rem;
	}
	.film-item {
		margin-bottom: .2rem;
		height: .36rem;
	}
	.film-des {
		margin-bottom: 1.6rem;
		padding-right: .4rem;
	}
	.buy-btn {
		position: absolute;
		left: 0;
		bottom: .4rem;
		width: 100%;
		text-align: center;
	}
	.buy-btn .btn {
		font-size: .28rem;
		min-width: 3.12rem;
		height: .72rem;
		line-height: .72rem;
		border: none;
		background-color: #fe8233;
		padding: 0;
		margin: 0;
		border-radius: .36rem;
		color: #fff;
		-webkit-transition: 0.5s ease;
	}
</style>