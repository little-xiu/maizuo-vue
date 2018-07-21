<template>
	<div id="app">
		<app-header></app-header>
		<!-- 所有路由的出口视图,keep-alive缓存组件切换时不被销毁 -->
		<keep-alive>
			<router-view/>
		</keep-alive>
		<app-nav></app-nav>
	</div>
</template>

<script type="text/javascript">
import AppHeader from "./common/appHeader.vue";
import AppNav from "./common/appNav.vue";
	export default {
		components: {
			AppHeader,
			AppNav
		}
	}
</script>

<style scoped>
	#app {
		width: 100%;
		height: 100%;
	}
</style>