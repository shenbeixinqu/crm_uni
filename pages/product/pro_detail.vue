<template>
	<view class="content">
		<!-- 头部轮播图 -->
		<view class="top-part banner-part">
			<swiper class="banner-swiper" :autoplay="true" :interval="3000" :circular="true">
				<swiper-item v-for="(item,index) in detailData.img_url" :key="index">
					<image class="swiper-img" :src="imgurl+item" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<view class="goreturn" @tap="goBack()">
				<image class="return-btn" src="https://shop.pangu.mobi/static/mobile/return.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="greybar"></view>
		<view class="type-part">
			<view class="left-part">
				<span></span>
				<view class="left-text oline">{{detailData.pro_name}}</view>
			</view>
			<view class="right-part">已有{{detailData.buy_count?detailData.buy_count:0}}人购买</view>
		</view>
		<view class="greybar"></view>
		<!-- 详情 -->
		<view class="content-part main">
			<!-- <rich-text :nodes="detailData.pro_about" @tap="imageChange($event)"></rich-text> -->
			<view v-for="(item,index) in img" :key="index">
				<image class='img' @tap='chooseImg' :src="item" :data-src="item" style="width:100%; height:auto; display:block; margin:0px 0;" mode="widthFix"></image>
			</view>
		</view>
		<view class="zhanwei"></view>
		<!-- 底部 -->
		<view class="bottom-part">
			<!-- <view class="bottom-item" @tap="sharePro()">
				<image class="item-img" src="https://shop.pangu.mobi/static/mobile/share.png" mode="aspectFit"></image>
				<view class="item-text">分享</view>
			</view> -->
			<button class="bottom-item d-left" open-type="share" @tap="sharePro()" hover-class='none'>
				<image class="item-img" src="https://shop.pangu.mobi/static/mobile/share.png" mode="aspectFit"></image>
				<view class="item-text" style="margin-top:-16rpx;">分享</view>
			</button>
			<view class="bottom-item" @tap="changeCollect()">
				<image class="item-img collect" :src="isCollect?'https://shop.pangu.mobi/static/mobile/collect2.png':'https://shop.pangu.mobi/static/mobile/collect.png'" mode="aspectFit"></image>
				<view class="item-text">{{isCollect?'已收藏':'收藏'}}</view>
			</view>
			<view class="bottom-item add-btn" @tap="goAddinfo()">添加线索</view>
		</view>
		<!-- 微信分享弹出框 -->
		<view v-if="isWxShow" class="mask-box" @touchmove.stop.prevent="doNothing">
			<view class="info-part">
				<image class="share-img" src="https://shop.pangu.mobi/static/mobile/rightShare.png" mode="aspectFit"></image>
				<view class="share-text">请点击右上角进行分享</view>
				<view class="know-btn" @tap="closeWxMask()">我知道了</view>
			</view>
		</view>
		<!-- 登录弹出框 -->
		<!-- <view v-if="isLoginShow" class="mask-box" @touchmove.stop.prevent="doNothing">
			<view class="content-box">
				<image class="pop-img" src="https://shop.pangu.mobi/static/mobile/popImg.png" mode="aspectFit"></image>
				<view class="title">您还未登录</view>
				<view class="des">(请先登录/注册再进行此操作)</view>
				<view class="login-btn" @tap="goLogin(1)">登录</view>
				<view class="des" @tap="goLogin(2)">还未注册，我要注册</view>
			</view>
			<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/close.png" mode="aspectFit" @tap="closeLoginMask()"></image>
		</view> -->
		<!-- 微信授权登录弹出框 -->
		<view v-if="isLoginShow" class="mask-box">
			<view class="login-box">
				<view class="tip">您还未登录，请先登录！</view>
				<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="login-btn">授权登录</button>
			</view>
			<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/close.png" mode="aspectFit" @tap="closeLoginMask()"></image>
		</view>
	
	
		<!-- 点击富文本图片变大 -->
		<!-- <view class="popup" v-show="imgShow" @click="imgHide()">
			<view class="mask"></view>
			<view class="img_wrap">
				<image :src="popupImgSrc" mode="widthFix"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	// import nativeShare from 'nativeShare'
	import authorize from '../../authorize.js'
	export default {
		data() {
			return {
				bannerList: ["/static/uploads/805562a7-f49f-4431-9bb7-3030288af491.jpg","/static/uploads/cca51b44-bd18-43ba-84f5-2d56100a5d11.jpg"],
				user_id: '',
				sjid: '',
				detailData: {},
				isCollect: false,
				// 微信分享弹出框
				isWxShow: false,
				// 登录弹出框
				isLoginShow: false,
				imgShow:false,
				popupImgSrc:'',
				re_code:'',
				status:'',
				path:'',
				img:[],
				imgurl:'',
				user_id:''
			}
		},
		onLoad(options) {
			this.imgurl=this.$imgurl
			this.re_code=uni.getStorageSync("re_code")
			this.status=uni.getStorageSync("status")
			this.sjid = options.id;
			this.user_id=uni.getStorageSync("user_id")
			this.getDetail();
			// this.getData();
			this.path=options.path
			console.log(this.path)
		},
		onShow() {
			this.user_id = uni.getStorageSync('user_id');
			if(this.user_id) {
				this.getisCollect();
			}
		},
		methods: {
			// 授权登录
			getUserInfo(){
				authorize.login()
				this.isLoginShow=false
			},
			// 获取产品详情，
			async getDetail() {
				let that = this;
				uni.showLoading({title: '加载中'});
				setTimeout(()=>{
					uni.hideLoading();
				},500)
				let param = '?pid='+that.sjid+'&user_id='+that.user_id;
				let res = await that.$api.commonMethod('/pro_detail'+param,'GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					that.detailData = da.data.pro_detail_li.pro_detail;
					if(that.detailData.pro_about.indexOf('img')!=-1){ //判断img是否存在
					    var result = that.detailData.pro_about.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
							that.img.push(that.$imgurl+ capture)
						    // return '<img src=' +'https://shop.pangu.mobi'+ capture+' style="max-width:100%;height:auto;display:block;margin:0px 0;"/>';
							return '';
					    });
					    that.detailData.pro_about=result
					}
				}
			},
			// 富文本点击放大图片
			chooseImg: function (e) {  
				var src = e.currentTarget.dataset.src;
				var urls = [];
				urls[0] = src;
				uni.previewImage({
					current: src, // 当前显示图片的http链接  
					urls: urls
				})
			},
			// imageChange(e){
			// 	var that=this;
			// 	that.imgShow=true;
			// 	// var result = that.detailData.pro_about.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {});
			// 	var result = that.detailData.pro_about.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
			// 		that.img.push(capture);
			// 		return '';
			// 	});
			// 	console.log(333,result)
			// 	var imgReg=/<img.+src=\"?(.+\.(jpg|jpeg|gif|bmp|bnp|png))\"?.+>/i;
			// 	var imgArr=result.match(imgReg);
			// 	console.log(imgArr[0])
			// 	that.popupImgSrc=result.match(imgReg)[1];
			// },
			// 获取用户是否收藏该产品
			async getisCollect() {
				let that = this;
				let param = '?user_id='+that.user_id+'&pro_id='+that.sjid;
				let res = await that.$api.commonMethod('/whether_collect'+param,'GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					that.isCollect = da.data.type==1?true:false;
				}
			},
			goBack() {
				if(this.path=='index'){
					uni.navigateBack()
					// uni.redirectTo({
					//     url: '../index/index'
					// });
				}else if(this.path=='mycollects'){
					uni.navigateBack({
						url: '../mine/my_collects'
					})
				}else if(this.path=='pro_list'){
					uni.navigateBack({
						url: '../product/pro_list'
					})
				}else{
					uni.redirectTo({
					    url: '../index/index'
					});
				}
			},
			// 分享产品
			onShareAppMessage(res) {
			    return {
					path: 'pages/product/pro_detail?id='+this.sjid
			    }
			},
			// sharePro() {
			// 	if(this.isWechat()) {
			// 		this.isWxShow = true;
			// 	}else{
			// 		let nativeShare = new NativeShare();
			// 		try{
			// 			nativeShare.call('default');
			// 		}catch(err) {
			// 			alert('请使用浏览器自带分享功能');
			// 		}
			// 	}
			// },
			// 判断是否在微信中
			// isWechat() {
			// 	var ua = window.navigator.userAgent.toLowerCase();
			// 	if(ua.match(/micromessenger/i) == 'micromessenger') {
			// 		//console.log('是微信客户端')
			// 		return true;
			// 	}else{
			// 		//console.log('不是微信客户端')
			// 		return false;
			// 	}
			// },
			// 关闭微信弹出框
			closeWxMask() {this.isWxShow = false},
			// 收藏、取消收藏
			async changeCollect() {
				// let that = this;
				// if(that.user_id) {
				// 	let action = 0;
				// 	action = that.isCollect?0:1;
				// 	let param = '?user_id='+that.user_id+'&pro_id='+that.sjid+'&action='+action;
				// 	let res = await that.$api.commonMethod('/pro_collect'+param,'GET');
				// 	if(res.statusCode==200&&res.data.errno==0) {
				// 		that.isCollect = !that.isCollect;
				// 	}else{
				// 		uni.showToast({
				// 		    title: '请稍后重试',
				// 			icon: 'none'
				// 		});
				// 	}
				// }else{
				// 	that.openLogin();
				// }
				let that = this;
				if(uni.getStorageSync("token")){
					let action = 0;
					action = that.isCollect?0:1;
					let param = '?user_id='+that.user_id+'&pro_id='+that.sjid+'&action='+action;
					let res = await that.$api.commonMethod('/pro_collect'+param,'GET');
					if(res.statusCode==200&&res.data.errno==0) {
						that.isCollect = !that.isCollect;
					}else{
						uni.showToast({
						    title: '请稍后重试',
							icon: 'none'
						});
					}
				}else{
					// that.openLogin();
					uni.navigateTo({
						url: '../login/login_new?path=2&&id='+this.sjid
					});
				}
			},
			// 添加线索
			goAddinfo() {
				if(uni.getStorageSync("token")){
					if(uni.getStorageSync("status")==11){
						uni.navigateTo({
							url: '../clue/clue?id='+this.sjid
						});
					}else{
						uni.navigateTo({
							url: '../mine/my_info_new?addinfo=1'
						});
					}
				}else{
					uni.navigateTo({
						url: '../login/login_new?path=2&&id='+this.sjid
					});
				}
			},
			// 打开登录弹出框
			openLogin() {
				this.isLoginShow = true
			},
			// 跳转登录
			goLogin(num) {
				uni.navigateTo({
					url: '/pages/login/login?isShow='+num
				});
			},
			// 关闭登录弹出框
			closeLoginMask() {
				this.isLoginShow = false
			},
		}
	}
