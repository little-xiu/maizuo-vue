let filmInfo = {};
function setFilmInfo(info) {
	filmInfo = info;//push进路由前,先保存数据,加载了列表页,断网再进入详情页时避免全部空白
}
function getFilmInfo() {
	return Object.assign({},filmInfo);//可以设为data初始化的值
}
export default {
	setFilmInfo,
	getFilmInfo
}
