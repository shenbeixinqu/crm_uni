import http from '@/main.js'
// 通用方法
export const commonMethod = (urlName, method, data) => {
	return http.request({
	    url: urlName,
		data: data,
	    method: method,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			'Authorization':'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTI0MzU5MzQsImlhdCI6MTYxMjM5OTkzNCwiaXNzIjoiY3JtIiwiZGF0YSI6eyJpZCI6NTIsIm5hbWUiOiJcdTc2ZDhcdTUzZTRcdTZkNGJcdThiZDU1MiIsImV0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgybGtJam8xTWl3aWFYTnpJam9pWlhKd0lpd2lhR1ZoWkdWeWN5STZleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjlMQ0psZUhBaU9qRTJNVEkwTWpnMk5ESXNJbWxoZENJNk1UWXhNak01T1RnME1pd2lkWE5sY2w5dVlXMWxJam9pWEhVM05tUTRYSFUxTTJVMFhIVTJaRFJpWEhVNFltUTFOVElpZlEuVncyVmk3VHdCbWRnS1JnMVFWQ3dMNzc0LUExQ0Q0TFFfMmN2bDUxYmp6MCIsImNsb3VkX2lkIjoyLCJ1bl9pZCI6MiwidW5fbmFtZSI6Ilx1NmM4OFx1OTYzM1x1NzZkOFx1NTNlNCIsImRlX2lkIjoxMywiZGVfbmFtZSI6Ilx1NTkyN1x1NWUwMlx1NTczYVx1OTBlOCIsImRlcGFydHR5cGUiOjEwLCJwb3N0X25hbWUiOiJcdTYwM2JcdTc2ZDEiLCJsZXZlbCI6NzcsInN1cGVyX2lkIjoxNywia2EiOjAsImlwIjoiMTcyLjE4LjMuMTI5IiwibGFzdHRpbWUiOjE2MTIzOTk5MzIsInBvc3RzIjpbeyJpZCI6MCwiZG5hbWUiOiJcdTU5MjdcdTVlMDJcdTU3M2FcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn0seyJpZCI6MSwiZG5hbWUiOiJcdTU5MjdcdTViOWVcdTY1YmRcdTkwZTgiLCJuYW1lIjoiXHU2MDNiXHU3NmQxIn1dLCJwb3dlcnMiOiIxNzQyODgxNzk4NjEwOTg3NDE4ODU3NzI3NzM2Nzk5MTU2MTk5NDg4Mzk5Mzk3MDI3NTQwODk1NzQ2OTgxNzc0Mjk2NTg3NDM1OTI3NzE3MDA4Njc1NDUxODU0NDk4OTk3Mjg5OTgwMzEyNDAwNDQwOTQ0NTU2NDgwNjU1NTI2MzYwMjUxMzMyMzc0MTk5Njg3NTIwNzgyNjc4MjY4OTE0OTc2ODA0NTEwNzYyMzczMDI1NjE3NjI2NzEzOTQ0MzQ4Nzc0NTgwODU4MzAxMzcwNDk5MzE4MTY0MTczNjQzMDk3NDI0MjYzNzcwNDA3NzEwNjUzNjA0NTAxNjc0ODk3NjM4NDUxMTM3NDE4ODc0Njg1NzMzNzEwMDYzOTU5NTM1NDQ2MTczMTg0MzI0MzIwODg3ODAyNjgzNjQ2NTI0MjY1MTA2MjQ0MjUxMDgxNjQ1Njk2NzEyNjA2NDcxOTQxMzE2NjQ5NTcyMjE0NDM0NjE1MzcxMDQ1OTM1MTQwMzY3Mjk0MzI5OTM0NjQ5ODcwNjA3MzU5MzE1NzM4MDU1OTYzMzAzNzIyNDIyNTgyNTQzODA3ODg1NzIwOTM1OTMyMzQ0NzgxOTE1MTY2OTcyMDI1MDg3MTc0NzYwMTYxNDkyNTg3MTQyOTIxMjA1MTU0MzYxOTkxNTYzNDE3MjI1ODY1OTc5ODY4NTAwNDUwMjMzNTE0MTQzMzA2ODM3NjM3ODQzODY0NjQ3NTQxNzc2NzE5NjAwOTU4OTEzNTU0MjM4MTI2NDg4MDE4MDQ2NzY0NzY3Nzc2MzY0MTA3MjU5MzM4MDA1ODc3NTgyOTAxNzQ1MDE0MzU1Mzk3MjQ2MDAzMjkwMDczNzU5MTY2MzcxNjAwODA1MzMwOTYxMzE4NzIyNDA1OTExNDUzNTM1MjM4MDAwOTMzMjEyMjYyOTY2OTgyNTM4NzA4ODM4NTcwMDYxOTQ3Nzc5NDU2ODI3MjI5NzUwMDcxMTU3NzkxOTQ5NzA2MjA4NjE5NjY2OTE4MDg4ODkwNTU3ODg5NzkwNTUyMTc0NzI3NjM1MTYxMjE1MjQ4MTk3NTU1ODgxODc2NTc3MTQ5NzE1MjU0MTU1MzQ4Nzg1NTY4NzAwMDUxODQ4ODU4OTA2NDMxNTI1ODIwMTM5MDA3OTQxNzU4NDgwNTY0MTY3Nzc2ODIxMTAzMTg0MDc4MDIyODY4MTI5NTU2MzI1ODQ4OTM3MDA1MDU1NiJ9fQ.qdXEM_bk5rLoYGabkeyhZup-nOjlEk27hlZmZQL6nEs'
		},
	})
}
// 默认全部导出
export default {
	commonMethod
}