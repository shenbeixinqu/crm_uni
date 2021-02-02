<template>
	<view :class="['content',login?'':'isFixed']">
		<view class="top-part">
			<view class="head-part">
				<view class="head-title">个人中心</view>
				<!-- <image class="set-img" src="https://shop.pangu.mobi/static/mobile/set.png" mode="aspectFit" @tap="openMask()"></image> -->
			</view>
		</view>
		<!-- 账户信息 -->
		<view class="box-part main">
			<view class="info-head d-between">
				<view class="info-head-left d-left">
					<image class="user-img" :src="headpic" mode="aspectFit" v-if="login"></image>
					<image class="user-img" src="https://shop.pangu.mobi/static/mobile/mrtx.png" mode="aspectFit" v-else></image>
					
					<view class="box-top">
						<view class="left-part">
							<view class="title" v-if="status==11">{{name}}</view>
							<!-- <view class="title" v-else>未登录</view> -->
						</view>
						<!-- <block v-if="user_name">
							<view class="left-part">
								<view class="title">{{user_name}}</view>
								<view class="des">{{user_phone}}</view>
							</view>
							<view class="right-btn" @tap="goOut()">退出登录</view>
						</block> -->
						<!-- <block v-else>
							<view class="left-part">
								<view class="title" @tap="goLogin(1)">{{nickname}}</view>
							</view>
						</block> -->
					</view>
				</view>
				<!-- 退出登录 -->
				<button v-if="login" class="login-btn" @tap="exitLogin()">
					<image src="https://shop.pangu.mobi/static/mobile/my_exit_btn.png" class="exit-btn"></image>
				</button>
				<!-- 在微信小程序里时显示 -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="login-btn" v-else>
					<image src="https://shop.pangu.mobi/static/mobile/my_login_btn.png" class="exit-btn"></image>
				</button>
				<!-- #endif -->
				<!-- 在百度小程序里时显示 -->
				<!-- #ifdef MP-BAIDU -->
				<button open-type="getUserInfo" @getuserinfo="baiduGetInfo" class="login-btn" v-else>
					<image src="https://shop.pangu.mobi/static/mobile/my_login_btn.png" class="exit-btn"></image>
				</button>
				<!-- #endif -->
				
			</view>
			<view class="box-bottom d-center">
				<view class="box-bottom-tag">
					<view class="tag-num" v-if="login">{{balance?balance:0}}</view>
					<view class="tag-num" v-else>-</view>
					<view class="tag-item">佣金余额(元)</view>
				</view>
				<view class="xian"></view>
				<view class="box-bottom-tag">
					<view class="tag-num" v-if="login">{{cumul?cumul:0}}</view>
					<view class="tag-num" v-else>-</view>
					<view class="tag-item">累计发放(元)</view>
				</view>
				<view class="xian"></view>
				<view class="box-bottom-tag">
					<view class="tag-num" v-if="login">{{all?all:0}}</view>
					<view class="tag-num" v-else>-</view>
					<view class="tag-item">累计佣金(元)</view>
				</view>
			</view>
			<!-- <view class="box-bottom">
				<view class="des-title">佣金余额（元）</view>
				<view class="money-part">
					<view class="left money-title">{{surplus?surplus:0}}</view>
					<view class="des-right" @tap="goWithdrawal()">
						<image class="money-img" src="https://shop.pangu.mobi/static/mobile/money.png" mode="aspectFit"></image>
						我要提现<span>></span>
					</view>
				</view>
				<view class="des">
					<view class="left">累计提取{{withdraw_sum?withdraw_sum:0}}<span>￥</span></view>
					<view class="right">累计佣金{{charges_sum?charges_sum:0}}<span>￥</span></view>
				</view>
			</view> -->
		</view>
		<!-- 常用功能 -->
		<view class="list-part main">
			<view class="list-title">常用功能</view>
			<view class="list-view">
				<view class="list-item" @tap="goClue()">
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/xsmx.jpg" mode="aspectFit"></image>
					线索明细
				</view>
				<view class="list-item" @tap="goIncome()">
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/szmx.jpg" mode="aspectFit"></image>
					佣金明细
				</view>
				<view class="list-item" @tap="goCollect()">
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/wdsc.jpg" mode="aspectFit"></image>
					我的收藏
				</view>
			</view>
			<view class="list-view">
				<view class="list-item" @tap="goInvite()">
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/yqzc.png" mode="aspectFit"></image>
					邀请注册
				</view>
				<view class="list-item" @tap="goInfoNew()">
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/wdzl.png" mode="aspectFit"></image>
					我的资料
				</view>
				<view class="list-item" @tap="goNews()">
					<view class="num-box" v-if="login==true && messagenum!=0">{{messagenum}}</view>
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/wdxx.png" mode="aspectFit"></image>
					我的消息
				</view>
			</view>
			<view class="list-view two">
				<view class="list-item" @tap="bzzxPopup()">
					<image class="list-img" src="https://shop.pangu.mobi/static/mobile/bzzx.png" mode="aspectFit"></image>
					帮助中心
				</view>
				<view class="list-item">
				</view>
				<view class="list-item">
				</view>
			</view>
		</view>
		<!-- 帮助中心弹出框 -->
		<view class="mask-box" v-if="helppopup">
			<view class="mask" @tap="closeHelpMask()"></view>
			<!-- 在微信小程序里时显示 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="content-box-wx">
				<view @tap="closeHelpMask()" class="close-wrap wx">
					<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/gb.png" mode="aspectFit"></image>
				</view>
				<image class="pop-img-wx" src="https://shop.pangu.mobi/static/mobile/wxpopup-new.jpg" mode="widthFix"></image>
				<cell class="cell-contact" style="width:300rpx;" @startmessage='startmessage()' @completemessage="completemessage()" plugid='53b9c5b553d64abd3d6552b5c5e3c1a3' styleType="2" buttonText="0" blockStyle="button" buttonStyle="primary"/>
				<!-- <view class="contact-btn">
					<image src="https://shop.pangu.mobi/static/mobile/contact-btn.jpg" class="contact-btn-inner" mode="widthFix"></image>
				</view> -->
			</view>
			<!-- #endif -->
			<!-- 在百度小程序里时显示 -->
			<!-- #ifdef MP-BAIDU -->
			<!-- <view class="content-box">
				<image class="pop-img" src="https://shop.pangu.mobi/static/mobile/bzzxbg.png" mode="aspectFit"></image>
				<view @tap="closeHelpMask()" class="close-wrap">
					<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/gb.png" mode="aspectFit"></image>
				</view>
				<view class="help-title">恭喜您，成为盘古合伙人</view>
				<view class="help-tip">有任何疑难问题，请点击保存二维码到手机相册<br />打开微信，扫一扫，选择从相册识别此图<br />添加客服微信</view>
				<image src="https://shop.pangu.mobi/static/mobile/ewm.png" mode="widthFix" class="ewm"></image>
				<image src="https://shop.pangu.mobi/static/mobile/helpsavebtn.png" mode="widthFix" class="helpsavebtn" @tap="savePic()"></image>
			</view> -->
			<view class="content-box-wx">
				<view @tap="closeHelpMask()" class="close-wrap wx">
					<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/gb.png" mode="aspectFit"></image>
				</view>
				<image class="pop-img-wx" src="https://shop.pangu.mobi/static/mobile/wxpopup.jpg" mode="widthFix"></image>
				<!-- <view class="contact-btn d-center" @tap="startmessage()">
					<image src="https://shop.pangu.mobi/static/mobile/contact-btn.jpg" class="contact-btn-inner" mode="widthFix"></image>
				</view> -->
			</view>
			<!-- #endif -->
		</view>
		<!-- 弹出框 -->
		<view v-if="isShow" class="mask-box" @touchmove.stop.prevent="doNothing">
			<view :class='["info-part",isInfoShow?"slidein":"slideout"]'>
				<view class="row-view" @tap="goInfo(1)">修改密码</view>
				<view class="row-view" @tap="goInfo(2)">修改绑定号码</view>
				<view class="row-view cancel-btn" @tap="closeMask()">取消</view>
			</view>
		</view>
		<!-- 登录弹出框 -->
		<view v-if="isLoginShow" class="mask-box" @touchmove.stop.prevent="doNothing">
			<view class="content-box">
				<image class="pop-img" src="https://shop.pangu.mobi/static/mobile/popImg.png" mode="aspectFit"></image>
				<view class="title">您还未登录</view>
				<view class="des">(请先登录/注册再进行此操作)</view>
				<view class="login-btn" @tap="goLogin(1)">登录</view>
				<view class="des" @tap="goLogin(2)">还未注册，我要注册</view>
			</view>
			<image class="close-btn" src="https://shop.pangu.mobi/static/mobile/close.png" mode="aspectFit" @tap="closeLoginMask()"></image>
		</view>
		<!-- 未登录蒙层 -->
		<view class="login-mask" v-if="login==false">
			<view class="login-text">温馨提示<br />授权登录后了解更多</view>
		</view>
		<foot-part @openLogin="openLogin"></foot-part>
	</view>
