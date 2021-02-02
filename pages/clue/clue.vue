<template>
	<view class="content1">
		<view class="list-part main">
			<!-- <view class="list-row">
				<view class="list-title">推荐产品<span>*</span></view>
				<view class="list-select" @tap="changeProBox()">
					<view class="list-input">{{productName}}</view>
					<image class="right-img" src="https://shop.pangu.mobi/static/mobile/right.jpg" mode="aspectFit"></image>
				</view>
			</view> -->
			<view class="list-row">
				<view class="d-left">
					<image class="list-icon" src="https://shop.pangu.mobi/static/mobile/gongsimingcheng.png"></image>
					<view class="list-title">公司名称<span>*</span></view>
				</view>
				<input class="list-input" type="text" v-model="company" :adjust-position="false" placeholder="请填写公司名称" placeholder-style="font-size: 28rpx;color: #808080;"/>
			</view>
			<view class="list-row">
				<view class="d-left">
					<image class="list-icon" src="https://shop.pangu.mobi/static/mobile/lianxiren.png"></image>
					<view class="list-title">联系人姓名<span>*</span></view>
				</view>
				<input class="list-input" type="text" v-model="people" :adjust-position="false" placeholder="请填写公司联系人姓名" placeholder-style="font-size: 28rpx;color: #808080;"/>
			</view>
			<view class="list-row">
				<view class="d-left">
					<image class="list-icon" src="https://shop.pangu.mobi/static/mobile/dianhua2.png"></image>
					<view class="list-title">联系人电话<span>*</span></view>
				</view>
				<input class="list-input" type="number" v-model="phone" :adjust-position="false" placeholder="请填写联系人电话号码,例xxx-xxxxxxxx或11位手机号" @blur="checkPhone" @confirm="checkPhone" placeholder-style="font-size: 28rpx;color: #808080;"/>
			</view>
			<view class="list-row">
				<view class="d-left">
					<image class="list-icon" src="https://shop.pangu.mobi/static/mobile/chengshi.png"></image>
					<view class="list-title">公司所在城市<span>*</span></view>
				</view>
				<view class="area" @tap="getLocation()" v-if="zd">{{areatext}}</view>
				<view class="area" @tap="popupShow()" v-else>{{areatext}}</view>
				<view class="popup-wrap" v-if="popupshow">
					<!-- <view class="chooseArea" v-if="getagain" @tap="getLocation()">重新定位获取</view> -->
					<pca-picker limitRegion="city" :active.sync="active" @change="change" :defaultValue="defaultValue" @getChild="getChild"></pca-picker>
				</view>
				<!-- <view class="list-select" @tap="changeCityBox()">
					<view class="list-input" v-if="city!=null">{{city}}</view>
					<view class="citynull" v-if="city==null">请选择</view>
					<image class="right-img" src="https://shop.pangu.mobi/static/mobile/right.jpg" mode="aspectFit"></image>
				</view> -->
			</view>
			<view class="bottom-btn" @tap="saveData()">提交线索</view>
		</view>
		<!-- 推荐产品弹出框 -->
		<view v-if="isProShow" class="mask-select-box" @touchmove.stop.prevent="doNothing" @tap="changeProBox()">
			<scroll-view scroll-y class="info-part">
				<view class="box-title">选择推荐产品</view>
				<view class="content-part" v-for="(item,index) in proList" :key="index">
					<view class="first-title">{{item.category}}</view>
					<view class="pro-part">
						<view :class="['pro-item',productID==v.id?'pro-select':'']" v-for="(v,vind) in item.pro_list" :key="vind" @tap.stop="selectPro(v)">{{v.pro_name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- <view v-if="isCityShow" class="mask-select-box" @touchmove.stop.prevent="doNothing" @tap="changeCityBox()">
			<view class="info-part" style="height:auto">
				<view class="box-title">选择公司所在城市</view>
				<view class="main">
					<view :class="['row-item',city==v?'city-select':'']" v-for="(v,vind) in cityList" :key="vind" @tap.stop="selectCity(v)">
						{{v}}
						<image class="select-img" src="https://shop.pangu.mobi/static/mobile/select.jpg" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 线索结果弹出框 -->
		<view v-if="isResultShow" class="mask-box" @touchmove.stop.prevent="doNothing">
			<!-- 成功 -->
			<view v-if="resultType==1" class="result-part">
				<image class="result-img" src="https://shop.pangu.mobi/static/mobile/xslrcg.png" mode="aspectFit"></image>
				<view class="success-title">线索录入成功</view>
				<view class="des-part">
					客户信息验证无误后，<br>期待客户能与我公司合作。
				</view>
				<view class="bottom-text" @tap="changeResultBox()">我知道了</view>
			</view>
			<!-- 3老客户 4已存在 -->
			<view v-if="resultType==3||resultType==4" class="result-part">
				<image class="result-img" src="https://shop.pangu.mobi/static/mobile/xsbhq.png" mode="aspectFit"></image>
				<view class="info-title">线索录入无效</view>
				<view class="des-part">
					您提交的客户线索已是公司合作客户！<br>谢谢您的支持，请再接再厉
				</view>
				<view class="bottom-text" @tap="changeResultBox()">我知道了</view>
			</view>
			<view v-if="resultType==5" class="result-part">
				<image class="result-img" src="https://shop.pangu.mobi/static/mobile/xsbhq.png" mode="aspectFit"></image>
				<view class="info-title">线索录入无效</view>
				<view class="des-part">
					您提交的客户线索已经被其余合伙人推荐并在验证中。
				</view>
				<view class="bottom-text" @tap="changeResultBox()">我知道了</view>
			</view>
			<!-- 线索已过绑定期、未签单、有销售跟进 -->
			<view v-if="resultType==6" class="result-part">
				<image class="result-img" src="https://shop.pangu.mobi/static/mobile/xsbhq.png" mode="aspectFit"></image>
				<view class="info-title">线索录入无效</view>
				<view class="des-part">
					您提交的客户线索正与我司洽谈中。
				</view>
				<view class="bottom-text" @tap="changeResultBox()">我知道了</view>
			</view>
			<!-- 不成功 -->
			<!-- <view v-if="resultType==5" class="result-part">
				<image class="result-img" src="https://shop.pangu.mobi/static/mobile/xsbhq.png" mode="aspectFit"></image>
				<view class="info-title">线索录入无效！</view>
				<view class="des-part">
					线索录入无效，您提交的客户线索已经被其余合伙人推荐并在验证中。
				</view>
				<view class="bottom-text" @tap="changeResultBox()">我知道了</view>
			</view> -->
			<!-- 保护期 -->
			<!-- <view v-if="resultType==2" class="result-part">
				<image class="result-img" src="https://shop.pangu.mobi/static/mobile/xsbhq.png" mode="aspectFit"></image>
				<view class="info-title">已进入保护期！</view>
				<view class="des-part">
					您提交的线索，已经有商务洽谈！<br>线索进入“保护期”<br>保护时间45天
				</view>
				<view class="bottom-text" @tap="changeResultBox()">我知道了</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import pcaPicker  from '../../components/pca-picker/pca-picker.vue'
	export default {
		data() {
			return {
				user_id: '',
				productID: '',
				productName: '请选择',
				company: '',
				people: '',
				phone: '',
				city:null,
				// 推荐产品弹出框
				isProShow: false,
				proList: [],
				// 城市弹出框
				isCityShow: false,
				cityList: ['辽宁','吉林','河北','天津'],
				// 线索结果弹出框
				isResultShow: false,
				resultType: 1,// 1成功 2保护期 3老客户 4已存在
				active:false,
				defaultValue:{
					provinceCode: '',//省code
					citiesCode: '',//市code
				}, 
				popupshow:false,
				latitude:'',   //纬度
				longitude:'',   //经度  
				zd:true,
				areatext:'请选择地址',
				getagain:false
			}
		},
		components: {
			pcaPicker
		},
		onLoad(options) {
			this.getLocation();
			this.user_id = uni.getStorageSync('user_id');
			if(options.id) {
				this.getDetail(options.id)
			}
			this.getAllPro();
		},
		methods: {
			getChild(e){
				this.popupshow=false
				this.areatext=e
			},
			// 获取位置
			getLocation(){
				let that=this;
				uni.getLocation({
					type: 'gcj02',
					success:res=>{
						that.latitude=res.latitude,
						that.longitude=res.longitude
						uni.request({
							url:that.$burl+'/get_location',
							data:{
								lat:that.latitude,
								lng:that.longitude
							},
							success:res=>{
								that.areatext=res.data.data.province+'-'+res.data.data.city,
								that.popupshow=false
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
			},
			popupShow(){
				if(this.disabled==true){
					this.popupshow=false,
					this.active=false,
					this.getagain=false
				}else{
					this.popupshow=true,
					this.active=true,
					setTimeout(()=>{
						this.getagain=true
					},500)
				}
			},
			// 选择地址
			change(e){
				console.log(e)
				this.areatext=e[0].name+'-'+e[1].name,
				this.popupshow=false
			},
			// 隐藏选择地址弹出框
			popupHide(){
				this.popupshow=false
			},
			// 获取当前产品name
			async getDetail(id) {
				let that = this;
				let param = '?pid='+id;
				let res = await that.$api.commonMethod('/pro_detail'+param,'GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					that.productID = id;
					that.productName = da.data.pro_detail_li.pro_detail.pro_name;
				}
			},
			// 获取所有产品
			async getAllPro() {
				let that = this;
				let res = await that.$api.commonMethod('/all_pro','GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					that.proList = da.data;
				}
			},
			doNothing() {},
			// 推荐产品弹出框
			changeProBox() {
				this.isProShow = !this.isProShow
			},
			// 选择产品
			selectPro(v) {
				this.productID = v.id
				this.productName = v.pro_name
				this.isProShow = false
			},
			// 城市弹出框
			changeCityBox() {
				this.isCityShow = !this.isCityShow
				this.active=true
			},
			// 选择城市
			selectCity(v) {
				this.city = v
				this.isCityShow = false
			},
			checkPhone() {
				let that = this;
				let mobilecheck = /^((0\d{2,3}-\d{7,8})|(1[13456789]\d{9}))$/;
				if(that.phone&&!mobilecheck.test(that.phone)) {
					that.showToast('请输入xxx-xxxxxxxx或11位手机号');
				}
			},
			// 提交线索
			async saveData() {
				let that = this;
				let mobilecheck = /^((0\d{2,3}-\d{7,8})|(1[13456789]\d{9}))$/;
				// if(!that.productID) {
				// 	that.showToast('请选择推荐产品');
				// }else 
				if(!that.company) {
					that.showToast('请填写公司名称');
				}else if(that.company.length<5) {
					that.showToast('请完整填写公司名称');
				}else if(!that.people) {
					that.showToast('请填写公司联系人姓名');
				}else if(!that.phone) {
					that.showToast('请填写联系人电话号码');
				}else if(that.phone&&!mobilecheck.test(that.phone)) {
					that.showToast('电话号码格式不正确');
				}else if(that.areatext=='请选择地址') {
					that.showToast('请选择公司所在城市');
				}else{
					uni.showLoading({
						title: '录入中，请稍后',  
						mask:true  
					});
					let param = '?com_name='+that.company+'&client_name='+that.people+'&client_tel='+that.phone+'&com_city='+that.areatext+'&user_id='+that.user_id;
					let res = await that.$api.commonMethod('/clue_add'+param,'GET');
					console.log(res);
					// if(res.statusCode==200&&res.data.re_code==0) {
					// 	let da = res.data;
					// 	that.resultType = res.data.status;
					// 	that.isResultShow = true;
					// }
					that.resultType = res.data.status;
					setTimeout(function(){
						uni.hideLoading()
						that.isResultShow = true;
					},1000)
					console.log(that.resultType)
				}
			},
			showToast(title) {
				uni.showToast({
				    title: title,
					icon: 'none'
				});
			},
			// 线索结果弹出框
			changeResultBox() {
				this.isResultShow = !this.isResultShow;
				setTimeout(()=>{
					uni.navigateBack({
						delta: 1
					});
				},500)
			},
		}
	}
</script>

<style scoped>
	.citynull{ font-size: 30rpx;padding-top: 20rpx;height: 60rpx; padding-bottom:10rpx; color: #808080;}
	.list-icon{ width:29rpx; height: 33rpx; margin-right: 12rpx;}
	.list-part{padding-top: 5rpx;position: relative;height: calc(100vh - 90rpx);}
	.list-row{border-bottom: 1px solid #dbdbdb;padding-top: 50rpx;}
	.list-title{font-size: 30rpx;font-weight: bold;}
	.list-title span{font-size: 28rpx;color: #fe4d2a;}
	.list-select{overflow: hidden;position: relative; padding-bottom:10rpx;}
	.list-input{font-size: 30rpx;padding-top: 20rpx;height: 60rpx; padding-bottom:10rpx;}
	.right-img{width: 16rpx;height: 27rpx;position: absolute;right: 0;top: 30rpx;}
	.pla-class{font-size: 28rpx;color: #808080;}
	.bottom-btn{height: 90rpx;background-color: #f62f0e;color: #fff;font-size: 34rpx;text-align: center;line-height: 90rpx;border-radius: 45rpx;position: absolute;width: 100%;margin-top: 330rpx;}
	.info-part{width: 100%;height: 980rpx;overflow: auto;background-color: #fff;}
	.box-title{height: 100rpx;background-color: #f6f7f9;font-size: 30rpx;font-weight: bold;line-height: 100rpx;padding: 0 30rpx;}
	.content-part{padding: 40rpx 30rpx 0;}
	.first-title{font-size: 32rpx;padding-bottom: 30rpx;}
	.pro-item{font-size: 30rpx;width: 215rpx;height: 80rpx;background-color: #eeeeee;color: #484848;line-height: 80rpx;text-align: center;display: inline-block;border-radius: 10rpx;margin-bottom: 15rpx;}
	.pro-part .pro-item:nth-child(3n+2){margin-left: 25rpx;margin-right: 25rpx;}
	.pro-select{color: #fb2711;}
	.row-item{height: 85rpx;font-size: 30rpx;color: #666666;line-height: 85rpx;border-bottom: 1px solid #dbdbdb;}
	.select-img{width: 28rpx;height: 20rpx;float: right;margin-top: 35rpx;display: none;}
	.city-select{color: #fb2711;}
	.city-select .select-img{display: block;}
	.result-part{width: 623rpx;height: 750rpx;background-color: #fff;border-radius: 30rpx;margin: 300rpx auto 0;position: relative;}
	.result-img{width: 623rpx;height: 353rpx;}
	.success-title{font-size: 56rpx;color: #ea2410;text-align: center;}
	.info-title{font-size: 56rpx;color: #f6621f;text-align: center;}
	.des-part{font-size: 34rpx;color: #666666;text-align: center;line-height: 50rpx;padding-top: 35rpx;}
	.bottom-text{font-size: 44rpx;text-align: center;height: 105rpx;line-height: 105rpx;text-align: center;border-top: 1px solid #dbdbdb;position: absolute;bottom: 0;width: 100%;}
	.content {display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.logo {height: 200upx;width: 200upx;margin-top: 200upx;margin-left: auto;margin-right: auto;margin-bottom: 50upx;}
	.text-area {display: flex;justify-content: center;}
	.title {font-size: 36upx;color: #8f8f94;}
	.area{ color:#808080; padding:20rpx 0;}
	.popup-wrap{ position: relative;}
	.chooseArea{ position:absolute; z-index:111111; top:-85rpx; right:10rpx;}
</style>