# Lesson1-从一个服务来学习node-api2

今天开学习server.js模块，昨天晚上重新看了一下server模块发现一些问题。功能还不完善，但是我们还是接着讲里面的api。后期再慢慢完善。

# 目录结构 

```learning-node
│  README.md
│
├─Lesson1-从一个服务来学习node-api0
│      README.md
│
├─Lesson1-从一个服务来学习node-api1
│      README.md
│      text&html.png
│
├─Lesson1-从一个服务来学习node-api2
│      README.md
│
└─server
        app.js
        index.html
        mime.js
        server.js
```

## server.js

```javascript
var url = require('url');

var fs = require('fs');

var path = require('path');

var mime = require('./mime');

module.exports = function processRequest(request, response) {
  // request里面切出标识符字符串
  var requestUrl = request.url;
  // url模块的parse方法 接收一个字符串，返回一个url对象，切出路径
  var pathName = url.parse(requestUrl).pathname;
  pathName = decodeURI(pathName);
  // 解决301重定向问题，如果pathname没以/结尾，并且没有扩展名
  if (!pathName.endsWith('/') && path.extname(pathName) === '') {
    pathName += '/';
    var redirect = "http://" + request.headers.host + pathName;
    response.writeHead(301, {
      location: redirect

    });
    //response.end方法用来回应完成后关闭本次对话，也可以写入HTTP回应的具体内容。
    response.end();
  }
  //获取资源文件的绝对路径
  var filePath = path.resolve(__dirname + pathName);
  var ext = path.extname(pathName);
  ext = ext ? ext.slice(1) : 'unknown';
  // 未知的类型一律用"text/plain"类型
  var contentType = mime[ext] || "text/plain";
  fs.stat(filePath, (err, stats) => {
    if (err) {
      response.writeHead(404, {
        "content-Type": "text/html"
      });
      response.end("<h1>404 Not Found</h1>");
    }
    //没出错 并且文件存在
    if (!err && stats.isFile()) {
      response.writeHead(200, {
        "contentType": contentType
      });
      //建立流对象，读文件
      var stream = fs.createReadStream(filePath);
      //错误处理
      stream.on('error', function() {
        response.writeHead(500, {
          "content-Type": contentType
        });
        response.end("<h1>500 server Error</h1>");
      });
      stream.pipe(response);
    }
    //如果路径是目录
    if (!err && stats.isDirectory()) {
      var html = "<head><met charset='utf-8'/></head>";
      //读取该路径下文件
      fs.readdir(filePath, (err, files) => {
        if (err) {
          console.log("读取路径失败");
        } else {
          for (var file of files) {
            if (file === "index.html") {
              response.writeHead(200, {
                "content-type": contentType
              });
              response.end(file);
              break;
            }
            html += `<div><a href='${file}'>${file}</a></div>`;
          }
          response.writeHead(200, {
            "content-type": "text/html"
          });
          response.end(html);
        }
      });
    } 
  }); 
}
```

### url模块

> url是一个专门处理和解析url的模块，它提供了三个方法pase()、format() 、resolve(),用到什么讲什么，我们只讲parse()方法。

parse 将字符串的url解析成一个url对象， parse(string). 对象下面有相应的属性。

```javascript
  url.parse("http://user:pass@host.com:8080/p/a/t/hquery=string#hash");
  // 得到的
 {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',
    pathname: '/p/a/t/h',
    path: '/p/a/t/h?query=string',
    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
  }
```
可以看到server.js中我们将request中的url进行了parse(),获取到了对象下面的pathname , 用了es6 字符串方法endsWith 判断字符最后是否是'/'


### fs 模块

> fs 是node的文件系统,主要用来对文件的读写。

fs.stat 是用来获取文件的状态信息，传入参数，返回一个stats实例,记录文件信息，err错误既是文件没有存在，我们返回了404. 

* stats.isFile() 如果是文件返回 true，否则返回 false。
* stats.isDirectory() 如果是目录返回 true，否则返回 false。

```javascript
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT 
}
```
fs.createReadStream 新建一个 ReadStream(可读流) 对象.
* stream.on 监听了error时间
* stream.pipe 将可读流文件写入response里面

fs.readdir 读取目录的方法
> fs.readdir(path, callback)

* path - 文件路径。
* callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。




### path模块

> 模块提供了一些工具函数，用于处理文件与目录的路径。

* path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。如果没有. 则返回一个空字符串。
* path.relative() 方法返回从 from 到 to 的相对路径。 如果 from 和 to 各自解析到同一路径（调用 path.resolve()），则返回一个长度为零的字符串。

```javascript
path.extname('index.html')
// 返回: '.html'
path.extname('index.coffee.md')
// 返回: '.md'
path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')
// 返回: '..\\..\\impl\\bbb'
```
## response & request

> response和 request 分别是服务端响应对象客户端请求对象， 在创建http时生成。 

* response.writeHead 向请求的客户端发送响应头。
* response.end 结束响应，告诉客户端所有消息已经发送。当所有要返回的内容发送完毕时，该函数必须被调用一次。如何不调用该函数，客户端将永远处于等待状态。

## 结语

这样整个服务器的内容也将完了。 因为经历原因可以一些api讲的不够详细， 以后会补上的。 后面两个星期可能没时间写了，所有会空一点。 等完成现在的计划就可以全面学习Node.js了。 



