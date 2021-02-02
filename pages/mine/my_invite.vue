<template>
	<view>
		<view v-if="canvas">
			<view class="tit">我邀请的：</view>
			<view class="invite-top d-center">
				<view class="top-left">
					<view class="peo"><text>{{peonum.oath_numbers}}</text>人</view>
					<view class="peo-p">注册人数</view>
				</view>
				<view class="divide"></view>
				<view class="top-left">
					<view class="peo"><text>{{peonum.register_number}}</text>人</view>
					<view class="peo-p">认证人数</view>
				</view>
			</view>
			<view style="position: fixed;top:100rpx;left: 0;height: 100%;width: 100%;">
				<view class="tower-swiper" @touchmove="TowerMove" @touchstart="TowerStart">
					<view class="tower-item" :class="item.zIndex==1?'none':''" v-for="(item,index) in swiperList" :key="index" :style="[{'--index': item.zIndex,'--left':item.mLeft}]"
					 :data-direction="direction" :data-index="index" @touchend="TowerEnd">
						<view class="swiper-item">
							<image :src="imgurl+item.url" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="save-btn" @tap="createCanvas">点击保存图片到手机</view>
		</view>
		<canvas canvas-id="myCanvas" v-if="!canvas" class="my-canvas"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifShow: true,
				current:0,
				bgImg:'',
				canvas:true,
				cardCur:0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				peonum:'',
				imgurl:''
			}
		},
		onLoad(options) {
			this.imgurl=this.$imgurl
			let superior_id=uni.getStorageSync('superior_id')
			let user_id=uni.getStorageSync('user_id')
			// #ifdef MP-WEIXIN
			uni.request({
				url:this.$burl+'/invite_img',
				data:{
					user_id:uni.getStorageSync('user_id'),
					type:'1'
				},
				success:(res)=>{
					console.log(res)
					let pics=res.data.data.result
					let arr=[]
					for(var i = 0;i<pics.length;i++){
						let pic = {
							id:i,
							type:pics[i].type,
							url:pics[i].url
						}
						arr.push(pic)
					}
					arr=arr.concat(arr)
					this.swiperList = JSON.parse(JSON.stringify(arr))
					this.TowerSwiper('swiperList');
					this.bgImg=this.$imgurl+this.swiperList[0].url
					uni.request({
						url:this.$burl+'/invite_oath',
						data:{
							user_id:uni.getStorageSync('user_id'),
						},
						success:(res)=>{
							console.log(res)
							this.peonum=res.data.data
						}
					})
				},
				fail:(err)=>{
					console.log(err)
				}
			})
			// #endif
			// #ifdef MP-BAIDU
			uni.request({
				url:this.$burl+'/invite_img',
				data:{
					user_id:uni.getStorageSync('user_id'),
					type:'2'
				},
				success:(res)=>{
					console.log(res)
					let pics=res.data.data.result
					let arr=[]
					for(var i = 0;i<pics.length;i++){
						let pic = {
							id:i,
							type:pics[i].type,
							url:pics[i].url
						}
						arr.push(pic)
					}
					arr=arr.concat(arr)
					this.swiperList = JSON.parse(JSON.stringify(arr))
					this.TowerSwiper('swiperList');
					this.bgImg=this.$imgurl+this.swiperList[0].url
					uni.request({
						url:this.$burl+'/invite_oath',
						data:{
							user_id:uni.getStorageSync('user_id'),
						},
						success:(res)=>{
							console.log(res)
							this.peonum=res.data.data
						}
					})
				},
				fail:(err)=>{
					console.log(err)
				}
			})
			// #endif
		},
		methods: {
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			// towerSwiper计算滚动
			TowerEnd(e) {
				console.log(e)
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			}, 
			// 生成画布
			createCanvas(){
				let that=this
				let maxIndexNum=parseInt(that.swiperList.length / 2) + 1
				for(let i = 0; i < that.swiperList.length; i++){
					if(that.swiperList[i].zIndex==maxIndexNum){
						console.log(that.swiperList[i])
						that.bgImg=that.$imgurl+that.swiperList[i].url
					}
				}
				that.canvas=false
				that.draw()
			},
			// 绘制canvas
			draw(){
				let that=this
				uni.showLoading({title: '图片生成中'});
				const ctx = uni.createCanvasContext('myCanvas');
				ctx.clearRect(0, 0, 0, 0);
				let path=that.bgImg
				uni.getImageInfo({
					src: path, //服务器返回的图片地址
					success: function(res) {
						uni.hideLoading()
						let radio = uni.getSystemInfoSync().devicePixelRatio
						// 获取图片宽高
						let width = res.width
						let height = res.height
						// let width = res.width/radio
						// let height = res.height/radio
						let Path = res.path;
						// 获取设备宽高
						let windowWidth=uni.getSystemInfoSync().windowWidth
						let windowHeight=uni.getSystemInfoSync().windowHeight
						// #ifdef MP-WEIXIN
						ctx.drawImage(Path, 0, 0, windowWidth,windowHeight);
						// #endif
						// #ifdef MP-BAIDU
						ctx.drawImage(Path, 0, 0, windowWidth,windowHeight);
						// #endif
						// 绘制文字
						// ctx.setFillStyle('#000000')
						// var result = that.breakLinesForCanvas('文案文案文案文案文案文案文案文案文',500, '35px 微软雅黑');
						// 	result.forEach(function(line, index) {
						// 	ctx.fillText(line, 110,20 * index+350,190);
						// });
						ctx.draw()
						setTimeout(()=>{
							uni.canvasToTempFilePath({	// 把画布转化成临时文件
								fileType: 'jpg',			// 保存成的文件类型
								quality: 1,					// 图片质量
								canvasId: 'myCanvas',		// 画布ID
								success(res) {
									// 保存图片至相册
									uni.saveImageToPhotosAlbum({	// 存成图片至手机
										filePath: res.tempFilePath,
										success(res2) {
											uni.showToast({title: '图片保存成功', duration: 2000})
										},
										fail(res3) {
											if (res3.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
												uni.showToast({title: '保存失败，稍后再试', duration: 2000,icon:'none'})
											}else{
												uni.showToast({title: '保存失败，稍后再试', duration: 2000,icon:'none'})
											}
										}
									})
								},
								fail() {
									uni.showToast({title: '保存失败，稍后再试',duration: 2000,icon:'none'})
								}
							})
						},1000)
					},
					fail: function(res) {
					}
				})
			},
			// 文案自动折行
			findBreakPoint(text, width, context) {
				var min = 0;
				var max = text.length - 1;
				while (min <= max) {
					var middle = Math.floor((min + max) / 2);
					var middleWidth = context.measureText(text.substr(0, middle)).width;
					var oneCharWiderThanMiddleWidth = context.measureText(text.substr(0, middle + 1)).width;
					if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
						return middle;
					}
					if (middleWidth < width) {
						min = middle + 1;
					} else {
						max = middle - 1;
					}
				}
				return -1;
			},
			breakLinesForCanvas(text, width, font) {
				const ctx =uni.createCanvasContext('myCanvas',this);
				var result = [];
				var breakPoint = 0;
				if (font) {
					ctx.font = font;
				}
				while ((breakPoint = this.findBreakPoint(text, width, ctx)) !== -1) {
					result.push(text.substr(0, breakPoint));
					text = text.substr(breakPoint);
				}
				if (text) {
					result.push(text);
				}
				return result;
			},
		}
	}
