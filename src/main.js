import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import appContent from "./common/appContent.vue";
import {dateFilter,actorsFilter} from "./filter/dateFilter.js";

Vue.component("app-content",appContent);
Vue.prototype.$pubsub = new Vue();
//注册全局日期过滤器,把时间戳转换为日期
Vue.filter("dateFilter",dateFilter);
Vue.filter("actorsFilter",actorsFilter);
new Vue({
	el: "#app",
	store,
	router,
	components: {
		App
	},
	render: h=>h(App)
})