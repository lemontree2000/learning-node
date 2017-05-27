"user strict"
// 加载模块
var http = require('http');

var processRequest = require('./server');

// 创建服务
console.log(processRequest);
var httpServer = http.createServer((req, res) => {
  processRequest(req, res);  
  // 调用server模块的processRequest方法
});

var port = 3000;
// 指定监听的端口

httpServer.listen(port, () => {
  console.log(`app is running at port:${port}`);
  // 开始监听
});