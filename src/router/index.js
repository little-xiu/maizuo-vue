import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/Index.vue";
import Cards from "../pages/cards/Index.vue";
import Cinemas from "../pages/cinemas/Index.vue";
import Films from "../pages/films/Index.vue";
import Mine from "../pages/mine/Index.vue";
import Shops from "../pages/shops/Index.vue";
import FilmDetail from "../pages/common/filmDetail.vue";
import city from "../pages/common/cityList.vue";
import cinemaDetail from "../pages/cinemas/cinemaDetail.vue";
import exchangeTicket from "../pages/cinemas/exchangeTicket.vue";
import buyExTicket from "../pages/cinemas/buyExTicket.vue";
import login from "../pages/common/login.vue";
import orderSeat from "../pages/cinemas/orderSeat.vue";
Vue.use(VueRouter);
const routes = [
	{
		name: "home",
		path: "/home",
		alias: "/",
		component: Home,
		children: [
			{
				name: "home-detail",
				path: "detail/:id/:buy",
				component: FilmDetail,
				props: true,
				children: [
					{
						name: "home-cinema",
						path: "home-cinema/:cinemaId",
						component: Cinemas,
						props: true
					}
				]
			}
		]
	},
	{
		name: "cards",
		path: "/cards",
		component: Cards
	},
	{
		name: "cinemas",
		path: "/cinemas",
		component: Cinemas,
		children: [
			{
				name: "cinema-detail",
				path: "detail/:id/:flag",
				component: cinemaDetail,
				props: true,
				children: [//通兑票路由
					{
						name: "exchangeTicket",
						path: "item",
						component: exchangeTicket,
						props: true
					},//立即订座
					{
						name: "orderSeat",
						path: "film",
						component: orderSeat,
						props: true
					},
				]
			},		
			{
				name: "buyExTicket",
				path: "buy",
				component: buyExTicket
			}
		]
	},
	{
		name: "films",
		path: "/films",
		alias: "/films/:flag",
		props: true,//将push进来路径中的params的参数，作为组件Films的props属性
		component: Films,
		children: [
			{
				name: "film-detail",
				path: "detail/:id/:buy",
				component: FilmDetail,
				props: true
			}
		]
	},
	{
		name: "mine",
		path: "/mine",
		component: Mine
	},
	{
		name: "shops",
		path: "/shops",
		component: Shops
	},
	{
		name: "city",
		path: "/city",
		component: city
	},
	{
		name: "login",
		path: "/login",
		component: login
	},
	{
		path: "**",
		redirect: "/home"
	}
]
export default new VueRouter({
	routes
})