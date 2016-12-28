var mongoose = require('mongoose');
//用户的表结构
module.exports = new mongoose.Schema({
	username:String,
	password:String,
	email:String,
	isAdmin:{
		type:Boolean,
		default:false
	}
});
// var Schema = mongoose.Schema;
// 
// var users = new Schema({
//   username:  String,
//   password: String
 
// });

// module.exports = users;