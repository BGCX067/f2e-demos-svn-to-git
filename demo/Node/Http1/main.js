// 导入相关模块
var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandler');
// var anotherHandler = require('./anotherHandler');

// 配置路径映射
var handler = {};
handler['/'] = requestHandler.start;
handler['/start'] = requestHandler.start;
handler['/upload'] = requestHandler.upload;
handler['/show'] = requestHandler.show;

// 开启web服务
server.start(router.router, handler);