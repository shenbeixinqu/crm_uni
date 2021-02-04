<template>
	<view>
		dddd
	</view>
</template>

<script>
	import pcaPicker  from '../../components/pca-picker/pca-picker.vue'
	export default{
		data(){
			return{
				
			}
		},
		components: {
			pcaPicker
		},
		onLoad(options){
			////console.log(options)
			this.addinfo=options.addinfo
			////console.log(this.addinfo)
			if(uni.getStorageSync('status')==22){
				this.disabled=false
			}
			this.addinfo=options.addinfo
			if(this.addinfo){
				this.infopopup=true
			}
			if(uni.getStorageSync('status')==11){
				uni.request({
					url:this.$burl+'/change_info',
					data:{
						user_id:uni.getStorageSync('user_id')
					},
					success:(res)=>{
						uni.setStorageSync('re_code', res.data.re_code);
						if(res.data.re_code==0){
							this.infolist=res.data.data
							this.name=res.data.data.name
							// this.name1=res.data.data.bank_name
							this.khh=res.data.data.account_bank
							this.areatext=res.data.data.address
							this.yhnum=res.data.data.bank
							this.fhzh=res.data.data.branch
							this.idnum=res.data.data.card
							this.phone=res.data.data.phone
							this.submitbtn=false
							this.disabled=true
						}else{
							this.submitbtn=true
							this.disabled=false
						}
					},
					fail:(err)=>{
						////console.log(err)
					}
				})
			}else{
				if(!this.addinfo){
					this.getLocation()
				}
			}
		},
		methods:{
			// 保存图片
			saveNewImg(){
				let that=this
				let imgSrc = 'https://shop.pangu.mobi/static/mobile/wx_kf_img.png';
				uni.downloadFile({
				    url: imgSrc,
					success: function (res) {
						////console.log(res);
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
					    ////console.log(res)
				    }
				})
			},
			// 点击广告位加入合伙人群
			goJoinParty(){
				this.rqpopup=true
			},
			// 关闭入群弹窗
			closeRqparty(){
				this.rqpopup=false	
				uni.reLaunch({
					url: '../mine/my_index'
				});
			},
			getChild(e){
				this.popupshow=false
				this.areatext=e
			},
			zdgetlocation(){
				this.infopopup=false,
				this.getLocation()
			},
			// 获取地址
			getLocation(){
				if(this.disabled!=true){
					let that=this;
					uni.getLocation({
						type: 'gcj02',
						success:res=>{
							////console.log(res)
							that.latitude=res.latitude,
							that.longitude=res.longitude
							uni.request({
								url:that.$burl+'/get_location',
								data:{
									lat:that.latitude,
									lng:that.longitude
								},
								success:res=>{
									////console.log(res)
									that.areatext=res.data.data.province+'-'+res.data.data.city,
									that.zd=false
								}
							})
						},
						fail:res=>{
							uni.showToast({
								title:'获取位置失败，请手动选择',
								icon:'none'
							}),
							that.zd=false
						}
					})
				}
			},
			// 选择银行
			bindPickerChange: function(e) {
				////console.log(this.array[e.target.value])
				////console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.khh = this.array[e.target.value]
			},
			// 选择地址弹出框
			popupShow(){
				if(this.disabled==true){
					this.popupshow=false,
					this.active=false
				}else{
					this.popupshow=true,
					this.active=true
				}
			},
			// 隐藏选择地址弹出框
			popupHide(){
				this.popupshow=false
			},
			// 选择地址
			change(e){
				////console.log(e)
				this.areatext=e[0].name+'-'+e[1].name,
				this.popupshow=false
			},
			// 政策弹窗
			zcPopupShow(){
				this.zcpopupshow=true
			},
			// 政策弹窗关闭
			zcpopupHide(){
				this.zcpopupshow=false
			},
			// 完善信息弹窗消失
			infopopuphide(){
				this.infopopup=false
			},
			// 是否合并信息弹窗消失
			alreadyconfirmpopuphide(){
				this.alreadyconfirmpopup=false
			},
			//点击提交时弹窗
			infoconfirmpopupshow(){
				let that=this;
				if(!/^[\u4e00-\u9fa5]{2,4}$/.test(that.name)){
					uni.showToast({title:"请输入正确的姓名！", icon:"none"})
				}else if(!/^1(3|4|5|7|8)\d{9}$/.test(that.phone)){
					uni.showToast({title:"请输入正确的手机号码！", icon:"none"})
				}else if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(that.idnum)){
					uni.showToast({title:"请输入正确的身份证号！", icon:"none"})
				}else if(!/^([1-9]{1})(\d{15}|\d{18}|\d{16}|\d{17})$/.test(that.yhnum)){   //19位
					uni.showToast({title:"请输入正确的银行卡号！", icon:"none"})
				}else if(!/^[\u4e00-\u9fa5]{2,4}$/.test(that.name)){
					uni.showToast({title:"请输入正确的姓名！", icon:"none"})
				}else if(that.khh=='请选择开户行'){
					uni.showToast({title:"请选择开户行！", icon:"none"})
				}else if(that.fhzh.length==0){
					uni.showToast({title:"请选择分行/支行！", icon:"none"})
				}else if(that.checked){
					that.jg=true   //弹窗
					setTimeout(function(){  
						that.jg=false   //弹窗消失
					},3000)
				}else{
					this.infoconfirmpopup=true
				}
			},
			// 确认信息弹窗消失
			infoconfirmpopuphide(){
				this.infoconfirmpopup=false
			},
			// 勾选协议
			check(){
				this.checked=!this.checked
			},
			// 提交
			submit(){
				let that=this;
				this.infoconfirmpopup=false
				uni.showLoading({
					title: '信息核对中',  
					mask:true  
				});
				// 已注册
				if(uni.getStorageSync("status")==11){
					uni.request({
						url:that.$burl+'/info',
						data:{
							user_id:uni.getStorageSync('user_id'),
							name:that.name,
							phone:that.phone,
							card:that.idnum,
							address:that.areatext,
							account_bank:that.khh,
							bank:that.yhnum,
							branch:that.fhzh,
							bank_name:that.name,
							type:uni.getStorageSync("type")
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						success:(res)=>{
							////console.log('==========================')
							////console.log(res)
							uni.hideLoading()
							if(res.data.re_code==4103){
								uni.showToast({title:'姓名、身份证、开户行手机号、银行卡号四项信息不匹配！', icon:"none"})
							}else if(res.data.re_code==4003){
								that.already=true   // 身份信息已被其他账户绑定---弹窗
								setTimeout(function(){  
									that.already=false   // 弹窗消失
								},3000)
							}else if(res.data.status==123){      // 信息已经在其他终端完善
								that.alreadyconfirmpopup=true    // 合并消息弹窗
							}else{
								uni.showToast({title:res.data.msg, icon:"none"})
								setTimeout(function(){
									uni.setStorageSync('re_code', res.data.re_code);
									uni.setStorageSync('status',res.data.status)
									that.submitbtn=false
									that.disabled=true
									// if(that.addinfo==2){
									// 	that.rqpopup=true
									// }else{
									// 	uni.reLaunch({
									// 	    url: '../mine/my_index'
									// 	});
									// }
									// #ifdef MP-WEIXIN
									that.rqpopup=true
									// #endif
									// #ifdef MP-BAIDU
									// uni.navigateTo({
									// 	url:'./bd_gfkf'
									// })
									that.bdfinishinfopopup=true
									// #endif
								},1000)
								
							}
						},
						fail:(err)=>{
							////console.log(err)
						}
					})
				}else{    //未注册
					uni.request({
						url:that.$burl+'/info',
						data:{
							user_id:uni.getStorageSync('user_id'),
							name:that.name,
							phone:that.phone,
							card:that.idnum,
							address:that.areatext,
							account_bank:that.khh,
							bank:that.yhnum,
							branch:that.fhzh,
							bank_name:that.name,
							type:uni.getStorageSync("type"),
							is_perfect:1
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						success:(res)=>{
							////console.log('--------------------------')
							////console.log(res)
							uni.hideLoading()
							if(res.data.re_code==4103){
								uni.showToast({title:'姓名、身份证、开户行手机号、银行卡号四项信息不匹配！', icon:"none"})
							}else if(res.data.re_code==4003){
								that.already=true   // 身份信息已被其他账户绑定---弹窗
								setTimeout(function(){  
									that.already=false   // 弹窗消失
								},3000)
							}else if(res.data.status==123){      // 信息已经在其他终端完善
								that.alreadyconfirmpopup=true    // 合并消息弹窗
							}else{
								uni.showToast({title:res.data.msg, icon:"none"})
								setTimeout(function(){
									uni.setStorageSync('re_code', res.data.re_code);
									uni.setStorageSync('status',res.data.status)
									that.submitbtn=false
									that.disabled=true
									// #ifdef MP-WEIXIN
									that.rqpopup=true
									// #endif
									// #ifdef MP-BAIDU
									that.bdfinishinfopopup=true
									// #endif
								},1000)
								
							}
						},
						fail:(err)=>{
							////console.log(err)
						}
					})
				}
			},
			// 关闭百度完善信息弹窗
			closeBdPopup(){
				this.bdfinishinfopopup=false
				uni.reLaunch({
					url: '../mine/my_index'
				});
			},
			// 合并信息，
			mergeInfo(){
				let that=this;
				this.alreadyconfirmpopup=false
				uni.showLoading({
					title: '信息完善中',  
					mask:true  
				});
				uni.request({
					url:that.$burl+'/merge',
					data:{
						user_id:uni.getStorageSync('user_id'),
						name:that.name,
						phone:that.phone,
						card:that.idnum,
						address:that.areatext,
						account_bank:that.khh,
						bank:that.yhnum,
						branch:that.fhzh,
						bank_name:that.name,
						type:uni.getStorageSync("type")
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					success:(res)=>{
						////console.log(res)
						uni.hideLoading()
						if(res.data.re_code==0){
							uni.showToast({title:res.data.msg, icon:"none"})
							setTimeout(function(){
								uni.setStorageSync('re_code', res.data.re_code);
								uni.setStorageSync('status',res.data.status)
								uni.setStorageSync('user_id',res.data.user_id)
								that.submitbtn=false
								that.disabled=true
								uni.reLaunch({
								    url: '../mine/my_index'
								});
							},1000)
						}
					},
					fail:(err)=>{
						////console.log(err)
					}
				})
			},
			// 修改信息
			changeinfo(){
				this.submitbtn=true
				this.disabled=false
				this.getLocation()
			}
		},
	}
</script>

<style>
	.popup_top{ width:100%;}
	.d-left{display: flex;justify-content:left;align-items:center;}
	.d-right{display: flex;justify-content:flex-end;align-items:center;}
	.d-between{display: flex; justify-content: space-between;align-items:center;}
	.d-center{display: flex;justify-content: center;align-items: center;}
	.infobox{ width:707rpx; padding:27rpx 0; margin:auto; margin-top:41rpx; background: url(../../static/myinfobg.png) no-repeat; background-size: 100% 100%;}
	.rzinfo-top{ padding:25rpx 0 0 41rpx;}
	.top-icon{width:44rpx; height: 44rpx;}
	.top-p{ color:#fb1e14; font-size:35rpx; margin-left:17rpx; font-weight: bold;}
	.top-p span{ font-size: 17rpx; font-weight: normal;}
	.rzinfo-tip{width:97%; height: 94rpx; margin:auto; margin-top:26rpx; background: #fafafa;}
	.rzinfo-tip span{ color:#949494; font-size:20rpx; margin-right: 9rpx; margin-top:-25rpx;}
	.rzinfo-tip .tip-p{width:571rpx; color:#949494; font-size: 20rpx; line-height: 35rpx;}
	.rzinfo-con{ width:90%; margin:auto; margin-top:44rpx;}
	.info-box{ padding: 26rpx 0; border-bottom:1rpx solid #f7f7f7;}
	.info-box:last-child{ border:none;}
	.infobox.yh .info-box:last-child{ border-bottom:1rpx solid #f7f7f7;}
	.info-box-item{ width:35%; padding-left:27rpx; color:#0c0c0c; font-size: 30rpx;}
	.spec{ color:#f52f0e;}
	.info-box input{ width:51%; text-align: right; color:#d0d0d0; font-size: 30rpx; padding-right: 24rpx; color:black;}
	.info-box .area{ font-size: 30rpx; padding-right: 24rpx; /* color:black; */}
	.info-box .area.kong{ font-size: 30rpx; padding-right: 24rpx; color:#d0d0d0;}
	.info-box .area1{ font-size: 30rpx; padding-right: 24rpx; color:#d0d0d0;}
	.info-box.tip{ color:#949494; font-size: 19rpx; padding-left:27rpx;}
	.infobox.yh .top-icon{width: 52rpx; height: 40rpx;}
	.zc{ width:90%; margin:auto;}
	.zc-con{ color: #0c0c0c; font-size:24rpx;}
	.zc-con span{ color: #fb1e14;}
	.btn{ width:50%; height: 85rpx; margin:auto; border-radius:50rpx; background: #fb1e14; color:white; text-align: center; line-height: 85rpx; font-size: 30rpx; font-weight: bold; margin-top:56rpx; margin-bottom:74rpx; padding: constant(safe-area-inset-bottom); padding: env(safe-area-inset-bottom);}
	.yc{ overflow: hidden; height: 100vh;}
	/* 弹窗 */
	.mask{ width:100%; height: 100%; background: rgba(0,0,0,.2); position: fixed; top:0; left:0; z-index:111;}
	.zcpopup{ position: fixed; top:14%; padding-top:40rpx; width: 80%; height:830rpx; left:10%; background: white; z-index:1111; border-radius:10rpx;}
	.popup-title{ color: #0c0c0c; font-size: 30rpx; text-align: center; padding-top:40rpx;}
	.scroll-box{ width:100%; height:690rpx;}
	.scroll-box .notice-box-tit view{ color:#fb2711; font-size: 32rpx; font-weight: bold;}
	.scroll-box .notice-con{ color: black; font-size: 25rpx; text-indent: 60rpx; line-height: 40rpx; padding-top:29rpx; width:80%; margin:auto; white-space: pre-wrap;}
	.notice-box:last-child{ margin-top: 40rpx;}
	.notice-box:last-child .notice-con{ padding-bottom:20rpx; white-space: pre-wrap;}
	.zc-btn{ position: absolute; bottom:0; height:90rpx; line-height:90rpx; width: 100%; text-align: center; font-weight:bold; color: #fb2711; font-size: 31rpx; border-top:1rpx solid #b2b2b2;}
	.infopopup{ width:80%; height: 749rpx; position:fixed; left:10%; top:18%; z-index:111;}
	.infopopup-bg{ width:100%; height:100%;}
	.infopopup-inner{ width: 100%;background: white;margin-top: -2rpx;boder-bottom-radius: 20rpx;border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;position: relative;top: 0;padding-top: 50rpx;}
	.info-title{ color: #f6621f; font-size: 45rpx; text-align: center;}
	.info-tip{ text-align:center; color: #666666; font-size: 30rpx; margin-top: 22rpx;}
	.infopopup-inner.already .info-tip{ width:87%; margin:auto; color: #666666; font-size: 25rpx; margin-top:35rpx; line-height: 43rpx; text-align:left;}
	.infopopup-inner.already .options{ margin-top:74rpx;}
	/*  #ifdef  MP-BAIDU  */
	.infopopup-inner.already .options{ margin-top:30rpx;}
	/*  #endif  */
	.infopopup-inner.one .options{ margin-top:49rpx;}
	.options{ podition:absolute; bottom:0; border-top:1rpx solid #e5e5e5; height: 107rpx; margin-top:71rpx;}
	.op-btn{ width: 50%; border-right: 1rpx solid #e5e5e5; line-height: 107rpx; text-align: center; font-size: 38rpx; color: black;}
	.op-btn:last-child{ border:none;}
	/* 选择同意政策弹出警告 */
	.zcjg{ width: 50%; height: 161rpx; position:fixed; top:20%; left:25%; background:url(../../static/agreenoticebg.png) no-repeat; background-size: 100% 100%; color:white; font-weight: bold; font-size:36rpx; text-align: center; line-height:197rpx; z-index:111;}
	.zcjg.new{ width: 64%; height: 206rpx; position:fixed; top:20%; left:18%; background:url(../../static/agreenoticebg.png) no-repeat; background-size: 100% 100%; color:white; font-weight: bold; font-size:36rpx; text-align: center; line-height:252rpx; z-index:111;}
	.content {display: flex; flex-direction: column; align-items: center; justify-content: center;}
	.logo {height: 200upx; width: 200upx; margin-top: 200upx; margin-left: auto; margin-right: auto; margin-bottom: 50upx;}
	.text-area {display: flex; justify-content: center;}
	.title {font-size: 36upx; color: #8f8f94;}
	.checkimg{ width:40rpx; height:40rpx; margin-right: 10rpx;}
	
	.infocon{ width:80%; height: 715rpx; background: url(../../static/completeinfobg.png) no-repeat; background-size: 100% 100%;}
	.infocon .infopopup-inner{ top:45%;}
	
	.mask1{ width:100%; height: 100%; background: rgba(0,0,0,.7); position: fixed; top:0; left:0; z-index:1111;}
	.popup{ width:80%; position:fixed; left:10%; top:14%; z-index:111111;}
	.pop-img-wx-bd{ width:80%; position: fixed; top: 50%;left: 50%;transform: translate(-50%,-50%); z-index:1111111;}
	/* ..close-btn1{ width:20rpx; height:20rpx; position: fixed; top:22%; right:13%; z-index:1;} */
	.rqimg{ width:80%; position: fixed; top:20%; left:10%;}
	.button-save{ width:80%; height: 100rpx; background: red; color: white; position: fixed; bottom:5%; right:10%; z-index:1; text-align: center; line-height: 100rpx;}
	.content-box-wx{ width: 625rpx; margin: 250rpx auto 30rpx; position: relative;}
	.pop-img-wx{ width:100%;}
	.wx-contact-btn{ position:absolute; bottom:98rpx; right:50rpx; width:290rpx; height: 60rpx;}
	.close-wrap{ width:70rpx; height:70rpx; position:absolute; top:-108rpx; right:14rpx;}
	.close-wrap.wx{ top:1rpx; right:0; z-index:1;}
	.close-btn{width: 25rpx;height: 25rpx; padding-top:21rpx; display:block; margin:auto;}
</style>
