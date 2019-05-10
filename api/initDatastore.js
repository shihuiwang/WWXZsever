const {roomDb, receDb} = require('../nedb/db');
const dataJson = require('../dataJson/tenantInfo');

exports.initDatastore = (req, res) => {
	// 初始化房间数据32条
	Object.keys(dataJson.tenantInfo).map(item => {
		dataJson.tenantInfo[item].id = dataJson.tenantInfo[item].roomNumber;
		roomDb.insert(dataJson.tenantInfo[item], (err, ret) => {
			//console.log(err, ret)
		});
	});
	// 初始化收据数据
	Object.keys(dataJson.roomJSON).map(item => {
		receDb.insert(dataJson.roomJSON[item], (err, ret) => {
			//console.log(err, ret)
		});
	});

	res.send({code:200,msg:"初始化成功"});
};