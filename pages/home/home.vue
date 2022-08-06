<template>
	<view>
		<search></search>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<view class="swiper-item">
					<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
						<image :src="item.image_src"></image>
					</navigator>
				</view>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="catitems">
			<view class="wrap_box" v-for="item in catitems" :key="item.name" :src="item.navigator_url">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor">
			<view class="floor_content" v-for="(it,index) in FloorList" :key="index">
				<!-- 左边 -->
				<view class="fll">
					<image :src="it.floor_title.image_src" mode="widthFix">
				</view>
				<!-- 右边 -->
				<view class="grid-container">
					<view class="grid-item" v-for="(itt,index) in it.product_list" :key="index">
						<navigator url="/subpkg/goods_list/goods_list">
							<image :src="itt.image_src"></image>
							<view class="frr_title">
								{{itt.name}}
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图的数据
				swiperList: [],
				// 导航数据
				catitems: [],
				// 楼层数据
				FloorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getCatitemsList()
			this.getFloorList()
		},
		methods: {
			// 发送请求 轮播图
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get("/home/swiperdata")
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			// 发送请求 导航
			async getCatitemsList() {
				const {
					data: res
				} = await uni.$http.get('/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.catitems = res.message
			},
			// 发送请求 楼层
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.FloorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		navigator,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.catitems {
		display: flex;
		height: 200rpx;

		.wrap_box {
			width: 25%;

			image {
				width: 100%;
			}
		}
	}

	.floor_content {
		padding: 20rpx;

		.grid-container {
			display: grid;
			grid-template-columns: repeat(3, 220rpx);
			grid-template-rows: 230rpx 230rpx;
			column-gap: 10rpx;

			.grid-item {}

			navigator {
				width: 100%;
				height: 100%;
			}

			.grid-item:first-of-type {
				grid-row: 1/3;

				image {
					width: 100%;
					height: 92%;
				}
			}

			.frr_title {
				color: #333;
				font-size: 24rpx
			}

			image {
				height: 83%;
				width: 100%;
			}
		}
	}
</style>
