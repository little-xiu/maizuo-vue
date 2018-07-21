<template>
<div>
	<app-content>
	    <ul class="cinema-list">
	    	<li class="cinema-item" v-for="(val,key) in cityList" :key="key">
	    		<h4 class="area" @click="tabAct(val)">{{val.name}}</h4>
	    		<ul class="area-list" v-show="val.show">
	    			<li class="area-item" v-for="(item,index) in val.data" :key="index" @click="goCinemaDetail(item)">
	    				<h4 class="cinema-name">{{item.name}} <i class="iconfont">&#xe64d;</i></h4>
	    				<p class="food-wrap"><span class="food-inner">可乐爆米花</span></p>
	    				<p class="address">{{item.address}}</p>
	    			</li>
	    		</ul>
	    	</li>
	    </ul>
	</app-content>
	<router-view></router-view>
</div>
</template>
<script type="text/javascript">
import {getCinemaListData} from "../../services/cinemaService.js";
import Vuex from "vuex";
	export default {
		data() {
			return {
				cityList: {}
			}
		},
		computed: Vuex.mapState(["topTitle"]),
		methods: {
			tabAct(item) {
				item.show = !item.show;
			},
			goCinemaDetail(item) {
				this.$router.push({
					name: "cinema-detail",
					params: {
						id: item.id,
						name: item.name,
						flag: true//代表从影院入口进,不是通过首页进
					}
				})
			}
		},
		mounted() {
			console.log(this.$store.state.topTitle)
			getCinemaListData().then(data=>{
				this.cityList = data;
				// console.log(this.cityList)
			})
		},
		watch: {
			topTitle (newVal) {
				console.log(newVal)
				this.$store.dispatch("mdtopTitle",'全部影院');
			}
		}
	}
</script>
<style scoped>
	.area {
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
		padding-left: .32rem;
		background: #e1e1e1;
		margin-bottom: 1px;
		color: #636363;
	}
	.area-item{
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
    width: 100%;
    position: relative;
	}
	.area-item {
		padding: 10px 0 12px 16px;
	}
	.cinema-name {
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: text-top;
    max-width: 80%;
    font-size: 16px;
    margin-bottom: 5px;
	}
	.cinema-name .iconfont {
		position: absolute;
		right: .6rem;
		top:.2rem; 
	}
	.address {
		color: #ccc;
	}
	.food-wrap {
    margin-bottom: 5px;
    font-size: 10px;
	}
	.food-inner {
		background-color: #51add0;
		border-radius: 3px;
		padding: 0 5px;
		margin: 0 5px;
		color: #fff;
		height: 15px;
		line-height: 15px;
	}
	
</style>
