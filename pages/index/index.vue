<template>
<view>
	
	<foot-part @openLogin="openLogin"></foot-part>
		
</view>
	
		
</template>

<script>
	import authorize from '../../authorize.js';
	import utils from '../../utils.js';
	export default {
		data() {
			return {
				msg: "",
				bannerList: [],
				menuList: [],
				ggwList: '',
				newsList: [],
				selectTab: '',
				tabList: [],
				isAll: false,
				nowPage: 1,
				dataList: [],
				// 登录弹出框
				isLoginShow: false,
				isFixed: false,
				myScroll: 0,
				user_id: '',
				re_code: '',
				superior_id: '',
				status: '',
				from: 'index',
				imgurl: '',
				curDot: 0,
				recommendedOne: [],
				recommendedTwo: [],
				user_id: '',
				recommendedData: [],
				recommeded: true,
				recentData: [],
				recentDataOne: [],
				recentDataTwo: [],
				jztip: false,
				jz: '加载中...',
				rqpopup: false
			}
		},
		onLoad(options) {
			////console.log('我是onLoad函数')
			this.imgurl = this.$imgurl
			this.re_code = uni.getStorageSync("re_code")
			this.status = uni.getStorageSync("status")
			this.user_id = uni.getStorageSync("user_id")
			// #ifdef MP-WEIXIN
			var scene = options.scene
			uni.setStorageSync('superior_id', scene)
			// #endif
			// #ifdef MP-BAIDU
			var scene = decodeURIComponent(options.q);
			// var scene = decodeURIComponent(options.q).toString();
			if (scene !== 'undefined') {
				var pobj = utils.getUrlParams(scene)
				uni.setStorageSync('superior_id', pobj.superior_id)
			}
			// #endif
			// this.getMenuData();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			this.getData();
			this.getTabData();
			this.getProData();
			this.getRecommendData()
			// this.getRecentData()
		},
		onShow() {
			////console.log('我是onShow函数')
			// this.isLoginShow = false;
			this.getRecentData()
		},
		onReady() {
			////console.log('我是onReady函数')
		},
		onReachBottom() {
			this.getNextData();
		},
		methods: {
			// 企业微信-联系我插件
			startmessage() {
				////console.log('-----------------------')
				uni.navigateTo({
					url: '../mine/my_know'
				})
			},
			// 保存图片
			saveNewImg() {
				let that = this
				let imgSrc = 'https://shop.pangu.mobi/static/mobile/wx_rq_img.jpg';
				uni.downloadFile({
					url: imgSrc,
					success: function(res) {
						////console.log(res);
						//图片保存到本地
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(data) {
								uni.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								})
							},
						})
					},
					fail(res) {
						////console.log(res)
					}
				})
			},
			// 点击banner跳转页面
			goImg() {
				uni.navigateTo({
					url: '../product/pro_img'
				})
			},
			// 点击广告位加入合伙人群
			goJoinParty() {
				// 已登录
				if (uni.getStorageSync("token")) {
					// 已注册
					if (uni.getStorageSync("status") == 11) {
						// #ifdef MP-WEIXIN
						// 入群弹窗
						this.rqpopup = true
						// #endif
						// #ifdef MP-BAIDU
						// 页面跳转
						uni.navigateTo({
							url: '../mine/bd_rq'
						})
						// #endif
					} else {
						// 未注册
						uni.navigateTo({
							url: '../mine/my_info_new?addinfo=2'
						});
					}
				} else {
					// 未登录
					uni.navigateTo({
						url: '../login/login_new'
					});
				}

			},
			// 关闭入群弹窗
			closeRqparty() {
				this.rqpopup = false
			},
			// 最近浏览向左，
			toLeft() {
				if (this.recentData.length > 3) {
					if (this.curDot == 1) {
						this.curDot = 0
					} else {
						this.curDot == 1
					}
				}
			},
			// 最近浏览向右
			toRight() {
				if (this.recentData.length > 3) {
					if (this.curDot == 0) {
						this.curDot = 1
					} else {
						this.curDot == 0
					}
				}
			},
			swiperChange(e) {
				this.curDot = e.detail.current;
			},
			// 授权登录
			getUserInfo: function() {
				authorize.login()
				this.isLoginShow = false
			},
			// 菜单栏跳转
			goJumpToDetail(item) {
				uni.navigateTo({
					url: '/pages/product/pro_detail?id=' + item.url
				});
			},
			// 获取菜单栏
			// async getMenuData() {
			// 	let that = this;
			// 	let res = await that.$api.commonMethod('/icon','GET');
			// 	if(res.statusCode==200&&res.data.re_code==0) {
			// 		let da = res.data;
			// 		that.menuList = da.data;
			// 	}
			// },
			// 跳转到推荐栏
			jumpToRecommended() {
				this.recommeded = true
				this.selectTab = ''
			},
			// 获取推荐产品
			async getRecommendData() {
				let that = this;
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 500)
				let res = await that.$api.commonMethod('/re_command_pro', 'GET');
				if (res.statusCode == 200 && res.data.re_code == 0) {
					let da = res.data;
					if (da.data.pros_dict_li == 0) {
						that.isAll = true;
						that.getNextData();
					} else {
						that.recommendedData = that.recommendedData.concat(da.data.pros_dict_li);
					}
				}
			},
			// 获取banner、通知、广告位
			async getData() {
				let that = this;
				let res = await that.$api.commonMethod('/consult', 'GET');
				////console.log(res)
				if (res.statusCode == 200 && res.data.re_code == 0) {
					let da = res.data;
					that.bannerList = da.data.index_advert;
					that.newsList = da.data.index_news;
					that.ggwList = da.data.index_ware;
					that.menuList = da.data.index_ware4;
				}
			},
			// 跳转链接
			goJump(item) {
				if (uni.getStorageSync("token")) {
					if (uni.getStorageSync("status") == 11) {
						uni.navigateTo({
							url: '../clue/clue'
						});
					} else {
						uni.navigateTo({
							url: '../mine/my_info_new?addinfo=1'
						});
					}
				} else {
					uni.navigateTo({
						url: '../login/login_new?path=1'
					});
				}
			},
			// 菜单跳转
			goPage(v) {
				uni.navigateTo({
					url: '/pages/product/pro_list?id=' + v.id
				});
			},
			// 获取产品分类
			async getTabData() {
				let that = this;
				let res = await that.$api.commonMethod('/pro_category', 'GET');
				if (res.statusCode == 200 && res.data.re_code == 0) {
					let da = res.data;
					that.tabList = da.data.result;
				}
			},
			// 获取最近浏览
			async getRecentData() {
				let that = this;
				let param = '?user_id=' + that.user_id;
				let res = await that.$api.commonMethod('/recent_browse' + param, 'GET');
				if (res.statusCode == 200 && res.data.re_code == 0) {
					that.recentData = res.data.data
					if (that.recentData.length > 3) {
						that.recentDataOne = that.recentData.slice(0, 3)
						that.recentDataTwo = that.recentData.slice(3, 6)
					}
				}
			},
			// 获取其他产品
			async getProData() {
				let that = this;
				// uni.showLoading({title: '加载中11'});
				that.jztip = true
				let param = '?pid=' + that.selectTab + '&page=' + that.nowPage + '&per_page=8';
				let res = await that.$api.commonMethod('/pro_list' + param, 'GET');
				if (res.statusCode == 200 && res.data.re_code == 0) {
					let da = res.data;
					////console.log(da.data.pros_dict_li)
					if (da.data.pros_dict_li == 0) {
						that.isAll = true;
						that.getNextData();
					} else {
						that.dataList = that.dataList.concat(da.data.pros_dict_li);
						setTimeout(() => {
							// uni.hideLoading();
							that.jz = '已加载全部'
						}, 500)
					}
				}
			},
			changeTab(v) {
				this.recommeded = false
				this.selectTab = v.id;
				this.dataList = [];
				this.isAll = false;
				this.nowPage = 1;
				this.getProData();
			},
			getNextData() {
				if (this.isAll) {
					// this.showToast('已加载全部');
					this.jz = '已加载全部'
					////console.log('已加载全部')
				} else {
					this.nowPage++;
					this.getProData();
				}
			},
			// 跳转产品列表页
			goProduct() {
				uni.navigateTo({
					url: '/pages/product/pro_list'
				});
			},
			// 跳转详情页
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/product/pro_detail?id=' + item.id + '&path=' + this.from
				});
			},
			// 跳转登录页
			goLogin(num) {
				uni.navigateTo({
					url: '/pages/login/login?isShow=' + num
				});
			},
			// 添加线索
			goAddinfo() {
				if (uni.getStorageSync('user_id')) {
					uni.navigateTo({
						url: '../clue/clue'
					});
				} else {
					this.openLogin();
				}
			},
			// 打开登录弹出框
			openLogin() {
				this.isLoginShow = true
			},
			// 关闭登录弹出框
			closeLoginMask() {
				this.isLoginShow = false
			},
			showToast(title) {
				uni.showToast({
					title: title,
					icon: 'none'
				});
			},
		}
	}
