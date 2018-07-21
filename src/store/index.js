import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const state = {
	cityName: "深圳",
	topTitle: "卖座电影"
};
const mutations = {
	comCityName (state,params) {
		state.cityName = params;
	},
	comTopTitle (state,params) {
		state.topTitle = params;
	}
};
const actions = {
	mdCityName(context,params) {
		context.commit("comCityName",params);
	},
	mdtopTitle (context,params) {
		context.commit("comTopTitle",params);
	}
}


const getters = {

}
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
})