<template>
	<div id="app-nav" class="app-nav">
		<transition name="fade">
			<div class="cover" v-show="isShow"></div>
		</transition>
		<div class="cover-page" v-show="isShow" @click="closeNav"></div>
		<transition name="slide">
			<nav class="nav" v-show="isShow">
				<li class="nav-item" v-for="(navItem,index) in navList" @click="chagePageAct(navItem)">
					{{navItem.title}}
					<i class="iconfont arr-right">&#xe64d;</i>
				</li>
			</nav>
		</transition>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				isShow: false,
				navList: [
					{
						title: "首页",
						path: "/home",
						name: "卖座电影"
					},
					{
						title: "影片",
						path: "/films",
						name: "卖座电影"
					},
					{
						title: "影院",
						path: "/cinemas",
						name: "全部影院"
					},
					{
						title: "商城",
						path: "/shops",
						name: "我的商城"
					},
					{
						title: "我的",
						path: "/mine",
						name: "登录"
					},
					{
						title: "卖座卡",
						path: "/cards",
						name: "卖座卡"
					},
				]
			}
		},
		methods: {
			closeNav() {
				this.isShow = false;
			},
			chagePageAct(item) {
				this.$router.push(item.path);
				this.isShow = false;
				this.$store.dispatch("mdtopTitle",item.name);
			}
		},
		mounted () {
			this.$pubsub.$on("show-nav",()=>{
				this.isShow = true;
			})
		}
	}
</script>

<style scoped>
	.app-nav {
		width: 100%;
		height: 100%;
	}
	.cover {
		position: absolute;
    width: 100%;
    top: 1rem;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
	}
	.cover-page {
		position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background: transparent;
	}
	.nav {
		position: absolute;
		top: 1rem;
		width: 70%;
		bottom: 0;
		left: 0;
		border-top: 1px solid #222;
		box-sizing: border-box;
		background: #282828;
	}
	.nav-item {
		line-height: 50px;
		border-bottom: 1px dotted #333;
		color: #999;
		padding: 0 16px;
		font-size: 14px;
	}
	.arr-right {
		float: right;
	}
	@keyframes slideIn {
		0%{transform: translateX(-100%);}
		100%{transform: translateX(0%);}
	}
	@keyframes slideOut {
		0%{transform: translateX(0%);}
		100%{transform: translateX(-100%);}
	}
	.slide-enter-active {
		animation: slideIn 300ms;
	}
	.slide-leave-active {
		animation: slideOut 300ms;
	}
	@keyframes fadeIn {
		0%{opacity: 0;}
		100%{opacity: 1;}
	}
	@keyframes fadeOut {
		0%{opacity: 1;}
		100%{opacity: 0;}
	}
	.fade-enter-active {
		animation: fadeIn 400ms;
	}
	.fade-leave-active {
		animation: fadeOut 400ms;
	}
</style>