<template>
	<div class="content" ref="content">
		<div>
			<slot></slot>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			recieveScroll: Boolean
//引用的父组件(films/Index.vue)设置了true表示电影页需要监听滚动事件,
//为了判断加载更多,首页等其他页面不用
		},
		methods: {
			refreshDom() {
				this.scroll.refresh();
			},//cityList.vue页面城市字母点击跳转锚点
			scrollTo (y) {
				if(y > 0) {
					return;
				}
				if(y < this.scroll.maxScrollY) {
					this.scroll.scrollTo(0,this.scroll.maxScrollY,200);
					return;
				}
				this.scroll.scrollTo(0,y,200);
			}
		},
		mounted() {
			this.scroll = new IScroll(this.$refs.content,{
				mouseWheel: true,
				probeType: 3//设置了才会触发scroll事件
			});
			this.scroll.on('beforeScrollStart',()=>{
				this.scroll.refresh();
			});//films/Index.vue 页面监听滚动加载更多
			this.scroll.on("scroll",()=>{
				if(this.recieveScroll) {
					let disY = this.scroll.y - this.scroll.maxScrollY;//都是负数的原因
					this.$emit("scroll",disY);
				}
			})
		}
	}
</script>
<style scoped>
	.content {
		position: absolute;
		top: 1rem;
		left: 0;
		width: 100%;
		bottom: 0;
		overflow: hidden;
		background-color: #ebebeb;
	}
</style>