</template>

<script>
	import authorize from '../../authorize.js';
	export default {
		data() {
			return {
				// 用户信息
				user_id: '',
				user_name: '',
				user_phone: '',
				withdraw_sum: 0,
				charges_sum: 0,
				surplus: 0,
				// 弹出框
				isShow: false,
				isInfoShow: false,
				// 登录弹出框
				isLoginShow: false,
				userinfo:[],
				nickname:'',
				headpic:'',
				re_code:'',
				all:'',
				balance:'',
				cumul:'',
				login:false,
				status:'',
				messagenum:'',
				code:'',
				name:'',
				helppopup:false,
				ewm:'',
				plugid:'c0e42830f82411d26e0bd4725a1e2930'
			}
		},
		onLoad(options){
			console.log('==============================')
			console.log(this.login)
			this.re_code=uni.getStorageSync("re_code")
			this.status=uni.getStorageSync("status")
			console.log(this.status)
			console.log(uni.getStorageSync('superior_id'))
			if(uni.getStorageSync("token")){
				this.login=true
			}else{
				this.login=false
			}
			this.nickname=uni.getStorageSync("userInfo").nickName
			this.headpic=uni.getStorageSync("userInfo").avatarUrl
		},
		onShow() {
			this.user_id = uni.getStorageSync('user_id');
			this.user_name = uni.getStorageSync('user_name');
			this.user_phone = uni.getStorageSync('user_phone');
			this.isShow = false;
			this.isInfoShow = false;
			this.getData();
			this.getMessageNum();
			this.nickname=uni.getStorageSync("userInfo").nickName
			this.headpic=uni.getStorageSync("userInfo").avatarUrl
		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 企业微信-联系我插件
			startmessage(){
				uni.navigateTo({
					url:'./my_know'
				})
			},
			// 帮助中心弹出框
			bzzxPopup(){
				let that=this
				// #ifdef MP-WEIXIN
				uni.request({
					url: that.$burl+'/help_center',
					success:(res)=>{
						console.log(res)
						that.ewm=res.data.data.result[0]
						console.log(that.ewm)
					}
				})
				that.helppopup=true
				// #endif
				// #ifdef MP-BAIDU
				uni.navigateTo({
					url:'./bd_gfkf'
				})
				// #endif
			},
			// 关闭帮助中心弹窗
			closeHelpMask(){
				this.helppopup=false
			},
			// 保存二维码到手机
			savePic(){
			    let that = this;
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
			},
			// 退出登录
			exitLogin(){
				uni.clearStorageSync()
				this.status=uni.getStorageSync("status")
				this.login=false
			},
			// #ifdef MP-WEIXIN
			getUserInfo:function(){
				let that=this;
				uni.login({
					success: function(loginRes) {
						console.log(loginRes)
						if (loginRes.code) {
							uni.getUserInfo({
								success: function(infoRes) {
									var users = JSON.parse(infoRes.rawData)
									uni.setStorageSync('userInfo', users)
									var platUserInfoMap = {}
									platUserInfoMap["encryptedData"] = infoRes.encryptedData;
									platUserInfoMap["iv"] = infoRes.iv;
									uni.request({
										url: that.$burl+'/wxlogin',
										data: { 
											platCode: loginRes.code,
											platUserInfoMap: platUserInfoMap,
											superior_id:uni.getStorageSync('superior_id'),
											type:'1'
										},
										header: {
											"Content-Type": "application/json"
										},
										method: 'POST',
										dataType:'json',
										success:(res)=>{
											console.log(res);
											that.login=true
											uni.showToast({title:res.data.msg, icon:"none"})
											uni.setStorageSync("token", res.data.token)
											uni.setStorageSync("user_id", res.data.user_id)
											uni.setStorageSync("status", res.data.status)
											uni.setStorageSync("type", "1")
											that.nickname=uni.getStorageSync("userInfo").nickName
											that.headpic=uni.getStorageSync("userInfo").avatarUrl
											that.status=uni.getStorageSync("status")
											that.getData()
										},
									})
								},
								fail: function() {
									console.log('获取信息失败')
								}
							});
						} else {
							console.log('调用wx.login获取code失败');
						}
					}
				})
			},
			// #endif
			// #ifdef MP-BAIDU
			baiduGetInfo(e){
				let that=this
				let users=e.detail.userInfo
				console.log(e)
				uni.setStorageSync('userInfo', users)
				var platUserInfoMap = {}
				platUserInfoMap["encryptedData"] = e.detail.encryptedData;
				platUserInfoMap["iv"] = e.detail.iv;
				uni.login({
					success:function(res){
						if(res.code){
							uni.request({
								url: that.$burl+'/wxlogin',
								data: { 
									platCode: res.code,
									platUserInfoMap: platUserInfoMap,
									superior_id:uni.getStorageSync('superior_id'),
									type:'2'
								},
								header: {
									"Content-Type": "application/json"
								},
								method: 'POST',
								dataType:'json',
								success:(res)=>{
									console.log(res)
									that.login=true
									uni.setStorageSync("token", res.data.token)
									uni.setStorageSync("user_id", res.data.user_id)
									uni.setStorageSync("status", res.data.status)
									uni.setStorageSync("type", '2')
									that.nickname=uni.getStorageSync("userInfo").nickName
									that.headpic=uni.getStorageSync("userInfo").avatarUrl
									that.status=uni.getStorageSync("status")
								},
							})
						}
					},
					fail(err) {
						uni.showToast({title:'登陆失败', icon:"none"})
					}
				})
			},
			// #endif
			async getData() {
				let that = this;
				let user_id=uni.getStorageSync("user_id")
				let param = '?user_id='+user_id;
				let res = await that.$api.commonMethod('/person_charge'+param,'GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					console.log(res)
					let da = res.data;
					that.all = da.data.all;   //累计佣金
					that.balance = da.data.balance;   //佣金金额
					that.cumul = da.data.cumul;   //累计发放
					that.name = da.data.name;   //真实姓名
					// uni.setStorageSync('surplus', that.surplus>0?that.surplus:0);
				}
			},
			// 获取消息数量
			async getMessageNum() {
				let that = this;
				let param = '?user_id='+that.user_id;
				let res = await that.$api.commonMethod('/message_num'+param,'GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					console.log(res)
					that.messagenum=res.data.num
				}
			},
			// 弹出框
			openMask() {
				this.isShow = true;
				this.isInfoShow = true;
			},
			closeMask() {
				this.isInfoShow = false;
				setTimeout(()=>{
					this.isShow = false;
				},300)
			},
			// 跳转登录
			goLogin(num) {
				uni.navigateTo({
					url: '/pages/login/login?isShow='+num
				});
			},
			// 跳转修改密码、绑定号码
			goInfo(num) {
				if(this.user_id) {
					uni.navigateTo({
						url: './my_info?show='+num
					});
				}else{
					this.isShow = false;
					this.isInfoShow = false;
					this.openLogin();
				}
			},
			// 跳转提现
			goWithdrawal() {
				if(this.user_id) {
					// if(this.surplus>0) {
						uni.navigateTo({
							url: './my_withdrawal'
						});
					// }else{
					// 	uni.showToast({
					// 	    title: '您的佣金余额为0元，暂时无法提现！',
					// 		icon: 'none'
					// 	});
					// }
				}else{
					this.openLogin();
				}
			},
			// 跳转线索明细
			goClue() {
				if(uni.getStorageSync("status")==11){
					uni.navigateTo({
						url: './my_clues'
					});
				}else{
					uni.navigateTo({
						url: '../mine/my_info_new?addinfo=1'
					});
				}
			},
			// 跳转佣金明细
			goIncome() {
				if(uni.getStorageSync("status")==11){
					uni.navigateTo({
						url: './my_incomes'
					});
				}else{
					uni.navigateTo({
						url: '../mine/my_info_new?addinfo=1'
					});
				}
			},
			// 跳转我的收藏
			goCollect() {
				uni.navigateTo({
					url: './my_collects'
				});
			},
			// 跳转邀请注册
			goInvite(){
				if(uni.getStorageSync("status")==11){
					uni.navigateTo({
						url: './my_invite'
					});
				}else{
					uni.navigateTo({
						url: '../mine/my_info_new?addinfo=1'
					});
				}
			},
			// 跳转我的资料
			goInfoNew(){
				uni.navigateTo({
					url: './my_info_new'
				});
			},
			// 跳转我的消息
			goNews(){
				uni.navigateTo({
					url: './my_news'
				});
			},
			// 打开登录弹出框
			openLogin() {
				this.isLoginShow = true
			},
			// 关闭登录弹出框
			closeLoginMask() {
				this.isLoginShow = false
			},
			// 退出登录
			goOut() {
				uni.showModal({
					title: '提示',
					content: '是否确定退出登录？',
					success: function (res) {
						if(res.confirm) {
							uni.clearStorageSync()
							uni.redirectTo({
								url: '../mine/my_index'
							});
						}
				    }
				});
			},
		}
	}
