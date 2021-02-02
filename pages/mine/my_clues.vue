<template>
	<view class="content">
		<view class="content-part">
			<view class="box-title">
				<span @tap="changeTypeBox()">
					<span style="float:left">{{type==''?'线索状态':typeList[type]}}</span>
					<image class="choose-img" src="https://shop.pangu.mobi/static/mobile/select2.jpg" mode="aspectFit"></image>
				</span>
				<span style="float:right;padding-right: 20rpx;">佣金</span>
			</view>
			<view v-if="cluesList.length==0" class="nodata-part">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<scroll-view v-else scroll-y @scrolltolower="getNextData" class="list-part main">
				<view class="list-row d-between" v-for="(item,index) in cluesList" :key="index">
					<view>
						<view class="list-title">{{item.company_name}}</view>
						<!-- 有效 -->
						<!-- <view v-if="item.clue_status=='有效'" class="list-status yx">{{item.clue_status}}(倒计时{{item.timedelta}}天{{item.hms}})</view> -->
						<!-- 无效 -->
						<!-- <view v-if="item.clue_status=='无效'" class="list-status wx">{{item.clue_status}}{{item.reason?'('+item.reason+')':''}}</view> -->
						<!-- 受保护 -->
						<!-- <view v-if="item.clue_status=='受保护'" class="list-status sbh">{{item.clue_status}}(倒计时{{item.timedelta}}天{{item.hms}})</view>
						<view v-if="item.clue_status!='有效'&&item.clue_status!='无效'&&item.clue_status!='受保护'" class="list-status" :class="{'dyz':item.clue_status=='待验证','sx':item.clue_status=='失效','yqd':item.clue_status=='已签单'}">{{item.clue_status}}</view>
						<view v-if="item.charges" class="right-money money-text">{{item.charges}}</view>
						<view v-else class="right-money">——</view> -->
						
						<!-- 新改 -->
						<!-- 洽谈中 -->
						<view v-if="item.clue_status=='洽谈中'" class="list-status yx">{{item.clue_status}}(倒计时{{item.timedelta}}天)</view>
						<!-- 无效 -->
						<view v-if="item.clue_status=='无效'" class="list-status wx">{{item.clue_status}}{{item.reason?'('+item.reason+')':''}}</view>
						<!-- 受保护 -->
						<view v-if="item.clue_status!='洽谈中'&&item.clue_status!='无效'" class="list-status" :class="{'dyz':item.clue_status=='待验证','sx':item.clue_status=='已过期','yqd':item.clue_status=='已结款'}">{{item.clue_status}}</view>
						
					</view>
					<view>
						<view v-if="item.charges" class="right-money money-text">{{item.charges}}</view>
						<image v-if="item.clue_status=='无效' || item.clue_status=='已过期'" src="https://shop.pangu.mobi/static/mobile/shanchu.png" class="delete-icon" @tap="deletegq(item)"></image>
					</view>
					<!-- <view v-else class="right-money">——</view> -->
				</view>
			</scroll-view>
		</view>
		<!-- 状态筛选弹出框 -->
		<view v-if="isShow" class="mask-select-box" @touchmove.stop.prevent="doNothing" @tap="changeTypeBox()">
			<view class="info-part">
				<view class="box-title">
					线索状态
					<image class="choose2-img" src="https://shop.pangu.mobi/static/mobile/select2.jpg" mode="aspectFit"></image>
				</view>
				<view class="main">
					<view :class="['row-item',type==vind?'type-select':'']" v-for="(v,vind) in typeList" :key="vind" @tap.stop="selectType(vind)">
						{{v}}
						<image class="select-img" src="https://shop.pangu.mobi/static/mobile/select.jpg" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<foot-part></foot-part>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_id: '',
				type: '',
				isAll: false,
				nowPage: 1,
				cluesList: [],
				// 状态筛选弹出框
				isShow: false,
				typeList: ['全部','待验证','洽谈中','无效','已过期','待结款','已结款'],
				// typeList: ['全部','待验证','有效','无效','失效','已签单','受保护'],
			}
		},
		onLoad() {
			this.user_id = uni.getStorageSync('user_id');
			this.getData();
		},
		onPullDownRefresh() {
			this.isShow = false;
			this.isAll = false;
			this.nowPage = 1;
			this.cluesList = [];
			this.getData();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			async getData() {
				let that = this;
				that.type = that.type==0?'':that.type;
				let param = '?user_id='+that.user_id+'&clue_status='+that.type+'&page='+that.nowPage+'&per_page=10';
				let res = await that.$api.commonMethod('/clue_list'+param,'GET');
				console.log(res);
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					if(da.data.clues_dict_li==0) {
						that.isAll = true;
					}else{
						that.cluesList = da.data.clues_dict_li;
					}
				}
			},
			async getMore() {
				let that = this;
				that.type = that.type==0?'':that.type;
				let param = '?user_id='+that.user_id+'&clue_status='+that.type+'&page='+that.nowPage+'&per_page=10';
				let res = await that.$api.commonMethod('/clue_list'+param,'GET');
				console.log(res);
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					if(da.data.clues_dict_li==0) {
						that.isAll = true;
					}else{
						that.cluesList = that.cluesList.concat(da.data.clues_dict_li);
					}
				}
			},
			getNextData() {
				if(this.isAll) {
					uni.showToast({
					    title: '已加载全部',
						icon: 'none'
					});
				}else{
					this.nowPage++;
					this.getMore();
				}
			},
			// 筛选弹出框
			changeTypeBox() {this.isShow = !this.isShow},
			// 选择线索状态
			selectType(vind) {
				this.type = vind;
				this.isShow = false;
				this.nowPage = 1;
				this.cluesList = [];
				this.getData();
			},
			// 删除过期线索
			deletegq(item){
				let that=this;
				console.log(item.id)
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
				    success: function (res) {
				        if (res.confirm) {
							if(item.clue_status=='已过期'){
								uni.request({
									url:that.$burl+'/clue_invalid_del',
									data:{
										clue_id:item.id
									},
									success:(res)=>{
										console.log(111)
										console.log(res)
										uni.showToast({title:res.data.msg, icon:"none"})
										that.getData();
									}
								})
							}else if(item.clue_status=='无效'){
								uni.request({
									url:that.$burl+'/clue_unvalid_del',
									data:{
										clue_id:item.id
									},
									success:(res)=>{
										uni.showToast({title:res.data.msg, icon:"none"})
										that.getData();
									}
								})
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
		}
	}
</script>

<style scoped>
	.content-part{position: absolute;width: 100%;height: calc(100% - 130rpx);overflow: auto;background-color: #fff;}
	.box-title{height: 100rpx;background-color: #f6f7f9;font-size: 32rpx;font-weight: bold;line-height: 100rpx;padding: 0 30rpx;}
	.choose-img{width: 29rpx;height: 27rpx;float: left;margin: 38rpx 0 0 10rpx;}
	.list-part{width: auto;height: calc(100% - 110rpx);}
	.list-row{height: 120rpx;border-bottom: 1px solid #dbdbdb;}
	.list-title{font-size: 32rpx;padding-top: 20rpx;}
	.list-status{font-size: 28rpx;padding-top: 10rpx;}
	.dyz{color: #f59a2e;}
	.yx{color: #4794ea;}
	.wx{color: #e52a2a;}
	.sx{color: #666666;}
	.yqd{color: #21862d;}
	.sbh{color: #6432e3;}
	.right-money{font-size: 28rpx;color: #666666;float: right;min-width: 110rpx;text-align: center;margin-top: -45rpx;font-weight: bold;}
	.money-text{color: #e82612;}
	.info-part{width: 100%;height: auto;overflow: auto;background-color: #fff;}
	.choose2-img{width: 29rpx;height: 27rpx;display: inline-block;margin: 38rpx 0 0 10rpx;transform: rotate(180deg);}
	.row-item{height: 85rpx;font-size: 30rpx;color: #666666;line-height: 85rpx;border-bottom: 1px solid #dbdbdb;}
	.select-img{width: 28rpx;height: 20rpx;float: right;margin-top: 35rpx;display: none;}
	.type-select{color: #fb2711;}
	.type-select .select-img{display: block;}
	.delete-icon{ width:43rpx; height: 45rpx; padding-right: 30rpx;}
</style>