<template>
<div>
	<app-content>
		<img src="../../assets/imgs/cinema-bg.png" class="cinema-bg">
		<div class="row">
			<div class="row-inner">
				<i class="iconfont">&#xe630;</i>
				<h4 class="order-ticket">订座票</h4>
				<p class="des">选好场次及座位，到影院自助机取票</p>
				<button class="order-btn" @click="goOrderSeatPage">立即订座</button>
			</div>
		</div>
		<div class="row">
			<div class="row-inner">
				<i class="iconfont icon2">&#xe659;</i>
				<h4 class="order-ticket">通兑票</h4>
				<p class="des">有效期内到影院前台兑换影票</p>
				<button class="order-btn ticket" @click="goExchangePage">立即订票</button>
			</div>
		</div>
		<div class="row">
			<div class="row-inner">
				<i class="iconfont icon3">&#xe602;</i>
				<h4 class="address">{{cinemaInfo.address}}</h4>
			</div>
		</div>
		<div class="row">
			<div class="row-inner">
				<i class="iconfont icon4">&#xe627;</i>
				<h4 class="address">{{cinemaInfo.telephones}}</h4>
			</div>
		</div>
		<div class="bottom-wrap">
			<ul class="bottom-list">
				<li class="bottom-item" :class="{active: tips == 'takeTickit'}" 
				@click="tabAct('takeTickit')">
					<em class="icon-wrap"><i class="iconfont">&#xe618;</i></em>
					<span>取票</span>
				</li>
				<li class="bottom-item" :class="{active: tips == 'glass'}" 
				@click="tabAct('glass')">
					<em class="icon-wrap"><i class="iconfont">&#xe6d7;</i></em>
					<span>3D</span>
				</li>
				<li class="bottom-item" :class="{active: tips == 'parking'}" 
				@click="tabAct('parking')">
					<em class="icon-wrap"><i class="iconfont">&#xe7b7;</i></em>
					<span>停车</span>
				</li>
				<li class="bottom-item" :class="{active: tips == 'gift'}" 
				@click="tabAct('gift')">
					<em class="icon-wrap"><i class="iconfont">&#xe601;</i></em>
					<span>优惠</span>
				</li>
				<li class="bottom-item" :class="{active: tips == 'traffic'}" 
				@click="tabAct('traffic')">
					<em class="icon-wrap"><i class="iconfont">&#xe600;</i></em>
					<span>交通</span>
				</li>
			</ul>
			<div class="bottom-con">
				{{tipCon}}
			</div>
		</div>
	</app-content>
	<router-view></router-view>
</div>
</template>
<script type="text/javascript">
import {getCinemaInfo} from "../../services/cinemaService.js";
	export default {
		props: ["id","flag","name"],
		data () {
			let id = this.id;
			let flag = this.flag;
			if(typeof id != "number") {
				id = Number(id);
			}
			if(typeof flag != "boolean") {
				flag = flag == "true" ? true : false;
			}
			return {
				cinemaId: id,
				cinemaFlag: flag,
				cinemaInfo: {},
				tips: "takeTickit",
				tipCon: ''
			}
		},
		methods: {
			tabAct (tip) {
				this.tips = tip;
				this.tipCon = this.cinemaInfo[tip];
			},
			goExchangePage () {
				this.$router.push({
					name: "exchangeTicket",
					params: {
						id: this.cinemaInfo.id
					}
				})
			},
			goOrderSeatPage () {
				this.$router.push({
					name: "orderSeat",
					params: {
						id: this.cinemaInfo.id
					}
				})
			}
		},
		mounted () {
			//一进入页面头部的title改为影院名字,属于全局属性修改
			this.$store.dispatch("mdtopTitle",this.name);
			getCinemaInfo(this.cinemaId).then(data=>{
				this.cinemaInfo = data;
				this.tipCon = this.cinemaInfo.takeTickit;
				// console.log(this.cinemaInfo)
			})
		}
	}
</script>
<style scoped>
	.cinema-bg {
		width: 100%;
	}
	.row {
		padding: 25px 17px 0;
		background-color: #f9f9f9;
	}
	.row-inner {
		position: relative;
		border-bottom: 1px dotted #d6d6d6;
		padding-bottom: 25px;
		margin-left: 45px;
	}
	.row-inner .iconfont {
		position: absolute;
		color: #ff8160;
		font-size: .56rem;
		left: -.9rem;
	}
	.order-ticket {
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: .32rem;
		color: #000;
	}
	.des {
		color: #737373;
	}
	.order-btn {
    width: 94px;
    border-radius: 38px;
    height: 34px;
    border: none;
    font-size: 13px;
    position: absolute;
    right: 0px;
    top: -10px;
    background-color:#ff8160;
    color: #fff;
    outline: none;
    border: 1px solid #ff8160;
	}
	.order-btn.ticket {
		background-color: #fff;
		color: #ff8160;
	}
	.row-inner .iconfont.icon2 {
		color: #40b5b5;
	}
	.row-inner .iconfont.icon3 {
		color: #7bafe1; 
	}
	.row-inner .address {
		font-size: 14px;
		color: #000;
	}
	.bottom-wrap {
		min-width: 320px;
		padding: 15px 0 30px;
		background-color: #f9f9f9;
		margin-top: 15px;
	}
	.bottom-list {
		padding: 0 .3rem;
		display: flex;
	}
	.bottom-item {
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: 1px #d6d6d6 solid;
		padding-bottom: 5px;
	}
	.bottom-item .icon-wrap {
		color: #cdcdcd;
		border: 1px solid #cdcdcd;
		width: .8rem;
		height: .8rem;
		border-radius: 50%;
		line-height: .8rem;
		text-align: center;
		margin-bottom: .1rem;
	}
	.bottom-item .iconfont {
		font-size: .4rem;
		display: inherit;
	}
	.bottom-item span {
		color: #737373;
	}
	.bottom-con {
		padding: 0 .3rem;
		line-height: .36rem;
		margin-bottom: .2rem;
	}
	.bottom-item.active {
		border-bottom: 3px #ff8032 solid;
	}
	.bottom-item.active .icon-wrap {
		border-color: #ff8032;
	}
	.bottom-item.active .iconfont {
		color: #ff8032;
	}
</style>