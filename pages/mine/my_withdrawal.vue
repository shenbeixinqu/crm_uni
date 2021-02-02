<template>
	<view class="content">
		<view class="list-part">
			<view class="list-row">
				<view class="list-title">佣金余额</view>
				<input class="list-input" type="text" v-model="totalMoney" disabled/>
			</view>
			<view class="list-row">
				<view class="list-title">提现金额<span>*</span></view>
				<input class="list-input" type="digit" v-model="money" @input="monitorMoney" placeholder="单笔限额5000以下" placeholder-class="pla-class"/>
			</view>
			<view class="list-row">
				<view class="list-title">提现至<span>*</span></view>
				<view class="list-right">
					<image class="tx-img" src="https://shop.pangu.mobi/static/mobile/yhk.jpg" mode="aspectFit"></image>
					<!-- <image class="tx-img" src="https://shop.pangu.mobi/static/mobile/zfb.jpg" mode="aspectFit"></image> -->
				</view>
			</view>
			<view class="list-row">
				<view class="list-title">开户姓名<span>*</span></view>
				<input class="list-input" type="text" v-model="name" placeholder="请输入银行开户姓名" placeholder-class="pla-class"/>
			</view>
			<view class="list-row">
				<view class="list-title">银行卡号<span>*</span></view>
				<input class="list-input" maxlength="19" type="number" v-model="bankCard" placeholder="请输入银行卡号" placeholder-class="pla-class"/>
			</view>
			<view class="list-row">
				<view class="list-title">身份证号码<span>*</span></view>
				<input class="list-input" type="idcard" v-model="idcard" maxlength="18" placeholder="请输入身份证号码" placeholder-class="pla-class"/>
			</view>
			<view class="list-row">
				<view class="list-title">开户支行<span>*</span></view>
				<input class="list-input" type="text" v-model="bankAddress" placeholder="请输入正确开户支行信息" placeholder-class="pla-class"/>
			</view>
			<view class="bottom-btn" @tap="saveData()">申请提现</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_id: '',
				surplus: '',
				totalMoney: '',
				money: '',
				type: 1,// 1银行卡 2支付宝 暂只支持银行卡
				name: '',
				bankCard: '',
				idcard: '',
				bankAddress: '',
			}
		},
		onLoad() {
			this.user_id = uni.getStorageSync('user_id');
			this.surplus = uni.getStorageSync('surplus');
			this.totalMoney = this.surplus+'元';
		},
		methods: {
			// 监控提现金额
			monitorMoney(e) {
				if(e.detail.value&&parseInt(e.detail.value)>parseInt(this.surplus)) {
					this.showToast('提现金额大于佣金余额');
				}
			},
			// 提交线索
			async saveData() {
				let that = this;
				if(!that.money) {
					that.showToast('请输入提现金额');
				}else if(parseInt(that.money)>parseInt(that.surplus)) {
					that.showToast('提现金额大于佣金余额');
				}else if(!that.name) {
					that.showToast('请输入开户姓名');
				}else if(!that.bankCard) {
					that.showToast('请输入银行卡号');
				}else if(!that.idcard) {
					that.showToast('请输入身份证号码');
				}else if(!that.bankAddress) {
					that.showToast('请输入开户支行信息');
				}else{
					let param = {
						user_id: that.user_id,
						withdraw_money: that.money,
						withdraw_way: that.type,
						bank_name: that.name,
						bank_card: that.bankCard,
						id_card: that.idcard,
						deposit_bank: that.bankAddress,
					};
					let res = await that.$api.commonMethod('/withdraw_apply','POST',param);
					let show = 0;
					if(res.statusCode==200&&res.data.re_code==0) {
						if(res.data.data.status=='提现中') {
							show = 1;
							let obj = JSON.stringify(res.data.data);
							uni.setStorageSync('tixianObj', obj);
						}else if(res.data.data.status=='提现失败') {
							show = 2;
						}
						uni.redirectTo({
							url: './my_apply_success?show='+show
						})
					}else{
						that.showToast(res.data.msg);
					}
				}
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
	.list-part{padding-top: 5rpx;position: relative;height: calc(100vh - 90rpx);}
	.list-row{height: 90rpx;border-bottom: 1px solid #dbdbdb;padding: 0 30rpx;overflow: hidden;}
	.list-title{font-size: 26rpx;font-weight: bold;width: 200rpx;float: left;line-height: 90rpx;}
	.list-title span{font-size: 22rpx;color: #fe4d2a;}
	.list-input{font-size: 26rpx;height: 90rpx;float: right;width: calc(100% - 200rpx);text-align: right;}
	.pla-class{font-size: 26rpx;color: #c2c2c2;}
	.list-right{float: right;padding-top: 15rpx;}
	.tx-img{width: 198rpx;height: 62rpx;display: inline-block;margin-left: 30rpx;}
	.bottom-btn{height: 90rpx;background-color: #f62f0e;color: #fff;font-size: 34rpx;text-align: center;line-height: 90rpx;border-radius: 45rpx;position: absolute;margin-top: 500rpx;left: 30rpx;right: 30rpx;}
</style>