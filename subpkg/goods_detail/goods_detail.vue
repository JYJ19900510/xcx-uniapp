<template>
	<view>
		<view class="swiper-container">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in detailList.pics" :key="item.pics_id">
					<view class="swiper-item">
						<image :src="item.pics_sma_url" mode="widthFix" @click="previewImage(item.pics_sma_url)">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 价格 -->
		<view class="price">
			{{detailList.goods_price}}
		</view>
		<!-- 收藏 -->
		<view class="info">
			<!-- 左边 -->
			<view class="infos_right">
				{{detailList.goods_name}}
			</view>
			<!-- 右边 -->
			<view class="info_left" @click='addCollect'>
				<view :class="['iconfont',isCollect? 'icon-xingxing1' : 'icon-xingxing']"></view>
				<view class="collect">
					收藏
				</view>
			</view>
		</view>
		<!-- 快递 -->
		<view class="kd">
			快递：免运费
		</view>
		<view class="footer_box">
			<view class="box-wrap">
				<!-- 图标 -->
				<view class="iconfont icon-kefu1"></view>
				<!-- 文字 -->
				<view class="title_box">客服</view>
				<button open-type="contact"></button>
			</view>
			<view class="box-wrap">
				<!-- 图标 -->
				<view class="iconfont icon-ziyuan"></view>
				<!-- 文字 -->
				<view class="title_box">分享</view>
				<button open-type="contact"></button>
			</view>
			<view class="box-wrap box1" @click="addCart">
				<!-- 图标 -->
				<view class="iconfont icon-gouwuchekon"></view>
				<!-- 文字 -->
				<view class="title_box">购物车</view>
				<button open-type="contact"></button>
			</view>
			<view class="box-wrap box2">
				<!-- 图标 -->
				<view class="iconfont box_buy"></view>
				<!-- 文字 -->
				<view class="title_box">立即购买</view>
				<button open-type="contact"></button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 详情数据
				detailList: {},
				// 商品id
				goodsId: '',
				// 购物车数据
				cartData: [],
				// 是否被收藏 isCollect 添加css类名
				isCollect:false,
				// 收藏数据
				Collect:[],
			}
		},
		onLoad(options) {
			// this.goods_id=+options.goods_id
			this.goodsId = 5
			let goods_id = 5
			this.detail(this.goodsId)
		},
		methods: {
			// 发送请求
			async detail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.detailList = res.message
				// 获取缓存中的收藏数据
			   this.Collect = uni.getStorageSync('collect') || []
			},
			// 点击轮播图的放大预览功能
			/* 
			  每个图片注册点击事件，
			  构造要预览的图片数组
			  调用小程序内部方法
			  接收点击图片，传递过来的图片url 1.当前显示图片的http链接 2.需要预览的图片http链接列表
			 */
			previewImage(url) {
				let pics = this.detailList.pics.map(v => v.pics_mid)
				uni.previewImage({
					current: url, // 当前显示图片的 http 链接
					urls: pics // 需要预览的图片 http 链接列表
				})
			},
			// 点击加入购物车
			/* 
			 1.注册点击事件
			 2.获取缓存中的购物车数据
			 3.判断当前的商品是否已经在购物车中 在；商品数量++，不在：给购物车添加一个新的一项，添加num属性1
			 4.重新添加到缓存中
			 5.弹出跳转提示框
			 */
			addCart() {
				let cartData = uni.getStorageSync("cart") || []
				let res = cartData.findIndex(v => v.goods_id === this.goodsId)
				if (res === -1) {
					// 不存在
					this.detailList.num = 1
					cartData.push(this.detailList)	
				} else {
					// 存在
					console.log(res);
					cartData[res].num++	
				}
				uni.setStorageSync('cart',cartData)
				this.cartData = cartData
				uni.$showMsg("添加商品成功")
			},
			// 点击收藏
			/* 
			1 css 样式。类名
			2.一开始从发送请求缓存数据收藏数据
			2.根据商品id,从收藏数据中查找到该商品
			，true ==>点击为false，并从缓存中删掉数据 , false ==>true, 存入缓存
			 
			 */
			addCollect(){
				let res = this.Collect.findIndex(v=>v.goods_id===this.goodsId)
				
				if(res=== -1){
					// 不存在
					this.Collect.push(this.detailList)
					this.isCollect =true
				}else{
					// 存在
					console.log(res);
					this.Collect.splice(res,1)	
					this.isCollect = false
				}	
				uni.setStorageSync('collect',this.Collect)
			}
			
		}
	}
</script>

<style lang="scss">
	.swiper-container {
		height: 750rpx;

		swiper {
			width: 90%;
			height: 100%;
			margin: 10rpx auto;

			image {
				height: 100%;
			}

		}
	}

	.price {
		font-weight: bold;
		color: var(--themeColor);
		font-size: 36rpx;
		padding: 20rpx;
	}

	.info {
		padding: 20rpx;
		display: flex;
		justify-content: space-around;

		.infos_right {
			flex: 5;
			color: #666;
			font-size: 32rpx;
			letter-spacing: 4rpx;
			// 省略
			//  第二行省略
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}

		.info_left {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
		
		.iconfont {
			&.icon-xingxing1{
				color: navajowhite;
			}
			
		}
	}

	.footer_box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		display: flex;
		text-align: center;
		font-size: 32rpx;
	
	.box_wrap {
			flex: 1;
		}

		.box1 {
			flex: 3;
			background-color: indianred;
			color: #fff;
			line-height: 80rpx;
		}

		.box2 {
			flex: 2;
			background-color: azure;
			color: #333;
			line-height: 80rpx;
		}
	}
</style>
