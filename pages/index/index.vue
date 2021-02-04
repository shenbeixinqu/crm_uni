<template>
	<view class="content">
		<view class="indexconent">线索&客户</view>
		<view class="indeximg">
			<view class="index_n_img">
				<image class="index_image" src="../../static/addmx.png" mode="aspectFit"></image>
				<h4>新增线索</h4>
			</view>
			<view class="index_n_img">
				<image class="index_image" src="../../static/ssxx.png" mode="aspectFit"></image>
				<h4>搜索线索</h4>
			</view>
			<view class="index_n_img">
				<image class="index_image" src="../../static/woxs.png" mode="aspectFit"></image>
				<h4>新增线索</h4>
			</view>
			<view class="index_n_img">
				<image class="index_image" src="../../static/wdkh.png" mode="aspectFit"></image>
				<h4>我的客户</h4>
			</view>

		</view>
		<view class="indexconent">出访</view>
		<view class="indeximg">
			<view class="index_n_img">
				<image class="index_image" src="../../static/cfsq.png" mode="aspectFit"></image>
				<h4>出访申请</h4>
			</view>
			<view class="index_n_img">
				<image class="index_image" src="../../static/wdcf.png" mode="aspectFit"></image>
				<h4>我的出访</h4>
			</view>

		</view>
		<view class="indexconent">审核</view>
		<view class="indeximg">
			<view class="index_n_img">
				<image class="index_image" src="../../static/gjsh.png" mode="aspectFit"></image>
				<h4>跟进线索审核</h4>
			</view>
			<view class="index_n_img">
				<image class="index_image" src="../../static/wdxs.png" mode="aspectFit"></image>
				<h4>线索延期审核</h4>
			</view>

		</view>
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
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.indexconent {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		background: #f2f2f2;
		text-align: left;
		font-size: 30rpx;
		text-indent: 10rpx;
		color: #666666;
		display: flex;
	}

	.indeximg {
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		width: 90%;
		display: flex;
		justify-content: left;
	}

	.index_n_img {
		width: 24%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.index_image {
		width: 60rpx;
		height: 60rpx;
		display: flex;
	}

	.index_n_img h4 {
		width: 100%;
		display: flex;
		margin-top: 10rpx;
		font-size: 26rpx;
		font-weight: normal;
		justify-content: center;
	}
</style>
