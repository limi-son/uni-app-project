<template>
       <view class="guide">
		   <swiper
		   class="swiper"
		   circular 
		   :indicator-dots="true" 
		   :current="tabIndex"
		  >
		         <swiper-item
		     class="item"
		     v-for="(item, index) in List" :key="index">
		             <image class="img" :src="item.src" mode="aspectFill"></image>
					 <view @click="enter" class="cover" v-if="index==2">立即体验</view>
		         </swiper-item>
		     </swiper>
	   </view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				List:[
					{src:"/static/002.jpg"},
					{src:"/static/004.jpg"},
					{src:"/static/005.jpg"},
				]
			}
		},
		onLoad() {
		},
		methods: {
			enter:function(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
uni-page-body{
		height: 100%;
	}

.guide ,.swiper{
	height: 100%;
	width: 100%;
}
.cover{
	position: relative;
	bottom: 100px;
	left: 50%;
	transform: translateX(-50%);
	width: 120px;
	border: 1px solid #fff;
	text-align: center;
	border-radius: 50px;
	color: #fff;
}
.img{
	width: 100%;
	height: 100%;
}
</style>

