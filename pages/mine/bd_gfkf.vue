<template>
	<view>
		<view class="prohibition">
			<view class="demo" :style="'height:' + customBar + 'px;'">
				<view class="left" :style="'margin-top:' + statusBar + 'px;'">
					<!-- <view class="goreturn" @tap="goBack()" :style="'line-height:' + customBar + 'px;' + 'margin-top:' + statusBar + 'px;'"><</view> -->
					<image class="goreturn" @tap="goBack()" src="https://shop.pangu.mobi/static/mobile/return.png" mode="aspectFit" :style="'margin-top:' + (dhHeight-20)/2 + 'px'"></image>
				</view>
				<view class="title" :style="'line-height:' + customBar + 'px;' + 'margin-top:' + statusBar + 'px;'">官方客服</view>
			</view>
		</view>
		<image src="https://shop.pangu.mobi/static/mobile/bd-pic1.png" mode="widthFix" class="con-image"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				demo: {
					top: 0,
					height: 0,
					returntop:0
				},
				statusBar:0,
				platform:'',
				customBar:0,
				top:0,
				dhHeight:0
			}
		},
		created () {
			// const demo = uni.getMenuButtonBoundingClientRect()
			// //console.log(demo)
			// this.demo.top = demo.top
			// this.demo.height = demo.height+demo.top,
			// this.demo.returntop=demo.height
		},
		onLoad() {
			let that=this
			uni.getSystemInfo({
				success: function(e) {
					//console.log('1111111111')
					//console.log(e)
					that.statusBar=e.statusBarHeight;   // 状态栏的高度
					that.platform=e.platform;
					// customBar为导航栏高度+状态栏高度  一般安卓导航栏为50，ios为45
					if (e.platform == 'android') {
						that.customBar = e.statusBarHeight + 50;
						that.dhHeight=50
					} else {
						that.customBar = e.statusBarHeight + 45;
						that.dhHeight=45
					}
					//console.log(that.customBar)
				}
			})
		},
		methods:{
			goBack(){
				uni.switchTab({
					url:'./my_index'
				})
			}
		}
	}
</script>

<style>
	.demo{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fb2711;
		font-size: 26rpx;
		color:white;
	}
	.left{
		float: left;
		position: absolute;
		width: max-content;
		height: max-content;
		/* top: -25rpx; */
		top: 0;
		bottom: 0;
		left: 20rpx;
		margin: auto;
	}
	.title{
		color:white;
	}
	.goreturn{ width:20px; height: 20px;}
	.con-image{
		width:90%;
		margin:auto;
		display: block;
		margin-top:50rpx;
	}
</style>
