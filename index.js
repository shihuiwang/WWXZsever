const express = require("express");
const multer  = require('multer'); // 用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const bodyParser = require("body-parser");
const tinify = require("tinify");

const app = express();
const room = require('./api/room');
const receipt = require('./api/receipt');
const { initDatastore } = require('./api/initDatastore');
const hostName = '127.0.0.1';
const port = 8888;
const staticDirectory = 'sources';

app.use(bodyParser.json()); // 用来分析application/json类型的请求参数，不用就会获取不到request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticDirectory));

tinify.key = "2N3E5czu45UICztgBKPIxWTcPhMNUwqG"; // 获取：https://tinypng.com/dashboard/api //644724974@qq.com
// 您可以将任何JPEG或PNG图像上传到Tinify API进行压缩。
// 我们将自动检测图像类型并相应地使用TinyPNG或TinyJPG引擎进行优化。只要您上传文件或提供图片的URL，就会开始压缩。
// 您可以选择本地文件作为源，并将其写入另一个文件。var source = tinify.fromFile("unoptimized.jpg");
// 这里输入文件也支持网址形式：tinify.fromUrl("https://tinypng.com/images/panda-happy.png");source.toFile("optimized.jpg");
// 上述两行代码也支持连写哦！tinify.fromFile("unoptimized.jpg").toFile("optimized.jpg")

// 上传文件的配置设置
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './sources/uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.' +file.originalname.split('.')[1])
	}
})

const upload = multer({ storage: storage })

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 初始化数据库
/*app.get("/datastore/init",function(req, res){
	console.log("请求url：", req.path, "请求参数：", req.query);
	initDatastore(req, res)
});*/

app.get("/getRoomById",function(req, res){
	console.log("请求参数：",req.query);
	room.getInfo(req, res)
});

app.post("/getRoomList",function(req, res){
	console.log("请求参数：",req.body);
	room.getList(req, res)
});

app.post("/updateRoomInfo",function(req, res){
	console.log("请求参数：",req.body);
	room.updateInfo(req, res)
});

app.post("/insertRoom",function(req, res){
	console.log("请求参数：",req.body);
	room.insertItem(req, res)
});

app.post("/removeItem",function(req, res){
	console.log("请求参数：",req.body);
	room.removeItem(req, res)
});

app.post("/insertReceipt",function(req, res){
	console.log("请求参数：",req.body);
	receipt.insertItem(req, res)
});

app.post("/historyReceipt/list",function(req, res){
	console.log("请求参数：",req.body);
	receipt.getList(req, res)
});

// 上传文件
app.post('/upload',upload.single('file'),(req,res)=>{
	console.log("body参数：", req.body);
	console.log("文件参数：", req.file);
	// 压缩图片
	tinify.fromFile(`./${staticDirectory}/uploads/${req.file.filename}`).toFile(`./${staticDirectory}/uploads/${req.file.filename}`)
	// 将文件路径定位到soucers下
	req.file.reallyPath = req.file.path.replace(staticDirectory, '')
	req.file.reallyPath = req.file.reallyPath.replace(/\\/g, '/')
	res.send(req.file);
});

app.listen(port,hostName,function(){
	console.log(`服务器运行在http://${hostName}:${port}`);

});