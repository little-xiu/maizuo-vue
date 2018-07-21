<template>
	<div id="app-header" class="app-header">
		<span class="iconfont menu" @click="tabAct">&#xe60b;</span>
		<h3 class="title" ref="title">{{topTitle}}</h3>
		<span class="city" @click="goCityPage" ref="city">
			{{cityName}}
			<i class="iconfont">&#xe9d8;</i>
		</span>
		<span class="iconfont user">&#xe6a3;</span>
	</div>
</template>

<script type="text/javascript">
import Vuex from 'vuex';
	export default {
		computed: Vuex.mapState(["cityName","topTitle"]),
		methods: {
			tabAct () {
				this.$pubsub.$emit("show-nav");
			},
			goCityPage () {
				this.$router.push({
					name: "city"
				})
			}
		},
		mounted () {

			this.$pubsub.$on("replaceTitle",(name)=>{
				this.$refs.title.innerText = name;
			})
		}
	}
</script>

<style scoped>
	.app-header {
		position: absolute;
		height: 1rem;
		width: 100%;
		background: #282828;
    color: #999;
    display: flex;
	}
	.menu {
		line-height: 1rem;
		width: 1rem;
		text-align: center;
	}
	.city, .user {
		width: 1rem;
		line-height: 1rem;
		text-align: center;
	}
	.title {
		flex: 1;
		line-height: 1rem;
		font-size: 14px;
		color: #efefef;
		padding-left: .1rem;
	}
</style>