</script>

<style scope>
	page{ background: #f4f4f4;}
	canvas{width:100%;}
	.my-canvas{ position: fixed; top: 0; left: 0; width: 100%; height: 100%;}
	.tower-swiper {height: 100%;width: 100%;}
	.tower-swiper .tower-item {transform: scale(calc(0.5 + var(--index) / 10));margin-left: calc(var(--left) * 550upx - 42.5vw);z-index: var(--index);width: 74vw;/* width: 700upx; */height:150vw;/* height: 900upx; */}
	/* .tower-swiper .tower-item {transform: scale(calc(0.5 + var(--index) / 10));margin-left: calc(var(--left) * 600upx - 42.5vw);z-index: var(--index);width: 85vw; height:168vw;} */
	.invite{ width:698rpx; height: 1024rpx; margin:auto; margin-top:10%;}
	.invitebg{ width:100%; height: 100%;}
	.save-btn{ width:50%; height:75rpx; background:#fb2f19; color:white; text-align:center; line-height:75rpx; font-size:30rpx; border-radius: 50rpx; font-weight:bold; position:fixed; z-index:11; left:25%; top:91%;}
	.invite-top{ width:100%; height: 120rpx; background:#ffffff; box-shadow: 0rpx 5rpx 0 1rpx rgba(0,0,0,0.3); position:fixed; top:60rpx; z-index:11;}
	.top-left{ width:15%;}
	.top-left .peo{ font-size:14rpx; color:#666666; text-align: center;}
	.top-left .peo text{ color:#fb2711; font-size:45rpx;}
	.top-left .peo-p{ font-size:23rpx; color:#666666; margin-top:5rpx; text-align: center;}
	.divide{ width:1rpx; height: 89rpx; background: #fecac7; margin:0 116rpx;}
	.tit{ padding: 10rpx 0 10rpx 40rpx; color: #4b5151; font-size: 30rpx; background: white; position:fixed; width:100%;}
</style>