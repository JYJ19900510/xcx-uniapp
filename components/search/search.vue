<template>
	<view class="search-container">
		<navigator url="/subpkg/search/search">
			<view class="search">
				<!-- 图标 -->
				<icon type="search" size="17" class="search_icon"></icon >
				<!-- 文字 -->
				<text>搜索</text>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-container{
	position: sticky;
	top:0;
	z-index: 1;
	height: 100rpx;
	background-color: var(--themeColor);
	padding: 20rpx;
		
	navigator{
		width: 100%;
		height: 100%;
	}
	.search{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		height: 100%;
		width: 90%;
		background-color: #fff;
		border-radius: 40rpx;
		font-size: 32rpx;
	}
	 
}
</style>