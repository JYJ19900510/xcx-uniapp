<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<view class="swiper-item">
					<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
						<image :src="item.image_src"></image>
					</navigator>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图的数据
				swiperList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			
		},
		// 轮播图数据
		methods:{
			async getSwiperList(){
				const {data:res} = await uni.$http.get("/home/swiperdata")
				if(res.meta.status !==200) return uni.$showMsg()
			    this.swiperList = res.message
			}
		}
	}
	
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,
	navigator,
	image{
		width: 100%;
		height: 100%;
	}
}
</style>
