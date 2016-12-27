var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('main/index.html');
})
router.get('/detail',function(req,res,next){
	res.render('main/detail.html');
})

module.exports = router;

