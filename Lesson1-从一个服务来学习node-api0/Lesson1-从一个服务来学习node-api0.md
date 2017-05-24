# Lesson1-从一个服务来学习node-api

前段时间腾讯云搞活动，在那买了一个最低配的主机，想着写一些好玩的东西放上去。一直在想怎么弄服务器端， 有想过用php，但是php实在是没基础，然后就选择node。 因为node一直是在我计划学习的技术栈中，所以这次正好学习也满足自己的使用需求。

> 下面就从昨天在网络上抄写的一个简单的服务器来开始认识node的api

# 目录结构 2017-4-24
```
learning-node
│ README.md
│
├─Lesson1-从一个服务来学习node-api0
│   Lesson1-从一个服务来学习node-api0.md
│
└─server
    app.js
    index.html
    mime.js
    server.js
```
## app.js 

```javascript
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
```

### require & exports

Node.js有一个简单的模块系统，遵循的是CommonJS的规范。一个文件既是一个模块，而一个模块里面可以有好多方法， 可以按你的业务自定义模块。

这里是一个栗子模块名为lizi.js

```javascript
const lzCreater = require('./creater.js');

lzCreater.redLiZi(4);
// 这是您的4个红色栗子,颜色危险系数为100

lzCreater.blueLiZi(8); 
// 这是您的8个蓝色栗子，颜色危险系数为49

```

这是一个栗子生产模块creater.js
```javascript
exports.redLiZi = function (count) {
  console.log(`这是您的${count}个红色栗子,颜色危险系数为100`);
}

exports.blueLiZi = function (count) {
  console.log(`这是您的${count}个蓝色栗子,颜色危险系数为49`);
}
```

以上lizi.js模块(用require)依赖加载了 creater.js模块 ,而creater.js模块则到(用exports)导出了两个不同的方法。这样就完成了两个独立模块之间的加载和使用。

而app.js模块分别加载了node的http模块和我们自定义的processRequest。

### http模块

http是node的一个网络模块，它有好多api。我们暂时先去了解我们现在用的api。

> http.createServer  & http.listen

createServer是用来创建一个http服务器。回调返回了两个对象，requestd对象和response对象。后面再讲这两个。

http.listen是用来开始监听服务器的，需要传入一个端口port, 和一个回调。

这样我们一个简单的服务器就创建好了。 但是这里没有看到服务，因为服务是单独在server模块里面。 我们最后讲server模块， 下一节讲mime模块。





