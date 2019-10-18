<template>
	 <view class="main">
		<!-- 地址、搜索框 -->
		<view style="height: 50px;">
			<view class="haerd">
				<view>
					<span>{{city}}</span>
					<uni-icons  type="location" size="20"></uni-icons>
				</view>
				<view>
					<input style="width: 100%;" class="searchStyle" type="text" confirm-type="search" placeholder="请输入搜索关键词"/>
				</view>
				<view>
					<uni-icons @click="scan" type="scan" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 轮播 -->
	     <view>
			 <swiper class="swiper"  indicator-color="#ccc" indicator-active-color="pink" :indicator-dots="true" :autoplay="true">
			        <swiper-item  v-for="item in 3" :key="item">{{item}}</swiper-item>
			</swiper>					
		</view>
		<!-- 视频播放 -->
	<!-- 	<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video id="myVideo" style="width: 100%;" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
					@error="videoErrorCallback" :danmu-list="danmuList"  enable-danmu danmu-btn controls></video>
			</view>
			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button type="primary" @click="sendDanmu" class="page-body-button">发送弹幕</button>
			</view>
		</view> -->
		<!-- 数据列表 -->
		<view class="conten1">
			<view class="conten1 con" v-for="item in list" :key="item.i">
			{{item.i}}
			<view @click="share">分享</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {uniNavBar,uniIcons},
		data() {
			return {
				src: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				city:'城市',
				danmuValue: '',
				list:[
					{i:1,},{i:2,},{i:3,},{i:4,},{i:5,},{i:6,},
				]
			}
		},
		onLoad() {
			// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			  const value = uni.getStorageSync('launchFlag');
			  if (value) {
			    // 如何已经有，直接去home首页
			    // uni.switchTab({
			    //   url: '/pages/index/index'
			    // });
			  } else {
			    // 没有值，跳到引导页，并存储，下次打开就不会进去引导页
			    uni.setStorage({
			      key: 'launchFlag',
			      data: true
			    });
			    uni.navigateTo({
			      url: '/pages/guide/guide'
			    });
			  }
			  this.location();
		},
		onReady: function(res) {
		        // #ifndef MP-ALIPAY
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
		 },
		methods: {
			location:function(){
				uni.getLocation({
				  // 默认为 wgs84 返回 gps 坐标，
				  // gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
				  type: 'wgs84',
				  geocode: true,
				  success: (data) => {
				    if (data.address){
				      // this.location = data;
					  console.log(data)
				    }
				  },
				  fail: (err) => {
				    console.log(err)
				    // this.$api.msg('获取定位失败');
				  }
				})
			},
			sendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.danmuValue, //弹幕文字
					color: this.getRandomColor() //颜色
				});
				this.danmuValue = '';  //结束后清空
			},
			videoErrorCallback: function(e) { //播放错误回调
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() { //随机色生成
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			},
			share:function(){
				console.log('分享')
			},
			scan:function(){
				uni.navigateTo({
				    url: '/pages/identification/identification'
				});
			}
		}
	}
</script>

<style>
	
	.main{
		font-size: 16px;
		width: 100%;
		height: 100%;
		}
	.haerd{
		width: 100%;
		height: 50px;
		display: inline-flex;
		justify-content:space-around;
		align-items:center;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		z-index: 10000;
	}
	.haerd view{
		flex-direction: column;
		width: 20%;
		text-align: center;
	}
	.haerd view:nth-child(2){
		flex: 1;
		text-align: left;
	}
	.searchStyle{
		border-radius: 2%;
		background: #F6F6F6;
		width: 100%;
	}
   .swiper{
	   height: 200px;
	}
   .conten1{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.conten1 .con{
		width: 48%;
		height: 200px;
		background: pink;
		flex-direction: column;
		margin:1%;
		position: relative;
		box-shadow: #C8C8C8 1px 1px 1px;
	}
	.conten1 .con view{
		position: absolute;
		bottom: 0;
		background: #fff;
		width: 100%;
		text-align: center;
		padding: 10px;
		box-sizing: border-box;
	}
</style>
