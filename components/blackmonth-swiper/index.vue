<template>
	<view>
		<view class="swiperPanel">
			<view class="swiperItem" @touchstart="startMove" @touchend="endMove" v-for="(item, index) in swiperList" :key="index" :data-url="item.url" :data-index="index" :style="{transform: itemStyle[index].transform, zIndex: itemStyle[index].zIndex, opacity: itemStyle[index].opacity}">
				<view class="children">
					<image class="pic" :src="'http://shop.pangu.mobi'+item.url"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				slideNote: {
					x: 0,
					y: 0
				},
				screenWidth: 0,
				itemStyle: [],
				index:-1
			};
		},
		created() {
			let that=this;
			var macInfo = uni.getSystemInfoSync();
			that.screenWidth = macInfo.screenWidth;
			// 计算swiper样式
			that.swiperList.forEach((item, index) => {
				that.itemStyle.push(that.getStyle(index))
			})
			that.$emit("getChild",that.index+1);
		},
		methods: {
			getStyle(e) {
				if (e > this.swiperList.length / 2) {
					////console.log('e > this.swiperList.length / 2')
					var right = this.swiperList.length - e
					return {
						transform: 'scale(' + (1 - right / 10) + ') translate(-' + (right * 9) + '%,0px)',
						zIndex: 9999 - right,
						opacity: 0.8 / right
					}
				} else {
					return {
						transform: 'scale(' + (1 - e / 10) + ') translate(' + (e * 9) + '%,0px)',
						zIndex: 9999 - e,
						opacity: 0.8 / e
					}
				}
			},
			startMove(e) {
				this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				if ((e.changedTouches[0].pageX - this.slideNote.x) < 0) {
					// 向左滑动
					////console.log('向左滑动')
					////console.log(e.currentTarget.dataset.index+1)
					////console.log(e.currentTarget.dataset.url)
					this.index=e.currentTarget.dataset.index
					////console.log(this.swiperList[this.index+1])
					// this.$emit("getChild",this.swiperList[this.index]);
					// this.$emit("getChild",this.swiperList[this.index+1]);
					this.$emit("getChild",this.index);
					var last = [newList.pop()]
					newList = last.concat(newList)
				} else {
					// 向右滑动
					////console.log('向右滑动')
					////console.log(e.currentTarget.dataset.index+1)
					////console.log(e.currentTarget.dataset.url)
					this.index=e.currentTarget.dataset.index
					this.$emit("getChild",this.swiperList[this.index-1]);
					newList.push(newList[0])
					newList.splice(0, 1)
				}
				this.itemStyle = newList
			}
		}
	}
</script>

<style lang="scss">
	.swiperPanel {
		margin: 52rpx 0;
		height: 1056rpx;
		width: 100%;
		overflow: hidden;
		position: relative;

		.swiperItem {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transition: all .5s;

			.children {
				height: 100%;
				width: 580rpx;
				margin: 2rpx auto;

				.pic {
					height: 100%;
					width: 100%;
					border-radius: 20px;
					box-shadow: 0 0 10rpx rgba(0,0,0,.1);
				}
			}
		}
	}
</style>
