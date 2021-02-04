<template>
	<view class="footer-part">
		<view :class="['foot-item',nowFoot==1?'now-foot':'']" @tap="goHome()">
			<image class="img" v-if="nowFoot==1" src="../static/home1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=1" src="../static/home.png" mode="aspectFit"></image>
			<view class="text">首页</view>
		</view>
		<view :class="['foot-item',nowFoot==2?'now-foot':'']" @tap="goMine()">
			<image class="img" v-if="nowFoot==2" src="../static/user1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=2" src="../static/user.png" mode="aspectFit"></image>
			<view class="text">我的</view>
		</view>
		<view :class="['foot-item',nowFoot==3?'now-foot':'']" @tap="goMine()">
			<image class="img" v-if="nowFoot==3" src="../static/ke1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=3" src="../static/ke.png" mode="aspectFit"></image>
			<view class="text">客户</view>
		</view>
		<view :class="['foot-item',nowFoot==4?'now-foot':'']" @tap="goMine()">
			<image class="img" v-if="nowFoot==4" src="../static/xian1.png" mode="aspectFit"></image>
			<image class="img" v-if="nowFoot!=4" src="../static/xian.png" mode="aspectFit"></image>
			<view class="text">线索</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户信息
				user_id: '',
				user_name: '',
				user_phone: '',
				nowFoot: 1,
			}
		},
		mounted() {
			let that = this;
			that.user_id = uni.getStorageSync('user_id');
			that.user_name = uni.getStorageSync('user_name');
			that.user_phone = uni.getStorageSync('user_phone');
			/// 获取当前路由
			// let nowRoute = window.location.hash;
			let pages = getCurrentPages();
			let currpage = null;
			if (pages.length) currpage = pages[pages.length - 1];
			let nowRoute = currpage.route
			if (nowRoute) {
				if (nowRoute.indexOf('index/index') != -1) {
					that.nowFoot = 1;
				} else if (nowRoute.indexOf('mine') != -1) {
					that.nowFoot = 3;
				} else if (nowRoute.indexOf('login_new') != -1) {
					that.nowFoot = 2;
				}
			}
		},
		methods: {
			// 首页
			goHome() {
				if (this.nowFoot != 1) {
					uni.redirectTo({
						url: '../index/index'
					});
					this.nowFoot = 1
				}
			},
			// 添加线索
			goAddinfo() {
				let re_code = uni.getStorageSync("re_code")
				if (uni.getStorageSync("token")) {
					if (uni.getStorageSync("status") == 11) {
						uni.navigateTo({
							url: '../clue/clue'
						})
					} else {
						uni.navigateTo({
							url: '../mine/my_info_new?addinfo=1'
						});
					}
				} else {
					uni.navigateTo({
						url: '../login/login_new?path=1'
					})
				}
			},
			// 我的
			goMine() {
				if (this.nowFoot != 2) {
					uni.reLaunch({
						url: '../searchclue/searchclue'
					});
					this.nowFoot = 3
				}
			},
		}
	};
</script>

<style scoped>
	.footer-part {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		z-index: 9;
		border-top: 1px solid #ececec;
		display: flex;
		background-color: #fff;
	}

	.foot-item {
		flex: 1;
		text-align: center;
		margin-top: 20rpx;
	}

	.img {
		width: 45rpx;
		height: 46rpx;
		margin: 0 auto 5rpx;
	}

	.add-img {
		width: 133rpx;
		height: 133rpx;
		margin: -85rpx auto 0;
	}

	.text {
		font-size: 28rpx;
		color: #999999;
	}

	.now-foot .text {
		color: #4873c1;
	}
</style>
