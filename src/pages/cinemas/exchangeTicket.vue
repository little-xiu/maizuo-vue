<template>
<div>
	<app-content>
		<ul class="ticket-wrap">
			<li class="ticket-item" v-for="(item,index) in ticketList" :key="index" @click="goBuyPage">
				<div class="bg-left">
					<div class="item-left">
						<span class="item-name">{{item.name}}</span>
						<span class="item-des">
							可在本影院兑换{{item.name.substr(0,item.name.length-3)}}电影票
						</span>
					</div>
					<div class="item-right">
						<span class="cinema-price">
							¥ {{item.cinema}}.00
						</span>
						<span class="maizuo-price">
							¥ {{item.maizuo}}.00
						</span>
					</div>
				</div>
			</li>
		</ul>
	</app-content>
	<router-view></router-view>
</div>
</template>
<script type="text/javascript">
	import {getExchangeTicket} from "../../services/cinemaService.js";
	export default {
		props: ["id"],
		data () {
			let id = this.id;
			if(typeof id != "number") {
				id = Number(id);
			}
			return {
				cinemaId: id,
				ticketList: []
			}
		},
		methods: {
			goBuyPage () {
				this.$router.push({name: "buyExTicket"});
			}
		},
		mounted () {
			getExchangeTicket(this.cinemaId).then(data=>{
				this.ticketList = data;
			})
		}
	}
</script>
<style scoped>
	.ticket-wrap {
		padding: .2rem;
	}
	.ticket-item {
		width: 100%;
    min-width: 300px;
    padding-bottom: 15px;
    box-sizing: border-box;
    height: 123px;
    background: url("../../assets/imgs/exticket-bg-right.png") no-repeat right 0;
	}
	.bg-left {
		height: 100%;
		display: flex;
		background: url("../../assets/imgs/exticket-bg-left.png") no-repeat left 0;
	}
	.item-left {
		width: 63%;
		height: 108px;
		margin-left: 18px;
		background: url("../../assets/imgs/exticket-bg2.png") repeat-x;
	}
	.item-right {
		width: 32%;
		height: 103px;
		margin-right: 18px;
		margin-top: 2px;
		background: #fff url("../../assets/imgs/exticket-bg-middle.png") no-repeat;
	}
	.item-left span {
		display: block;
		margin-left: 8px;
	}
	.item-name {
		color: #fff;
    font-size: 16px;
    margin-top: 28px;
	}
	.item-des{
		color: #fff;
    opacity: 0.5;
    margin-top: 5px;
	}
	.cinema-price {
		display: block;
		margin-left: 34px;
		color: #e36f0d;
		font-size: 16px;
		margin-top: 28px;
	}
	.maizuo-price {
		display: block;
		margin-left: 34px;
		text-decoration: line-through;
		color: #c6c6c6;
	}
</style>