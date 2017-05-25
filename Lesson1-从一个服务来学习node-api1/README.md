# lesson1-从一个服务器开始来学习node-api1

今天有点晚，那就单独只讲mime模块。因为这个比较简单，也好理解。

# 目录结构 2017-5-26
```
learning-node
│  README.md
│
├─Lesson1-从一个服务来学习node-api0
│      README.md
│
├─Lesson1-从一个服务来学习node-api1
│      README.md
│
└─server
        app.js
        index.html
        mime.js
        server.js

```

## mime.js 

```javascript
module.exports = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-con",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "application/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};
```
### MIME 

MIME (Multipurpose Internet Mail Extensions) 是描述消息内容类型的因特网标准。是设定某种扩展名的文件用一种应用程序来打开的方式类型,简单的说就是文件的类型。

### Node.js 中的MIME

node中服务器需要通过用户访问的文件名及后缀来访问文件。而后缀名就用来判断该文件用什么MIME类型去解析的关键。

> 假如我打开了localhost:3000/index.html, 则服务通过文件后缀为html ，则匹配MIME类型为text/html 

![text/html]()