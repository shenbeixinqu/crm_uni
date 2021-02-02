import http from '@/main.js'
// 通用方法
export const commonMethod = (urlName, method, data) => {
	return http.request({
	    url: urlName,
		data: data,
	    method: method,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
}
// 默认全部导出
export default {
	commonMethod
}