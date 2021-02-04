<template>
	<view class="content">
		<view class="topview">
			<button class="search-btn">1</button>
			<input class="se-input" name="nickname" placeholder="请输入客户名称" v-model="kword" /><button type="primary" size="small"
			 class="shai-btn" @click="getList('search')">筛选</button></button> <button type="primary" size="small" class="shai-btn"
			 @click="add()">新增</button></view>
		<!-- 数据列表 -->
		<scroll-view scroll-y @scrolltolower="getNextData" class="right-part">
			<view v-if="showxs" class="nodata-part" style="padding-top:100upx;">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<view v-else class="list-item" v-for="(item,index) in list" :key="index">
				<view class="list-text" @tap="goDetail(item)">
					<view class="list_tit">{{item.name}}</view>
					<view class="tag_k" v-for="(user, i) in item.tags.data" :key="i">
						{{user.t_tab}}

					</view>
				</view>
				<view class="list-item-top">
					<view class="list-dqk">
						<view class="list-dq1" @tap="goDetail(item)">联系人：{{item.linkman.txt}}</view>
						<view class="list-dq1" @tap="goDetail(item)">电话：{{item.phone}}</view>
						<image class="tel-img" src="../../static/tel.png" mode="aspectFit" @tap="call_phone(item)"></image>
					</view>
					<view class="list-dq" @tap="goDetail(item)">到期时间：跟踪{{item.dt_link}} | 跟踪{{item.dt_track}}</view>
					<view class="list-dq" @tap="goDetail(item)">审核状态：延期{{item.delay_status}} | 跟进{{item.audit_status}}</view>
				</view>
				<view class="list-item-bot">
					<span @tap="pizhu(item)">填写批注</span> <span @tap="chufang(item)">申请出访</span> <span @tap="xiangqing(item)">详情</span>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kword: '',
				isAll: false,
				nowPage: 1,
				list: [],
				from: 'pro_list',
				showxs: false,

			}
		},
		onLoad(options) {
			this.getList();
		},
		methods: {
			// async getProData() {
			// 	let that = this;
			// 	uni.showLoading();
			// 	let res = await that.$api.commonMethod('/api/customer/clue/my', 'GET');
			// 	console.log(res);
			// 	if (res.statusCode == 200) {
			// 		this.list = res.data.data.data;
			// 		console.log('aaa', this.list)
			// 		if (this.list.length == 0) {
			// 			this.showxs = true;
			// 			uni.hideLoading();
			// 		} else {
			// 			this.showxs = false;
			// 		}
			// 		setTimeout(function() {
			// 			uni.hideLoading();
			// 		}, 1000)

			// 	}
			// },
			getList() {
				console.log('ddd',this.$burl)
				uni.request({
					url: this.$burl + '/api/customer/clue/my',
					data: {
						// user_id: uni.getStorageSync('user_id'),
						// type: '1'
					},
					success: (res) => {
						console.log(res);
						uni.showLoading();
						if (res.statusCode == 200) {
							this.list = res.data.data;
							if (this.list.length == 0) {
								this.showxs = true;
								uni.hideLoading();
							} else {
								this.showxs = false;
							}
							setTimeout(function() {
								uni.hideLoading();
							}, 1000)
						}
					},
					fail: (err) => {
						//console.log(err)
					}
				})
			},


			changeTab(v) {
				this.selectTab = v.id;
				this.dataList = [];
				this.isAll = false;
				this.nowPage = 1;
				this.getProData();
			},
			getNextData() {
				if (this.isAll) {
					this.showToast('已加载全部');
				} else {
					this.nowPage++;
					this.getProData();
				}
			},
			//拨打电话
			call_phone(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone,
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
						this.call_phone(); //重复调用一次
					}
				});
			},
			// 跳转详情页
			goDetail(item) {
				uni.navigateTo({
					url: './pro_detail?id=' + item.id + '&path=' + this.from
				});
			},
		}
	}
</script>

<style scoped>
	page,
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.type-part {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.left-span {
		width: 5upx;
		height: 40upx;
		position: absolute;
		left: 5upx;
	}

	.span-active {
		background-color: #f54018;
	}

	.right-part {

		display: flex;
		height: 100%;
		width: 96%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.list-item {
		color: #666666;
		margin-top: 25upx;
		padding: 3%;
		overflow: hidden;
		border: 1px #e4e4e4 solid;
		display: flex;
		border-radius: 5px;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.list-item-top {
		font-size: 24upx;
		width: 100%;
		margin-top: 10upx;
	}

	.list-item-bot {
		width: 100%;
		display: flex;
		margin-top: 15upx;
		justify-content: space-between;
		color: #4873c1;
		font-size: 28upx;
	}

	.list-item-bot span {}

	.list-img {
		width: 260upx;
		height: 196upx;
		border-radius: 10upx;
		font-size: 24upx;
	}

	.list-text {
		width: 100%;
		text-align: left;
		font-size: 30upx;
		display: flex;
		align-items: center;
		line-height: 50upx;
		height: 50upx;
		justify-content: flex-start;
	}

	.list_tit {
		display: flex;
	}

	.tag_k {
		display: flex;
		background-color: #ecf5ff;
		font-size: 20rpx;
		margin-left: 5rpx;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		width: 40rpx;
		justify-content: center;
		color: #409eff;
	}

	.list-dq {
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
	}

	.se-input {
		width: 65%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		text-indent: 1rem;
		border: 1px #e4e4e4 solid;
		border-radius: 10upx;
	}

	.search-btn {
		height: 60rpx;
		width: 60rpx;
		background: url(../../static/ss.png);
		background-size: contain;
		position: absolute;
	}

	.shai-btn {
		width: 15%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 22upx;
		color: #fff;
	}

	.topview {
		width: 96%;
		margin-top: 25rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}


	.list-dqk {
		flex-direction: row;
		width: 100%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
		display: flex;
	}

	.list-dq1 {
		display: flex;
		width: 50%;
		text-align: left;
		padding-top: 1upx;
		padding-bottom: 1upx;
	}

	.tel-img {
		width: 46upx;
		height: 46upx;
	}
</style>
