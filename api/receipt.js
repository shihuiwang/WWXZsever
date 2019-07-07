const { receDb } = require('../nedb/db');

// 插入一条收据
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

// 获取历史收据列表
exports.getList = (req, res) => {
	let {page, size, ...params} = req.body;
	page = page ? page : 1;
	size = size ? size : 10;

	// 正则匹配id，实现模糊查询
	if(params.id) params = Object.assign(params, {id: new RegExp(`${params.id}`)})

	/**
	 * 分页查询收据数据
	 * sort({ id: 1 }) 以roomNumber字段为准，正序查询 -1为倒序
	 * skip(num)从哪里开始查询
	 * limit(num)一次查询多少条
	 */
	receDb.find(params).sort({ id: -1 }).skip((page-1)*size).limit(size).exec(function (err, docs) {
		// 查询收据条数
		receDb.count(params, function (err, count) {
			res.send({
				code: 200,
				data: docs,
				msg: 'success',
				total: count
			});
		});
	})
};