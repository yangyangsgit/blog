/**
 * @author yeyang <1141214762@qq.com>
 * @description 应用程序的入口文件
 */
var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
/**
 * 创建app应用，相当于nodejs里的Http.createServer(0)
 */
var app = express();

//设置静态文件托管
app.use('/public',express.static(__dirname+'/public'))

//第一个参数，表模板文件的后缀，第二个表示用于解析处理模板文件的方法
app.engine('html',swig.renderFile);
//模板文件存放目录，第一个参数不可变
app.set('views','./views');
//注册所使用的模板引擎，第一个参数不可变，第二个参数和app.engine第一个参数一致
app.set('view engine','html');
swig.setDefaults({'cache':false})

app.use(bodyParser.urlencoded({extended:true}))
// app.get('/',function(req,res,next){
//res.render读取views目录下的指定文件，解析并返回给客户端
//第一个参数：表示模板的文件，相对于views的目录 即：views/index.html
// 	res.render('index');
// })

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

// app.get('/main.css',function(req,res,next){
// 	res.setHeader('content-type','text/css');
// 	res.send("body {background:red}");
	
// })

mongoose.connect("mongodb://localhost:27018/blog",function(err){
	if(err){
		console.log("数据库连接失败");
		console.log(err);
	}else{
		console.log("数据库连接成功");
		app.listen('3001')
	}
});
