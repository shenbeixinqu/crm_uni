<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<image src="https://shop.pangu.mobi/static/mobile/complete.jpg" mode="widthFix"></image>
		<view class="ok" @tap="back()">知道了</view>
		<!-- #endif -->
		<!-- 在百度小程序里时显示 -->
		<!-- #ifdef MP-BAIDU -->
		<image src="https://shop.pangu.mobi/static/mobile/baidu-contact.png" mode="widthFix"></image>
		<image src="../../static/baidu-savebtn.png" mode="widthFix" @tap="savePic()" class="savepic"></image>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ewm:''
			}
		},
		onLoad() {
			let that=this
			uni.request({
				url: that.$burl+'/help_center',
				success:(res)=>{
					console.log(res)
					that.ewm=res.data.data.result[0]
				}
			})
		},
		methods:{
			back(){
				uni.navigateBack()
			},
			savePic(){
				let that=this
				let imgSrc = 'https://shop.pangu.mobi'+that.ewm.url;
				uni.downloadFile({
				    url: imgSrc,
					success: function (res) {
						console.log(res);
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
						    filePath: res.tempFilePath,
						    success: function (data) {
								uni.showToast({
									title: '保存成功',
								    icon: 'success',
								    duration: 2000
								})
						    },
						})
				    },
				    fail(res){
					    console.log(res)
				    }
				})
			}
		}
	}
</script>

<style>
	.ok{ width:80%; margin:auto; background: blue; color:white; text-align:center; line-height: 80rpx; border-radius: 50rpx; height:80rpx; margin-bottom:20rpx;}
	.savepic{ width:80%; margin-top:20rpx; display: block; margin:auto;}
</style>
