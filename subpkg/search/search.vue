<template>
	<view>
		<!-- search -->
		<view class="search-container">
			<view class="search">
				<!-- 图标 -->
				<icon type="search" size="17" class="search_icon"></icon>
				<input placeholder="请输入搜索内容" class="uni-input ipt" focus @input="search" v-model="val" />
				<!-- 取消按钮 -->
				<view class="resetb" @click="handlerRestBtn">取消</view> 
					<!-- 搜索按钮 -->
				 <view class="searchBtn" @click="handlerSearch">搜素</view>	
			</view>
		</view>
		<view class="search_content">
			<!-- 搜索内容 -->
			<view class="content" v-if="goods.length>0&&val.length>0">
				<view v-for="item in goods" :key="item.goods_id">
					<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
						<view class="info">{{item.goods_name}}</view>	
					</navigator>
				</view>
			</view>
			<!-- 历史 -->
			<view class="his" v-else>
				<view class="his_title">
					<text>搜索历史</text>
					<view class="del" @click="del">删除</view>
				</view>
				<view class="his_box">
					<view class="his_info" v-for="(item,index) in history" :key="index"  @click="hisSearch(item)">{{item}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: '',
				// 请求参数
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 5,
				},
				// 搜索得到的数据
				goods: [],
				// 历史数据
				history:[],
				// 定时器
				timrId:''
			};
		},
		onLoad() {
           this.his()
		},
		methods: {
			// 发送请求
			async getSearch(queryObj) {
				const {
					data: res
				} = await uni.$http.get('/goods/search', {
					...queryObj
				})
				this.goods = res.message.goods
			},
			// input框里面的input事件，里面的值发生变化，就会触发input事件，
			async search() {
				// 注意点：再给请求参数赋值时候的位置，一定要在if()判断字符串是否为空之前，不然this.queryObj里面的query参数与this.val.trim()不符。
				//特别是在一个个的删除关键字的时候，请求在this.val.trim()关键字为空，请求不在发送但是this.queryObj里面的query参数是上一个请求里面的参数，
				//这是因为关键字为空的时候，会执行if条件，导致下面的代码不执行，所以data里面的queryObj的信息还是上一个请求里面的
				this.queryObj.query = this.val.trim()
				// 根据关键字发送请求
				if (this.val.trim().length <= 0) {
					this.goods.splice(0,this.goods.length)
					return 
				} 
				const {
					query,
					cid,
					pagenum,
					pagesize
				} = this.queryObj
				// 节流操作
				 clearTimeout(this.timerId)
				 this.timerId = setTimeout(()=>{
				 	 this.getSearch(this.queryObj)
				 },1000)
			}
			,
			//   历史记录数据
			his(){	
				//1. 从缓存中获取历史记录
				// 2.将关键字放入数组中，
				//3.如果有相同的关键字，只显示一个==》遍历数组，findIndex ,返回相同的下标，使用splice()替换当前项，没有则添加到数组中
				// 4.存入缓存
				// 5.关键字为空，不加入历史数据中(注意if条件语句的书写位置)
				this.history=uni.getStorageSync('his')||[]
				if(this.val.trim().length<=0) return
				let idx = this.history.findIndex(item=>item===this.val.trim())
				if(idx===-1){
					this.history.push(this.val.trim())
				}else {
					this.history.splice(idx,1,this.val.trim())
				}
				uni.setStorageSync('his',this.history)
			},
			// 点击搜索按钮
			 handlerSearch(){
	              this.search()
			     this.his()
			},
			// 重置
			handlerRestBtn(){
				this.val = ''
				this.search()
			},
			// 点击历史数据中的删除按钮
			// 删除所有的历史记录
			del(){
				this.history.splice(0,this.history.length)
				uni.setStorageSync('his',this.history)
			},
			// 根据历史记录的数据信息搜索
			hisSearch(item){
				this.val =item
				this.search()
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		height: 100rpx;
		background-color: var(--themeColor);
		padding: 20rpx;

		.search {
			display: flex;
			justify-content: center;	
			align-items: center;
			margin: 0 auto;
			height: 100%;
			width: 90%;
			font-size: 32rpx;
			padding-left: 20rpx;
			background-color: #fff;
			border-radius: 40rpx;
			.ipt {
				height: 100%;
				width: 67%;
				color: #666;
				background-color: #fff;
				
			}
            .searchBtn{ 
				width: 100rpx;
				height: 100%;
				border-radius: 20rpx;
				background-color: deeppink;
				 
			}
			.resetb {
				width: 100rpx;
				height: 100%;
				border-radius: 20rpx;
				background-color: #ccc;
				 
			}
		}
	}

	.search_content {
		padding: 20rpx;

		.content {
			.info {
				padding: 20rpx 0rpx;
				margin: 20rpx;
				background-color: #ccc;
				border-radius: 10rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.his {

			.his_title {
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				border-bottom: 1px solid #ccc;
			}

			.his_box {
				display: flex;
				flex-wrap: wrap;
				.his_info {
					padding: 30rpx;
					background-color: #ccc;
					margin-left: 10rpx;
					margin-top: 20rpx;
					font-size: 30rpx
				}
			}
		}
	}
</style>