</script>

<style scoped>
	.cell-contact {
		width: 70%;
		height: 28px;
		border-radius: 24px;
		text-align: center;
		line-height: 56px;
		display: inline-block;
		margin: auto;
		display: block;
		position: absolute;
		bottom: 36rpx;
		right: 34rpx;
		opacity: 0;
		z-index: 11111;
	}

	.contact-btn {
		position: absolute;
		bottom: 30rpx;
		right: 20rpx;
		background: white;
		border-radius: 50rpx;
	}

	.contact-btn-inner {
		padding: 15rpx 50rpx;
		width: 195rpx;
	}

	.cell--button {
		width: 300rpx;
	}

	.banner-part {
		width: 100%;
		height: 402rpx;
		position: relative;
		top: -3rpx;
	}

	.banner-swiper,
	.swiper-img {
		width: 100%;
		height: 100%;
	}

	.rule-btn {
		position: absolute;
		font-size: 26rpx;
		width: 90rpx;
		height: 45rpx;
		right: 0;
		top: 70rpx;
		background-color: #fff;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		line-height: 45rpx;
		padding-left: 25rpx;
	}

	.menu-part {
		height: 220rpx;
		box-shadow: 0 0 10rpx 1rpx #e7e7e7;
		border-radius: 10rpx;
		margin-top: -30rpx;
		position: relative;
		z-index: 9;
		background-color: #fff;
		display: flex;
	}

	/* .menu-item{ width:33.3%; margin-left:5%; float:left;} */
	.menu-item {
		width: 30.8%;
		margin-left: 2%;
		float: left;
	}

	.menu-item:first-child {
		margin-left: 0;
	}

	.menu-img {
		width: 97rpx;
		height: 79rpx;
		margin: 0 auto;
	}

	/* .menu-text{ font-size: 30rpx; text-align: center; padding-top: 20rpx; overflow: hidden;white-space: nowrap; text-overflow: ellipsis;} */
	.menu-text {
		font-size: 30rpx;
		text-align: center;
		padding-top: 20rpx;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
	}

	.ggw-img {
		height: 184rpx;
		width: 723rpx;
		margin: 15rpx auto 0;
		position: relative;
		z-index: 111;
	}

	.new-part {
		height: 80rpx;
	}

	.new-img {
		width: 63rpx;
		height: 32rpx;
		float: left;
		margin-top: 25rpx;
		margin-right: 20rpx;
	}

	.new-swiper {
		height: 80rpx;
		width: calc(100% - 85rpx);
		float: left;
	}

	.new-text {
		font-size: 28rpx;
		color: #5d5d5d;
		line-height: 85rpx;
	}

	.new-text span {
		font-size: 22rpx;
		color: #a5abae;
		margin-left: 22rpx;
		position: relative;
		top: -3rpx;
	}

	.tab-part {
		padding-top: 35rpx;
		height: 85rpx;
		padding: 20rpx 30rpx 0;
	}

	/* .all-item{font-size: 32rpx;width: 160rpx;height: 50rpx;display: inline-block;position: relative; top:4rpx;color: #fe4d2a;font-weight: bold;vertical-align: top;} */
	.all-item {
		font-size: 32rpx;
		display: inline-block;
		position: relative;
		top: 4rpx;
		color: #fe4d2a;
		font-weight: bold;
		vertical-align: top;
	}

	.all-item.all {
		margin-left: 10rpx;
	}

	.tab-scroll-part {
		display: inline-block;
		width: calc(100% - 100rpx);
		height: 60rpx;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		margin-left: 8rpx;
	}

	.scroll-item {
		position: relative;
		display: inline-block;
		margin: 0 15rpx;
	}

	.tab-item {
		font-size: 32rpx;
		height: 40rpx;
		text-align: center;
		position: relative;
		z-index: 9;
	}

	.img-item {
		position: absolute;
		top: 50rpx;
		z-index: 1;
		width: 80%;
		display: none;
		left: 10%;
	}

	/* .tabbg-img1{width: 120rpx;height: 18rpx;float: right;} */
	.tabbg-img1 {
		width: 103rpx;
		height: 8rpx;
		float: right;
	}

	.fixdItem {
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		width: 100%;
		height: 50px;
		background: #ffffff;
		;
	}

	.tabbg-img2 {
		width: 100%;
		height: 18rpx;
		margin-top: 30rpx;
	}

	/* .tabbg-img1.tj{ float: left; top:16rpx; left:-43rpx;} */
	/* .tabbg-img1.tj{ float: left; top:72rpx; left:-33rpx;} */
	.tabbg-img2.tj {
		width: 9%;
		margin-top: 50rpx;
	}

	.tab-active {
		display: block;
	}

	.list-part {
		min-height: 30vh;
	}

	.list-item {
		display: inline-block;
		margin-top: 25rpx;
		width: 322rpx;
		overflow: hidden;
	}

	.list-item:nth-child(2n) {
		margin-left: 30rpx;
	}

	.list-img {
		width: 322rpx;
		height: 240rpx;
		border-radius: 10rpx;
	}

	.list-text {
		font-size: 30rpx;
		text-align: left;
		padding-top: 10rpx;
	}

	.subtit {
		font-size: 24rpx;
		color: #6a6a6a;
		margin-top: 10rpx;
		width: 322rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.content-box {
		width: 575rpx;
		height: 580rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 350rpx auto 30rpx;
		position: relative;
	}

	.content-box .pop-img {
		width: 282rpx;
		height: 282rpx;
		margin: -141rpx auto 0;
		position: absolute;
		left: 0;
		right: 0;
	}

	.content-box .title {
		font-size: 42rpx;
		text-align: center;
		padding-top: 190rpx;
	}

	.content-box .des {
		font-size: 30rpx;
		color: #666666;
		text-align: center;
		padding-top: 35rpx;
	}

	.content-box .login-btn {
		width: 490rpx;
		height: 90rpx;
		background-color: #f62f0e;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		margin: 60rpx auto 0;
		line-height: 90rpx;
		border-radius: 45rpx;
	}

	.close-btn {
		width: 69rpx;
		height: 69rpx;
		margin: 0 auto;
		margin-top: 500rpx;
	}

	/* 微信授权弹出框 */
	.login-box {
		width: 60%;
		padding: 50rpx 0;
		background: white;
		border-radius: 10rpx;
		position: relative;
		left: 20%;
		top: 35%;
	}

	.login-box .tip {
		color: black;
		font-size: 30rpx;
		text-align: center;
	}

	.login-box .login-btn {
		width: 90%;
		height: 90rpx;
		margin: auto;
		background-color: #f62f0e;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		line-height: 90rpx;
		border-radius: 45rpx;
		margin-top: 50rpx;
	}

	.lately {
		color: black;
		font-size: 28rpx;
		position: absolute;
		top: 15rpx;
		left: 30rpx;
	}

	.uni-margin-wrap {
		width: 690rpx;
		margin: 0 30rpx;
	}

	.swiper {
		height: 150rpx;
		width: 90%;
		position: absolute;
		top: 60rpx;
		left: 5%;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.lefticon {
		width: 9px;
		height: 9px;
		border-top: 1px solid black;
		border-right: 1px solid black;
		transform: rotate(225deg);
		position: absolute;
		top: 50rpx;
		left: 50rpx;
	}

	.righticon {
		width: 9px;
		height: 9px;
		border-top: 1px solid black;
		border-right: 1px solid black;
		transform: rotate(45deg);
		position: absolute;
		top: 50rpx;
		right: 50rpx;
	}

	/* .all-item.recommended{ width:70rpx;} */
	.swiper-inner {
		overflow: hidden;
		width: 90%;
		margin: auto;
	}

	.tab-active-tj {
		display: block;
	}

	.leftWrap {
		width: 80rpx;
		height: 150rpx;
		position: absolute;
		top: 50rpx;
		left: -30rpx;
	}

	.rightWrap {
		width: 80rpx;
		height: 150rpx;
		position: absolute;
		top: 50rpx;
		right: -30rpx;
	}

	.jztip {
		margin: 20rpx 0;
		text-align: center;
		color: #666666;
	}

	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111;
	}

	.popup {
		width: 80%;
		position: fixed;
		left: 10%;
		top: 14%;
		z-index: 111111;
	}

	.close-btn1 {
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		z-index: 1;
	}

	.rqimg {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.button-save {
		width: 80%;
		height: 100rpx;
		background: red;
		color: white;
		position: fixed;
		bottom: 5%;
		right: 10%;
		z-index: 1;
		text-align: center;
		line-height: 100rpx;
	}

	.mask1 {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .7);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111;
	}

	.pop-img-wx {
		width: 100%;
	}

	.wx-contact-btn {
		position: absolute;
		bottom: 58rpx;
		right: 50rpx;
		width: 290rpx;
		height: 60rpx;
	}

	.close-wrap {
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		top: -108rpx;
		right: 14rpx;
	}

	.close-wrap.wx {
		top: 1rpx;
		right: 0;
		z-index: 1;
	}

	.close-btn {
		width: 25rpx;
		height: 25rpx;
		padding-top: 21rpx;
		display: block;
		margin: auto;
	}
</style>
