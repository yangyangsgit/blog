/**
 * @author yeyang <1141214762@qq.com>
 * @description 应用程序的入口文件
 */
var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var mongoose = require('mongoose')
var mongodb = 'mongodb://localhost/root/data/db'
//重点在这一句，赋值一个全局的承诺。
mongoose.Promise = global.Promise
// var db = mongoose.connect(mongodb);

var bodyParser = require('body-parser');
var cookies = require('cookies');


/**
 * 创建app应用，相当于nodejs里的Http.createServer(0)
 */
var app = express();
var User = require('./models/User');

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

app.use(function(req,res,next){
	req.cookies = new cookies(req,res);
	//解析登录用户的cookie的登录信息
	req.userInfo = {};
	if(req.cookies.get('userInfo')){
		try{
			req.userInfo = JSON.parse(req.cookies.get('userInfo'));
			//获取当前登陆信息，是否管理员
			User.findById(req.userInfo.id).then(function(userInfo){
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
				next();
			})
			return;
		}catch(e){
			next();
			console.log('cookie保存出错啦')
		}
	}
	console.log(req.cookies.get('userInfo'));
	next();
})
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

//命令行启动数据库 mongod --dbpath=E:\blog\db --port=27018
mongoose.connect("mongodb://localhost:27018/blog",function(err){
	if(err){
		console.log("数据库连接失败");
		console.log(err);
	}else{
		console.log("数据库连接成功");
		app.listen('3001')
	}
});
