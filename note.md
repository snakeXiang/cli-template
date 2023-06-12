1. 写一个cli，需要的配置 以及代码规范 给搭建起来

## eslint简单原理

## eslint 的使用

- 配置.eslintrc
- vscode装一个eslint插件
- 全局配置eslint autofixOnSave设置true即可
## pre-commit的原理

git commit -m 'initial'

1.当commit的时候去执行脚本 .git/hooks/pre-commit

## 脚手架开发

1. 下载一个脚手架拿来用

commander包的基本原理

parse 出固定的结果

command的时候 type, 我去找对应的类型，这个类型对应的描述，对应的执行方法
事件中心

2. 中心模块

中间模块协调的好处：

1. 单文件单职责
2. 新增模块

多人协作，协作之间，负责自身的那个文件/功能

## 配置

本地仓库的配置

1. 那个组织
2. 不是组织，是用户

### 功能

为什么要用.xxxrc文件， ini格式

linux系统配置文件的规范

对对象操作，操作完了，直接 ini.decode 解析字符串，写到文件里

1. 写
2. 读
3. 删
4. 查

rc文件必须在home下嘛


### git包下载

download-git-repo 基本原理

1. git clone https://github.com/flipxfx/download-git-repo.git --branch direct download-git
2. cd download-git && rm -fr .git

### git版本管理 和 package.json版本

1. git tag
2. npm version  v0.1.0 v0.1.1
3. yarn publish

semantic version

https://semver.org/

### ncp copy原理

1. cp -r
2. ncp.limit = 16 最大能运行16个异步请求

## 模板渲染

 https://github.com/tj/consolidate.js  这是一个模板引擎的增强集合


 ```javascript

 const temp1 = {
   render(str, data) {
     // 处理渲染
   }
 }

 const temp2 = {
   compile(str, data) {
     // 处理渲染
   }
 }

const temp1Render = require('consolidate')[temp1].render
const temp2Render = require('consolidate')[temp2].render

 ```

模板引擎语法  --> 获取所有的文件 ---> 批量进行 render ---> 替换现有的文件 ---> 生成的操作

1. 模板引擎语法  --> 获取所有的文件 ---> 批量进行 render

所有的文件都给转换一遍，如果有模板的，编译后输出；如果没有的话，原样输出

2.


### 原理

不同模板引擎之间的区别：
1. 性能
2. 安全问题 xss
3. 服务端和浏览端的处理

```javascript
// npm i {{name}} -> {name: 'project-next-cli'} -> npm i project-next-cli
const temp = (str, data) => {
  return str.replace(/{{(\w+)}}/g, function($0, $1) {
    return data[$1]
  })
}
```

### metalsmith的原理

类似koa的中间件，但参数不同 fn(files, metalsmith, next)


## QA


### 平常开发功能，怎么找开源的包

1. 目标

我想解决什么问题？
文件格式是什么 .rc .yaml

2. 找包

1. 去npm找资源，资源包的下载量
2. 看commit，issue等，修复速度

stars, forks, commits, issues 均衡选一个

3. 看优秀开源项目 cli

### 和vue-cli对比

1. vue-cli 专门给vue项目用的

2. 我们这个脚手架，更通用一些，定制化一些

## TODO

- 搜索功能 zf search
- 升级 zf update

1. 选择已经下载的模板
2. 选一个模板
3. update 版本号给拿到，选择一个版本去升级；如果没有版本号，直接default branch覆盖

- 卸载 zf uninstall  rm -fr ~/.zf/cli



