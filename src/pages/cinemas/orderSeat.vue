<template>
	<app-content>
		<div class="wrap">
			<swiper ref="swiper" id="swiper">
				<swiper-item id="film-item" v-for="(item,index) in filmList" :key="index">
					<img :src="item.img">
					<p class="tit">{{item.filmName}}</p>
				</swiper-item>
			</swiper>
		</div>
		<ul class="time-tit">
			<li class="time-tit-item" :class="{active: isSelect}" :@click="tabAct()">今天()</li>
			<li class="time-tit-item">明天</li>
			<li class="time-tit-item">后天</li>
		</ul>
		<ul class="time-list">
			<li class="time-item" v-for="(item,index) in timeList">
				<div class="time-item-inner">
					<i class="iconfont icon-arrow">&#xe64d;</i>
					<div class="time-box">
						<p class="time">
							{{item.showAt | dateFilter("hours")}}
						</p>
						<span class="maizuo-price">¥ {{item.maizuoPrice}}</span>
					</div>
					<div class="time-box">
						<p class="schedule-des">
							预计{{item.stopSellingAt | dateFilter("date/")}}结束/{{item.language}}{{item.imagery}}/{{item.hallName}}
						</p>
						<span class="cinema-price">¥ {{item.cinemaPrice}}</span>
					</div>
				</div>
			</li>
		</ul>
	</app-content>
</template>
<script type="text/javascript">
	import {getScheduleFilm, getScheduleTime} from "../../services/cinemaService.js";
	import swiper from "../../common/swiper2.vue";
	import swiperItem from "../../common/swiperItem.vue";

	export default {
		props: ["id"],
		data () {
			return {
				filmList: [],
				timeList: [],
				isSelect: true
			}
		},
		methods: {
			tabAct () {
				
			}
		},
		mounted () {
			getScheduleFilm(this.id).then(data=>{
				this.filmList = data;
				//数据请求回来渲染DOM后,更新swiper
				this.$nextTick(()=>{
					this.$refs.swiper.updateSwiper();
				})
			})
			//请求电影安排场次数据
			getScheduleTime(this.id).then(data=>{
				this.timeList = data;
			})
		},
		components: {
			swiper,
			swiperItem
		}
	}
</script>
<style scoped>
	.wrap {
		background-color: #38403e;
		padding-top: 12px;
	}
	#swiper {
		height: 2.72rem;
	}
	#film-item {
		width: 1.44rem!important;
	}
	#film-item img {
		width: 100%;
		border: #eee 1px solid;
	}
	#film-item .tit {
		text-align: center;
		color: #fff;
		margin: 10px -20px;
	}
	.swiper-slide {
		opacity: 0.4;
	}
	.swiper-slide-active {
		opacity: 1;
	}
	.time-tit {
		box-sizing: border-box;
		height: .8rem;
		line-height: .8rem;
		border-bottom: 1px solid #e9681f;
		display: flex;
	}
	.time-tit-item {
		flex: 1;
		text-align: center;
	}
	.time-tit-item.active {
		border-bottom: 5px solid #e9681f;
	}
	.time-item {
		margin: 11px 20px 0;
		height: 1.2rem;
    border-bottom: dashed 1px rgba(85,85,85,0.3);
	}
	.time-item-inner {
		padding-right: 16px;
		box-sizing: border-box;
		position:relative;
		height: auto;
    width: 100%;
    cursor: pointer;
	}
	.icon-arrow {
		position: absolute;
		right: 0;
		height: 60px;
		color: #c6c6c6;
		line-height: 60px;
	}
	.time-box {
		display: flex;
		justify-content: space-between;
	}
	.time {
		font-size: 16px;
		line-height: 25px;
		color: #000;
	}
	.schedule-des {
		font-size: 8px;
		line-height: 18px;
		color: #727272;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 90%;
	}
	.cinema-price {
		text-decoration: line-through;
    font-size: 8px;
    color: #c6c6c6;
	}
	.maizuo-price {
		font-size: 16px;
		color: #999;
	}
</style>