<template>
	<view class="content">
		<view class="content-part">
			<view v-if="collectsList.length==0" class="nodata-part">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<scroll-view v-else scroll-y @scrolltolower="getNextData" class="collect_list">
				<uni-swipe-action>
					<!-- v-for="(v,vind) in collectsList" :key="vind" @click="onClick(v)" -->
					<uni-swipe-action-item class="collect_item" :options="options" v-for="(v,vind) in collectsList" :key="vind" @click="onClick(v)">
						<view style="width: 100%;">
							<view class="d-between">
								<view class="d-left" style="width:100%;" @tap="goProdetail(v)">
									<image :src="'https://shop.pangu.mobi'+v.img_url" class="pro-pic"></image>
									<view class="pro-info">
										<view class="d-left">
											<view class="pro-tit">{{v.pro_name}}</view>
											<image src="https://shop.pangu.mobi/static/mobile/collects_xing.png" class="pro-icon"></image>
										</view>
										<view class="pro-tip">已有{{v.buy_count}}人购买</view>
										<!-- <view class="pro-time">2020-05-05 10:08:55</view> -->
									</view>
								</view>
								<!-- <image src="https://shop.pangu.mobi/static/mobile/share_icon.png" class="share_icon" @tap="share"></image> -->
							</view>
							<!-- <view class="line"></view> -->
							<!-- 营销推广 -->
							<!-- <image v-if="v.category_id==1" class="type-img" src="https://shop.pangu.mobi/static/mobile/yxtg1.jpg" mode="aspectFit"></image> -->
							<!-- AI产品 -->
							<!-- <image v-if="v.category_id==2" class="type-img" src="https://shop.pangu.mobi/static/mobile/aicp1.jpg" mode="aspectFit"></image> -->
							<!-- 网站建设 -->
							<!-- <image v-if="v.category_id==3" class="type-img" src="https://shop.pangu.mobi/static/mobile/wzjs1.jpg" mode="aspectFit"></image> -->
							<!-- 小程序 -->
							<!-- <image v-if="v.category_id==4" class="type-img" src="https://shop.pangu.mobi/static/mobile/xcx1.jpg" mode="aspectFit"></image>
							<view class="text-part">
								<view class="title">{{v.pro_name}}</view>
								<view class="des">已有{{v.buy_count}}人购买</view>
							</view> -->
						</view>
						
					</uni-swipe-action-item>
				</uni-swipe-action>
			</scroll-view>
		</view>
		<foot-part></foot-part>
	</view>
</template>

<script>
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
	    components: {
	        uniSwipeAction,
	        uniSwipeActionItem
	    },
		data() {
			return {
				user_id: '',
				options: [{text: '删除',style: {backgroundColor: '#ff0f32'}}],
				isAll: false,
				nowPage: 1,
				collectsList: [],
				from:'mycollects'
			}
		},
		onLoad() {
			this.user_id = uni.getStorageSync('user_id');
			// this.getData();
		},
		onShow(){
			this.collectsList=[]
			this.getData();
		},
		// onShareAppMessage(res,e){
		// 	console.log('1111111111111')
		// 	console.log(e)
		// 	console.log(res)
		// },
		methods: {
			async getData() {
				let that = this;
				that.type = that.type==0?'':that.type;
				let param = '?user_id='+that.user_id+'&page='+that.nowPage+'&per_page=10';
				let res = await that.$api.commonMethod('/my_collect'+param,'GET');
				console.log(res)
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					if(da.data.collects_dict_li==0) {
						that.isAll = true;
					}else{
						that.collectsList = that.collectsList.concat(da.data.collects_dict_li);
					}
				}
			},
			getNextData() {
				if(this.isAll) {
					this.showToast('已加载全部');
				}else{
					this.nowPage++;
					this.getData();
				}
			},
			onClick(v) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确定取消收藏该产品？',
					success: function (res) {
						if(res.confirm) {
							that.deletePro(v)
						}
					}
				});
			},
			// 删除收藏产品
			async deletePro(v) {
				let that = this;
				let param = '?user_id='+that.user_id+'&pro_id='+v.pro_id+'&action=0';
				let res = await that.$api.commonMethod('/pro_collect'+param,'GET');
				if(res.statusCode==200&&res.data.errno==0) {
					uni.showToast({
					    title: '取消收藏成功',
						icon: 'none'
					});
					that.nowPage = 1;
					that.collectsList = [];
					that.getData();
				}else{
					uni.showToast({
					    title: '请稍后重试',
						icon: 'none'
					});
				}
			},
			goProdetail(v) {
				console.log('跳转')
				uni.navigateTo({
					url: '../product/pro_detail?id='+v.pro_id+'&path='+this.from
				});
			},
			share(e){
				console.log('share')
				console.log(e)
				uni.showShareMenu({
					title:'111',
					content:'2222',
					imageUrl:'https://shop.pangu.mobi/static/mobile/loginBgtop.jpg',
					path:'pages/product/pro_detail?id='+e.pro_id,
					success(res){
						console.log(res)
					},
					fail(res){
						console.log('错误了')
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content-part{position: absolute;width: 100%;height: calc(100% - 130rpx);overflow: auto;background-color: #fff;}
	.collect_list{height: 100%;}
	.collect_item{background-color: #fff;/* border-bottom: 2rpx solid #eeeeee; */}
	.pro-pic{ width:215rpx; height:140rpx; margin-left:20rpx; border:2rpx solid #c5c5c6;}
	.pro-info{ padding-left:41rpx;}
	.pro-tit{ font-size: 31rpx; color:black;}
	.pro-icon{ width:35rpx; height:35rpx; margin-left:16rpx;}
	.pro-tip{ font-size: 23rpx; color:#666666; margin-top:18rpx;}
	.pro-time{ font-size: 23rpx; color:#a0a0a0; margin-top:18rpx;}
	.share_icon{ width:50rpx; height: 48rpx;}
	.line{ width:100%; height: 2rpx; background: #eeeeee;}
</style>