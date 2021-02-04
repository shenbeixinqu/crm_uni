<script>
	export default {
		onLaunch: function() {
			// 获取当前路由
			// let nowRoute = window.location.hash;
			let pages=getCurrentPages();
			let currpage=null;
			if(pages.length) currpage = pages[pages.length - 1];
			let nowRoute=currpage.route
			// 不需要用户信息的页面
			if(nowRoute){
				if(nowRoute.indexOf('index/index')!=-1||nowRoute.indexOf('login/login')!=-1||nowRoute.indexOf('mine/my_index')!=-1||nowRoute.indexOf('product/pro_list')!=-1||nowRoute.indexOf('product/pro_detail')!=-1) {
					
				}else{
					let user_id = uni.getStorageSync('user_id');
					if(!user_id) {
						uni.reLaunch({
							url: './pages/index/index'
						});
					}
				}
			}
		},
		onShow: function() {
			////console.log('App Show')
		},
		onHide: function() {
			////console.log('App Hide')
		},
		
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	*{margin: 0; padding: 0; box-sizing: border-box; font-family: "Sans-serif";-webkit-text-size-adjust:100%!important;}
	image{display: block;width: auto;}
	page{width: 100%;height: 100%;background-color: #fff;}
	view{box-sizing: border-box;color: #000;}
	.main{margin: 0 30rpx;}
	.greybar{width: 100%;height: 15rpx;background-color: #eff2f3;}
	/* 占位 */
	.zhanwei{padding-bottom: 170rpx;}
	/* 遮罩层 */
	.mask-box{position: fixed;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.7);z-index: 999;}
	/* 筛选遮罩层 */
	.mask-select-box{position: absolute;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.6);z-index: 999;}
	/* 无数据 */
	.nodata-part{padding-top: 300rpx;}
	.nodata-img{width: 374rpx;height: 288rpx;margin: 0 auto;}
	.nodata-text{font-size: 28rpx;color: #666666;text-align: center;}
	.oline{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;word-break:break-all;display:-webkit-box;-webkit-box-orient:vertical;}
	.tline{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;word-break:break-all;display:-webkit-box;-webkit-box-orient:vertical;}
	.sline{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;word-break:break-all;display:-webkit-box;-webkit-box-orient:vertical;}
	.fline{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:4;word-break:break-all;display:-webkit-box;-webkit-box-orient:vertical;}
	.d-left{display: flex;justify-content:left;align-items:center;}
	.d-right{display: flex;justify-content:flex-end;align-items:center;}
	.d-between{display: flex; justify-content: space-between;align-items:center;}
	.d-center{display: flex;justify-content: center;align-items: center;}
</style>