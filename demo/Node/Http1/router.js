// 将不同路径的请求和数据转发到相应的处理函数中，否则返回404
function route(handle, path, response, request) {
	console.log('router: About to route a request for: ' + path);
	if(typeof handle[path] === 'function') {
		return handle[path](response, request);
	}else {
		console.log('router: No handler for this request path');
		response.writeHead(404, {"Content-Type": "text/plain"});
	    response.write("404 Not found");
	    response.end();
	}
}

// 导出为外部模块
exports.router = route;