// 导入相关模块
var queryString = require('querystring'),
	fs = require('fs'),
	formidable = require("formidable");

// ‘/start’路径的处理函数，返回一个带上传控件的页面
function start (response){
	console.log('requestHandler: -- Start --');

	var page = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>'+
				'<title>Start Page</title>'+
				'</head>'+
				'<body>'+
				'<form action="/upload" method="post" enctype="multipart/form-data">'+
				'<textarea name="user_word"></textarea>'+
				'<input type="file" name="upload" />'+
				'<input type="submit" value="Submit" />'+
				'</form>'+
				'</body>'+
				'</html>';
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(page);
	response.end();
}

// ‘/upload’路径的处理函数，解析传来的数据将上传来的东西另存为‘C:/test.png’（使用外部模块解析），并返回img标签
function upload (response, request){
	console.log('requestHandler: -- upload --');

	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		console.log('requestHandler: -- parse done --');
		fs.renameSync(files.upload.path, 'C:/test.png');
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('receive image:<br/>');
		response.write('<img src="/show" />');
		response.end();
	});
}

// ‘/show’路径的处理函数，读取文件并输出至页面
function show(response) {
	console.log('requestHandler: -- show --');
	fs.readFile('C:/test.png', 'binary', function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

// 导出为外部模块
exports.start = start;
exports.upload = upload;
exports.show = show;