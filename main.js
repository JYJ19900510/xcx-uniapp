// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
// 引入icont样式
import "./style/index.css"
// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
// 请求拦截器
$http.beforeRequest = function(options) {
	// do somethimg...
	//展示 loading 效果：
	uni.showLoading({
		title: '数据加载中...',
	})
}
// 响应拦截器
// 请求完成之后做一些事情
$http.afterRequest = function() {
	// do something...
	//隐藏 loading 效果：
	uni.hideLoading()
}

// 封装弹窗的方法
uni.$showMsg = function(title = "请求失败",duration = 2000){
	uni.showToast({
		title,
		duration,
		icon: "none"
	})
}
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
