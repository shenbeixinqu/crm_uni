<template>
	<view class="content">
		<view class="tab-part">
			<view :class="['tab-item',nowTab==vind?'tab-active':'']" v-for="(v,vind) in tabList" :key="vind" @tap="changeTab(vind)">{{v}}</view>
		</view>
		<view class="greybar"></view>
		<!-- 全部 -->
		<block v-if="nowTab==0">
			<view v-if="list1.length==0 && list2.length==0 && list3.length==0 && list4.length==0" class="nodata-part">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<view v-else class="content-part">
				<view class="list-part main">
					<!-- <view class="list-row" v-for="(item,index) in shouruList" :key="index">
						<view class="list-title">{{item.company_name}}</view>
						<view class="list-des">{{item.client_time}}</view>
						<view class="right-money money-text">{{item.charges}}</view>
					</view> -->
					<view class="list-row d-between" v-for="(item,index) in list1" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/shdkz.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden" v-if="item.pink==1">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view>
					<!-- <view class="list-row d-between" v-for="(item,index) in list2" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/txcg.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view> -->
					<view class="list-row d-between" v-for="(item,index) in list3" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/txcg.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden" v-if="item.pink==1">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view>
					<!-- <view class="list-row d-between" v-for="(item,index) in list4" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/txcg.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view> -->
				</view>
			</view>
		</block>
		<!-- 发放中 -->
		<block v-if="nowTab==1">
			<view v-if="list1.length==0" class="nodata-part">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<view v-else class="content-part">
				<!-- <view class="box-title">
					<span @tap="changeTypeBox()">
						<span style="float:left">{{type=='全部'?'提现状态':type}}</span>
						<image class="choose-img" src="https://shop.pangu.mobi/static/mobile/select2.jpg" mode="aspectFit"></image>
					</span>
					<span style="float:right;padding-right: 20rpx;">佣金</span>
				</view>
				<view class="list-part main" style="height:calc(100% - 100rpx)">
					<view class="list-row" v-for="(item,index) in tixianList" :key="index">
						<block v-if="item.withdraw_status=='提现成功'">
							<image class="list-img" src="https://shop.pangu.mobi/static/mobile/txcg.jpg" mode="aspectFit"></image>
							<view class="list-title">提现成功</view>
						</block>
						<block v-if="item.withdraw_status=='提现中'">
							<image class="list-img" src="https://shop.pangu.mobi/static/mobile/shdkz.jpg" mode="aspectFit"></image>
							<view class="list-title">提现中</view>
						</block>
						<block v-if="item.withdraw_status=='提现失败'||item.withdraw_status=='打款失败'||item.withdraw_status=='拒绝打款'">
							<image class="list-img" src="https://shop.pangu.mobi/static/mobile/txsb.jpg" mode="aspectFit"></image>
							<view class="list-title oline">提现失败{{item.deny_reason?'('+item.deny_reason+')':''}}</view>
						</block>
						<view class="list-des">{{item.apply_time}}</view>
						<view class="right-money">{{item.withdraw_money}}</view>
					</view>
				</view> -->
				<view class="list-part main">
					<view class="list-row d-between" v-for="(item,index) in list1" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/shdkz.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden" v-if="item.pink==1">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view>
					<!-- <view class="list-row d-between" v-for="(item,index) in list2" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/txcg.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view> -->
				</view>
			</view>
		</block>
		
		<!-- 已发放 -->
		<block v-if="nowTab==2">
			<view v-if="list3.length==0 && list4.length==0" class="nodata-part">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<view class="content-part">
				<view class="list-part main">
					<!-- <view class="list-row" v-for="(item,index) in shouruList" :key="index">
						<view class="list-title">{{item.company_name}}</view>
						<view class="list-des">{{item.client_time}}</view>
						<view class="right-money money-text">{{item.charges}}</view>
					</view> -->
					<view class="list-row d-between" v-for="(item,index) in list3" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/txcg.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden" v-if="item.pink==1">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view>
					<!-- <view class="list-row d-between" v-for="(item,index) in list4" :key="index">
						<view class="d-left">
							<image src="https://shop.pangu.mobi/static/mobile/txcg.jpg" class="status-icon"></image>
							<view class="info">
								<view class="d-left">
									<view class="info-tit">{{item.name}}</view>
									<view class="iden">分销</view>
								</view>
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="price">{{item.charge}}</view>
					</view> -->
				</view>
			</view>
		</block>
		<!-- 状态筛选弹出框 -->
		<view v-if="isShow" class="mask-select-box" style="top:100rpx" @touchmove.stop.prevent="doNothing" @tap="changeTypeBox()">
			<view class="info-part">
				<view class="box-title">
					提现状态
					<image class="choose2-img" src="https://shop.pangu.mobi/static/mobile/select2.jpg" mode="aspectFit"></image>
				</view>
				<view class="main">
					<view :class="['row-item',type==v?'type-select':'']" v-for="(v,vind) in typeList" :key="vind" @tap.stop="selectType(v)">
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
				// tabList: ['收入记录','发放记录'],
				tabList: ['全部','发放中','已发放'],
				nowTab: 0,
				shouruList: [],   
				tixianList: [],
				type: '全部',
				// 状态筛选弹出框
				isShow: false,
				typeList: ['全部','审核打款中','提现成功','提现失败'],
				list1:[],  //发放中一级佣金列表
				list2:[],  //发放中二级佣金列表
				list3:[],  //已发放一级佣金列表
				list4:[]   //已发放二级佣金列表
			}
		},
		onLoad() {
			this.user_id = uni.getStorageSync('user_id');
			this.getData();
		},
		methods: {
			async getData() {
				let that = this;
				let param = '?user_id='+that.user_id;
				let res = await that.$api.commonMethod('/income_detail'+param,'GET');
				console.log(res)
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					that.list1 = da.data.Issuing_one_list;   //发放中一级佣金列表
					// that.list2 = da.data.Issuing_two_list;   //发放中二级佣金列表
					that.list3 = da.data.Issued_one_list;    //已发放一级佣金列表
					// that.list4 = da.data.Issued_two_list;    //已发放二级佣金列表
				}
			},
			// 切换tab
			changeTab(vind) {
				this.isShow = false
				this.nowTab = vind
			},
			// 筛选弹出框
			changeTypeBox() {this.isShow = !this.isShow},
			// 选择线索状态
			selectType(v) {
				this.type = v
				this.isShow = false
			},
		}
	}
