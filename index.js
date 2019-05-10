
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const room = require('./api/room');
const receipt = require('./api/receipt');
const { initDatastore } = require('./api/initDatastore');
const hostName = '127.0.0.1';
const port = 8888;

app.use(bodyParser.json()); // 用来分析application/json类型的请求参数，不用就会获取不到request body
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 初始化数据库
app.get("/datastore/init",function(req, res){
	console.log("请求url：", req.path, "请求参数：", req.query);
	initDatastore(req, res)
});

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

app.post("/insertReceipt",function(req, res){
	console.log("请求参数：",req.body);
	receipt.insertItem(req, res)
});

app.listen(port,hostName,function(){
	console.log(`服务器运行在http://${hostName}:${port}`);

});