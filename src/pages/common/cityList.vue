<template>
	<app-content ref="content">
		<p class="tit">GPS定位你所在城市</p>
		<div class="cur-city">
			<p class="letter-item" @click='tabAct("深圳")'>深圳</p>
		</div>
		<p class="tit">热门城市</p>
		<ul class="city-hot">
			<li class="letter-item" @click='tabAct("北京")'>
				北京
			</li>
			<li class="letter-item" @click='tabAct("上海")'>
				上海
			</li>
			<li class="letter-item" @click='tabAct("广州")'>
				广州
			</li>
			<li class="letter-item" @click='tabAct("深圳")'>
				深圳
			</li>
		</ul>
		<p class="tit">按字母排序</p>
		<ul class="city-letter">
			<li class="letter-item" v-for="(item,index) in cityList" :key="index" @click="skip(index)">
				{{item.letter}}
			</li>
		</ul>
		<div class="city-wrap" v-for="(data,index) in cityList" :key="index" ref="citys">
			<h3 class="city-letter tit">{{data.letter}}</h3>
			<ul class="city-list">
				<li class="list-item" v-for="(item,index) in data.data" :key="index" @click="tabAct(item.name)">
					{{item.name}}
				</li>
			</ul>
		</div>
	</app-content>
</template>
<script type="text/javascript">
import {getCityListData} from "../../services/cinemaService.js";
	export default {
		data () {
			return {
				cityList: []
			}
		},
		methods: {
			skip(index) {
				let top = this.$refs.citys[index].offsetTop;
				this.$refs.content.scrollTo(-top);
				console.log(top)
			},
			tabAct(city) {
				// this.$pubsub.$emit("changeCity",city);
				this.$store.dispatch('mdCityName', city);
				this.$router.push({
					name: "home"
				})
			}
		},
		mounted() {
			getCityListData().then(data=>{
				this.cityList = data;
			})
		}
	}
</script>
<style scoped>
	.city-letter, .city-list, .cur-city {
		background-color: #fff;
	}
	.cur-city .letter-item {
		color: #e2941a;
	}
	.city-hot {
		display: flex;
		background-color: #fff;
	}
	.letter-item, .list-item {
		width: 25%;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    color: #838383;
    border-bottom: #ebebeb 1px solid;
	}
	.tit {
    padding-left: 15px;
    font-size: 14px;
    line-height: 40px;
    background-color: #ebebeb;
    margin-top: -1px;
	}
</style>