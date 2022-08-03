<template>
	<view class="scroll-container">
		<!-- 左侧滚动区域 -->
		<scroll-view scroll-y="true" class="scroll-container-left" style="height: 600px;" >
				<view v-for="(item,index) in Categories" :key="item.cat_id" :class="['cate_name', index===Index ? 'add_bdL':'']" @click="addClassName(index)">
					{{item.cat_name}}
				</view> 
		</scroll-view>
		<!-- 右侧滚动区域 -->
		<scroll-view scroll-y="true" class="scroll-container-right" style="height:600px;">
			<view class="box" v-for="i in CategoriesSecond" :key="i.cat_id">
				<view class="box_title">
					<!-- /{{i.cat_name}}/ -->
					{{i}}
				</view>
				<view class="box_content" >
					<view class="box_1" v-for="n in i.children" :key="n.cat_id">
						<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+n.cat_id">
							<image :src="n.cat_icon" mode="widthFix"></image>
						</navigator>
						<view class="">
							{{n.cat_name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Categories:[],
				// 二级下面的数据：右侧区域的数据
				CategoriesSecond:[],
				Index:0,
			};
		},
		onLoad() {
			this.getCategories()
		},
		methods:{
			// 发送请求
			async getCategories(){
				const {data:res}= await uni.$http.get("/categories")
				if(res.meta.status !==200) return uni.$showMsg()
				this.Categories= res.message
				this.CategoriesSecond =this.Categories[this.Index].children
				},
			// 一级分类切换类名以及显示相应的数据
			// 一级分类添加add_bdL类名：下标和Index相等,
			//显示对应的二级分类的数据：发送请求的时候，让二级里面的数据变成对应的分类上面的数据（拿对应的下标）重新发送请求
			addClassName(index){
				this.Index =index	 
				this.getCategories()
			}
		}
	}
</script>

<style lang="scss">
 .scroll-container{
	 display: flex;
	 height: 100%;

 }
 .scroll-container-left{	 
 		 text-align: center;
		 width:250rpx;
		  font-size: 30rpx;
 		 .cate_name{ 
			 margin: 40rpx 0rpx;
 			 color: #333;
 		 }
		 .add_bdL{
			 margin: 40rpx 0rpx;
		 			 color: var(--themeColor);
		 			 border-left: 6rpx solid var(--themeColor);
		 }
		
 }
 .scroll-container-right{	 
	 .box{
		 .box_title{
			 margin: 20rpx;
			 text-align: center;
			 font-size: 34rpx;
			 font-weight: bold;
		 }
	 }
	 .box_content{
		 display: flex;
		 flex-wrap: wrap;
		 .box_1{
			 width: 33%;
			 padding: 20rpx;
			 text-align: center;
			 font-size: 30rpx;
			 navigator{
				 width: 100%;
				 image{
					 width: 100%;
				 }
			 }
		 }
	 }
 }
</style>
