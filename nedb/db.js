//nedb api中文文档地址 https://www.w3cschool.cn/nedbintro/nedbintro-eqsm27mb.html
// 加载模块
const nedb = require('nedb');

// 实例化房间连接对象
exports.roomDb = new nedb({
	filename: 'db/roomData.db',
	autoload: true
});

// 实例化收据对象
exports.receDb = new nedb({
	filename: 'db/receiptData.db',
	autoload: true
});