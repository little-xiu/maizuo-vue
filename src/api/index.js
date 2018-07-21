/*
首页的轮播请求接口
参数：
    __t:时间戳
*/
const HOME_BANNER_URL = '/v4/api/billboard/home';

/*
正在上映的请求接口
参数：
    __t：时间戳
    page: 页数
    count：数量
*/
const NOW_PLAYING_URL = '/v4/api/film/now-playing';

/*
即将上映的请求接口
参数：
    __t：时间戳
    page: 页数
    count：数量
*/
const COMING_SOON_URL = '/v4/api/film/coming-soon';
// 电影详情页的接口
// 参数：
//__t：时间戳
const FILM_DETAIL_URL = '/v4/api/film';
//影院接口 参数: __t：时间戳
const CINEMA_LIST_URL = '/v4/api/cinema';
//城市接口 参数: __t：时间戳
const CITY_LIST_URL = '/v4/api/city';


//购买通票接口
const BUY_EXCHANGE_TICKET = '/v4/api/preorder/201807184771152841';
// https://m.maizuo.com/v4/api/cinema/6599?__t=1531829454424
//发送验证码接口https://m.maizuo.com/v4/api/code?__t=1531911407649
//登录按钮接口POST请求 https://m.maizuo.com/v4/api/login?__t=1531911505367
const Login_URL = '/v4/api/login';
//立即订座 https://m.maizuo.com/v4/api/schedule?__t=1532051104100&film=0&cinema=5230
const SCHEDULE_ORDER_URL = '/v4/api/schedule';
//立即订座页面,电影列表接口: 
//https://m.maizuo.com/v4/api/cinema/243/film?__t=1532051434669
const SCHEDULE_FILM_URL = '/v4/api'; 
export default {
    HOME_BANNER_URL,
    NOW_PLAYING_URL,
    COMING_SOON_URL,
    FILM_DETAIL_URL,
    CINEMA_LIST_URL,
    CITY_LIST_URL,
    BUY_EXCHANGE_TICKET,
    SCHEDULE_ORDER_URL,
    SCHEDULE_FILM_URL
}