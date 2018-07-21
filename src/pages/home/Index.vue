<template>
	<div>
		<app-content ref="content">
		  <swiper class="banner" ref="banner">
		  	<swiper-item v-for="item in bannerList" :key="item.id">
		  		<img :src="item.imgUrl" class="img">
		  	</swiper-item>
		  </swiper>
		  <ul class="now-playing">
		  	<li class="now-playing-item" v-for="item in nowPlayingList" :key="item.id" @click="goPlayingDetail(item)">
		  		<img :src="item.imgUrl" class="img">
		  		<p class="name">{{item.name}}</p>
		  		<p class="info">
		  			<span>{{item.cinemaCount}}</span>家影院上映 
		  			<span>{{item.watchCount}}</span>人购票
		  		</p>
		  		<span class="grade">{{item.grade}}</span>
		  	</li>
		  	<li class="more" @click="goFilmsPage('playing')">更多热映电影</li>
		  </ul>
			<div class="divide-line"><span class="txt">即将上映</span></div>
			<ul class="coming-soon">
				<li v-for="item in comingSoonList" :key="item.id" class="coming-soon-item" @click="goComingDetail(item)">
					<img :src="item.imgUrl" class="img">
					<p class="name">{{item.name}}</p>
					<span class="time">{{item.time | dateFilter}}上映</span>
				</li>
				<li class="more" @click="goFilmsPage('coming')">更多即将上映电影</li>
			</ul>
		</app-content>
		<router-view></router-view>
	</div>
</template>
<script>
	import swiper from "../../common/swiper.vue";
	import swiperItem from "../../common/swiperItem.vue";
	import dataStore from "../../utils/dataStore.js";
	import {homeBannerData,nowPlayingData,comingSoonData} from "../../services/homeService.js";
	export default {
		components: {
			swiper,
			swiperItem
		},
		data () {
			return {
				bannerList: [],
				nowPlayingList: [],
				comingSoonList: []
			}
		},
		methods: {
			goFilmsPage (flag) {
				this.$router.push({
					name: "films",
					params: {
						flag
					}
				})
			},
			goComingDetail(item) {
				//将下一个页面的值存放起来
				dataStore.setFilmInfo(item);
				//头部换成电影名字
				// this.$pubsub.$emit("replaceToFilmName",item.name);
				//再进入页面
				this.$router.push({
					name: "home-detail",
					params: {
						id: item.id,
						buy: false
					}
				})
			},
			goPlayingDetail(item) {
				dataStore.setFilmInfo(item);
				this.$router.push({
					name: "home-detail",
					params: {
						id: item.id,
						buy: true
					}
				})
			}
		},
		mounted() {//轮播数据请求
			homeBannerData().then(data=>{
				this.bannerList = data;//Dom更新渲染后通过this.$nextTick里的回调更新swiper
				this.$nextTick(()=>{
					//通过ref操作组件,调用组件里的方法
					this.$refs.banner.updataSwiper();
				})
			})
			//正在热映数据请求
			nowPlayingData(1,5).then(({data})=>{
				this.nowPlayingList = data;
				//数据请求回来Dom渲染后,需对IScroll进行更新(IScroll最大滚动距离计算等),因为有很多数据如图片请求,所以直接在beforeScrollStart的方法里,进行IScroll的更新
			})
			//即将热映数据请求
			comingSoonData(1,3).then(({data})=>{//解构赋值传参
				this.comingSoonList = data;
			})
		}
	}
</script>

<style scoped>
.banner img {
	width: 100%;
}
.now-playing, .coming-soon {
	padding: .4rem .4rem .5rem .4rem;
}
.now-playing .img, .coming-soon .img {
	width: 100%;
}
.now-playing-item, .coming-soon-item {
	background-color: #fff;
	margin-bottom: .4rem;
	position: relative;
}
.now-playing-item .name {
	padding-top: .26rem;
	padding-left: .28rem;
}
.now-playing-item .info {
	padding-left: .28rem;
	color: #9a9a9a;
	font-size: .1rem;
	padding-bottom: .12rem;
}
.now-playing-item .grade {
	position:absolute;
	color: #f78360;
	right: .2rem;
	bottom: 0;
	font-size: .38rem;
	font-weight: bold;
	line-height: 1rem;
}
.coming-soon-item {
	position: relative;
}
.coming-soon-item .time {
	position: absolute;
	right: 1rem;
	line-height: .72rem;
	bottom: 0;
	font-size: .24rem;
	color: #f78360;
}
.coming-soon-item .name {
	line-height: .72rem;
	padding-left: .3rem;
}
.coming-soon .more, .now-playing .more {
	width: 3.2rem;
	height: .6rem;
	line-height: .6rem;
	text-align: center;
	margin: 0 auto;
	border: 1px solid #aaa;
	color: #616161;
	border-radius: .3rem;
	cursor: pointer;
}
.divide-line .txt {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	width: 1.3rem;
	height: .4rem;
	line-height: .4rem;
	color: #eee;
	background-color: #a7a7a7;
	border-radius: .1rem;
	text-align: center;
}
.divide-line {
	position: relative;
  margin-bottom: .4rem;
  margin-top: .3rem;
}
.divide-line:before {
	content: "";
	display: block;
	border-bottom: 1px solid #a8a8a8;
	width: 100%;
	height: 1px;
	transform: scaleY(0.5);
}
</style>