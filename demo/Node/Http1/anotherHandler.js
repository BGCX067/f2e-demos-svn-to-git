// 阻塞操作测试用

function through (){
	console.log('anotherHandler: Go to start business');
	return 'Hello Through';
}

exports.through = through;