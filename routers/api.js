var express = require('express');
var router = express.Router();
var User = require('../models/User');

//统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData = {
		code:200,
		message:''
	}
	next();
})
//用户注册
router.post('/user/register',function(req,res,next){
	//req.body 会获取到用户想后台传输的数据
	// console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;
	var email = req.body.email;

	//用户名为空
	if(username==''){
		responseData.code = 1;
		responseData.message="用户名不能为空";
		res.json(responseData);
		return;
	}

	if(password==''){
		responseData.code = 2;
		responseData.message="密码不能为空";
		res.json(responseData);
		return;

	}

	if(password!=repassword){
		responseData.code = 3;
		responseData.message="两次输入密码不一致";
		res.json(responseData);
		return;

	}
	//用户名是否已经被注册
	User.findOne({
		username:username
	}).then(function(userInfo){
		console.log(userInfo);
		if(userInfo){
			//用户已经存在
			responseData.code = 4;
			responseData.message="用户名已经被注册";
			res.json(responseData);
			return;
		}
		//保存
		var user =new User({
			username:username,
			password:password,
			email:email
		})
		return user.save();

	}).then(function(newUserInfo){
		console.log(newUserInfo);
		responseData.code = 5;
		responseData.message="注册成功";
		res.json(responseData);
		return;
	})
	// responseData.message = '注册成功';
	// res.json(responseData);
})

//用户登录
router.post('/user/login',function(req,res,next){
	//req.body 会获取到前台传送过来的数据
	// console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	
	if(username==''||password==''){
		responseData.code = 1;
		responseData.message="用户名密码不能为空";
		res.json(responseData);
		return;

	}

	//查询登录的用户是否在数据库中存在，若存在，则登录成功
	//用户名是否已经被注册
	User.findOne(
	{password:password},
	{username:username}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 3;
			responseData.message="用户名或密码错误";
			res.json(responseData);
			return;
		}

		responseData.code = 2;
		responseData.message="用户名登录成功";
		responseData.userInfo = {
			id:userInfo._id,
			username:userInfo.username
		}
		req.cookies.set('userInfo',JSON.stringify({
			id:userInfo._id,
			username:userInfo.username
		}));
		res.json(responseData);
		return;
	})
	
})

//退出登录
router.get('/user/logout',function(req,res,next){
	req.cookies.set('userInfo',null);
	responseData.code = 1;
	responseData.message="退出登陆成功";
	res.json(responseData);
	//req.body 会获取到前台传送过来的数据
	// console.log(req.body);

	
})
// router.get('/user',function(req,res,next){
// 	res.send('Api-User');
// })

module.exports = router;