</script>

<style scoped>
	/* 点击富文本图片变大弹出框 */
	.popup{width:100%; height:100%; position:fixed; top:0; left:0;}
	.popup .mask{width:100%; height:100%; position:absolute; top:0; left:0; z-index:0; background: black; opacity:0.5;}
	.popup image{width:100%; height:100%;display: block;position: absolute;left:0%;right:0%;transfrom:translate(-50%,-50%);z-index:2;}
	
	.top-part{width: 100%;height:500rpx;position: relative;}
	.banner-swiper,.swiper-img{width: 100%;height: 100%;}
	.goreturn{width:140rpx; height: 140rpx; position: fixed; top:20rpx;lefT:0;z-index:4;}
	.return-btn{width:24rpx;height: 48rpx;margin: 50rpx 0 0 30rpx;position: absolute;top: 0; z-index:4; left:0;}
	.type-part{width: 100%;height: 100rpx;padding: 0 30rpx;}
	.left-part{float: left;}
	.left-text{font-size: 32rpx;line-height: 100rpx;float: left;width: 350rpx;}
	.left-part span{width: 8rpx;height: 40rpx;border-radius: 5rpx;background-color: #f1b81f;float: left;margin: 30rpx 15rpx 0 0;}
	.right-part{font-size: 32rpx;color: #666666;line-height: 100rpx;float: right;}
	.content-part{padding-top: 20rpx;}
	.bottom-part{position: fixed;bottom: 0;width: 100%;height: 135rpx;border-top: 1px solid #cbcbcb;background-color: #fff;padding: 20rpx 30rpx 0;}
	.bottom-item{display: inline-block;width: 110rpx; background: white;}
	.item-img{width: 48rpx;height: 46rpx;margin: 10rpx auto 5rpx;}
	.item-img.collect{ margin-top:-10rpx;}
	.item-text{font-size: 28rpx;color: #666666;text-align: center;}
	.add-btn{width: 438rpx;height: 90rpx;text-align: center;background-color: #f52f0e;color: #fff;font-size: 34rpx;line-height: 90rpx;border-radius: 15rpx;float: right;}
	.info-part{overflow: hidden;}
	.share-img{width: 325rpx;height: 172rpx;position: absolute;right: 0;}
	.share-text{font-size: 36rpx;width: 240rpx;margin: 180rpx auto 0;line-height: 60rpx;color: #fff;text-align: center;}
	.know-btn{font-size: 36rpx;width: 250rpx;height: 90rpx;margin: 480rpx auto 0;line-height: 90rpx;color: #fff;text-align: center;border: 1px dashed #fff;border-radius: 10rpx;}
	.content-box{width: 575rpx;height: 580rpx;background-color: #fff;border-radius: 10rpx;margin: 350rpx auto 30rpx;position: relative;}
	.content-box .pop-img{width: 282rpx;height: 282rpx;margin: -141rpx auto 0;position: absolute;left: 0;right: 0;}
	.content-box .title{font-size: 42rpx;text-align: center;padding-top: 190rpx;}
	.content-box .des{font-size: 30rpx;color: #666666;text-align: center;padding-top: 35rpx;}
	.content-box .login-btn{width: 490rpx;height: 90rpx;background-color: #f62f0e;color: #fff;font-size: 32rpx;text-align: center;margin: 60rpx auto 0;line-height: 90rpx;border-radius: 45rpx;}
	.close-btn{width: 69rpx;height: 69rpx;margin: 0 auto;}
	
	/* 微信授权弹出框 */
	.login-box{ width:60%; padding:50rpx 0; background: white; border-radius: 10rpx; position: relative; left:20%; top:35%;}
	.login-box .tip{ color: black; font-size:30rpx; text-align: center;}
	.login-box .login-btn{ width: 90%; height: 90rpx; margin:auto; background-color: #f62f0e; color: #fff; font-size: 32rpx; text-align: center; line-height: 90rpx; border-radius: 45rpx; margin-top: 50rpx;}
	.close-btn{width: 69rpx;height: 69rpx;margin: 0 auto; margin-top:500rpx;}
	button{ padding:0; background-color: none; overflow: inherit;}
	button::after {border: none;}
</style>