<template>
<div>
	<app-content @scroll="contentScroll" :recieveScroll="true" ref="content">
	   <nav class="nav">
	   	<li :class="{active: showFlag == 'playing'}" class="nav-item" @click="tabAct('playing')">正在热映</li>
	   	<li :class="{active: showFlag == 'coming'}" class="nav-item" @click="tabAct('coming')">即将上映</li>
	   </nav>
	   <ul v-show="showFlag == 'playing'" class="playing-wrap">
	   	<li class="playing-item" v-for="item in playingList" @click="goPlayingDetail(item)">
	   		<div class="img-wrap">
	   			<img :src="item.cover" class="img">
	   		</div>
	   		<div class="playing-des">
		   		<h5 class="name">
		   			{{item.name}}
						<p class="grade-wrap">
							{{item.grade}}
							<i class="iconfont">&#xe64d;</i>
						</p>
		   		</h5>
		   		<p class="des">{{item.intro}}</p>
		   		<p class="tips">
		   			<span class="tips-left">
		   				<em>{{item.cinemaCount}}</em>家影院上映
		   			</span>
		   			<span class="tips-right">
		   				<em>{{item.watchCount}}</em>人购票
		   			</span>
		   		</p>
	   		</div>
	   	</li>
	   	<p v-if="!canReqPlaying">没有更多正在热映的电影了</p>
	   </ul>
	   <ul v-show="showFlag == 'coming'" class="coming-wrap">
	   	<li class="coming-item" v-for="item in comingList" @click="goComingDetail(item)">
	   		<div class="img-wrap">
	   			<img :src="item.cover" class="img">
	   		</div>
	   		<div class="coming-des">
		   		<p class="name">
		   			{{item.name}}
						<span class="iconfont arr-right">&#xe64d;</span>
		   		</p>
		   		<p class="des">{{item.intro}}</p>
		   		<p class="time">
		   			<span class="date">{{item.time | dateFilter("date")}}上映</span>
		   			<span class="weekday">{{item.time | dateFilter("weekday")}}</span>
		   		</p>
	   		</div>
	   	</li>
	   	<p v-if="!canReqComing">没有更多正在热映的电影了</p>
	   </ul>
	</app-content>
	<router-view></router-view>
</div>
</template>
<script type="text/javascript">
import {nowPlayingData,comingSoonData} from "../../services/homeService.js";
	export default {
		props: {
			flag: String
		},
		data () {
			console.log(this.flag)
			return {
				showFlag: this.flag || 'playing',
				playingList: [],
				comingList: [],
				playingPage: 1,
				comingPage: 1,
				isRequest: false,
				//true表示正在请求数据中,请求完一次数据后,再滚动时距离小于指定值时再触发请求数据
				canReqPlaying: true,//true表示全部数据没请求完还可以请求热映的数据
				canReqComing: true
				//true表示可以请求即将热映数据,false表示数据全部请求完,不再请求了
			}
		},
		methods: {
			tabAct(flag) {
				this.showFlag = flag;//头部点击切换
				this.getInitData();
			},
			getPlayingDate () {
				nowPlayingData(this.playingPage,7).then(({data,totalPage})=>{
					// console.log(data)
					this.playingList = this.playingList.concat(data);
					this.$nextTick(()=>{
						this.$refs.content.refreshDom();//数据渲染后更新滚动视图
						this.isRequest = false;
						if(this.playingPage >= totalPage) {
							this.canReqPlaying = false;
						}
					})
				})
			},
			getComingDate () {
				//即将上映数据请求
				comingSoonData(this.comingPage,7).then(({data,totalPage})=>{
					this.comingList = this.comingList.concat(data);
					this.$nextTick(()=>{
						this.$refs.content.refreshDom();
						this.isRequest = false;
						if(this.comingPage >= totalPage) {
							this.canReqComing = false;
						}
					})
				})
			},
			getInitData () {
				if(this.showFlag == "playing" && this.playingList.length == 0) {
					this.getPlayingDate();
				}
				if(this.showFlag == "coming" && this.comingList.length == 0) {
					this.getComingDate();
				}
			},//电影页<app-content @scroll="contentScroll" 判断距离,加载更多
			contentScroll(disY) {
				if(this.showFlag == "playing" && this.canReqPlaying) {
					if(disY < 100 && !this.isRequest) {
						this.isRequest = true;
						this.playingPage ++;
						this.getPlayingDate();
					}
				}
				if(this.showFlag == "coming" && this.canReqComing) {
					if(disY < 100 && !this.isRequest) {
						this.isRequest = true;
						this.comingPage ++;
						this.getComingDate();
					}
				}
			},
			goPlayingDetail(item) {
				this.$router.push({
					name: "film-detail",
					params: {
						id: item.id,
						buy: true
					}
				})
			},
			goComingDetail(item) {
				this.$router.push({
					name: "film-detail",
					params: {
						id: item.id,
						buy: false
					}
				})
			}
		},
		watch: {
	    //因为keep-alive作用,组件没有销毁,
	    //data ()不重新执行,so需对路由中的参数变化进行监听，达到切换的效果
	    flag(newVal){
        this.showFlag = newVal || 'playing';
        //判断这个页面是否拥有了可展示的数据，如果没有，需要请求
        this.getInitData();
	    }
		},
		mounted () {
			this.getInitData();
		}
	}
</script>
<style scoped>
.content {
	background-color: #fff;
}
.nav {
	margin: 0 .3rem;
	height: .92rem;
	line-height: .92rem;
	border-bottom: solid #fe6e00 1px;
	display: flex;
}
.nav-item {
	flex: 1;
	text-align: center;
	font-size: .32rem;
  color: #6a6a6a;
}
.nav-item.active {
	border-bottom: solid #fe6e00 4px;
	color: #fe6e00;
}
.playing-wrap, .coming-wrap {
	padding: 0 .3rem;
}
.playing-item, .coming-item {
	display: flex;
	width: 100%;
  padding: 20px 0;
  border-bottom: dashed 1px #c9c9c9;
}
.playing-item .img-wrap, .coming-item .img-wrap {
	width: 1.2rem;
}
.playing-item .img, .coming-item .img {
	width: 100%;
}
.playing-des, .coming-des {
	padding-left: 15px;
	width: 75%;
}
.playing-item .name, .coming-item .name {
	font-size: .32rem;
	line-height: .64rem;
	color: #000;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-indent: -0.1rem;
}
.coming-item .arr-right {
	float: right;
}
.playing-item .des, .coming-item .des {
	height: 24px;
	line-height: 24px;
	color: #8e8e8e;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.playing-item .tips {
	line-height: 24px;
	color: #8e8e8e;
	font-size: 12px;
}
.tips-left {
	width: 1.2rem;
}
.tips-left em, .tips-right em {
	color: #8aa2bf;
}
.grade-wrap {
	float: right;
	font-size: 16px;
	line-height: 32px;
	color: #fc7103;
}
.grade-wrap .iconfont {
	color: #c6c6c6;
}
.coming-item .time {
  line-height: 24px;
  color: #ffb375;
  font-size: 12px;
}
.coming-item .date {
	margin-right: .2rem;
}
</style>