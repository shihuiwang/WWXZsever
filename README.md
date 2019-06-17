# WWXZsever
微微小筑的node接口代码
运行方法：node index
一共5个接口：
1、/datastore/init // 初始化数据库，向nedb文件重新写入数据，不会覆盖以前的数据！
2、/getRoomById // 根据id获取房间的基本数据
3、/getRoomList // 获取所有的房间列表
4、/updateRoomInfo // 更新房间数据
5、/insertReceipt / 插入历史收据