</script>

<style scoped>
	.tab-part{width: 100%;height: 85rpx;padding: 0 20rpx;}
	.tab-item{line-height: 85rpx;width: 230rpx;display: inline-block;font-size: 30rpx;text-align: center;}
	/* .tab-part .tab-item+.tab-item{margin-left: 110rpx;} */
	.tab-active{color: #ee2510;border-bottom: 2rpx solid #ee2510;}
	
	.content-part{position: absolute;width: 100%;height: calc(100% - 240rpx);overflow: auto;background-color: #fff;}
	.box-title{height: 100rpx;background-color: #f6f7f9;font-size: 30rpx;font-weight: bold;line-height: 100rpx;padding: 0 30rpx;}
	.choose-img{width: 29rpx;height: 27rpx;float: left;margin: 38rpx 0 0 10rpx;}
	.list-part{width: auto;height: 100%;}
	.list-row{ padding:41rpx 0; border-bottom: 1px solid #dbdbdb;}
	.status-icon{ width:70rpx; height:70rpx;}
	.info{ margin-left: 20rpx;}
	.info .info-tit{ color: #333333; font-size: 30rpx;}
	.iden{ padding:5rpx 13rpx; background: #ffb0a8; color: white; font-size:22rpx; margin-left: 8rpx; border-radius:20rpx;}
	.info .time{ color: #666666; font-size: 24rpx; margin-top: 20rpx;}
	.price{ color:#333333; font-size: 30rpx; font-weight: bold;}
	
	.list-img{width: 70rpx;height: 70rpx;float: left;margin-top: 30rpx;margin-right: 15rpx;}
	.list-title{font-size: 30rpx;padding-top: 20rpx;width: 480rpx;}
	.list-des{font-size: 28rpx;padding-top: 10rpx;color: #666666;}
	.right-money{font-size: 28rpx;color: #666666;float: right;min-width: 110rpx;text-align: center;margin-top: -45rpx;font-weight: bold;}
	.money-text{color: #e82612;}
	.info-part{width: 100%;height: auto;overflow: auto;background-color: #fff;}
	.choose2-img{width: 29rpx;height: 27rpx;display: inline-block;margin: 38rpx 0 0 10rpx;transform: rotate(180deg);}
	.row-item{height: 85rpx;font-size: 30rpx;color: #666666;line-height: 85rpx;border-bottom: 1px solid #dbdbdb;}
	.select-img{width: 28rpx;height: 20rpx;float: right;margin-top: 35rpx;display: none;}
	.type-select{color: #fb2711;}
	.type-select .select-img{display: block;}
</style>