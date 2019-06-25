const { roomDb } = require('../nedb/db');

// 获取房间列表
exports.getList = (req, res) => {
	let {page, size, ...params} = req.body;
	page = page ? page : 1;
	size = size ? size : 10;

	/**
	 * 分页查询房间数据
	 * sort({ roomNumber: 1 }) 以roomNumber字段为准，正序查询 -1为倒序
	 * skip(num)从哪里开始查询
	 * limit(num)一次查询多少条
	 */
	roomDb.find(params).sort({ roomNumber: 1 }).skip((page-1)*size).limit(size).exec(function (err, docs) {
		// 查询条数
		roomDb.count(params, function (err, count) {
			res.send({
				code: 200,
				data: docs,
				msg: 'success',
				total: count
			});
		});
	})
};

// 获取单个房间数据
exports.getInfo = (req, res) => {
	roomDb.findOne(req.query, function (err, docs) {
		if(err) {
			return res.send({code: -1, err, msg: '未知错误'});
		}
		res.send({code: 200, data: docs, msg: '获取数据成功'});
	})
};

// 更新房间信息
exports.updateInfo = (req, res) => {
	const {_id,...changed} = req.body;
	if(!_id) {
		res.send({code: -1, msg: '缺少_id字段参数'});
		return;
	}
	roomDb.update({_id},{$set: changed}, { multi: true }, function (err, numReplaced, affectedDocuments) {
		let result = {};
		if(err) {
			result.code = -1;
			result.msg = JSON.stringify(err);
			res.send(result);
		}
		else {
			result.code = 200;
			result.msg = '更新数据成功';
			result.data = affectedDocuments;
			res.send(result);
		}
	});
};

// 插入一个房间数据
exports.insertItem = (req, res) => {
	roomDb.insert(req.body, function (err, newDoc) {
		if(!err) {
			res.send({code: 200, msg: '插入房间数据成功', data: newDoc});
		}
		else {
			res.send({code: -1, msg: '插入过程中发生未知错误', err});
		}
	});
};

// 删除一个房间数据
exports.removeItem = (req, res) => {
	roomDb.remove(req.body, (err, numRemoved) => {
		if(!err) {
			res.send({code: 200, msg: '删除房间数据成功', data: numRemoved});
		}
		else {
			res.send({code: -1, msg: '删除过程中发生未知错误', err});
		}
	});
};