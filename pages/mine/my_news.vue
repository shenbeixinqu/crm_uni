<template>
	<view>
		<view class="top-part">
			<view class="head-part">
				<image id="return-btn" src="https://shop.pangu.mobi/static/mobile/return.png" mode="aspectFit" @tap="goBack()"></image>
				<view class="head-title">我的消息</view>
			</view>
		</view>
		<view v-if="news.length==0" class="nodata-part">
			<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
			<view class="nodata-text">暂无内容</view>
		</view>
		<view class="news" v-else>
			<view class="news-inner">
				<view class="new-box" v-for="(item,index) in news" :key="index">
					<view class="new-box-inner d-between">
						<view>
							<view class="new-box-tit" v-if="item.readed==null">{{item.reason}}</view>
							<view class="new-box-tit readed" v-if="item.readed==1">{{item.reason}}</view>
							<view class="new-box-time">{{item.time}}</view>
						</view>
						<view class="yuan" v-if="item.readed==null"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				news:'',
				user_id:''
			}
		},
		onLoad(options){
			this.user_id=uni.getStorageSync("user_id")
			//console.log(uni.getStorageSync("user_id"))
			uni.request({
				url:this.$burl+'/message_num',
				data:{
					user_id:this.user_id,
				},
				success:(res)=>{
					//console.log(res)
					this.news=res.data.data.messages
					uni.request({
						url:this.$burl+'/message_readed',     //读消息
						data:{
							user_id:this.user_id
						},
						success:(res)=>{
							//console.log(res)
						}
					})
				}
			})
		},
		methods:{
			goBack() {
				uni.reLaunch({
					url: '../mine/my_index'
				});
			},
		}
	}
</script>

<style>
	page{ background: #ffffff;}
	.news{ background: #f6f7f9; padding-bottom:28rpx;}
	.news-inner{ padding-top:30rpx;}
	.top-part{width: 100%; height: 130rpx; background: #fb2711;}
	.head-part{height: 110rpx; position: relative;}
	#return-btn{width:20rpx; height: 45rpx; padding: 65rpx 50rpx 30rpx 22rpx; position: absolute;}
	.head-title{font-size: 36rpx; color: #fff; text-align: center; padding-top: 60rpx;}
	.new-box{ width:90%; margin:auto; padding:43rpx 0 30rpx 0; background: #ffffff; border-bottom:4rpx solid #e3e4e6; border-left:2rpx solid #e3e4e6; border-right:2rpx solid #e3e4e6;}
	.new-box-inner{ width:90%; margin:auto;}
	.new-box-inner .yuan{ width:20rpx; height:20rpx; background: #fb2711; border-radius:50%;}
	.new-box-tit{ color:#333333; font-size: 30rpx; line-height: 34rpx;}
	.new-box-tit.readed{ color:#a1a0a0;}
	.new-box-time{ color:#888585; font-size: 24rpx; margin-top: 21rpx;}
</style>
