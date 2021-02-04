// 解析链接中的参数
let getQueryString = function (url, name) {
  ////console.log("url = " + url)
  ////console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    ////console.log("r = " + r)
    ////console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}
function getUrlParams(url) {
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
			var str = url.split("?")[1],
					strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
	}
	return theRequest;
}

//导出方法，外部调用
module.exports = {
  getQueryString: getQueryString,
  getUrlParams:getUrlParams
}