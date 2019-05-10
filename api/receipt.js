const { receDb } = require('../nedb/db');

exports.insertItem = (req, res) => {
	receDb.insert(req.body, function (err, newDoc) {
		if(!err) {
			res.send({code: 200, msg: '插入收据数据成功', data: newDoc});
		}
		else {
			res.send({code: -1, msg: '插入过程中发生未知错误'});
		}
	});
};