</script>

<style scoped>
	.content.isFixed{ position:fixed; width:100%;}
	.help-title{ text-align: center; font-size: 42rpx; color: #000000;font-weight: bold; padding-top:150rpx;}
	.help-tip{ text-align: center; font-size: 25rpx; color: #000000; margin-top:46rpx; line-height:40rpx;}
	.helpsavebtn{ width:35%; margin:auto; display: block; margin-top:30rpx;}
	.close-wrap{ width:70rpx; height:70rpx; position:absolute; top:-108rpx; right:14rpx;}
	.close-wrap.wx{ top:1rpx; right:0; z-index:1;}
	.ewm{ width:60%; margin:auto; display: block; margin-top:45rpx;}
	.middle-btn{ color:black; background: white;}
	.login-mask{ width:100%; height:60%; background: rgba(0,0,0,0.2); position:fixed; top:34.3%;}
	.login-text{ color: white; font-size:50rpx; width:70%; left:15%; position: absolute; bottom:15%; text-align: center; text-shadow: 10rpx 10rpx 10rpx rgba(0,0,0,.2);} 
	.d-left{display: flex;justify-content:left;align-items:center;}
	.d-center{display: flex;justify-content: center;align-items: center;}
	.d-between{display: flex; justify-content: space-between;align-items:center;}
	.top-part{width: 100%;height: 459rpx;background: url(../../static/loginBgtop.jpg) no-repeat;background-size: cover;}
	.head-part{height: 110rpx;position: relative;}
	.head-title{font-size: 36rpx;color: #fff;text-align: center;padding-top: 60rpx;}
	.set-img{width: 39rpx;height: 39rpx;position: absolute;right: 30rpx;bottom: 5rpx;}
	.box-part{ width:90%; height: 309rpx;border-radius: 20rpx;box-shadow: 0 0 10rpx 1rpx #ffe5eb;position: relative;margin-top: -245rpx;background-color: #fff; z-index:111;}
	.info-head{ width:90%; margin:auto; padding-top:39rpx;}
	.user-img{width: 100rpx;height: 100rpx; border-radius: 50%;/* border:1rpx solid black; */}
	.left-part{ margin-left: 16rpx;}
	.left-part .title{font-size: 36rpx;}
	.exit-btn{ width: 199rpx; height: 79rpx;}
	.box-bottom{ width:100%; padding:26rpx 0; background: #fafafa; margin-top:30rpx; margin-top: 37rpx; border-bottom-left-radius: 20rpx; border-bottom-right-radius: 20rpx;}
	.xian{ margin:0 42rpx; width:2rpx; height: 50rpx; background: white;}
	.tag-num{ color:#a8853a; font-size: 28rpx; text-align: center;}
	.tag-item{ color:#666666; font-size: 24rpx; margin-top:16rpx; text-align: center;}
	
	.des-title{font-size: 28rpx;font-weight: bold;}
	.money-part{ padding-top: 10rpx;overflow: hidden;}
	.money-title{font-size: 68rpx;color: #fb2212;float: left;}
	.des-right{background-color: #fb2212;width: 235rpx;height: 55rpx;border-radius: 30rpx;font-size: 28rpx;color: #fff;float: right;margin-top: 20rpx;line-height: 55rpx;}
	.des-right span{float: right;padding-right: 25rpx;}
	.money-img{width: 28rpx;height: 26rpx;margin: 15rpx 15rpx 0 30rpx;float: left;}
	.box-bottom .des{font-size: 28rpx;padding-top: 20rpx;}
	.box-bottom .des .left{float: left;}
	.box-bottom .des .right{float: right;}
	.box-bottom .des span{font-size: 26rpx;}
	.list-part{padding-top: 50rpx; padding-bottom: 60rpx;}
	.list-title{font-size: 30rpx;font-weight: bold;}
	.list-view{display: flex; border-bottom: 1rpx solid #f4f5fa;}
	.list-view.two{ border:none; margin-bottom:200rpx;}
	.list-item{text-align: center;font-size: 28rpx;flex: 1; position:relative; padding-top: 30rpx; padding-bottom: 51rpx; border-right: 1rpx solid #f4f5fa;}
	.list-item:nth-child(3){ border:none;}
	.num-box{ position:absolute; top:40rpx; right:60rpx; border-radius:10rpx; background:#fd2b47; z-index:111; padding:5rpx 10rpx; color:white; font-size: 17rpx;}
	.list-img{width: 123rpx;height: 123rpx;margin: 0 auto 15rpx;}
	.info-part{height: 310rpx;width: 100%;position: absolute;bottom: 0;left: 0;background-color: #fff;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;}
	.row-view{font-size: 30rpx;height: 95rpx;line-height: 95rpx;text-align: center;border-bottom: 2rpx solid #f5f5f5;}
	.cancel-btn{border-top: 10rpx solid #f5f5f5;border-bottom: 0;height: 110rpx;line-height: 110rpx;}
	.slidein{animation:show .3s;bottom: 0;}
	@keyframes show{
		from {bottom: -310rpx;}
		to {bottom: 0;}
	}
	.slideout{animation:hide .3s;bottom: -310rpx;}
	@keyframes hide{
		from {bottom: 0;}
		to {bottom: -310rpx;}
	}
	.content-box{width: 625rpx; background-color: #fff; border-radius: 45rpx; margin: 300rpx auto 30rpx; position: relative; padding-bottom:58rpx;}
	.content-box .pop-img{width: 100%;height: 282rpx;margin: -141rpx auto 0;position: absolute;left: 0;right: 0;}
	.content-box .title{font-size: 42rpx;text-align: center;padding-top: 190rpx;}
	.content-box .des{font-size: 28rpx;color: #666666;text-align: center;padding-top: 35rpx;}
	.content-box .login-btn{width: 490rpx;height: 90rpx;background-color: #f62f0e;color: #fff;font-size: 32rpx;text-align: center;margin: 60rpx auto 0;line-height: 90rpx;border-radius: 45rpx;}
	.close-btn{width: 25rpx;height: 25rpx; padding-top:21rpx; display:block; margin:auto;}
	button{ width:199rpx; padding:0; background: white; margin-right:-20rpx;}
	button::after {border: none;}
	.cell-contact{ width: 70%; height: 28px;border-radius: 24px;text-align: center;line-height: 56px;display: inline-block;margin: auto;display: block; position:absolute; bottom:36rpx; right:34rpx; opacity:0; z-index:11111;}
	.content-box-wx{ width: 625rpx; margin: 250rpx auto 30rpx; position: relative;}
	.pop-img-wx{ width:100%;}
	.cell--button{ width:300rpx;}
	/*  #ifdef  MP-WEIXIN  */
	.contact-btn{ position:absolute; bottom:30rpx; right:20rpx; background: white; border-radius: 50rpx;}
	.contact-btn-inner{ padding:15rpx 50rpx; width:195rpx;}
	/*  #endif  */
	/*  #ifdef MP-BAIDU  */
	.contact-btn{ position:absolute; bottom:30rpx; right:20rpx; background: white; border-radius: 50rpx; width:300rpx; height: 80rpx;}
	.contact-btn-inner{ width:195rpx; margin:auto; display: block;}
	/*  #endif  */
	.mask{ width:100%; height: 100%; position: fixed;}
</style>