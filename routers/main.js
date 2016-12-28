var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	console.log(req.userInfo);
	res.render('main/index.html',{
		userInfo:req.userInfo
	});
})
router.get('/detail',function(req,res,next){
	res.render('main/detail.html');
})

module.exports = router;

