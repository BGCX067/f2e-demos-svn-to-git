// 导入相关模块
var http = require('http');
var url = require('url');

// 监听端口，开启web服务，将收到的请求和数据交由router分发
function startServer(route, handle) {
	http.createServer(function(request, response) {
		var postData = '';
		var path = url.parse(request.url).pathname;
		console.log('server: Request for path: ' + path + ' received!');
		route(handle, path, response, request);
	}).listen(8888);
}
console.log('server: Server has started!');

// 导出为外部模块
exports.start = startServer;