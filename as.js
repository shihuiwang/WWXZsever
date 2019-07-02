
// 项目服务开机自动启动程序
const Service = require('node-windows').Service;

const svc = new Service({
	name: 'wwxz_node_service',    //服务名称
	description: '微微小筑服务器', //描述
	script: './index.js', //nodejs项目要启动的文件路径
	wait: '3', //程序崩溃后重启的时间间隔
	grow: '0.5', //重启等待时间成长值，比如第一次3秒，第二次3.5秒，以此类推
	maxRestarts: '30', //60秒内最大重启次数
});

// 监听启动/安装事件
svc.on('install', () => {
	svc.start();
	console.log('安装自启动成功!');
});

// 监听停止/卸载事件
svc.on('uninstall', () => {
	console.log('卸载自启动成功!');
	console.log('服务器状态：', svc.exists);
});

// 防止程序运行2次
svc.on('alreadyinstalled', () => {
	console.log('服务已经启动/安装过了，不要重复运行')
});

// 如果存在就卸载
if(svc.exists) return svc.uninstall();

//否则启动
svc.install();