<template>
	<view class="content">
		<!-- 左侧分类 -->
		<view class="left-part">
			<view class="type-part">
				<view class="type-item" v-for="(v,vind) in tabList" :key="vind" @tap="changeTab(v)">
					<span :class="['left-span',selectTab==v.id?'span-active':'']"></span>
					{{v.category}}
				</view>
			</view>
		</view>
		<!-- 右侧数据列表 -->
		<scroll-view scroll-y  @scrolltolower="getNextData" class="right-part">
			<view v-if="dataList.length==0" class="nodata-part" style="padding-top:100upx;width:calc(100% - 160upx);">
				<image class="nodata-img" src="https://shop.pangu.mobi/static/mobile/nodata.jpg" mode="aspectFit"></image>
				<view class="nodata-text">暂无内容</view>
			</view>
			<view v-else class="list-item" v-for="(item,index) in dataList" :key="index" @tap="goDetail(item)">
				<image class="list-img" :src="$imgurl+item.img_url" mode="aspectFit"></image>
				<view class="list-text tline">{{item.pro_name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectTab: '',
				tabList: [],
				isAll: false,
				nowPage: 1,
				dataList: [],
				$imgurl:'https://shop.pangu.mobi',
				from:'pro_list'
			}
		},
		onLoad(options) {
			if(options.id) {
				this.selectTab = options.id;
			}
			this.getTabData();
		},
		methods: {
			// 获取产品分类
			async getTabData() {
				let that = this;
				uni.showLoading({title: '加载中'});
				setTimeout(()=>{
					uni.hideLoading();
				},500)
				let res = await that.$api.commonMethod('/pro_category','GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					that.tabList = da.data.result;
					if(!that.selectTab) {
						that.selectTab = that.tabList[0].id;
					}
					that.getProData();
				}
			},
			// 获取产品
			async getProData() {
				let that = this;
				let param = '?pid='+that.selectTab+'&page='+that.nowPage+'&per_page=8';
				let res = await that.$api.commonMethod('/pro_list'+param,'GET');
				if(res.statusCode==200&&res.data.re_code==0) {
					let da = res.data;
					if(da.data.pros_dict_li==0) {
						that.isAll = true;
						that.getNextData();
					}else{
						that.dataList = that.dataList.concat(da.data.pros_dict_li);
					}
				}
			},
			changeTab(v) {
				this.selectTab = v.id;
				this.dataList = [];
				this.isAll = false;
				this.nowPage = 1;
				this.getProData();
			},
			getNextData() {
				if(this.isAll) {
					this.showToast('已加载全部');
				}else{
					this.nowPage++;
					this.getProData();
				}
			},
			// 跳转详情页
			goDetail(item) {
				uni.navigateTo({
					url: './pro_detail?id='+item.id+'&path='+this.from
				});
			},
		}
	}
</script>

<style scoped>
	page,.content{ width: 100%; height: 100%; overflow: hidden; position: relative;}
	
	.left-part{position: fixed;width: 160upx;height: 100%;background-color: #f8f8fa; z-index:111;}
	.type-part{overflow-x: hidden;overflow-y: auto;}
	.type-item{font-size: 32upx;line-height: 40upx;text-align: center;padding: 30upx 0 30upx 5upx;position: relative;}
	.left-span{width: 5upx;height: 40upx;position: absolute;left: 5upx;}
	.span-active{background-color: #f54018;}
	.right-part{height: 100%;width: 100%;position: absolute;top: 0;left: 0;margin-left: 180upx;padding-right: 20upx;}
	.list-item{display: inline-block;margin-top: 25upx;width: 260upx;overflow: hidden;}
	.list-item:nth-child(2n){margin-left: 25upx;}
	.list-img{width: 260upx;height: 196upx;border-radius: 10upx;}
	.list-text{font-size: 30upx;text-align: left;height: 90upx;padding-top: 10upx;}
</style>